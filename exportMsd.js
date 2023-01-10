function clickExportFile() {


    let res=xmlToString(msd)
    let output=[]
    output.push(res)
    //console.log("输出输出",res)
    let time=new Date()
    let name=time.toLocaleString()+".xml"
    var file = new File(output, name, { type: "text/plain;charset=utf-8" });
    //var blob = new Blob(output, { type: "text/plain;charset=utf-8" });
    saveAs(file);
}

function xmlToString(xmlObj){
  if(document.all){
    return xmlObj.xml
  }
  else{
    return (new XMLSerializer()).serializeToString(xmlObj)
  }
}