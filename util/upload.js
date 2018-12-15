
'use strict'

/**
 * Created by lili
 * 文件上传
 */

const multer  = require('multer')
const path = require("path");


let storage = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, path.join(__dirname, '../public/goodsimg/'))
    },
    filename: function (req, files, cb) {

                 if( !req.session.imgs){
                         req.session.imgs=[]
                  }
                let name= new Date().getTime()+ '.' + files.mimetype.substring(6);

                req.session.imgs.push(name)


             cb(null,name)
    }
});
let upload = multer({ storage: storage })

module.exports = upload;
