var option=1001;
var v=2;
window.onload=function ()
{
    console.log(localStorage.getItem("lastname"));
    const xhr = new XMLHttpRequest();
    var cookie=document.cookie;
    xhr.open("POST","http://localhost:8080/get_user_info?token="+cookie.slice(6,cookie.length));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response; 
        console.log(data);
        if(data=='err')
        {
            window.open("http://localhost:8080/sign_in");
        }
        else if(JSON.parse(data)[0]['admin']==1)
        {
            document.getElementById("problemset_page").style.display = "none";
            document.getElementById("quiz_page").style.display = "none";
            document.getElementById("name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;
            document.getElementById("profile_name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;            
        }else
        {
            document.getElementById("profile_name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;  
            document.getElementById("name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;
            document.getElementById("my_name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;
            document.getElementById("my_organization").innerHTML = `<b>`+JSON.parse(data)[0]['organization']+`<b>`;
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