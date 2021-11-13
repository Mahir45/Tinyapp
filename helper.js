const urlDatabase = {
  b6UTxQ: {
      longURL: "https://www.tsn.ca",
      userID: "userRandomID"
  },
  i3BoGr: {
      longURL: "https://www.google.ca",
      userID: "aJ48lW"
  }
};

const emailChecker = (email, users) => {
  for (let key in users) {

    console.log("user", users[key])
      if (email === users[key].email) {
        return users[key];
  }
    }
  return undefined

};

function generateRandomString()  {
  return Math.random().toString(36).slice(6);
}

const urlsForUserID = function (id) {
  let userURL = {}
  let keysOfUrldatabase = Object.keys(urlDatabase)  
  for (let i in keysOfUrldatabase) {
    if (id === urlDatabase[keysOfUrldatabase[i]].userID) {
       userURL[keysOfUrldatabase[i]] = urlDatabase[keysOfUrldatabase[i]]
       }
    
  } return userURL
}

const emptyInput = (email, password) => {
  if (!email || !password) {
    return false 
  }
  return true; 

};



module.exports ={ emailChecker, generateRandomString , urlsForUserID, emptyInput, urlDatabase}