import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"
//import { save } from "./saveData.js";
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

export default async function createProject() {

    //projectEdit = project;
    var TechnologiesContent = "";
    let sofkianosContent = "";

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

    //FIXXX
    var client = await project.getClient();

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

        let li = document.createElement("li");
        document.getElementById('content-Business').appendChild(li);
        $(li).addClass("collection-item avatar");
        $(li).attr("id", "business-name");

        document.getElementById('modalClient').removeAttribute("style");
        document.getElementsByClassName('modal-overlay')[0].removeAttribute("style");

    });
    //////////////Sofkianos
    sofkianosContent = document.getElementById("project-sofkianos-list");
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

    TechnologiesContent = document.getElementById("container-tech")
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
    editButton(project);
    //----------------------------------------
   // save();
    sessionStorage.clients = JSON.stringify(sessionClient);

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