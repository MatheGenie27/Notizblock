let notes = [];
let noteTitle = [];
let noteContent = [];
let noteDate = [];

let trashNotes = [];
let trashNoteTitle = [];
let trashNoteContent = [];
let trashNoteDate = [];

const heute = new Date().toLocaleDateString();
console.log(heute);

function exampleContent() {
  noteTitle.push("Titel");
  noteContent.push(
    "Dies ist eine Beispiel-Notiz, die ein bisschenen längeren Text enthält."
  );
  noteDate.push("21.02.2024");
  saveLocal();
}

//Ein und Ausblende-Effekte
function hide(id) {
  let element = document.getElementById(id);

  element.classList.remove("animationEinblenden");
  element.classList.add("animationAusblenden");
  setTimeout(noDisplay, 495);

  function noDisplay() {
    element.classList.add("noDisplay");
  }
}

function show(id) {
  let element = document.getElementById(id);

  element.classList.remove("noDisplay");
  element.classList.remove("animationAusblenden");
  element.classList.add("animationEinblenden");
}

//Rendert die Content-Section der Seite
function render() {
  let content = document.getElementById("content");
  content.innerHTML = "  ";

  for (let i = 0; i < noteContent.length; i++) {
    content.innerHTML += `
    
        
    <div  class="stickyNote">
        
        <div onclick="showNote(${[i]})" id="card${[
      i,
    ]}"  class="stickyNoteContent">
          <h2>${noteTitle[i]}</h2> 
          <hr>
          ${noteDate[i]} <br>
          <br>
          ${noteContent[i]} <br>
        </div>  

        <div class="stickyNoteDelRow">

            <img class="delbtn" title="Notiz löschen" onclick="delNote(${[
              i,
            ]})" src="./img/trash1.svg">
        </div>
    </div>
    
    `;
  }
} //Ende Function Render

//Rendert die Mülleimer Einblendung
function renderTrash() {
  let content = document.getElementById("trashContent");
  content.innerHTML = "  ";

  for (let i = 0; i < trashNoteContent.length; i++) {
    content.innerHTML += `
    
        
    <div  class="stickyNote noPointer" >
        
        <div onclick=" " id="card${[i]}"  class="stickyNoteContent">
          <h2>${trashNoteTitle[i]}</h2> 
          <hr>
          ${trashNoteDate[i]} <br>
          <br>
          ${trashNoteContent[i]} <br>
        </div>  

        <div class="stickyNoteDelRow">
            <img id="restoreNoteIcon" title="Notiz wiederherstellen" onclick="restoreNote(${[
              i,
            ]})" src="./img/trash-restore-alt.svg" >
            <img id="finalDelbtn" title="Notiz endgültig löschen" onclick="finalDelNote(${[
              i,
            ]})" src="./img/trash-check.svg">
        </div>
    </div>
    
    `;
  }
} //Ende Function Render

//Neue Karte erstellen
function addNote() {
  let title = document.getElementById("titleInput");
  let note = document.getElementById("noteInput");

  let noteAsString = note.value.replace(/\n/g, "<br/>");

  if (title.value && note.value) {
    noteTitle.push(title.value);
    noteContent.push(noteAsString);
    noteDate.push(heute);

    title.value = "";
    note.value = "";

    saveLocal();
    return true;
  } else {
    alert("Eine Notiz braucht Titel und Inhalt!");
    return false;
  }
}

//Karte löschen und in Mülleimer verschieben
function delNote(element) {
  if (noteTitle[element]) {
    trashNoteTitle.push(noteTitle[element]);
    noteTitle.splice(element, 1);
  }

  if (noteContent[element]) {
    trashNoteContent.push(noteContent[element]);
    noteContent.splice(element, 1);
  }

  if (noteDate[element]) {
    trashNoteDate.push(noteDate[element]);
    noteDate.splice(element, 1);
  }
  saveLocal();
  render();
}

//Zeigt das Modal auf dem dann die Karte vergrößert dargestellt wird
function showNote(element) {
  //console.log(`Zeige Karte Nummer ${element}`);
  popup(element);
}

function popup(cardnumber) {
  // Funktion könnte in Funktion showNote integriert werden

  show("popup");

  show("popupField");

  let popup = document.getElementById("popup");
  let popupField = document.getElementById("popupField");

  popupField.innerHTML = document.getElementById(`card${cardnumber}`).innerHTML;
}

//schließt das Modal auf dem die Karte vergrößert dargestellt wird
function closePopup() {
  //console.log("Versuche zu schließen.")
  let popup = document.getElementById("popup");
  hide("popup");
}

//Zeigt Eingabe Sektion
function showInputSection() {
  //console.log("Versuche Eingabebereich zu zeigen");

  show("inputSection");
}

function submitNote() {
  let submitted = addNote();
  if (submitted) {
    closeInputSection();
    render();
  }
}

//Schließt Eingabe Sektion
function closeInputSection() {
  //console.log("Schließe Eingabe PopUp");
  hide("inputSection");
}

//Abfallsektion

function showTrashSection() {
  //console.log("Versuche Trash-Section zu zeigen");
  show("trashSection");
  renderTrash();
}

function closeTrashSection() {
  //console.log("Versuche Trash-Section zu schließen");
  hide("trashSection");
  render();
}

function finalDelNote(element) {
  if (trashNoteTitle[element]) {
    trashNoteTitle.splice(element, 1);
  }

  if (trashNoteContent[element]) {
    trashNoteContent.splice(element, 1);
  }

  if (trashNoteDate[element]) {
    trashNoteDate.splice(element, 1);
  }
  saveLocal();
  renderTrash();
}

function restoreNote(element) {
  if (trashNoteTitle[element]) {
    noteTitle.push(trashNoteTitle[element]);
    trashNoteTitle.splice(element, 1);
  }

  if (trashNoteContent[element]) {
    noteContent.push(trashNoteContent[element]);
    trashNoteContent.splice(element, 1);
  }

  if (trashNoteDate[element]) {
    noteDate.push(trashNoteDate[element]);
    trashNoteDate.splice(element, 1);
  }
  saveLocal();
  renderTrash();
}

//LocalStorage - Datenpersistenz

function saveLocal() {
  let noteTitleAsText = JSON.stringify(noteTitle);
  let noteContentAsText = JSON.stringify(noteContent);
  let noteDateAsText = JSON.stringify(noteDate);
  let trashNoteTitleAsText = JSON.stringify(trashNoteTitle);
  let trashNoteContentAsText = JSON.stringify(trashNoteContent);
  let trashNoteDateAsText = JSON.stringify(trashNoteDate);

  localStorage.setItem("Title", noteTitleAsText);
  localStorage.setItem("Content", noteContentAsText);
  localStorage.setItem("Date", noteDateAsText);
  localStorage.setItem("TTitle", trashNoteTitleAsText);
  localStorage.setItem("TContent", trashNoteContentAsText);
  localStorage.setItem("TDate", trashNoteDateAsText);
}

function loadLocal() {
  let noteTitleAsText = localStorage.getItem("Title");
  let noteContentAsText = localStorage.getItem("Content");
  let noteDateAsText = localStorage.getItem("Date");
  let trashNoteTitleAsText = localStorage.getItem("TTitle");
  let trashNoteContentAsText = localStorage.getItem("TContent");
  let trashNoteDateAsText = localStorage.getItem("TDate");

  if (noteTitleAsText && noteContentAsText && noteDateAsText) {
    noteTitle = JSON.parse(noteTitleAsText);
    noteContent = JSON.parse(noteContentAsText);
    noteDate = JSON.parse(noteDateAsText);
  }

  if (trashNoteTitleAsText && trashNoteContentAsText && trashNoteDateAsText) {
    trashNoteTitle = JSON.parse(trashNoteTitleAsText);
    trashNoteContent = JSON.parse(trashNoteContentAsText);
    trashNoteDate = JSON.parse(trashNoteDateAsText);
  }
}
