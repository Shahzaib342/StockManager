<?php

namespace Inc\Models;

use Inc\Conf\Conf as DB;

/**
 *
 * @type {{Written by Shahzaib 13 April,2019}}
 */
class StockItemsClass
{
    private $conn;

    function getStockItems()
    {
        $query = DB::connectMe()->query('SELECT si.si_id,si.si_code,si.si_desc,ld.dp_desc,lg.gr_desc,ls.sd_desc FROM 0_stock_items si INNER JOIN
                                                  0_list_dept ld on si.dp_code=ld.dp_code INNER JOIN 0_list_grup lg on lg.gr_code=si.gr_code INNER JOIN 
                                                  0_list_subd ls on ls.sd_code=si.sd_code ');
        $users = $row = $query->fetchAll();
        return $users;
    }

    function getFilteredStock($data)
    {
        $query = DB::connectMe()->query("SELECT si.si_code,si.si_desc,ld.dp_desc,lg.gr_desc,ls.sd_desc FROM 0_stock_items si INNER JOIN
                                                  0_list_dept ld on si.dp_code=ld.dp_code and ld.dp_desc = '$data' INNER JOIN 0_list_grup lg on lg.gr_code=si.gr_code INNER JOIN 
                                                  0_list_subd ls on ls.sd_code=si.sd_code");
        $users = $row = $query->fetchAll();
        return $users;
    }

    function addstockItem($data)
    {
        $db = DB::connectMe();
        $stock_details = $data[0];
        $selling_prices = $data[1];
        $supplier_prices = $data[2];

        $StockItems = [
            'si_code' => $stock_details[0]['value'],
            'si_desc' => $stock_details[1]['value'],
            'si_case_size' => $stock_details[2]['value'],
            'si_cost_case' => $stock_details[3]['value'],
            'si_cost_unit' => $stock_details[4]['value'],
            'dp_code' => $stock_details[5]['value'],
            'sd_code' => $stock_details[6]['value'],
            'gr_code' => $stock_details[7]['value'],
            'tx_id' => $stock_details[8]['value'],
        ];

        $sql = "INSERT INTO 0_stock_items (si_code, si_desc,dp_code,sd_code,gr_code,tx_id,si_case_size,si_cost_case,
              si_cost_unit) VALUES (:si_code, :si_desc,:dp_code, :sd_code,:gr_code, :tx_id,:si_case_size, :si_cost_case,
                :si_cost_unit)";
        $stmt = $db->prepare($sql);
        $stmt->execute($StockItems);

        if ($stmt) {

            $lastInserId = $db->lastInsertId();
            foreach($supplier_prices as $key=>$value) {
                $supplier = $value[0]['value'];
                $query = $db->query("SELECT su_id from 0_supplier_names where su_desc = '$supplier'");
                $rows = $row = $query->fetchAll();
                $StockBuy = [
                    'sb_price' => $value[1]['value'],
                    'sb_last_buy' => $value[2]['value'],
                    'supplier_names_id' => $rows[0]['su_id'],
                    'si_id' => $lastInserId
                ];

                $sql = "INSERT INTO 0_stock_buy (su_id,si_id, sb_price,sb_last_buy) VALUES
                    (:supplier_names_id,:si_id, :sb_price,:sb_last_buy)";
                $stmt = $db->prepare($sql);
                $stmt->execute($StockBuy);
                if(!$stmt) {
                    return 'true';
                }
            }

            if ($stmt) {

                foreach($selling_prices as $key=>$value) {
                    $sellingPrice = $value[0]['value'];
                    $query = $db->query("SELECT sp_id from 0_list_prices where sp_desc = '$sellingPrice'");
                    $rows = $row = $query->fetchAll();
                    $StockSell = [
                        'selling_price_id' => $rows[0]['sp_id'],
                        'ss_price' => $value[1]['value'],
                        'ss_markup' => $value[2]['value'],
                        'ss_round' => $value[3]['value'],
                        'si_id' => $lastInserId
                    ];

                    $sql = "INSERT INTO 0_stock_sell (sp_id,si_id, ss_price,ss_markup,ss_round) VALUES
                    (:selling_price_id,:si_id, :ss_price,:ss_markup,:ss_round)";
                    $stmt = $db->prepare($sql);
                    $stmt->execute($StockSell);
                    if (!$stmt) {
                        return 'true';
                    }
                }


                if ($stmt) {
                    return 'true';

                } else {
                    return 'true';
                }

            } else {
                return 'true';
            }

        } else {
            return 'false';
        }
    }


    function editstockItem($data)
    {
        $db = DB::connectMe();
        $stock_details = $data[0];
        $selling_price = $data[1];
        $supplier_price = $data[2];

        $da = [
            'si_code' => $stock_details[0]['value'],
            'dp_desc' => $stock_details[2]['value'],
            'sd_desc' => $stock_details[3]['value'],
            'gr_desc' => $stock_details[4]['value'],
            'si_desc' => $stock_details[1]['value'],
            'tx_id' => $stock_details[5]['value'],
            'si_case_size' => $stock_details[6]['value'],
            'si_cost_case' => $stock_details[7]['value'],
            'si_cost_unit' => $stock_details[8]['value'],
            'si_id' => $stock_details[9]['value']
        ];
        $sql = "UPDATE 0_stock_items 
                SET 0_stock_items.si_desc = :si_desc,
                0_stock_items.si_code = :si_code,
                0_stock_items.dp_code = :dp_desc,
                0_stock_items.sd_code = :sd_desc,
                0_stock_items.gr_code = :gr_desc,
                 0_stock_items.tx_id = :tx_id,
                0_stock_items.si_case_size = :si_case_size,
                0_stock_items.si_cost_case = :si_cost_case,
                0_stock_items.si_cost_unit = :si_cost_unit
                WHERE 0_stock_items.si_id = :si_id";
        $stmt = $db->prepare($sql);
        $stmt->execute($da);
        if ($stmt->errorCode() == 0) {
            foreach($supplier_price as $index=>$value) {
                $sup = [
                    'sb_price' => $value[2]['value'],
                    'sb_last_buy' => $value[3]['value'],
                    'sb_id' => $value[1]['value'],
                ];
                $sql = "UPDATE 0_stock_buy 
                SET 0_stock_buy.sb_price = :sb_price,
                0_stock_buy.sb_last_buy = :sb_last_buy
                WHERE 0_stock_buy.sb_id = :sb_id";
                $stmt = $db->prepare($sql);
                $stmt->execute($sup);
                if ($stmt->errorCode() == 0) {
                }   }

            foreach ($selling_price as $key => $val) {
                $sell = [
                    'ss_price' => $val[2]['value'],
                    'ss_markup' => $val[3]['value'],
                    'ss_round' => $val[4]['value'],
                    'ss_id' => $val[0]['value']
                ];
                $sql = "UPDATE 0_stock_sell 
                SET 0_stock_sell.ss_price = :ss_price,
                0_stock_sell.ss_markup = :ss_markup,
                    0_stock_sell.ss_round = :ss_round
                WHERE 0_stock_sell.ss_id = :ss_id";
                $stmt = $db->prepare($sql);
                $stmt->execute($sell);
                if ($stmt->errorCode() == 0) {

                }    } return 'true';
        } else {
            $errors = $stmt->errorInfo();
            return $errors;
        }
    }

    function getCostPrices()
    {
        $query = DB::connectMe()->query('SELECT sp.su_id,sp.su_desc,sb.sb_id,sb.sb_price,sb.sb_last_buy FROM 0_supplier_names sp INNER JOIN
                                                  0_stock_buy sb on sp.su_id=sb.su_id');
        $users = $row = $query->fetchAll();
        return $users;
    }

    function getSellingPrices()
    {
        $query = DB::connectMe()->query('SELECT sp.sp_id,sp.sp_desc,ss.ss_id,ss.ss_price,ss.ss_markup,ss.ss_round FROM 0_list_prices sp INNER JOIN
                                                  0_stock_sell ss on sp.sp_id=ss.sp_id');
        $users = $row = $query->fetchAll();
        return $users;
    }

    function getStockDetails($StockDetails)
    {
        $StockDetailsArray = array();
        foreach ($StockDetails as $StockItem => $value) {
            if (is_array($value)) {
                foreach ($value as $index => $val) {
                    $query = DB::connectMe()->query("SELECT $val from $StockItem");
                    $rows = $row = $query->fetchAll();
                    $StockDetailsArray[$val] = $rows;
                }
            } else {
                $query = DB::connectMe()->query("SELECT $value from $StockItem");
                $rows = $row = $query->fetchAll();
                $StockDetailsArray[$value] = $rows;
            }
        }

        return $StockDetailsArray;
    }
    function getDataforUpdation($data) {

        $query = DB::connectMe()->query("SELECT sp.si_id,sp.si_desc,sp.si_code,sp.tx_id,sp.dp_code,sp.sd_code,sp.gr_code,sp.si_cost_case,sp.si_case_size,
                                               sp.si_cost_unit,
                                                sb.sb_id,sb.su_id,sb.sb_price,sb.sb_last_buy,
                                                 ss.ss_id,ss.sp_id,ss.ss_price,ss.ss_markup,ss.ss_round,sup.su_desc,pri.sp_desc
                                                 FROM 0_stock_items sp INNER JOIN
                                                  0_stock_buy sb on sp.si_id=sb.si_id and sp.si_id = '$data'
                                                   INNER JOIN 0_stock_sell ss on sp.si_id=ss.si_id and sp.si_id = '$data'
                                                   INNER JOIN 0_supplier_names sup on sup.su_id=sb.su_id 
                                                   INNER JOIN 0_list_prices pri on pri.sp_id=ss.sp_id");
        $rows = $row = $query->fetchAll();
        return $rows;

    }
}



