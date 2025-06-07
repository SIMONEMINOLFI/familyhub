## FAMILY HUB - L'APP PER ORGANIZZARE LE TUE ATTIVITÀ E SFIDE FAMILIARI

### Elevator Pitch

Family Hub è l'app che trasforma la gestione delle tue attività in un'esperienza unica e coinvolgente. Dimentica liste di cose da fare noiose e inconcludenti: con Family Hub puoi tenere traccia delle tue attività settimanali, mensili o annuali, completarle con facilità e vedere i tuoi progressi in tempo reale. Ma non è solo una semplice to-do list: puoi anche lanciare sfide, accumulare punti e scalare la classifica familiare, rendendo ogni attività più stimolante.  
E con il sistema di premi, ogni compito portato a termine diventa una piccola vittoria!  
Family Hub è il modo più smart per gestire i tuoi impegni e divertirti in famiglia 😊

### Istruzioni Di Setup (per replicare il progetto)

- Clonare la repository del progetto (git clone *URL repository*)
- Configurare su MAMP - Preferences - Web Server la propria Document Root ed avviare il server
- Creare un database *myfamilyhub* su phpmyadmin
- Importare il file *myfamilyhub.sql*
- Aprire il file *api.php* e configurare l'accesso al database modificando i dettagli di accesso (host, username, password, nome del database) in base al proprio ambiente
- Aprire la webapp nel browser cliccando sul file *index.html*

### Credenziali di Test (per il login)

Ecco alcuni utenti preconfigurati per testare l'app:

- nome_utente: "Anna" | password: "ciao123" | hash: "$2y$10$vs8cRPiDyLKzlwUxBNSZueMuobFV2MqlmIqDvfoM613iqrzylKUOO"

- nome_utente: "Mario" | password: "mariobros83" | hash: "$2y$10$rAiKpMoWNUryOO6.ikOFA.lirGpruzNv19B6s3BPleNVtxxYwawFS"

- nome_utente: "Luigi" | password: "loveTravelling*" | hash: "$2y$10$IbJlF4q12KkhNEMm4zmGhu0QWrGGXUd/5NKk5URjrZBAYOnkgeqIe"

### Autenticazione

Ho usato il middleware di autenticazione 'dbAuth' basato su database, che rende il mio sistema protetto da login
ed aggiunge 3 endpoint automaticamente:

- POST /login: Per accedere (con verifica username/password)
- POST /logout: Per uscire
- GET /me: Per ottenere i dati dell'utente loggato

Il nome utente deve essere preciso case-sensitive (ho inserito Collation utf8_bin per renderlo tale)

La password è già case-sensitive perchè il middleware dbAuth di php-crud-api usa password_verify() per controllare la password dell'utente in login.    
E password_verify() è case-sensitive