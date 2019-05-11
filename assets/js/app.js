/**
 *
 * @type {{Written by Shahzaib 13 April,2019}}
 */
var stock = {
    supplierNames:'',
    SupplierIds:'',
    PricesIds:'',
    editId:'',
    RoundingFlag:false
};

$(document).ready(function () {

    var CostPerCase = $('#cost-per-case');
    var CaseSize = $('#case-size');
    var CostPerUnit = $('#cost-per-unit');
    var CostPerCase2 = $('#cost-per-case2');
    var CaseSize2 = $('#case-size2');
    var CostPerUnit2 = $('#cost-per-unit2');
    var MarkupCheckbox = $('.auto-markup');

    CostPerCase.keyup(function () {
        if (CaseSize.val().length > 0) {
            var CostPerUnitValue = CostPerCase.val() / CaseSize.val();
            CostPerUnit.val(CostPerUnitValue);
            if (MarkupCheckbox.is(':checked')) {
               stock.reCalculateMarkup();
            } else {
               stock.reCalculatePrice();
            }
        }
    });


    CaseSize.keyup(function () {
        if (CostPerCase.val().length > 0) {
            var CostPerUnitValue = CostPerCase.val() / CaseSize.val();
            CostPerUnit.val(CostPerUnitValue);
            if (MarkupCheckbox.is(':checked')) {
                stock.reCalculateMarkup();
            } else {
                stock.reCalculatePrice();
            }
        }
    });

    CostPerCase2.keyup(function () {
        if (CaseSize2.val().length > 0) {
            var CostPerUnitValue = CostPerCase2.val() / CaseSize2.val();
            CostPerUnit2.val(CostPerUnitValue);
            if (MarkupCheckbox.is(':checked')) {
                stock.reCalculateMarkup2();
            } else {
                stock.reCalculatePrice2();
            }
        }
    });


    CaseSize2.keyup(function () {
        if (CostPerCase2.val().length > 0) {
            var CostPerUnitValue = CostPerCase2.val() / CaseSize2.val();
            CostPerUnit2.val(CostPerUnitValue);
            if (MarkupCheckbox.is(':checked')) {
                stock.reCalculateMarkup2();
            } else {
                stock.reCalculatePrice2();
            }
        }
    });



    MarkupCheckbox.click(function () {
        if (!$(this).is(':checked')) {
            $('#selling-price-table tbody tr td:nth-child(3)').each(function (index, value) {
                $(this).find('input').prop('disabled', true);
            });
            $('#selling-price-table tbody tr td:nth-child(2)').each(function (index, value) {
                $(this).find('input').prop('disabled', false);
            });
        } else {
            $('#selling-price-table tbody tr td:nth-child(3)').each(function (index, value) {
                $(this).find('input').prop('disabled', false);
            });
            $('#selling-price-table tbody tr td:nth-child(2)').each(function (index, value) {
                $(this).find('input').prop('disabled', true);
            });

        }

        if (!$(this).is(':checked')) {
            $('#selling-price-table2 tbody tr td:nth-child(4)').each(function (index, value) {
                $(this).find('input').prop('disabled', true);
            });
            $('#selling-price-table2 tbody tr td:nth-child(3)').each(function (index, value) {
                $(this).find('input').prop('disabled', false);
            });
        } else {
            $('#selling-price-table2 tbody tr td:nth-child(4)').each(function (index, value) {
                $(this).find('input').prop('disabled', false);
            });
            $('#selling-price-table2 tbody tr td:nth-child(3)').each(function (index, value) {
                $(this).find('input').prop('disabled', true);
            });

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
                var id = $(this).parent().find('td:nth-child(1)').text();
                stock.editId = id;
                stock.getDataforUpdation(id);
                stock.getStockDetails('edit');
                 $('#editStockItem').modal('show');
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

    var supplier_details = [];
    var supplier_prices = [];
    var selling_price = [];
    $('#addStockItem .stock-first-table input').each(function (key, value) {
        supplier_details.push({
            name: $($('#addStockItem .stock-first-table input')[key]).attr('id'),
            value: $(this).val()
        });
    });
    $('#addStockItem .stock-first-table select').each(function (key, value) {
        supplier_details.push({
            name: $($('#addStockItem .stock-first-table select')[key]).attr('id'),
            value:  $($('#addStockItem select option:selected')[key]).val()
        });
    });

    $('#supplier-price-table tbody tr').each(function(key,value) {

        var supplier_prices_array = [];
        supplier_prices_array.push({
            name: 'supplier_name'+[key],
            value: $(this).find('td option:selected').val()
        });
        supplier_prices_array.push({
            name: 'price'+[key],
            value: $(this).find('td:nth-child(2) input').val()
        });
        supplier_prices_array.push({
            name: 'date-bought'+[key],
            value: $(this).find('td:nth-child(3) input').val()
        });
        supplier_prices.push(supplier_prices_array);

    });

    $('#selling-price-table tbody tr').each(function(key,value) {
        var selling_price_array = [];
        $(this).find('input').each(function(key,value) {

            var name = $(this).attr('class');
            name = name.split(" ");
            name = name[1];

            selling_price_array.push({
                name: name,
                value: $(this).val()
            });
        });

        selling_price.push(selling_price_array);
    });

    supplier_details.push({
        name: 'si_auto_markup',
        value:  $('#addStockItem .auto-markup').prop('checked')
    });

    var data = [supplier_details,selling_price,supplier_prices];

    $.ajax({
        url: "lib/all.php?action=addstockItem",
        type: "post",
        dataType: "json",
        data: {data: data},
        success: function (response) {

            if(response.success == false) {
                $('#addStockItem').modal('hide');
                $('#message p').text('This item cannot be added, double check the data');
                $('#message').modal('show');
            }

            else {
                $('#addStockItem').modal('hide');
                //$('#message2').modal('show');
            }
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

    var supplier_details = [];
    var supplier_prices = [];
    var selling_price = [];
    $('#editStockItem .stock-first-table input').each(function (key, value) {
        supplier_details.push({
            name: $($('#editStockItem .stock-first-table input')[key]).attr('id'),
            value: $(this).val()
        });
    });
    supplier_details.push({
        name: 'id',
        value: parseFloat(stock.editId)
    });
    $('#editStockItem .stock-first-table select').each(function (key, value) {
        supplier_details.push({
            name: $($('#edittockItem .stock-first-table select')[key]).attr('id'),
            value:  $($('#editStockItem select option:selected')[key]).val()
        });
    });

    $('#supplier-price-table2 tbody tr').each(function(key,value) {

        var supplier_prices_array = [];
        supplier_prices_array.push({
            name: 'supplier_name'+[key],
            value: $(this).find('td option:selected').val()
        });
        supplier_prices_array.push({
            name: 'id'+[key],
            value: parseInt($(this).find('td:nth-child(1) input').val())
        });
        supplier_prices_array.push({
            name: 'price'+[key],
            value: $(this).find('td:nth-child(3) input').val()
        });
        supplier_prices_array.push({
            name: 'date-bought'+[key],
            value: $(this).find('td:nth-child(4) input').val()
        });
        supplier_prices.push(supplier_prices_array);

    });

    $('#selling-price-table2 tbody tr').each(function(key,value) {
        var selling_price_array = [];
        $(this).find('input').each(function(key,value) {

            var name = $(this).attr('class');
            name = name.split(" ");
            name = name[1];

            selling_price_array.push({
                name: name,
                value: $(this).val()
            });
        });

        selling_price.push(selling_price_array);
    });

    supplier_details.push({
        name: 'si_auto_markup',
        value:  $('#editStockItem .auto-markup').prop('checked')
    });

    var data = [supplier_details,selling_price,supplier_prices];
    $.ajax({
        url: "lib/all.php?action=editstockItem",
        type: "post",
        dataType: "json",
        data: {data: data},
        success: function (response) {

            if(response.success == false) {
                $('#editStockItem').modal('hide');
                $('#message p').text('Stock details failed to update successfully double check the data');
                $('#message').modal('show');
            }

            else {
                $('#editStockItem').modal('hide');
                //$('#message2 p').text('Stock details updated succesfully');
                //$('#message2').modal('show');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            $('#editStockItem').modal('hide');
            $('#message p').text('Stock details failed to update successfully double check the data');
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
            stock.supplierNames = response.SupplierNames;
            //stock.setCostPrices(response.CostPrices);
            //stock.setSellingPrices(response.SellingPrices);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });

};

stock.setCostPrices = function (CostPrices) {

    $.each(CostPrices, function (index, value) {

        stock.supplierNames = value.su_id;
        var CostTable = $('.cost-prices-table');

        var tr = '<tr>';
        // tr += '<td>' + value.sb_id + '</td>';
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
        // tr += '<td>' + value.sp_id + '</td>';
        tr += '<td>' + value.sp_desc + '</td>';
        tr += '<td>' + value.ss_price + '</td>';
        tr += '<td>' + value.ss_markup + '</td>';
        tr += '<td>' + value.ss_round + '</td>';
        tr += '</tr>';


        SellingTable.find('tbody').append(tr);
    });

};

stock.getStockDetails = function (param) {

    $.ajax({
        url: "lib/all.php?action=getStockDetails",
        type: "get",
        dataType: "json",
        success: function (response) {
            stock.appendToAddModel(response.StockDetails,param);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });

};

stock.appendToAddModel = function (StockDetails,param) {
    $.each(StockDetails, function (index, value) {
        switch (index) {
            case 'dp_code':
                stock.appendDepartmentDesc(value,param);
                break;
            case 'gr_code':
                stock.appendGroupsDesc(value,param);
                break;
            case 'sd_code':
                stock.appendSubDepartmentDesc(value,param);
                break;
            case 'sp_desc':
                stock.appendPricesDesc(value);
                break;
            case 'su_desc':
                stock.appendSupplierNames(value,param);
                stock.supplierNames = value;
                break;
            case 'tx_id':
                stock.appendTaxDesc(value,param);
                break;
            case 'su_id':
                stock.SupplierIds = value;
                break;
            case 'sp_id':
                stock.PricesIds = value;
        }
    });
};

stock.appendDepartmentDesc = function (departments,param,desc) {

    if(param == 'edit') {
        $('#editStockItem #department').empty();
        $.each(departments, function (index, value) {
            $('#editStockItem #department').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        })
    }
    else {
        $('#department').empty();
        $.each(departments, function (index, value) {
            $('#department').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        })
    }
};

stock.appendGroupsDesc = function (groups,param,desc) {
    if(param == 'edit') {
        $('#editStockItem #group').empty();
        $.each(groups, function (index, value) {
            $('#editStockItem #group').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        })
    }
    else {
        $('#group').empty();
        $.each(groups, function (index, value) {
            $('#group').append('<option value="' + value[0] + '">' +  value[1] + '</option>');
        })
    }
};

stock.appendSubDepartmentDesc = function (Subdepartments,param,desc) {

    if(param == 'edit') {
        $('#editStockItem #sub_dept').empty();
        $.each(Subdepartments, function (index, value) {
            $('#editStockItem #sub_dept').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        })
    }
    else {
        $('#sub_dept').empty();
        $.each(Subdepartments, function (index, value) {
            $('#sub_dept').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        })
    }
};

stock.appendPricesDesc = function (prices) {

    var SellingPriceTable = $('#selling-price-table');

    SellingPriceTable.find('tbody').empty();
    $.each(prices, function (index, value) {

        var tr  = '<tr>';
        tr += '<td><input type="text" class="form-control price-description'+ index+'" disabled value="' + value[0]  +'"></td>';
        tr += '<td><input type="number" class="form-control price'+ index+'"></td>';
        tr += '<td><input type="number" class="form-control markup'+index+'" disabled></td>';
        tr += '<td><input type="number" class="form-control rounding'+index+'"></td>';
        tr += '</tr>';
        $('.price'+ index).attr('keyup','stock.priceUpdated();');

        $(document).on( 'keyup', '.price'+ index, function(){
            var $this = $(this);
            stock.CalculatePrice($this);
        } );

        $(document).on( 'keyup', '.rounding'+ index, function(){
            stock.RoundingFlag = false;
        } );

        $(document).on( 'keyup', '.markup'+ index, function(){
            var $this = $(this);
            stock.CalculateMarkup($this);
        } );

        SellingPriceTable.find('tbody').append(tr);
    });

};

stock.priceUpdated =function() {
    var $this = $(this);
    stock.CalculatePrice($this);
};

stock.appendSupplierNames = function (supplierNames,param) {

    if(param == 'edit') {

        $('#editStockItem .supplier-names').empty();
        $.each(supplierNames, function (index, value) {
            $('#editStockItem .supplier-names').append('<option value="' + value[0] + '">' + value[0] + '</option>');
        })
    }
    else {

        $('.supplier-names').empty();
        $.each(supplierNames, function (index, value) {
            $('.supplier-names').append('<option value="' + value[0] + '">' + value[0] + '</option>');
        })
    }
};

stock.appendTaxDesc = function (taxes,param,desc) {

    if(param == 'edit') {
        $('#editStockItem #tax').empty();
        $.each(taxes, function (index, value) {
            $('#editStockItem #tax').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        });
    }
    else {
        $('#tax').empty();
        $.each(taxes, function (index, value) {
            $('#tax').append('<option value="' + value[0] + '">' + value[1] + '</option>');
        });
    }

};

stock.CalculateMarkup = function (param) {
    var CostPerUnit = $('#cost-per-unit');
    var Markup = param;
    var Price = param.parent().parent().find('td:nth-child(2) input');
    var Rounding = param.parent().parent().find('td:nth-child(4) input');

    var TenPercentofCostPerUnit = ((parseFloat(Markup.val()) * parseFloat(CostPerUnit.val())) / 100);
    var TotalPrice =  parseFloat(CostPerUnit.val()) + TenPercentofCostPerUnit;
    Price.val(TotalPrice);

    if(Rounding.val() != '') {
        if(stock.RoundingFlag ==false) {
            var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
            Price.val(price);
            stock.RoundingFlag = true;
        }

    }
    var parts = Price.val().toString().split('.');
    Rounding.val('.' + parts[1]);
};

stock.reCalculateMarkup = function() {
    $('#selling-price-table tbody tr td:nth-child(2) input').each(function (index, value) {
        var CostPerUnit = $('#cost-per-unit');
        var Markup = $(this);
        var Price = $(this).parent().parent().find('td:nth-child(2) input');
        var Rounding = $(this).parent().parent().find('td:nth-child(4) input');

        var TenPercentofCostPerUnit = ((parseFloat(Markup.val()) * parseFloat(CostPerUnit.val())) / 100);
        var TotalPrice =  parseFloat(CostPerUnit.val()) + TenPercentofCostPerUnit;
        Price.val(TotalPrice);

        if (Rounding.val() != '') {
            if (stock.RoundingFlag == false) {
                var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
                Price.val(price);
                stock.RoundingFlag = true;
            }

        }
        var parts = Price.val().toString().split('.');
        Rounding.val('.' + parts[1]);
    });
};

stock.CalculateMarkup2 = function (param) {

    var CostPerUnit = $('#cost-per-unit2');
    var Markup = param;
    var Price = param.parent().parent().find('td:nth-child(3) input');
    var Rounding = param.parent().parent().find('td:nth-child(5) input');

    var TenPercentofCostPerUnit = ((parseFloat(Markup.val()) * parseFloat(CostPerUnit.val())) / 100);
    var TotalPrice =  parseFloat(CostPerUnit.val()) + TenPercentofCostPerUnit;
    Price.val(TotalPrice);

    if(Rounding.val() != '') {
        if(stock.RoundingFlag ==false) {
            var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
            Price.val(price);
            stock.RoundingFlag = true;
        }

    }
    var parts = Price.val().toString().split('.');
    Rounding.val('.' + parts[1]);

};

stock.reCalculateMarkup2 = function() {
    $('#selling-price-table2 tbody tr td:nth-child(4) input').each(function (index, value) {
        var CostPerUnit = $('#cost-per-unit2');
        var Markup = $(this);
        var Price = $(this).parent().parent().find('td:nth-child(3) input');
        var Rounding = $(this).parent().parent().find('td:nth-child(5) input');

        var TenPercentofCostPerUnit = ((parseFloat(Markup.val()) * parseFloat(CostPerUnit.val())) / 100);
        var TotalPrice =  parseFloat(CostPerUnit.val()) + TenPercentofCostPerUnit;
        Price.val(TotalPrice);

        if (Rounding.val() != '') {
            if (stock.RoundingFlag == false) {
                var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
                Price.val(price);
                stock.RoundingFlag = true;
            }

        }
        var parts = Price.val().toString().split('.');
        Rounding.val('.' + parts[1]);
    });
};

stock.CalculatePrice = function (param) {
    var CostPerUnit = $('#cost-per-unit');
    var Markup = param.parent().parent().find('td:nth-child(3) input');
    var Price = param;
    var Rounding = param.parent().parent().find('td:nth-child(4) input');

    var TenPercent = parseFloat(Price.val()) - parseFloat(CostPerUnit.val());
    var TenPercentofMarkup = (parseFloat(TenPercent) * 100) / parseFloat(CostPerUnit.val());
    Markup.val(TenPercentofMarkup);


    if(Rounding.val() != '') {
        if(stock.RoundingFlag ==false) {
            var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
            Price.val(price);
            stock.RoundingFlag = true;
        }

        else {

        }

    }
    var parts = Price.val().toString().split('.');
    Rounding.val('.' + parts[1]);

};

stock.reCalculatePrice = function() {
    $('#selling-price-table tbody tr td:nth-child(2) input, #selling-price-table2 tbody tr td:nth-child(2) input').each(function (index, value) {
        $(this).find('input').prop('disabled', true);
        var param = $(this);
        var CostPerUnit = $('#cost-per-unit');
        var Markup = $(this).parent().parent().find('td:nth-child(3) input');
        var Price = param;
        var Rounding = $(this).parent().parent().find('td:nth-child(4) input');

        var TenPercent = parseFloat(Price.val()) - parseFloat(CostPerUnit.val());
        var TenPercentofMarkup = (parseFloat(TenPercent) * 100) / parseFloat(CostPerUnit.val());
        Markup.val(TenPercentofMarkup);


        if(Rounding.val() != '') {
            if(stock.RoundingFlag ==false) {
                var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
                Price.val(price);
                stock.RoundingFlag = true;
            }

            else {

            }

        }
        var parts = Price.val().toString().split('.');
        Rounding.val('.' + parts[1]);
    });


};

stock.CalculatePrice2 = function (param) {

    var CostPerUnit = $('#cost-per-unit2');
    var Markup = param.parent().parent().find('td:nth-child(4) input');
    var Price = param;
    var Rounding = param.parent().parent().find('td:nth-child(5) input');

    var TenPercent = parseFloat(Price.val()) - parseFloat(CostPerUnit.val());
    var TenPercentofMarkup = (parseFloat(TenPercent) * 100) / parseFloat(CostPerUnit.val());
    Markup.val(TenPercentofMarkup);

    if(Rounding.val() != '') {
        if(stock.RoundingFlag ==false) {
            var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
            Price.val(price);
            stock.RoundingFlag = true;
        }

    }
    var parts = Price.val().toString().split('.');
    Rounding.val('.' + parts[1]);
};

stock.reCalculatePrice2 = function() {
    $('#selling-price-table2 tbody tr td:nth-child(3) input').each(function (index, value) {
        var CostPerUnit = $('#cost-per-unit2');
        var Markup = $(this).parent().parent().find('td:nth-child(4) input');
        var Price = $(this);
        var Rounding = $(this).parent().parent().find('td:nth-child(5) input');

        var TenPercent = parseFloat(Price.val()) - parseFloat(CostPerUnit.val());
        var TenPercentofMarkup = (parseFloat(TenPercent) * 100) / parseFloat(CostPerUnit.val());
        Markup.val(TenPercentofMarkup);

        if (Rounding.val() != '') {
            if (stock.RoundingFlag == false) {
                var price = (parseFloat(Price.val()) + parseFloat(Rounding.val()));
                Price.val(price);
                stock.RoundingFlag = true;
            }

        }
        var parts = Price.val().toString().split('.');
        Rounding.val('.' + parts[1]);
    });
};


stock.addNewRow = function() {

    var supplier_table = $('#supplier-price-table');

    var len = $('#supplier-price-table tbody tr').length;
    var tr  = '<tr>';
        tr += '<td><select class="form-control supplier-names'+ len+'"></select></td>';
        tr += '<td><input type="number" class="form-control supplier-price'+ len+'"></td>';
        tr += '<td><input type="date" class="form-control last-bought'+len+'"></td>';
        tr += '</tr>';

        supplier_table.find('tbody').append(tr);
    $('.supplier-names'+ len).empty();
    $.each(stock.supplierNames, function (index, value) {
        $('.supplier-names'+ len).append('<option value="' + value['su_desc'] + '">' + value['su_desc'] + '</option>');
    })

};

stock.addNewRowInUpdateModel = function() {

    var supplier_table = $('#supplier-price-table2');

    var len = $('#supplier-price-table2 tbody tr').length;
    var tr  = '<tr class="new-supplier-rows">';
    tr += '<td></td>';
    tr += '<td><select class="form-control supplier-names'+ len+'"></select></td>';
    tr += '<td><input type="number" class="form-control supplier-price'+ len+'"></td>';
    tr += '<td><input type="date" class="form-control last-bought'+len+'"></td>';
    tr += '</tr>';

    supplier_table.find('tbody').append(tr);
    $('.supplier-names'+ len).empty();
    $.each(stock.supplierNames, function (index, value) {
        $('.supplier-names'+ len).append('<option value="' + value['su_desc'] + '">' + value['su_desc'] + '</option>');
    })

};


stock .getDataforUpdation = function(id) {
    $.ajax({
        url: "lib/all.php?action=getDataforUpdation",
        type: "get",
        data:{name:'id',value:id},
        dataType: "json",
        success: function (response) {
            stock.appendToUpdateModel(response.data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
};

stock.appendToUpdateModel = function(details) {
   var supplier_price = [];
   var stock_price = [];
   $('#editStockItem #code').val(details[0].si_code);
    $('#editStockItem #desc').val(details[0].si_desc);
    $('#editStockItem #department').val(details[0].dp_code);
    $('#editStockItem #sub_dept').val(details[0].sd_code);
    $('#editStockItem #group').val(details[0].gr_code);
    $('#editStockItem #tax').val(details[0].tx_id);
    $('#editStockItem #case-size2').val(details[0].si_case_size);
    $('#editStockItem #cost-per-case2').val(details[0].si_cost_case);
    $('#editStockItem #cost-per-unit2').val(details[0].si_cost_unit);

    if(details[0].si_auto_markup == '1') {
        setTimeout(function(){
            $('.auto-markup').trigger('click');
        },1000);

    }


       var SellingPriceTable = $('#editStockItem #selling-price-table2');
    var supplier_table = $('#supplier-price-table2');

       SellingPriceTable.find('tbody').empty();
    supplier_table.find('tbody').empty();
    $.each(details,function(index,value){

        if((jQuery.inArray(value.sp_id, supplier_price) == -1)) {
            supplier_price.push(value.sp_id);
            var tr = '<tr>';
            tr += '<td><input type="number" class="form-control price-id' + len + '" value="' + value.ss_id + '"></td>';
            tr += '<td><input type="text" class="form-control price-description' + index + '" disabled value="' + value[20] + '"></td>';
            tr += '<td><input type="number" class="form-control price' + index + '" value="' + value.ss_price + '"></td>';
            tr += '<td><input type="number" class="form-control markup' + index + '" disabled value="' + value.ss_markup + '"></td>';
            tr += '<td><input type="number" class="form-control rounding' + index + '" value="' + value.ss_round + '"></td>';
            tr += '</tr>';
            $('.price' + index).attr('keyup', 'stock.priceUpdated();');
//change keydown keyup paste input keypress
            $(document).on('keyup', '.price' + index, function () {
                var $this = $(this);
                stock.CalculatePrice2($this);
            });

            $(document).on('keyup', '.rounding' + index, function () {
                stock.RoundingFlag = false;
            });

            $(document).on('keyup', '.markup' + index, function () {
                var $this = $(this);
                stock.CalculateMarkup2($this);
            });
            SellingPriceTable.find('tbody').append(tr);
        }

        if((jQuery.inArray(value.sb_id, stock_price) == -1)) {

             stock_price.push(value.sb_id);


            var len = $('#supplier-price-table2 tbody tr').length;
            var tr = '<tr>';
            tr += '<td><input type="number" class="form-control supplier-id' + len + '" value="' + value.sb_id + '"></td>';
            tr += '<td><select class="form-control supplier-names' + len + '">';
            $.each(stock.supplierNames, function (index, val) {
                tr += '<option value="' + val['su_desc'] + '">' + val['su_desc'] + '</option>';
                //$('#editStockItem .supplier-names').append('<option value="' + value[0] + '">' + value[0] + '</option>');
            });
            //tr += '<option value="' + value.su_desc + '" selected>' + value.su_desc + '</option>';
            tr += '</select></td>';
            //<option value="' + value.su_desc + '">' + value.su_desc + '</option></select></td>';
            tr += '<td><input type="number" class="form-control supplier-price' + len + '" value="' + value.sb_price + '"></td>';
            tr += '<td><input type="date" class="form-control last-bought' + len + '" value="' + value.sb_last_buy + '"></td>';
            tr += '</tr>';


            supplier_table.find('tbody').append(tr);

        }


       });
};