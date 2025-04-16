/*
La funzione gestisciAccesso (eseguita quando l'utente clicca su Accedi"):
1.Prende il nome che l'utente ha scritto nel campo di testo
2.Visualizza un saluto personalizzato con il nome dell'utente
3.Nasconde il modulo di login e mostra la pagina principale
Senza e.preventDefault(): 
1.L'utente inserisce il nome nel campo di testo e preme "Accedi"
2.Il modulo si invia e la pagina si ricarica, quindi tutte le modifiche fatte dalla funzione JavaScript vengono perse (non vedo la Home)
*/

// Funzione per gestire l'inserimento del nome
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
            mostraClassifica(); // Mostro la classifica aggiornata
            document.querySelector("#nomeUtente").textContent = nomeUtente; // Saluto personalizzato
            formAccesso.style.display = "none"; // Nascondo il form di login
            paginaHome.style.display = "block"; // Mostro la home page
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
La funzione mostraClassifica: 
1.Fa una richiesta al server per ottenere la classifica degli utenti
2.Converte la risposta in formato JSON per poterla usare
3.Crea dinamicamente le righe della tabella, aggiungendo posizione, nome e punti di ogni utente
4.Aggiorna il contenuto della tabella con i dati ottenuti quando la pagina è caricata
P.S. Ho inserito un try-catch per gestire possivili errori durante la richiesta al server
*/

// Funzione per mostrare la classifica
async function mostraClassifica() { // Asincrona perché faccio una richiesta al server e devo attendere la risposta...
    const tbody = document.querySelector("#classifica");

    try {
        // Faccio una richiesta GET (fatta da app Bruno) al server per avere dati degli utenti
        const risposta = await fetch("api.php/records/utenti?include=id_utente,nome_utente,punti&order=punti,desc");
        const dati = await risposta.json(); // Converto la risposta in formato JSON per poterla usare

        let contenuto = "";  // Definisco una variabile per il contenuto della tabella
        // Ciclo for su tutti gli utenti che ho in classifica
        for (let i = 0; i < dati.records.length; i++) {
            const utente = dati.records[i]; // Prendo l'utente corrente

            // Creo una riga della tabella con i dati dell'utente corrente (posizione, nome, punti)
            contenuto += "<tr>" +
                "<td>" + (i + 1) + "</td>" + // Mostro la posizione in classifica (i+1 perché le posizioni partono da 1, non da 0)
                "<td>" + utente.nome_utente + "</td>" + // Mostro il nome utente
                "<td>" + utente.punti + "</td>" + // Mostro i punti dell'utente
            "</tr>";
        }
        tbody.innerHTML = contenuto; // Aggiorno il contenuto della tabella con i dati degli utenti

    } catch (errore) {
        // Se qualcosa va storto, mostro un messaggio di errore nella tabella
        tbody.innerHTML = "<tr><td colspan='3' class='text-danger'>Errore nel caricamento</td></tr>";
    }
}