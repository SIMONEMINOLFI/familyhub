-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Creato il: Apr 28, 2025 alle 08:15
-- Versione del server: 5.7.24
-- Versione PHP: 7.4.1

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
-- Struttura stand-in per le viste `classifica`
-- (Vedi sotto per la vista effettiva)
--
CREATE TABLE `classifica` (
`id_utente` int(10)
,`nome_utente` varchar(500)
,`punti` int(10) unsigned
);

-- --------------------------------------------------------

--
-- Struttura della tabella `obiettivi`
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
-- Dump dei dati per la tabella `obiettivi`
--

INSERT INTO `obiettivi` (`id_obiettivo`, `nome_obiettivo`, `tipo`, `descrizione`, `frequenza`, `punti_obiettivo`) VALUES
(1, 'Fare esercizio fisico', 'attivita', 'Stretching regolare', 'settimanale', 20),
(2, 'Lavare la macchina', 'sfida', NULL, 'occasionale', 10),
(3, 'Leggere un libro', 'attivita', NULL, 'mensile', 20),
(4, 'Pulire la cantina', 'attivita', NULL, 'occasionale', 30),
(5, 'Fare volontariato', 'attivita', 'Assistenza anziani', 'mensile', 30),
(6, 'Pulizia appartamento', 'attivita', 'Per affittuari in arrivo', 'mensile', 100),
(7, 'Riparare lavatrice', 'attivita', NULL, 'occasionale', 25);

-- --------------------------------------------------------

--
-- Struttura della tabella `partecipazione`
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
-- Dump dei dati per la tabella `partecipazione`
--

INSERT INTO `partecipazione` (`id_partecipazione`, `id_obiettivo`, `id_utente`, `id_utente_sfidante`, `stato`, `data_assegnazione`, `data_completamento`) VALUES
(1, 1, 2, NULL, 'scaduto', '2025-03-20', NULL),
(2, 2, 3, 2, 'completato', '2025-03-21', '2025-03-23'),
(3, 3, 3, NULL, 'completato', '2025-03-22', '2025-03-24'),
(4, 5, 1, NULL, 'completato', '2025-03-22', '2025-03-23'),
(5, 3, 1, NULL, 'accettato', '2025-03-23', NULL),
(6, 6, 2, NULL, 'accettato', '2025-04-19', NULL),
(7, 7, 2, NULL, 'completato', '2025-04-18', '2025-04-19');

--
-- Trigger `partecipazione`
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
-- Struttura della tabella `premi`
--

CREATE TABLE `premi` (
  `id_premio` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  `nome_premio` varchar(500) NOT NULL,
  `punti_richiesti` int(10) UNSIGNED NOT NULL,
  `data_riscossione` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `premi`
--

INSERT INTO `premi` (`id_premio`, `id_utente`, `nome_premio`, `punti_richiesti`, `data_riscossione`) VALUES
(1, 1, 'Cena al ristorante', 40, NULL),
(2, 3, 'Biglietto per il cinema', 10, '2025-03-29'),
(3, 2, 'Giornata alle terme', 80, NULL),
(4, 2, 'Gita in montagna', 20, '2025-03-29'),
(5, 3, 'Giornata a Gardaland', 60, NULL),
(6, 1, 'Visita osservatorio astronomico', 40, NULL),
(7, 3, 'Console Playstation', 400, NULL);

--
-- Trigger `premi`
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
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id_utente` int(10) NOT NULL,
  `nome_utente` varchar(500) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `eta` int(10) UNSIGNED NOT NULL,
  `punti` int(10) UNSIGNED NOT NULL,
  `ultimo_accesso` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id_utente`, `nome_utente`, `password`, `email`, `eta`, `punti`, `ultimo_accesso`) VALUES
(1, 'Anna', '$2y$10$vs8cRPiDyLKzlwUxBNSZueMuobFV2MqlmIqDvfoM613iqrzylKUOO', 'anna@gmail.com', 37, 30, NULL),
(2, 'Mario', '$2y$10$rAiKpMoWNUryOO6.ikOFA.lirGpruzNv19B6s3BPleNVtxxYwawFS', 'mario@gmail.com', 45, 230, '2025-03-23'),
(3, 'Luigi2001', '$2y$10$IbJlF4q12KkhNEMm4zmGhu0QWrGGXUd/5NKk5URjrZBAYOnkgeqIe', 'luigi@gmail.com', 15, 20, '2025-03-22');

-- --------------------------------------------------------

--
-- Struttura per vista `classifica`
--
DROP TABLE IF EXISTS `classifica`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `classifica`  AS  select `utenti`.`id_utente` AS `id_utente`,`utenti`.`nome_utente` AS `nome_utente`,`utenti`.`punti` AS `punti` from `utenti` order by `utenti`.`punti` desc ;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `obiettivi`
--
ALTER TABLE `obiettivi`
  ADD PRIMARY KEY (`id_obiettivo`);

--
-- Indici per le tabelle `partecipazione`
--
ALTER TABLE `partecipazione`
  ADD PRIMARY KEY (`id_partecipazione`),
  ADD KEY `id_obiettivo` (`id_obiettivo`),
  ADD KEY `id_utente_sfidante` (`id_utente_sfidante`),
  ADD KEY `id_utente` (`id_utente`);

--
-- Indici per le tabelle `premi`
--
ALTER TABLE `premi`
  ADD PRIMARY KEY (`id_premio`),
  ADD KEY `FK` (`id_utente`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id_utente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `premi`
--
ALTER TABLE `premi`
  MODIFY `id_premio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `partecipazione`
--
ALTER TABLE `partecipazione`
  ADD CONSTRAINT `partecipazione_ibfk_1` FOREIGN KEY (`id_obiettivo`) REFERENCES `obiettivi` (`id_obiettivo`),
  ADD CONSTRAINT `partecipazione_ibfk_2` FOREIGN KEY (`id_utente_sfidante`) REFERENCES `utenti` (`id_utente`),
  ADD CONSTRAINT `partecipazione_ibfk_3` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`);

--
-- Limiti per la tabella `premi`
--
ALTER TABLE `premi`
  ADD CONSTRAINT `FK` FOREIGN KEY (`id_utente`) REFERENCES `utenti` (`id_utente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
