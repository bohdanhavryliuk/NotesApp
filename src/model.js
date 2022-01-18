const categories = ["Task", "Random Thought", "Idea"];

let notes = [
    {
        content: "To visit the theater on 12/8/2018",
        timeOfCreation: "31/7/2021",
        isArchivalNote: true,
        category: "Idea",
        dates: [
            "12/8/2020"
        ]
    },
    {
        content: "Walk in the woods",
        timeOfCreation: "7/9/2021",
        isArchivalNote: true,
        category: "Random Thought",
        dates: []
    },
    {
        content: "Прийом у лікаря 10/10/2021 та 17/10/2021",
        timeOfCreation: "2/10/2021",
        isArchivalNote: false,
        category: "Task",
        dates: [
            "10/10/2021",
            "17/10/2021"
        ]
    },
    {
        content: "День народження сестри 18/11/2021",
        timeOfCreation: "1/11/2021",
        isArchivalNote: false,
        category: "Random Thought",
        dates: [
            "18/11/2021"
        ]
    },
    {
        content: "Зустрітись з друзями на вихідних",
        timeOfCreation: "15/12/2021",
        isArchivalNote: true,
        category: "Idea",
        dates: []
    },
    {
        content: "shopping",
        timeOfCreation: "30/12/2021",
        isArchivalNote: false,
        category: "Task",
        dates: []
    },
    {
        content: "Тренування в залі 12/1/2022",
        timeOfCreation: "",
        isArchivalNote: false,
        category: "Task",
        dates: [
            "12/1/2022"
        ]
    }
]

class Note {
    constructor(content, category) {
        this.content = content;
        const date = new Date();
        this.timeOfCreation = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        this.isArchivalNote = false;
        this.category = category;
        this.dates = determinationOfDates(content);
    }
}

function addNote(value, category) {
    notes = [...notes, new Note(value, category)];
}

function editNote(index, value, category) {
    notes[index].content = value;
    notes[index].category = category;
}

function removeNote(index) {
    notes.splice(index, 1);
}

function archivingNote(index) {
    notes[index].isArchivalNote ? notes[index].isArchivalNote = false : notes[index].isArchivalNote = true;
}


function determinationOfDates(content) {
    const datesList = content.match(/\d{1,2}\/\d{1,2}\/\d{4}/gm);
    return datesList ? datesList : [];
}

function categoriesNotesCount() {
    const categoriesNotes = [];
    categories.forEach(function (category) {
        const categoryNotes = notes.filter(function (note) {
            return note.category == category;
        });
        categoriesNotes.push([category, categoryNotes.filter(function (note) {
            return note.isArchivalNote == false;
        }).length, categoryNotes.filter(function (note) {
            return note.isArchivalNote == true;
        }).length]);
    });
    return categoriesNotes;
}

export { addNote, editNote, removeNote, archivingNote, notes, categories, categoriesNotesCount };