const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.post("/api/add-note", express.json({ type: '*/*' }), function (req, res) {
    const newEmptyNote = {
        noteId: "0",
        title: "Title",
        text: "",
        tags: [],
    };
    readNotes().then(
        notes => {
            const updatedNotes = (notes && notes.slice()) || [];
            if (updatedNotes.length) {
                newEmptyNote.noteId = (+updatedNotes[updatedNotes.length - 1].noteId + 1).toString();
            }
            updatedNotes.push(newEmptyNote);
            fs.writeFile(__dirname + "/notes.json", JSON.stringify(updatedNotes), (error, data) => {
                return res.status(200).json(updatedNotes);
            });
        },
        error => {
            console.error(error);
            return res.status(500).send({ error: error });
        }
    );
});

app.post("/api/delete-note", express.json({ type: '*/*' }), function (req, res) {
    const noteIdToDelete = req.body.id;
    if (noteIdToDelete) {
        readNotes().then(
            notes => {
                const updatedNotes = (notes && notes.slice()) || [];
                for (let i = 0; i < updatedNotes.length; i++) {
                    if (noteIdToDelete === updatedNotes[i].noteId) {
                        updatedNotes.splice(i, 1);
                        fs.writeFile(__dirname + "/notes.json", JSON.stringify(updatedNotes), (error, data) => {
                            return res.status(200).json(updatedNotes);
                        });
                    }
                }
            },
            error => {
                console.error(error);
                return res.status(500).send({ error: error });
            }
        );
    } else {
        return res.status(500).send({ error: 'Invalid data' });
    }
});

app.post("/api/edit-note", express.json({ type: '*/*' }), function (req, res) {
    const newNote = req.body;
    if (newNote) {
        readNotes().then(
            notes => {
                const updatedNotes = (notes && notes.slice()) || [];
                if (!newNote.noteId) {
                    if (!updatedNotes.length) {
                        newNote.noteId = "0";
                    } else {
                        newNote.noteId = (+updatedNotes[updatedNotes.length - 1].noteId + 1).toString();
                    }
                    updatedNotes.push(newNote);
                    fs.writeFile(__dirname + "/notes.json", JSON.stringify(updatedNotes), (error, data) => {
                        return res.status(200).json(updatedNotes);
                    });
                } else {
                    for (let i = 0; i < updatedNotes.length; i++) {
                        if (newNote.noteId === updatedNotes[i].noteId) {
                            updatedNotes[i] = newNote;
                            fs.writeFile(__dirname + "/notes.json", JSON.stringify(updatedNotes), (error, data) => {
                                return res.status(200).json(updatedNotes);
                            });
                        }
                    }
                }
            },
            error => {
                console.error(error);
                return res.status(500).send({ error: error });
            }
        );
    } else {
        return res.status(500).send({ error: 'Invalid data' });
    }
});

app.get("/api/notes", function (req, res) {
    readNotes().then(
        notes => {
            notesList = notes;
            res.status(200).send(notes);
        },
        error => {
            console.error(error);
            res.status(500).send({ error: error });
        }
    );
});

app.use(express.static(__dirname + "/../dist/notes"));
app.get("/*", (req, res) => {
    res.sendFile("index.html", {
        root: __dirname + "/../dist/notes"
    });
});

function readNotes() {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + "/notes.json",
            function (error, data) {
                if (error) {
                    reject(error);
                } else {
                    if (data) {
                        try {
                            resolve(JSON.parse(data));
                        } catch (err) {
                            reject(err);
                        }
                    } else {
                        resolve([]);
                    }
                }
            });
    });
}

app.listen(3000);