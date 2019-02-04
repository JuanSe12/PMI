

import fillSofkianoEdit from "./pages/view-sofkiano/controller.js";
import fillProject from "./pages/view-project/controller.js";
import sofkianoController from "./pages/sofkiano/controller.js";
import projectController from "./pages/project/controller.js";
import clientController from "./pages/client/clientController.js";
import searchContext from "./pages/head-bar/controller.js";

let init = {}

Object.setPrototypeOf(init, {
    "initsofkiano": function () {
        sofkianoController.fillSofkiano();
        searchContext('sofkiano');
    },
    "initproject": function () {
        projectController.fillProjects();
        searchContext('project');
    },
    "initclient": function () {
        clientController.fillClient();
        searchContext('client');
    },
    "initview-sofkiano": function (value) {
        fillSofkianoEdit(value);
        //aqui agrego el codigo para que renderize mi formulario de editar
    },
    "initview-project": function (value) {
        fillProject(value);
        //aqui agrego el codigo para que renderize mi formulario de editar
    }
});
export default init;