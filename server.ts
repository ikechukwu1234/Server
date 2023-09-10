import * as http from "http";
import * as data from "./data.json";
import * as food from "./food.json";
import * as student from "./student.json";

const port: number = 1000;
const server = http.createServer((req: any, res: any) => {
  if (req.url === "/data" && req.method === "GET") {
    res.setHeader("content-type", "application/json");
    res.writeHead(200);
    res.write(JSON.stringify(data));
    res.end();
  } else if (req.url === "/food") {
    res.setHeader("content-type", "application/json");
    res.writeHead(200);
    res.write(JSON.stringify(food));
    res.end();
  } else if (req.url === "/student") {
    res.setHeader("content-type", "application/json");
    res.writeHead(200);
    res.write(JSON.stringify(student));
    res.end();
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Invalid URL" }));
  }
});

server.on("connection", () => {
  console.log("connection has been made");
});

server.listen(port, () => {
  console.log("server listening on ports", port);
});

// const port:number = 1000
// const server=http.createServer((req:any, res:any)=>{
//   switch(req.url){
//     case "/food":
//     res.setHeader("content-type", "application/json")
//     res.writeHead(200)
//     res.write(JSON.stringify(food))
//     res.end()
//     break;
//     case "/data":
//     res.setHeader("content-type", "application/json")
//     res.writeHead(200)
//     res.write(JSON.stringify(data))
//     res.end()
//     break;
//     case "/student":
//     res.setHeader("content-type", "application/json")
//     res.writeHead(200)
//     res.write(JSON.stringify(student))
//     res.end()
//     break;
//     default:
//       res.setHeader("content-type", "application/json")
//       res.writeHead(404)
//       res.end("wrong url not found")
//   }
// })
// server.on("connection", ()=>{
//   console.log("connection has been made successfull")
// })
// server.listen(port, ()=>{
//   console.log(`i am listening on port: ${port}`)
// })
