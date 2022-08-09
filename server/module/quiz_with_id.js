//import { auth_get } from '../auth.js';
export function quiz_with_id(req,res)
{
    //auth_get(req,res,next);
    res.sendFile("quiz_with_id.html",{root:'../client/views'});

}
function next(req,res,decoded)
{
    res.sendFile("problemset.html",{root:'../client/views'});
}