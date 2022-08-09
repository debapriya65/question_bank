class q{
    
    constructor(id,value,options,right,wrong,varsity,sub,ans,show)
    {
        this.id=id;
        this.value=value;
        this.options=options;
        this.right=right;
        this.wrong=wrong;
        this.varsity=varsity;
        this.sub=sub;
        this.ans=ans;
        this.show=show;
    }
    create(mode)
    {
        let newdiv = document.createElement("div");
        let header = document.createElement("div");
        header.classList.add("header");
        let ques=document.createElement("div");
        ques.classList.add("ques");
        ques.innerHTML=this.value;
        let ans1=this.ans;
        header.appendChild(ques);
        let tag = document.createElement("div");
        tag.setAttribute("style"," font-size: 90%;");
        let tagg=this.varsity[0];
        for(let i=1;i<this.varsity.length;i++)
        {
            tagg=tagg+" "+this.varsity[i];
        }
        tag.innerHTML=tagg;
        header.appendChild(tag);
        newdiv.appendChild(header);
        for(let i=0;i<this.options.length;i++)
        {
            let temp = document.createElement("div");
            temp.classList.add("options");
            temp.innerHTML=String.fromCharCode('A'.charCodeAt(0)+i)+".  "+this.options[i];
            temp.setAttribute("style","margin: 2%;");
            temp.setAttribute("id",this.id.toString()+i.toString());
            newdiv.appendChild(temp);

        }

        if(mode==1)
        {
            let footer = document.createElement("div");
            let Solution=document.createElement("button");
            Solution.setAttribute("style"," background: #34a8eb;border-radius: 10px;margin-left: 3%;margin: 1;");
            Solution.innerHTML="Solution";
            let show1=this.show;

            let pen = document.createElement("div");
            Solution.onclick=function(){
                if(show1==false)
                {
                    pen.innerHTML=ans1;
                    pen.setAttribute("style","display:flex;font-size: 100%;margin-left: 2%;");
                    newdiv.appendChild(pen);
                    show1=true;
                }else
                {
                    pen.setAttribute("style","display:none;");
                    show1=false;
                }
                
            
            }
            footer.appendChild(Solution);
            newdiv.appendChild(footer);
        }
        newdiv.setAttribute("style","background-color: white;padding:1%;margin:3%;width:70%;border-radius: 10px;border-style:solid;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);border-width: 1.5px;border-color:#c4c4c4;");
        return newdiv;
    }
    

}