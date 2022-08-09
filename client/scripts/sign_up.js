var id;
function create()
{
    let x = document.getElementById("card");
    x.innerHTML=
       `<textarea id="first_name" class="textarea" placeholder="Enter your First Name" ></textarea> 
        <textarea id="last_name" class="textarea" placeholder="Enter your Last Name"></textarea>  
        <textarea id="organization" class="textarea" placeholder="Enter your organization"></textarea> 
        <textarea id="email_sign_up" class="textarea" placeholder="Enter Your Email"></textarea>
        <textarea id="sign_up_password" class="textarea" placeholder="Enter a strong password"></textarea>
        <textarea id="verify_password" class="textarea" placeholder="Retype password"></textarea> 
        <div class="error_box "id="error_box"></div>
        <div onclick="register()"class="button"><b> Register </b></div>
         `;
}
function register()
{
    let name= document.getElementById("first_name").value.trim()+" "+document.getElementById("last_name").value.trim();
    let organization=document.getElementById("organization").value.trim();
    let email=document.getElementById("email_sign_up").value.trim();
    let x=document.getElementById("error_box");
    let x2=document.getElementById("error_box2");
    let password=document.getElementById("sign_up_password").value.trim();
    
    if(document.getElementById("sign_up_password").value.trim().localeCompare(document.getElementById("verify_password").value.trim())!=0)
    {
        x.innerHTML="Password doesn't match ";
        return ;
    }else if(document.getElementById("sign_up_password").value.trim().length<=5)
    {
        x.innerHTML="Password is not enough strong ";
        return;
    }else
    {
        x.innerHTML="";
    }
    document.getElementById("sign_up_password").value="";
    document.getElementById("first_name").value="";
    document.getElementById("last_name").value="";
    document.getElementById("organization").value="";
    document.getElementById("email_sign_up").value="";
    document.getElementById("verify_password").value="";
    let json={
        "name":name,
        "organization":organization,
        "email":email,
        "password":password,
        "photo": "hiii",
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/sign_up");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response; 
        console.log(data);
        if(data==0)
        {
            document.getElementById('dialog2').innerHTML=`
        <div style="font-size: 100%">An Email has sent to your Email Adress</div>
        <textarea
          id="verify_code"
          class="textarea"
          placeholder="Enter verification code"
        ></textarea>
        <div onclick="verify()" class="button"><b>Verify</b></div>
        <button onclick="hide()"><b>Close</b></button>`
        id=email; 
        document.getElementById('dialog').show();
        }else if(data==1)
        {
            document.getElementById('dialog2').innerHTML=`
            <div style="font-size: 100%">Email is already registered </div>
            <button onclick="hide()"><b>Close</b></button>`;
            document.getElementById('dialog').show();
        }else
        {
            document.getElementById('dialog2').innerHTML=`
            <div style="  
            font-size: 100%"><p>Registration  Unsuccessful<p></div>
            <button onclick="hide()"><b>Close</b></button>`;
            document.getElementById('dialog').show();
        }


        }
    xhr.send(JSON.stringify(json));
}
function verify()
{
    let code= document.getElementById('verify_code').value;
    document.getElementById('verify_code').innerHTML="";
    let json={
        "email":id,
        "code":code
    }
    //console.log(json);
    const xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/email_verification");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        let data = xhr.response; 
        console.log(data);
        if(data==1)
        {
            document.getElementById('dialog2').innerHTML=`
        <div style="font-size: 120%">Account is successfully registered</div>
        <button onclick="hide()"><b>Close</b></button>`;
        document.getElementById("card").innerHTML=`
        <textarea
        id="email"
        class="textarea"
        placeholder="Enter your email address "
      ></textarea>
      <div class="error_box" id="error_box2"></div>
      <textarea
        id="password"
        class="textarea"
        placeholder="Enter your password "
      ></textarea>
      <div class="button"><b>Log In</b></div>
      <div onclick="create()" class="button"><b>Create New Account</b></div>
      <div class="error_box" id="error_box"></div>
      `;
        }else
        {
            document.getElementById('dialog2').innerHTML=`
            <div style="font-size: 120%">Verification Error</div>
            <button onclick="hide()"><b>Close</b></button>`;
        }

        }
    xhr.send(JSON.stringify(json));
  
}
function hide()
{
    document.getElementById('dialog').close();
}