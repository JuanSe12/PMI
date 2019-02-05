'use strict';

import DataService from "../../services/data_service.js";
import ModelSofkiano from "../../model/sofkiano.js";
import Route from "../../services/route.js";

export function update(sofkianoUpdate) {
    //debugger;
    document.getElementById('saveDocument').addEventListener('click', function () {

        var technologiesContent = document.getElementById("container-tech");
        let featuresContent = document.getElementById("sofkiano-features-list");
        let firstName = document.getElementById('input-sofkiano-firstName').value;
        let lastName = document.getElementById('input-sofkiano-lastName').value;
        let documentType = document.getElementById('input-sofkiano-typeDocument').value;
        let documentNumber = document.getElementById('input-sofkiano-numberDocument').value;
        let internalExperience = document.getElementById('input-sofkiano-experience-time-sofka').value;
        let externalExperience = document.getElementById('input-sofkiano-external-experience-time').value;


        let arrayTech = [];
        let elementTech = "";
        for (let index = 0; index < technologiesContent.childNodes.length; index++) {
            elementTech = technologiesContent.childNodes[index].id;
            arrayTech.push(parseInt(elementTech.substring(9, elementTech.length)));
        }

        let arrayFeature = [];
        let elementFeatur = "";
        for (let index = 0; index < featuresContent.childNodes.length; index++) {
            elementFeatur = featuresContent.childNodes[index].id;
            arrayFeature.push(parseInt(elementFeatur.substring(11, elementFeatur.length)));
        }

        DataService.save(
            new ModelSofkiano(
                sofkianoUpdate.id, 
                firstName, 
                lastName, 
                sofkianoUpdate.img, 
                sofkianoUpdate.projects, 
                sofkianoUpdate.percents, 
                documentType, 
                documentNumber, 
                externalExperience, 
                internalExperience, 
                arrayFeature, 
                arrayTech)).then(
                    data => {
                        M.toast({html:"Se actualizaron satisfactoriamente los datos del sofkiano "+ data.firtsName + " "+data.lastName});
                        Route.routeTo('sofkiano');
                    }
                );
        
    })
}