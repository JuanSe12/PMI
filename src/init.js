


import fillProject from "./pages/view-project/controller.js";
import sofkianoController from "./pages/sofkiano/controller.js";
import DOMsaveSofkiano from "./pages/sofkiano/create_sofkiano.js";
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
    "initview-project": function (value) {
        fillProject(value);
        
    }
});
export default init;