let headerTeam = document.getElementById('headerTeam')
let btnAdd = document.getElementById('btnAdd')
let headerPartners = document.getElementById('headerPartners')

headerTeam.addEventListener('click', event =>{
    container.innerHTML = '<div id="iconConstruction"><img src="./imagens/brickwork.png" alt="logomarca" id="underConstruction"></img></div>';
    btnAdd.innerHTML= '';
})

headerPartners.addEventListener('click', event =>{
    container.innerHTML = '<div id="iconConstruction"><img src="./imagens/brickwork.png" alt="logomarca" id="underConstruction"></img></div>';
    btnAdd.innerHTML= '';
})