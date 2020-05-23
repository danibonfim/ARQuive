function createProjectBox(project){
    container.innerHTML += `
    <a class="imageBox" href="#" class="projeto">
        <img src="${project.image}" alt="Italian Trulli">
        <h4 class="projectTitle">${project.name}</h4>
    </a>
    `
}

function fetchProjectList(){
    fetch('http://localhost:5000/projetos')
    .then(response => 
      response.json().then(data => data.forEach(project => createProjectBox(project)))
    ).catch(err =>
      console.error('Failed retrieving information', err)
    )
}

document.getElementById('headerProjects').addEventListener('click', (event) => {
    container.innerHTML = '';
    console.log('click')
    fetchProjectList();
})