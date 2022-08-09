window.onload=function()
{
    let x = document.getElementById("lists");
    const xhr2 = new XMLHttpRequest();
    xhr2.open("POST","http://localhost:8080/get_quiz_info?id="+"9");
    xhr2.setRequestHeader('Content-Type', 'application/json');
    xhr2.onload = () => {
        let data = xhr2.response; 
        if(data=='err')
        {
            window.open("http://localhost:8080/sign_in");
        }else
        {
            document.getElementById("title").innerHTML = `<b>`+JSON.parse(data)[0]['title']+`<b>`;
        }

        }
    xhr2.send(JSON.stringify({
        name:'hudai'
    }));

    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/get_question_with_quiz_id?id="+"9");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response;
        console.log(JSON.parse(data));
        console.log("fuck \n\n\n\n");
        download(JSON.parse(data),x); 

        }
    xhr.send(JSON.stringify(["hii"]));
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