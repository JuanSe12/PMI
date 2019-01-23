const ID_CONTAINER = 'container';
const ID_MENU_CONTAINER = 'menu';

class Route{
    static routeTo(path){
        render(path);
    }
}

function getElementAndRender(path, idElement=ID_CONTAINER){
    $(`#${idElement}`).load("./src/pages/menu/template.html");
}