

import fillSofkiano from "./pages/sofkiano/controller.js";
import fillProjects from "./pages/project/controller.js";

//import fillClients from "./pages/client/clientController.js";
let init = {}

Object.setPrototypeOf(init, {
    "initsofkiano": function () {
        fillSofkiano();
    },
    "initproject": function () {
        fillProjects();
    }
});
export default init;