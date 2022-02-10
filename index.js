const fs = require("fs");
const http = require("http");
const url = require("url");
// import the module that contains the replaceTemplate function
// the dot means the current location of this module (which is the root in this case)
const replaceTemplate = require("./modules/replaceTemplate");

// following are the "top-level code" (not inside of any callbacks) that only gets exexcuted once in the beginning when the application loads up
// -----------------------------------------------------------------------
// read the files once in the beginning, so that each time the user hits the corresponding route, the data would already be ready to be sent back
// __dirname is where the current file is located
// "./": in Node, "." refers to the directory from which we run the node command in the terminal (if we run Node from the Desktop then the dot means the Desktop)

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// read the data.json file that contains the information of every product:
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

// parse the json file into an array with JS objects
const productDataObj = JSON.parse(data);
// -----------------------------------------------------------------------

// create a server using .createServer() and pass in a callback function that is executed each time a new request hits the server
const server = http.createServer((req, res) => {
  // parse the variable out of the URL
  // pass true into the parse function in order to parse the query into an object
  ////console.log(url.parse(req.url, true));
  const { query, pathname } = url.parse(req.url, true);
  ////console.log(query.id);
  ////console.log(pathname);

  /* Overview Page */
  if (pathname === "/" || pathname === "/overview") {
    // setting the response headers, so that the browser can understand that the HTTP request has been successfully completed (status code 200) and we are sending back a string, which is a valid HTML (in our res.end(output)).
    res.writeHead(200, { "Content-type": "text/html" });

    // loop through the data array with .map() and in each iteration, replace the placeholders in the template card with the current product
    // use .join() to convert the array populated by .map() into a string (an HTML) to be returned
    const cardsHtml = productDataObj
      .map((product) => replaceTemplate(tempCard, product))
      .join("");

    // replace the product-cards placeholder with the HTML string
    const output = tempOverview.replace("{%product-cards%}", cardsHtml);

    res.end(output);
    /* Product Page */
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    // retrieve the product with the product id
    const product = productDataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
    /* API */
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" }); // tell the browser we're sending back a json file
    res.end(data);
  } else {
    /* 404 Page */
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("Page not found!");
  }
});

// listen to the incoming request on local host IP "127.0.0.1" and then on port 8000
// parameters: (port, host, optional callback)
server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
