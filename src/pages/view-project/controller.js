import DataService from "../../services/data_service.js";
import Config from "../../config/config.js"

export default function fillProject(project) {


    var TechnologiesContent = document.getElementById("container-tech");
    let sofkianosContent = document.getElementById("project-sofkianos-list");
    let template = "";

    let startDate = project.getDateInit();
    let finishDate = project.getDateFinish();
    let technologies = "";
    let sofkiano = "";
    setTimeout(() => {
        document.getElementById('title-project').innerHTML = project.name;
        
        document.getElementById('input-project-objetive').value = project.description;
        document.getElementById('input-project-start-date').value = startDate;
        document.getElementById('input-project-finish-date').value = finishDate;



    }, 180);

    let nameBusiness = "";
    /*editButton();
    saveButton();
    deleteBusiness();
    coso();*/


    let prueba = document.getElementById('project-business-image');

    project.getClient().then(
        client => {
            //console.log(client[0].name);
            let clientStr = `<img src="${Config.baseUrl() + client[0].img}" alt="" class="resize circle" id="project-business-image">
                    ${client[0].name} <a style="display:none;" href="#" class="view-edit" onclick="" id="delete-icon-business"><i class="material-icons md-36">save</i></a>`
            document.getElementById('business-name').innerHTML = clientStr;
        }
    )

    /*project.getSofkianos().then(
         sofkianos => {
             //console.log(sofkianos);
             sofkiano = fillSofkianos(sofkianos);
             //console.log(sofkiano);
             let addButton = `<li style="display: none" class="list-sofkianos view-edit">
                         <a class="btn-floating center-image"><i class="material-icons ">add</i></a>
                     </li>`;
             sofkianosContent.innerHTML = sofkiano + addButton;
         })*/







    // project.getTechnologies().then(tech => {
    //     technologies = fillTecno(tech);
    //     TechnologiesContent.innerHTML = technologies;
    // })




}

//SIN TERMINAR (NO FUNCIONA EVENTO)

/*function coso (){
        debugger;
        var elems = document.querySelectorAll('.chips');
        var data = [{
            tag: 'Apple',
        }, {
            tag: 'Microsoft',
        }, {
            tag: 'Google',
        }]
        var instances = M.Chips.init(elems, data);

        $('.chips').chips({
            instances.onChipAdd: () => {

        }
    });

    instances.onChipAdd({
        tag: 'chip content',
        image: '', // optional
    }).then(data => {
        debugger;
    })

    
}*/
function deleteBusiness() {

    $(`#delete-icon-business`).click(function (event) {
        console.log("Imagen de la empresa eliminado");

    })
}

function editButton() {
    $(`#editDocument`).click(function (event) {
        document.getElementById("input-project-objetive").disabled = false;
        document.getElementById("input-project-start-date").disabled = false;
        document.getElementById("input-project-finish-date").disabled = false;
        $(".view-edit").css("display", "inline-block");

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
    for (let project of projects) {
        let tecnoChips =
            `<div class="chips">                  
            <div class="chip">                            
                <img src="${project.icon}" alt=""> 
                ${project.name}
                <i style="display:none;" class="close material-icons view-edit" id="delete-icon">close</i>
            </div>
        </div> `;
        tecnoTemplate += tecnoChips;
        //console.log(project.name);
    }
    return tecnoTemplate;
}

function fillSofkianos(sofkiano) {
    let sofkianoTemplate = "";
    for (let sofki of sofkiano) {
        let sofkianoList =
            `<div class="chips">                  
            <div class="chip">                            
                <img src="${Config.baseUrl() + sofki.img}" alt=""> 
                ${sofki.firtsName}
                <i style="display:none;" class="close material-icons view-edit" id="delete-icon">close</i>
            </div>
        </div> `;
        //console.log(sofkianoList);
        sofkianoTemplate += sofkianoList;
    }
    return sofkianoTemplate;
}

/*<li class="collection-item avatar list-sofkianos">
                <img src="${Config.baseUrl() + sofki.img}" alt="" class="circle ">
                <br>
                ${sofki.firtsName}
                <i style="display:none;" class="close material-icons view-edit" id="">close</i>
            </li> */
