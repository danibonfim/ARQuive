let headerTeam = document.getElementById('headerTeam')
let btnAdd = document.getElementById('btnAdd')
let headerPartners = document.getElementById('headerPartners')

headerTeam.addEventListener('click', event =>{
    container.innerHTML = '<div id="iconConstruction"><img src="https://arquive.s3.us-east-2.amazonaws.com/imagensSite/brickwork.png" alt="em construção" id="underConstruction"></img></div>';
    btnAdd.innerHTML= '';
})

headerPartners.addEventListener('click', event =>{
    container.innerHTML = '<div id="iconConstruction"><img src="https://arquive.s3.us-east-2.amazonaws.com/imagensSite/brickwork.png" alt="em construção" id="underConstruction"></img></div>';
    btnAdd.innerHTML= '';
})