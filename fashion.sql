-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 09, 2018 at 06:14 PM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `fashion`
--
CREATE DATABASE IF NOT EXISTS `fashion` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `fashion`;

-- --------------------------------------------------------

--
-- Table structure for table `admin_login`
--

CREATE TABLE IF NOT EXISTS `admin_login` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1002 ;

--
-- Dumping data for table `admin_login`
--

INSERT INTO `admin_login` (`id`, `user_name`, `password`) VALUES
(1001, 'maut', 'simpangmaut');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `user_id` int(30) NOT NULL,
  `id_product_size` int(30) NOT NULL,
  `quantity` int(30) NOT NULL,
  `price` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=23 ;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `id_product_size`, `quantity`, `price`) VALUES
(12, 7, 1, 0, 50000),
(13, 7, 1, 1, 50000),
(14, 7, 2, 3, 50000),
(15, 7, 1, 0, 50000),
(16, 7, 2, 0, 50000),
(17, 7, 2, 0, 50000),
(18, 7, 1, 0, 50000),
(19, 0, 1, 0, 50000),
(20, 0, 1, 0, 50000),
(21, 0, 1, 0, 50000),
(22, 999, 1, 0, 50000);

-- --------------------------------------------------------

--
-- Table structure for table `category_season`
--

CREATE TABLE IF NOT EXISTS `category_season` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_season` int(11) NOT NULL,
  `nama_category_season` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `category_season`
--

INSERT INTO `category_season` (`id`, `id_season`, `nama_category_season`) VALUES
(1, 1, 'top'),
(2, 1, 'bottom'),
(3, 2, 'top'),
(4, 2, 'bottom');

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE IF NOT EXISTS `invoice` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `kode_invoice` varchar(100) NOT NULL,
  `total_harga` int(99) NOT NULL,
  `jam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_user` int(30) NOT NULL,
  `alamat` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `nama_product` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id`, `kode_invoice`, `total_harga`, `jam`, `id_user`, `alamat`, `phone`, `nama_product`) VALUES
(5, 'inv10011', 50000, '2018-03-26 07:00:14', 1, 'palem', '14327698968546', 'jeans');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_detail`
--

CREATE TABLE IF NOT EXISTS `invoice_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `nama_product` varchar(100) NOT NULL,
  `warna` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `size` int(11) NOT NULL,
  `total_harga` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_category_season` int(11) NOT NULL,
  `nama_product` varchar(100) NOT NULL,
  `describ` varchar(100) NOT NULL,
  `harga` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `id_category_season`, `nama_product`, `describ`, `harga`) VALUES
(2, 1, 'polo long hands', 'lengan panjang', 55000),
(3, 2, 'levis', 'jeans', 60000),
(4, 2, 'levis', 'leviso', 30000),
(6, 5, 'kancruts', 'asffasfafsf', 523252);

-- --------------------------------------------------------

--
-- Table structure for table `season`
--

CREATE TABLE IF NOT EXISTS `season` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `namaseason` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `season`
--

INSERT INTO `season` (`id`, `namaseason`) VALUES
(1, 'summer'),
(2, 'winter'),
(3, 'lola');

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE IF NOT EXISTS `size` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_warna_product` int(11) NOT NULL,
  `size_product` varchar(20) NOT NULL,
  `stock` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`id`, `id_warna_product`, `size_product`, `stock`) VALUES
(1, 1, 'S', '4'),
(2, 1, 'M', '3'),
(3, 1, 'L', '5'),
(4, 2, '30', '4'),
(5, 2, '29', '4'),
(6, 3, 'L', '9'),
(7, 6, '4', '6'),
(8, 9, 'asdadas', 'asdasda'),
(9, 5, '44', '6'),
(10, 10, 'M', '5');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `password` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `password`, `username`) VALUES
(1, '0', '0'),
(2, '0', '0'),
(3, 'a4f8d1682b29eb57cc0a4846b03630731673b2c49bd3d7eb418a1ab1908f6db3', 'ihsanz'),
(4, 'd1d560f43f93a57223ea16b5432e6c400f4424cb0423d3341c179031ef442dcf', 'sadasdadaads'),
(5, '353f9f25a52fbbe951bc1176019b58d9a7dd04b3094bc0334115862118846098', 'ihsan'),
(6, '353f9f25a52fbbe951bc1176019b58d9a7dd04b3094bc0334115862118846098', 'ihsan'),
(7, '353f9f25a52fbbe951bc1176019b58d9a7dd04b3094bc0334115862118846098', 'aan'),
(8, '353f9f25a52fbbe951bc1176019b58d9a7dd04b3094bc0334115862118846098', 'aax');

-- --------------------------------------------------------

--
-- Table structure for table `user_data`
--

CREATE TABLE IF NOT EXISTS `user_data` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `nama_user` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alamat_user` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user_data`
--

INSERT INTO `user_data` (`id`, `nama_user`, `email`, `alamat_user`, `phone`) VALUES
(1, 'aan', 'asfdg@gmail.com', '', '1231214'),
(2, 'qq', 'asfdg@gmail.com', '', '21312312');

-- --------------------------------------------------------

--
-- Table structure for table `warna`
--

CREATE TABLE IF NOT EXISTS `warna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) NOT NULL,
  `warna_product` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `warna`
--

INSERT INTO `warna` (`id`, `id_product`, `warna_product`) VALUES
(1, 1, 'biru'),
(2, 3, 'merah'),
(3, 5, 'jingga'),
(4, 5, 'kuning'),
(5, 3, 'merah'),
(6, 6, 'gg'),
(7, 7, '342342343'),
(8, 8, 'asdasda'),
(9, 4, 'safasasd'),
(10, 2, 'kuning');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
