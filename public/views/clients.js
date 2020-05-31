const container = document.getElementById('query');
const projects = document.getElementById('projects');
const url = 'https://arquive.herokuapp.com'

//-------Container content---------------------------------------------------------------

function fetchClientList(){
  createDivInContainer('personContainer')

  fetch(`${url}/clients`)//return promise
  .then(response =>//the response
    response.json()//getting the data
      .then(data => data.client.forEach(client => {createClientCard(client)})))
  .catch(err =>
    console.error('Failed retrieving information', err)
  )
}



function fetchClientById(clientId){
  fetch(`${url}/clients/` + clientId)
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
)

};


function fetchClientProject(clientId){
  fetch(`${url}/projects/?personId=` + clientId)
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


function createClientCard(client){
  let div = document.createElement('div');
  div.setAttribute('class', 'box hvr-underline-from-left')

  div.innerHTML += `
      <h3 class="nome">${client.firstName} ${client.lastName}</h3>
      <h4 class="contatoBox"><i class="fas fa-phone-alt contatoicone"></i>(${client.areaCode})${client.phone}</h4>
      <h4 class="contato"><i class="fas fa-mobile-alt contatoicone"></i>(${client.areaCode})${client.cellphone}</h4>  
  `
  let info = document.createElement('i');
  info.setAttribute('class', 'fas fa-info-circle iconButton pointer info');
  info.setAttribute('id', `${client._id}`);
  div.appendChild(info);

  let personContainer = document.getElementById('personContainer');
  personContainer.appendChild(div);

  info.addEventListener('click', event => {
      let clientId = event.target.id;
      fetchClientById(clientId);

      if(document.getElementById('infoClient').style.display === "none"){   
        toggleDisplay('infoClient');
        toggleDisplay('deleteClientAlert');
      }

  });
}


//popup Client innerHTML

function createPopUp(client){
  document.getElementById('tituloPopup').innerHTML = `${client.firstName} ${client.lastName}`
  document.getElementById('birthDate').innerHTML = dateStamp(client.birthDate)
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
  let projectBox = document.createElement('div');
  projectBox.setAttribute('class', 'imageBox');
  // projectBox.setAttribute('id', `${project._id}`);
  projectBox.innerHTML = `
  <img src="${project.projectImage}" alt="${project.name}">
    <div class="projectInfo">
      <h4 class="projectTitle"">${project.name}</h4>
      <i class="fas fa-info-circle iconButton pointer info infoProject" id="${project._id}" personId="${project.personId}"></i>
    </div>
  `
  projects.appendChild(projectBox);


  let infoProject = document.getElementById(`${project._id}`)
  infoProject.addEventListener('click', event =>{
    fetchProjectClicked(event.target.attributes.id.value, event.target.attributes.personId.value)
    
  })

}


//ProjectCard onclick Fetch project

function fetchProjectClicked(projectId, personId){
  fetch(`${url}/projects/` + projectId)
  .then(response =>
    response.json()
      .then(project =>  {
        console.log(project)
        createProjectPopup(project, personId);
        deleteProject(projectId);
      }) .then(()=>{
        toggle('popupBD');
        toggle('popupBdProject');
      })
  .catch(err =>
    console.error('Failed retrieving information', err)
  )  
)

};



function loadClients(){
    document.getElementById("headerClients").focus();
    createBtnAdd('Client', 'Novo cliente')
  
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

    let btnAdd = document.getElementById('btnAddClient')
    btnAdd.addEventListener('click', addNewClient)

    //container and popup content
    fetchClientList();
}

//wraping everything
document.getElementById('headerClients').addEventListener('click', event => {
  loadClients()
})


//Create form
function createForm(){
  const clientForm = document.getElementById('formClient');
  clientForm.innerHTML = `
    <div class="form">
        <div class="formPart" id="formPart1">  
            <div class="formPair">
                <label for="firstName">Nome</label>
                <input class="inputWrite" type="text" name ="firstName" value="">
            </div>
          <div class="formPair">
              <label for="lastName">Sobrenome</label>
              <input class="inputWrite" type="text" name ="lastName" value="">
          </div>
          <div class="formPair">
              <label for="cpf">CPF</label>
              <input class="inputWrite" type="number" name ="cpf" value="">
          </div>
          <div class="formPair">
              <label for="birthDate">Data nascimento</label>
              <input class="inputWrite" type="date" name ="birthDate" value="">
          </div>
        </div> 

        <div class="titleForm" id="titleContact"><h3>Contato</h3></div>

      <div class="formPart" id="formPart2">    
        <div class="formPair">
            <label for="areaCode">DDD</label>
            <input class="inputWrite" type="number" name ="areaCode" value="">
        </div>
        <div class="formPair">  
            <label for="phone">Telefone</label>
            <input class="inputWrite" type="tel" name ="phone" value="">
        </div>
        <div class="formPair">
            <label for="cellphone">Celular</label>
            <input class="inputWrite" type="tel" name ="cellphone" value="">
        </div>
        <div class="formPair">
            <label for="email">E-mail</label>
            <input  class="inputWrite" type="email" name ="email" value="">
        </div>
      </div>
        <div class="titleForm" id="titleAdress"><h3>Endereço</h3></div>

      <div class="formPart" id="formPart3">  
        <div class="formPair">
            <label for="street">Rua</label>
            <input class="inputWrite" type="text" name ="street" value="">
        </div>
        <div class="formPair">
            <label for="neighb">Bairro</label>
            <input  class="inputWrite" type="text" name ="neighb" value="">
        </div>
        <div class="formPair">
            <label for="addressCompl">Complemento</label>
            <input class="inputWrite" type="text" name ="addressCompl" value="">
          </div>
        <div class="formPair">
            <label for="city">Cidade</label>
            <input class="inputWrite" type="text" name ="city" value="">
        </div>
        <div class="formPair">
            <label for="postalCode">CEP</label>
            <input class="inputWrite" type="text" name ="postalCode" value="">
        </div>
      </div>
      <div class="btnSubmit"><button type="submit" id="submit">Enviar</button></div> 
    </div>
  `
}





//-------ADD NEW CLIENT-------------------------------------------------------------

function newClient(){
  formClient.addEventListener('submit', (event)=>{
      event.preventDefault(); //prevent the page from reloading or getting away when the form is submmited    
      //making a "copy" of the form input
      const formData = new FormData(document.getElementById('formClient'));
      document.getElementById("submit").disabled = true;
      fetch(`${url}/clients`,{
        method: 'post',
        body: formData
      })
      .then(response => response.json()
        .then(text => {
          console.log('ENTANDO NO SEGUNDO THEN')
          console.log(text)
          if(response.status === 200){
            successAlertForm('clientForm','Cliente adicionado com sucesso!', 'cliente', 'formClient','addClientAlert','formClientHeader', fetchClientList);
          }else{
            failureAlertForm(
              'clientForm',
              'Erro ao adicionar cliente!', 
              'cliente', 
              'formClient',
              'addClientAlert',
              'formClientHeader', 
              fetchClientList
            );
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

// CASCADE PROJECT

function cascadeProjects(clientId){
  fetch(`${url}/projects/?personId=` + clientId)
  .then(response => {
    response.json().then(projecList => {
        let projectsArray = projecList.projects;
        let count = projecList.count;

        if(count > 0 ){
          projectsArray.forEach(project=> deleteClientCascadeProject(project._id))
        }else{
          return
        }
      })
  })
  .catch(err =>
    console.error('Failed retrieving information', err)
  )
}



function deleteClient(clientId){
  const deleteBtn = document.getElementById('deleteBtn');
  deleteBtn.setAttribute('clientId', `${clientId}`)

  deleteBtn.addEventListener('click', event =>{
    let clientId = event.target.getAttribute('clientId');

    fetch(`${url}/clients/${clientId}`,{
            method: 'delete',
    })
    .then(response => response.json()
      .then(text => {
        console.log(text)
        if(response.status === 200){

          cascadeProjects(clientId)
          console.log(clientId + 'CLIENT IIIDDDDDD')

          alertDelete('popupBD','Cliente deletado com sucesso!','infoClient','deleteClientAlert');
        }else{
          alertDelete('popupBD','Ocorreu um erro ao deletar o cliente','infoClient','deleteClientAlert');
        }
      }))
    .catch(error => {
      console.log(error)
    });

    event.stopImmediatePropagation();
  });
}