'use strict';

import DataService from "../../services/data_service.js";
import ModelProject from "../../model/project.js";

export function save() {
    //debugger;
    document.getElementById('saveDocument').addEventListener('click', function () {

        var TechnologiesContent = document.getElementById("container-tech");
        let nameProject = document.getElementById("title-project").value;
        let objetive = document.getElementById("input-project-objetive").value;
        let startDate = document.getElementById("input-project-start-date").value;
        let finishDate = document.getElementById("input-project-finish-date").value;
        let client = document.getElementById('business-name');
        let sofkianos = document.getElementById("project-sofkianos-list");


        let arrayTech = [];
        let clientInsert = "";
        let elementTech = "";
        for (let index = 0; index < TechnologiesContent.childNodes.length; index++) {
            elementTech = TechnologiesContent.childNodes[index].id;
            arrayTech.push(elementTech.substring(9, elementTech.length));
        }

        clientInsert = client.childNodes[0].id;
        clientInsert = clientInsert.substring(22, clientInsert.length);


        let arraySofkiano = [];
        let elementSofki = "";
        for (let index = 0; index < sofkianos.childNodes.length; index++) {
            elementSofki = sofkianos.childNodes[index].id;
            arraySofkiano.push(elementSofki.substring(10, elementSofki.length));
        }

        DataService.save(new ModelProject(
            1,
            nameProject,
            objetive,
            2,
            clientInsert,
            startDate,
            finishDate,
            arrayTech,
            arraySofkiano
        ))
    })
}