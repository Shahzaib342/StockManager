<div class="modal fade" id="addStockItem" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Stock Details</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 stock-first-table">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="code">Code</label>
                            </div>
                            <div class="form-group">
                                <label for="desc">Description</label>
                            </div>
                            <div class="form-group">
                                <label for="department">Department</label>
                            </div>
                            <div class="form-group">
                                <label for="sub_dept">Sub dept</label>
                            </div>
                            <div class="form-group">
                                <label for="group">Group</label>
                            </div>
                            <div class="form-group">
                                <label for="tax">Tax</label>
                            </div>
                            <div class="form-group">
                                <label for="case-size">Case Size</label>
                            </div>
                            <div class="form-group">
                                <label for="bar-code">Cost per Case</label>
                            </div>
                            <div class="form-group">
                                <label for="minimum-stock">Cost per Unit</label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" class="form-control" id="code">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="desc">
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="department"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="sub_dept"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="group"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="tax"></select>
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="case-size">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="cost-per-case">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="cost-per-unit" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">Supplier Price
                                <span onclick="stock.addNewRow();" class="add-row-in-supplier-tab">+</span>
                            </div>
                            <div class="panel-body">
                                <table class="display" id="supplier-price-table" style="width:100%">
                                    <thead>
                                    <tr>
                                        <th>Supplier</th>
                                        <th>Price</th>
                                        <th>Last Bought</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><select class="form-control supplier-names"></select></td>
                                        <td><input type="number" class="form-control supplier-price"></td>
                                        <td><input type="date" class="form-control last-bought"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">Selling Price
                                <span class="auto-markup-selling-price">
                                     <input type="checkbox" class="auto-markup"/> Auto Markup
                                </span>
                            </div>
                            <div class="panel-body">
                                <table class="display" style="width:100%" id="selling-price-table">
                                    <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Markup</th>
                                        <th>Rounding</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><inpu type="text" class="form-control price-description"></td>
                                        <td><input type="number" class="form-control price" ></td>
                                        <td><input type="number" class="form-control markup"  disabled></td>
                                        <td><input type="number" class="form-control rounding"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary add-stock-item" onclick="stock.AddStockItem();">Save
                        changes
                    </button>
                    <button type="button" class="btn btn-close" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</div>


<div class="modal fade" id="editStockItem" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Stock Details</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6 stock-first-table">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="code">Code</label>
                            </div>
                            <div class="form-group">
                                <label for="desc">Description</label>
                            </div>
                            <div class="form-group">
                                <label for="department">Department</label>
                            </div>
                            <div class="form-group">
                                <label for="sub_dept">Sub dept</label>
                            </div>
                            <div class="form-group">
                                <label for="group">Group</label>
                            </div>
                            <div class="form-group">
                                <label for="tax">Tax</label>
                            </div>
                            <div class="form-group">
                                <label for="case-size">Case Size</label>
                            </div>
                            <div class="form-group">
                                <label for="bar-code">Cost per Case</label>
                            </div>
                            <div class="form-group">
                                <label for="minimum-stock">Cost per Unit</label>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="form-group">
                                <input type="text" class="form-control" id="code">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="desc">
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="department"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="sub_dept"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="group"></select>
                            </div>
                            <div class="form-group">
                                <select class="form-control" id="tax"></select>
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="case-size2">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="cost-per-case2">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="cost-per-unit2" disabled>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">Supplier Price
<!--                                <span onclick="stock.addNewRow();" class="add-row-in-supplier-tab">add</span>-->
                            </div>
                            <div class="panel-body">
                                <table class="display" id="supplier-price-table2" style="width:100%">
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Supplier</th>
                                        <th>Price</th>
                                        <th>Last Bought</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><input class="form-control supplier-id"></td>
                                        <td><select class="form-control supplier-names"></select></td>
                                        <td><input type="number" class="form-control supplier-price"></td>
                                        <td><input type="date" class="form-control last-bought"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-heading">Selling Price
                                <span class="auto-markup-selling-price">
                                     <input type="checkbox" class="auto-markup"/> Auto Markup
                                </span>
                            </div>
                            <div class="panel-body">
                                <table class="display" style="width:100%" id="selling-price-table2">
                                    <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Markup</th>
                                        <th>Rounding</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><input type="number" class="form-control price-id"></td>
                                        <td><input type="text" class="form-control price-description"></td>
                                        <td><input type="number" class="form-control price" ></td>
                                        <td><input type="number" class="form-control markup"  disabled></td>
                                        <td><input type="number" class="form-control rounding"></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary add-stock-item" onclick="stock.EditStockItem();">Save
                        changes
                    </button>
                    <button type="button" class="btn btn-close" data-dismiss="modal">Close</button>
                </div>
            </div>

        </div>
    </div>
</div>
<div class="modal fade" id="message" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <p></p>
                <br>
                <div>
                    <ul>
                        <li> Error maybe occur because you leave any field blank? </li>
                        <li> You enter non unique si code or si desc? </li>
                        <li> Date field empty? </li>
                    </ul>
                    </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">ok</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="message2" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-body">
                <p>Item is added successfully</p>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">ok</button>
                </div>
            </div>
        </div>
    </div>
</div>