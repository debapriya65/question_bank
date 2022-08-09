import { auth } from '../auth.js';
import { con } from '../sql_con.js';
export function insert_question(req, res) {
   
    auth(req,res,next);
      
 }
 function next(req,res,decoded)
{
    //console.log([req.body]);
    var sql= `INSERT INTO question (qid, sub, value, sol) VALUES (NULL,?,?,?);
                SELECT MAX(qid) AS cur FROM question`;
    con.query(sql,[[req.body][0]['sub'].toUpperCase().trim(),[req.body][0]['question'],[req.body][0]['solution']],function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else
        {
           // console.log(result[1][0]['cur']);
            let qs='';
            var option_list = [];
            for (let i=0;i<[req.body][0]['option'].length;i++)
            {
                qs=qs+',(?)';
                option_list[i]=new Array('NULL',result[1][0]['cur'],[req.body][0]['option'][i]);
            }
            console.log(option_list);
            let qs2='';
            var varsity_list = [];
            for (let i=0;i<[req.body][0]['varsity'].length;i++)
            {
                qs2=qs2+',(?)';
                varsity_list[i]=new Array(result[1][0]['cur'],[req.body][0]['varsity'][i].trim().toUpperCase(),[req.body][0]['year'][i].trim().toUpperCase());
            }
            console.log(varsity_list);
            var sql2= `INSERT INTO option (oid, qid, value) VALUES `+qs.slice(1,qs.length)+`;
                        INSERT INTO q2 (qid, varsity, year) VALUES `+qs2.slice(1,qs2.length)+``;
            con.query(sql2,option_list.concat(varsity_list),function (err, result) {
                if (err) {
                       console.log(err.message+" "+err.sql);
                    }
                else
                    {
                        
                    }
            });
        }
    });
    
}
// 
