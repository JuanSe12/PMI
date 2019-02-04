'use strict';

import DataService from "../../services/data_service.js";
import ModelProject from "../../model/project.js";
import Route from "../../services/route.js";

export function save(project, deleteSofkianos) {
   

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

        M.toast({html:"Se guardaron satisfactoriamente los datos"})
        Route.routeTo("project");
}

function deleteItem(id, array){
    array.forEach((item,index) => {
        if(item === id){
            array.splice(index,1);
        }
    });
    return array;
}