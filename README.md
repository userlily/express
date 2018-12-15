##  git常用命令 
git rm -r ./aa.text  删除文件文件夹
<br/>  
git add ./aa.text  添加工作区文件到临时区
<br/>
git commit -m '第一次提交'   把临时区的文件提交到当前版本库分支
<br/>
git push -u origin master  把版本库版提交到线上
<br/>
git pull 同步线上版本


### 1、创建版本库    
$  git remote add origin git@github.com:userlily/express.git
<br/>
$  git push -u origin master
<br/>
创建   .gitignore文件   
### 2、快速生成express项目
$ npm install -g express-generator
<br/> 
$ express -h 查看生成项目的命令;     express -e ./express
<br/>
$ npm  i  &&  npm start
<br/>  
### 3、配置webStorm开发环境 代码提醒
$ file >> settings >> plugins  搜索安装 nodejs
<br/>
$ file >> settings >> language >> nodejs and npm     enable nodejs 插件  