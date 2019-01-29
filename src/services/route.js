'use strict';
import Config from "../config/config.js"
import init from "../init.js"

const ID_CONTAINER = 'container';
const ID_MENU_CONTAINER = 'menu';

export default class Route{
    static routeTo(path,some){
        console.log(some);
        getElementAndRender(path,some);
    }

    static renderMenu(){
        getElementAndRender('menu',ID_MENU_CONTAINER,"");
    }
}

function getElementAndRender(path, idElement=ID_CONTAINER,some){
    let file = `${Config.baseUrl()}/src/pages/${path}/template.html`
    $(`#${idElement}`).load(file);
    
    try {
        if(path==='view-project'){
            
            init[`init${path}`](some);
        }
        else
            init[`init${path}`]();
    } catch (error) {
        console.log(error);
    }
    
}
