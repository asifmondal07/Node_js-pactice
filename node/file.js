const fs=require("fs");


// fs.writeFileSync("text.txt","hey there");           //this sync method
// fs.writeFile("text.txt","hey there async",(err)=>{})        //this Async method

// const result=fs.readFileSync("number.txt",'utf-8');         //utf-8 that is decleare file type
// console.log(result);

// fs.readFile("number.txt",'utf-8',(err,result)=>{
//     if(err){
//         console.log(Error,{err});
//     }else{
//         console.log(result);
//     }

// })

fs.appendFileSync("text.txt",'hey  appendsync\n');          //that not overwrite and \n use for new line

fs.appendFile("text.txt",'hey  appendAsync\n',err=>{});         //async all time need to call back function