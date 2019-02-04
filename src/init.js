


import fillProject from "./pages/view-project/controller.js";
import sofkianoController from "./pages/sofkiano/controller.js";
import projectController from "./pages/project/controller.js";
import clientController from "./pages/client/clientController.js";
import searchContext from "./pages/head-bar/controller.js";
import createProjectController from "./pages/create-project/controller.js";

let init = {}

Object.setPrototypeOf(init, {
    "initsofkiano": function () {
        setTimeout(function () {
            sofkianoController.fillSofkiano();
            searchContext('sofkiano');
            DOMsaveSofkiano();
        }, 300);
    },
    "initproject": function () {
        setTimeout(function () {
            projectController.fillProjects();
            searchContext('project');
        }, 300);

    },
    "initclient": function () {
        setTimeout(function () {
            clientController.fillClient();
            searchContext('client');
        }, 300)
    },
    "initview-edit-sofkiano": function (value) {
        //fillProject(value);
        //aqui agrego el codigo para que renderize mi formulario de editar
    },
    "initview-project": function (value) {
        setTimeout(() => {
            fillProject(value);             
        }, 300);

    },
    "initcreate-project": function () {
        setTimeout(() => {
            createProjectController();
        }, 300);
    }
});
export default init;