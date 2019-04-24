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

        $StockItems = [
            'si_code' => $data[0]['value'],
            'si_desc' => $data[1]['value'],
            'si_case_size' => $data[2]['value'],
            'si_cost_case' => $data[3]['value'],
            'si_cost_unit' => $data[4]['value'],
            'dp_code' => $data[11]['value'],
            'sd_code' => $data[12]['value'],
            'gr_code' => $data[13]['value'],
            'tx_id' => $data[14]['value'],
//            'su_desc' => $data[15]['value'],
//            'sp_desc' => $data[14]['value'],

        ];

        $sql = "INSERT INTO 0_stock_items (si_code, si_desc,dp_code,sd_code,gr_code,tx_id,si_case_size,si_cost_case,
              si_cost_unit) VALUES (:si_code, :si_desc,:dp_code, :sd_code,:gr_code, :tx_id,:si_case_size, :si_cost_case,
                :si_cost_unit)";
        $stmt = $db->prepare($sql);
        $stmt->execute($StockItems);

        if ($stmt) {

            $lastInserId = $db->lastInsertId();

            $StockBuy = [
                'sb_price' => $data[5]['value'],
                'sb_last_buy' => $data[6]['value'],
                'supplier_names_id' => $data[16]['value'],
                'si_id' => $lastInserId
            ];

            $sql = "INSERT INTO 0_stock_buy (su_id,si_id, sb_price,sb_last_buy) VALUES
                    (:supplier_names_id,:si_id, :sb_price,:sb_last_buy)";
            $stmt = $db->prepare($sql);
            $stmt->execute($StockBuy);

            if ($stmt) {

                $StockSell = [
                    'selling_price_id' => $data[18]['value'],
                    'ss_price' => $data[8]['value'],
                    'ss_markup' => $data[9]['value'],
                    'ss_round' => $data[10]['value'],
                    'si_id' => $lastInserId
                ];

                $sql = "INSERT INTO 0_stock_sell (sp_id,si_id, ss_price,ss_markup,ss_round) VALUES
                    (:selling_price_id,:si_id, :ss_price,:ss_markup,:ss_round)";
                $stmt = $db->prepare($sql);
                $stmt->execute($StockSell);

                if ($stmt) {
                    return 'true';

                } else {
                    return 'false';
                }

            } else {
                return 'false';
            }

        } else {
            return 'false';
        }
    }


    function editstockItem($data)
    {
        $data = [
            'si_code' => $data[0]['value'],
            'dp_desc' => $data[1]['value'],
            'sd_desc' => $data[2]['value'],
            'gr_desc' => $data[3]['value'],
            'si_desc' => $data[4]['value'],
        ];
        $sql = "UPDATE 0_stock_items INNER JOIN 0_list_dept ON 0_list_dept.dp_code = 0_stock_items.dp_code
                INNER JOIN 0_list_subd ON 0_stock_items.sd_code = 0_list_subd.sd_code
                INNER JOIN 0_list_grup ON 0_stock_items.gr_code = 0_list_grup.gr_code
                SET 0_stock_items.si_desc = :si_desc,
                0_list_dept.dp_desc = :dp_desc,
                0_list_subd.sd_desc = :sd_desc,
                0_list_grup.gr_desc = :gr_desc
                WHERE 0_stock_items.si_code = :si_code";
        $stmt = DB::connectMe()->prepare($sql);
        $stmt->execute($data);
        if ($stmt->errorCode() == 0) {
            return 'true';
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
}

