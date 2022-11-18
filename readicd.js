function getPath(obj) {
    if (obj) {
    if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
    
    obj.select();
    return document.selection.createRange().text;
    }else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
    
    if (obj.files) {
    
    return obj.files.item(0).getAsDataURL();
    }
    return obj.value;
    }
    return obj.value;
    }
    }
    
function sendicd(value) {
    console.log("icdicd",value)
    let n = document.getElementById("new").files[0]
    console.log("nnnn",n)
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
            return icd
        }
    })
}


function makeVirtualDom(icd){
   let A429portDom= icd.getElementsByTagName("A429Port")
   
}
let A429port=[]
function getA429portDom(A429portDom){

}