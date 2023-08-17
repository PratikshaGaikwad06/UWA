const express = require('express');

const app = express();

app.use(express.json);

app.get("/sample", (req,res) =>{
    
    res.send("Hello World");
})

app.listen(5000, (err) => {
    if (err) {
        console.log("server not started on port 5000");
    }
    else {
        console.log("started listening on port 5000");
    }
});

