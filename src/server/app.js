const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.post("/api/add-note", express.json({ type: '*/*' }), function (req, res) {
    const newNote = req.body;
    if (newNote) {
        readNotes().then(
            notes => {
                const updatedNotes = (notes && notes.slice()) || [];
                if (newNote.id) {
                    newNote.emptyNote.noteId = (+updatedNotes[updatedNotes.length - 1].noteId + 1).toString();
                    console.log('Empty-NOTE or ID -> ', newNote);
                }
                updatedNotes.push(newNote.emptyNote);
                fs.writeFile("notes.json", JSON.stringify(updatedNotes), (error, data) => {
                    // console.log("error|data", error, data);
                    return res.status(200).json(updatedNotes);
                });
            },
            error => {
                console.log(error);
                return res.status(500).send({ error: error });
            }
        );
    } else {
        return res.status(500).send({ error: 'Invalid data' });
    }
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
                        fs.writeFile("notes.json", JSON.stringify(updatedNotes), (error, data) => {
                            // console.log("error|data", error, data);
                            return res.status(200).json(updatedNotes);
                        });
                    }
                }
            },
            error => {
                console.log(error);
                return res.status(500).send({ error: error });
            }
        );
    } else {
        return res.status(500).send({ error: 'Invalid data' });
    }
});

app.post("/api/edit-note", express.json({ type: '*/*' }), function (req, res) {
    const newNote = req.body;
    // console.log('LastMes: ', newMessage.messages[newMessage.messages.length - 1].messageId);
    if (newNote) {
        readNotes().then(
            notes => {
                const updatedNotes = (notes && notes.slice()) || [];
                // console.log(notes, updatedNotes);
                if (!newNote.noteId) {
                    if (!updatedNotes.length) {
                        newNote.noteId = "0";
                    } else {
                        newNote.noteId = (+updatedNotes[updatedNotes.length - 1].noteId + 1).toString();
                    }
                    updatedNotes.push(newNote);
                    fs.writeFile("notes.json", JSON.stringify(updatedNotes), (error, data) => {
                        // console.log("error|data", error, data);
                        return res.status(200).json(updatedNotes);
                    });
                } else {
                    console.log('else');
                    for (let i = 0; i < updatedNotes.length; i++) {
                        if (newNote.noteId === updatedNotes[i].noteId) {
                            updatedNotes[i] = newNote;
                            fs.writeFile("notes.json", JSON.stringify(updatedNotes), (error, data) => {
                                // console.log("error|data", error, data);
                                return res.status(200).json(updatedNotes);
                            });
                        }
                    }
                }
            },
            error => {
                console.log(error);
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
            console.log(error);
            res.status(500).send({ error: error });
        }
    );
});

function readNotes() {
    return new Promise((resolve, reject) => {
        fs.readFile("notes.json",
            function (error, data) {
                console.log(error);
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