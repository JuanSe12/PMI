'use strict';

function validateTypeClientPerson() {
    $('select#typeClient').change(function (e) {
        var select = $("select#typeClient option:checked").val();
        if (select == 1) {
            $("input#size").prop('disabled', true);
            $('#size').attr('placeholder', '1');
        } else {
            $("input#size").prop('disabled', false);
            $('#size').attr('placeholder', 'Tamaño de la empresa');
        }
    });
}

function validateFieldsByMessage() {
    $('select#typeClient').change(function (e) {
        var select = $("select#typeClient option:checked").val();
        if (select == 1) {
            $("input#size").prop('disabled', true);
            $('#size').val(1);
        }

    });
}

function validateFields() {
    debugger;
    return $('#name').val() === "" || $('#nit').val() === "" || $('#size').val() === "" || $("#sector").val() === "" || $("#typeClient").val() === "" ? true : false;
}

export {
    validateTypeClientPerson,
    validateFieldsByMessage,
    validateFields
}