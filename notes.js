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
    return fetchNotes();
};

let addNote = (title, body) => {
    let notes = fetchNotes();
    let note = new Note(title, body);
    let dublicateNotes = notes.filter(note => note.title === title);

    if(dublicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        console.log('Note with this title has already added');
    }
};

let getNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title === title);
    return filteredNotes;
};

let removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);
    console.log(`removed note: ${title}`);
    return notes.length !== filteredNotes.length;
};

let logNote = (title) => {
    debugger;
    console.log(`Title: ${title}`);
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
