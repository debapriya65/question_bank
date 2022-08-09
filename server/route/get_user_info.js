import { auth } from '../auth.js';
import { con } from '../sql_con.js';
export function get_user_info(req, res) {
   
    auth(req,res,next);
      
 }
 function next(req,res,decoded)
{
    var sql= 'SELECT * FROM user WHERE email=?'
    con.query(sql,[decoded.user_email], function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else
        {
            
            res.send(result);
        }
    });
    
}