window.onload=function(){
    document.getElementById("card").innerHTML=
    `<textarea id="email" class="textarea" placeholder="Enter your email address "></textarea>
    <div class="error_box" id="error_box2"></div>
    <textarea id="password" class="textarea" placeholder="Enter your password "></textarea>
    <div class="error_box" id="error_box"></div>
    <div onclick="log_in()" class="button"><b>Log In</b></div>
    <div onclick="create()" class="button"><b>Create New Account</b></div>
    `
}
function log_in()
{
    var email=document.getElementById('email').value;
    var password=document.getElementById('password').value;
    var error_box=document.getElementById('error_box');   
    var json={
        'email':email,
        'password':password

    }
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/sign_in");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response;
        console.log(data);
        console.log(JSON.parse(data));
        if(JSON.parse(data)['status']==1)
        {
            var date = new Date();
            date.setTime(date.getTime()+315532800000);
            document.cookie="Token "+JSON.parse(data)['Token']+";expires="+date.toGMTString()+" path=/";
            let allCookies = document.cookie;
            console.log(allCookies);
            error_box.innerHTML="";
            window.open("http://localhost:8080/profile?token="+JSON.parse(data)['Token'],"_self");
        }else
        {
            error_box.innerHTML="Invalid Email or Password";
        }



        }
    xhr.send(JSON.stringify(json));
}
// ?name1=value1&name2=value2
  