
const mongoose=require("mongoose");
const connectDatabase=()=>{mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(
(data)=>{
console.log(`mongodb connected with server :${data.connection.host}`);})
//catch vala hta dia 
//taki unhandle rejection hop jaye 
//resolve in then block and reject in catch block 

}

module.exports=connectDatabase;
