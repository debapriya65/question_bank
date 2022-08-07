import jwt from 'jsonwebtoken';
export function auth(req,res,next)
{
    jwt.verify(req.query.token,"secret", function(err, decoded) {

        if(err)
        {
            res.send("err");
        }else
        {
            next(req,res,decoded);
        }
      }
      );


}
export function auth_get(req,res,next)
{
    jwt.verify(req.query.token,"secret", function(err, decoded) {

        if(err)
        {
            res.sendFile("index.html",{root:'../client/views'});
        }else
        {
            next(req,res,decoded);
        }
      }
      );


}