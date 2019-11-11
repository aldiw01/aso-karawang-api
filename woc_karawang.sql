-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 11, 2019 at 01:11 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `woc_karawang`
--

-- --------------------------------------------------------

--
-- Table structure for table `data_quiz`
--

CREATE TABLE `data_quiz` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `ans1` text NOT NULL,
  `ans2` text NOT NULL,
  `ans3` text,
  `ans4` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_quiz`
--

INSERT INTO `data_quiz` (`id`, `question`, `ans1`, `ans2`, `ans3`, `ans4`) VALUES
(1, 'Berikut divisi di ASO, kecuali ...', 'WICO', 'WOC', 'WMS', 'Fulfillment'),
(2, 'Manakah yang provisioning type dengan melakukan instalasi ODP baru di jalur yang telah tersedia?', 'PT2', 'PT1', 'PT3', 'PT4');

-- --------------------------------------------------------

--
-- Table structure for table `data_score`
--

CREATE TABLE `data_score` (
  `id` varchar(11) NOT NULL,
  `user_id` varchar(100) NOT NULL,
  `course_id` varchar(11) NOT NULL,
  `score` int(11) NOT NULL,
  `duration` varchar(24) NOT NULL,
  `created` varchar(24) NOT NULL,
  `updated` varchar(24) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `data_quiz`
--
ALTER TABLE `data_quiz`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_score`
--
ALTER TABLE `data_score`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `data_quiz`
--
ALTER TABLE `data_quiz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
