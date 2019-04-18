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
            stock.getCostAndSellingPrices();
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

stock.getCostAndSellingPrices = function () {

    $.ajax({
        url: "lib/all.php?action=getCostAndSellingPrices",
        type: "get",
        dataType: "json",
        success: function (response) {
            stock.setCostPrices(response.CostPrices);
            stock.setSellingPrices(response.SellingPrices);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });

};

stock.setCostPrices = function (CostPrices) {

    $.each(CostPrices, function (index, value) {

        var CostTable = $('.cost-prices-table');

        var tr = '<tr>';
        tr += '<td>' + value.sb_id + '</td>';
        tr += '<td>' + value.su_desc + '</td>';
        tr += '<td>' + value.sb_price + '</td>';
        tr += '<td>' + value.sb_last_buy + '</td>';
        tr += '</tr>';

        CostTable.find('tbody').append(tr);
    });

};

stock.setSellingPrices = function (SellingPrices) {

    $.each(SellingPrices, function (index, value) {

        var SellingTable = $('.selling-prices-table');

        var tr = '<tr>';
        tr += '<td>' + value.sp_id + '</td>';
        tr += '<td>' + value.sp_desc + '</td>';
        tr += '<td>' + value.ss_price + '</td>';
        tr += '<td>' + value.ss_markup + '</td>';
        tr += '<td>' + value.ss_round + '</td>';
        tr += '</tr>';


        SellingTable.find('tbody').append(tr);
    });

};