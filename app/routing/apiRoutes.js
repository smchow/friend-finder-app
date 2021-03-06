// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friendsData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });

/*  app.post("/api/friends", function(req, res) {
    res.json(waitListData);
  });*/

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    //if (friendsData.length < 5) {
      friendsData.push(req.body);
      res.json(getFriend());
   /* }
    else {
      waitListData.push(req.body);
      res.json(false);
    }*/
  });

  function getFriend(){
    var maxScore =0 ;
    var picked = 0;
    console.log("Your Profile:");
    console.log(friendsData[friendsData.length-1])
    for (var i=0; i< friendsData.length; i++){
        var score = 0;
        for (var j =0; j< friendsData[i].scores.length; j++){

          score += Math.abs(friendsData[i].scores[j]-friendsData[friendsData.length-1].scores[j])
        }
        //console.log(maxScore);
        //console.log(score);
        

        if (score > maxScore){
                  picked = i;
                  maxScore = score;
                }

    }
    console.log("Best match is:");
    console.log(friendsData[picked]);
    return friendsData[picked];

  }

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendsData = [];

    console.log("Cleared");
  });
};
