var v_count=1;
var y_count=2001;
var subject=1001;
window.onload=function()
{
    const xhr2 = new XMLHttpRequest();
    xhr2.open("POST","http://localhost:8080/get_user_info?token="+document.cookie.slice(6,document.cookie.length));
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.onload = () => {
        let data = xhr2.response; 
        console.log(data);
        if(data=='err')
        {
            window.open("http://localhost:8080/sign_in");
        }else
        {
            document.getElementById("name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;
        }

        }
    xhr2.send(JSON.stringify({
        name:'hudai'
    }));   
    document.getElementById("new_v").onclick = function() { 
        let newdiv = document.createElement("div"); 
        newdiv.setAttribute("style","width: 90%;");
        newdiv.innerHTML=`<textarea
        id="`+v_count+`"
        class="textarea"
        placeholder="Enter varsity name  "
      ></textarea>`  
        document.getElementById("v").appendChild(newdiv); 
        v_count++;
    };
    document.getElementById("new_y").onclick = function() { 
        let newdiv = document.createElement("div"); 
        newdiv.setAttribute("style","width: 90%;");
        newdiv.innerHTML=`<textarea
        id="`+y_count+`"
        class="textarea"
        placeholder="Enter  year  "
      ></textarea>`  
        document.getElementById("y").appendChild(newdiv); 
        y_count++;
    };
    document.getElementById("new_s").onclick = function() { 
        let newdiv = document.createElement("div"); 
        newdiv.setAttribute("style","width: 90%;");
        newdiv.innerHTML=`<textarea id="`+subject+`" class="textarea"" placeholder="Enter subject  " ></textarea>`  
        document.getElementById("subjects").appendChild(newdiv); 
        subject++;
        };  
}
function open_problemset()
{
    var cookie=document.cookie;
    window.open("http://localhost:8080/problemset?token="+cookie.slice(6,cookie.length),"_self");
}
function log_out()
{
    var date = new Date();
    date.setTime(date.getTime()+315532800000);
    document.cookie="Token 0"+";expires="+date.toGMTString()+" path=/";
    var cookie=document.cookie;
    window.open("http://localhost:8080/profile?token="+cookie.slice(6,cookie.length),"_self");
}
function submit()
{
    var varsity =[] ,year= [],sub = [] ,title,start ,duration,begin,end,q_cnt;
    title=document.getElementById('title').value.trim();
    start=document.getElementById('start').value.trim();
    duration=document.getElementById('duration').value.trim();
    q_cnt=document.getElementById('q_cnt').value.trim();
    begin=new Date(start).getTime();
    end=begin+(parseInt(duration.slice(0,2))*3600+parseInt(duration.slice(3,5))*60+parseInt(duration.slice(6,8)))*1000;
    console.log((parseInt(duration.slice(0,2))*3600+parseInt(duration.slice(3,5))*60+parseInt(duration.slice(6,8)))*1000);
    for(let i =0;i<v_count;i++)
    {
        varsity[i]=document.getElementById(i.toString()).value.trim().toUpperCase();
    }
    for(let i =2000;i<y_count;i++)
    {
        year[i-2000]=document.getElementById(i.toString()).value.trim().toUpperCase();
    }
    for(let i =1000;i<subject;i++)
    {
        sub[i-1000]=document.getElementById(i.toString()).value.trim().toUpperCase();
    }
    var json2={
        'varsity':varsity,
        'year':year,
        'sub':sub
    }
    
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/problemset/filter");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response;
       // console.log(JSON.parse(data)); 
        var question=[];
        for(let i=0;i<JSON.parse(data).length;i++)
        {
            question[i]=JSON.parse(data)[i]['qid'];

        }
        var json ={
            "title":title,
            "begin":begin ,
            "end":end,
            "varsity" :varsity,
            "year" :year ,
            "sub" : sub,
            "question":question,
            "q_cnt": q_cnt
        }
        const xhr2 = new XMLHttpRequest();
        var cookie=document.cookie;
        xhr2.open("POST","http://localhost:8080/insert_quiz?token="+cookie.slice(6,cookie.length));
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.onload = () => {
       
        }
        xhr2.send(JSON.stringify(json));


        }
    xhr.send(JSON.stringify(json2));
}
function open_profile()
{
    var cookie=document.cookie;
    window.open("http://localhost:8080/profile?token="+cookie.slice(6,cookie.length),"_self");
}