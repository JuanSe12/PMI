'use strict';

function deleteIcon(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view${index}`).click(function (event) {
            $(`#chip-tech${index}`).remove();
            projectEdit.technologies = deleteItem(index, projectEdit.technologies)
            technologiesAvailable.push(index);
        })
    })

}

function deleteIconSofki(index, projects) {
    $(document).ready(function () {
        $(`#icons-delete-view-sofki${index}`).click(function (event) {
            $(`#chip-sofki${index}`).remove();
            projectEdit.sofkianos = deleteItem(index, projectEdit.sofkianos)
            sofkianoDeleteProject.add(index);
            sofkianosAvailable.push(index);
            console.log(sofkianoDeleteProject);
        })
    })

}

export {
    deleteIcon,
    deleteIconSofki
}