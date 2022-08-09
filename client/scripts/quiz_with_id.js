var mode;
var json;
window.onload=function()
{
    const xhr5 = new XMLHttpRequest();
    xhr5.open("POST","http://localhost:8080/get_qq_info?id="+localStorage.getItem("id"));
    xhr5.setRequestHeader('Content-Type', 'application/json');
    xhr5.onload = () => {
        let data = xhr5.response; 
        if(data=='err')
        {
            window.open("http://localhost:8080/sign_in");
        }else
        {
            json=JSON.parse(data);
        }
                
    }
    xhr5.send(JSON.stringify({
       name:'hudai'
    }));
    let x = document.getElementById("lists");
    const xhr2 = new XMLHttpRequest();
    xhr2.open("POST","http://localhost:8080/get_quiz_info?id="+localStorage.getItem("id"));
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.onload = () => {
        let data = xhr2.response; 
        if(data=='err')
        {
            window.open("http://localhost:8080/sign_in");
        }else
        {
            document.getElementById("title").innerHTML = `<b>`+JSON.parse(data)[0]['title']+`<b>`;
            if(JSON.parse(data)[0]['result']=='0')
                {
                    mode=0;
                    document.getElementById('result').style.display="none";
                }
            else
                {
                    mode=1;
                    document.getElementById('result').innerHTML=JSON.parse(data)[0]['result'];
                }
            
            const xhr = new XMLHttpRequest();
            xhr.open("POST","http://localhost:8080/get_question_with_quiz_id?id="+localStorage.getItem("id"));
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                    let data = xhr.response;
                    download(JSON.parse(data),x); 

            }
            xhr.send(JSON.stringify(["hii"]));
        }

        }
    xhr2.send(JSON.stringify({
        name:'hudai'
    }));

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
        // console.log(value);
        y.appendChild(cur[i].create(mode));
        // console.log(cur[i]);

            for(let mno=0;mno<cur[i].options.length;mno++)
            {
                if(mode==0||mode==1)
                {   
                    document.getElementById(cur[i].id.toString()+mno.toString()).onclick=function()
                    {
                        for(let mnk=0;mnk<cur[i].options.length;mnk++)
                            document.getElementById(cur[i].id.toString()+mnk.toString()).setAttribute("style","  background-color: white;");
                        document.getElementById(cur[i].id.toString()+mno.toString()).setAttribute("style","  background: #3287a8;");
            
                    }
                }
                
            }
            if(mode==1)
            {
                
                let temp;
                for(let mno=0;mno<json.length;mno++)
                {
                    if(json[mno].qid==cur[i].id)
                    {
                        temp=mno;
                    }
                }
                
                if( json[temp].ans-1 == (cur[i].ans.charCodeAt(8)-65))
                {
                    console.log(cur[i].id.toString()+(json[temp].ans-1).toString())
                    document.getElementById(cur[i].id.toString()+(json[temp].ans-1).toString()).setAttribute("style"," background: #00FF00");
                }else
                {
                    console.log(cur[i].id.toString()+(json[temp].ans-1).toString())
                    document.getElementById(cur[i].id.toString()+(json[temp].ans-1).toString()).setAttribute("style"," background: #FF0000");
                }
            }
        if(i==x.length -1)
        {
            document.getElementById('submit').onclick=function()
            {
                let temp=0,marks=0;
                for(let mno=0;mno<x.length;mno++)
                {
                    for(let mnk=0;mnk<cur[mno].options.length;mnk++)
                    {
                       if(document.getElementById(cur[mno].id.toString()+mnk.toString()).style.background=="rgb(50, 135, 168)")
                       {
                            temp=mnk+1;
                            if(mnk==cur[mno].ans.charCodeAt(8)-65)
                            {
                                marks=marks+1;
                            }
                       }
                    }
                    const xhr5 = new XMLHttpRequest();
                    // console.log(localStorage.getItem("id")+" "+cur[mno].id+" "+temp);
                    xhr5.open("POST","http://localhost:8080/submit_ans?id="+localStorage.getItem("id")+"&qid="+cur[mno].id+"&ans="+temp+"&marks="+marks+"&total="+x.length);
                    xhr5.setRequestHeader('Content-Type', 'application/json');
                    xhr5.onload = () => {
                        let data = xhr5.response; 
                        if(data=='err')
                        {
                            window.open("http://localhost:8080/sign_in");
                        }else
                        {
                            localStorage.setItem("id",localStorage.getItem("id"));
                            window.open("http://localhost:8080/open_quiz?id="+localStorage.getItem("id"),"_self")
                        }
                
                        }
                    xhr5.send(JSON.stringify({
                        name:'hudai'
                    }));        
                }
            }
            
        }
        }
        xhr3.send(JSON.stringify(["hii"]));

        }
        xhr2.send(JSON.stringify(["hii"]));
        



        }
        xhr.send(JSON.stringify(["hii"]));
    }
}