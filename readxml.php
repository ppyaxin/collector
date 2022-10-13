<?php
$xmlDoc=new DOMDocument();
$xmlDoc->load("test.xml");
$modelData=$xmlDoc->getElementsByTagName('MemberSystemModelingData');

?> 