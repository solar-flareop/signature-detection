const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.post("/detect", async (req, res) => {
  try {
    const { photo } = req.body;
    console.log("photois", photo);
    const newPhoto = photo.substring(22);
    const doc_base64 = newPhoto;
    const output_format = "snippets";
    const req_id = uuidv4();
    const resp = await fetch(
      "https://ping.arya.ai/api/v1/signature-detection",
      {
        method: "POST",
        headers: {
          token: "c927abc8a76a3b90a024b1e54e83f84b",
          "content-type": "application/json",
        },
        body: JSON.stringify({ output_format, doc_base64, req_id }),
      }
    );
    const data = await resp.json();
    res.status(200).json({
      success: true,
      message: "api success",
      data,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "api failed",
      error,
    });
  }
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
