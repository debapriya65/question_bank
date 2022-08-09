import { auth_get } from '../auth.js';
export function quiz_page(req,res)
{
    auth_get(req,res,next);
}
function next(req,res,decoded)
{
    res.sendFile("quiz.html",{root:'../client/views'});
}