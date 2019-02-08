const fs = require('fs');

let arr = [];

let originalNote = {
    title: 'Purchace',
    body: 'Buy book about JS'
};

arr.push(originalNote);

let originalNoteString = JSON.stringify(arr);

fs.writeFileSync('notes.json', originalNoteString);