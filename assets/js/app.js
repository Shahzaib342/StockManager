/**
 *
 * @type {{Written by Shahzaib 13 April,2019}}
 */
var stock = {};

$(document).ready(function () {

    var CostPerCase = $('#cost-per-case');
    var CaseSize = $('#case-size');
    var CostPerUnit = $('#cost-per-unit');
    var MarkupCheckbox = $('.auto-markup');
    var Markup = $('#markup');
    var Price = $('#price');
    var Rounding = $('#rounding');

    CostPerCase.keyup(function () {
        if (CaseSize.val().length > 0) {
            var CostPerUnitValue = CostPerCase.val() / CaseSize.val();
            CostPerUnit.val(CostPerUnitValue);
            if (MarkupCheckbox.is(':checked')) {
                stock.CalculateMarkup();
            } else {
                stock.CalculatePrice();
            }
        }
    });


    CaseSize.keyup(function () {
        if (CostPerCase.val().length > 0) {
            var CostPerUnitValue = CostPerCase.val() / CaseSize.val();
            CostPerUnit.val(CostPerUnitValue);
            if (MarkupCheckbox.is(':checked')) {
                stock.CalculateMarkup();
            } else {
                stock.CalculatePrice();
            }
        }
    });

    Price.keyup(function () {
        stock.CalculatePrice();
    });


    Markup.keyup(function () {
        stock.CalculateMarkup();
    });

    MarkupCheckbox.click(function () {
        if (!$(this).is(':checked')) {
            Markup.prop('disabled', true);
            Price.prop('disabled', false);
        } else {
            Markup.prop('disabled', false);
            Price.prop('disabled', true);

        }
    });

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
            $("table#stock_items tbody tr td:nth-child(2)").dblclick(function () {
                var parent = $(this).parent();
                $('#editStockItem').modal('show');
                $($(parent).find('td')).each(function (key, value) {
                    $($('#editStockItem input')[key]).val($($(parent).find('td')[key]).text());
                });
            });

        },
        "columns": [
            {"data": "si_id"},
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
    $('#addStockItem select').each(function (key, value) {
        data.push({
            name: $($('#addStockItem select')[key]).attr('id'),
            value: $($('#addStockItem select option:selected')[key]).val()
        });

        if ($($('#addStockItem select')[key]).attr('id') == 'price-description') {
            data.push({
                name: 'selling_price_id',
                value: ($("#price-description").prop('selectedIndex') + 1)
            });
        }

        if ($($('#addStockItem select')[key]).attr('id') == 'supplier-names') {
            data.push({
                name: 'supplier_names_id',
                value: ($("#supplier-names").prop('selectedIndex') + 1)
            });
        }
    });
    console.log(data);
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
            {"data": "si_id"},
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

stock.getStockDetails = function () {

    $.ajax({
        url: "lib/all.php?action=getStockDetails",
        type: "get",
        dataType: "json",
        success: function (response) {
            stock.appendToAddModel(response.StockDetails);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });

};

stock.appendToAddModel = function (StockDetails) {
    console.log(StockDetails);
    $.each(StockDetails, function (index, value) {
        switch (index) {
            case 'dp_code':
                stock.appendDepartmentDesc(value);
                break;
            case 'gr_code':
                stock.appendGroupsDesc(value);
                break;
            case 'sd_code':
                stock.appendSubDepartmentDesc(value);
                break;
            case 'sp_desc':
                stock.appendPricesDesc(value);
                break;
            case 'su_desc':
                stock.appendSupplierNames(value);
                break;
            case 'tx_id':
                stock.appendTaxDesc(value);
                break;
        }
    });
};

stock.appendDepartmentDesc = function (departments) {
    $('#department').empty();
    $.each(departments, function (index, value) {
        $('#department').append('<option value="' + value[0] + '">' + value[0] + '</option>');
    })
};

stock.appendGroupsDesc = function (groups) {
    $('#group').empty();
    $.each(groups, function (index, value) {
        $('#group').append('<option value="' + value[0] + '">' + value[0] + '</option>');
    })
};

stock.appendSubDepartmentDesc = function (Subdepartments) {
    $('#sub_dept').empty();
    $.each(Subdepartments, function (index, value) {
        $('#sub_dept').append('<option value="' + value[0] + '">' + value[0] + '</option>');
    })
};

stock.appendPricesDesc = function (prices) {
    $('#price-description').empty();
    $.each(prices, function (index, value) {
        $('#price-description').append('<option value="' + value[0] + '">' + value[0] + '</option>');
    })
};

stock.appendSupplierNames = function (supplierNames) {
    $('#supplier-names').empty();
    $.each(supplierNames, function (index, value) {
        $('#supplier-names').append('<option value="' + value[0] + '">' + value[0] + '</option>');
    })
};

stock.appendTaxDesc = function (taxes) {
    $('#tax').empty();
    $.each(taxes, function (index, value) {
        $('#tax').append('<option value="' + value[0] + '">' + value[0] + '</option>');
    })
};

stock.CalculateMarkup = function () {

    var CostPerUnit = $('#cost-per-unit');
    var Markup = $('#markup');
    var Price = $('#price');
    var Rounding = $('#rounding');

    var TenPercentofCostPerUnit = (parseInt(Markup.val()) / 100) * parseInt(CostPerUnit.val());
    var TotalPrice = TenPercentofCostPerUnit + parseInt(CostPerUnit.val());
    Price.val(TotalPrice);

    var parts = TotalPrice.toString().split('.');
    Rounding.val('.' + parts[1]);
};

stock.CalculatePrice = function () {

    var CostPerUnit = $('#cost-per-unit');
    var Markup = $('#markup');
    var Price = $('#price');
    var Rounding = $('#rounding');

    var TenPercent = parseInt(Price.val()) - parseInt(CostPerUnit.val());
    var TenPercentofMarkup = (parseInt(TenPercent) / 100) * parseInt(CostPerUnit.val());
    Markup.val(TenPercentofMarkup);

    var parts = TenPercentofMarkup.toString().split('.');
    Rounding.val('.' + parts[1]);
};
