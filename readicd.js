let dom = {}

function sendicd(v) {

    console.log("icdicd", v)
    let n = document.getElementById("new").files.item(0)
    let m = window.URL.createObjectURL(n)
    $("#InstanceLoc").textbox('setValue', m)
    //console.log("pppppp",window.URL.createObjectURL(n))
    //console.log("UUU",v.value)
    $('#openicd').form({
        url: "readxml.php",
        success: function (data) {
            //alert(data)
            console.log('OOOOOOOO', data)
            readicd(data)
        }
    })
    $('#openicd').submit()
}
function clickicdFile() {
    const input = document.querySelector("#new")
    input.click()
}


function sendicdclass(v) {
    console.log("icdicd", v)
    let n = document.getElementById("icdclass").files.item(0)
    let m = window.URL.createObjectURL(n)
    $("#classLoc").textbox('setValue', m)
    $('#openclass').form({
        url: "readxml.php",
        success: function (data) {
            //alert(data)
            console.log('OOOOOOOO', data)
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

let dptree = []
let checkedNode = []
function getDPDom(DP) {
    //console.log(dp)
    for (let i = 0; i < DP.length; i++) {
        let path = DP[i].getAttribute("NameDef")
        let nodes = path.split(".")
        mergeTreeAndLeaf(dptree, nodes, path)
    }
    console.log(dptree)
    $("#icdlist").tree({ data: dptree })
    $("#icdlist").tree({
        onCheck: function (node, checked) {
            console.log("node", node, checked)
            if(checked){
                checkedNode=node
            }
            let nodes = $('#icdlist').tree('getChecked');
            let leafs = []
            for (let i = 0; i < nodes.length; i++) {
                if (nodes[i].children.length == 0) {
                    leafs.push({ text: nodes[i].path })
                }
            }
            // console.log(leafs)
            $("#iims").datalist({ data: leafs })
        }
    })
}

function puticd() {
   // console.log("hhhhhhhhh",checkedNode)
    $('#w').window('close')
    let data=[]
    data.push(checkedNode)
    $("#omslist").tree({ data: data })
}

//nameref树,tree是js对象数组
function mergeTreeAndLeaf(tree, nameNode, path) {
    if (nameNode.length == 0) {
        return
    }
    //如果这一层已经这个节点值了
    for (let i = 0; i < tree.length; i++) {
        if (tree[i].text == nameNode[0]) {
            mergeTreeAndLeaf(tree[i].children, nameNode.slice(1), path)
            return
        }
    }
    if (nameNode.length == 2) {
        tree.push({ text: nameNode[0], children: [], state: "closed", path: path })
    } else {
        tree.push({ text: nameNode[0], children: [], path: path })
    }
    mergeTreeAndLeaf(tree[tree.length - 1].children, nameNode.slice(1), path)
    return
}

function removeit(){
    var node = $('#omslist').tree('getSelected');
    $('#omslist').tree('remove', node.target);
}