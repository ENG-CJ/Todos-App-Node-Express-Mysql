const express=require("express");
const app = express();
const cors = require('cors');

const todoRouter=require("./routes/todo");

app.use(cors())
app.use("/todo", todoRouter);


// port
app.listen(8900,()=>{
    console.log("Listening.....");
})





