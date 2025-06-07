## FAMILY HUB: PROGETTAZIONE DATABASE

### TABELLA UTENTI (entità)

Memorizza alcune informazioni base sugli utenti della mia webapp.  
Ogni utente ha un saldo che registra il totale dei punti accumulati (il campo viene aggiornato in base alle attività svolte o alle sfide completate con gli altri utenti, e può essere utilizzato per riscattare premi).  

| ATTRIBUTO        | TIPO     | VINCOLI     |
|------------------|----------|-------------|
| id_utente        | INT      | PK          |
| nome_utente      | VARCHAR  | NOT NULL    |
| password         | VARCHAR  | NOT NULL    |
| email            | VARCHAR  | UNIQUE      |
| eta              | INT      | UNSIGNED    |
| punti            | INT      | UNSIGNED    |

-----------------------------------------------------------------------

### TABELLA OBIETTIVI (entità)

Ogni obiettivo ha un nome (e può avere una descrizione con informazioni aggiuntive sull'obiettivo), una frequenza di completamento (settimanale, mensile o annuale) e un punteggio che l'utente guadagna quando lo completa. Gli obiettivi si distinguono in due tipologie: le attività (riguardano il singolo utente, vengono accettate automaticamente da sistema) e le sfide (coinvolgono due utenti, un utente sfidante offre parte dei suoi punti e chiede di fare qualcosa ad un altro utente, che può decidere se accettare/rifiutare la sfida).

| ATTRIBUTO        | TIPO     | VINCOLI                                  |
|------------------|----------|------------------------------------------|
| id_obiettivo     | INT      | PK                                       |
| nome_obiettivo   | VARCHAR  | NOT NULL                                 |
| tipo             | ENUM     | attivita/sfida                           |
| descrizione      | VARCHAR  | opzionale                                |
| frequenza        | ENUM     | settimanale/mensile/annuale              |
| punti_obiettivo  | INT      | UNSIGNED                                 |

----------------------------------------------------------------------------------

### TABELLA PARTECIPAZIONE (associazione tra UTENTI ed OBIETTIVI)

Questa tabella monitora lo stato degli obiettivi per ogni utente. Ogni volta che un utente completa un obiettivo, vengono registrati lo stato (accettato/rifiutato/completato/scaduto) e la data di completamento.
Inoltre, solo nel caso in cui viene completato, ci associo dei punti. In questo modo si traccia il progresso degli utenti nei vari obiettivi e il loro punteggio accumulato.  
La tabella tiene traccia dell'utente che deve completare l'obiettivo e di quello che ha lanciato la sfida (imposterò il valore id_utente_sfidante a **NULL** per le attività).

| ATTRIBUTO            | TIPO     | VINCOLI                                    |
|----------------------|----------|--------------------------------------------|
| id_partecipazione    | INT      | PK                                         |
| id_obiettivo         | INT      | FK                                         |
| id_utente            | INT      | FK                                         |
| id_utente_sfidante   | INT      | FK, opzionale                              |
| stato                | ENUM     | accettato/rifiutato/completato/attesa      |
| data_assegnazione    | DATE     | NOT NULL                                   |
| data_completamento   | DATE     | opzionale                                  |

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
| punti_richiesti  | INT      | UNSIGNED   |
| data_riscossione | DATE     | NOT NULL   |

**VINCOLI DI INTEGRITÀ REFERENZIALE**: Tra premi.id_utente e utenti.id_utente