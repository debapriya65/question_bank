// import { auth } from '../auth.js';
import { con } from '../sql_con.js';
export function submit_ans(req, res) {
   
   // auth(req,res,next);
   var sql= `UPDATE qq SET ans = ? WHERE qid = ? and id = ?;
   UPDATE quiz SET result = "`+req.query.marks+` out of `+req.query.total+`" WHERE id = ?;
   `
    con.query(sql,[req.query.ans,req.query.qid,req.query.id,req.query.id], function (err, result) {
        
        if (err) {
            console.log(err.sql);
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