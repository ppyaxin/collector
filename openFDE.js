
function sendfde(v) {
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

let fde = []
//将xml存进服务器之后，读取再修改
function readfde(data) {
    $.ajax({
        type: 'GET',
        url: data,
        dataType: 'xml',
        success: function (x) {
            fde = x.getElementsByTagName("FlightDeckEffects")
            // console.log("fdefde",fde)
            startGetFde()
        }
    })
}

function clickfdeFile() {
    const input = document.querySelector("#opFDE")
    input.click()
}

function startGetFde() {
    let fdeNum = fde.length
    console.log(fdeNum)
    $('#fdeTipWin').window('open')
    $("#fdetipnum").html("Import " + fdeNum + " Flight Deck Effects")
    //如果点击确定
    //importFlightDeckEffect(fdeTag)
}



//这个列表位于faultreport-->fight deck effect
function importFlightDeckEffect() {
    $('#fdeTipWin').window('close')
    let str = []
    for (let i = 0; i < fde.length; i++) {
        let num = fde[i].attributes[0].value
        let FDEClass = fde[i].attributes[2].value
        let FDEText = fde[i].getElementsByTagName("FDEText")[0].innerHTML
        let temp = {}
        temp.text = num + "&nbsp" + FDEText + "&nbsp" + FDEClass
        str.push(temp)
    }
    //console.log("............", str)
    $("#fde").datalist({ data: str })
}
