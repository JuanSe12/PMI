import DataService from "../../services/data_service.js";

DataService.getAllProjects()
    .then(projects => {
        console.log("Entró al promise");
        var ul = document.getElementById("business-list");
        let template = "";

        projects.map(project => {
            let li =
                `<li class="collection-item avatar">
            <div class="collapsible-header">
                <div class="col s12">
                    <div class="row">
                        <div class="col s2">
                            <img src="${project.img}" alt="" class="resize circle">
                        </div>
                        <div class="col s8">
                            <div>
                                <h4>${project.name} </h4>
                            </div>
                            <div>
                                ${project.client.name}
                            </div>
                        </div>
                        <div class="col s2 vertical">
                            <i>${project.state}</i>                           
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
            template += li;
        })
        ul.innerHTML = template;
    })
