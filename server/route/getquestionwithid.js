import { con } from '../sql_con.js';

export function getquestionwithid (req, res)  {

    var sql= 'SELECT * FROM question WHERE qid='+req.query.id;
    con.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
        }
        else
        {

            res.send(result);
        }
    });

}