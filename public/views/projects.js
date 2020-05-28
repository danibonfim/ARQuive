function fetchProjectList(){
  createDivInContainer('projectsContainer')

  fetch(`${url}/projects`)
  .then(response => 
    response.json().then(projectList => projectList.projects.forEach(project => createProjectBox(project)))
  ).catch(err =>
    console.error('Failed retrieving information', err)
  )
}

function fetchProjectById(projectId, personId){
  fetch(`${url}/projects/` + projectId)
  .then(response =>
    response.json()
      .then(project =>  {
        console.log(project)
        createProjectPopup(project, personId);
        toggle('popupBdProject');
        deleteProject(projectId);
      })
  .catch(err =>
    console.error('Failed retrieving information', err)
  )  
)

};


function createProjectPopup(project, personId){

    let finishDate = project.finish
    if(finishDate === null){
      finishDate  = 'Não definido'
    }else{
      finishDate = dateStamp(finishDate)
    }

  document.getElementById('projectName').innerHTML = `${project.name}`;
  document.getElementById('start').innerHTML = dateStamp(project.start);
  document.getElementById('finish').innerHTML = finishDate;
  document.getElementById('area').innerHTML = `${project.area} m²`;
  document.getElementById('services').innerHTML = `${project.services}`;
  document.getElementById('price').innerHTML = `${project.price}`;
  document.getElementById('streetP').innerHTML = `${project.street}`;
  document.getElementById('complementP').innerHTML = `${project.addressCompl}`;
  document.getElementById('districtP').innerHTML = `${project.neighb}`;
  document.getElementById('cityP').innerHTML = `${project.city}`;
  document.getElementById('imageProj').attributes.src.value = `http://localhost:5000/${project.projectImage}`
  document.getElementById('imageProj').attributes.alt.value =`${project.name}`;

  document.getElementById('tituloPopupProject').innerHTML=`${project.name}`;
  
  fetch(`${url}/clients/` + personId)
  .then(response =>
    response.json()
      .then(client =>  {
        document.getElementById('nameComplete').innerHTML = `${client.firstName} ${client.lastName}`
        document.getElementById('personContact').innerHTML = `${client.areaCode} ${client.cellphone}`

      })
    .catch(err =>
      console.error('Failed retrieving information', err)
    )  
  )
}



function createProjectBox(project){
  let div = document.createElement('div');

  div.innerHTML += `
    <div class="imageBox">
        <img src=${url}/${project.projectImage}" alt="${project.name}">
        <div class="projectInfo" id="${project._id}id">
         <h3 class="projectTitle">${project.name}</h3>
        </div>
    </div>
  `
  let info = document.createElement('i');
  info.setAttribute('class', 'fas fa-info-circle iconButton pointer info infoProject');
  info.setAttribute('id', `${project._id}id`);
  info.setAttribute('projectId', `${project._id}`);
  info.setAttribute('personId', `${project.personId}`)

  let projectsContainer = document.getElementById('projectsContainer');
  projectsContainer.appendChild(div);

  let projectInfo = document.getElementById(`${project._id}id`);
  projectInfo.appendChild(info);

  let btnInfo = document.getElementById(`${project._id}id`)
  btnInfo.addEventListener('click', event => {
    let projectId = event.target.attributes.projectId.value;
    let clientId  = event.target.attributes.personId.value;

    fetchProjectById(projectId, clientId);

    if(document.getElementById('infoProject').style.display === "none"){   
      toggleDisplay('infoProject');
      toggleDisplay('deleteProjectAlert');
    }
  });

}








document.getElementById('headerProjects').addEventListener('click', (event) => {


  createBtnAdd('Project')
  
  const addNewProject = event =>{
    
    if(document.getElementById('formProject').style.display === "none"){   
      toggleDisplay('addProjectAlert');
      toggleDisplay('formProject');
      toggleDisplay('formProjectHeader');
    }

    toggle('projectForm')
    createFormProject()
    newProject()
    event.stopImmediatePropagation() //miguézão
  }

  let btnAdd = document.getElementById('btnAddProject')
  btnAdd.addEventListener('click', addNewProject)

  //container and popup content
  fetchProjectList();
})






//CREATE FORM-------------


function createFormProject(){
  const projectForm = document.getElementById('formProject');

  const htmlBody = `
    <div class="form">
      <div class="formPart" id="projectFormPart1">  
        <div class="formPair">
            <label for="name">Nome</label>
            <input class="inputWrite" type="text" name ="name" value="">
        </div>
        <div class="formPair">
            <label for="start">Data de início</label>
            <input class="inputWrite" type="date" name ="start" value="">
        </div>
        <div class="formPair">
            <label for="finish">Data de término</label>
            <input class="inputWrite" type="date" name ="finish" value="">
        </div>
        <div class="formPair">
            <label for="area">Área do projeto</label>
            <input class="inputWrite" type="number" name ="area" value="">
        </div>
        <div class="formPair">
          <label for="services">Serviços prestados</label>
          <input class="inputWrite" type="text" name ="services" value="">
        </div>
        <div class="formPair">
          <label for="price">Valor do contrato</label>
          <input class="inputWrite" type="number" name ="price" value="">
        </div>
        <div class="formPair">
          <label for="personId">Cliente</label>
          <div class="inputWrite">
            <select class= "inputWrite" name='personId' id='clientIdProject'></select>
          </div>
        </div>
      </div> 

      <div class="titleForm" id="projectTitleImage"><h3>Imagem</h3></div>

      <div class="formPart" id="projectFormPart2">    
        <div class="formPair">
            <label for="projectImage">Imagem PNG ou JPEG</label>
            <input class= "inputWrite" type="file" name ="projectImage" value="">
        </div>

      </div>

      <div class="titleForm" id="projectTitleAdress"><h3>Endereço</h3></div>

      <div class="formPart" id="projectFormPart3">  
        <div class="formPair">
            <label for="street">Rua</label>
            <input class="inputWrite" type="text" name ="street" value="">
        </div>
        <div class="formPair">
            <label for="neighb">Bairro</label>
            <input class="inputWrite" type="text" name ="neighb" value="">
        </div>
        <div class="formPair">
            <label for="addressCompl">Complemento</label>
            <input class="inputWrite" type="text" name ="addressCompl" value="">
          </div>
        <div class="formPair">
            <label for="city">Cidade</label>
            <input class="inputWrite" type="text" name ="city" value="">
        </div>
      </div>
      <div class="btnSubmit"><button type="submit" id="submit">Enviar</button></div> 
    </div>
  `

  fetch(`${url}/clients`)
  .then(response => response.json().then(data => {
    projectForm.innerHTML = htmlBody;
    const clientDropBox = document.getElementById('clientIdProject');

    data.client.forEach(client => {
      let clientOption = `<option value="${client._id}">${client.firstName}</option>`

      clientDropBox.innerHTML += clientOption;
    })
  }))
}


//-------ADD NEW PROJECT-------------------------------------------------------------

function newProject(){
  formProject.addEventListener('submit', (event)=>{
      event.preventDefault(); //prevent the page from reloading or getting away when the form is submmited    
      //making a "copy" of the form input
      const formData = new FormData(document.getElementById('formProject'));
      document.getElementById("submit").disabled = true;
      fetch(`${url}/projects`,{
        method: 'post',
        body: formData
      })
      .then(response => response.json()
        .then(text => {
          console.log(text)
          if(response.status === 200){
            successAlertForm('projectForm','Projeto adicionado com sucesso!', 'projeto', 'formProject','addProjectAlert','formProjectHeader', fetchProjectList);
          }else{
            failureAlertForm('projectForm','Erro ao adicionar projeto!', 'projeto', 'formProject','addProjectAlert','formProjectHeader', fetchProjectList);
          }
        }))
      .catch(error => {
        console.log(error)
      })
      event.stopImmediatePropagation();
  })
}



// DELETE PROJECT -------------------------------------------

function deleteProject(projectId){
  const deleteBtn = document.getElementById('deleteBtnProjects');
  deleteBtn.setAttribute('projectId', `${projectId}`)

  deleteBtn.addEventListener('click', event =>{
    let projectId = event.target.getAttribute('projectId');

    fetch(`${url}/projects/${projectId}`,{
            method: 'delete',
    })
    .then(response => response.json()
      .then(text => {
        console.log(text)
        if(response.status === 200){
          alertDelete('popupBdProject','Projeto deletado com sucesso!','infoProject','deleteProjectAlert', fetchProjectList);
        }else{
          alertDelete('popupBdProject','Ocorreu um erro ao deletar o projeto','infoProject','deleteProjectAlert', fetchProjectList);
        }
      }))
    .catch(error => {
      console.log(error)
    });

    event.stopImmediatePropagation();
  });
}