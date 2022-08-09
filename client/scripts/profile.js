var option=1001;
var v=2;
window.onload=function ()
{
    const xhr = new XMLHttpRequest();
    var cookie=document.cookie;
    xhr.open("POST","http://localhost:8080/get_user_info?token="+cookie.slice(6,cookie.length));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response; 
        for(let i=0;i<JSON.parse(data)[1].length;i++)
        {
            if(i==0)
            {
                let newdiv1 = document.createElement("div"); 
                document.getElementById('list').appendChild(newdiv1);
                newdiv1.setAttribute("style"," display:flex;flex-direction:row;width: 60%;background-color: white;padding:1%;margin:0.4%;border-radius: 1px;border-style:solid;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-width: 1.5px;border-color:#c4c4c4;");
                let title = document.createElement("div");
                title.innerHTML="Contest Title";
                let id = document.createElement("div");
                id.setAttribute("style","width:20%;");
                id.innerHTML="ID";
                newdiv1.appendChild(id);
                newdiv1.appendChild(title);

            }
            let newdiv = document.createElement("div"); 
            newdiv.onclick=function(){
                localStorage.setItem("id",JSON.parse(data)[1][i]['id'])
                window.open("http://localhost:8080/open_quiz?id="+JSON.parse(data)[1][i]['id'],"_self");
            }
            document.getElementById('list').appendChild(newdiv);
            newdiv.setAttribute("style","display:flex;flex-direction:row; width: 60%;background-color: white;padding:1%;margin:0.4%;border-radius: 1px;border-style:solid;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-width: 1.5px;border-color:#c4c4c4;");
            let title = document.createElement("div");
            title.innerHTML="Contest Title";
            let id = document.createElement("div");
            id.setAttribute("style","width:20%;");
            id.innerHTML=JSON.parse(data)[1][i]['id'];
            newdiv.appendChild(id);
            newdiv.appendChild(title);
            const xhr2 = new XMLHttpRequest();
            xhr2.open("POST","http://localhost:8080/get_quiz_info?id="+JSON.parse(data)[1][i]['id']);
            xhr2.setRequestHeader('Content-Type', 'application/json');
            xhr2.onload = () => {
                let data = xhr2.response; 
                if(data=='err')
                {
                   window.open("http://localhost:8080/sign_in");
                }else
                {
                    title.innerHTML = `<b>`+JSON.parse(data)[0]['title']+`<b>`;
                }

            }
            xhr2.send(JSON.stringify({
                name:'hudai'
            }));

            //document.getElementById('list').innerHTML=i;
        }
        if(data=='err')
        {
            window.open("http://localhost:8080/sign_in");
        }
        else if(JSON.parse(data)[0][0]['admin']==1)
        {
            document.getElementById("problemset_page").style.display = "none";
            document.getElementById("quiz_page").style.display = "none";
            document.getElementById("name").innerHTML = `<b>`+JSON.parse(data)[0][0]['name']+`<b>`;
            document.getElementById("profile_name").innerHTML = `<b>`+JSON.parse(data)[0][0]['name']+`<b>`;            
        }else
        {
            document.getElementById("profile_name").innerHTML = `<b>`+JSON.parse(data)[0][0]['name']+`<b>`;  
            document.getElementById("name").innerHTML = `<b>`+JSON.parse(data)[0][0]['name']+`<b>`;
            document.getElementById("my_name").innerHTML = `<b>`+JSON.parse(data)[0][0]['name']+`<b>`;
            document.getElementById("my_organization").innerHTML = `<b>`+JSON.parse(data)[0][0]['organization']+`<b>`;
        }
        
        }
    xhr.send(JSON.stringify({
        name:'hudai'
    }));
    document.getElementById("new_o").onclick = function() { 
    let newdiv = document.createElement("div"); 
    newdiv.setAttribute("style","width: 90%;");
    newdiv.innerHTML=`<textarea id="`+option+`" class="textarea"" placeholder="Enter option  " ></textarea>`  
    document.getElementById("options").appendChild(newdiv); 
    option++;
    };  
    document.getElementById("new_v").onclick = function() { 
        let newdiv = document.createElement("div"); 
        newdiv.setAttribute("style",`width: 100%;display:flex;flex-direction: row;justify-content: center;align-items: center;`);
        newdiv.innerHTML=`<textarea
        id="`+v+`"
        class="textarea"
        style="width: 45%"
        placeholder="Enter varsity name  "
      ></textarea>
      <textarea
        id="0`+v+`"
        class="textarea"
        style="width: 45%"
        placeholder="Enter year "
      ></textarea>`  
        document.getElementById("v/y").appendChild(newdiv); 
        v++;
    };

    
    

}
function open_problemset()
{
    var cookie=document.cookie;
    window.open("http://localhost:8080/problemset?token="+cookie.slice(6,cookie.length),"_self");
}
function open_quiz()
{
    var cookie=document.cookie;
    window.open("http://localhost:8080/quiz?token="+cookie.slice(6,cookie.length),"_self");
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
    var varsity =[] ,year= [] ,question ,options=[];
    question=document.getElementById('question').value;
    for(let i =1;i<v;i++)
    {
        varsity[i-1]=document.getElementById(i.toString()).value;
        year[i-1]=document.getElementById("0"+i.toString()).value;
    }
    for(let i =1000;i<option;i++)
    {
        options[i-1000]=document.getElementById(i.toString()).value;
    }
    var sol=document.getElementById('sol').value;
    var sub=document.getElementById('sub').value;
    var json ={
        "question": question,
        "varsity" :varsity,
         "year" :year ,
         "option" : options,
         "solution" : sol,
         "sub" : sub
    }
    const xhr = new XMLHttpRequest();
    var cookie=document.cookie;
    xhr.open("POST","http://localhost:8080/insert_question?token="+cookie.slice(6,cookie.length));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
       
        }
    xhr.send(JSON.stringify(json));
}