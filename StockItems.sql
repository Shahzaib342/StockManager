-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 03, 2019 at 06:43 PM
-- Server version: 5.7.26-0ubuntu0.16.04.1
-- PHP Version: 7.0.33-8+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `StockItems`
--

-- --------------------------------------------------------

--
-- Table structure for table `0_list_dept`
--

CREATE TABLE `0_list_dept` (
  `dp_code` varchar(5) NOT NULL,
  `dp_desc` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_list_dept`
--

INSERT INTO `0_list_dept` (`dp_code`, `dp_desc`) VALUES
('BEE', 'Beers'),
('CHA', 'Champagnes'),
('CID', 'Ciders'),
('COL', 'Colddrinks'),
('COO', 'Coolers'),
('JUI', 'Juices'),
('LIQ', 'Liqueurs'),
('PRE', 'Premixes'),
('SPI', 'Spirits'),
('WAT', 'Waters'),
('WIN', 'Wines'),
('EMP', 'Empties'),
('CRA', 'Crates');

-- --------------------------------------------------------

--
-- Table structure for table `0_list_grup`
--

CREATE TABLE `0_list_grup` (
  `gr_code` varchar(5) NOT NULL,
  `gr_desc` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_list_grup`
--

INSERT INTO `0_list_grup` (`gr_code`, `gr_desc`) VALUES
('SAB', 'SAB'),
('VOD', 'Vodka'),
('RED', 'Red Wine');

-- --------------------------------------------------------

--
-- Table structure for table `0_list_prices`
--

CREATE TABLE `0_list_prices` (
  `sp_id` int(11) NOT NULL,
  `sp_desc` varchar(55) NOT NULL,
  `sp_sort` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_list_prices`
--

INSERT INTO `0_list_prices` (`sp_id`, `sp_desc`, `sp_sort`) VALUES
(1, 'Retail', 2),
(2, 'Wholesale', 1),
(3, 'Outside Sales', 3);

-- --------------------------------------------------------

--
-- Table structure for table `0_list_roundup`
--

CREATE TABLE `0_list_roundup` (
  `ru_id` int(11) NOT NULL,
  `ru_deci` int(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `0_list_subd`
--

CREATE TABLE `0_list_subd` (
  `sd_code` varchar(5) NOT NULL,
  `sd_desc` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_list_subd`
--

INSERT INTO `0_list_subd` (`sd_code`, `sd_desc`) VALUES
('200', 'Nips'),
('750', '750ml'),
('DMPC', 'Dumpies Cases'),
('DMPL', 'Dumpies Loose'),
('QRTC', 'Quarts Cases'),
('QRTE', 'Quarts Each'),
('5LT', '5lt Box');

-- --------------------------------------------------------

--
-- Table structure for table `0_list_taxes`
--

CREATE TABLE `0_list_taxes` (
  `tx_id` int(11) NOT NULL,
  `tx_desc` varchar(10) NOT NULL,
  `tx_perc` decimal(5,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_list_taxes`
--

INSERT INTO `0_list_taxes` (`tx_id`, `tx_desc`, `tx_perc`) VALUES
(1, 'VAT', '15.00');

-- --------------------------------------------------------

--
-- Table structure for table `0_stock_buy`
--

CREATE TABLE `0_stock_buy` (
  `sb_id` int(11) NOT NULL,
  `su_id` int(11) NOT NULL,
  `si_id` int(11) NOT NULL,
  `sb_price` decimal(11,4) NOT NULL,
  `sb_last_buy` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_stock_buy`
--

INSERT INTO `0_stock_buy` (`sb_id`, `su_id`, `si_id`, `sb_price`, `sb_last_buy`) VALUES
(3, 1, 29, '101.0000', '2019-05-08'),
(4, 2, 29, '10.0000', '2019-05-15'),
(5, 2, 28, '88.0000', '0000-00-00'),
(6, 3, 28, '93.0000', '0000-00-00'),
(63, 2, 104, '66.0000', '2019-05-14'),
(62, 1, 104, '54.0000', '2019-05-07'),
(61, 3, 104, '555.0000', '2019-05-21'),
(60, 1, 103, '66.0000', '2019-05-07'),
(59, 1, 103, '87.0000', '2019-05-14'),
(58, 1, 103, '5.0000', '2019-04-01'),
(57, 1, 103, '55.0000', '2019-04-09'),
(64, 2, 104, '8.0000', '2019-05-07');

-- --------------------------------------------------------

--
-- Table structure for table `0_stock_items`
--

CREATE TABLE `0_stock_items` (
  `si_id` int(11) NOT NULL,
  `si_code` varchar(55) NOT NULL,
  `si_desc` varchar(255) NOT NULL,
  `dp_code` varchar(5) NOT NULL,
  `sd_code` varchar(5) NOT NULL,
  `gr_code` varchar(5) NOT NULL,
  `si_case_size` float(11,4) NOT NULL,
  `si_barcode` varchar(255) DEFAULT NULL,
  `tx_id` int(11) NOT NULL,
  `si_min_stock` int(11) DEFAULT NULL,
  `si_lead_time` int(11) DEFAULT NULL,
  `si_cost_case` float(11,4) NOT NULL,
  `si_cost_aver` float(11,4) DEFAULT NULL,
  `si_cost_last` float(11,4) DEFAULT NULL,
  `si_cost_unit` float(11,4) NOT NULL,
  `si_non_sell` tinyint(1) DEFAULT NULL,
  `si_copy_plu` tinyint(1) DEFAULT NULL,
  `si_auto_markup` tinyint(1) DEFAULT NULL,
  `si_on_hand` float(11,4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_stock_items`
--

INSERT INTO `0_stock_items` (`si_id`, `si_code`, `si_desc`, `dp_code`, `sd_code`, `gr_code`, `si_case_size`, `si_barcode`, `tx_id`, `si_min_stock`, `si_lead_time`, `si_cost_case`, `si_cost_aver`, `si_cost_last`, `si_cost_unit`, `si_non_sell`, `si_copy_plu`, `si_auto_markup`, `si_on_hand`) VALUES
(28, 'BEE.QRT.SAB.LIO.CAS', 'Lion Lager (12xQRT) Case', 'BEE', 'QRTC', 'SAB', 1.0000, '', 1, 0, 0, 99.9000, 0.0000, 0.0000, 99.9000, 0, 0, 0, 0.0000),
(29, 'SPI.750.VOD.SMI.XXX', 'Smirnoff 1818 Vodka (1x750ML) Each', 'BEE', '200', 'RED', 1.0000, '', 1, 0, 0, 12.0000, 0.0000, 0.0000, 12.0000, 0, 0, 1, 0.0000),
(70, 'ee32322222222222222ee', '32221212eeeee', 'BEE', '200', 'RED', 3.0000, NULL, 1, NULL, NULL, 3232.0000, NULL, NULL, 1077.3333, NULL, NULL, NULL, NULL),
(103, '4344', '23434', 'BEE', '200', 'RED', 55.0000, NULL, 1, NULL, NULL, 345.0000, NULL, NULL, 6.2727, NULL, NULL, 0, NULL),
(104, '64442', 'hy', 'LIQ', '5LT', 'RED', 87689.0000, NULL, 1, NULL, NULL, 887.0000, NULL, NULL, 0.0101, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `0_stock_sell`
--

CREATE TABLE `0_stock_sell` (
  `ss_id` int(11) NOT NULL,
  `si_id` int(11) NOT NULL,
  `sp_id` int(11) NOT NULL,
  `ss_price` decimal(11,2) NOT NULL,
  `ss_markup` float(11,4) NOT NULL,
  `ss_round` decimal(2,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_stock_sell`
--

INSERT INTO `0_stock_sell` (`ss_id`, `si_id`, `sp_id`, `ss_price`, `ss_markup`, `ss_round`) VALUES
(30, 29, 3, '120.99', 20.9900, '0.99'),
(29, 29, 1, '116.99', 16.9900, '0.99'),
(28, 29, 2, '108.99', 8.9900, '0.99'),
(74, 104, 3, '444.40', 4399900.0000, '0.40'),
(73, 104, 2, '1.05', 4850.4951, '0.05'),
(72, 104, 1, '7.86', 77575.6094, '0.86'),
(71, 103, 3, '0.08', -99.3623, '0.08'),
(70, 103, 2, '0.01', -99.8406, '0.01'),
(69, 103, 1, '911.52', 14431.4785, '0.52');

-- --------------------------------------------------------

--
-- Table structure for table `0_stock_splits`
--

CREATE TABLE `0_stock_splits` (
  `ss_id` int(11) NOT NULL,
  `si_code` varchar(55) NOT NULL,
  `si_code_split` varchar(55) NOT NULL,
  `ss_qty` float(11,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `0_supplier_names`
--

CREATE TABLE `0_supplier_names` (
  `su_id` int(11) NOT NULL,
  `su_desc` varchar(255) NOT NULL,
  `su_post_addr` text NOT NULL,
  `su_post_city` varchar(255) NOT NULL,
  `su_post_prov` varchar(255) NOT NULL,
  `su_phys_addr` text NOT NULL,
  `su_phys_city` varchar(255) NOT NULL,
  `su_phys_prov` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_supplier_names`
--

INSERT INTO `0_supplier_names` (`su_id`, `su_desc`, `su_post_addr`, `su_post_city`, `su_post_prov`, `su_phys_addr`, `su_phys_city`, `su_phys_prov`) VALUES
(1, 'Panjivans', '', '', '', '0', '', ''),
(2, 'Makro', '', '', '', '0', '', ''),
(3, 'Salfords', '', '', '', '0', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `0_user_names`
--

CREATE TABLE `0_user_names` (
  `us_id` int(11) NOT NULL,
  `us_first` varchar(55) NOT NULL,
  `us_last` varchar(55) NOT NULL,
  `us_pass` varchar(255) NOT NULL,
  `us_email` varchar(255) NOT NULL,
  `us_access` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `0_user_names`
--

INSERT INTO `0_user_names` (`us_id`, `us_first`, `us_last`, `us_pass`, `us_email`, `us_access`) VALUES
(1, 'Erich', 'Geller', '$2y$10$18EoiwSk8vjVNf742V9tfeikpzFaajazIsMlZtzzqNHmv9Of4A6Ni', 'erich@boozebarn.co.za', 0),
(3, 'Ryan', 'Geller', '$2y$10$XyT7dJiVj6ZLbHp/qUa.MeZr.eUYoZsLrGLFhpx.5exKlSaEPIcPW', 'ryan@boozebarn.co.za', 1),
(4, 'Melissa', 'Diedericks', '$2y$10$YcgXxciLAV.LQ0y7GsfRYOFnkjk039TV9gVXD2YWnOUMcFX61B3YW', 'melissa@boozebarn.co.za', 2),
(5, 'Karen', 'Geller', '$2y$10$LYST4d55N7/lCOof7/ZAcu2cSG7hCJdMBFXDofKnCoCCy7VwGlmRC', 'karen@geller.ws', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `0_list_dept`
--
ALTER TABLE `0_list_dept`
  ADD PRIMARY KEY (`dp_code`);

--
-- Indexes for table `0_list_grup`
--
ALTER TABLE `0_list_grup`
  ADD PRIMARY KEY (`gr_code`);

--
-- Indexes for table `0_list_prices`
--
ALTER TABLE `0_list_prices`
  ADD PRIMARY KEY (`sp_id`);

--
-- Indexes for table `0_list_roundup`
--
ALTER TABLE `0_list_roundup`
  ADD PRIMARY KEY (`ru_id`);

--
-- Indexes for table `0_list_subd`
--
ALTER TABLE `0_list_subd`
  ADD PRIMARY KEY (`sd_code`);

--
-- Indexes for table `0_list_taxes`
--
ALTER TABLE `0_list_taxes`
  ADD PRIMARY KEY (`tx_id`);

--
-- Indexes for table `0_stock_buy`
--
ALTER TABLE `0_stock_buy`
  ADD PRIMARY KEY (`sb_id`);

--
-- Indexes for table `0_stock_items`
--
ALTER TABLE `0_stock_items`
  ADD PRIMARY KEY (`si_id`),
  ADD UNIQUE KEY `si_desc` (`si_desc`),
  ADD UNIQUE KEY `si_code` (`si_code`),
  ADD KEY `dp_code` (`dp_code`),
  ADD KEY `sd_code` (`sd_code`),
  ADD KEY `gr_code` (`gr_code`);

--
-- Indexes for table `0_stock_sell`
--
ALTER TABLE `0_stock_sell`
  ADD PRIMARY KEY (`ss_id`);

--
-- Indexes for table `0_stock_splits`
--
ALTER TABLE `0_stock_splits`
  ADD PRIMARY KEY (`ss_id`);

--
-- Indexes for table `0_supplier_names`
--
ALTER TABLE `0_supplier_names`
  ADD PRIMARY KEY (`su_id`);

--
-- Indexes for table `0_user_names`
--
ALTER TABLE `0_user_names`
  ADD PRIMARY KEY (`us_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `0_list_prices`
--
ALTER TABLE `0_list_prices`
  MODIFY `sp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `0_list_roundup`
--
ALTER TABLE `0_list_roundup`
  MODIFY `ru_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `0_list_taxes`
--
ALTER TABLE `0_list_taxes`
  MODIFY `tx_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `0_stock_buy`
--
ALTER TABLE `0_stock_buy`
  MODIFY `sb_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `0_stock_items`
--
ALTER TABLE `0_stock_items`
  MODIFY `si_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `0_stock_sell`
--
ALTER TABLE `0_stock_sell`
  MODIFY `ss_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `0_stock_splits`
--
ALTER TABLE `0_stock_splits`
  MODIFY `ss_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `0_supplier_names`
--
ALTER TABLE `0_supplier_names`
  MODIFY `su_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `0_user_names`
--
ALTER TABLE `0_user_names`
  MODIFY `us_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
