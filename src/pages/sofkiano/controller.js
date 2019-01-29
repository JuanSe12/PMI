import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"


export default function fillSofkiano() {
    DataService.getAllSofkianos()
        .then(sofkianos => {
            let template = "";
            var ul = document.getElementById("sofkianos-list");
            sofkianos.map(async (sofkiano) => {
                let dataTech = await sofkiano.getTechnologies();
                let dataSkills = await sofkiano.getTechnologies();
                let tecnologhies = fillTecno(dataTech);
                let skills = fillSkills(dataSkills);

                let li = `<li class="collection-item avatar">
                                                      
                    <div class="collapsible-header ">
                        <div class="row size-row">
                            <div class="col s10">
                                <div class="row">
                                    <div class="col s4">
                                        <img src="${Config.baseUrl()+sofkiano.img}" alt="" class="img-size circle"> 
                                    </div>
                                    <div class="col s6">
                                         <p class="title-sofkiano">${sofkiano.firtsName} ${sofkiano.lastName}</p>
                                    </div>
                                </div>
                               
                            </div>
                            <div class="col s2">
                            <a class="edit-buttom" id="editButtom"><i class="material-icons">edit</i></i></a>
                            </div>    
                        </div>
                   </div>
                    <div class="collapsible-body ">               
                    <form class="col s12">
                      <div class="row">
                        <div class="input-field col s6">
                          <input disabled placeholder=${sofkiano.documentType} id="first_name" type="text" class="validate">
                          <label for="first_name" class="active">Tipo de documento</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled placeholder=" ${sofkiano.documentNumber}" id="" type="text" class="validate">
                        <label for="first_name" class="active">Número de documento</label>
                        </div>      
                      </div>           
                     
                      <div class="row">
                        <div class="input-field col s6">
                          <input disabled placeholder=${sofkiano.internalExperience} id="" type="text" class="validate">
                          <label for="first_name" class="active">Tiempo de experiencia en Sofka</label>
                        </div>
                        <div class="input-field col s6">
                        <input disabled placeholder=" ${sofkiano.externalExperience}" id="" type="text" class="validate">
                        <label for="first_name" class="active">Tiempo de experiencia externa</label>
                        </div>      
                      </div>
                      <p>Características personales</p>
                      `+ skills + `
                      <p>Tecnologías</p>
                        `+ tecnologhies + `  
                    </form>                
                    </div>
                </li>`;
                template += li;
            })
            setTimeout(function () {
                ul.innerHTML = template;
            }, 150);
        });
}



function fillTecno(sofkiano) {
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
}


function fillSkills(sofkiano) {
    let skillTemplate = "";

    for (let sofki of sofkiano) {

        let skillChips =
            `<div class="chips">                  
                <div class="chip">                                         
                    ${sofki.name}
                </div>
            </div> `;
        skillTemplate += skillChips;

    }

    return skillTemplate;
}