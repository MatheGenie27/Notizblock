let notes = ["Titel", "Nachricht", "Schriftfarbe", "Hintergrundfarbe", "Datum"];
let noteTitle = ["Titel"];
let noteContent = ["Nachricht","Message", "Ansage","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."];
let noteDate = ["Datum"];


const heute = new Date().toLocaleDateString();
console.log(heute);

function hide(element){
    document.getElementById(element).classList.add('noDisplay');
}

function show(element){
    document.getElementById(element).classList.remove('noDisplay');
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
          ${noteContent[i]} <br>
        </div>  

        <div class="stickyNoteDelRow">
            <button class="delbtn" onclick="delNote(${[i]})">Löschen</button>
        </div>
    </div>
    
    `;
  }
} //Ende Function Render


 
function addNote(){

  let eingabe = document.getElementById("testEingabe");
  noteTitle.push();
  noteContent.push(eingabe.value);
  noteDate.push(heute);

  render()
}


function delNote(element){
  
  if(noteTitle[element]){
  noteTitle.splice(element,1);
  }
  
  if(noteContent[element]){
  noteContent.splice(element,1);
  }

  if(noteDate[element]){
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



  




