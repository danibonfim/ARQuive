function indexBtn (btnId, closeId, popupId){
    let btn = document.getElementById(btnId);
    btn.addEventListener('click', event => {
        toggle(popupId)
    })

    let btnClose = document.getElementById(closeId);
    btnClose.addEventListener('click', event =>{
        toggle(popupId)
    })
}


indexBtn('btnReq', 'closeBtnReq', 'requirementsPopup' );

indexBtn('btnGuide', 'closeBtnGuide', 'guidePopup' );

indexBtn('btnDoc', 'closeBtnDoc', 'docPopup' );
