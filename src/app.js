import { renderNotesList, renderCountElement, addListElement } from "./render";

class App {
    static startApp() {
        const btn = document.querySelector("button.create-note-btn");

        btn.onclick = addListElement;

        renderNotesList();

        renderCountElement();

        const observer = new MutationObserver(renderCountElement);

        observer.observe(document.querySelector("div.notes-list"), {
            attributes: true,
            childList: true,
            subtree: true
        });
    }
}

export default App;