# 🌽 Node Farm 🥦 Web API with Node.js

Node Farm is a web API built with Node.js and it provides data on different farm products (e.g. prices, nutrients, origins, etc.). When a user requests data (product details) on the browser, the server will retrieve the data from a JSON file and return a dynamic HTML page assembled with the data requested.


## 🎉 Demo 

![app demo](Assets/node-farm.gif)


## ✨ What I Have Learned

This is a code-along project in which I used Node.js to practice handling routing requests and build a simple web API. 

There are three major takeaways from this project:

1) **HTML Templating**. In order for the server to return HTML webpages dynamically based on the data requested by the user, it's a good practice to bind texts and values with placeholders like `{% %}` so that they can be updated accordingly.
2) **Top-level code**. The code that are outside of callback functions will only get executed once in the beginning when the application loads up. Top-level code helps to get the data prepared for the incoming requests as soon as the application runs, so it won't delay the execution of our code.
3) **Creating modules**. In the Node application, all files are essentially modules. It's beneficial to separate reusable features into their own files or modules so that they are accessible everywhere across the project. This also helps to avoid cluttering the main workspace (`index.js` in our case). To export a module, use `module.exports`.

## 💻 Setup

Run either `node index` or `nodemon index` in the terminal to start the server, and connect to `http//localhost:8000` in the web browser.

## 👏 Credits

This project is based on the Node.js tutorial of <a href="https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/">Node.js, Express, MongoDB & More</a> by Jonas Schmedtmann.
