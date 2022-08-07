import cors from 'cors';
import express from 'express';
import { con } from '../server/sql_con.js';
import { auth } from './auth.js';
import { problemset_page } from './module/problemset.js';
import { profile_page } from './module/profile.js';
import { sign_in_page } from './module/sign_in.js';
import { verification } from './route/email_verification.js';
import { filter } from './route/filter.js';
import { getoptionwithid } from './route/getoptionwithid.js';
import { getquestionwithid } from './route/getquestionwithid.js';
import { getvarsitywithid } from './route/getversitywithid.js';
import { get_user_info } from './route/get_user_info.js';
import { getonload } from './route/problemsetonload.js';
import { sign_in } from './route/sign_in.js';
import { sign_up_req } from './route/sign_up.js';

export const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('../client/'));
con.connect(function(error)
{
    if(error)
    {
        console.log("Connection Failed");
    }else
    {
       console.log("Connection Successfull");
    }
});
function next(req,res)
{
    auth(req,res,next2);
    
}
function next2(req,res,decoded)
{
    res.send("hiiii :"+decoded.user_email);
}
app.post('/problemset/getonload',getonload);
app.post('/problemset/filter',filter);
app.post('/problemset/getquestionwithid',getquestionwithid);
app.post('/problemset/getoptionwithid',getoptionwithid);
app.post('/problemset/getvarsitywithid',getvarsitywithid);
app.post('/sign_up',sign_up_req);
app.post('/email_verification',verification);
app.post('/sign_in',sign_in);
app.post('/get_user_info',get_user_info)
app.get('/sign_in',sign_in_page);
app.get('/profile',profile_page);
app.get('/problemset',problemset_page);
app.listen(8080);
