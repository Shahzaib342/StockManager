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
<div class="container">
    <div class="panel panel-primary">
        <div class="panel-heading"></div>
        <div class="panel-body">
            <div class="col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">Cost Prices</div>
                    <div class="panel-body">
                        <table style="width:100%" class="cost-prices-table">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>Supplier</th>
                                <th>Price</th>
                                <th>Last Purchase</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">Selling Prices</div>
                    <div class="panel-body">
                        <table style="width:100%" class="selling-prices-table">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>Pricelist</th>
                                <th>Price</th>
                                <th>Markup</th>
                                <th>Rounding</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

