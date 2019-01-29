import Route from "../../services/route.js";

$("#sofkianoss").on('click',function(){
    Route.routeTo("sofkiano","");
})
$("#projects").on('click',function(){
    Route.routeTo("project","");
})
$("#clients").on('click',function(){
    Route.routeTo("client","");
})

