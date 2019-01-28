import Route from "../../services/route.js";

document.getElementById("projects").addEventListener('click', () =>{
    Route.routeTo("home");
      
})


document.getElementById("clients").addEventListener('click', () =>{
    Route.routeTo("client");
      
})

/*document.getElementById("sofkianoss").addEventListener('click', () =>{
    
    Route.routeTo("sofkiano");
      
})*/

$("#sofkianoss").on('click',function(){
    Route.routeTo("sofkiano");
})