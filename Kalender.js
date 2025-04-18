function setup() {
    noCanvas(); // Jeg tegner ikke nogle ting derfor er det ikke nødvendig med et canvas

    let kalenderData = [] // opretter array til kalenderDataen 
    // Opretter 3D array med 52 uge arrays, 7 dag pr. uge arrys samt tomt array pr. dag  
    for (let uge = 0; uge < 52; uge++) {
        kalenderData[uge] = []; // Opret en ny uge med et tomt array
        for (let dag = 0; dag < 7; dag++) {
            kalenderData[uge][dag] = []; // Opretter en ny dag med et tomt array
        }
    }

    let aktivUge = 0; // Start med uge 0 som indexs
    let dage = ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'];// opretter array med alle ugens dage

    // Hentter brugernavn fra localStorage (brugeren skal væree logget ind)
    let aktivBruger = localStorage.getItem('aktivBruger');

    // Opret overskrift for den aktive brugers kalender
    let overskrift = createElement('h2', 'Kalender for ' + aktivBruger + ' -  Uge ' + (aktivUge + 1).toString());
    overskrift.style('text-align', 'center');

    // Opret inputfelt til at beskrive aktiviteten
    let input = createInput().attribute('placeholder', 'Tilføj aktivitet');
    input.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '300px');

    // opretter drop down meny med de forkslige uge dage
    let dagSelect = createSelect();
    dagSelect.option('Mandag', 0); dagSelect.option('Tirsdag', 1); dagSelect.option('Onsdag', 2); dagSelect.option('Torsdag', 3); dagSelect.option('Fredag', 4); dagSelect.option('Lørdag', 5); dagSelect.option('Søndag', 6);
    dagSelect.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '150px');

    //opretter drop down meny med de forkslige start tidspunkter 
    let startTid = createSelect();
    startTid.option('08:00'); startTid.option('09:00'); startTid.option('10:00'); startTid.option('11:00'); startTid.option('12:00');
    startTid.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '150px');

    //opretter drop down meny med de forkslige slut tidspunkter 
    let slutTid = createSelect();
    slutTid.option('08:00'); slutTid.option('09:00'); slutTid.option('10:00'); slutTid.option('11:00'); slutTid.option('12:00');
    slutTid.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '150px');

    // opretter en tilføj knap 
    let addKnap = createButton('Tilføj');
    addKnap.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '320px');

    // Tilføj aktivitet for ugen og dagen til kalenderen
    addKnap.mousePressed(() => {
        // henter værdier fra input felere og down menyer. 
        let aktivitet = input.value().trim();//Fjerne mellemrum før og efter aktivitetn
        let start = startTid.value();
        let slut = slutTid.value();
        let valgtDag = dagSelect.value();
        // tjekker der er skrevt en skativitet
        if (aktivitet) {
            kalenderData[aktivUge][valgtDag].push({ aktivitet, start, slut });// tiljøjer objektet med tider og aktivitet til arrayet
            gemILocalStorage();
            opdaterKalender();
            input.value('');// Nulstiller input feltet
        }
    });

    // Knapper til at navigere mellem de forkslige ugerne
    let forrigeUgeKnap = createButton('Forrige uge');
    forrigeUgeKnap.style('margin', '10px');
    forrigeUgeKnap.mousePressed(() => {
        aktivUge = (aktivUge - 1 + 52) % 52;// Bergener hvilken uge brugern nu er i + 52 for at undgå evt. negative tal 
        opdaterKalender();
    });

    let naesteUgeKnap = createButton('Næste uge');
    naesteUgeKnap.style('margin', '10px');
    naesteUgeKnap.mousePressed(() => {
        aktivUge = (aktivUge + 1) % 52;// Lægger en uge til den aktive uge
        opdaterKalender();
    });

    // Container til at vise alle dagene i en den valgte uge
    let kalenderContainer = createDiv();
    kalenderContainer.style('margin', '20px auto').style('width', '550px');

    // Funktion til at opdatere kalenderen både overskrift og aktivitet
    function opdaterKalender() {
        overskrift.html('Kalender for ' + aktivBruger + ' -  Uge ' + (aktivUge + 1).toString());// Overskrift som hviser hvilken uge brugern er i
        kalenderContainer.html('');//  Nulstiller kalender containern så den nye valgte uge kan vises

        // Tegner selve kalnderen
        for (let dag = 0; dag < 7; dag++) {
            let dagDiv = createDiv(dage[dag]);// Opretter en dag div for hele dag arrayet
            dagDiv.style('margin', '10px 0').style('padding', '10px').style('border', 'solid black');

            let dagAktiviteter = kalenderData[aktivUge][dag]; // gemmer ugen nr index og dagen i dagAktiviteter variablen 
            for (let i = 0; i < dagAktiviteter.length; i++) {
                let aktivitet = dagAktiviteter[i];//Henter objet fra  dagAktiviteter arrayet 
                let aktivitetDiv = createDiv(aktivitet.start + ' - ' + aktivitet.slut + ': ' + aktivitet.aktivitet); // laver aktivitetDiv med værdierne fra aktivitet objektet
                aktivitetDiv.style('margin', '5px');
                dagDiv.child(aktivitetDiv); // Tilføjer aktivitetDiv under dagDiv
            };

            kalenderContainer.child(dagDiv);//Tilføjer dagDiv under kalenderContainer
        }
    }

    // Funktion til at gemme data i localStorage
    function gemILocalStorage() {
        let brugerData = JSON.parse(localStorage.getItem(aktivBruger));// Hentter bruger data fra localStorage 
        brugerData.kalenderData = kalenderData;// opdater brugerdataen for kalenderData med det nye kalenderData
        localStorage.setItem(aktivBruger, JSON.stringify(brugerData));// Gemmer brugerdata i localStorage som en JSON tekst format
    }

    // Funktion til at hente data fra localStorage
    function hentFraLocalStorage() {
        let brugerData = JSON.parse(localStorage.getItem(aktivBruger));//  Hentter bruger data fra localStorage
        kalenderData = brugerData.kalenderData || kalenderData;// Tildeler kalenderData det gemte kalenderData eller tomme kalenderData
        opdaterKalender();// opdater kalendern med det hentet data. 
    }

    // Indlæs gemte data
    hentFraLocalStorage();
}