//MODAL REQUISITOS

let modalReq = document.getElementById("modal-requisitos");
let btnreq = document.getElementById("btnreq");
let span = document.getElementsByClassName("close")[0];

let h1 = document.getElementsByTagName("h1")[0];

//when user clicks the button, open modal
btnreq.addEventListener("click", () =>{
    modalReq.style.display = "block";
} );

//when user clicks the span (X), close modal

span.addEventListener("click", () =>{
    modalReq.style.display = "none";
} );

//When the user clicks anywhere outside of the modal, close it

window.addEventListener("click", () =>{
    modalReq.style.display = "none";
} );

//MODAL GUIA

//PÁGINA DE TESTE VOCÊ MESMO

let btnteste = document.getElementById("btnteste");
span.addEventListener("click", () =>{
    btnteste.replace("./teste.html")
} );