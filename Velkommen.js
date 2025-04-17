function setup() {
    createCanvas(400, 400);
    background(225);
    circle(50, 50, 50);

    let knapHusk = lavKnap('Huskeliste', 50, 100, 'HuskeSide.html');
    let knapKalender = lavKnap('kalender', 150, 100, 'Kalender.html');
    let knapBreathing = lavKnap('breathing', 50, 200, 'BreathingSide.html');
    let knapJurnal = lavKnap('Jurnal', 150, 200, 'BulletJournalSide.html');
}

function lavKnap(Tekst, knapPositionX, knapPositionY, knapSide) {
    let knap = createButton(Tekst);
    knap.position(knapPositionX, knapPositionY);
    knap.mousePressed(changePageFunction(knapSide));
    return knap;
}

function changePageFunction(side) {
    return function () {
        window.location.href = side;
    };
}