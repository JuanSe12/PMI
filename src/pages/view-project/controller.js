import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"
import { save } from "./saveData.js";
import Project from "../../model/project.js";


let technologiesAvailable = []
let sofkianosAvailable = [];
let projectEdit = new Project();

function deleteItem(id, array){
    array.forEach((item,index) => {
        if(item === id){
            array.splice(index,1);
        }
    });
    return array;
}

export default async function fillProject(project) {

    projectEdit = project;
    var TechnologiesContent = "";
    let sofkianosContent = "";
    let titleProject = "";
    let template = "";
    let startDate = "";
    let finishDate = "";
    let technologies = "";
    let sofkiano = "";
    let prueba = "";
    //console.log(project)
    let nameBusiness = "";
     //saveButton();
    //save();

    DataService.getAllSofkianos().then(
        sofkianos => {
            sofkianos.forEach(sofkiano =>{
                sofkianosAvailable.push(sofkiano.id);
            })
            projectEdit.sofkianos.forEach(idSofkiano => {
                sofkianosAvailable = deleteItem(idSofkiano,sofkianosAvailable)
            });
        }
    )


    debugger;
    DataService.getAllTechnologies().then(
        technologies => {
            technologies.forEach(technology =>{
                technologiesAvailable.push(technology.id);
            })
            
            projectEdit.technologies.forEach(idTechnology => {
                technologiesAvailable = deleteItem(idTechnology,technologiesAvailable)
            });
        }
    )

    ///////Client

    var client = await project.getClient();


    //console.log(client[0].name);
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
        let arraySofkiInput = [];
        for (var i = 0; i < checkSofkiano.length; i++) {
            if (checkSofkiano[i].checked) {
                sofkianosAvailable = deleteItem(parseInt(checkSofkiano[i].value), sofkianosAvailable)
                projectEdit.sofkianos.push(parseInt(checkSofkiano[i].value))
            }
        }

        DataService.getSofkianoByIds(projectEdit.sofkianos).then(
            sofkiano => {
                sofkianosContent.innerHTML = fillSofkianos(sofkiano);
            }
        )
        setTimeout(function(){
            $('.icons-delete-sofki').css("display","block");
        },300)

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
        setTimeout(function(){
            $('.icons-delete').css("display","block");
        },300)

    });







    var sessionClient = await DataService.getAllClients();
    var sessionTech = await DataService.getAllTechnologies();
    var sessionSofki = await DataService.getAllSofkianos();
    editButton(project);
    save();
    sessionStorage.tec = JSON.stringify(sessionTech);
    sessionStorage.clients = JSON.stringify(sessionClient);
    sessionStorage.sofki = JSON.stringify(sessionSofki);

    prueba = document.getElementById('project-business-image');
    startDate = project.getDateInit();
    finishDate = project.getDateFinish();
    titleProject = document.getElementById('title-project');
    titleProject.innerHTML = project.name;
    document.getElementById('input-project-objetive').value = project.description;
    document.getElementById('input-project-start-date').value = startDate;
    document.getElementById('input-project-finish-date').value = finishDate;
    // console.log(sessionTech);
    //var selectTech = document.getElementById('dropTech');


}

//falta
function deleteBusiness(client) {

    $(document).ready(function () {
        $(`#delete-icon-business`).click(function (event) {
            console.log("Imagen de la empresa eliminado");
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

function renderSofkianos(data) {
    let div_SofkiModal = document.getElementById("div_SofkiModal");
    let sofkiano = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? sofkiano += '<div class="row">' : sofkiano += "";
        sofkiano += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.firtsName}</span></label></div>`;
        (index + 1) % 2 == 0 ? sofkiano += '</div>' : sofkiano += "";
    });
    div_SofkiModal.innerHTML = sofkiano;
}

function renderTech(data) {
    let div_tech = document.getElementById("div_techs");
    let techs = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? techs += '<div class="row">' : techs += "";
        techs += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index + 1) % 2 == 0 ? techs += '</div>' : techs += "";
    });
    div_tech.innerHTML = techs;
}

function renderClient(data) {
    let div_clientModal = document.getElementById("div_clientModal");
    let client = "";

    data.forEach((item, index) => {

        index % 2 == 0 ? client += '<div class="row">' : client += "";
        client += `<div class="col s6"><label class="mov_check"><input type="radio" class="filled-in" name="clientModal" id="clientModal${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index + 1) % 2 == 0 ? client += '</div>' : client += "";
    });
    div_clientModal.innerHTML = client;
}

function deleteIcon(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view${index}`).click(function (event) {
            $(`#chip-tech${index}`).remove();
            projectEdit.technologies = deleteItem(index, projectEdit.technologies)
            technologiesAvailable.push(index);
            //console.log(projectEdit);
        })
    })

}

function deleteIconSofki(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view-sofki${index}`).click(function (event) {
            $(`#chip-sofki${index}`).remove();
            projectEdit.sofkianos = deleteItem(index, projectEdit.sofkianos)
            sofkianosAvailable.push(index)
            //console.log(projects);
        })
    })

}

function fillTecno(technologies) {
    let tecnoTemplate = "";
    for (let index = 0; index < technologies.length; index++) {
        let tecno = 
        `<div class="chips-div" id="chip-tech${technologies[index].id}">
            <div class="content-elements">
            <a href=# id="icons-delete-view${technologies[index].id}"><i class="close material-icons icons-delete" >close</i></a>
            <img src="${Config.baseUrl() + technologies[index].icon}" alt="">
            </div>
            <p>${technologies[index].name}</p>
        </div>`;
        tecnoTemplate += tecno;
        //debugger;
        deleteIcon(technologies[index].id, technologies);

    }
    return tecnoTemplate;
}

function fillSofkianos(sofkiano) {
    let sofkianoTemplate = "";
    for (let index = 0; index < sofkiano.length; index++) {
        let sofkianoList = `<div class="chips-div" id="chip-sofki${sofkiano[index].id}">
        <div class="content-elements">
        <a href=# id="icons-delete-view-sofki${sofkiano[index].id}"><i class="close material-icons icons-delete-sofki" >close</i></a>
        <img src="${Config.baseUrl() + sofkiano[index].img}" alt="">
        </div>
        <p>${sofkiano[index].firtsName}</p>
        </div>`;
        //console.log(sofkianoList);
        sofkianoTemplate += sofkianoList;

        deleteIconSofki(sofkiano[index].id, sofkiano);
    }
    return sofkianoTemplate;
}