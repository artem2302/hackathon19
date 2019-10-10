const express = require('express');

const app = express();

app.get("/", (req,res) => res.json({body: "test"}));

app.listen(3030);