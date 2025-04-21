function setup() {
    createCanvas(400, 400)
    background('lightblue')

    let knapHusk = lavKnap('Huskeliste', 25, 200, 'HuskeSide.html')
    let knapKalender = lavKnap('kalender', 120, 200, 'Kalender.html')
    let knapBreathing = lavKnap('breathing', 210, 200, 'BreathingSide.html')
    let knapJurnal = lavKnap('Jurnal', 300, 200, 'BulletJournalSide.html')

    visPointSystem(); // Tilføj visning af point
}

// Funktion til at lave knapper, tager i mod 4 paremtere 
function lavKnap(tekst, positionX, positionY, knapSide) {
    let knap = createButton(tekst);
    knap.position(positionX, positionY);
    // Kalder changePageFunction som skifter side når knappen trykkes
    knap.mousePressed(changePageFunction(knapSide));
    return knap; // retunere kanppen
}

// Skift til HTML side
function changePageFunction(side) {
    return function () {
        window.location.href = side;
    };
}

// Funktion til at beregne og vise point
function visPointSystem() {
    let point = 0;
    let brugerNavn = localStorage.getItem('aktivBruger');// Henter brugern navn
    let brugerData = JSON.parse(localStorage.getItem(brugerNavn));// Hentter bruger data fra localStorage 
    let huskelisteData = brugerData.huskeliste || [];// Henter huskeliste data hvis der er noget
    for (let i = 0; i < huskelisteData.length; i++) {
        let huskeElement = huskelisteData[i];
        //Tjekker om elementet er afsluttet
        if (huskeElement.afsluttet) {
            point += 10; // 10 point for hver afsluttet aktivitet
        }
    }

    // Hentter breathingData fra localStorage
    let breathingData = brugerData.breathingData || 0;//Henter brugerData data hvis der er noget
    point += parseInt(breathingData) * 10;// 10 point for hver afsluttet øvelse

    // Point tekst
    textSize(20)
    text('Dine point: ' + point, 25, 50)
    badges(point);// Kalder badges funktion med point som agument
}

// funktion til badges
function badges(point) {
    textSize(80);
    let posX = 150
    let posY = 150
    // Tjekker hvor mange point brugern har og laver det tilhørne badge
    if (point <= 20) {
        text("🦩", posX, posY);
    } else if (point <= 40) {
        text("🐧", posX, posY);
    } else if (point <= 60) {
        text("🐬", posX, posY);
    } else if (point <= 80) {
        text("🦒", posX, posY);
    } else if (point <= 100) {
        text("🐢", posX, posY);
    } else if (point <= 120) {
        text("🦀", posX, posY);
    } else if (point <= 140) {
        text("🐋", posX, posY);
    } else if (point <= 160) {
        text("🦆", posX, posY);
    }
}

