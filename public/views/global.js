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

//TOGGLE DISP

function toggleDisplay(elementId, displayType = "grid"){
    let div= document.getElementById(elementId);
    if (div.style.display === "none"){
        div.style.display = `${displayType}`
    }else{
        div.style.display = "none";
    }
};


// function toggleDisplay(elementId){
//   let div= document.getElementById(elementId);
//   if (div.style.visibility === "hidden"){
//       div.style.visibility = "visible";
//   }else{
//       div.style.visibility = "hidden";
//   }
// };

//ALERT ADD DATA

function failureAlertForm(toggleFormPopupId, messageString, dataTypeAdd, formId, alertId, headerId){
    console.log('CONSOLE DENTRO DA FUNCAO FAIL ALERTFORM')
    toggleDisplay(formId);
    toggleDisplay(alertId);
    toggleDisplay(headerId);
    const addAlert = document.getElementById(alertId);
  
    //display message
    addAlert.innerHTML = `
      <h2 "alertH2" id="messageFailure">${messageString}</h2>
      <a class = "fatbutton outBtn" id="outBtn">Sair</a>
      <a class="fatbutton btnAddNew" id="btnAdd${dataTypeAdd}">Tentar novamente </a>
    `
    //button try again
    const btnAddNew = document.getElementById(`btnAdd${dataTypeAdd}`)
    
    btnAddNew.addEventListener('click', (event) => {
      document.getElementById(formId).reset()


      toggleDisplay(alertId);
      toggleDisplay(formId);
      toggleDisplay(headerId);
      document.getElementById("submit").disabled = false;
      
      let close = document.getElementById('closeForm');
      close.addEventListener('click', fetchClientList);
    });
  
    //button out
    const outBtn= document.getElementById('outBtn');
    container.innerHTML = '';
    outBtn.addEventListener('click', () => {
      toggle(toggleFormPopupId)
      fetchClientList()
    });
  
  }
  


  function successAlertForm(toggleFormPopupId, messageString, dataTypeAdd, formId, alertId, headerId){
    toggleDisplay(formId);
    toggleDisplay(alertId);
    toggleDisplay(headerId);
    const addAlert = document.getElementById(alertId);
  
    //display message
    addAlert.innerHTML = `
      <h2 id="messageSuccess">${messageString}</h2>
      <a class = "fatbutton btnAddNew" id="btnAdd${dataTypeAdd}">Adicionar outro</a>
      <a class = "fatbutton outBtn" id="outBtnSuc">Sair</a>
    `
    //button add another
    const btnAddNew = document.getElementById(`btnAdd${dataTypeAdd}`)
    btnAddNew.addEventListener('click', (event) => {
      document.getElementById(formId).reset()
      toggleDisplay(alertId);
      toggleDisplay(formId);
      toggleDisplay(headerId);
      document.getElementById("submit").disabled = false;
  
      let close = document.getElementById('closeForm');
      close.addEventListener('click', fetchClientList);
  
    });
  
    //button out
    const outBtn= document.getElementById('outBtnSuc');
    container.innerHTML = '';
    outBtn.addEventListener('click', () => {
      toggle(toggleFormPopupId)
      fetchClientList()
    });
  
  }


  //ALERT DELETE

  
function alertDelete(toggleDataPopupId, messageString, infoId, alertId){
    toggleDisplay(infoId);
    toggleDisplay(alertId);
    const addAlert = document.getElementById(alertId);
  
    //MESSAGE DISPLAY
    addAlert.innerHTML = `
      <h2 id="messageSuccess">${messageString}</h2>
      <a class = "fatbutton outBtn" id="outBtnDelete">Sair</a>
    `
    //BUTTON OUT 
    const outBtn= document.getElementById('outBtnDelete');
    container.innerHTML = '';
    outBtn.addEventListener('click', () => {
      toggle(toggleDataPopupId)
      fetchClientList()

    });
  }



  //LOAD EVENT
  // function createLoader(elementId){
  //   const div = document.getElementById(elementId);
  //   const htmlLoader = `
  //   <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
  //   `
  //   let divLoader = document.createElement('div');
  //   divLoader.setAttribute('class', 'lds-roller loader')
  //   divLoader.innerHTML = htmlLoader;
  //   div.appendChild(divLoader);

  //   window.addEventListener("load", () =>{
  //     const loader = document.querySelector(".loader");
  //     console.log(loader)
  //     loader.className += " hidden";
  //   })
  
  // }


  //DATE STAMP DD/MM/YYYY 
function dateStamp(date){
  let str = date.toString();
  let split = str.split("T");
  let newstr = split[0].split("-");
  let dateStamp = newstr[2] + "/" + newstr[1] + "/" + newstr[0]
  return dateStamp
}
