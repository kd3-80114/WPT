const express=require('express');
const mysql=require('mysql');
const app=express.Router();
const connectionDetails={    
    host:"localhost",
    database:"kdac",
    user:"kd3_80114_shrinitpatel",
    password:"manager"
}
app.get("/",(request,response)=>{
    console.log("GET method Called")
    var connection=mysql.createConnection(connectionDetails);
    var stmt="Select * from products";
    console.log("Query Prepared is:"+stmt);
    connection.query(stmt,(result,error)=>{
        if(error==null)
        {
            console.log(result);
            connection.end();
            response.send(result);
        }
        else
        {
            console.log(error);
            connection.end();
            response.send(error);
        }
    });
})
app.post("/",(request,response)=>{
    var connection=mysql.createConnection(connectionDetails);
    
    var stmt=`insert into products values(default,'${request.body.producttitle}',${request.body.price},${request.body.stock})`;
    ;
    console.log("Query Prepared is:"+stmt);
    connection.query(stmt,(result,error)=>{
        if(error==null)
        {
            console.log(result);
            connection.end();
            response.send(result);
        }
        else
        {
            console.log(error);
            connection.end();
            response.send(error);
        }
    });

})
app.put("/:NO",(request,response)=>{
  
    var connection=mysql.createConnection(connectionDetails);
    
    console.log(request.body.producttitle);
    console.log(request.body.price);
    var stmt=`Update products set producttitle='${request.body.producttitle}',price=${request.body.price},stock=${request.body.stock} where productid=${request.params.NO} `;
    console.log("Query Prepared is:"+stmt);
    connection.query(stmt,(result,error)=>{
        if(error==null)
        {
            console.log(result);
            connection.end();
            response.send(result);
        }
        else
        {
            console.log(error);
            connection.end();
            response.send(error);
        }
    });

})
app.delete("/:NO",(request,response)=>{
    
    console.log(request.params.NO);
    var connection=mysql.createConnection(connectionDetails);
    console.log(request.body);
    var stmt=`delete from products where productid=${request.params.NO}`;
    console.log("Query Prepared is:"+stmt);
    connection.query(stmt,(result,error)=>{
        if(error==null)
        {
            console.log(result);
            connection.end();
            response.send(result);
        }
        else
        {
            console.log(error);
            connection.end();
            response.send(error);
        }
    });

})
module.exports=app;
