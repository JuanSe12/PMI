import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"
import { save } from "./saveData.js";

export default async function fillProject(project) {

    var TechnologiesContent = document.getElementById("container-tech");
    
    let titleProject = document.getElementById('title-project');
    let startDate = project.getDateInit();
    let finishDate = project.getDateFinish();
    let technologies = "";
    let sofkiano = "";
    //console.log(project)
    let nameBusiness = "";
    editButton(project);
    //saveButton();
    // save();
    

    


    let prueba = document.getElementById('project-business-image');

    var client = await project.getClient();
    console.log(client);
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






    var sofkianos= await project.getSofkianos();
     setTimeout(() => {
        console.log(sofkianos);
        sofkiano = fillSofkianos(sofkianos);
                //console.log(sofkiano);
                sofkianosContent.innerHTML = sofkiano;
                document.getElementById('add_modal_sofkiano').addEventListener('click', function () {
    
                    let sessionSofki = JSON.parse(sessionStorage.sofki);
                    let modalSofki = [];
    
                    for (let i = 0; i < sessionSofki.length; i++) {
                        let exist = false;
                        for (let j = 0; j < sofkianos.length; j++) {
                            if (sessionSofki[i].id != sofkianos[j].id) {
                                exist = true;
                            } else {
                                exist = false;
                                break;
                            }
                        }
                        if (exist != false) {
                            modalSofki.push(sessionSofki[i]);
                        }
                    }
                    renderSofkianos(modalSofki);
    
                });
    
                document.getElementById('add_sofki').addEventListener('click', function () {
                    let sofkiArray = document.getElementById("div_SofkiModal");
                    let checkTechnology = sofkiArray.getElementsByTagName('input');
                    let arraySofkiInput = [];
                    for (var i = 0; i < checkTechnology.length; i++) {
                        if (checkTechnology[i].checked) {
                            arraySofkiInput.push(parseInt(checkTechnology[i].value));
                        }
                    }
                    //debugger;
                    console.log(arraySofkiInput);
                    let sessionSofki = JSON.parse(sessionStorage.sofki);
                    let projectSofki = [];
    
                    for (let index = 0; index < arraySofkiInput.length; index++) {
    
                        projectSofki.push(sessionSofki[arraySofkiInput[index] - 1]);
    
                    }
                    let newElement = fillSofkianos(projectSofki);
                    let contentNew = $("#project-sofkianos-list").html();
                    sofkianosContent.innerHTML = contentNew + newElement;
                    document.getElementById('modalSofkiano').removeAttribute("style");
                    document.getElementsByClassName('modal-overlay')[0].removeAttribute("style");
    
                });
         
     }, 200);   
    
       



    titleProject.innerText = project.name;
    document.getElementById('input-project-objetive').value = project.description;
    document.getElementById('input-project-start-date').value = startDate;
    document.getElementById('input-project-finish-date').value = finishDate;



    project.getTechnologies().then(tech => {
        technologies = fillTecno(tech);
        TechnologiesContent.innerHTML = technologies;
        document.getElementById('add_tech').addEventListener('click', function () {
            let sessionTech = JSON.parse(sessionStorage.tec);
            let modalTech = [];

            for (let i = 0; i < sessionTech.length; i++) {
                let exist = false;
                for (let j = 0; j < tech.length; j++) {
                    if (sessionTech[i].id != tech[j].id) {
                        exist = true;
                    } else {
                        exist = false;
                        break;
                    }
                }
                if (exist != false) {
                    modalTech.push(sessionTech[i]);
                }
            }
            renderTech(modalTech);
        });

        document.getElementById('add_technologies').addEventListener('click', function () {
            let technologiesArray = document.getElementById("div_techs");
            let checkTechnology = technologiesArray.getElementsByTagName('input');
            let arrayTechnologiesInput = [];
            for (var i = 0; i < checkTechnology.length; i++) {
                if (checkTechnology[i].checked) {
                    arrayTechnologiesInput.push(parseInt(checkTechnology[i].value));
                }
            }
            console.log(arrayTechnologiesInput);
            let sessionTech = JSON.parse(sessionStorage.tec);
            let projectTech = [];

            for (let index = 0; index < arrayTechnologiesInput.length; index++) {

                projectTech.push(sessionTech[arrayTechnologiesInput[index] - 1]);

            }
            let newElement = fillTecno(projectTech);
            let contentNew = $("#container-tech").html();

            TechnologiesContent.innerHTML = contentNew + newElement;
            document.getElementById('modal1').removeAttribute("style");
            document.getElementsByClassName('modal-overlay')[0].removeAttribute("style");

        });
    })







    var sessionClient = await DataService.getAllClients();
    var sessionTech = await DataService.getAllTechnologies();
    var sessionSofki = await DataService.getAllSofkianos();

    sessionStorage.tec = JSON.stringify(sessionTech);
    sessionStorage.clients = JSON.stringify(sessionClient);
    sessionStorage.sofki = JSON.stringify(sessionSofki);
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
        $(`#icons-delete-view${index + 1}`).click(function (event) {
            $(`#chip-tech${index + 1}`).remove();
            projects.splice(index, 1);
            console.log(projects);
        })
    })

}

function deleteIconSofki(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view-sofki${index + 1}`).click(function (event) {
            $(`#chip-sofki${index + 1}`).remove();
            projects.splice(index, 1);
            console.log(projects);
        })
    })

}

function fillTecno(projects) {
    let tecnoTemplate = "";
    for (let index = 0; index < projects.length; index++) {
        let tecno = `<div class="chips-div" id="chip-tech${projects[index].id}">
        <div class="content-elements">
        <a href=# id="icons-delete-view${projects[index].id}"><i class="close material-icons icons-delete" >close</i></a>
        <img src="${Config.baseUrl() + projects[index].icon}" alt="">
        </div>
        <p>${projects[index].name}</p>
    </div>`;
        tecnoTemplate += tecno;
        //debugger;
        deleteIcon(index, projects);

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

        deleteIconSofki(index, sofkiano);
    }
    return sofkianoTemplate;
}

/*<li class="collection-item avatar list-sofkianos">
                <img src="${Config.baseUrl() + sofki.img}" alt="" class="circle ">
                <br>
                ${sofki.firtsName}
                <i style="display:none;" class="close material-icons view-edit" id="">close</i>
            </li> */