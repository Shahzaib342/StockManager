/**
 *
 * @type {{Written by Shahzaib 13 April,2019}}
 */
var stock = {};

$(document).ready(function () {

    $("#sel1").change(function () {
        stock.populateDatatable();
    });

    $('#stock_items').DataTable({
        "ajax": {
            "url": "../lib/all.php?action=getStockItems",
            "dataSrc": ""
        },
        "initComplete": function (settings, json) {
            $("table#stock_items tbody tr td:first-child").dblclick(function () {
                var parent = $(this).parent();
                $('#editStockItem').modal('show');
                $($(parent).find('td')).each(function (key, value) {
                    $($('#editStockItem input')[key]).val($($(parent).find('td')[key]).text());
                });
            });

        },
        "columns": [
            {"data": "si_code"},
            {"data": "dp_desc"},
            {"data": "sd_desc"},
            {"data": "gr_desc"},
            {"data": "si_desc"}
        ]
    });
});


stock.AddStockItem = function () {
    var data = [];
    $('#addStockItem input').each(function (key, value) {
        data.push({
            name: $($('#addStockItem input')[key]).attr('id'),
            value: $($('#addStockItem input')[key]).val()
        });
    });
    $.ajax({
        url: "lib/all.php?action=addstockItem",
        type: "post",
        dataType: "json",
        data: {data: data},
        success: function (response) {
            $('#addStockItem').modal('hide');
            $('#message p').text('New Item is successfullt added');
            $('#message').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            $('#editStockItem').modal('hide');
            $('#message p').text('This item cannot be added, double check the data');
            $('#message').modal('show');
        }
    });
};

stock.EditStockItem = function () {
    var data = [];
    $('#editStockItem input').each(function (key, value) {
        data.push({
            name: $($('#editStockItem input')[key]).attr('id'),
            value: $($('#editStockItem input')[key]).val()
        });
    });
    $.ajax({
        url: "lib/all.php?action=editstockItem",
        type: "post",
        dataType: "json",
        data: {data: data},
        success: function (response) {
            $('#editStockItem').modal('hide');
            $('#message p').text('Item is successfullt updated');
            $('#message').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            $('#editStockItem').modal('hide');
            $('#message p').text('Updation failed due to some error');
            $('#message').modal('show');
        }
    });
};


stock.populateDatatable = function () {
    $('#stock_items').DataTable().destroy();
    $('#stock_items').DataTable({
        "ajax": {
            "url": "../lib/all.php?action=getFilteredStock",
            "dataSrc": "",
            "type": 'POST',
            "data": function (d) {
                var data = [];
                data.push({
                    name: 'filter',
                    value: $('#sel1 option:selected').val()
                });
                return data;
            }
        },
        "initComplete": function (settings, json) {
            $("table#stock_items tbody tr td:first-child").dblclick(function () {
                var parent = $(this).parent();
                $('#editStockItem').modal('show');
                $($(parent).find('td')).each(function (key, value) {
                    $($('#editStockItem input')[key]).val($($(parent).find('td')[key]).text());
                });
            });

        },
        "columns": [
            {"data": "si_code"},
            {"data": "dp_desc"},
            {"data": "sd_desc"},
            {"data": "gr_desc"},
            {"data": "si_desc"}
        ]
    });

};