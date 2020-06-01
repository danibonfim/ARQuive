let btnReq = document.getElementById('btnReq');

btnReq.addEventListener('click', event => {
    toggle('requirementsPopup')
});

let closeBtn = document.getElementById('closeBtnReq');
closeBtn.addEventListener('click', event => {
    toggle('requirementsPopup')
});



//GUIA DO USUARIO

const btnGuide = document.getElementById("btnGuide");
btnGuide.addEventListener('click', event=>{
    toggle('guidePopup');
});



let closeGuide = document.getElementById('closeBtnGuide');
closeGuide.addEventListener('click', event =>{
    toggle('guidePopup');
});
