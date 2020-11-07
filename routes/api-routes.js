const db = require("../db/db.json");
const fs = require("fs");
//for random ID
const { v4: uuidv4 } = require('uuid');

module.exports = function(app) {  
    app.get("/api/notes", function(req, res) {
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
      res.json(JSON.parse(data));})
    });

    // do i need to remove /api/?? should it be /public/notes?
    app.post("/api/notes", function(req, res) {
      //generating random ID
      let noteID = uuidv4();
      let newNote = {
        id: noteID,
        title: req.body.title,
        text: req.body.text
      };

      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        allNotes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(allNotes, null, 2), err => {
          if (err) throw err;
          res.json(allNotes);
        });
      });
    });
  

    app.delete("/api/notes/:id", (req, res) => {
      let noteID = req.params.id;
      fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        const newAllNotes = allNotes.filter(note => note.id != noteID);

        fs.writeFile("./db/db.json", JSON.stringify(newAllNotes, null, 2), err => {
          if (err) throw err;
          res.json(newAllNotes);
          console.log("Note Deleted")
        });
      });
    })
  }
