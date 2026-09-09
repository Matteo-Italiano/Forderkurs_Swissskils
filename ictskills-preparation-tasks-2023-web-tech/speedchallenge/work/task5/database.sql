SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `speedchallenge`
--

DROP TABLE IF EXISTS `participations`;
DROP TABLE IF EXISTS `competitors`;
DROP TABLE IF EXISTS `championships`;

-- --------------------------------------------------------

--
-- Table structure for table `championships`
--

CREATE TABLE `championships` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `championships`
--

INSERT INTO `championships` (`id`, `name`, `date`) VALUES
(1, 'WorldSkills 2019', '2019-08-22'),
(2, 'WorldSkills 2022', '2022-10-12'),
(3, 'EuroSkills 2021', '2021-01-06'),
(4, 'EuroSkills 2023', '2023-09-05');

-- --------------------------------------------------------

--
-- Table structure for table `competitors`
--

CREATE TABLE `competitors` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` tinyint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `competitors`
--

INSERT INTO `competitors` (`id`, `name`, `age`) VALUES
(1, 'Daniel Cord', 18),
(2, 'Leon Freya', 21),
(3, 'Magda Lies', 17),
(4, 'Erik Kord', 18),
(5, 'Carina Ida', 17),
(6, 'Mia Ernst', 19),
(7, 'Hannes Helmuth', 20),
(8, 'Marco Meier', 20),
(9, 'Nikola Meier', 19),
(10, 'Nicole Kaiser', 19);

-- --------------------------------------------------------

--
-- Table structure for table `participations`
--

CREATE TABLE `participations` (
  `competitor_id` int NOT NULL,
  `championship_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `participations`
--

INSERT INTO `participations` (`competitor_id`, `championship_id`) VALUES
(1, 1),
(1, 3),
(2, 1),
(2, 4),
(3, 4),
(4, 3),
(5, 4),
(6, 2),
(7, 1),
(8, 2),
(9, 3),
(10, 1),
(10, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `championships`
--
ALTER TABLE `championships`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `competitors`
--
ALTER TABLE `competitors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participations`
--
ALTER TABLE `participations`
  ADD UNIQUE KEY `championship_id` (`championship_id`,`competitor_id`),
  ADD KEY `competitor_id` (`competitor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `championships`
--
ALTER TABLE `championships`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `competitors`
--
ALTER TABLE `competitors`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `participations`
--
ALTER TABLE `participations`
  ADD CONSTRAINT `participations_ibfk_1` FOREIGN KEY (`championship_id`) REFERENCES `championships` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_2` FOREIGN KEY (`competitor_id`) REFERENCES `competitors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
