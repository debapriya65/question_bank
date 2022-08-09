import { con } from '../sql_con.js';
export function filter(req, res) {
       console.log([req.body]);
      let varsity ,year ,sub ;
      varsity="(";
      for(let i=0;i<[req.body][0]["varsity"].length;i++)
      {
         if(i==[req.body][0]["varsity"].length-1)
         {
             varsity=varsity+"'"+[req.body][0]["varsity"][i]+"'";
         }else
         varsity=varsity+"'"+[req.body][0]["varsity"][i]+"',";
      }
      varsity=varsity+")";
    //  console.log(varsity);
      year="(";
      for(let i=0;i<[req.body][0]["year"].length;i++)
      {
         if(i==[req.body][0]["year"].length-1)
         {
             year=year+"'"+[req.body][0]["year"][i]+"'";
         }else
         year=year+"'"+[req.body][0]["year"][i]+"',";
      }
      year=year+")";
    //  console.log(year);
      sub="(";
      for(let i=0;i<[req.body][0]["sub"].length;i++)
      {
         if(i==[req.body][0]["sub"].length-1)
         {
             sub=sub+"'"+[req.body][0]["sub"][i]+"'";
         }else
         sub=sub+"'"+[req.body][0]["sub"][i]+"',";
      }
      sub=sub+")";
    //  console.log(sub);
      var sql3="SELECT qid FROM q2 WHERE  (varsity IN "+varsity+" )"
      var sql2="SELECT qid FROM q2 WHERE  (year IN "+year+")"; 
      var sql="SELECT qid FROM question WHERE (sub IN "+ sub+")";
      con.query(sql, function (err, result) {
         if (err) {
             console.log(err.message);
         }
         else
         {
               console.log(sql+"FUCK!");
               console.log(result);
               //res.send(result);
         }
     });
     con.query(sql2, function (err, result) {
         if (err) {
             console.log(err.message);
         }
         else
         {
               console.log(sql2+"FUCK!");
               console.log(result);
              // res.send(result);
         }
     });
     con.query(sql3, function (err, result) {
         if (err) {
             console.log(err.message);
         }
         else
         {
               console.log(sql3+"FUCK!");
               console.log(result);
               //res.send(result);
         }
     });
 
      var sql4="("+sql3+" INTERSECT "+sql2+" ) INTERSECT "+sql+";";
      con.query(sql4, function (err, result) {
         if (err) {
             console.log(err.message);
         }
         else
         {
               console.log(sql4);
               console.log(result);
               res.send(result);
         }
     });
      
 }