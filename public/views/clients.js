const container = document.getElementById('query');

function createClientCard(client){
    container.innerHTML += `
    <div class="box hvr-underline-from-left pointer" id="${client.pp_id}"onclick = "toggle()">
    <h3 class="nome">${client.pp_name}</h3>
    <h4 class="contatoBox"><i class="fas fa-phone-alt contatoicone"></i>(${client.pp_phonecode})${client.pp_phone}</h4>
    <h4 class="contato"><i class="fas fa-mobile-alt contatoicone"></i>(${client.pp_phonecode})${client.pp_cellphone}</h4>
    <i class="fas fa-plus-circle iconButton" id="plus"></i>
    </div>
    `
}

function fetchClientList(){
    fetch('http://localhost:5000/clientes')
    .then(response => 
      response.json().then(data => data.forEach(client => createClientCard(client)))
    ).catch(err =>
      console.error('Failed retrieving information', err)
    )
}

document.getElementById('headerClientes').addEventListener('click', (event) => {
    container.innerHTML = '';
    fetchClientList();
})

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
function toggle(){
    let blur= document.getElementsByClassName("blur")[0];
    blur.classList.toggle("active")

    let popup= document.getElementsByClassName("popup")[0];
    popup.classList.toggle("active")
}