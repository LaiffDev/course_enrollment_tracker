# COURSE ENROLLMENT TRACKER APPLICATION

**Questa applicazione è una piattaforma web per la gestione dell’iscrizione ai corsi e il monitoraggio del tempo di studio, ispirata a un sistema di apprendimento online semplificato.**

**L’obiettivo del progetto è consentire agli studenti di consultare i corsi disponibili, iscriversi a uno o più corsi e registrare le ore di studio effettuate, permettendo così il tracciamento dei progressi rispetto alle ore previste per ciascun corso. I docenti, invece, possono creare e gestire i corsi definendone le informazioni principali, come titolo, descrizione, data di inizio e monte ore complessivo.**

**L’applicazione è composta da un frontend sviluppato in Angular e da un backend REST sviluppato in Node.js, con persistenza dei dati tramite Sqlite. La soluzione è progettata con un’architettura semplice e focalizzata sulla chiarezza del modello dati e sulla separazione delle responsabilità tra frontend e backend.**

## REQUISITI FUNZIONALI

- _AUTENTICAZIONE_
  - SignUp / Login
  - Definire ruolo degli utenti : Studente o Docente
- _STUDENTI_
  - Visualizzare l’elenco di tutti i corsi disponibili
  - Iscrizione ad uno o più corsi
  - Visualizzare i corsi a cui è iscritto
  - Accedere alla pagina personale del corso
  - Registrazione del tempo di studio
    - ore totali studiati
    - progresso rispetto alle ore previste
- _DOCENTI_
  - Creazione di nuovi corsi
  - Visualizzare i corsi creati
