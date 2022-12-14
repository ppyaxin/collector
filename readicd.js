let dom = {}

function sendicd(v) {

    let n = document.getElementById("new").files.item(0)
    let m = window.URL.createObjectURL(n)
    $("#InstanceLoc").textbox('setValue', m)
    $("#createtime").textbox('setValue', getDay())
    //console.log("pppppp",window.URL.createObjectURL(n))
    //console.log("UUU",v.value)
    $('#openicd').form({
        url: "readxml.php",
        success: function (data) {
            //alert(data)
            readicd(data)
        }
    })
    $('#openicd').submit()
}
function clickicdFile() {
    const input = document.querySelector("#new")
    input.click()
}

function getDay() {
    let date = new Date()
    let nowMonth = date.getMonth() + 1
    let strDate = date.getDate()
    if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    return date.getFullYear() + "/" + nowMonth + "/" + strDate
}

function sendicdclass(v) {
    let n = document.getElementById("icdclass").files.item(0)
    let m = window.URL.createObjectURL(n)
    $("#classLoc").textbox('setValue', m)
    $("#createtime").textbox('setValue', getDay())
    $('#openclass').form({
        url: "readxml.php",
        success: function (data) {
            //alert(data)
            readclass(data)
        }
    })
    $('#openclass').submit()
}
function clickicdclassFile() {
    const input = document.querySelector("#icdclass")
    input.click()

}
let icd = {}
//将xml存进服务器之后，读取再修改
function readicd(data) {
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'xml',
        success: function (x) {
            icd = x
            // console.log("icdicd",icd)
            makeVirtualDom(icd)
            return icd
        }
    })
}

//将xml存进服务器之后，读取再修改
function readclass(data) {
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'xml',
        success: function (x) {
            // console.log("icdicd",icd)
            icd = x
            makeVirtualDom(icd)
            return icd
        }
    })
}

function makeVirtualDom(icd) {
    //let A429portDom = icd.getElementsByTagName("A429Port")
    //console.log(A429portDom)
    // getA429portDom(A429portDom)
    let HostedFunction = icd.getElementsByTagName("HostedFunction")[0]
    let version = HostedFunction.getAttribute("XsdVersion")
    $("#version").textbox('setValue', version)
    let DP = icd.getElementsByTagName("DP")
    getDPDom(DP)
}
let A429port = []

function getA429portDom(A429portDom) {
    for (let i = 0; i < A429portDom.length; i++) {
        let obj = {}
        obj.Id = A429portDom[i].attributes[1].value
        obj.Name = A429portDom[i].attributes[0].value
        obj.NameDef = A429portDom[i].attributes[2].value
        obj.IdDef = A429portDom[i].attributes[3].value
        A429port.push(obj)
        //console.log(A429port)
    }
}


let checkedNode = []
//将上树下列表展现在icd页面(点小箭头可以插入icd的页面)
function getDPDom(DP, checkedDP) {
    let dptree = []
    //将被选中的节点的id放进一个set中，之后如果构建icd树时候有这个id将checked属性设置为true
    let idSet = new Set()
    for (let i = 0; i < checkedDP.length; i++) {
        let id = checkedDP[i].getAttribute("Id")
        idSet.add(id)
    }
    for (let i = 0; i < DP.length; i++) {
        let path = DP[i].getAttribute("NameDef")
        let Id = DP[i].getAttribute("Id")
        let checkFalg = false
        //判断是否在被选到的列表中
        if (idSet.has(Id)) {
            checkFalg = true
        }
        let nodes = path.split(".")
        //这个方法可以考虑建立树形结构的时候加上是否被选中的属性
        //建立树的时候就进行对比
        mergeTreeAndLeaf(dptree, nodes, path, checkFalg)
    }


    $("#icdlist").tree({ data: dptree })
    //显示下部列表
    showCheckedList()
    $("#icdlist").tree({
        onCheck: function (node, checked) {
            let nodes = $('#icdlist').tree('getChecked');
            let leafs = []
            checkedNode=[]
            //将之前的树展示在上面，然后直接获得checked的节点
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].children.length == 0) {
                    leafs.push({ text: nodes[i].path })
                }
                //组成新的子树
                mergeTreeAndLeaf(checkedNode, nodes[i].path.split("."), nodes[i].path)
            }
            $("#iims").datalist({ data: leafs })
        },
         onUncheck: function (node, data) {
            //是否check操作一样
            let nodes = $('#icdlist').tree('getChecked');
            let leafs = []
            
            checkedNode=[]
            //将之前的树展示在上面，然后直接获得checked的节点
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].children.length == 0) {
                    leafs.push({ text: nodes[i].path })
                }
                //组成新的子树
                mergeTreeAndLeaf(checkedNode, nodes[i].path.split("."), nodes[i].path)
            }
            $("#iims").datalist({ data: leafs })
        }
    })
}

function showCheckedList() {
    let nodes = $('#icdlist').tree('getChecked');
    let leafs = []
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].children.length == 0) {
            leafs.push({ text: nodes[i].path })
        }
    }
    $("#iims").datalist({ data: leafs })
}


function puticd() {
    $('#w').window('close')
    //let data=[]
    // data.push(checkedNode)
    //omsNowTree=tree
    console.log(checkedNode)
    $("#omslist").tree({ data: checkedNode })

}

//nameref树,tree是js对象数组，这个树节点要多一个path，可以用作页面下的属性展示
function mergeTreeAndLeaf(tree, nameNode, path, checkFalg) {
    if (nameNode.length == 0) {
        return
    }
    //如果这一层已经这个节点值了
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].text == nameNode[0]) {
            mergeTreeAndLeaf(tree[i].children, nameNode.slice(1), path, checkFalg)
            return
        }
    }
    if (nameNode.length == 2) {
        tree.push({ text: nameNode[0], children: [], state: "closed", path: path })
    } else if (nameNode.length == 1) {
        tree.push({ text: nameNode[0], children: [], path: path, checked: checkFalg })
    } else {
        tree.push({ text: nameNode[0], children: [], path: path })
    }
    mergeTreeAndLeaf(tree[tree.length - 1].children, nameNode.slice(1), path, checkFalg)
    return
}

function removeit() {
    var node = $('#omslist').tree('getSelected');
    $('#omslist').tree('remove', node.target);
}


function icdsubmit() {
    left_tt = [{
        "id": 1,
        "text": "Start Page"
    }, {
        "id": 2,
        "text": "ICD Information",
        "children": [
            {
                "id": 11,
                "text": "Member System Modeling Data"
            }]
    }]
    $("#tt").tree({ data: left_tt })
}
//左侧树一些不相干
function msmdsubmit() {
    let a = document.getElementById("supportFR").checked
    if (a) {
        left_tt[1].children.push({ "text": "OMS Communication Messages" })
        $("#tt").tree({ data: left_tt })
    }
}

