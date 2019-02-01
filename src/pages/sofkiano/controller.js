import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"
import DomSave from "./create_sofkiano.js";
import Route from "../../services/route.js"

let controller;


export default controller = {

    fillSofkiano() {
        DataService.getAllSofkianos()
            .then(sofkianos => {

                this.renderSofkianos(sofkianos);
            });

    },


    renderSofkianos(sofkianos) {
        if (sofkianos.length == 0) {
            M.toast({ html: 'No existe un Sofkiano con ese nombre' });
        }
        else {
            let template = "";
            var ul = document.getElementById("sofkianos-list");
            sofkianos.map(async (sofkiano) => {
                let dataProject = await sofkiano.getProjects();
                let dataTech = await sofkiano.getTechnologies();
                let dataSkills = await sofkiano.getTechnologies();
                let tecnologhies = fillTecno(dataTech);
                let skills = fillSkills(dataSkills);
                let projects = fillProjects(dataProject);

                let li = `<li class="collection-item avatar">                        
                            <div class="collapsible-header grow">
                                <div class="row size-row">
                                    <div class="col s10">
                                        <div class="row">
                                            <div class="col s4">
                                                <img src="${Config.baseUrl() + sofkiano.img}" alt="" class="img-size circle"> 
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
                                ${skills}
                            <p>Tecnologías</p>
                                 ${tecnologhies}
                            <p>Proyectos</p> 
                                ${projects}
                            <div class="row">
                                <div class="col s2 offset-s10">
                                    <a id="btn-sofkian-delete-${sofkiano.id}"class="waves-effect waves-light btn red" "><i class="material-icons left">delete</i>Eliminar</a>
                                </div>
                            </div>
                            </form>                
                            </div>
                        </li>`;
                template += li;
            })
            setTimeout(() => {
                ul.innerHTML = template;
                DomSave.saveSofkiano();
                DomDeleteSofkiano(sofkianos);
            }, 180);
        }
    }
}


function fillTecno(sofkiano) {
    let tecnoTemplate = "";
    for (let sofki of sofkiano) {
        let tecnoChips =
            `<div class="chips">                  
            <div class="chip ">                  
                <img src="${sofki.icon}" alt="no disponible"> 
                ${sofki.name}
            </div>
        </div> `;
        tecnoTemplate += tecnoChips;
    }

    return tecnoTemplate;
}

function fillProjects(projects) {
    let tecnoTemplate = "";
    for (let project of projects) {
        let tecnoChips =
            `<div class="chips big-chips">                  
            <div class="chip big-chip">                  
                <img src="${project.img}" alt="no disponible"> 
                ${project.name}  ${project.percent} %
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

function DomDeleteSofkiano(sofkianos) {

    sofkianos.forEach(sofkiano => {
        let btn = document.getElementById(`btn-sofkian-delete-${sofkiano.id}`);
        btn.addEventListener('click', function (event) {
            DataService.delete(sofkiano).then(
                sofkianoDelete => {
                    M.toast(
                        {
                            html: `Se eliminó con exito ${sofkianoDelete.firtsName} ${sofkianoDelete.lastName}!`,
                            outDuration: 300
                        })
                    Route.routeTo('sofkiano');
                }
            )
                .catch(error => prompt('is no delete', error))
        })

    });
}

const validateFieldsForMessage=()=>{
    $("#last_name").blur(function () {
        if ($("#last_name").val() === "") {
           M.toast({ html: 'Ingrese los apellidos' });
        }
     });
    
     $("#number_document").blur(function () {
        if ($("#number_document").val() === "") {
           M.toast({ html: 'Ingrese el documento de identidad' });
        }
     });

     $("#experience_time_sofka").blur(function () {
        if ($("#experience_time_sofka").val() === "") {
           M.toast({ html: 'Ingrese los meses de experiencia en Sofka' });
        }
     });

     $("#external_experience_time").blur(function () {
        if ($("#external_experience_time").val() === "") {
           M.toast({ html: 'Ingrese los meses de experiencia en empresas externas' });
        }
     });

}
setTimeout(() => {
    validateFieldsForMessage();
}, 180);
