
export function sign_in_page (req,res){

    res.sendFile("index.html",{root:'../client/views'});
}