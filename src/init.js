

import sofkianoController from "./pages/sofkiano/controller.js";
import projectController from "./pages/project/controller.js";
import clientController from "./pages/client/clientController.js";
import context from "./pages/head-bar/controller.js";

//import fillClients from "./pages/client/clientController.js";
let init = {}

Object.setPrototypeOf(init, {
    "initsofkiano": function () {
        sofkianoController.fillSofkiano();
        context('sofkiano');
    },
    "initproject": function () {
        projectController.fillProjects();
        context('project');
    },
    "initclient": function () {
        clientController.fillClient();
        context('client');
    }
});
export default init;