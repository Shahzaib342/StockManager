<?php
namespace Inc\Conf;
use PDO;
class Conf
{

    function connectMe()
    {
        $serverName = "localhost";
        $username = "root";
        $password = "alihassan342";
        $db = "StockItems";
        try {
            $conn = new PDO("mysql:host=$serverName;dbname=$db", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (PDOException $e) {
            return "Connection failed: " . $e->getMessage();
        }
    }

}