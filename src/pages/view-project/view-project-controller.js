//import DataService from "../../services/data_service.js"
//import Config from "../../config/config.js"

console.log("hol");


/*export default function fillProjectView() {
    DataService.getAllProjects()
    .then(projects => {
        let template = "";
        var content = document.getElementById("project-view");
        projects.map(project => {
            console.log(project.name);
            console.log("entre");
            
            
/*
            let tecnologhies = "";
            let skills = "";

            sofkiano.getTechnologies()
                .then(
                    data => {
                        tecnologhies = fillTecno(data);
                    })
                .then(data => {
                    sofkiano.getFeatures().then(data => {
                        console.log(sofkiano);
                        skills = fillSkills(data);
                    })
                        .then(data => {
                            let li =
                                `<li class="collection-item avatar">
                    <div class="collapsible-header "><img src="${Config.baseUrl()}/src/assets/images/person.png" 
                    alt="" class="resize circle "> ${sofkiano.firtsName} ${sofkiano.lastName}</div>
                   
                    <div class="collapsible-body ">               
                    <form class="col s12">
                      <div class="row">
                        <div class="input-field col s6">
                          <input disabled placeholder=${sofkiano.documentType} id="first_name" type="text" class="validate">
                          <label for="first_name" class="active">Document type</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled placeholder=" ${sofkiano.documentNumber}" id="" type="text" class="validate">
                        <label for="first_name" class="active">Document number</label>
                        </div>      
                      </div>           
                      <p>Personal characteristics</p>
                      `+ skills + `
                      <p>Technologies</p>
                        `+ tecnologhies + `
                      <div class="row">
                        <div class="input-field col s6">
                          <input disabled placeholder=${sofkiano.internalExperience} id="" type="text" class="validate">
                          <label for="first_name" class="active">Time experience in Sofka</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled placeholder=" ${sofkiano.externalExperience}" id="" type="text" class="validate">
                        <label for="first_name" class="active">External time experience </label>
                        </div>      
                      </div>  
                    </form>                
                    </div>
                </li>`;
                            template += li;

                        })
                        .then(data => {

                            content.innerHTML = template;
                        })
                })
                .catch(() => {
                    throw new Error('Somenthing Wrong');
                })

        })

    })
}*/




/*function fillTecno(sofkiano) {
    let tecnoTemplate = "";
    for (let sofki of sofkiano) {
        let tecnoChips =
            `<div class="chips">                  
            <div class="chip">                  
                <img src="${sofki.icon}" alt="no disponible"> 
                ${sofki.name}
            </div>
        </div> `;
        tecnoTemplate += tecnoChips;
    }

    return tecnoTemplate;
}*/