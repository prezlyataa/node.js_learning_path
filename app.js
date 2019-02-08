const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

let command = process.argv[2];

const argv = yargs.argv;

if (command === 'add') {
    notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if(note) {
        console.log(note.body);
    } else {
        return 'Note note found';
    }
} else if (command === 'remove') {
    notes.removeNote(argv.title);
} else {
    console.log('Command not recognized');
}

// console.log('process: ', process.argv);
// console.log('yarg: ', argv);

try {
    let notesString = fs.readFileSync('./notes-data.json');
    let arrOfnotes = JSON.parse(notesString);
    console.log(arrOfnotes);
} catch (e) {
    console.log('There is no file with existing data');
}
