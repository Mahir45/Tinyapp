const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const morgan = require('morgan')
app.set("view engine", "ejs");
const cookies = require("cookie-parser");
app.use(cookies());
app.use(morgan('dev'))

function generateRandomString()  {
  return Math.random().toString(36).slice(6);
}
const emptyarray = (email, password) => {
  if (!email || !password) {
    return false 
  }
  return true; 

};
const emailChecker = (email, users) => {
  for (let key in users)
    if (email === users[key].email) {
      return key;
    }
  return undefined

};
// const loginEmailCheck = (email) => {
//   for (const user in users) {
//     //console.log(user);
//     if (email === users[user].email) {
//       return users[user];
//     }
//   }
//   return null;
// };

const authenticateUser = function(users, email, password) {
  let userFound = emailChecker(users, email)
  if (userFound){
    return userFound
  } 
  return false
  // for (const key in users) {
  //   if ((email === users[key].email) && (password === users[key].password)) {
  //     return users;
  //   }
  // }
}
const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
// const bodyParser = require("body-parser");
app.use(express.urlencoded({extended: true}));

// app.get

app.get("/", (req, res) => {
  res.send("Hello!");
});

// app.listen(PORT, () => {
//   console.log(`Tinyapp listening on port ${PORT}!`);
// });

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});
app.get("/register", (req, res) => {
  res.render("urls_register");
});

app.get("/urls", (req, res) => {
  // console.log("/urls",req.cookies);
  id = req.cookies["user_id"];
  // console.log("user",users[id]);
  const templateVars = {
    user: users[id],
    username: req.cookies["userName"],
    urls: urlDatabase // ... any other vars
  };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  console.log(req.cookies);
  const id = req.cookies["user_id"];
  
  const user = users[id];
  const templateVars = {
    user
  };
  

  res.render("urls_new", templateVars);

});
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.get("/login", (req, res) => {
  
  res.render("urls_login");
});

// app.post 

app.post("/urls", (req, res) => {
  console.log(req.body);
  const shortUrl = generateRandomString();  // creating a new shortUrl using the new function
  const longURL = req.body.longURL; // the new longUrl is coming from the form submission
  urlDatabase[shortUrl] = longURL; // add new shortUrl to the urlDatabase object
  res.redirect("/urls/");
});
app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
  console.log(req.params.shortURL);
  res.redirect("/urls");
});

app.post("/urls/:shortURL/", (req, res) => {
//  console.log(req.params.shortURL)
//  console.log(req.body.longURL)
  const longURL = req.body.longURL;
  const shortURL = req.params.shortURL;
  urlDatabase[shortURL] = longURL;
  console.log(req.body.longURL);
  res.redirect("/urls");
});

  
  //  return res.status(400).send("User already exists");
  // 


app.post("/login", (req, res) => {
  const email = req.body.email;
    const password = req.body.password;
        // console.log("TESTING",email, password);
  // loop through users obj and check to see if the email and password exist
  // if they do set req.cookies.id also set "user"{email:useremail}
  const validUser = emptyarray(email, password)
  console.log("emptyarray",validUser)
  if(!validUser) {
    return res.send("Invalid input") 
  }
//  const emailUse = authenticateUser(email, password)
//  if (!emailUse){
//    return res.status(400).send("Invalid email please register or enter a valid email")
//  }
  const result = authenticateUser(users, email, password);
  console.log(result)

  // console.log("TESTING RESULT",result);
  if (result) {
    res.cookie("user_id", result.id);
    res.redirect("/urls");
    //user was authenticate and everything looks ok.y){
  } else {
    res.status(400).send("Invalid email or password");
  }
 
});
app.post("/logout", (req, res) => {
  //console.log("We are htting this route");
  res.clearCookie("user_id"); // clears the cookies that was stored
  res.redirect("/urls"); // redirects to the original url page
});

app.post("/register" , (req, res) =>{
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;
  const validEmail = emptyarray(email, password);
  if (!validEmail) {
    return res.status(400).send("Please enter a valid username and password");
  }
  const checkEmail = emailChecker(email);
  if (checkEmail) {
    return res.status(400).send("Email already exists, Please enter a new email");
  }
  users[id] = {
    id: id,
    email: email,
    password: password
  };
  
  res.cookie("user_id", id);
  //console.log("TEST",users);
  res.redirect("/urls");
});

app.post("/login", (req, res) => {
 const email = req.body.email 
 console.log("email", email)
  
});
app.listen(PORT, () => {
  console.log(`Tinyapp listening on port ${PORT}!`);
});


