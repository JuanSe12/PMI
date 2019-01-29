

import fillSofkiano from "./pages/sofkiano/controller.js";
import fillProjects from "./pages/project/controller.js";
import fillClient from "./pages/client/clientController.js";
import fillProject from "./pages/view-project/controller.js";

//import fillClients from "./pages/client/clientController.js";
let init = {}

Object.setPrototypeOf(init, {
    "initsofkiano": function () {
        fillSofkiano();
    },
    "initproject": function () {
        fillProjects();
    },
    "initclient": function () {
        fillClient();
    },
    "initview-proyect": function (value) {
        fillProject(value);
    }
});
export default init;