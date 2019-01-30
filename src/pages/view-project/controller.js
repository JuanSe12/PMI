import DataService from "../../services/data_service.js";
import Route from "../../services/route.js";

export default function fillProject(project) {
           
            var TechnologiesContent = document.getElementById("container-tech");            
            let sofkianosContent = document.getElementById("project-sofkianos-list");
            let template = "";

            let startDate = project.getDateInit();
            let finishDate = project.getDateFinish();
            let technologies = "";
            let sofkiano = "";
            //console.log(project)
            let nameBusiness = "";

            project.getClient().then(
                client => {
                    console.log(client);
                    document.getElementById('business-name').innerText = client[0].name;
                }
            )

            project.getSofkianos().then(
                sofkianos => {
                    //console.log(sofkianos);
                    sofkiano = fillSofkianos(sofkianos);
                    //console.log(sofkiano);
                    sofkianosContent.innerHTML = sofkiano;                    
            })

            

            document.getElementById('title-project').innerText = project.name;
            document.getElementById('input-project-objetive').value = project.description;
            document.getElementById('input-project-start-date').value = startDate;
            document.getElementById('input-project-finish-date').value = finishDate;


            project.getTechnologies().then(tech => {
                technologies = fillTecno(tech);
                TechnologiesContent.innerHTML = technologies;
            })

            setTimeout(() => {
                document.getElementById('back').addEventListener('click',()=>{
                    Route.routeTo('project');}
                    )
            }, 300);

       
           
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
            `<li class="collection-item avatar">
            <img src="" alt="" class="resize circle ">
            <br>
            ${sofki.firtsName}
            </li>`;
        sofkianoTemplate += sofkianoList;
    }
    return sofkianoTemplate;
}

