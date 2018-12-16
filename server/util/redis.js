
'use strict'

/**
 * Created by lili
 * redis连接，常用方法的封装
 *
 */
    const redis = require("server/util/redis")
    const crypto=require("crypto")
    let client = redis.createClient();
    // if you'd like to select database 3, instead of 0 (default), call
    // client.select(3, function() { /* ... */ });
    client.on("error",  (err) => {
        console.log("Error " + err);
    });

    /**
     * Created by lili on 2017/7/21.
     * 存储微信数据并返回自定义的session
     * @param  wxdata 微信返回的数据
     * @return   如果wxdata数据为正确数据  返回自定义的session    否则返回null
     */

     let setSession = (wxdata) =>{

         /*如果没有openid，直接返回null*/
         if(!wxdata.openid){
             return null;
         }
        let secret=wxdata.session_key+wxdata.openid ; //数据拼接
        let session = crypto.createHmac('sha256', secret).update("I am lily").digest('hex');//加密生成返回session
        client.hmset(session, "wxsession", wxdata.session_key  ,"id", wxdata.openid);// 以session为key存储微信返回的数据
        client.expire(session,144000) //设置key 为session的超时时间  单位为毫秒
        return session;  //返回session
      }

        /**
         * Created by lili on 2017/7/21.
         * 获取微信数据  openid   session_key
         * @param  session   微信请求带来的自定义session
         * @return  func 业务逻辑回调函数    wxsession     id
         */

     let getWX=(session,res ,func)=>{
        client.hgetall(session,  (err, obj) => {   //获取key为session所有的key ： value
            if(err) console.log(err);
            //obj为空
            console.log(obj)
            if(obj==null){
                return res.json({"noSession":"yes"})
            }
            func(obj)
        })
    }

    module.exports.setSession=setSession
    module.exports.client=client
    module.exports.getWX=getWX

