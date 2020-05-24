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
    btnAdd.innerHTML = "Adicionar novo cliente";

    btnAdd.addEventListener('click', event =>{
      toggle('clientForm')
      createForm()
      newClient()
    })

    //container and popup content
    container.innerHTML = '';
    fetchClientList();
})


//Create form
function createForm(){
  const clientForm = document.getElementById('clientForm');
  clientForm.innerHTML = `
            <header>
                <h2>Novo Cliente</h2>
                <button  class="iconButton" id="close" onclick="toggle('clientForm')"><i class="fas fa-times-circle"></i></button>
           </header>
            <form  id="formClient">
                <div>
                    <label for="firstName">Nome</label>
                    <input type="text" name ="firstName" value="">
                        
                    <label for="lastName">Sobrenome</label>
                    <input type="text" name ="lastName" value="">

                    <label for="cpf">CPF</label>
                    <input type="number" name ="cpf" value="">

                    <label for="birthDate">Data nascimento</label>
                    <input type="date" name ="birthDate" value="">
                </div>
                <div>
                    <h3>Contato</h3>

                    <label for="areaCode">DDD</label>
                    <input type="number" name ="areaCode" value="">
                        
                    <label for="phone">Telefone</label>
                    <input type="number" name ="phone" value="">

                    <label for="cellphone">Celular</label>
                    <input type="number" name ="cellphone" value="">

                    <label for="email">E-mail</label>
                    <input type="text" name ="email" value="">
                </div>

                <div>
                    <h3>Endereço</h3>

                    <label for="street">Rua</label>
                    <input type="text" name ="street" value="">

                    <label for="neighb">Bairro</label>
                    <input type="text" name ="neighb" value="">

                    <label for="addressCompl">Complemento</label>
                    <input type="text" name ="addressCompl" value="">

                    <label for="city">Cidade</label>
                    <input type="text" name ="city" value="">

                    <label for="postalCode">CEP</label>
                    <input type="number" name ="postalCode" value="">
                </div>

                 <button type="submit">Submit</button>    
            </form>
  
  `
}




//-------ADD NEW CLIENT-------------------------------------------------------------

function newClient(){
  formClient.addEventListener('submit', (e)=>{
      e.preventDefault(); //prevent the page from reloading or getting away when the form is submmited    
      //making a "copy" of the form input
      const formData = new FormData(document.getElementById('formClient'));

      fetch('http://localhost:5000/clients',{
        method: 'post',
        body: formData
      })
      .then(response => response.text())
      .then(text => console.log(text))
      .catch(error => console.log(error))
      successAlert();


  })
}

function successAlert(){
  const clientForm= document.getElementById('clientForm');
  clientForm.innerHTML = `
  <div>
    <button  class="iconButton" id="close" onclick="toggle('successClient')"><i class="fas fa-times-circle"></i></button>
    <h2 id="messageSuccess">Cliente adicionado com sucesso!</h2>
    <button class="fatbutton">Adicionar outro cliente</button>
    <a class = "fatbutton" onclick="toggle('clientForm')">Sair</a>
  </div>
  `
}
