const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const command = process.argv[2];

const titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOption = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOption,
        body: bodyOption
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOption
    })
    .command('remove', 'Remove a note', {
        title: titleOption
    })
    .help()
    .argv;

if (command === 'add') {
    notes.addNote(argv.title, argv.body);
    notes.logNote(argv.title)
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes(s)`);
    allNotes.forEach(note => {
        notes.logNote(note.title);
    })
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    notes.logNote(argv.title);
    if(note.length) {
        console.log(note[0].body);
    } else {
        console.log('Note note found');
    }
} else if (command === 'remove') {
    notes.removeNote(argv.title);
    notes.logNote(argv.title)
} else {
    console.log('Command not recognized');
}

try {
    let notesString = fs.readFileSync('./notes-data.json');
    let arrOfnotes = JSON.parse(notesString);
    console.log(arrOfnotes);
} catch (e) {
    console.log('There is no file with existing data');
}
