# FAMILY HUB - SPECIFICHE DELL' INTERFACCIA UTENTE

### Storico Funzionalità introdotte per l'utilizzo dell'Interfaccia Utente 

- [X] Login form utente (l'utente accede all'app e viene visualizzata la homepage)

- [X] Aggiungo istanze database su phpmyadmin

- [X] Creo view (tabella virtuale) classifica con query sql e usando app Bruno ne leggo i dati

- [X] Creo tabella dinamica tramite javascript (implemento funzione che legge i dati della classifica e li visualizza)

- [X] Calcolo dinamico dei punti del database (punti obiettivi completati - punti premi riscattati) usando i Trigger

- [X] Configurare api.php, utenti e password con hash nella tabella, richiesta POST all'endpoint login tramite Bruno

- [X] Api Rest e token per autenticazione utente (passo utente e password con POST e mi restituisce token, vedi [php-crud-api](https://github.com/mevdschee/php-crud-api))

- [X] Login con nome utente e password (entrambi case-sensitive)

- [X] Icona impostazioni con opzione *"Logout"* e funzione che lo gestisce

- [ ] Punti visualizzati nella Home devono essere giusti

- [ ] Miglioro estetica classifica utenti

- [ ] Sistemo icona utente

- [ ] Implemento tabs per gli Obiettivi

- [ ] Cliccando su Premi si apre una pagina con due liste (riscossi/da riscuotere)

### Accesso all'App

- Al primo accesso, l'utente deve registrarsi con email e password tramite un form. Dopo la registrazione, riceve un bonus punti di benvenuto.

- Ad ogni accesso, viene mostrato un messaggio di benvenuto con il nome utente (es. Ciao Simone !). Cliccando su Accedi, l'utente viene indirizzato nella pagina Home della Webapp.

### Design e Stile

- Uso di icone ed emoji per rendere l'interfaccia più intuitiva e piacevole.

- Sfondo in tonalità chiare, come azzurro chiaro o giallo (in stile "Note").

- Implementazione di progress bar per mostrare i progressi degli utenti e motivarli.

### Elementi Estetici Principali

- Titolo "Family Hub" al centro della barra superiore.

- In alto a destra, un'icona circolare con l'iniziale del nome utente. Sotto l'icona, vengono visualizzati il nome e i punti accumulati.

- Un'icona che apre un menu impostazioni (OPZIONALE) con le opzioni *"Modifica nome utente"* e *"Logout"*.

### Sezione Classifica

- Posizionata a sinistra della schermata principale.

- Contiene una tabella con la classifica degli utenti, ordinata per il totale di punti accumulati.

### Sezione Premi

- Situata al centro-sinistra dello schermo. Cliccandola, si espande in due liste:

- Premi già riscossi: Mostra il nome del premio e la data di riscossione.

- Premi disponibili: Contiene un pulsante "riscatta", attivo solo se l'utente ha abbastanza punti.

### Sezione Obiettivi

Gli obiettivi sono suddivisi prima per **frequenza** (settimanali/mensili/annuali/occasionali), poi ogni tabella (ad es. obiettivi settimanali) sarà distinta per **tipologia** in due liste (potrei anche inserire in modo OPZIONALE un'unica lista **Tutti** che permette di visualizzare tutti gli obiettivi di una categoria senza distinzione tra attività e sfide):

- **Attività** (da completare/completate)

- **Sfide** (da completare/completate)

#### Stato obiettivi

- Cliccando su attività o su sfide mostro di default prima gli **obiettivi da completare**, con un pulsante per aggiornarne lo stato (ad esempio "Segna come completato").  
- Vengono visualizzati poi gli **obiettivi da completare**, con un colore diverso (ad esempio, grigio o verde chiaro).
- Gli **obiettivi scaduti o rifiutati** (le sfide) rifiutate non vengono visualizzati...

#### Progress Bar (Opzionale)

Inserisco una **Progress Bar** che mostra la percentuale di completamento degli obiettivi in base alla loro frequenza (settimanale, mensile, annuale), e cambia colore in base alla percentuale di completamento:

- 0%: Rosso (nessun obiettivo completato)
- 1-99%: Giallo (svolgimento obiettivi in corso...)
- 100%: Verde (obiettivi completati)

La percentuale viene calcolata in base ai punti completati rispetto ai punti totali.

Ad esempio, per gli obiettivi settimanali avrò una Progress Bar che all'inizio è di default allo 0%, se ad esempio in questa settimana devo completare (tra attività e sfide) 40 punti, se completo un obiettivo da 10 punti la Progress Bar andrà al 25% (e cambierà colore). Stessa cosa 
per gli obiettivi mensili ed annuali.

### Funzionalità Grafiche da Implementare (con Bootstrap)

- Tables: Per la classifica utenti e la gestione dei premi.

- Modals: Per mostrare dettagli o conferme di azioni (ad esempio quando riscatto un premio, sei sicuro di voler riscattare?)

- Progress Bar: Per visualizzare i progressi degli obiettivi e i punti per riscattare premi.

- Forms: Per il login e la registrazione dell'utente.

- Select Form: Per scegliere un utente a cui lanciare una sfida.

- Checkbox: Per il completamento di attività e sfide.

- Buttons: Per accettare/rifiutare sfide (opzionale).

- Pagination: Per navigare tra gli tutti gli obiettivi.

- Accordion: Per nascondere o mostrare sezioni (es. premi disponibili).

- Badge: Per notifiche sfide in arrivo o altro (obiettivi completati ad esempio o avanzamento in classifica).

#### Credenziali utenti database 

| nome_utente: "Anna" | password: "ciao123" | hash: "$2y$10$vs8cRPiDyLKzlwUxBNSZueMuobFV2MqlmIqDvfoM613iqrzylKUOO"

| nome_utente: "Mario" | password: "mariobros83" | hash: "$2y$10$rAiKpMoWNUryOO6.ikOFA.lirGpruzNv19B6s3BPleNVtxxYwawFS"

| nome_utente: "Luigi2001" | password: "loveTravelling*" | hash: "$2y$10$IbJlF4q12KkhNEMm4zmGhu0QWrGGXUd/5NKk5URjrZBAYOnkgeqIe"