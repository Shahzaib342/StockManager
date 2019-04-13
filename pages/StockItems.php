<div class="container">
    <div class="panel panel-primary">
        <div class="panel-heading">Stock Items
            <button type="button" class="btn btn-info btn-sm add-stock-item" data-toggle="modal"
                    data-target="#addStockItem">Add item
            </button>
            <select class="form-control" id="sel1">
                <option>Beers</option>
                <option>Spirits</option>
                <option>Ciders</option>
            </select>
        </div>
        <div class="panel-body">
            <table id="stock_items" class="display" style="width:100%">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Dept</th>
                    <th>Sub Dept</th>
                    <th>Group</th>
                    <th>Desc</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th>Code</th>
                    <th>Dept</th>
                    <th>Sub Dept</th>
                    <th>Group</th>
                    <th>Desc</th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>

