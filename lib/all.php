<?php
include '../vendor/autoload.php';

use Inc\Conf\Conf as DB;
use Inc\Models\StockItemsClass as StockItems;

/**
 *
 * @type {{Written by Shahzaib 11 April,2019}}
 */


$conn = DB::connectMe();

$action = (isset($_GET['action'])) ? $_GET['action'] : die('Nothing to do');
$actions = array();
array_push($actions, array('name' => 'getStockItems', 'action' => 'getStockItems'));
array_push($actions, array('name' => 'addstockItem', 'action' => 'addstockItem'));
array_push($actions, array('name' => 'editstockItem', 'action' => 'editstockItem'));
array_push($actions, array('name' => 'getFilteredStock', 'action' => 'getFilteredStock'));
array_push($actions, array('name' => 'getCostAndSellingPrices', 'action' => 'getCostAndSellingPrices'));
array_push($actions, array('name' => 'getStockDetails', 'action' => 'getStockDetails'));

// Go through the actions list and run the associated functions
foreach ($actions as $act) {
    if ($act['name'] == $action) {
        $functionName = $act['action'] . '();';

        eval($functionName);
    }
}

function getStockItems()
{
    $result = StockItems::getStockItems();
    if ($result) {
        echo json_encode($result);
    }
}

function getFilteredStock()
{
    $data = $_POST['filter'];
    $response = array('success' => false);
    $result = StockItems::getFilteredStock($data);
    if ($result) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
    }
    echo json_encode($result);
}

function addstockItem()
{
    $response = array('success' => false);
    $data = $_POST['data'];
    $result = StockItems::addstockItem($data);
    if ($result) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
    }
    echo json_encode($response);
}

function editstockItem()
{
    $response = array('success' => false);
    $data = $_POST['data'];
    $result = StockItems::editstockItem($data);
    if ($result) {
        $response['success'] = true;
    } else {
        $response['success'] = false;
    }
    echo json_encode($response);
}

function getCostAndSellingPrices()
{
    $response = array('success' => false);
    $CostPrices = StockItems::getCostPrices();
    $response['CostPrices'] = $CostPrices;
    $SellingPrices = StockItems::getSellingPrices();
    $response['SellingPrices'] = $SellingPrices;
    echo json_encode($response);
}

function getStockDetails()
{
    $response = array('success' => false);
    $StockDetails = array(
        '0_list_dept' => 'dp_code',
        '0_list_subd' => 'sd_code',
        '0_list_grup' => 'gr_code',
        '0_list_taxes' => 'tx_id',
        '0_supplier_names' => array('su_id', 'su_desc'),
        '0_list_prices' => array('sp_id', 'sp_desc')
    );

    $StockDetailsModel = StockItems::getStockDetails($StockDetails);

    if ($StockDetails) {
        $response['success'] = true;
        $response['StockDetails'] = $StockDetailsModel;
    }

    echo json_encode($response);
}