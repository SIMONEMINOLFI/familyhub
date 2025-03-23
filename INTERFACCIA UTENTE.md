# FAMILY HUB - SPECIFICHE DELL' INTERFACCIA UTENTE

### Prossime Funzionalità da introdurre per l'Interfaccia Utente 

- [X] Login form utente (l'utente accede all'app e viene visualizzata la homepage)

- [X] Istanze su phpmyadmin

- [ ] Api Rest

- [ ] Implemento tabs per gli Obiettivi

- [ ] Progress Bar per gli Obiettivi

- [ ] Icona impostazioni con opzioni *"Modifica nome utente"* e *"Logout"*

- [ ] Cliccando su Premi si apre una pagina con due liste (riscossi/da riscuotere)

- [ ] Cookie/local storage (salvo informazioni utente una volta registrato, magari sulla sezione aperta all'utimo accesso dall'utente)

### Accesso all'App

- Al primo accesso, l'utente deve registrarsi con email e password tramite un form. Dopo la registrazione, sceglie un nome utente e riceve un bonus punti di benvenuto.

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

#### Progress Bar

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