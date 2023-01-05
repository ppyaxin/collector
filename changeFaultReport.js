function saveFaultReport() {
     
    //目前思路
    //将屏幕上的参数依次获取到
    if (changedFaultReportId.length == 0) {
        return
    }
    console.log("msd,msd", msd)
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
            let StorableFlightPhasesActiveFault = FaultReportingData[i].getElementsByTagName("StorableFlightPhasesActiveFault")
            for (let j = 0; j < StorableFlightPhasesActiveFault.length; j++) {
                //console.log(StorableFlightPhasesActiveFault[i].textContent)     
                let id = StorableFlightPhasesActiveFault[j].textContent
                fightPhase[id - 1].checked = true
            }
            
        }
    }

    console.log("testtheReport", msd)
    //获取修改的是哪一个id的数据

    //将获取到的新数据依次放入xml对象中

}