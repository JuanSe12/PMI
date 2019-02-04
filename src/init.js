

import fillSofkianoEdit from "./pages/view-sofkiano/controller.js";
import fillProject from "./pages/view-project/controller.js";
import sofkianoController from "./pages/sofkiano/controller.js";
import projectController from "./pages/project/controller.js";
import clientController from "./pages/client/client_controller.js";
import searchContext from "./pages/head-bar/controller.js";
import createProjectController from "./pages/create-project/controller.js";

let init = {}

Object.setPrototypeOf(init, {
    
    "initsofkiano": function () {
        setTimeout(function () {
            sofkianoController.fillSofkiano();
            searchContext('sofkiano');
        }, 150);
    },
    "initproject": function () {
        setTimeout(function () {
            projectController.fillProjects();
            searchContext('project');
        }, 150);

    },
    "initclient": function () {
        setTimeout(function () {
            clientController.fillClient();
            searchContext('client');
        }, 150)
    },
    "initview-sofkiano": function (value) {
        fillSofkianoEdit(value);
        //aqui agrego el codigo para que renderize mi formulario de editar
    },
    "initview-project": function (value) {
        setTimeout(() => {
            fillProject(value);             
        }, 150);

    },
    "initcreate-project": function () {
        setTimeout(() => {
            createProjectController();
        }, 150);
    }

    
});
export default init;