/*
La funzione gestisciAccesso (eseguita quando l'utente clicca su Accedi"):

1. Impedisce che la pagina si ricarichi usando e.preventDefault(), altrimenti non vedrei la Home
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
            caricaAttivitaSettimanali(data.id_utente);

            // Aggiungo l'event listener al bottone "Aggiungi Premio" con l'ID utente
            document.querySelector("#btnAggiungiPremio").addEventListener("click", function(e) {
                e.preventDefault();
                aggiungiPremio(data.id_utente);
            });

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
            listaPremiDaRiscattare.innerHTML = "<li class='list-group-item orange text-center'>Nessun premio da riscattare</li>";
        }

        // Mostro i premi riscossi, se presenti
        if (datiPremiRiscossi.records.length > 0) {
            for (let i = 0; i < datiPremiRiscossi.records.length; i++) {
                let premio = datiPremiRiscossi.records[i];
                // Aggiungo un premio riscosso nella lista
                listaPremiRiscossi.innerHTML += 
                    "<li class='list-group-item'>" +
                    "<span>" + premio.nome_premio + " - " + premio.punti_richiesti + " punti - " + formattaData(premio.data_riscossione) + "</span>"
                    "</li>";
            }
        } else {
            listaPremiRiscossi.innerHTML = "<li id='nessunPremio' class='list-group-item orange text-center'>Nessun premio riscosso</li>";;
        }

        // Aggiungo l'evento di clic per il riscatto dei premi
        const bottoniRiscatta = document.querySelectorAll('.riscatta-btn');
        bottoniRiscatta.forEach(function(button) {
            // Modifico direttamente lo stile del bottone
            button.style.fontSize = '14px';
            button.style.padding = '5px 10px';
            button.style.marginLeft = '10px'; 

            // Aggiungo un listener per gestire il click sul bottone
            button.addEventListener('click', function(event) {
                // Recupero le informazioni associate al premio selezionato (dagli attributi "data")
                const idPremio = event.target.getAttribute('data-id'); // ID del premio nel database
                const puntiRichiesti = parseInt(event.target.getAttribute('data-punti')); // Punti necessari per riscattarlo
                const nomePremio = event.target.getAttribute('data-nome'); // Nome del premio

                // Recupero i punti attuali dell'utente e il suo nome
                const puntiAttuali = parseInt(puntiTotali.textContent);
                const nomeUtente = document.querySelector("#nomeUtente").textContent;

                // Controllo se l'utente ha abbastanza punti per riscattare il premio
                if (puntiAttuali < puntiRichiesti) {
                    alert("Non hai abbastanza punti per riscattare questo premio.");
                    return; // Interrompo la funzione se non ha abbastanza punti
                }

                // Se i punti sono sufficienti, chiamo la funzione per il riscatto del premio
                riscattaPremio(idUtente, idPremio, nomePremio, puntiRichiesti, nomeUtente);
            });

        });

    } catch (errore) {
        // In caso di errore, mostro un messaggio di errore
        listaPremiDaRiscattare.innerHTML = "<li class='list-group-item text-danger'>Errore nel caricamento dei premi da riscattare</li>";
        listaPremiRiscossi.innerHTML = "<li class='list-group-item text-danger'>Errore nel caricamento dei premi riscossi</li>";
    }
}

// Funzione per formattare la data (viene passta in formato ISO e la converto in formato gg/mm/aaaa)
function formattaData(dataISO) {
    let parti = dataISO.split("-");
    let giorno = parti[2];
    let mese = parti[1];
    let anno = parti[0];
    return giorno + "/" + mese + "/" + anno;
}

// Funzione per mostrare i punti totali dell'utente nella Home
function mostraPunti(punti) {
    document.querySelector("#puntiTotali").textContent = punti;
}

/*
La funzione riscattaPremio (eseguita quando l’utente clicca su "Riscatta"):

1. Aggiorna il premio nel database impostando la data di riscossione (PUT)
2. Aggiorna i punti dell'utente nel database (PUT)
3. Aggiorna l'interfaccia utente
4. Mostra un messaggio di conferma all’utente con il nome e il costo del premio
5. Ricarica le sezioni premi e classifica per riflettere le modifiche
6. Se qualcosa va storto, mostra un messaggio di errore all’utente...
*/

// Funzione per gestire il riscatto di un premio
async function riscattaPremio(idUtente, idPremio, nomePremio, puntiRichiesti, nomeUtente) {
    try {
        // Invio una richiesta al server per aggiornare il premio selezionato
        const urlPremio = 'api.php/records/premi/' + idPremio;
        const rispostaPremio = await fetch(urlPremio, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data_riscossione: new Date().toISOString().split('T')[0] // Imposto la data di riscossione al giorno corrente
            })
        });

        // Se il server risponde con un errore, interrompo l'esecuzione
        if (!rispostaPremio.ok) throw new Error("Errore nell'aggiornamento del premio");

        // Informo l’utente che il riscatto è avvenuto correttamente con un messaggio di conferma
        alert("Hai riscattato il premio: " + nomePremio + " per " + puntiRichiesti + " punti");
        
        // Aggiorno l’interfaccia utente per mostrare i cambiamenti...
        await mostraPremiUtente(idUtente); // Aggiorno la lista dei premi disponibili per l’utente
        await mostraClassifica(nomeUtente); // Aggiorno la classifica generale

    // Se qualcosa va storto durante il riscatto del premio, mostro un messaggio di errore
    } catch (errore) {
        alert("Si è verificato un errore durante il riscatto del premio. Riprova più tardi.");
    }
}

/* 
La funzione aggiungiPremio (eseguita quando l'utente clicca su "Aggiungi Premio"):

1. Mostra due input all'utente che deve inserire nome del premio e punti richiesti per riscattarlo
2. Verifica che i campi siano validi
3. Invia una richiesta POST al server per creare il nuovo premio
4. Se la creazione ha successo, aggiorna la lista dei premi
*/

// Funzione per gestire l'aggiunta di un nuovo premio
async function aggiungiPremio(idUtente) {
    // Chiedo all'utente di inserire i dettagli del premio
    const nomePremio = prompt("Inserisci il nome del premio:");
    if (!nomePremio) return; // Se l'utente annulla, interrompo la funzione

    const puntiRichiesti = prompt("Inserisci i punti richiesti per questo premio:");
    if (!puntiRichiesti || isNaN(puntiRichiesti)) {
        alert("Devi inserire un numero valido per i punti richiesti!");
        return; // Se l'utente non inserisce un numero, interrompo la funzione
    }

    try {
        // PUT request per aggiungere il premio
        const url = 'api.php/records/premi';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_utente: idUtente,
                nome_premio: nomePremio,
                punti_richiesti: parseInt(puntiRichiesti),
                data_riscossione: null
            })
        };

        // Invio la richiesta al server
        const response = await fetch(url, options);
        
        if (response.ok) {
            // Se la risposta è positiva, aggiorno la lista dei premi
            alert("Premio aggiunto con successo!");
            mostraPremiUtente(idUtente);
        } else { 
            // Altrimenti, mostro un messaggio di errore
            throw new Error("Errore durante l'aggiunta del premio"); 
        }
    } catch (errore) {
        alert("Si è verificato un errore durante l'aggiunta del premio. Riprova più tardi.");
        console.error(errore);
    }
}

// Funzione per caricare le attività settimanali dell'utente
async function caricaAttivitaSettimanali(idUtente) {
    try {
        const url = 'api.php/records/partecipazioneobiettivi?' +
                    'filter=tipo,eq,attivita' +
                    '&filter=frequenza,eq,settimanale' +
                    '&filter=stato,eq,accettato' +
                    '&filter=id_utente,eq,' + idUtente;

        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Errore nel caricamento');
        
        const data = await response.json();
        const lista = document.getElementById('listaAttivitaSettimanali');
        
        lista.innerHTML = ''; // Svuoto la lista prima di aggiungere nuovi elementi

        if (data.records && data.records.length > 0) { // Controllo se ci sono attività settimanali
            data.records.forEach(obiettivo => {
                const item = document.createElement('li');
                item.className = 'list-group-item'; // Aggiungo la classe per lo stile della lista
                
                // Formattazione semplice "nome - punti"
                const nome = obiettivo.nome_obiettivo || 'Attività'; // Nome dell'obiettivo, se non presente uso "Attività" 
                const punti = obiettivo.punti || 0; // Se non ci sono punti, metto 0
                item.textContent = nome + ' - ' + punti + ' punti';              
                lista.appendChild(item); // Aggiungo l'elemento alla lista
            });

        } else { // Se non ci sono attività settimanali, mostro un messaggio all'utente
            lista.innerHTML = '<li class="list-group-item orange text-center">Nessuna attività settimanale</li>';
        }
        lista.style.marginTop = '16px'; // Aggiungo spazio sopra la lista (come fatto per i premi)
        
    } catch (error) {
        document.getElementById('listaAttivitaSettimanali').innerHTML = 
            '<li class="list-group-item text-danger">Errore nel caricamento</li>'; 
    }
}