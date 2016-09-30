console.log('Loaded!');
//counter
var button=document.getElementById("counter");

button.oncick= function(){

 var request=new XMLHttprequest();
 request.onreadystatechange=function(){
     if(request.readyState==XMLhttpRequest.Done)
     {
     if(request.status==200)
    { var counter=request.responsetext();
     var span=document.getElementById("count");
     span.innerHTML=counter.toString(); 
}
}
 };
   request.open('GET','http://kritigem16.imad.hasura-app.io/counter',true);
   request.send(null);
} ;