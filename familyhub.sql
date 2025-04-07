-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 07, 2025 at 10:02 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `familyhub`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `classifica`
-- (See below for the actual view)
--
CREATE TABLE `classifica` (
`id_utente` int(10)
,`nome_utente` varchar(500)
,`punti` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Table structure for table `obiettivi`
--

CREATE TABLE `obiettivi` (
  `id_obiettivo` int(11) NOT NULL,
  `nome_obiettivo` varchar(500) NOT NULL,
  `tipo` enum('attivita','sfida') NOT NULL,
  `descrizione` varchar(500) DEFAULT NULL,
  `frequenza` enum('settimanale','mensile','annuale','occasionale') NOT NULL,
  `punti_obiettivo` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `obiettivi`
--

INSERT INTO `obiettivi` (`id_obiettivo`, `nome_obiettivo`, `tipo`, `descrizione`, `frequenza`, `punti_obiettivo`) VALUES
(1, 'Fare esercizio fisico', 'attivita', 'Stretching regolare', 'settimanale', 20),
(2, 'Lavare la macchina', 'sfida', NULL, 'occasionale', 10),
(3, 'Leggere un libro', 'attivita', NULL, 'mensile', 20),
(4, 'Pulire la cantina', 'attivita', NULL, 'occasionale', 30),
(5, 'Fare volontariato', 'attivita', 'Assistenza anziani', 'mensile', 30);

-- --------------------------------------------------------

--
-- Table structure for table `partecipazione`
--

CREATE TABLE `partecipazione` (
  `id_partecipazione` int(11) NOT NULL,
  `id_obiettivo` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  `id_utente_sfidante` int(11) DEFAULT NULL,
  `stato` enum('accettato','rifiutato','completato','scaduto') NOT NULL,
  `data_assegnazione` date NOT NULL,
  `data_completamento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `partecipazione`
--

INSERT INTO `partecipazione` (`id_partecipazione`, `id_obiettivo`, `id_utente`, `id_utente_sfidante`, `stato`, `data_assegnazione`, `data_completamento`) VALUES
(1, 1, 2, NULL, 'scaduto', '2025-03-20', NULL),
(2, 2, 3, 2, 'completato', '2025-03-21', '2025-03-23'),
(3, 3, 3, NULL, 'completato', '2025-03-22', '2025-03-24'),
(4, 5, 1, NULL, 'completato', '2025-03-22', '2025-03-23'),
(5, 3, 1, NULL, 'accettato', '2025-03-23', NULL);

--
-- Triggers `partecipazione`
--
DELIMITER $$
CREATE TRIGGER `aggiungi_punti_obiettivo_completato` AFTER UPDATE ON `partecipazione` FOR EACH ROW BEGIN
    IF NEW.stato = 'completato' AND OLD.stato <> 'completato' THEN
        UPDATE utenti 
        SET punti = punti + (SELECT punti_obiettivo FROM obiettivi WHERE id_obiettivo = OLD.id_obiettivo)
        WHERE id_utente = NEW.id_utente;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `premi`
--

CREATE TABLE `premi` (
  `id_premio` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  `nome_premio` varchar(500) NOT NULL,
  `punti_richiesti` int(10) UNSIGNED NOT NULL,
  `data_riscossione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `premi`
--

INSERT INTO `premi` (`id_premio`, `id_utente`, `nome_premio`, `punti_richiesti`, `data_riscossione`) VALUES
(1, 1, 'Cena al ristorante', 50, NULL),
(2, 3, 'Biglietto per il cinema', 10, '2025-03-29'),
(3, 3, 'Giornata alle terme', 100, NULL),
(4, 2, 'Gita in montagna', 30, NULL);

--
-- Triggers `premi`
--
DELIMITER $$
CREATE TRIGGER `sottrai_punti_riscatto_premio` BEFORE UPDATE ON `premi` FOR EACH ROW BEGIN
    IF OLD.data_riscossione IS NULL THEN
        IF (SELECT punti FROM utenti WHERE id_utente = NEW.id_utente) >= NEW.punti_richiesti THEN
            UPDATE utenti
            SET punti = punti - NEW.punti_richiesti
            WHERE id_utente = NEW.id_utente;
        ELSE
            SET NEW.data_riscossione = NULL;
        END IF;
    ELSE
        SET NEW.data_riscossione = OLD.data_riscossione; 
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `utenti`
--

CREATE TABLE `utenti` (
  `id_utente` int(10) NOT NULL,
  `nome_utente` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `eta` int(10) UNSIGNED NOT NULL,
  `punti` int(10) UNSIGNED NOT NULL,
  `ultimo_accesso` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `utenti`
--

INSERT INTO `utenti` (`id_utente`, `nome_utente`, `password`, `email`, `eta`, `punti`, `ultimo_accesso`) VALUES
(1, 'Anna', '$2y$10$5dycfv4jMbx9CdBTdHL50.0/LKvlg1dO3gyVab3RWuPAgdmOlbJAC', 'anna@gmail.com', 37, 30, NULL),
(2, 'Mario', '$2y$10$59UTH0UnDjMEc/BkwIZYAOK0nX.WRY6KifOgFh0JJLjCJ0QMd2aw6', 'mario@gmail.com', 45, 0, '2025-03-23'),
(3, 'Luigi2001', '$2y$10$abdR0UqSSPoXt5pRLdASMOkODgxqmSWMQ2uPzXZaZ1bI4eN0dMzCu', 'luigi@gmail.com', 15, 20, '2025-03-22');

-- --------------------------------------------------------

--
-- Structure for view `classifica`
--
DROP TABLE IF EXISTS `classifica`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `classifica`  AS  select `utenti`.`id_utente` AS `id_utente`,`utenti`.`nome_utente` AS `nome_utente`,`utenti`.`punti` AS `punti` from `utenti` order by `utenti`.`punti` desc ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `obiettivi`
--
ALTER TABLE `obiettivi`
  ADD PRIMARY KEY (`id_obiettivo`);

--
-- Indexes for table `partecipazione`
--
ALTER TABLE `partecipazione`
  ADD PRIMARY KEY (`id_partecipazione`),
  ADD KEY `id_obiettivo` (`id_obiettivo`),
  ADD KEY `id_utente_sfidante` (`id_utente_sfidante`),
  ADD KEY `id_utente` (`id_utente`);

--
-- Indexes for table `premi`
--
ALTER TABLE `premi`
  ADD PRIMARY KEY (`id_premio`),
  ADD KEY `FK` (`id_utente`);

--
-- Indexes for table `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id_utente`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `partecipazione`
--
ALTER TABLE `partecipazione`
  ADD CONSTRAINT `partecipazione_ibfk_1` FOREIGN KEY (`id_obiettivo`) REFERENCES `obiettivi` (`id_obiettivo`),
  ADD CONSTRAINT `partecipazione_ibfk_2` FOREIGN KEY (`id_utente_sfidante`) REFERENCES `utenti` (`id_utente`),
  ADD CONSTRAINT `partecipazione_ibfk_3` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`);

--
-- Constraints for table `premi`
--
ALTER TABLE `premi`
  ADD CONSTRAINT `FK` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
