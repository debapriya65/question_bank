
import { con } from '../sql_con.js';
export function verification(req, res)  {

    var sql= 'SELECT * FROM user WHERE email=?';
    con.query(sql,[[req.body][0]['email']], function (err, result) {
        if (err) {
            res.send("-1");
        }
        else
        {
            let cur_time=new Date().getTime();
            if(cur_time-result[0]['time']<=300000 && result[0]['code']==[req.body][0]['code'])
            {

                var sql2=`UPDATE user
                SET  status=?
                WHERE email=?;`
                con.query(sql2,[1,[req.body][0]['email']], function (err, result1) {
                    if (err) {
                        res.send("-1");
                    }
                    else
                    {
                        res.send("1");
                    }
                });
                
            }else
            {
                res.send("-1");
            }
        }
    });
}