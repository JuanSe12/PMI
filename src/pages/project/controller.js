import DataService from "../../services/data_service.js";


export default function fillProjects() {
    DataService.getAllProjects()
        .then(projects => {
            console.log("Entró al promise");
            var ul = document.getElementById("business-list");
            let template = "";

            projects.map(project => {
                console.log(project.img);
                
                let li =
                `<li class="collection-item avatar">
                <div class="collapsible-header">
                    <div class="row size-row">
                        <div class=" col s10">
                            <div class="row ">
                                <div class=" col s4">
                                    <img src="${project.img}" alt="NO">
                                </div>
                                <div class=" col s4 ">
                                    <div> <p class="title-client"> ${project.name}<p></div>
                                    <p> Cliente: ${project.client}</p>
                                </div>
                                <div class="col s4 ">
                                    <p>Estado: ${project.state} </p>
                                </div>
                            </div>
                        </div>
                        <div class="col s2">
                           <p> <a class="edit-buttom">  <i class="material-icons">more_horiz</i></a></p>
                      </div>
                    </div>
                </div>
            </li>`;
                template += li;
            })
            ul.innerHTML = template;
        })
}
