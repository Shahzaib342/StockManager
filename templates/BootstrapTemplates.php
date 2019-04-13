<div class="modal fade" id="addStockItem" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Add new item</h4>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="code">Code</label>
                            <input type="text" class="form-control" id="code">
                        </div>
                        <div class="form-group">
                            <label for="desc">Description</label>
                            <input type="text" class="form-control" id="desc">
                        </div>
                        <div class="form-group">
                            <label for="department">Department</label>
                            <input type="text" class="form-control" id="department">
                        </div>
                        <div class="form-group">
                            <label for="sub_dept">Sub dept</label>
                            <input type="text" class="form-control" id="sub_dept">
                        </div>
                        <div class="form-group">
                            <label for="group">Group</label>
                            <input type="text" class="form-control" id="group">
                        </div>
                        <div class="form-group">
                            <label for="tax">Tax</label>
                            <input type="number" class="form-control" id="tax">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="case-size">Case Size</label>
                            <input type="number" class="form-control" id="case-size">
                        </div>
                        <div class="form-group">
                            <label for="bar-code">Bar Code</label>
                            <input type="number" class="form-control" id="bar-code">
                        </div>
                        <div class="form-group">
                            <label for="minimum-stock">Minimum Stock</label>
                            <input type="number" class="form-control" id="minimum-stock">
                        </div>
                        <div class="form-group">
                            <label for="lead-time">Lead Time</label>
                            <input type="number" class="form-control" id="lead-time">
                        </div>
                        <div class="form-group">
                            <label for="on-hand">On Hand</label>
                            <input type="number" class="form-control" id="on-hand">
                        </div>
                        <button type="submit" class="btn btn-primary add-stock-item" onclick="stock.AddStockItem();">
                            Submit
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
