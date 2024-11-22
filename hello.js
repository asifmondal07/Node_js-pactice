console.log("hello World");

// const math=requier("./math");
// console.log("sum is",math.sum(2,8) ,"AND sub is",math.sub(5,8))

                //after using export option second to using destructer
                 
const {sum,sub}=require("./math");              //destructure

console.log("sum is",sum(2,8) ,"AND sub is",sub(5,8));