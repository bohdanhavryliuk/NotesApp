import { addNote, editNote, removeNote, archivingNote, notes, categories, categoriesNotesCount } from "./model";

let renderNotesList = fillListElement;

function renderCountsElement() {
    const categoriesListElement = document.querySelector("div.categories-list");
    categoriesListElement.innerHTML = `<div class="category-element table-header">
        <h2 class="category-name-element">Note Category</h2>
        <h2 class="active-notes-element">Active</h2>
        <h2 class="archive-notes-element">Archived</h2>
    </div>`;
    categoriesNotesCount().forEach(function (categoryCounts) {
        const categoryElement = document.createElement("div");
        categoryElement.className = "category-element";
        const categoryNameElement = document.createElement("h2");
        categoryNameElement.className = "category-name-element";
        categoryNameElement.textContent = categoryCounts[0];
        const activeNotesElement = document.createElement("h2");
        activeNotesElement.className = "active-notes-element";
        activeNotesElement.textContent = categoryCounts[1];
        const archiveNotesElement = document.createElement("h2");
        archiveNotesElement.className = "archive-notes-element";
        archiveNotesElement.textContent = categoryCounts[2];
        categoryElement.append(categoryNameElement, activeNotesElement, archiveNotesElement);
        categoriesListElement.appendChild(categoryElement);
    });
}

function fillListElement() {

    const notesListHeader = document.querySelector("div.notes-list-header");

    const notesListElement = document.querySelector("div.notes-list");

    notesListHeader.innerHTML = `<div class="note-columns">
        <p class="note-content">Content</p>
        <p class="note-category">Category</p>
        <p class="note-date">Created</p>
        <p class="note-dates">Dates</p>
        <button class="active-archive-btn">Archive Notes</button>
    </div>`;

    notesListElement.innerHTML = "";

    notes.forEach(function (item, index) {

        if (!item.isArchivalNote) {
            const itemElement = document.createElement("div");
            itemElement.className = "note-element";

            const contentElement = document.createElement("p");
            contentElement.textContent = item.content;
            contentElement.className = "note-content";
            const categoryElement = document.createElement("p");
            categoryElement.textContent = item.category;
            categoryElement.className = "note-category";
            const dateElement = document.createElement("h6");
            dateElement.textContent = item.timeOfCreation;
            dateElement.className = "note-date";
            const datesElement = document.createElement("div");
            datesElement.className = "note-dates";
            item.dates.forEach(function (date) {
                const dateItem = document.createElement("h6");
                dateItem.textContent = date;
                datesElement.appendChild(dateItem);
            })

            const buttons = document.createElement("div");
            buttons.className = "note-buttons";

            const editingBtn = document.createElement("button");
            const archiveBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            editingBtn.className = "btn-edit";
            archiveBtn.className = "activate-note";
            deleteBtn.className = "btn-delete";
            editingBtn.textContent = "🖉";
            archiveBtn.textContent = "📥";
            deleteBtn.textContent = "🗑";

            editingBtn.addEventListener("click", function () {
                modalOverlay();
                const editInput = document.querySelector("textarea.input-content");
                editInput.value = notes[index].content;
                const editSelect = document.querySelector("select");
                editSelect.value = notes[index].category;
                const editBtn = document.querySelector("button.note-btn");
                editBtn.textContent = "Edit";
                editBtn.addEventListener("click", function () {
                    try {
                        if (!editInput.value || editInput.value == notes[index].content && editSelect.value == notes[index].category) {
                            throw new SyntaxError("Change error");
                        }
                        editNote(index, editInput.value, editSelect.value);
                        renderNotesList();
                        closeModal();
                    }
                    catch (e) {
                        if (!document.querySelector("h5.error-message")) {
                            const errorMessage = document.createElement("h5");
                            errorMessage.className = "error-message";
                            errorMessage.textContent = e.message;
                            editInput.insertAdjacentElement('afterend', errorMessage);
                        }

                    }
                });
            });

            archiveBtn.addEventListener("click", function () {
                archivingNote(index);
                renderNotesList();
            });

            deleteBtn.addEventListener("click", function () {
                removeNote(index);
                renderNotesList();
            });

            buttons.append(editingBtn, archiveBtn, deleteBtn);

            itemElement.append(contentElement, categoryElement, dateElement, datesElement, buttons);
            notesListElement.appendChild(itemElement);
        }

    });

    const archBtn = document.querySelector("button.active-archive-btn");
    archBtn.addEventListener("click", function () {
        renderNotesList = fillArchivalListElement;
        renderNotesList();
    });

}

function fillArchivalListElement() {
    const notesListHeader = document.querySelector("div.notes-list-header");

    const notesListElement = document.querySelector("div.notes-list");

    notesListHeader.innerHTML = `<div class="note-columns">
        <p class="note-content">Content</p>
        <p class="note-category">Category</p>
        <p class="note-date">Created</p>
        <button class="active-archive-btn">Active Notes</button>
    </div>`;

    notesListElement.innerHTML = "";

    notes.forEach((item, index) => {
        if (item.isArchivalNote) {
            const itemElement = document.createElement("div");
            itemElement.classList.add("note-element", "archive-element");

            const contentElement = document.createElement("p");
            contentElement.textContent = item.content;
            contentElement.className = "note-content";
            const categoryElement = document.createElement("p");
            categoryElement.textContent = item.category;
            categoryElement.className = "note-category";
            const dateElement = document.createElement("h6");
            dateElement.textContent = item.timeOfCreation;
            dateElement.className = "note-date";

            const buttons = document.createElement("div");
            buttons.className = "note-buttons";
            const archiveBtn = document.createElement("button");

            archiveBtn.className = "activate-note";

            archiveBtn.textContent = "📤";

            archiveBtn.addEventListener("click", function () {
                archivingNote(index);
                renderNotesList();
            });

            buttons.appendChild(archiveBtn);

            itemElement.append(contentElement, categoryElement, dateElement, buttons);
            notesListElement.appendChild(itemElement);
        }
    });
    const archBtn = document.querySelector("button.active-archive-btn");

    archBtn.addEventListener("click", function () {
        renderNotesList = fillListElement;
        renderNotesList();
    });
}

function modalOverlay() {
    let selectOptions = "<option disabled>Category</option>";
    categories.forEach(function (item) {
        selectOptions += `<option>${item}</option>`
    });

    document.getElementById("root").insertAdjacentHTML("beforeend", `
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="close-btn-placement">
                <button class="close-modal-btn">&#10006;</button>
            </div>
            <textarea class="input-content"></textarea>
            <select>${selectOptions}</select>
            <button class="note-btn"></button>
        </div>
    </div>
    `);

    const closeBtn = document.querySelector("button.close-modal-btn");
    closeBtn.addEventListener("click", closeModal);
}

function closeModal() {
    document.querySelector("div.modal-overlay").remove();
}

function addListElement() {
    modalOverlay();

    const addInput = document.querySelector("textarea.input-content");
    const addBtn = document.querySelector("button.note-btn");
    const addSelect = document.querySelector("select");
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function () {
        try {
            if (!addInput.value) {
                throw new SyntaxError("The textarea is empty");
            }

            addNote(addInput.value, addSelect.value);
            addInput.value = "";
            renderNotesList();
            closeModal();

        }
        catch (e) {
            if (!document.querySelector("h5.error-message")) {
                const errorMessage = document.createElement("h5");
                errorMessage.className = "error-message";
                errorMessage.textContent = e.message;
                addInput.insertAdjacentElement('afterend', errorMessage);
            }
        }
    });
}

export { renderNotesList, renderCountsElement, addListElement };