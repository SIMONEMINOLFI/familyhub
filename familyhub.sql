-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Mar 14, 2025 alle 17:13
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Struttura della tabella `obiettivi`
--

CREATE TABLE `obiettivi` (
  `id_obiettivo` int(11) NOT NULL,
  `nome_obiettivo` varchar(500) NOT NULL,
  `tipo` enum('attivita','sfida') NOT NULL,
  `descrizione` varchar(500) DEFAULT NULL,
  `frequenza` enum('settimanale','mensile','annuale','occasionale') NOT NULL,
  `punti_obiettivo` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `partecipazione`
--

CREATE TABLE `partecipazione` (
  `id_partecipazione` int(11) NOT NULL,
  `id_obiettivo` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  `id_utente_sfidante` int(11) NOT NULL,
  `stato` enum('accettato','rifiutato','completato','scaduto') NOT NULL,
  `data_assegnazione` date NOT NULL,
  `data_completamento` date DEFAULT NULL,
  `punti_assegnati` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `premi`
--

CREATE TABLE `premi` (
  `id_premio` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  `nome_premio` varchar(500) NOT NULL,
  `punti_richiesti` int(10) UNSIGNED NOT NULL,
  `data_riscossione` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id_utente` int(10) NOT NULL,
  `nome_utente` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `eta` int(10) UNSIGNED NOT NULL,
  `punti` int(10) UNSIGNED NOT NULL,
  `ultimo_accesso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
