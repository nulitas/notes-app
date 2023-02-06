const textArea = document.querySelector("#text-area");

let notes = {};

const STORAGE_NOTE = "STORAGE_NOTE";
const notesContainer = document.getElementById("notes");

if (typeof Storage !== "undefined") console.log("local storage available");
else console.log("Oops. you data will gone after page reload");

if ((noteFromLocal = localStorage.getItem(STORAGE_NOTE))) {
  notes = JSON.parse(noteFromLocal);
  for (let key in notes) createList(key);
}

function syncLocalStorage(activity, item) {
  switch (activity) {
    case "ADD":
      notes[item] = true;
      break;
    case "DELETE":
      delete notes[item];
      break;
    default:
      break;
  }

  localStorage.setItem(STORAGE_NOTE, JSON.stringify(notes));
  return;
}

function add() {
  if (textArea.value === "") {
    alert("Empty");
  } else {
    createList(textArea.value);
    syncLocalStorage("ADD", textArea.value);

    textArea.value = "";
  }
}

function removeNote(el) {
  el.parentElement.remove();
  syncLocalStorage("DELETE", el.previousElementSibling.innerText.trim());
}

function createList(text) {
  let newNote = `<div class="box"> 
  <p >${text}</p>
  <span onclick='removeNote(this)' class="remove-button">[x]</span>

</div>`;

  notesContainer.insertAdjacentHTML("afterbegin", newNote);
}
