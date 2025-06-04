# FAMILY HUB - SPECIFICHE DELL' INTERFACCIA UTENTE

## Credenziali degli utenti per il login

- nome_utente: "Anna" | password: "ciao123" | hash: "$2y$10$vs8cRPiDyLKzlwUxBNSZueMuobFV2MqlmIqDvfoM613iqrzylKUOO"

- nome_utente: "Mario" | password: "mariobros83" | hash: "$2y$10$rAiKpMoWNUryOO6.ikOFA.lirGpruzNv19B6s3BPleNVtxxYwawFS"

- nome_utente: "Luigi" | password: "loveTravelling*" | hash: "$2y$10$IbJlF4q12KkhNEMm4zmGhu0QWrGGXUd/5NKk5URjrZBAYOnkgeqIe"

### Accesso all'App

- L'utente inserisce nome utente e password nell'apposita form

- Cliccando su Accedi, l'utente viene indirizzato nella pagina Home della Webapp

- Ad ogni accesso, viene mostrato un messaggio di benvenuto con il nome utente (es. Ciao Simone !)

### Design e Stile

- Uso di icone ed emoji per rendere l'interfaccia più intuitiva e piacevole

- Sfondo in tonalità chiare (azzurro chiaro)

### Elementi Estetici Principali

- Titolo "Family Hub" al centro della barra superiore

- In alto a destra, un'icona circolare con il nome utente ed un'icona con opzione di *"Logout"*

- Al centro dello schermo vengono visualizzati il nome e i punti accumulati

### Sezione Classifica

- Posizionata a sinistra della schermata principale

- Contiene una tabella con la classifica degli utenti, ordinata per il totale di punti accumulati

### Sezione Premi

- Situata al centro-sinistra dello schermo. Cliccandola, si espande in due liste:

- Premi riscossi: Mostra il nome del premio e la data di riscossione

- Premi da riscattare: Contiene una lista di premi con pulsante "Riscatta"

### Sezione Obiettivi

Gli obiettivi sono suddivisi prima per **tipologia** (attività/sfide), poi per **frequenza** (settimanali/mensili/annuali)

- Vengono visualizzati gli **obiettivi da completare** (come logico in una To-do list...), con un pulsante "Rimuovi" e un pulsante "Completa" che possono alterarne lo stato

### Storico Funzionalità introdotte per l'utilizzo dell'Interfaccia Utente 

- [X] Login form utente (l'utente accede all'app e viene visualizzata la homepage)

- [X] Aggiungo istanze database su phpmyadmin

- [X] Creo view classifica con query sql e usando app Bruno ne leggo i dati

- [X] Creo tabella dinamica tramite javascript (implemento funzione che legge i dati della classifica e li visualizza)

- [X] Calcolo dinamico dei punti del database (punti obiettivi completati - punti premi riscattati) usando i Trigger

- [X] Configurare api.php, utenti e password con hash nella tabella, richiesta POST all'endpoint login tramite Bruno

- [X] Api Rest e token per autenticazione utente (passo utente e password con POST e mi restituisce token, vedi [php-crud-api](https://github.com/mevdschee/php-crud-api))

- [X] Login con nome utente e password (entrambi case-sensitive)

- [X] Icona impostazioni con opzione *"Logout"* e funzione che lo gestisce

- [X] Punti visualizzati nella Home devono essere quelli dell'utente che ha fatto il login

- [X] Sistemo GET Bruno Premi riscossi e da riscuotere per l'utente loggato

- [X] Cliccando su "Premi" si apre una pagina con due liste (riscossi/da riscuotere)

- [X] Aggiungo tasto "Riscatta" su "Premi"

- [X] Aggiungo funzione mostraPunti 

- [X] Creo funzione riscattaPremio che prende fetch Bruno riscattaPremi (PUT) richiamata quando clicco il bottone riscatta, bottone deve fare riscatto e poi richiamare funzioni mostraPremi e mostraClassifica 

- [X] Implemento tabs per gli Obiettivi con divisione in attività e sfide

- [x] Inserisco tasto per inserire nuovi Premi da riscattare

- [X] Fetch per prendere gli Obiettivi con relativa frequenza, tipo, stato

- [X] Inserisco tasto per inserire nuove Attività/Sfide

- [X] Gestione fetch obiettivi distinti per frequenza tramite JS

- [X] Aggiungo tasto "Rimuovi" (X) in Obiettivi

- [X] Aggiungo tasto "Completa" in Attività/Sfide (come "Riscatta" per i premi)

- [X] Gestione tasto "Aggiungi" per gli Obiettivi con distinzione per tipo e frequenza

- [X] Aggiornamento gestione punteggio (una sfida se completata sottrae punti utente sfidante e li aggiunge all'utente sfidato)

- [X] Inserisco tasti per accettare o rifiutare sfide in arrivo

- [X] Aggiunto gestione automatica degli obiettivi in base alla frequenza (ad esempio gli obiettivi settimanali dopo 7 giorni non vengono più mostrati all'utente, e così via...)