window.onload=function ()
{
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
        }else
        {
            document.getElementById("name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;
            document.getElementById("my_name").innerHTML = `<b>`+JSON.parse(data)[0]['name']+`<b>`;
            document.getElementById("my_organization").innerHTML = `<b>`+JSON.parse(data)[0]['organization']+`<b>`;
        }

        }
    xhr.send(JSON.stringify({
        name:'hudai'
    }));

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