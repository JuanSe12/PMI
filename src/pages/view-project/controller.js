import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"

export default function fillProject() {
    DataService.getProjectByIds([1]).then(
        projects => {
            var TechnologiesContent = document.getElementById("container-tech");
            let sofkianosContent = document.getElementById("project-sofkianos-list");
            let template = "";
            let project = projects[0];
            let startDate = project.getDateInit();
            let finishDate = project.getDateFinish();
            let technologies = "";
            let sofkiano = "";
            //console.log(project)
            let nameBusiness = "";


            let prueba = document.getElementById('project-business-image');

            project.getClient().then(
                client => {
                    //console.log(client[0].name);
                    let clientStr = `<img src="${Config.baseUrl() + client[0].img}" alt="" class="resize circle" id="project-business-image">
                    ${client[0].name}`
                    document.getElementById('business-name').innerHTML = clientStr;
                }
            )

           project.getSofkianos().then(
                sofkianos => {
                    //console.log(sofkianos);
                    sofkiano = fillSofkianos(sofkianos);
                    //console.log(sofkiano);
                    let addButton = `<li class="list-sofkianos">
                                <a class="btn-floating center-image"><i class="material-icons">add</i></a>
                            </li>`;
                    sofkianosContent.innerHTML = sofkiano + addButton;
                })



            document.getElementById('title-project').innerText = project.name;
            document.getElementById('input-project-objetive').value = project.description;
            document.getElementById('input-project-start-date').value = startDate;
            document.getElementById('input-project-finish-date').value = finishDate;
            


            project.getTechnologies().then(tech => {
                technologies = fillTecno(tech);
                TechnologiesContent.innerHTML = technologies;
            })

        })

}

function fillTecno(projects) {
    let tecnoTemplate = "";
    for (let project of projects) {
        let tecnoChips =
            `<div class="chips">                  
            <div class="chip">                  
                <img src="${project.icon}" alt=""> 
                ${project.name}
            </div>
        </div> `;
        tecnoTemplate += tecnoChips;
        //console.log(project.name);
    }
    return tecnoTemplate;
}

function fillSofkianos(sofkiano) {
    let sofkianoTemplate = "";
    for (let sofki of sofkiano) {
        let sofkianoList =
            `<li class="collection-item avatar list-sofkianos">
                <img src="${Config.baseUrl() + sofki.img}" alt="" class="circle ">
                <br>
                ${sofki.firtsName}
            </li>`;
        //console.log(sofkianoList);
        sofkianoTemplate += sofkianoList;
    }
    return sofkianoTemplate;
}