import * as http from "http"
import hotel from "./hotel.json"

const port: number = 15001
const server = http.createServer((req: any, res:any)=>{
    console.log(req.method,req.url)
    const {url, method}= req
   if(url === "/lolo/post" && method === "POST")
   {
    let lodge =""
    req.on("data", (chunk:any)=>{
        lodge +=chunk.toString()
    })
    req.on("end", ()=>{
        let parseLolo = JSON.parse(lodge)
        parseLolo.id = hotel.length +1
        hotel.push(parseLolo)
        res.writeHead(201, {"content-type":"application/json"})
        res.write(JSON.stringify({
            message: "post created successfully",
            success: 1,
            data:parseLolo,
            loloLength: hotel.length
        }))
        res.end()
    })
   }else if(url === "/lolo/all" && method === "GET")
   {
   res.writeHead(200, {"content-type": "application/json"})
   res.write(JSON.stringify(hotel))
   res.end()
   }else
   {
    res.writeHead(404, {"content-type": "application/json"})
    res.write(JSON.stringify({
        message: "invalid url",
        success: 0,
    }))

   }
})
server.listen(port, ()=>{
    console.log(`i am listening on port: ${port}`)
})