const { MongoClient } = require("mongodb");
const express = require('express');
const app = express();
const ejs = require('ejs');
const { render } = require("express/lib/response");


app.set('view engine', 'ejs');
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://jaredgridley:7JEJAvGpHq29z7E@cluster0.ov7ku.mongodb.net/MKLeaderbaords?retryWrites=true&w=majority";
const client = new MongoClient(url);
 
 // The database to use
 const dbName = "MKLeaderboards";



app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         // Use the collection "people"
         const col = db.collection("times");
         
         // Find times
         const Mushroom1 = await col.find({map: "Mario Kart Stadium"}, {sort: {time: 1}, projection: {_id: 0, name:1, time:1, date: 1}, limit: 5});

         await Mushroom1.forEach(console.dir);

         app.render("leaderboards", {
             timesList: Mushroom1 
         })


        } catch (err) {
         console.log(err.stack);


     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);

/*
const client = new MongoClient(uri);

const LeaderboardsSchema = {
    _id: Object,
    map: String,
    name: String,
    time: String,
    date: String
}

async function run(){
  try {
    await client.connect();
    const database = client.db('MKLeaderboards');
    const runs = database.collection('times');
    // Query for a movie that has the title 'Back to the Future'

    const query = { name: "Jason Gibbons" };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { time: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, map: 1, name: 1, time:1, date:1},
    };

    const cursor = runs.find(query, options);

    console.log(cursor.count())
    
    if ((await cursor.count()) === 0) {
      console.log("No documents found!");
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);



const Times = mongoose.model('times', LeaderboardsSchema)

app.get('/', (req, res) =>{
    Times.find({}, function(err, times){
        console.log(times)
        res.render('leaderboards', {
            timesList: times
        })
        
    })

})
*/
