'use strict';

import DataService from "../../services/data_service.js";
import ModelProject from "../../model/project.js";
import Route from "../../services/route.js";

export function save() {
  
    document.getElementById('saveDocument').addEventListener('click', function () {

        console.log(deleteSofkianos);
        
        let nameProject = document.getElementById("title-project").value;
        let objetive = document.getElementById("input-project-objetive").value;
        let startDate = document.getElementById("input-project-start-date").value;
        let finishDate = document.getElementById("input-project-finish-date").value;
        let client = document.getElementById('business-name');
        let clientInsert = "";

        clientInsert = client.childNodes[0].id;
        clientInsert = clientInsert.substring(22, clientInsert.length);

        project.name = nameProject;
        project.description = objetive;
        project.client = parseInt(clientInsert);
        project.dateInit = new Date(startDate).toString();
        project.dateFinish = new Date(finishDate).toString();


        DataService.save(project).then(
            project => {
                console.log(deleteSofkianos);
                
                project.getSofkianos().then(
                    sofkianos => {
                        sofkianos.forEach(sofkiano => {
                            sofkiano.projects = Array.from(new Set(sofkiano.projects).add(project.id))
                            DataService.save(sofkiano);
                        });
                    }
                )
                DataService.getSofkianoByIds(deleteSofkianos).then(
                    sofkianos =>{
                        sofkianos.forEach(sofkiano => {
                            sofkiano.projects = deleteItem(project.id, sofkiano.projects);
                            DataService.save(sofkiano)
                        });
                    }
                );
                
            }
        )

        
    })
}