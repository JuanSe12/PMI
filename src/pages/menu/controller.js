import Route from "../../services/route.js";

$("#sofkianoss").on('click', () => {
    Route.routeTo("sofkiano", "");
})
$("#projects").on('click', () => {
    Route.routeTo("project", "");
})
$("#clients").on('click', () => {
    Route.routeTo("client", "");
})

