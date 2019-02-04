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
    return $('#name').val() === "" || $('#nit').val() === "" || $('#size').val() === "" || $("#sector").val() === "" || $("#typeClient").val() === "" ? true : false;
}

function fillFieldsValidation() {
    $("#name").blur(function () {
  if ($("#name").val() === "") {
     M.toast({ html: 'Ingrese el nombre' });
  }
});

  $("#size").blur(function () {
     if ($("#size").val() === "") {
        M.toast({ html: 'Ingrese el tamaño de la empresa' });
     }
  });

  $("#nit").blur(function () {
     if ($("#nit").val() === "") {
        M.toast({ html: 'Ingrese el nit' });
     }
  });
   
 };



export {
    validateTypeClientPerson,
    validateFieldsByMessage,
    validateFields,
    fillFieldsValidation
}