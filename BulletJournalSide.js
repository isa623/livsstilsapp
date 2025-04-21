function setup() {
    noCanvas(); // Jeg tegner ikke nogle ting derfor er det ikke nødvendig med et canvas

    // journal Data
    journalData = [] // array til journal data 

    // Hent brugernavn fra localStorage (Her skal brugern være, at brugeren er logget ind)
    let brugerNavn = localStorage.getItem('aktivBruger');

    // Opret overskrift for den aktive brugers journal
    let overskrift = createElement('h2', 'Journal for ' + brugerNavn);
    overskrift.style('text-align', 'center');

    // Opret inputfelt til at skrive journal data
    let input = createInput().attribute('placeholder', 'Tilføj journal');
    input.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '300px');
    // Opretter knap til at tilføje journal data 
    let addKnap = createButton('Tilføj');
    addKnap.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '320px');

    // Tilføj journal til journalen
    addKnap.mousePressed(() => {
        let dato = hentDato(); // Henter dato streng
        let journal = input.value(); // Henter tekst fra input felt
        // Tjekker om der er skrevt en journal tekst
        if (journal) {
            journalData.push({ dato, journal });// Tilføjer dato og journal tekst objekt bægerest i arrayt 
            gemILocalStorage();
            opdaterJournal();
            input.value('');// Nulstiller inputsfelt
        }
    });

    function hentDato() {
        //Retuner dags dato med tidspunkt som streng
        return 'Dato: ' + day() + '/' + month() + '/' + year() + ', ' + hour() + ':' + minute() + ':' + second();
    }

    // Container til at vise journalen
    let journalContainer = createDiv();
    journalContainer.style('margin', '20px auto').style('width', '550px');

    // Funktion til at opdatere journalen
    function opdaterJournal() {
        overskrift.html('Journal for ' + brugerNavn);
        journalContainer.html('');// Nulstiller container for journalen

        for (let i = 0; i < journalData.length; i++) {
            let journal = journalData[i];// Tildeler journal det 'i' journal objekt
            let journalDiv = createDiv(journal.dato + ': ' + journal.journal);// Opretter container til journal dato og tekst for objektet
            journalDiv.style('margin', '5px');
            journalContainer.child(journalDiv);// Indsætter journal i journalContainer som child
        };
    }

    // Funktion til at gemme data i localStorage
    function gemILocalStorage() {
        // Henter bruger data via brugernavn og konventere JSON streng til objekt notation 
        let brugerData = JSON.parse(localStorage.getItem(brugerNavn));

        // Overskriver det gamle journalData med det nye 
        brugerData.journalData = journalData;

        // Gemmer dataen som JSON format i localStorage under brugernavn
        localStorage.setItem(brugerNavn, JSON.stringify(brugerData));
    }

    // Funktion til at hente data fra localStorage
    function hentFraLocalStorage() {
        let brugerData = JSON.parse(localStorage.getItem(brugerNavn));// Henter bruger navn for aktov bruger
        journalData = brugerData.journalData || journalData;// Henter det evt. journalData eller tomt array
        opdaterJournal(); //Tilføjer det til siden så det vises
    }

    // Indlæs gemte data
    hentFraLocalStorage();
}