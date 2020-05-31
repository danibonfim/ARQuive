let btnReq = document.getElementById('btnReq');

btnReq.addEventListener('click', event => {
    toggle('requirementsPopup')
});

let closeBtn = document.getElementById('closeBtn');
closeBtn.addEventListener('click', event => {
    toggle('requirementsPopup')
});