// import { auth } from '../auth.js';
import { con } from '../sql_con.js';
export function get_question_with_quiz_id(req, res) {
   
   // auth(req,res,next);
   console.log(req.query.id+" wtf ");
   var sql= 'SELECT * FROM question WHERE qid IN (SELECT qid FROM qq WHERE id=?)'
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