import jwt from 'jsonwebtoken';
import { con } from '../sql_con.js';
export function sign_in (req,res) {

    var sql= `SELECT password FROM user WHERE email=?`;
    con.query(sql,[[req.body][0]['email']], function (err, result) {
        if (err) {
            var json={
                "status":0,
                "Token":"12344"
            }
            res.send(json);
            
        }
        else
        {
            if(result[0]['password']==[req.body][0]['password'])
            {

                jwt.sign({ 
                    user_email:[req.body][0]['email'],
                     },"secret", {  expiresIn: 60*60*60 }, function(err, token) {
                    if(err)
                    {
                        var json={
                            "status":1,
                            "Token":token
                        }
                          res.send(json);
                    } else 
                        {
                            var json={
                                "status":1,
                                "Token":token
                            }
                              res.send(json);
                        }
                  });
                  
            }else
            {
                var json={
                    "status":0,
                    "Token":"12344"
                }
                res.send(json);
            }
        
       }
    });
}