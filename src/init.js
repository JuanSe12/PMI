

import sofkianoController from "./pages/sofkiano/controller.js";
import projectController from "./pages/project/controller.js";
import clientController from "./pages/client/clientController.js";
import searchContext from "./pages/head-bar/controller.js";

//import fillClients from "./pages/client/clientController.js";
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
    }
});
export default init;