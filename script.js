let notes = ["Titel"];
let noteTitle = ["Titel"];
let noteContent = ["Nachricht"];
let noteDate = ["Datum"];

let trashNotes = ["TrashTitel"];
let trashNoteTitle = ["TrashTitel"];
let trashNoteContent = ["TrashNachricht"];
let trashNoteDate = ["TrashDatum"];


const heute = new Date().toLocaleDateString();
console.log(heute);

function hide(id){
    
  let element = document.getElementById(id);

    element.classList.remove('animationEinblenden');
    element.classList.add('animationAusblenden');
    setTimeout(noDisplay, 495);
    
    function noDisplay(){
    element.classList.add('noDisplay');
    }
}

function show(id){
    
  let element = document.getElementById(id);

  element.classList.remove('noDisplay');
  element.classList.remove('animationAusblenden');
  element.classList.add('animationEinblenden');
}

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "  ";

  for (let i = 0; i < noteContent.length; i++) {
    content.innerHTML += `
    
        
    <div  class="stickyNote">
        
        <div onclick="showNote(${[i]})" id="card${[i]}"  class="stickyNoteContent">
          <h2>${noteTitle[i]}</h2> 
          <hr>
          ${noteDate[i]} <br>
          <br>
          ${noteContent[i]} <br>
        </div>  

        <div class="stickyNoteDelRow">

            <img class="delbtn" title="Notiz löschen" onclick="delNote(${[i]})">
        </div>
    </div>
    
    `;
  }
} //Ende Function Render



function renderTrash() {
  let content = document.getElementById("trashContent");
  content.innerHTML = "  ";
  

  for (let i = 0; i < trashNoteContent.length; i++) {
    content.innerHTML += `
    
        
    <div  class="stickyNote">
        
        <div onclick=" " id="card${[i]}"  class="stickyNoteContent">
          <h2>${trashNoteTitle[i]}</h2> 
          <hr>
          ${trashNoteDate[i]} <br>
          <br>
          ${trashNoteContent[i]} <br>
        </div>  

        <div class="stickyNoteDelRow">
            <img id="restoreNoteIcon" title="Notiz wiederherstellen" onclick="restoreNote(${[i]})" >
            <img id="finalDelbtn" title="Notiz endgültig löschen" onclick="finalDelNote(${[i]})">
        </div>
    </div>
    
    `;
  }
} //Ende Function Render


 
function addNote(){

  let title = document.getElementById("titleInput");
  let note = document.getElementById("noteInput");

  if (title.value && note.value) {
  noteTitle.push(title.value);
  noteContent.push(note.value);
  noteDate.push(heute);

  title.value="";
  note.value="";

  return true;

} else {
    alert("Eine Notiz braucht Titel und Inhalt!");
    return false;
  }
  
  

  
}


function delNote(element){
  
  if(noteTitle[element]){
  trashNoteTitle.push(noteTitle[element]);  
  noteTitle.splice(element,1);
  }
  
  if(noteContent[element]){
  trashNoteContent.push(noteContent[element])
  noteContent.splice(element,1);
  }

  if(noteDate[element]){
  trashNoteDate.push(noteDate[element]);
  noteDate.splice(element,1);
  }

  render();
}


function showNote(element){
  console.log(`Zeige Karte Nummer ${element}`);
  content= `<h2>TESTCONTENT</h2>`;
  popup(element);
  

}

function popup(cardnumber){
  
  
  show("popup");
  
  show("popupField");

  let popup = document.getElementById("popup");
  let popupField = document.getElementById("popupField");

  popupField.innerHTML = document.getElementById(`card${cardnumber}`).innerHTML;
  
   
  

}

function closePopup(){
  console.log("Versuche zu schließen.")
  let popup = document.getElementById("popup");
  hide("popup");
}


function showInputSection(){
  console.log("Versuche Eingabebereich zu zeigen");
  
  show("inputSection");
}


  
function closeInputSection(){
    console.log("Schließe Eingabe PopUp");
    hide("inputSection");
    document.getElementById("testEingabe").value="";
}

function submitNote(){
  let submitted = addNote();
  if (submitted){
  closeInputSection();
  render();
  }
  
}


function showTrashSection(){
  console.log("Versuche Trash-Section zu zeigen");
  show("trashSection");
  renderTrash();
}

function closeTrashSection(){
  console.log("Versuche Trash-Section zu schließen");
  hide("trashSection");
  render();
}


function finalDelNote(element){
  
  if(trashNoteTitle[element]){
  trashNoteTitle.splice(element,1);
  }
  
  if(trashNoteContent[element]){
  trashNoteContent.splice(element,1);
  }

  if(trashNoteDate[element]){
  trashNoteDate.splice(element,1);
  }

  renderTrash();


}

function restoreNote(element){
  
  if(trashNoteTitle[element]){
  noteTitle.push(trashNoteTitle[element]);  
  trashNoteTitle.splice(element,1);
  }
  
  if(trashNoteContent[element]){
  noteContent.push(trashNoteContent[element])
  trashNoteContent.splice(element,1);
  }

  if(trashNoteDate[element]){
  noteDate.push(trashNoteDate[element]);
  trashNoteDate.splice(element,1);
  }

  renderTrash();
}




