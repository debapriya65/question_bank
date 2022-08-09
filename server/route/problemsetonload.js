import { con } from '../sql_con.js';
export function getonload  (req, res)  {
    var sql= 'SELECT * FROM question ';
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
