import { con } from '../sql_con.js';
export function getoptionwithid (req, res) {

    var sql= 'SELECT value FROM option WHERE qid='+req.query.id;
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