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
    console.log("wwwwwww", input)
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


function makeVirtualDom(icd) {
    let A429portDom = icd.getElementsByTagName("A429Port")
    //console.log(A429portDom)
    getA429portDom(A429portDom)
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

let dptree=[]

function getDPDom(DP) {
    for(let i=0;i<DP.length;i++){
        let obj={}
        let path=DP[i].attributes[2].value.split('.')
        mergeTree(dptree, path)
    }
    console.log(dptree)
    $("#icdlist").tree({ data: dptree })
}


