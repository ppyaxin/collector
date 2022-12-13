


function sendfde(v){
    console.log("fdefde", v)
    $('#openfde').form({
        url: "readxml.php",
        success: function (data) {
            //alert(data)
            console.log('OOOOOOOO', data)
            readfde(data)
        }
    })
    $('#openfde').submit() 
}

let fde = {}
//将xml存进服务器之后，读取再修改
function readfde(data) {
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'xml',
        success: function (x) {
            fde = x }
    })
}

function clickfdeFile() {
    const input = document.querySelector("#opFDE")
    input.click()
}

