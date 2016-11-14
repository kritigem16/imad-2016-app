
//counter
var button = document.getElementById('counter');
 var counter = 0;
  
  button.onclick = function () {
  
      // Make a request to the counter endpoint
     var request = new XMLHttpRequest();
      
      // Capture the response and store it in a variable
     
     // Render the variable in the correct span
     counter = counter + 1;
     var span = document.getElementById('count');
     span.innerHTML = counter.toString();
     request.onreadystatechange = function () {
       if (request.readyState === XMLHttpRequest.DONE) {
           // Take some action
           if (request.status === 200) {
               var counter = request.responseText;
               var span = document.getElementById('count');
               span.innerHTML = counter.toString();          
           }
       }  
       // Not done yet
     };
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

  var nameInput = document.getElementById('name');
  var name = nameInput.value;
  var submit = document.getElementById('submit_btn');
  submit.onclick = function () {
    
    var names = ['name1', 'name2', 'name3', 'name4'];
   var list = '';
   for (var i=0; i< names.length; i++) {
       list += '<li>' + names[i] + '</li>';
   }
   var ul = document.getElementById('namelist');
   ul.innerHTML = list;
    var request = new XMLHttpRequest();
     
     request.onreadystatechange = function () {
       if (request.readyState === XMLHttpRequest.DONE) {
           if (request.status === 200) {
               var names = request.responseText;
               names = JSON.parse(names);
               var list = '';
              for (var i=0; i< names.length; i++) {
                   list += '<li>' + names[i] + '</li>';
               }
               var ul = document.getElementById('namelist');
               ul.innerHTML = list;   
           }
       }  
     };
     
   request.open('GET','http://kritigem16.imad.hasura-app.io/submit-name?name='+name,true);
   request.send(null);
};
