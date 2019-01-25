import Route from "../../services/route.js";



document.getElementById("projects").addEventListener('click', () =>{
    Route.routeTo("project");
      
})
document.getElementById("clients").addEventListener('click', () =>{
    Route.routeTo("client");
      
})

document.getElementById("sofkianoss").addEventListener('click', () =>{
    Route.routeTo("sofkiano");
      
})