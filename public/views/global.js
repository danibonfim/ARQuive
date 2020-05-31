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
