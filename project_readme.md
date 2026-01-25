# **Sistema di Gestione Iscrizioni ai Corsi**

## Descrizione

Il progetto consiste nello sviluppo di un sistema per la gestione delle iscrizioni ai corsi di formazione, progettato per due tipologie di utenti: studenti e istruttori.

Gli studenti possono visualizzare i corsi disponibili, consultare i dettagli, iscriversi e monitorare le ore di frequenza attraverso una pagina personale. Gli istruttori possono creare nuovi corsi e controllare l’elenco dei corsi da loro creati, insieme al numero di iscritti.

Il sistema è organizzato in due cartelle principali: backend e frontend, che operano in modo indipendente, garantendo una chiara separazione delle responsabilità.

**_Tecnologie utilizzate_**

Frontend: Angular

Backend: Node.js

Database: SQLite

Autenticazione: JWT

## Configurazione .env per il backend

Prima di avviare il backend, creare un file .env nella cartella backend con le seguenti variabili:

`JWT_SECRET= il_tuo_token`
`DB_PATH=database/courseDb.sqlite`
`PORT=9393`

### Avvio del Backend

Posizionarsi nella cartella backend

Installare le dipendenze:
`npm install`

Avviare il server:
`npm run dev`

### Avvio del Frontend

Posizionarsi nella cartella frontend

Avviare l’applicazione Angular:
`ng serve --open`
