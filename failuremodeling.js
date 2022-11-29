//readmsd get dp
let dps = {}
let faultRepoetnameList=[]
function getReadDP(xml) {
    let dp = xml.getElementsByTagName("DP")
   // console.log(dp)
    for (let i = 0; i < dp.length; i++) {
        let Id = dp[i].getAttribute("Id")
        let Name = dp[i].getAttribute("Name")
        let NameDef = dp[i].getAttribute("NameDef")
        let IdDef = dp[i].getAttribute("IdDef")
    }
}

//分页加载一部分类别
function getFailureDataList(pageNumber, pageSize, failureData) {
    //FailtureReportingfmd
    //清空之前的后代元素
    //console.log(failureData)
    $("#FailtureReportingfmd").empty()
    let len = failureData.length
    let start = (pageNumber - 1) * pageSize
    let end = start + pageSize
    //console.log(pageNumber, pageSize, start, end)
    for (let i = start; i < end; i++) {
        let test = failureData[i].attributes[4].value
        let FailureMessage = failureData[i].attributes[8].value
        //let DownstreamFaultsLength = FaultReportingData[i].getElementsByTagName("DownstreamFaults").length
        let a = $("<a href=\"#\" class=\"easyui-linkbutton l-btn l-btn-small easyui-fluid\"  style=\"width: 100%;padding:5px;word-wrap:break-word;\" ></a>").html(test +
            '</br>' + FailureMessage)
        $(a).click(function () {
            console.log(failureData[i].attributes)
            let temp = failureData[i].attributes

        })
        $("#FailtureReportingfmd").append(a)
    }
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

function makeFaultReportingList(FaultReportingData){
  console.log(FaultReportingData)
  for(let i=0;i<FaultReportingData.length;i++){
    let FaultReportName=FaultReportingData[i].getAttribute("FaultReportName")
    console.log(FaultReportName)
    faultRepoetnameList.push({text:FaultReportName})

  }
	$("#frms").datalist({ data: faultRepoetnameList })
}

