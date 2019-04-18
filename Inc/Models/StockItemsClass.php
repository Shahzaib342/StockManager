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
        $query = DB::connectMe()->query('SELECT si.si_code,si.si_desc,ld.dp_desc,lg.gr_desc,ls.sd_desc FROM 0_stock_items si INNER JOIN
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
        $data = [
            'si_code' => $data[0]['value'],
            'si_desc' => $data[1]['value'],
            'dp_code' => $data[2]['value'],
            'sd_code' => $data[3]['value'],
            'gr_code' => $data[4]['value'],
            'tx_id' => $data[5]['value'],
            'si_case_size' => $data[6]['value'],
            'si_barcode' => $data[7]['value'],
            'si_min_stock' => $data[8]['value'],
            'si_lead_time' => $data[9]['value'],
            'si_on_hand' => $data[10]['value'],
        ];
        $sql = "INSERT INTO 0_stock_items (si_code, si_desc,dp_code,sd_code,gr_code,tx_id,si_case_size,si_barcode,si_min_stock,
                si_lead_time,si_on_hand) VALUES (:si_code, :si_desc,:dp_code, :sd_code,:gr_code, :tx_id,:si_case_size, :si_barcode,
                :si_min_stock, :si_lead_time,:si_on_hand)";
        $stmt = DB::connectMe()->prepare($sql);
        $stmt->execute($data);
        if ($stmt) {
            return 'true';
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
}

