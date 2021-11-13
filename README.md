 Dependencies 
 =============
Node.js

Express

EJS

bcrypt

body-parser

cookie-session

Final Product
=============

![https://github.com/Mahir45/Tinyapp/blob/main/docs/ulrs.png?raw=true](#)

![https://github.com/Mahir45/Tinyapp/blob/main/docs/urls_new.png?raw=true](#)


![https://github.com/Mahir45/Tinyapp/blob/main/docs/urls_register.png?raw=true](#)


Getting Started
 =============
Install all dependencies (using 
the npm install command).
Run the development web server using the node express_server.js command.
Go to localhost:8080 on your browser, enjoy!
How To Use TinyApp

Register/Login
 --------------- 
Users must be logged in to create new links, view them, and edit them.

Just click Register on right top, put in your email and password, and you're good to go.

Create New Links
--------------- 

Either click Create a New Short Link in My URLs page, or Create New URL on navigation bar.

Then simply enter the long URL you want to shorten.

Edit or Delete URLS
--------------- 

In My URLs, you can delete any link you want.

You can also click Edit, and then enter a new long URL to update your link. It will be the same short URL, but redirect to an updated long URL.

Use Your Short Link
--------------- 

The path to use any short link is /u/:shorturl. This will redirect you to the long URL.

Also you can reach this by clicking edit on a link, and using the link corresponding to the short URL.