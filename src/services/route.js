'use strict';
import Config from "../config/config.js"
import init from "../init.js"

const ID_CONTAINER = 'container';
const ID_MENU_CONTAINER = 'menu';

export default class Route{
    static routeTo(path, params){
        getElementAndRender(path, params,ID_CONTAINER);
    }

    static renderMenu(){
        getElementAndRender('menu',"",ID_MENU_CONTAINER);
    }
}

function getElementAndRender(path,params,idElement=ID_CONTAINER){
    let file = `${Config.baseUrl()}/src/pages/${path}/template.html`
    $(`#${idElement}`).load(file);
    
    try {
        if(path==='view-project'){
            init[`init${path}`](params);
        }
        else if (path==='view-edit-sofkiano') {
            init[`init${path}`](params);
        }
        else
            init[`init${path}`]();
            
    } catch (error) {
        console.log(error);
    }
    
}
