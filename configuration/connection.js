const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://mongo:YRJsmoowTveKh54p1BDp@containers-us-west-61.railway.app:6508";
const dbName = 'MobileShop'
state={
    db:null
}

module.exports.connect = function (){
    
const client = new MongoClient(URL);
client.connect("shopping").then((data)=>{
    console.log("connected");
    state.db = data.db(dbName);
    // console.log(data.db("test"));
})

}


module.exports.get=function (){
    return state.db;
}