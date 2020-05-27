const container = document.getElementById('query');
const projects = document.getElementById('projects');



//-------Container content---------------------------------------------------------------

function fetchClientById(clientId){
  fetch('http://localhost:5000/clients/' + clientId)
  .then(response =>
    response.json()
      .then(client =>  {
        createPopUp(client);
        projects.innerHTML = '';
        fetchClientProject(clientId);
        toggle('popupBD');
        deleteClient(clientId);
      })
  .catch(err =>
    console.error('Failed retrieving information', err)
  )  
)};


function createClientCard(client){
  let outerDiv = document.createElement('div');
  outerDiv.setAttribute('class', 'box hvr-underline-from-left')

  outerDiv.innerHTML += `
      <h3 class="nome">${client.firstName} ${client.lastName}</h3>
      <h4 class="contatoBox"><i class="fas fa-phone-alt contatoicone"></i>(${client.areaCode})${client.phone}</h4>
      <h4 class="contato"><i class="fas fa-mobile-alt contatoicone"></i>(${client.areaCode})${client.cellphone}</h4>  
  `
  let info = document.createElement('i');
  info.setAttribute('class', 'fas fa-info-circle iconButton pointer info');
  info.setAttribute('id', `${client._id}`);
  outerDiv.appendChild(info);

  info.addEventListener('click', event => {
      let clientId = event.target.id;
      fetchClientById(clientId);

  });
  container.appendChild(outerDiv);

  if(document.getElementById('infoClient').style.display === "none"){   
    toggleDisplay('infoClient');
    toggleDisplay('alertDeleteClient');
  }
}


function fetchClientList(){
    fetch('http://localhost:5000/clients')//return promise
    .then(response =>//the response
      response.json()//getting the data
        .then(data => data.client.forEach(client => {createClientCard(client)})))
    .catch(err =>
      console.error('Failed retrieving information', err)
    )
}


//popup Client innerHTML

function createPopUp(client){
  document.getElementById('tituloPopup').innerHTML = `${client.firstName} ${client.lastName}`
  document.getElementById('birthDate').innerHTML = client.birthDate
  document.getElementById('cpf').innerHTML = client.cpf
  document.getElementById('tellphone').innerHTML = `${client.areaCode}${client.phone}`
  document.getElementById('cellphone').innerHTML = `${client.areaCode}${client.cellphone}`
  document.getElementById('email').innerHTML = client.email
  document.getElementById('street').innerHTML = client.street
  document.getElementById('num').innerHTML = client.addressCompl
  document.getElementById('district').innerHTML = client.neighb
  document.getElementById('city').innerHTML = client.city
  document.getElementById('postalCode').innerHTML = client.postalCode
}


//Popup Client Projects

function createProjectCard(project){
  let projectBox = document.createElement('a');
  projectBox.setAttribute('class', 'imageBox');
  projectBox.setAttribute('href', '#');
  projectBox.setAttribute('id', `${project._id}`);
  projectBox.innerHTML = `
  <img src="http://localhost:5000/${project.projectImage}" alt="${project.name}">
    <h4 class="projectTitle" id = "projectTitle">${project.name}</h4>
    `
  projects.appendChild(projectBox);
}


function fetchClientProject(clientId){
  fetch('http://localhost:5000/projects/?personId=' + clientId)
  .then(response => {
    response.json().then(projecList => {
        console.log('projectList:', projecList)
        let projectsArray = projecList.projects;
        let count = projecList.count;

        if(count > 0 ){
          projectsArray.forEach(project=> createProjectCard(project))
        }else{
          projects.innerHTML = `
          <h4>Sem projetos no momento.</h4>
          `
        }

      })
  })
  .catch(err =>
    console.error('Failed retrieving information', err)
  )
}




//wraping everything
document.getElementById('headerClients').addEventListener('click', event => {
    //btn add client
    let btnAdd = document.getElementById('addData');

    const addNewClient = event =>{

      if(document.getElementById('formClient').style.display === "none"){   
        toggleDisplay('addClientAlert');
        toggleDisplay('formClient');
        toggleDisplay('formClientHeader');
      }

      toggle('clientForm')
      createForm()
      newClient()
      event.stopImmediatePropagation() //miguézão
    }

    btnAdd.addEventListener('click', addNewClient)

    //container and popup content
    container.innerHTML = '';
    fetchClientList();
  
})


//Create form
function createForm(){
  const clientForm = document.getElementById('formClient');
  clientForm.innerHTML = `
    <div class="form">
        <div class="formPart" id="formPart1">  
            <div class="formPair">
                <label for="firstName">Nome</label>
                <input type="text" name ="firstName" value="">
            </div>
          <div class="formPair">
              <label for="lastName">Sobrenome</label>
              <input type="text" name ="lastName" value="">
          </div>
          <div class="formPair">
              <label for="cpf">CPF</label>
              <input type="number" name ="cpf" value="">
          </div>
          <div class="formPair">
              <label for="birthDate">Data nascimento</label>
              <input type="date" name ="birthDate" value="">
          </div>
        </div> 

        <div class="titleForm" id="titleContact"><h3>Contato</h3></div>

      <div class="formPart" id="formPart2">    
        <div class="formPair">
            <label for="areaCode">DDD</label>
            <input type="number" name ="areaCode" value="">
        </div>
        <div class="formPair">  
            <label for="phone">Telefone</label>
            <input type="tel" name ="phone" value="">
        </div>
        <div class="formPair">
            <label for="cellphone">Celular</label>
            <input type="tel" name ="cellphone" value="">
        </div>
        <div class="formPair">
            <label for="email">E-mail</label>
            <input type="email" name ="email" value="">
        </div>
      </div>
        <div class="titleForm" id="titleAdress"><h3>Endereço</h3></div>

      <div class="formPart" id="formPart3">  
        <div class="formPair">
            <label for="street">Rua</label>
            <input type="text" name ="street" value="">
        </div>
        <div class="formPair">
            <label for="neighb">Bairro</label>
            <input type="text" name ="neighb" value="">
        </div>
        <div class="formPair">
            <label for="addressCompl">Complemento</label>
            <input type="text" name ="addressCompl" value="">
          </div>
        <div class="formPair">
            <label for="city">Cidade</label>
            <input type="text" name ="city" value="">
        </div>
        <div class="formPair">
            <label for="postalCode">CEP</label>
            <input type="text" name ="postalCode" value="">
        </div>
      </div>
      <div class="btnSubmit"><button type="submit" id="submit">Enviar</button></div> 
    </div>
  `
}


function fetchClientList(){
  fetch('http://localhost:5000/clients')//return promise
  .then(response =>//the response
    response.json()//getting the data
      .then(data => data.client.forEach(client => {createClientCard(client)})))
  .catch(err =>
    console.error('Failed retrieving information', err)
  )
}



//-------ADD NEW CLIENT-------------------------------------------------------------

function newClient(){
  formClient.addEventListener('submit', (event)=>{
      event.preventDefault(); //prevent the page from reloading or getting away when the form is submmited    
      //making a "copy" of the form input
      const formData = new FormData(document.getElementById('formClient'));
      document.getElementById("submit").disabled = true;
      fetch('http://localhost:5000/clients',{
        method: 'post',
        body: formData
      })
      .then(response => response.json()
        .then(text => {
          console.log('ENTANDO NO SEGUNDO THEN')
          console.log(text)
          if(response.status === 200){
            successAlertForm('clientForm','Cliente adicionado com sucesso!', 'cliente', 'formClient','addClientAlert','formClientHeader');
          }else{
            failureAlertForm('clientForm','Erro ao adicionar cliente!', 'cliente', 'formClient','addClientAlert','formClientHeader');
          }
        }))
      .catch(error => {
        console.log(error)
      })
      console.log('CLICK SUBMIT')
      event.stopImmediatePropagation();
  })
}

// DELETE CLIENT -------------------------------------------

function deleteClient(clientId){
  const deleteBtn = document.getElementById('deleteBtn');
  deleteBtn.setAttribute('clientId', `${clientId}`)

  deleteBtn.addEventListener('click', event =>{
    console.log('CLICKKKK')
    console.log(deleteBtn)
    let clientId = event.target.getAttribute('clientId');

    fetch(`http://localhost:5000/clients/${clientId}`,{
            method: 'delete',
    })
    .then(response => response.json()
      .then(text => {
        console.log(text)
        if(response.status === 200){
          alertDelete('popupBD','Cliente deletado com sucesso!','infoClient','alertDeleteClient');
        }else{
          alertDelete('popupBD','Ocorreu um erro ao deletar o cliente','infoClient','alertDeleteClient');
        }
      }))
    .catch(error => {
      console.log(error)
    });

    event.stopImmediatePropagation();
  });
}