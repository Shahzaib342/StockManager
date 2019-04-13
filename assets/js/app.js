/**
 *
 * @type {{Written by Shahzaib 13 April,2019}}
 */
var stock = {

};

$(document).ready(function() {
    $('#stock_items').DataTable({
        "ajax":{
          "url":"../lib/all.php?action=getStockItems",
            "dataSrc":""
        },
        "initComplete":function( settings, json){
            $( "table#stock_items tbody tr td:first-child" ).dblclick(function() {
                var parent = $(this).parent();
                console.log(parent);
                console.log($(parent).find('td'));
                $('#editStockItem').modal('show');
                $($(parent).find('td')).each(function(key,value){
                    $($('#editStockItem input')[key]).val($($(parent).find('td')[key]).text());
                });
            });
        },
        "columns":[
            {"data":"si_code"},
            {"data":"dp_desc"},
            {"data":"sd_desc"},
            {"data":"gr_desc"},
            {"data":"si_desc"}
        ]
    });

});


stock.AddStockItem = function(){
    var data = [];
    $('#addStockItem input').each(function(key,value){
        data.push({
            name: $($('#addStockItem input')[key]).attr('id'),
            value : $($('#addStockItem input')[key]).val()
        });
    });
    console.log(data);
    $.ajax({
        url: "lib/all.php?action=addstockItem",
        type: "post",
        dataType: "json",
        data: {data: data},
        success: function (response) {
          console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            $('#messages').modal('show');
        }
    });
};

stock.EditStockItem = function(){
    alert('hello');
};