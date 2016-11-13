
//counter
var button = document.getElementById('counter');

button.onclick= function(){

 var request = new XMLHttpRequest();
 request.onreadystatechange = function() {
     if(request.readyState===XMLHttpRequest.DONE)
     {
     if(request.status===200)
    { 
     var counter = request.responseText();
     var span = document.getElementById('count');
     span.innerHTML= counter.toString(); 
}
}
 };
   request.open('GET','http://kritigem16.imad.hasura-app.io/counter',true);
   request.send(null);
};

var submitComment = document.getElementById('submit_comment');
submitComment.onclick = function () {
    //create a request object
    var request = new XMLHttpRequest();
    //capture the response and store it in a variable
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            //Take some action
            if (request.status === 200) {
                //capture a list of comments and render it as a list
               var comments = request.responseText;
               comments = JSON.parse(comments);
               var list = '';
               for (var i=0; i<comments.length; i++) {
                   list += '<li>' + comments[i] + '</li>';
                   
               }
               var ul = document.getElementById('commentList');
               ul.innerHTML = list;
            }
        }
    };
    
     //make the request
     var commentInput = document.getElementById('comment');
     var comment = commentInput.value;
     request.open('GET','http://kritigem16.imad.hasura-app.io/submit-comment?comment=' + comment, true);
     request.send(null);
    
};

var submit=document.getElementById('submit_btn');
submit.onclick= function(){
    
    var request = new XMLHttpRequest();
 request.onreadystatechange = function(){
     if(request.readyState===XMLHttpRequest.DONE)
     {
     if(request.status===200)
    { 
      var names=request.responseText;
      names=JSON.parsify(names);
    var list='';
    for(var i=0;i<names.length;i++)
    {
        list+='<li>'+names[i]+ '</li>';
}
var ul=document.getElementById('nameList');
ul.innerHTML= list;
}
}
 };
 var nameInput=document.getElementById('name');
 var name= nameInput.value;
   request.open('GET','http://kritigem16.imad.hasura-app.io/submit-name?name='+name,true);
   request.send(null);
};
