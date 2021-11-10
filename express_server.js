const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
app.set("view engine", "ejs");
const cookies = require("cookie-parser");

app.use(cookies());

function generateRandomString()  {
  return Math.random().toString(36).slice(6);
}




const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Tinyapp listening on port ${PORT}!`);
});
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = {
    username: req.cookies["userName"],
    urls: urlDatabase // ... any other vars
  };
  res.render("urls_index", templateVars);
});
app.get("/urls/new", (req, res) => {
  const templateVars = {
    username: req.cookies["userName"],
  };
  res.render("urls_new", templateVars);

});
app.get("/urls/:shortURL", (req, res) => {
  const templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
  res.render("urls_show", templateVars);
});
app.post("/urls", (req, res) => {
  console.log(req.body);
  const shortUrl = generateRandomString()  // creating a new shortUrl using the new function 
  const longURL = req.body.longURL // the new longUrl is coming from the form submission
  urlDatabase[shortUrl] = longURL // add new shortUrl to the urlDatabase object
  res.redirect("/urls/");
});
app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});
app.post("/urls/:shortURL/delete", (req, res) => {
  delete urlDatabase[req.params.shortURL];
console.log(req.params.shortURL)
res.redirect("/urls")
});

app.post("/urls/:shortURL/", (req, res) => {
//  console.log(req.params.shortURL)
//  console.log(req.body.longURL)
 const longURL = req.body.longURL
 const shortURL = req.params.shortURL
 urlDatabase[shortURL] = longURL
 console.log(req.body.longURL)
res.redirect("/urls")
});
app.post("/login", (req, res) => {
const userName = req.body.username
const password = req.body.password
 // set a cookie here
res.cookie('userName', userName)
res.redirect("/urls")
});
app.post("/logout", (req, res) => {
  res.clearCookie('userName') // clears the cookies that was stored 
  res.redirect("/urls") // redirects to the original url page
});

