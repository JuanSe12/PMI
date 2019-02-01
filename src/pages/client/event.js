'use strict';

function refresh() {
    $('#cardTitle').text('Registrar un cliente');
    $('#name').val("");
    $('#sector-holder').text('Sector');
    $("#typeClient").formSelect();
    $('#typeClient').find("option[value=" + 0 + "]").prop("selected", true);
    $("#typeClient").formSelect();
    $('#sector').find("option[value=" + 0 + "]").prop("selected", true);
    $("#sector").formSelect();
    $('#size').val("");
    $('#nit').val("");
    $('#saveModal').show();
    $('#editModal').hide();
}

function toggleAndEditTitle() {
    $('#saveModal').hide();
    $('#editModal').show();
    $('#cardTitle').empty();
    $('#cardTitle').text('Editar un cliente');
}

function effectView() {
    $(document).ready(function () {
        $('select').formSelect();

        $(".collapsible").hover(function (i) {
            $(".edit-buttom").css("display", "block");
        }, function () {
            $(".edit-buttom").css("display", "none");
        });

        $('.edit-buttom').on("click", function (e) {
            e.stopPropagation();
        })
    });
}

export {
    refresh,
    toggleAndEditTitle,
    effectView
}