function loadLoginForm () {
         var loginHtml = ` <h3>Login/Register Here for Posting Comments on the Articles!</h3>
        <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Username</label>
                <input type="text" class="form-control" id="username" placeholder="Enter Your Username" required>
            </div>
        </div>
        <div class="row control-group">
            <div class="form-group col-xs-12 floating-label-form-group controls">
              <label>Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" required>
            </div>
        </div>
        <br/>
        <input type="submit" class="btn btn-default" id="login_btn" value="Login" />
        <input type="submit" class="btn btn-default" id="register_btn" value="Register" />
        `;
             
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again?';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (username === '' || password === '') {
        alert("Username/Password field can't be left empty");
        return;
    }
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
     if (username === '' || password === '') {
        alert("Username/Password field can't be left empty");
        return;
    }
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> Hi!</h3> <p style="color:#ff0282";font-weight:bold>${escapeHTML(username).toUpperCase()}</p>
        <a href="/logout"><input type="submit" class="btn btn-default" id="logout" value="Logout" /></a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}


//site visit counter
function getCounter(){
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            var counter = request.responseText;
            var span = document.getElementById('count');
            span.innerHTML = counter.toString();
        }
    }
};
 request.open('GET', '/counter', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var articleData = JSON.parse(this.responseText);
                var content = '';
                for (var i=0; i< articleData.length; i++) {
                     content += `<div class="container">
                                <div class="row">
                               <div class="post-preview">
                                <a href="/${articleData[i].title}">
                                <h2 class="post-title">
                                     ${articleData[i].heading}
                                </h2>
                                <h3 class="post-subtitle">
                                     ${articleData[i].subtitle}
                                 </h3>
                                </a>
                    <p class="post-meta">Posted by <a href="/about.html">${articleData[i].author}</a> on (${articleData[i].date.split('T')[0]})</p>
                </div>
                </div>
                </div>`;
                }
               articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!');
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}

getCounter();
// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();
