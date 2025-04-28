/*
La funzione gestisciAccesso (eseguita quando l'utente clicca su Accedi"):

1. Impedisce che la pagina si ricarichi usando e.preventDefault(), altrimenti non vdrei la Home
2. Recupera il nome utente e la password inseriti dall'utente
3. Invia una richiesta POST al server per verificare se le credenziali sono corrette
4. Se il login ha successo: 
    - Mostra la Home page (e nasconde la form di accesso)
    - Mostra un saluto personalizzato con il nome dell’utente
    - Mostra la classifica aggiornata
5. Se il login fallisce (credenziali errate), mostra un messaggio specifico di errore
6. Se c’è un problema tecnico (es. server non raggiungibile), mostra un messaggio di errore generico
*/

// Funzione per gestire il login utente
async function gestisciAccesso(e) {
    e.preventDefault(); // Impedisce il ricaricamento della pagina

    // Recupero i valori inseriti dall'utente
    let nomeUtente = document.querySelector("#inputNomeUtente").value; // Prendo il nome utente inserito dall'utente
    let password = document.querySelector("#inputPassword").value; // Prendo la password inserita dall'utente

    // Configurazione della richiesta API
    const url = 'api.php/login';
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' }, // Specifico che stiamo inviando JSON
        body: JSON.stringify({username: nomeUtente, password: password}) // Converto l'oggetto in stringa JSON
    };

    try {
        // Invio la richiesta al server e attendo la risposta
        const response = await fetch(url, options);
    
        // Controllo se la risposta è OK (codice 200)
        if (response.status === 200) {
            const data = await response.json(); // Converto la risposta in json solo se tutto ok
    
            // Operazioni da eseguire dopo il login riuscito
            let paginaHome = document.querySelector("#paginaHome"); // Seleziono la Home page (la mostro dopo il login)
            mostraClassifica(nomeUtente); // Mostro la classifica aggiornata 
            document.querySelector("#nomeUtente").textContent = nomeUtente; // Saluto personalizzato
            formAccesso.style.display = "none"; // Nascondo il form di login
            paginaHome.style.display = "block"; // Mostro la home page
            mostraPremiUtente(data.id_utente); // Mostro i premi dell'utente

        } else {
            // Se il server non risponde con 200 (login fallito) mostro un messaggio di errore
            alert("Credenziali errate! Riprova.");
        }
    
    } catch (error) {
        // Gestione degli errori in caso di problemi con la richiesta
        alert("Si è verificato un errore durante l'accesso. Riprova più tardi.");
    }
}

let formAccesso = document.querySelector("#formAccesso"); // Seleziono la form di accesso
formAccesso.addEventListener("submit", gestisciAccesso); // Quando l'utente clicca su "Accedi", viene eseguita funzione gestisciAccesso

/*
La funzione gestisciLogout (eseguita quando l'utente clicca su "Logout"):

1. Impedisce il ricaricamento della pagina usando e.preventDefault()
2. Invia una richiesta POST al server per terminare la sessione dell’utente
3. Se il logout va a buon fine:
   - Nasconde la pagina Home
   - Riporta l’utente alla schermata di login mostrando il form
4. Se qualcosa va storto mostra un messaggio di errore
*/


// Funzione per gestire il logout utente
async function gestisciLogout(e) {
    e.preventDefault();

    try {
        const url = 'api.php/logout';
        await fetch(url, { method: 'POST' });

        // Nascondo la pagina Home e torno al login
        document.querySelector("#paginaHome").style.display = "none";
        formAccesso.style.display = "flex"; // Mostro la form di accesso
        
    } catch (error) {
        alert("Errore durante il logout! Riprova.");
    }
}

let boxLogout = document.querySelector("#boxLogout");
boxLogout.addEventListener("click", gestisciLogout);

/*
La funzione mostraClassifica: 

1. Fa una richiesta al server per ottenere la classifica degli utenti
2. Converte la risposta in formato JSON per poterla usare
3. Crea dinamicamente le righe della tabella, aggiungendo posizione, nome e punti di ogni utente
4. Controlla se l'utente corrente è quello loggato e, in tal caso, salva i suoi punti nella Home
5. Gestisce eventuali errori tramite un blocco try-catch, mostrando un messaggio nella tabella
*/

// Funzione per mostrare la classifica
async function mostraClassifica(nomeLoginUtente) { 
    const tbody = document.querySelector("#classifica");

    try {
        // Faccio una richiesta GET (fatta da app Bruno) al server per avere dati degli utenti
        const risposta = await fetch("api.php/records/utenti?include=id_utente,nome_utente,punti&order=punti,desc");
        const dati = await risposta.json(); // Converto la risposta in formato JSON per poterla usare

        let contenuto = ""; // Definisco una variabile per il contenuto della tabella
        let puntiUtente = 0; // Inizializzo variabile per memorizzare i punti dell’utente loggato (nomeLoginUtente)

        // Ciclo for su tutti gli utenti che ho in classifica
        for (let i = 0; i < dati.records.length; i++) {
            const utente = dati.records[i]; // Prendo l'utente corrente

            contenuto += "<tr>" +
                "<td>" + (i + 1) + "</td>" + // Mostro la posizione in classifica (i+1 perché le posizioni partono da 1, non da 0)
                "<td>" + utente.nome_utente + "</td>" + // Mostro il nome utente
                "<td>" + utente.punti + "</td>" + // Mostro i punti dell'utente
            "</tr>";

            // Se è l'utente loggato, aggiorno i suoi punti nella Home
            if (utente.nome_utente === nomeLoginUtente) {
                puntiUtente = utente.punti;
            }
        }

        tbody.innerHTML = contenuto; // Aggiorno il contenuto della tabella con i dati degli utenti

        // Mostro i punti dell'utente loggato nella Home
        mostraPunti(puntiUtente); 

    } catch (errore) {
        // Se qualcosa va storto, mostro un messaggio di errore nella tabella
        tbody.innerHTML = "<tr><td colspan='3' class='text-danger'>Errore nel caricamento</td></tr>";
    }
}

/* 
La funzione mostraPremiUtente (eseguita quando l'utente accede alla Home):

1. Recupera i premi riscossi e da riscattare per l'utente che si è loggato (idUtente) usando due chiamate distinte al server:
   - Una chiamata per ottenere i premi riscossi
   - Una chiamata per ottenere i premi da riscattare   
2. Mostra i premi in due liste separate:
   - La lista dei premi da riscattare viene popolata con i premi disponibili, ognuno accompagnato da un pulsante per il riscatto
   - La lista dei premi riscossi viene popolata con i premi che l'utente ha già riscattato, con l'indicazione della data di riscossione
3. Se non ci sono premi in una delle due categorie, viene mostrato un messaggio specifico per ciascuna listaa
4. In caso di errore nelle richieste, vengono mostrati messaggi di errore per ciascuna lista...
*/

// Funzione per mostrare i premi dell'utente
async function mostraPremiUtente(idUtente) { // idUtente è l'id dell'utente loggato (preso dalla risposta del login)  
    // Seleziono gli elementi HTML dove mostrerò i premi riscossi, i premi da riscattare e i punti totali
    const listaPremiDaRiscattare = document.querySelector("#listaPremiDaRiscattare");
    const listaPremiRiscossi = document.querySelector("#listaPremiRiscossi");
    const puntiTotali = document.querySelector("#puntiTotali");

    try {
        // Faccio la richiesta per ottenere i premi riscossi
        const rispostaPremiRiscossi = await fetch("api.php/records/premi?filter=data_riscossione,neq,null&filter=id_utente,eq," + idUtente);
        const datiPremiRiscossi = await rispostaPremiRiscossi.json();

        // Faccio la richiesta per ottenere i premi da riscattare
        const rispostaPremiDaRiscattare = await fetch("api.php/records/premi?filter=data_riscossione,is,null&filter=id_utente,eq," + idUtente);
        const datiPremiDaRiscattare = await rispostaPremiDaRiscattare.json();

        // Svuoto le due liste prima di aggiungere i nuovi premi
        listaPremiDaRiscattare.innerHTML = "";
        listaPremiRiscossi.innerHTML = "";

        // Mostro i premi da riscattare, se presenti
        if (datiPremiDaRiscattare.records.length > 0) {
            for (let i = 0; i < datiPremiDaRiscattare.records.length; i++) {
                let premio = datiPremiDaRiscattare.records[i];
                // Aggiungo un premio da riscattare nella lista
                listaPremiDaRiscattare.innerHTML += 
                    "<li class='list-group-item'>" +
                    "<span>" + premio.nome_premio + " - " + premio.punti_richiesti + " punti</span>" +
                    "<button class='btn btn-primary riscatta-btn' data-id='" + premio.id_premio + "' data-punti='" + premio.punti_richiesti + "' data-nome='" + premio.nome_premio + "'>Riscatta</button>" +
                    "</li>";
            }
        } else {
            listaPremiDaRiscattare.innerHTML = "<li class='list-group-item text-warning text-center'>Nessun premio da riscattare</li>";
        }

        // Mostro i premi riscossi, se presenti
        if (datiPremiRiscossi.records.length > 0) {
            for (let i = 0; i < datiPremiRiscossi.records.length; i++) {
                let premio = datiPremiRiscossi.records[i];
                // Aggiungo un premio riscosso nella lista
                listaPremiRiscossi.innerHTML += 
                    "<li class='list-group-item'>" +
                    "<span>" + premio.nome_premio + " - " + premio.punti_riscossi + " punti - " + premio.data_riscossione + "</span>" +
                    "</li>";
            }
        } else {
            listaPremiRiscossi.innerHTML = "<li id='nessunPremio' class='list-group-item text-warning text-center'>Nessun premio riscosso</li>";;
        }

        // Aggiungo l'evento di clic per il riscatto dei premi
        const bottoniRiscatta = document.querySelectorAll('.riscatta-btn');
        bottoniRiscatta.forEach(function(button) {
            // Modifico direttamente lo stile del bottone (poi metteròò nel CSS...)
            button.style.fontSize = '14px';
            button.style.padding = '5px 10px';
            button.style.marginLeft = '10px'; // Distanzio a sinistra il bottone

            button.addEventListener('click', function(event) {
                // Ottengo i dati del premio da riscattare
                const puntiRichiesti = parseInt(event.target.getAttribute('data-punti')); // parseint converte i punti in numero
                const nomePremio = event.target.getAttribute('data-nome'); //getAttribute legge valore attibuto nome_premio 

                // Aggiorno i punti dell'utente
                let puntiUtente = parseInt(puntiTotali.textContent); // Ottengo i punti attuali dell'utente
                puntiUtente = puntiUtente - puntiRichiesti; 
                mostraPunti(puntiUtente);

                // Rimuovo il premio dalla lista dei premi da riscattare
                // .closest trova il più vicino genitore <li> dell'elemento cliccato, poi lo rimuovo con .remove()
                event.target.closest('li').remove(); 

                // Aggiungo il premio alla lista dei premi riscossi
                const dataRiscatto = new Date().toLocaleDateString(); // prendo la data attuale come data di riscossione
                listaPremiRiscossi.innerHTML += 
                    "<li class='list-group-item'>" +
                    "<span>" + nomePremio + " - " + puntiRichiesti + " punti - " + dataRiscatto + "</span>" +
                    "</li>";

                // Se non ci sono più premi da riscattare, mostro il messaggio "Nessun premio da riscattare"
                if (listaPremiDaRiscattare.innerHTML.trim() === "") {
                    listaPremiDaRiscattare.innerHTML = "<li class='list-group-item text-warning text-center'>Nessun premio da riscattare</li>";
                }

                // Se non ci sono più premi riscossi, non mostrare la scritta "Nessun premio riscosso"
                const messaggioVuoto = document.getElementById('nessunPremio');
                if (messaggioVuoto) {
                    messaggioVuoto.remove();
                }

                // Mostro un messaggio di conferma per il riscatto
                alert("Hai riscattato il premio: " + nomePremio);
            });
        });

    } catch (errore) {
        // In caso di errore, mostro un messaggio di errore
        listaPremiDaRiscattare.innerHTML = "<li class='list-group-item text-danger'>Errore nel caricamento dei premi da riscattare</li>";
        listaPremiRiscossi.innerHTML = "<li class='list-group-item text-danger'>Errore nel caricamento dei premi riscossi</li>";
    }
}

// Funzione per mostrare i punti totali dell'utente nella Home
function mostraPunti(punti) {
    document.querySelector("#puntiTotali").textContent = punti;
}

// Funzione per mostrare i premi dell'utente
async function riscattaPremiUtente(idUtente, idPremio) {
    const url = 'http://mywebapp.ingeg.it/api.php/records/premi' + idPremio;
const options = {
  method: 'PUT',
  headers: {'content-type': 'application/json'},
  body: '{"data_riscossione":"2025-03-29"}'
};


    mostraPremiUtente(idUtente); 
    mostraClassifica(nomeUtente); 
    mostraPunti(puntiUtente);
}