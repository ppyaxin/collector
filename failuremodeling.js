//readmsd get dp
let dps = []
let faultRepoetnameList = []
let faultRep = {}

function getReadDP(xml) {
    let dp = xml.getElementsByTagName("DP")
    dps=dp
    for (let i = 0; i < dp.length; i++) {
        let Id = dp[i].getAttribute("Id")
        let Name = dp[i].getAttribute("Name")
        let NameDef = dp[i].getAttribute("NameDef")
        let IdDef = dp[i].getAttribute("IdDef")
        let DataFormat = dp[i].getAttribute("DataFormat")
        let Label = dp[i].getAttribute("Label")
        if (Label == "0") {
            DataFormatLabel0.push(dp[i])
        }else if(Label==""){

        }
    }
   // console.log("将上树下列表展现在icd页面", DataFormatLabel0)
    //将上树下列表展现在icd页面
    //getDPDom(DataFormatLabel0)
}

//分页加载一部分类别
function getFailureDataList(pageNumber, pageSize, failureData) {
    //FailtureReportingfmd
    //清空之前的后代元素
    $("#FailtureReportingfmd").empty()
    let len = failureData.length
    let start = (pageNumber - 1) * pageSize
    let end = start + pageSize
    for (let i = start; i < end; i++) {
        let test = failureData[i].attributes[4].value
        let FailureMessage = failureData[i].attributes[8].value
        //let DownstreamFaultsLength = FaultReportingData[i].getElementsByTagName("DownstreamFaults").length
        let a = $("<a href=\"#\" class=\"easyui-linkbutton l-btn l-btn-small easyui-fluid\"  style=\"width: 100%;padding:5px;word-wrap:break-word;\" ></a>").html(test +
            '</br>' + FailureMessage)
        $(a).click(function () {

            let faultrep = failureData[i].getElementsByTagName("FaultReporting")
            let arr = []
            //右侧unchecked
            for (let j = 0; j < faultRepoetnameList.length; j++) {
                faultRepoetnameList[j].checked = false
            }
            for (let j = 0; j < faultrep.length; j++) {
                let Confidences = faultrep[j].getAttribute("Confidences")
                let id = faultrep[j].getAttribute("Id")
                let Name = faultRep[id]
                arr.push({ "Confidences": Confidences, "Name": Name })
                for (let k = 0; k < faultRepoetnameList.length; k++) {
                    if (faultRepoetnameList[k].text == Name) {
                        faultRepoetnameList[k].checked = true
                    }
                }
            }
            $("#activeFaultRep").datagrid({ data: arr })
            $("#frms").datalist({ data: faultRepoetnameList })
            $("#frms").datalist({
                onCheck: function (node, text) {
                    text = text.text
                    arr.push({ "Confidences": "1", "Name": text })
                    $("#activeFaultRep").datagrid({ data: arr })
                },
                onUncheck: function (node, data) {
                    let res = deleteArr(arr, data)
                    arr = res
                    $("#activeFaultRep").datagrid({ data: res })
                }
            })
        })
        $("#FailtureReportingfmd").append(a)
    }
}

function deleteArr(arr, data) {
    let text = data.text
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].Name != text) {
            res.push(arr[i])
        }
    }
    return res
}

function getFailureData(failureData) {
    getFailureDataList(1, 10, failureData)
    let len = failureData.length
    $('#ppfmd').pagination({
        layout: ['list', 'sep', 'first', 'prev', 'sep', 'manual', 'sep', 'next', 'last', 'sep'],
        beforePageText: 'Page',
        afterPageText: 'of {pages}',
        total: len,
        pageList: [10, 20, 50, 100],
        onSelectPage: function (pageNumber, pageSize) {
            getFailureDataList(pageNumber, pageSize, failureData, FlightDeckEffectData)
        }
    });
}


function makeFaultReportingList(FaultReportingData) {
    for (let i = 0; i < FaultReportingData.length; i++) {
        let FaultReportName = FaultReportingData[i].getAttribute("FaultReportName")
        let FaultReportId = FaultReportingData[i].getAttribute("Id")
        faultRepoetnameList.push({ text: FaultReportName, checked: false })
        faultRep[FaultReportId] = FaultReportName
    }
    $("#pcdf").datalist({ data: faultRepoetnameList })
    $("#frms").datalist({ data: faultRepoetnameList })
}
