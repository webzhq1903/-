//1:引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
//2:配置第三方模块
 //2.1:配置连接池
 var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   database:"books",
   connectionLimit:15
 })
 //2.2:跨域
 var server = express();
 server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080"],
   credentials:true
 }))
 //2.3:session
 server.use(session({
   secret:"128位字符串",
   resave:true,
   saveUninitialized:true
 }))
 //2.9:指定静态目录
 server.use(express.static("public"))

 //4.监听端口3000
 server.listen(3000);


// 接口
server.get("/booking",(req,res)=>{
  var d2=req.query.d2;
  console.log(d2,typeof(d2));
  // console.log(d2,typeof(d2));
  var sql=`SELECT * FROM book_info WHERE udate IN (${d2})`;
  pool.query(sql,(err,result)=>{
    if(err) throw err;
    // var gdate=result[0].udate;
    // res.send(gdate);
    console.log(result);
    res.send(result);
  });
})

