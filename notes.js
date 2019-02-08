const fs = require('fs');

class Note {
    constructor(title,body) {
        this.title = title;
        this.body = body;
    }
}

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('./notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let getAll = () => {
    console.log('Getting all notes');
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = new Note(title, body);
    let dublicateNotes = notes.filter(note => note.title === title);

    if(dublicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        console.log(`added note: ${title}`);
        return note;
    } else {
        console.log('Note with this title has already added');
    }
};

let getNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title === title);
    if(filteredNotes.length) {
        return filteredNotes[0];
    }
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    console.log(`removed note: ${title}`);
    return notes.length !== filteredNotes.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote
};
