// require //
const express = require("express");

const bcrypt = require('bcryptjs');

const app = express();

const PORT = 8080; // default port 8080

const morgan = require('morgan');

app.set("view engine", "ejs");

const cookieSession = require("cookie-session");

const { emailChecker, generateRandomString , urlsForUserID, emptyInput, urlDatabase} = require("./helper");

app.use(morgan('dev'));

app.use(
  cookieSession({
    name: "session",
    keys: ["anything"],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
// HELPER FUNCTIONS //



// DATABASES //

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "123"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

// const urlDatabase = {
//   b6UTxQ: {
//       longURL: "https://www.tsn.ca",
//       userID: "userRandomID"
//   },
//   i3BoGr: {
//       longURL: "https://www.google.ca",
//       userID: "aJ48lW"
//   }
// };




app.use(express.urlencoded({extended: true}));

// GET ROUTES //

app.get("/", (req, res) => {
  res.send("Hello!");
});



app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/register", (req, res) => {
  let templateVars = {
    user: null
  };
  res.render("urls_register", templateVars);
});

app.get("/urls", (req, res) => {
  // console.log("/urls",req.cookies);
  const id = req.session.user_id;
  if (!id) {
    res.status(401).send("Please Login");
  }
  const userURLS = urlsForUserID(id);
  // console.log("user",users[id]);
  // const user = req.cookies[""]
  const templateVars = {
    user: users[id],
    username: req.session["userName"],
    urls: userURLS  // ... any other vars
  };
  res.render("urls_index", templateVars);
});


app.get("/urls/new", (req, res) => {
  
  const id = req.session.user_id;
  if (!id) {
    return res.redirect("/login");
  }
  const user = users[id];
  const templateVars = {
    user
  };
  
  res.render("urls_new", templateVars);

});


app.get("/urls/:shortURL", (req, res) => {
  const id = req.session.user_id;
  const user = users[id];
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[req.params.shortURL].longURL;
  if (!id) {
    return res.redirect("/login");
  }
  const templateVars = { shortURL, longURL, user};
  res.render("urls_show", templateVars);
});


app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  if (!longURL) {
    return res.status(404).send("URL does not exist");
  }
  res.redirect(longURL);
});

app.get("/login", (req, res) => {
  const id = req.session.user_id;
  let user = null;
  if (id) {
    user = users[id];
  }
  const templateVars = {user:user};
  res.render("urls_login", templateVars);
});

// app.post

app.post("/urls", (req, res) => {
  console.log(req.body);
  const id = req.session.user_id;
  if (!id) {
    return res.status(401).send("Please Log In");
  }
  const shortUrl = generateRandomString();  // creating a new shortUrl using the new function
  const longURL = req.body.longURL; // the new longUrl is coming from the form submission
  urlDatabase[shortUrl] = {longURL: longURL, userID:id}; // add new shortUrl to the urlDatabase object
  res.redirect("/urls/");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const id = req.session.user_id;
  if (!id) {
    return res.status(401).send("Please Log In");
  }
  delete urlDatabase[req.params.shortURL];
  console.log(req.params.shortURL);
  res.redirect("/urls");
});

app.post("/urls/:shortURL/", (req, res) => {
  const id = req.session.user_id;
  if (!id) {
    return res.status(401).send("Please Log In");
  }
  const longURL = req.body.longURL;
  const shortUrl = req.params.shortURL;

  urlDatabase[shortUrl] = {longURL: longURL, userID:id};
  console.log(req.body.longURL);
  res.redirect("/urls");
});

  
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const filledOutInput = emptyInput(email, password);
  console.log(req.body);
  console.log("emptyarray",filledOutInput);
  if (!filledOutInput) {
    return res.send("Invalid input");
  }

  const user = emailChecker(email, users);
  console.log(user);
  if (!user) {
    return res.status(400).send("Invalid email");
  }
  if (!bcrypt.compareSync(password, users[user.id].password)) {
    return res.status(400).send("Invalid Password");
  }
  req.session.user_id =  user.id;
  res.redirect('/urls');

 
});


app.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/login");
});


app.post("/register" , (req, res) =>{
  const id = generateRandomString();
  const email = req.body.email;
  const password = req.body.password;

  // let password =  bcrypt.hashSync(password, 10);
  console.log("hashed", password);
  const validEmail = emptyInput(email, password);
  if (!validEmail) {
    return res.status(400).send("Please enter a valid username and password");
  }
  const checkEmail = emailChecker(email, users);
  console.log(email);
  if (checkEmail) {
    return res.status(400).send("Email already exists, Please enter a new email");
  }
  users[id] = {
    id: id,
    email: email,
    password: bcrypt.hashSync(password, 10)
  };

  req.session.user_id =  id;
  res.redirect("/urls");
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  console.log("email", email);
  
});


app.listen(PORT, () => {
  console.log(`Tinyapp listening on port ${PORT}!`);
});

