import * as http from "http";
import data from "./data.json"
import food  from "./food.json"
import governor from "./governor.json"
import hotel from "./hotel.json"

const port: number = 101;
const server = http.createServer((req: any, res: any) => {
    console.log(req.url, req.method)
    const {url, method} = req
  if (req.method === "POST" && url === "/postdata") {
    let body = "";

    req.on("data", (chunk: any) => {
      // console.log(chunk)
      body += chunk.toString();
      console.log(chunk.toString());
    });
    req.on("end", () => {

      let recieveData = JSON.parse(body);
      recieveData.id = data.length
      data.push(recieveData)
      res.setHeader("content-type", "application/json");
      res.writeHead(201);
      res.write(
        JSON.stringify({
          message: "submitted",
          data: recieveData,
        })
      );
      res.end();
    });
  } else if(method=== "GET" && url === "/alldata")
  {
     res.setHeader("content-type", "application/json")
     res.writeHead(200)
     res.write(JSON.stringify({
        success: 1,
        message: "all data",
        result:data
     }))
     res.end()
  }else if(method === "POST" && url === "/food/post" )
  {
    let foodData: string =""
    req.on("data", (chunk: any)=>{
        foodData += chunk
    })
    req.on("end", ()=>{
         let  parseFood = JSON.parse(foodData)
         parseFood.id = food.length +1
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

} else if(url === "/food/all" && method === "GET")
{
     res.writeHead(200, {"content-type": "application/json"})
     res.write(JSON.stringify(food))
     res.end()
}else if(req. method === "POST" && url === "/governor/post")
{
    let Gov = ""
    req.on("data", (chunk: any)=>{
        Gov += chunk.toString()
    })
    req.on("end", ()=>{
        let parseGov = JSON.parse(Gov)
        parseGov.id = governor. length +1
        governor.push(parseGov)
        res.writeHead(201, ({"content-type":"application/json"}))
        res.write(JSON.stringify({
            message: "successfully created",
            success: 1,
            governorLength: governor.length,
            result: parseGov
        }))
        res.end()
    })
}else if(url === "/governor/all" && method === "GET")
{
    res.writeHead(200, {"content-type": "application/json"})
    res. write(JSON.stringify(governor))
    res.end()
}else if(method === "POST" && url === "/hotel/post")
{
    let Hotel = ""
    req.on("data", (chunk: any)=>{
        Hotel += chunk.toString()
    })
    req.on("end", ()=>{
        let parseHOTEL = JSON.parse(Hotel)
        parseHOTEL.id= hotel.length +1
        hotel.push(parseHOTEL)
        res.writeHead(201, {"content-type": "application/json"})
        res.write(JSON.stringify({
            message: "successfully created",
            success: 1,
            hotelLength: hotel.length,
            result: parseHOTEL
        }))
        res.end()
    })
  
}else if(url === "/hotel/all" && method === "GET")
{
    res.writeHead(200, {"content-type": "application/json"})
    res.write(JSON.stringify(hotel))
    res.end()
}else if (method === "GET" && url.startsWith("/hotels/"))
{
  let getUserID = (url.split("/")[1])
  console.log(getUserID)
  let getValue = hotel.find((item:any)=> item.id === getUserID)
  console.log(getValue)
  if (getValue)
  {
    res.writeHead(200, {"content-type": "application/json"})
    res.write(JSON.stringify({
      message: "User Found",
      success: 1,
      hotel:getValue
    }))
    res.end()
  }
}else if (method === "DELETE" && url.startsWith("/delete/"))
{
  console. log(url.split("/")[2])
  let UserId = url.split("/")[2]
  let deleteId:any  = -1
  for (let i = 0; i< hotel.length; i++)
  {
    if (hotel[i].id === UserId)
    {
      deleteId = i
    }
  }
  console.log("asdf", deleteId)
if (deleteId !== -1)
{
  let items = hotel.splice(deleteId, 2)
  res.writeHead(200, {"content-type": "application/json"})
  res.write(JSON.stringify({
    message: "Deleted successfully",
    success: 1
  }))
  res.end()
}


}else if (method === "PUT" && url.startsWith("/api/update/"))
{
  let getId = (url.split("/")[3])
  console.log(getId)
  let getDATA = data.findIndex(item=>item.id === getId)
  console.log(getDATA)
  if(getDATA !== -1)
  {
    let myBody = ""
    req.on("data", (chunk:any)=>{
      myBody += chunk
    })

    req.on("end", ()=>{
      let parsedData = JSON.parse(myBody)
      data[getDATA] = {
        ...data[getDATA],
        ...parsedData
      }
      res.writeHead(200, {"content-type": "application/json"})
      res.write(JSON.stringify({
        message: "update successfully",
        success: 1,
        data: data[getDATA]
      }))
      res.end()
    })
  }else
  {
    res.writeHead(404, {"content-type": "application/json"})
    res.write(JSON.stringify({
      message: "No User Found"
    }))
    res.end()

  }
}

else
{
    res.setHeader("content-type", "application/json")
    res.writeHead(404)
    res.write(JSON.stringify({
        success: 0,
        message: "invalid url"
    }))
res.end()
  }
});

server.listen(port, () => {
  console.log(`i am listening to port : ${port}`);
});
