<?php
//直接将对应的服务器文件输出到本地
function downfile($fileurl)
{
 ob_start(); 
 $filename=$fileurl;
 $date=date("Ymd-H:i:m");
 $size=readfile($filename);
 header( "Content-type:  application/octet-stream "); 
 header( "Accept-Ranges:  bytes "); 
 header( "Content-Disposition:  attachment;  filename= {$date}.xml"); 
 header( "Accept-Length: " .$size);
}
 $url="111.xml";
 downfile($url);

?> 