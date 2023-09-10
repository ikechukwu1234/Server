import * as http from "http";
import data from "./data.json"
import food from "./food.json"

const port: number = 1500;
const server = http.createServer((req: any, res: any) => {
  let Kome="";
  
  const {url, method} = req
  if (url === "/post" && method === "POST")
  {
    req.on("data", (chunk: any) => {
        Kome += chunk.toString();
        console.log(chunk.toString());
    });

    req.on("end", () => {
        let dataRecieve:any= JSON.parse(Kome)
        dataRecieve.id = data.length
        data.push(dataRecieve)
        console.log(data)
        res.setHeader("content-type", "application/json")
        res.writeHead(201)
        res.write(JSON.stringify({
            success: 1,
            datalength: data.length,
            message: "data successfully submitted",
            result: dataRecieve
        }));
        res.end();
      });
    }else if(url ==="/all" && method === "GET")
    {
        res.setHeader("content-type", "application/json")
        res.writeHead(200)
        res.write(JSON.stringify(data))
        res.end()
    }else if(url === "/food/post" && method === "POST" )
    {
        let foodData: string = ""
        req.on("data", (chunk: any)=>{
            foodData += chunk
        })
        req.on("end",()=>{
            let parseFood = JSON.parse(foodData)
            parseFood.id=food.length +1
            food.push(parseFood)
            res.writeHead(201, {"content-type": "application/json"})
            res.write(JSON.stringify({
                message: "successfully created",
                success: 1,
                foodLength: food.length,
                result: parseFood
            }))
            res.end()
        })
    }else if (url === "/food/all" && method === "GET")
    {
        res.writeHead(200, {"content-type": "application/json"})
        res.write(JSON.stringify(food))
        res.end()
    }
    else{
        res.writeHead(404, {"content-type":"application/json"})
        res.end(JSON.stringify({
            success: 0,
            result: "wrong url"
        }))
    }

  })

 



server.on("connection", () => {
  console.log("connection establish");
});
server.listen(port, () => {
  console.log(`i am listening on port: ${port}`);
});

