
function saveFaultReport() {

    //目前思路
    //将屏幕上的参数依次获取到
    if (changedFaultReportId.length == 0) {
        $('#changeFault').window('close')
        return
    }
    //console.log("msd,msd", msd)
    //获取到 faultreport
    let FaultReportingData = msd.getElementsByTagName("FaultReportingData")
    for (let i = 0; i < FaultReportingData.length; i++) {
        if (changedFaultReportId == FaultReportingData[i].getAttribute("Id")) {
            //tab1 basic data的数据
            let faultReportDelay = $("#Delay").val()
            let timeDelayDetect = $("#Detect").val()
            let timeDelayClear = $("#Clear").val()
            FaultReportingData[i].setAttribute("TimeDelayDetect", timeDelayDetect)
            FaultReportingData[i].setAttribute("TimeDelayClear", timeDelayClear)
            FaultReportingData[i].setAttribute("FaultReportDelay", faultReportDelay)
            //tab2 storeable fight phase的数据
            //获取页面上被选到的check选项的编号
            let checkedItem = $("#fightPhase").tree('getChecked')
            // console.log("getChecked", checkedItem)

            //将faultReport中所有子节点删掉
            let activeFault = FaultReportingData[i].getElementsByTagName("StorableFlightPhasesActiveFault")
            let activeFaultLen = activeFault.length
            for (let j = 0; j < activeFaultLen; j++) {
                FaultReportingData[i].removeChild(activeFault[0]);
            }
            //获取到所有被选中的子节点
            //在父节点，加入新的被选中的元素
            for (let j = 0; j < checkedItem.length; j++) {
                let StorableFlightPhasesActiveFault = msd.createElement("StorableFlightPhasesActiveFault")
                let context = msd.createTextNode(checkedItem[j].id)
                StorableFlightPhasesActiveFault.appendChild(context)
                FaultReportingData[i].appendChild(StorableFlightPhasesActiveFault)
            }
            console.log("FaultReportingData[i]", FaultReportingData[i])

            break
        }
    }
    //console.log("FaultReportingDataFaultReportingData", FaultReportingData)
    //console.log("testtheReport", msd)
    //获取修改的是哪一个id的数据

    //将获取到的新数据依次放入xml对象中
    $('#changeFault').window('close')
    console.log(" $('#changeFault').window('close')")
}

function saveDownStreamFaultReport() {
    if (changedFaultReportId.length == 0) {
        $('#changeFault').window('close')
        return
    }

    //获取到 faultreport
    let FaultReportingData = msd.getElementsByTagName("FaultReportingData")
    //将点击到的某个故障报告和故障报告列表做对比，找到xml中的故障报告
    for (let i = 0; i < FaultReportingData.length; i++) {
        if (changedFaultReportId == FaultReportingData[i].getAttribute("Id")) {
            //获取屏幕上已经被选择到的下游故障报告
            //downstreamfault 获取目前页面上被选中的下游错误
            //getChecked方法似乎只能返回手动操作的
            let nodes = $('#pcdf').datalist('getChecked');
            console.log("nodesnodes", nodes)

            //删除现在的xml 对象中下游故障报告
            let DownstreamFaults = FaultReportingData[i].getElementsByTagName("DownstreamFaults")
            let DownstreamFaultsLen = DownstreamFaults.length
            for (let j = 0; j < DownstreamFaultsLen; j++) {
                FaultReportingData[i].removeChild(DownstreamFaults[0]);
            }


            //将现在的故障报告进行写入
            //对节点进行依次写入
            for (let j = 0; j < nodes.length; j++) {
                //创建xml节点
                let downfault = msd.createElement("DownstreamFaults")
                downfault.setAttribute("Id",nodes[j].id)
                //MessageType="DP" Label="0"
                downfault.setAttribute("MessageType","DP")
                downfault.setAttribute("Label","0")
                //将xml节点进行写入
                FaultReportingData[i].appendChild(downfault)
            }
              console.log("FaultReportingData[i]",FaultReportingData[i])
            break
        }
    }
}