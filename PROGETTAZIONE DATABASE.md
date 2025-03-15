## FAMILY HUB: PROGETTAZIONE DATABASE

### TABELLA UTENTI (entità)
Memorizza alcune informazioni base sugli utenti della mia webapp.  
Ogni utente ha un saldo che registra il totale dei punti accumulati (il campo viene aggiornato in base alle attività svolte ed alle sfide completate con gli altri utenti e può essere utilizzato per riscattare premi).  
Potrei impostare di default questo campo ad un valore indicativo di punti piuttosto che a 0 (una sorta di bonus di benvenuto per incentivare l'utente ad utilizzare l'app).  
Il campo ultimo_accesso consente di registrare l'ultimo giorno di accesso dell'utente (eventualmente per l'assegnazione di punti bonus per il login quotidiano).

| ATTRIBUTO        | TIPO     | VINCOLI     |
|------------------|----------|-------------|
| id_utente        | INT      | PK          |
| nome_utente      | VARCHAR  | NOT NULL    |
| password         | VARCHAR  | NOT NULL    |
| email            | VARCHAR  | UNIQUE      |
| età              | INT      | > 0         |
| punti            | INT      | >= 0        |
| ultimo_accesso   | DATE     | NOT NULL    |

-----------------------------------------------------------------------

### TABELLA OBIETTIVI (entità)
Ogni obiettivo ha una descrizione, una frequenza di completamento (settimanale, mensile, annuale o occasionale) e un punteggio che l'utente guadagna quando lo completa. Gli obiettivi si distinguono in due tipologie: le attività (riguardano il singolo utente, vengono accettate automaticamente da sistema) e le sfide (coinvolgono due utenti, un utente sfidante offre parte dei suoi punti e chiede di fare qualcosa ad un altro utente, che può decidere se accettare/rifiutare la sfida).

| ATTRIBUTO        | TIPO     | VINCOLI                                  |
|------------------|----------|------------------------------------------|
| id_obiettivo     | INT      | PK                                       |
| nome_obiettivo   | VARCHAR  | NOT NULL                                 |
| tipo             | ENUM     | attività/sfida                           |
| descrizione      | VARCHAR  | opzionale                                |
| frequenza        | ENUM     | settimanale/mensile/annuale/occasionale  |
| punti_obiettivo  | INT      | > 0                                      |

----------------------------------------------------------------------------------

### TABELLA PARTECIPAZIONE (associazione tra UTENTI ed OBIETTIVI)
Questa tabella monitora lo stato degli obiettivi per ogni utente. Ogni volta che un utente completa un obiettivo, vengono registrati lo stato (accettato/rifiutato/completato/scaduto) e la data di completamento.
Inoltre, solo nel caso in cui viene completato, ci associo dei punti. In questo modo si traccia il progresso degli utenti nei vari obiettivi e il loro punteggio accumulato.  
Pur avendo già punti_obiettivo nella tabella **OBIETTIVI**, che rappresenta il valore fisso dei punti associati a un obiettivo, devo avere anche punti_assegnati nella tabella **PARTECIPAZIONE**, in modo che se una sfida aveva valore 5 punti ma è scaduta oppure è stata rifiutata dall'utente, punti_assegnati potrà essere impostato a 0, anche se l'obiettivo ha un
valore in punti_obiettivo.  
In questo modo, escludo questi punti dal totale dell'utente senza modificare il valore dell'obiettivo.  
La tabella tiene traccia dell\'utente che deve completare l'obiettivo e di quello che ha lanciato la sfida (imposterò il valore id_utente_sfidante a **NULL** per le attività).

| ATTRIBUTO            | TIPO     | VINCOLI                                    |
|----------------------|----------|--------------------------------------------|
| id_partecipazione    | INT      | PK                                         |
| id_obiettivo         | INT      | FK                                         |
| id_utente            | INT      | FK                                         |
| id_utente_sfidante   | INT      | FK, opzionale                              |
| stato                | ENUM     | accettato/rifiutato/completato/scaduto     |
| data_assegnazione    | DATE     | NOT NULL                                   |
| data_completamento   | DATE     | opzionale                                  |
| punti_assegnati      | INT      | >= 0                                       |

**VINCOLI DI INTEGRITÀ REFERENZIALE**: Tra partecipazione.id_obiettivo e obiettivi.id_obiettivo

**VINCOLI DI INTEGRITÀ REFERENZIALE**: Tra partecipazione.id_utente e utenti.id_utente

**VINCOLI DI INTEGRITÀ REFERENZIALE**: Tra partecipazione.id_utente_sfidante e utenti.id_utente_sfidante

-----------------------------------------------------------------------------------

### TABELLA PREMI (entità)  
Tabella dei premi che possono essere riscattati dagli utenti (Ogni premio è univoco e NON può essere riscattato da più utenti, per questa ragione id_premio è sufficiente come PK).  
Con il campo punti_richiesti indico il numero di punti necessari a riscattare quel premio.

| ATTRIBUTO        | TIPO     | VINCOLI    |
|------------------|----------|------------|
| id_premio        | INT      | PK         |
| id_utente        | INT      | FK         |
| nome_premio      | VARCHAR  | NOT NULL   |
| punti_richiesti  | INT      | > 0        |
| data_riscossione | DATE     | NOT NULL   |

**VINCOLI DI INTEGRITÀ REFERENZIALE**: Tra riscossione.id_utente e utenti.id_utente

-----------------------------------------------------------------------

### INTERFACCIA UTENTE

- Saluto all'utente (es. Ciao Simone!)

- Sfondo azzurro molto chiaro oppure giallo chiaro in stile "Note"

- IN ALTO scritta Family Hub, casella rotonda nome utente

- Barra di avanzamento punti (eventualmente con percentuale di completamento delle attività/sfide)

- Barra con percentuale di avanzamento delle attività a seconda della frequenza (ad esempio quale percentuale di attività/sfide settimanali è stata svolta?)

- Tabella obiettivi con distinzione in sfide (accettate e in attesa) e attività (accettate in automatico)

- Tabella Premi (riscossi e da riscuotere per motivare l'utente, il tasto "riscuoti premio" dispone dei punti necessari a richiederlo)

- Tabella Punteggi ASSOLUTI (con classifica associata ed eventuale possibilità di filtrare per intervalli di tempo (settimanale, mensile, annuale)).