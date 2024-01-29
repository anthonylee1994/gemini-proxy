import express from "express";
import proxy from "express-http-proxy";

const app = express();

// Proxy configuration
const proxyHost = "https://generativelanguage.googleapis.com";

// Proxy all requests to the target host
app.use("/", proxy(proxyHost));

// Start the server
app.listen(8080, () => {
  console.log(`Proxy server listening on port 8080`);
});
