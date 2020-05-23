const container = document.getElementById('query');
const projects = document.getElementById('projects');

//-------Page content-----------

function fetchClientById(clientId){
  fetch('http://localhost:5000/clients/' + clientId)
  .then(response =>
    response.json()
      .then(client =>  {
        createPopUp(client);
        projects.innerHTML = '';
        fetchClientProject(clientId);
        toggle('popupBD');
      
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
// <i class="fas fa-plus-circle iconButton" id="plus"></i>

  let plus = document.createElement('i');
  plus.setAttribute('class', 'fas fa-plus-circle iconButton plus pointer');
  plus.setAttribute('id', `${client._id}`);
  outerDiv.appendChild(plus);

  plus.addEventListener('click', event => {
      let clientId = event.target.id;
      fetchClientById(clientId);
  

  });

  container.appendChild(outerDiv);
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


document.getElementById('headerClients').addEventListener('click', (event) => {
    container.innerHTML = '';
    fetchClientList();
    
})





//----POPUP INNER HTML-------

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


//-----------Projects


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







