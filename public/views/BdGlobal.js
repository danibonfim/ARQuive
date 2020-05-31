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


//ALERT ADD DATA

function failureAlertForm(toggleFormPopupId, messageString, dataTypeAdd, formId, alertId, headerId){
    console.log('CONSOLE DENTRO DA FUNCAO FAIL ALERTFORM')
    toggleDisplay(formId);
    toggleDisplay(alertId);
    toggleDisplay(headerId);
    const addAlert = document.getElementById(alertId);
  
    //display message
    addAlert.innerHTML = `
      <h2 class="messageFailure" id="messageFailure">${messageString}</h2>
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
  


  function successAlertForm(toggleFormPopupId, messageString, dataTypeAdd, formId, alertId, headerId, functionFetchAll){
    toggleDisplay(formId);
    toggleDisplay(alertId);
    toggleDisplay(headerId);
    const addAlert = document.getElementById(alertId);
  
    //display message
    addAlert.innerHTML = `
      <h2 class="messageSuccess" id="messageSuccess">${messageString}</h2>
      <a class = "fatbutton btnAddNew" id="btnAdd${dataTypeAdd}">Adicionar outro</a>
      <a class = "fatbutton outBtn outBtnSuc" id="outBtnSuc">Sair</a>
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
      functionFetchAll()
    });
  
  }


  //ALERT DELETE

  
function alertDelete(toggleDataPopupId, messageString, infoId, alertId, functionFetchElement){
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
      functionFetchElement()

    });
  }


//ADD BOTÃO DE CRIAR NOVO ELEMENTO

function createBtnAdd(elementType, spanText){
  console.log('Rodei!')
  let divContentHeader = document.getElementById('btnAdd');
  divContentHeader.innerHTML = '';

  let i = document.createElement('i');
  i.setAttribute('class', 'fas fa-plus-circle iconButton pointer tooltip btnAdd')
  i.setAttribute('id', `btnAdd${elementType}`)

  let span = document.createElement('span');
  span.setAttribute('class', 'tooltiptext');
  span.innerHTML = spanText

  i.appendChild(span);
  divContentHeader.appendChild(i);
  
}


//CRIAR DIV DO CONTAINER

function createDivInContainer(divName){
  container.innerHTML = '';
  let insideContainer = document.createElement('div');
  insideContainer.setAttribute('id', divName);
  container.append(insideContainer);

}




