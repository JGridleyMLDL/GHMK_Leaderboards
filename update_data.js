
app.put(“/players”, async function(req, res) {
   let { username, score } = req.body;
   // check if the username already exists
   const alreadyExisting = await db
       .collection(“players”)
       .findOne({ username: username });
   if (alreadyExisting) {
       // Update player object with the username
       await db
           .collection(“players”)
           .updateOne({ username }, { $set: { username, score } });
       console.log(`Player ${username} score updated to ${score}`);
       res.send({ status: true, msg: “player score updated” });
   } else {
       res.send({ status: false, msg: “player username not found” });
   }
});