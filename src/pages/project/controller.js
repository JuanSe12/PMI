import DataService from "../../services/data_service.js";


export default function fillProjects() {
    DataService.getProjectByIds([1]).then(
        projects => {
            var content = document.getElementById("container-tech");
            let template = "";
            let project = projects[0];
            let startDate = project.getDateInit();
            let finishDate = project.getDateFinish();
            let tecnologhies = "";
            console.log(project)
            let nameBusiness= "";
            project.getClient().then(
                client =>{
                    console.log(client[0])
                }
            )
            
            document.getElementById('title-project').innerText = project.name;
            document.getElementById('input-project-objetive').value = project.description;
            document.getElementById('input-project-start-date').value = startDate;
            document.getElementById('input-project-finish-date').value = finishDate;
           // document.getElementById('business-name').value = project.;


            project.getTechnologies().then(tech=>{
                tecnologhies = fillTecno(tech);
            }).then(tech=>{
                template += tecnologhies;
            }).then(tech =>{
                content.innerHTML = template;
            })   
    })
   /* DataService.getAllProjects().then(projects => {
            console.log("Entró al promise");

            var content = document.getElementById("project-view");
            let template = "";

            console.log(projects[0]);

            projects.map(project => {
                

                //let div = 
              /*  let li =
                    `<div class="collection-item avatar">
            <div class="collapsible-header">
                <div class="col s12">
                    <div class="row">
                        <div class="col s2">
                            <img src="${project.img}" alt="" class="resize circle">
                        </div>
                        <div class="col s8">
                            <div>
                                ${project.name} 
                            </div>
                            <div>
                                ${project.client}
                            </div>
                        </div>
                        <div class="col s2 vertical">
                            ${project.state}                           
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
               // template += div;
            })
           //content.innerHTML = template;
        })*/
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
        console.log(project.name);
    }
    return tecnoTemplate;
}