import { renderNotesList, renderCountsElement, addListElement } from "./render";

class App {
    static startApp() {
        const createNoteBtn = document.querySelector("button.create-note-btn");

        createNoteBtn.addEventListener("click", addListElement);

        renderNotesList();

        renderCountsElement();

        const observer = new MutationObserver(renderCountsElement);

        observer.observe(document.querySelector("div.notes-list"), {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
}

export default App;