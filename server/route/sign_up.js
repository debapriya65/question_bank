import nodemailer from 'nodemailer';
import { con } from '../sql_con.js';
export function sign_up_req (req, res) {

    checkmail([req.body][0]['email'],req,res);
}
function next(x,res)
{
let code=Math.floor(Math.random()*10000);
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'debapriya.susmoy1999@gmail.com',
    pass: 'lqldasnjkmbqcfzx'
    

  }
});

var mailOptions = {
  from: 'debapriya.susmoy1999@gmail.com',
  to: [x.body][0]['email'],
  subject: 'Sending Email using Node.js',
  text: `Verify your account with the following code :
  ` +code
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.send("-1");
    console.log(error);
  } else {
    insert([x.body][0],code,res);
  }
});
}
function insert(json,code,res)
{
    var sql=`INSERT INTO user 
    (password, email, name, photo, organization, status, time, code,admin) VALUES 
    (?,?,?,?,?,?,?,?,?);`;
    con.query(sql,[json['password'],json['email'],json['name'],json['photo'],json['organization'],0,new Date().getTime(),code,0], function (err, result) {
        if (err) {
            res.send("-1");
            console.log(err.message);
        }
        else
        {
            res.send("0");
        }
    }); 

}
function checkmail(x,req,res)
{
    var sql= `SELECT * FROM user WHERE email=?`;
    con.query(sql,[x], function (err, result) {
        if (err) {
            res.send("-1");
            console.log(err.message);
        }
        else
        {

            if(result.length>0)
            {
                var y=result[0]['status'];
                if(y==1)
                {
                    res.send("1");
                }else
                {
                    var sql=`DELETE FROM user  WHERE email=?`;
                    
                    con.query(sql,[x], function (err, result) {
                        if (err) {
                            res.send("-1");
                            console.log(err.message);
                        }
                        else
                        {
                            
                            next(req,res);
                        }
                    }); 
                    
                }
            }   
            else
                {
                   next(req,res);
                }
        }
    }); 
}
