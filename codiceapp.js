/*
Creo una funzione gestisciAccesso (viene eseguita quando l'utente clicca su Accedi"). La funzione deve:
1.Prendere il nome che l'utente ha scritto nel campo di testo.
2.Visualizzare un saluto personalizzato con il nome dell'utente.
3.Nascondere il modulo di login e mostrare la pagina principale.
*/

// Funzione per gestire l'inserimento del nome
let gestisciAccesso = function (e) {

    let nomeUtente = document.getElementById("inputNomeUtente"); // Prendo il valore inserito dall'utente
    document.getElementById("nomeUtente").textContent = nomeUtente; // Aggiorno il saluto personalizzato nella Home 
}