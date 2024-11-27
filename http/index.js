const http=require("http");         //that is the http building function
const fs=require("fs");             //that is the fs building function
const url=require("url");           //that is the url function

const myserver=http.createServer((req,res)=>{     //that is create server and call back function with request and response
    if(req.url === "/favicon.ico")return res.end()  
const log=`${Date.now()} : ${req.method}, ${req.url} New Req recevied\n`;  //create log current date and request form url
const myurl=url.parse(req.url, true);       //  that is define url parse from server

fs.appendFile("log.txt",log,(err,data)=>{           // that is log all data store log.txt file
    switch(myurl.pathname){                
        case"/":            // "/" means home page
            if(req.method==="GET")return res.end("Homepage");
            break;
        case"/about":
            const username=myurl.query.myname;
            res.end("My name is " + username);
            break;
        case"/search":
            const search=myurl.query.search_query;
            res.end("here that serch is " + search);
        case"/signUp":
            if(req.method==="GET") return res.end("Welcome SignUp page");
            //databse query
            else{
                if(req.method==="POST") return res.end("success")
            }
        default:
            res.end("404 NOT FOUND");
    }

});
});

myserver.listen(8001,() => console.log("Server Started ||"));       //that is listen all code And define port number is 8001