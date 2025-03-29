/*
Creo una funzione gestisciAccesso (viene eseguita quando l'utente clicca su Accedi"). La funzione deve:
1.Prendere il nome che l'utente ha scritto nel campo di testo
2.Visualizzare un saluto personalizzato con il nome dell'utente
3.Nascondere il modulo di login e mostrare la pagina principale

Senza e.preventDefault(): 
1.L'utente inserisce il nome nel campo di testo e preme "Accedi"
2.Il modulo si invia e la pagina si ricarica, quindi tutte le modifiche fatte dalla funzione JavaScript vengono perse (non vedo la Home)
*/

// Funzione per gestire l'inserimento del nome
let gestisciAccesso = function (e) {
    e.preventDefault(); // Impedisce il ricaricamento della pagina

    let nomeUtente = document.getElementById("inputNomeUtente").value; // Prendo il valore inserito dall'utente
    document.getElementById("nomeUtente").textContent = nomeUtente; // Aggiorno il saluto personalizzato nella Home 

    // Nascondo il form e mostro la pagina principale
    formAccesso.style.display = "none"; // Nascondo il form dove l'utente ha inserito il suo nome
    paginaHome.style.display = "block"; // Imposto il display su block, l'elemento diventa visibile
}

// Associo l'evento submit alla funzione (ogni volta che l'utente clicca su Accedi, la funzione gestisciAccesso viene eseguita)
let formAccesso = document.getElementById("formAccesso");
formAccesso.addEventListener("submit", gestisciAccesso);

// Funzione per mostrare la classifica
async function mostraClassifica() {
    const tbody = document.getElementById("classifica");

        // Faccio una richiesta GET (fatta da app Bruno) al server per avere dati degli utenti
        const risposta = await fetch("http://mywebapp.ingeg.it/api.php/records/utenti?include=id_utente,nome_utente,punti&order=punti,desc");
        const dati = await risposta.json(); // Converto la risposta in formato JSON per poterla usare

        let contenuto = "";  // Definisco una variabile per il contenuto della tabella

        // Qui inizierò a scrivere il ciclo per generare la tabella...

}
// Mostro la classifica quando la pagina è caricata
document.addEventListener("DOMContentLoaded", mostraClassifica);