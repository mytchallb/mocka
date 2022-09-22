import express from "express";
import { handler } from "../build/handler.js"
import stream from "stream";

const app = express();
const port = 3000;

const htmlString = `
<!DOCTYPE html>
<html lang="en">
   <head>
      <title>My Title</title>
   </head>
   <body>My HTML Content</body>
</html>`;

app.get("/html", (req, res) => {
  const readStream = new stream.PassThrough();
  readStream.end(htmlString);
  res.set("Content-disposition", "attachment; filename=index.html");
  readStream.pipe(res);
});



app.use(handler);

// app.get("/", (req, res) => {
//     res.send("Hello World!");
//     }
// );




app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});