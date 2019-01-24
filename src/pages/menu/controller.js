const path = './src/pages/menu/template.html';

function initialRender(){
    $('#menu').load(path);
    DataService.loadClientType();
};