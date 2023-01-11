function clickExportFile() {
    let res=xmlToString(msd)
    res=formateXml(res)
    let output=[]
    output.push(res)
    //console.log("输出输出",res)
    let time=new Date()
    let name=time.toLocaleString()+".xml"
    var file = new File(output, name, { type: "text/plain;charset=utf-8" });
    //var blob = new Blob(output, { type: "text/plain;charset=utf-8" });
    saveAs(file);
}

//将xmldom对象转化为xml字符串
function xmlToString(xmlObj){
  if(document.all){
    return xmlObj.xml
  }
  else{
    return (new XMLSerializer()).serializeToString(xmlObj)
  }
}

//计算头函数 用来缩进
const setPrefix = (prefixIndex) => {
  let result = '';
  let span = '    '; //缩进长度
  let output = [];
  for (let i = 0; i < prefixIndex; ++i) {
    output.push(span);
  }
  result = output.join('');
  return result;
};
const formateXml = (xmlStr) => {
  let that = this;
  let text = xmlStr;
  //使用replace去空格
  text =
    '\n' +
    text
      .replace(/(<\w+)(\s.*?>)/g, ($0, name, props) => {
        return name + ' ' + props.replace(/\s+(\w+=)/g, ' $1');
      })
      .replace(/>\s*?</g, '>\n<');

  //处理注释，对注释进行编码
  text = text
    .replace(/\n/g, '\r')
    .replace(/<!--(.+?)-->/g, function ($0, text) {
      return '<!--' + escape(text) + '-->';
    })
    .replace(/\r/g, '\n');

  //调整格式  以压栈方式递归调整缩进
  let rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/gm;
  let nodeStack = [];
  let output = text.replace(
    rgx,
    ($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) => {
      let isClosed = isCloseFull1 == '/' || isCloseFull2 == '/' || isFull1 == '/' || isFull2 == '/';
      let prefix = '';
      if (isBegin == '!') {
        //!开头
        prefix = setPrefix(nodeStack.length);
      } else {
        if (isBegin != '/') {
          ///开头
          prefix = setPrefix(nodeStack.length);
          if (!isClosed) {
            //非关闭标签
            nodeStack.push(name);
          }
        } else {
          nodeStack.pop(); //弹栈
          prefix = setPrefix(nodeStack.length);
        }
      }
      return '\n' + prefix + all;
    },
  );
  let outputText = output.substring(1);
  //还原注释内容
  outputText = outputText
    .replace(/\n/g, '\r')
    .replace(/(\s*)<!--(.+?)-->/g, function ($0, prefix, text) {
      if (prefix.charAt(0) == '\r') prefix = prefix.substring(1);
      // 解码
      text = unescape(text).replace(/\r/g, '\n');
      let ret = '\n' + prefix + '<!--' + text.replace(/^\s*/gm, prefix) + '-->';
      return ret;
    });
  outputText = outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
  return outputText;
};
