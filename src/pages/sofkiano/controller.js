import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"
import DomSave from "./create_sofkiano.js";
import Route from "../../services/route.js";
import {validateFieldsForMessage, validateFields} from "../../pages/sofkiano/validations.js";

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
            let idSofkList = 0;
            let template = "";
            var ul = document.getElementById("sofkianos-list");
            sofkianos.map(async (sofkiano) => {
               
                idSofkList += 1;
                let dataProject = await sofkiano.getProjects();
                console.log(dataProject);
                let dataTech = await sofkiano.getTechnologies();
                let dataSkills = await sofkiano.getFeatures();
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
                                    <a class="edit-buttom" id="edit-sofkiano${sofkiano.id}" onclick=""><i class="material-icons">edit</i></i></a>
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
                                    <a id="btn-sofkian-delete-${sofkiano.id}"class="waves-effect waves-light btn red"><i class="material-icons left">delete</i>Eliminar</a>
                                </div>
                            </div>
                            </form>                
                        </div>
                        </li>`;
                template += li;
            })
            setTimeout(function(){
                ul.innerHTML = template;

                setTimeout(function(){
                    sofkianos.map(sofkiano => {
                        addEvents(sofkiano.id, sofkiano);
                    })
                }, 250);
                DomSave.saveSofkiano();
                validateFieldsForMessage();
                DomDeleteSofkiano(sofkianos);
            }, 180);
        }
    }

    
}

function addEvents(sofkian_id, sofkiano) {
    let buttonEdit = document.getElementById(`edit-sofkiano${sofkian_id}`);
    buttonEdit.addEventListener('click', function () {
        Route.routeTo("view-sofkiano", sofkiano);
    });
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
                    setTimeout(function(){
                        let element = document.getElementById('sofkianos_titulo');
                        element.style.cssText = 'margin-top: -4% !important; position: fixed;color:white;';
                    }, 100);
                }
            ).catch(error => prompt('is no delete', error))
        })

    });
}

