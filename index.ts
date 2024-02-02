import express from "express";
import proxy from "express-http-proxy";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());

// Proxy configuration
const proxyHost = "https://generativelanguage.googleapis.com";

app.get("/ask", async (req, res) => {
  const { q } = req.query;
  let data = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: q,
          },
        ],
      },
    ],
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ],
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${proxyHost}/v1beta/models/gemini-pro:generateContent?key=AIzaSyBSUKwqZA8M3zWyDYn12W9LUuhNcByzI8s`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  const response = await axios.request(config);

  res.json({
    text: response.data.candidates?.[0]?.content?.parts?.[0]?.text,
  });
});

// Proxy all requests to the target host
app.use("/", proxy(proxyHost));

// Start the server
app.listen(8080, () => {
  console.log(`Proxy server listening on port 8080`);
});
