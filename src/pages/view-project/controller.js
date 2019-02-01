import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"

export default async function fillProject() {
    DataService.getProjectByIds([1]).then(
        projects => {
            var TechnologiesContent = document.getElementById("container-tech");
            let sofkianosContent = document.getElementById("project-sofkianos-list");
            let titleProject = document.getElementById('title-project');
            let template = "";
            let project = projects[0];
            sessionStorage.projects = JSON.stringify(project);
            let startDate = project.getDateInit();
            let finishDate = project.getDateFinish();
            let technologies = "";
            let sofkiano = "";
            //console.log(project)
            let nameBusiness = "";
            editButton(project);
            saveButton();
            

            let prueba = document.getElementById('project-business-image');

            project.getClient().then(
                client => {
                    //console.log(client[0].name);
                    let clientStr = `<img src="${Config.baseUrl() + client[0].img}" alt="" class="resize circle" id="project-business-image">
                    ${client[0].name} <a style="display:none;" href="#" class="view-edit" onclick="" id="delete-icon-business"><i class="material-icons md-36">close</i></a>`

                    
                    document.getElementById('business-name').innerHTML = clientStr;
                    deleteBusiness(client);
                }
            )

            project.getSofkianos().then(
                sofkianos => {
                    //console.log(sofkianos);
                    sofkiano = fillSofkianos(sofkianos);
                    //console.log(sofkiano);
                    let addButton = `<li style="display: none" class="list-sofkianos view-edit">
                                <a class="btn-floating center-image"><i class="material-icons ">add</i></a>
                            </li>`;
                    sofkianosContent.innerHTML = sofkiano /*+ addButton*/;
                })



            titleProject.innerText = project.name;
            document.getElementById('input-project-objetive').value = project.description;
            document.getElementById('input-project-start-date').value = startDate;
            document.getElementById('input-project-finish-date').value = finishDate;



            project.getTechnologies().then(tech => {
                technologies = fillTecno(tech);
                TechnologiesContent.innerHTML = technologies;
                document.getElementById('add_tech').addEventListener('click', function () {
                    
                    renderTech(tech);
                });

                document.getElementById('add_technologies').addEventListener('click', function () {
                    let technologiesArray = document.getElementById("div_techs");
                    let checkTechnology = technologiesArray.getElementsByTagName('input');
                    let arrayTechnologiesInput = [];
                    for (var i = 0; i < checkTechnology.length; i++) {
                        if(checkTechnology[i].checked){
                            arrayTechnologiesInput.push(parseInt(checkTechnology[i].value));
                        }
                    }
                    console.log(arrayTechnologiesInput);
                    document.getElementById('modal1').removeAttribute("style");
                    document.getElementsByClassName('modal-overlay')[0].removeAttribute("style");
                    

                });                
            })


            
        })

        var client = await DataService.getAllClients();
        var tech = await DataService.getAllTechnologies();
        var selectTech = document.getElementById('dropTech');


}

//falta
function deleteBusiness(client) {

    $(document).ready(function () {
        $(`#delete-icon-business`).click(function (event) {
            console.log("Imagen de la empresa eliminado");
            $(`#business-name`).remove();
    
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

function renderTech(data){
    let div_tech = document.getElementById("div_techs");
    let techs = "";

    data.forEach((item, index) => {
        index%2 == 0? techs += '<div class="row">': techs += "";
        techs += `<div class="col s6"><label class="mov_check"><input type="checkbox" class="filled-in" name="technology${item.id}" id="technology${item.id}" value=${item.id}><span>${item.name}</span></label></div>`;
        (index+1)%2 == 0 ? techs += '</div>': techs += "";
    });
    div_tech.innerHTML = techs;
}

function deleteIcon(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view${index + 1}`).click(function (event) {
            $(`#chip-tech${index+1}`).remove();            
            projects.splice(index, 1);
            console.log(projects);
        })
    })

}

function deleteIconSofki(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view-sofki${index + 1}`).click(function (event) {
            $(`#chip-sofki${index+1}`).remove();            
            projects.splice(index, 1);
            console.log(projects);
        })
    })

}

function saveButton() {
    $(`#saveDocument`).click(function (event) {

        let objetive = document.getElementById("input-project-objetive").value;
        console.log(objetive);
        // document.getElementById("input-project-start-date").disabled=false; 
        // document.getElementById("input-project-finish-date").disabled=false;

    })
}


function fillTecno(projects) {
    let tecnoTemplate = "";
    for (let index = 0; index < projects.length; index++) {
        let tecno = `<div class="chips-div" id="chip-tech${index + 1}">
        <div class="content-elements">
        <a href=# id="icons-delete-view${index + 1}"><i class="close material-icons icons-delete" >close</i></a>
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
    for (let index=0; index < sofkiano.length; index++) {
        let sofkianoList = `<div class="chips-div" id="chip-sofki${index + 1}">
        <div class="content-elements">
        <a href=# id="icons-delete-view-sofki${index + 1}"><i class="close material-icons icons-delete-sofki" >close</i></a>
        <img src="${Config.baseUrl() + sofkiano[index].img}" alt="">
        </div>
        <p>${sofkiano[index].firtsName}</p>
        </div>`;
        //console.log(sofkianoList);
        sofkianoTemplate += sofkianoList;

        deleteIconSofki(index,sofkiano);
    }
    return sofkianoTemplate;
}

/*<li class="collection-item avatar list-sofkianos">
                <img src="${Config.baseUrl() + sofki.img}" alt="" class="circle ">
                <br>
                ${sofki.firtsName}
                <i style="display:none;" class="close material-icons view-edit" id="">close</i>
            </li> */