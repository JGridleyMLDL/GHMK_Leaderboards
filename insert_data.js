const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://jaredgridley:7JEJAvGpHq29z7E@cluster0.ov7ku.mongodb.net/MKLeaderbaords?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "MKLeaderboards";

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("times");
         // Construct a document                                                                                                                                                              
         let personDocument = {
             "map": "Mario Kart Stadium",
             "name": "Testing", // June 23, 1912                                                                                                                                 
             "time": "1:13.757",  // June 7, 1954  
             "date": dateTime                                                                                                                               
         }
         // Insert a single document, wait for promise so we can read it back
         const p = await col.insertOne(personDocument);
         // Find one document
         const myDoc = await col.findOne();
         // Print to the console
         console.log(myDoc);


        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);