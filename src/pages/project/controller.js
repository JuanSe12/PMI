import DataService from "../../services/data_service.js";
import Config from "../../config/config.js";
import Route from "../../services/route.js";


let controller;


export default controller = {
    fillProjects() {
        DataService.getAllProjects()
            .then(
                projects => {
                    this.renderProject(projects);

                })


    },


    renderProject(projects) {
        var ul = document.getElementById("business-list");
        let template = " ";
        let idList = 0;
        projects.map(async (project) => {
            let state = await project.getState();
            let clients = await project.getClient();
            idList += 1;

            let li =
                `<li class="collection-item avatar">
            <div class="collapsible-header">
                <div class="row size-row">
                    <div class=" col s10">
                        <div class="row ">
                            <div class=" col s4">
                                <img class="img-size circle" src="${Config.baseUrl() + project.img}" alt="NO">
                            </div>
                            <div class=" col s4 ">
                                <div> <p class="title-client">${project.name} <p></div>
                                <p> Cliente:                  
                                ${clients[0].name}
                                </p>
                            </div>
                            <div class="col s4 ">
                                <p>Estado: ${state[0].name} </p>
                            </div>
                        </div>
                    </div>
                    <div class="col s2">
                           <p> <a class="edit-buttom" id="showMore${idList}">  <i class="material-icons">add_circle</i><p>Ver mas</p></a></p>
                      </div>
                </div>
            </li>`;
            template += li;

        })
        setTimeout(function () {
            ul.innerHTML = template;
            let elementAt = 0;

            setTimeout(function () {
                projects.map(project => {
                    elementAt += 1;
                    addEvents(elementAt, project);


                })
            }, 250);


        }, 150);




    }
}

function addEvents(elementAt, project) {

    document.getElementById(`showMore${elementAt}`).addEventListener('click', function () {
        Route.routeTo("view-project", project);
    });
}
