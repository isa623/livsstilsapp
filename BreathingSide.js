// globale variabler:
let knap, startTid, radius, runde1, runde2, runde3, alleRunder, runde, tilstand;

// Tilstands objekt
const tildstansObj = {
    0: 'Tryk på start for at begynde',
    1: 'Ånd ind',
    2: 'Hold vejret',
    3: 'Pust ud',
    4: 'Flot klaret'
};

function setup() {
    createCanvas(400, 400);
    knap = createButton('Start');
    knap.position(200, 350);
    knap.mousePressed(startPogram); // kalder funktionen startPogram.
    runde1 = 4;
    runde2 = 7;
    runde3 = 8;
    alleRunder = 2;
    runde = 0;
    tilstand = 0; // variablen tilstand tildeles værdin 0 når pogramet starter
}

function draw() {
    background(225);
    breathing(); // kalder funkrtionen breathing
}

function startPogram() {
    startTid = millis() / 1000; // Tæller tid i sekunder
    runde = 0; // Nulstil runder
    radius = 50; // Nulstil radius
    tilstand = 1; // Skift til tilstand 1 (Ånd ind)
}

function breathing() {
    // Opdatering af tid i sekunder
    let tid = millis() / 1000 - startTid;

    if (tilstand === 0) {
        // Vent på, at brugeren trykker på start
        fill('red');
        text(tildstansObj[tilstand], 10, 60);
        return;
    }

    if (runde >= alleRunder) {
        tilstand = 4; // Flot klaret
    } else if (tid <= runde1) {
        tilstand = 1; // Ånd ind
        aandInd(tid); // Kald ånd ind funktionen
    } else if (tid <= runde1 + runde2) {
        tilstand = 2; // Hold vejret
        holdVejret(); // Kald hold vejret funktionen
    } else if (tid <= runde1 + runde2 + runde3) {
        tilstand = 3; // Pust ud
        pustUd(tid - runde1 - runde2);
    } else {
        tilstand = 1;
        ++runde; // Opdater runde
        startTid = millis() / 1000; // Opdater startTid til at være tid i den nuværende runde
    }

    // Opdater tekst alt efter tilstanden
    let tekst = tildstansObj[tilstand]; // Få teksten fra stateTextMap
    fill('red'); // Farve på teksten
    text('Tid: ' + int(tid), 10, 20); // Tid i sekunder
    text('Runde: ' + runde, 10, 40); // Runder
    text(tekst, 10, 60); // Skriver tekst strengen til den tilhørnen tilstand
}

function aandInd(tid) {
    radius = 50 + (tid / runde1) * 100; // Radius tildelese en værdi mellem 50 og 150, afhæning af tiden
    circle(200, 200, radius); // Tegn cirklen med radiusen 
}

function holdVejret() {
    circle(200, 200, radius); // Tegn cirklen
}

function pustUd(tid) {
    radius = 150 - (tid / runde3) * 100; // Radius tildelese en værdi mellem 150 og 50, afhæning af tiden
    circle(200, 200, radius); // Tegn cirklen med radiusen 
}