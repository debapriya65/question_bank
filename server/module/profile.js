import { auth_get } from '../auth.js';

export function profile_page(req,res)
{
    auth_get(req,res,next);
}
function next(req,res,decoded)
{
    res.sendFile("profile.html",{root:'../client/views'});
}