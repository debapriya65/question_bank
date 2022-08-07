window.onload=function()
{
    let x = document.getElementById("lists");
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
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/problemset/getonload");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response;
        download(JSON.parse(data),x); 

        }
    xhr.send(JSON.stringify(["hii"]));

	var dialog = document.getElementById('dialog');    
    document.getElementById('filterproblem').onclick = function() {    
        dialog.show();    
    };    
    document.getElementById('hide').onclick = function() {    
        dialog.close();    
    };   
}
function varsity_add()
{
    let x = document.getElementById("showvarsity");
    let y = document.getElementById("Varsity_name");
    x.innerHTML=x.innerHTML+" "+y.value.trim().toUpperCase();
    y.value="";
}
function year_add()
{
    let x = document.getElementById("showyear");
    let y = document.getElementById("year_first");
    let z = document.getElementById("year_second");   
    for(let i=y.value.trim();i<=z.value.trim();i++)
    {
        x.innerHTML=x.innerHTML+" "+i;
    }
    z.value="";
    y.value="";
    //x.innerHTML=x.innerHTML+" "+y.value.trim()+"-"+z.value.trim();
}
function sub_select(s)
{

    let x = document.getElementById(s);
    if(x.style.background.localeCompare("rgb(50, 90, 168)")!=0)
    {
        x.style.background="#325aa8";
    }else
    {
        x.style.background="white";
    }
}
function filter()
{
    let json='{"varsity":[';
    let varsitys=document.getElementById("showvarsity").innerHTML.trim()+" ";
    let cur="";
    for(let i=0;i<varsitys.length;i++)
    {
        if(varsitys.charAt(i).localeCompare(" ")==0)
        {
            if(i==varsitys.length-1)
            {
                json=json+'"'+cur+'"]';
            }else
                json=json+'"'+cur+'",';
            cur="";
        }else
            cur=cur+varsitys.charAt(i);

    }
    json=json+',\n"year":[';
    let year=document.getElementById("showyear").innerHTML.trim()+" ";
    cur="";
    for(let i=0;i<year.length;i++)
    {
        if(year.charAt(i).localeCompare(" ")==0)
        {
            if(i==year.length-1)
            {
                json=json+'"'+cur+'"]';
            }else
                json=json+'"'+cur+'",';
            cur="";
        }else
            cur=cur+year.charAt(i);

    }
    json=json+',\n"sub":[';
    var flag=0;
    if(document.getElementById("phy").style.background.localeCompare("rgb(50, 90, 168)")==0)
    {
        flag=1;
        json+='"PHYSICS"';
        document.getElementById("phy").style.background="white";
    }
    if(document.getElementById("che").style.background.localeCompare("rgb(50, 90, 168)")==0)
    {
        if(flag==1)
        {
            json+=',"CHEMISTRY"';
        }
        else
            json+='"CHEMISTRY"';
        flag=1;
        document.getElementById("che").style.background="white";
        
    }
    if(document.getElementById("math").style.background.localeCompare("rgb(50, 90, 168)")==0)
    {
        if(flag==1)
        {
            json+=',"MATH"';
        }
        else
            json+='"MATH"';
        flag=1;
        document.getElementById("math").style.background="white";
    }
    if(document.getElementById("bio").style.background.localeCompare("rgb(50, 90, 168)")==0)
    {
        if(flag==1)
        {
            json+=',"BIOLOGY"';
        }
        else
            json+='"BIOLOGY"';
        flag=1;
        document.getElementById("bio").style.background="white";
    }

    json=json+"]\n}"
   // console.log(JSON.parse(json));
    let x = document.getElementById("lists");
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/problemset/filter");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response;
        x.innerHTML="";
        download(JSON.parse(data),x); 

        }
    xhr.send(json);
    document.getElementById("showvarsity").innerHTML="";
    document.getElementById("showyear").innerHTML="";
    
    document.getElementById('dialog').close();
    
}
function download(x,y)
{
    var cur=new Array(x.length);
    for(let i=0 ; i<x.length ; i++)
    {
        let value,sol,options,right=0,wrong=0,sub,varsity;
        const xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost:8080/problemset/getquestionwithid?id="+x[i]['qid']);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
        let data = xhr.response;
        sub=JSON.parse(data)[0]['sub'];
        sol=JSON.parse(data)[0]['sol'];
        value=JSON.parse(data)[0]['value'];
        //console.log(value);
        // For options

        const xhr2 = new XMLHttpRequest();
        xhr2.open("POST","http://localhost:8080/problemset/getoptionwithid?id="+x[i]['qid']);
        xhr2.setRequestHeader('Content-Type', 'application/json');
        xhr2.onload = () => {
        let data = xhr2.response;
        options = new Array(JSON.parse(data).length);
        for(let j=0;j<JSON.parse(data).length;j++)
        {
            options[j]=JSON.parse(data)[j]['value'];
        }
      //  console.log(options); 

        // For varsity-year

        const xhr3 = new XMLHttpRequest();
        xhr3.open("POST","http://localhost:8080/problemset/getvarsitywithid?id="+x[i]['qid']);
        xhr3.setRequestHeader('Content-Type', 'application/json');
        xhr3.onload = () => {
        let data = xhr3.response;
        varsity=new Array(JSON.parse(data).length)
        for(let j=0;j<JSON.parse(data).length;j++)
        {
            varsity[j]=JSON.parse(data)[j]['varsity']+"-"+JSON.parse(data)[j]['year']; 
        }
       // console.log(varsity);
        cur[i]=new q(x[i]['qid'],value,options,right,wrong,varsity,sub,sol,false);
        console.log(value);
        y.appendChild(cur[i].create());
        console.log(cur[i]);
        
        }
        xhr3.send(JSON.stringify(["hii"]));

        }
        xhr2.send(JSON.stringify(["hii"]));
        



        }
        xhr.send(JSON.stringify(["hii"]));
    }
}
function open_profile()
{
    var cookie=document.cookie;
    window.open("http://localhost:8080/profile?token="+cookie.slice(6,cookie.length),"_self");
}
function log_out()
{
    var date = new Date();
    date.setTime(date.getTime()+315532800000);
    document.cookie="Token 0"+";expires="+date.toGMTString()+" path=/";
    var cookie=document.cookie;
    window.open("http://localhost:8080/problemset?token="+cookie.slice(6,cookie.length),"_self");
}