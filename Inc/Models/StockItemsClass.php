<?php

namespace Inc\Models;
use Inc\Conf\Conf as DB;

class StockItemsClass
{
    private $conn;

    function getStockItems()
    {
        $query = DB::connectMe()->query(' SELECT si.si_code,si.si_desc,ld.dp_desc,lg.gr_desc,ls.sd_desc FROM 0_stock_items si INNER JOIN 0_list_dept ld on si.dp_code=ld.dp_code INNER JOIN 0_list_grup lg on lg.gr_code=si.gr_code INNER JOIN 0_list_subd ls on ls.sd_code=si.sd_code ');
        $users = $row = $query->fetchAll();
        return $users;
    }

    function addstockItem($data)
    {
        $data = [
            'si_code'=>1,
            'si_desc'=>1,
            'dp_code'=>1,
            'sd_code'=>1,
            'gr_code'=>1,
            'tx_id'=>1,
            'si_case_size'=>1,
            'si_barcode'=>1,
            'si_min_stock'=>1,
            'si_lead_time'=>1,
            'si_on_hand'=>1,
        ];
//        $sql = "INSERT INTO 0_stock_items (si_code, si_desc,dp_code,sd_code,gr_code,tx_id,si_case_size,si_barcode,si_min_stock,
//                si_lead_time,si_on_hand) VALUES (:si_code, :si_desc,:dp_code, :sd_code,:gr_code, :tx_id,:si_case_size, :si_barcode
//                :si_min_stock, :si_lead_time,:si_on_hand)";
//        $stmt = DB::connectMe()->prepare($sql);
//        $stmt->execute($data);
//        if ($stmt) {
//            return 'true';
//        } else {
//            return 'false';
//        }
    }
}
