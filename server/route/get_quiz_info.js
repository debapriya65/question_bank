// import { auth } from '../auth.js';
import { con } from '../sql_con.js';
export function get_quiz_info(req, res) {
   
   // auth(req,res,next);
   var sql= 'SELECT * FROM quiz WHERE id=?'
    con.query(sql,[req.query.id], function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else
        {
            res.send(result);
        }
    });
      
 }
 function next(req,res,decoded)
{
    
    
}