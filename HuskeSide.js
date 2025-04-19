function setup() {
    noCanvas();// Jeg tegner ikke nogle ting derfor er det ikke nødvendig med et canvas

    // Hent brugernavn fra localStorage (Her skal brugeren være logget ind)
    let aktivBruger = localStorage.getItem('aktivBruger');

    // Erklære et array til huskeElementer
    let huskeElementer = [];

    // Opret overskrift for den aktive bruges huskeliste
    createElement('h2', `Huskeliste for ${aktivBruger}`).style('text-align', 'center');

    // Opret inputfelt og knap til at tilføje elementer
    let input = createInput().attribute('placeholder', 'Tilføj et element');
    input.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '300px');

    //laver en tilføj knap
    let addKnap = createButton('Tilføj');
    addKnap.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '320px');

    // Opret container til huskelisten
    let huskeContainer = createDiv().style('margin', '20px auto').style('width', '350px');
    // Laver en overskrift 'Huskeliste',hvis parent er huskeContainern
    createElement('h3', 'Huskeliste').parent(huskeContainer);

    // erklære en huskeliste variabel og tildelerden ul "Uordnet liste elementet" 
    let huskeListe = createElement('ul').style('list-style', 'none').style('padding', '0');
    // tilføjer huskelisten som child til huskeContainern. 
    huskeContainer.child(huskeListe);

    // Indlæs gemte data fra localStorage
    hentFraLocalStorage();

    // Tilføj funktionalitet til knappen
    addKnap.mousePressed(() => {
        let huskeTekst = input.value().trim();
        // tjekker om der er tekst i input felt
        if (huskeTekst) {
            addHuskeElement(huskeTekst, false); // Tilføjer elemet til huskelisten
            input.value(''); // Ryder inputfeltet
            gemILocalStorage();
        }
    });

    // Funktion til at tilføje et element til huskelisten
    function addHuskeElement(tekst, afsluttet) {
        // huskeElement variablen tildeles elementet list item
        let huskeElement = createElement('li').style('margin', '5px 0').style('display', 'flex').style('align-items', 'center');
        // erklære variablen checkbox som tildeles createCheckbox p5 funktionen, med den ene parmeter afsluttet
        let checkbox = createCheckbox('', afsluttet).style('margin-right', '10px');
        let label = createSpan(tekst); // Opretter span elementer med teksten fra input felt pga. layout 

        huskeElement.child(checkbox);   // Tilføjer checkbox som child til huskeElement
        huskeElement.child(label);      // Tilføjer derefter label som child til huskeElement
        huskeListe.child(huskeElement); // Tilføjer huskeElement som child til huskeListe

        // Tilføj elementet til huskeElementer arrayet
        huskeElementer.push(
            // Laver et objekt som gemmes i huskeElementer, og inholder teksten fra input felt og pm afsluttet er sandt/falsk 
            {
                tekst: tekst,
                afsluttet: afsluttet
            });

        // Gemmer indekset for sidste tilføjet objet på huskeElementer arrayet 
        let index = huskeElementer.length - 1;

        checkbox.changed(() => {
            huskeElementer[index].afsluttet = checkbox.checked(); // Brug indekset til at opdatere om elemntet er afsluttet eller ej
            gemILocalStorage();
        });
    }

    // Funktion til at gemme data i localStorage for den aktive bruger
    function gemILocalStorage() {
        let brugerData = JSON.parse(localStorage.getItem(aktivBruger)); // Hentter data for brugeren i local storage og gemmer som objekt
        brugerData.huskeliste = huskeElementer; // overskiver eller opretter huskelisten 
        localStorage.setItem(aktivBruger, JSON.stringify(brugerData));  // gemmer bruger dataen i local Storage under aktiv bruge som JSON tekst format 
    }

    // Funktion til at indlæse data fra localStorage for den aktive bruger
    function hentFraLocalStorage() {
        let brugerData = JSON.parse(localStorage.getItem(aktivBruger));  // Hent eksisterende data for brugeren og laver det til et objekt
        let huskeliste = brugerData.huskeliste || []; // Hent huskeliste strukturen hvis den findes
        for (let i = 0; i < huskeliste.length; i++) {
            addHuskeElement(huskeliste[i].tekst, huskeliste[i].afsluttet) // Tilføjer de gmete huskeliste elementer samt deres afslutet staus, som bliver gemt i huskeElementer array 
        }
    }
}