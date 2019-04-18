<div class="modal fade" id="addStockItem" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Stock Details</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
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
                                <label for="bar-code">Bar Code</label>
                            </div>
                            <div class="form-group">
                                <label for="minimum-stock">Minimum Stock</label>
                            </div>
                            <div class="form-group">
                                <label for="lead-time">Lead Time</label>
                            </div>
                            <div class="form-group">
                                <label for="on-hand">On Hand</label>
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
                                <input type="text" class="form-control" id="department">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="sub_dept">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="group">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="tax">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="case-size">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="bar-code">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="minimum-stock">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="lead-time">
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" id="on-hand">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">Supplier Price
                            </div>
                            <div class="panel-body">
                                <table class="display" style="width:100%">
                                    <thead>
                                    <tr>
                                        <th>Supplier</th>
                                        <th>Price</th>
                                        <th>Last Bought</th>
                                    </tr>
                                    </thead>
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
                                <table class="display" style="width:100%">
                                    <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Markup</th>
                                        <th>Rounding</th>
                                    </tr>
                                    </thead>
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
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Update Item</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="code">Code</label>
                            <input type="text" class="form-control" id="code">
                        </div>
                        <div class="form-group">
                            <label for="dept">Dept</label>
                            <input type="text" class="form-control" id="dept">
                        </div>
                        <div class="form-group">
                            <label for="seb-dept">Sub dept</label>
                            <input type="text" class="form-control" id="sub-dept">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="Group">Group</label>
                            <input type="text" class="form-control" id="Group">
                        </div>
                        <div class="form-group">
                            <label for="Des">Des</label>
                            <input type="text" class="form-control" id="Des">
                        </div>
                        <button type="submit" class="btn btn-primary add-stock-item" onclick="stock.EditStockItem();">
                            Update
                        </button>
                    </div>
                </div
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
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
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal">ok</button>
                </div>
            </div>
        </div>
    </div>
</div>
