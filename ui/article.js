var currentArticleTitle = window.location.pathname.split('/')[1];

function loadCommentForm () {
    var commentFormHtml = `
        <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Write your Comment</label>
        <textarea id="comment_text" rows="4" cols="80" class="form-control" placeholder="Enter your comment here..." required>
        </textarea>
        </div>
        </div>
        <br/>
        <input type="submit" class="btn btn-default" id="submit" value="Submit" />
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                // Take some action
                if (request.status === 200) {
                    // clear the form & reload all the comments
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        if (comment ==='') {
        alert("Comments field can't be left empty");
        return;
    }
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));  
        submit.value = 'Submitting...';
        
    };
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p style="color:#550C73">${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            <div style='color:#04d99d;font-weight:bold;font-variant: small-caps'>${escapeHTML(commentsData[i].username)}</div> - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()}
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();
loadComments();