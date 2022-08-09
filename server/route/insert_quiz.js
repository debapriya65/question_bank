import { auth } from '../auth.js';
import { con } from '../sql_con.js';
export function insert_quiz(req, res) {
   
    auth(req,res,next);
      
 }
 function next(req,res,decoded)
{
    // console.log([req.body]);
    var sql= `INSERT INTO quiz (id,title,begin,end,result,email) VALUES (NULL,?,?,?,"0",?);
                SELECT MAX(id) AS cur FROM quiz`;
    con.query(sql,[[req.body][0]['title'],[req.body][0]['begin'],[req.body][0]['end'],decoded.user_email],function (err, result) {
      //  console.log(sql);
        if (err) {
            //console.log(err.sql);
        }
        else
        {
            // console.log(result[1][0]['cur']);
            shuffle([req.body][0]['question']);
            let qs2='';
            var quiz_list = [];
            for (let i=0;i<Math.min([req.body][0]['question'].length,parseInt([req.body][0]['q_cnt']));i++)
            {
                qs2=qs2+',(?)';
                quiz_list[i]=new Array('NULL',result[1][0]['cur'],[req.body][0]['question'][i],'NULL');
            }
            // console.log(quiz_list);
            var sql2= `INSERT INTO qq (hudai,id,qid,ans) VALUES `+qs2.slice(1,qs2.length)+``;
            con.query(sql2,quiz_list,function (err, result) {
                if (err) {
                       //console.log(err.message+" "+err.sql);
                    }
                else
                    {
                        
                    }
            });
        }
    });
    
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }
