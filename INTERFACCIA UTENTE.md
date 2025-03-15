# FAMILY HUB - SPECIFICHE DELL' INTERFACCIA UTENTE

### Funzionalità dell'Interfaccia Utente

- [ ] Login form utente (l'utente accede all'app e viene visualizzata la homepage)

- [ ] Progress Bar per gli Obiettivi

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

Gli obiettivi sono suddivisi prima per **frequenza**
(settimanali/mensili/annuali/occasionali), poi ogni tabella (ad es. obiettivi settimanali) sarà distinta per **tipologia** in due liste (potrei anche inserire in modo OPZIONALE un'unica lista **Tutti** che permette di visualizzare tutti gli obiettivi di una categoria senza distinzione tra attività e sfide):

-   **Attività** (da completare/completate)

-   **Sfide** (da completare/completate)

Cliccando su attività o su sfide mostro di default prima gli obiettivi da completare, poi avrò un pulsante per aggiornare lo stato del mio obiettivo (ad esempio "Segna come completato").  
Gli obiettivi completati e da completare hanno due colori diversi.  
Gli obiettivi scaduti o le sfide rifiutate non vengono visualizzati...

Inserisco una Progress Bar che mostra la percentuale di completamento degli obiettivi in base alla loro frequenza (settimanale, mensile, annuale).   
Quindi avrò 3 diverse progress bar, che cambiano di colore in
base alla percentuale di caricamento (Bootstrap).

### Funzionalità Grafiche da Implementare (con Bootstrap)

- Tables → Per la classifica utenti e la gestione dei premi.

- Modals → Per mostrare dettagli o conferme di azioni.

- Progress Bar → Per visualizzare i progressi degli obiettivi e i punti per riscattare premi.

- Forms → Per il login e la registrazione dell'utente.

- Select Form → Per scegliere un utente a cui lanciare una sfida.

- Checkbox → Per il completamento di attività e sfide.

- Buttons → Per accettare/rifiutare sfide (opzionale).

- Spinners → Per il caricamento delle pagine.

- Accordion → Per nascondere o mostrare sezioni (es. premi disponibili).