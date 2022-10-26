<?php
// $xmlDoc=new DOMDocument();
// $xmlDoc->load("test.xml");
         $file=$_FILES['file1'];  
        $fileName=$file['name'];
        move_uploaded_file($file['tmp_name'],$fileName);
         //给文件重命名，尽量不要起中文名字,如下以时间戳+随机数重命名  
        // $filename=time().rand(0,1000);  
         //获取文件的后缀,pathinfo()会以数组的形式返回一个文件的路径信息，其中extension元素则是文件的后缀名  
        // $ext=pathinfo($_FILES['file1']['name'])['extension'];  
          //echo $file['tmp_name'];
        //最终文件名为  
        //$filename=$filename.'.'.$ext;  
      
        //设置文件上传到服务器后存放的位置,move_uploaded_file()会将文件移动到新位置，第一个参数是要移动的文件，第二个参数是移动到哪里。我在这里是放到和本php文件同一目录下，注意需要将新的文件名连接进去。  
        // if (move_uploaded_file($file['tmp_name'], './'.$filename)) {  
        //     echo "success";  
        //  } else{  
        //     echo "error";  
        //     echo $filename;
        //     echo $file['tmp_name'];
        //  } 
     echo $fileName;
    //  其值为 1，上传的文件超过了 php.ini（！！！注意修改的是apache文件夹下） 中 upload_max_filesize 选项限制的值。
?> 