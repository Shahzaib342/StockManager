<?php
include '../vendor/autoload.php';
use Inc\Conf\Conf as DB;
use Inc\Models\StockItemsClass as StockItems;

$conn = DB::connectMe();

$action = (isset($_GET['action'])) ? $_GET['action'] : die('Nothing to do');
$actions = array();
array_push($actions, array('name' => 'getStockItems', 'action' => 'getStockItems'));
array_push($actions, array('name' => 'addstockItem', 'action' => 'addstockItem'));

// Go through the actions list and run the associated functions
foreach ($actions as $act) {
    if ($act['name'] == $action) {
        $functionName = $act['action'] . '();';

        eval($functionName);
    }
}

function getStockItems()
{
    $response = array('success' => false);
    $result = StockItems::getStockItems();
    if ($result) {
        $response['success'] = true;
        echo json_encode($result);
    } else {
        $response['success'] = false;
        echo json_encode($response);

    }
}

function addstockItem()
{
    $response = array('success' => false);
    $data = $_POST['data'];
    $result = StockItems::addstockItem($data);
    if ($result) {
        $response['success'] = true;
        echo json_encode($result);
    } else {
        $response['success'] = false;
        echo json_encode($response);

    }
}