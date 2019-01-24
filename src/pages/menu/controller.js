import  DataService from "../../services/data_service.js";

const path = './src/pages/menu/template.html';
$('#menu').load(path);

/** TEST */
    DataService.getAllClientTypes()
    .then(types =>{
        console.log(types)
    });

    DataService.getAllClients()
    .then(types =>{
        console.log(types)
    });

    DataService.getAllFeatures()
    .then(types =>{
        console.log(types)
    });

    DataService.getAllProjectStates()
    .then(types =>{
        console.log(types)
    });

    DataService.getAllProjects()
    .then(types =>{
        console.log(types)
    });

    DataService.getAllSofkianos()
    .then(types =>{
        console.log(types)
    });

    DataService.getAllTechnologies()
    .then(types =>{
        console.log(types)
    });
