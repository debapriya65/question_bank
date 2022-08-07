import { auth_get } from '../auth.js';
export function problemset_page(req,res)
{
    auth_get(req,res,next);

}
function next(req,res,decoded)
{
    res.sendFile("problemset.html",{root:'../client/views'});
}