'use strict';

import DataService from '../../services/data_service.js';
import Config from '../../config/config.js';
import { save } from './save_data.js';
import Project from '../../model/project.js';
import { renderSofkianos, renderClient, renderTech } from './render_components.js';
import { fillSofkianos, fillTecno } from './fill_components.js';

let technologiesAvailable = []
let sofkianosAvailable = [];
let sofkianoDeleteProject = new Set();
let projectEdit = new Project();

function deleteItem(id, array) {
    array.forEach((item, index) => {
        if (item === id) {
            array.splice(index, 1);
        }
    });
    return array;
}

export default async function fillProject(project) {

    var TechnologiesContent = "";
    let sofkianosContent = "";
    let titleProject = "";
    let startDate = "";
    let finishDate = "";
    let technologies = "";
    let sofkiano = "";
    let clientImg = "";

    sofkianoDeleteProject = new Set();
    sofkianosAvailable = [];
    technologiesAvailable = [];
    projectEdit = project;

    DataService.getAvailableSofkianosProject().then(
        sofkianos => {
            sofkianos.forEach(sofkiano => {
                sofkianosAvailable.push(sofkiano.id);
            })
            projectEdit.sofkianos.forEach(idSofkiano => {
                sofkianosAvailable = deleteItem(idSofkiano, sofkianosAvailable)
            });
        }
    )

    DataService.getAllTechnologies().then(
        technologies => {
            technologies.forEach(technology => {
                technologiesAvailable.push(technology.id);
            })

            projectEdit.technologies.forEach(idTechnology => {
                technologiesAvailable = deleteItem(idTechnology, technologiesAvailable)
            });
        }
    )

    ///////Client

    var client = await project.getClient();

    let clientStr = `<img src="${Config.baseUrl() + client[0].img}" alt="" class="resize circle" id="project-business-image${client[0].id}">
                    ${client[0].name} <a style="display:none;" href="#" class="view-edit" onclick="" id="delete-icon-business"><i class="material-icons md-36">close</i></a>`


    document.getElementById('business-name').innerHTML = clientStr;
    deleteBusiness(client);


    document.getElementById('add_modal_client').addEventListener('click', function () {

        if (document.getElementById("business-name") != null) {

            alert("No se puede tener más de un cliente");

        } else {
            let sessionClient = JSON.parse(sessionStorage.clients);
            renderClient(sessionClient);
        }

    });

    document.getElementById('add_client').addEventListener('click', function () {
        let sofkiArray = document.getElementById("div_clientModal");
        let checkClient = sofkiArray.getElementsByTagName('input');
        let arrayClientInput = [];
        for (var i = 0; i < checkClient.length; i++) {
            if (checkClient[i].checked) {
                arrayClientInput.push(parseInt(checkClient[i].value));
            }
        }

        let sessionClient = JSON.parse(sessionStorage.clients)[arrayClientInput[0] - 1];

        let newClient = `<img src="${Config.baseUrl() + sessionClient.img}" alt="" class="resize circle" id="project-business-image${sessionClient.id}">
                        
                        ${sessionClient.name} <a style="display:none;" href="#" class="view-edit" onclick="" id="delete-icon-business"><i class="material-icons md-36">close</i></a>`

        let li = document.createElement("li");
        document.getElementById('content-Business').appendChild(li);
        $(li).addClass("collection-item avatar");
        $(li).attr("id", "business-name");

        document.getElementById('business-name').innerHTML = newClient;

        document.getElementById('modalClient').removeAttribute("style");
        document.getElementsByClassName('modal-overlay')[0].removeAttribute("style");

    });


    //////////////Sofkianos
    var sofkianos = await project.getSofkianos();
    sofkiano = fillSofkianos(sofkianos);
    sofkianosContent = document.getElementById("project-sofkianos-list");
    sofkianosContent.innerHTML = sofkiano;
    document.getElementById('add_modal_sofkiano').addEventListener('click', function () {
        DataService.getSofkianoByIds(sofkianosAvailable).then(
            sofkianos => {
                renderSofkianos(sofkianos);
            })
    });

    
    document.getElementById('add_sofki').addEventListener('click', function () {
        let sofkiArray = document.getElementById("div_SofkiModal");
        let checkSofkiano = sofkiArray.getElementsByTagName('input');
        for (var i = 0; i < checkSofkiano.length; i++) {
            if (checkSofkiano[i].checked) {
                sofkianosAvailable = deleteItem(parseInt(checkSofkiano[i].value), sofkianosAvailable)
                projectEdit.sofkianos.push(parseInt(checkSofkiano[i].value))
                sofkianoDeleteProject = new Set(deleteItem(parseInt(checkSofkiano[i].value),
                    Array.from(sofkianoDeleteProject)));
            }
        }


        DataService.getSofkianoByIds(projectEdit.sofkianos).then(
            sofkiano => {
                sofkianosContent.innerHTML = fillSofkianos(sofkiano);
            }
        )
        setTimeout(function () {
            $('.icons-delete-sofki').css("display", "block");
        }, 300)

    });

    //////////////// Technologies

    var tech = await project.getTechnologies();
    technologies = fillTecno(tech);
    TechnologiesContent = document.getElementById("container-tech")
    TechnologiesContent.innerHTML = technologies;
    document.getElementById('add_tech').addEventListener('click', function () {
        DataService.getTechnologiesByIds(technologiesAvailable).then(
            technologies => {
                renderTech(technologies);
            }
        )

    });

    document.getElementById('add_technologies').addEventListener('click', function () {
        let technologiesArray = document.getElementById("div_techs");
        let checkTechnology = technologiesArray.getElementsByTagName('input');
        let arrayTechnologiesInput = [];

        for (var i = 0; i < checkTechnology.length; i++) {
            if (checkTechnology[i].checked) {
                technologiesAvailable = deleteItem(parseInt(checkTechnology[i].value), technologiesAvailable)
                projectEdit.technologies.push(parseInt(checkTechnology[i].value))
            }
        }

        DataService.getTechnologiesByIds(projectEdit.technologies).then(
            technologies => {
                TechnologiesContent.innerHTML = fillTecno(technologies);
            }
        )
        setTimeout(function () {
            $('.icons-delete').css("display", "block");
        }, 300)

    });


    var sessionClient = await DataService.getAllClients();
    var sessionTech = await DataService.getAllTechnologies();
    var sessionSofki = await DataService.getAllSofkianos();
    editButton(project);


    sessionStorage.tec = JSON.stringify(sessionTech);
    sessionStorage.clients = JSON.stringify(sessionClient);
    sessionStorage.sofki = JSON.stringify(sessionSofki);

    clientImg = document.getElementById('project-business-image');
    startDate = project.getDateInit();
    finishDate = project.getDateFinish();
    titleProject = document.getElementById('title-project');
    titleProject.innerHTML = project.name;
    document.getElementById('input-project-objetive').value = project.description;
    document.getElementById('input-project-start-date').value = startDate;
    document.getElementById('input-project-finish-date').value = finishDate;


    document.getElementById('saveDocument').addEventListener('click', function () {
        save(projectEdit, Array.from(sofkianoDeleteProject));
    });

}

function deleteBusiness(client) {

    $(document).ready(function () {
        $(`#delete-icon-business`).click(function (event) {
            $(`#business-name`).remove();
            $(`#modalClient`).removeClass("classTemp");
            $(`#modalClient`).addClass("modal modal-fixed-footer");
            M.AutoInit();

        })
    })
}

function editButton(project) {
    $(`#editDocument`).click(function (event) {
        document.getElementById("input-project-objetive").disabled = false;
        document.getElementById("input-project-start-date").disabled = false;
        document.getElementById("input-project-finish-date").disabled = false;
        $(".view-edit").css("display", "inline-block");
        $(".icons-delete").css("display", "block");
        $(".icons-delete-sofki").css("display", "block");
        //cambiar etiqueta titulo
        document.getElementById("content-title-project").innerHTML = `<input class="title" id="title-project"></input>`;
        document.getElementById('title-project').value = project.name;
    })
}