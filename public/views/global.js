//FILTER BY NAME

function filterByName() {
    var input, filter, i, txtValue;
    input = document.getElementById("inputSearch");
    filter = input.value.toUpperCase();
    div = container.getElementsByTagName("div");
    for (i = 0; i < div.length; i++) {
        h3 = div[i].getElementsByTagName("h3")[0];
        txtValue = h3.textContent || h3.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
  }
  

//ALTERAR TÍTULO DAS QUERRYS
let tituloPagina = document.getElementById("tituloquery");
let menu = document.getElementsByClassName('menu')[0]
menu.childNodes.forEach((button) =>{
    button.addEventListener('click', alteraTitulo)
})

function alteraTitulo(event){
    tituloPagina.innerHTML= event.target.innerHTML;
}

//CRIAR TOGGLE DO POPUP
function toggle(elementId){
    let blur= document.getElementsByClassName("blur")[0];
    blur.classList.toggle("active");

    let popup= document.getElementById(elementId);
    popup.classList.toggle("active");
}

function toggleDisplay(elementId){
    let div= document.getElementById(elementId);
    if (div.style.display === "none"){
        div.style.display = "block"
    }else{
        div.style.display = "none";
    }
};
