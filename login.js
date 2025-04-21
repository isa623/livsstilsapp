let fejlBeskeder;

function setup() {
	noCanvas();

	// fuktiuner til at hente indhold fra bokse og søger for at funktiunen mousePressed kan bruges.
	function loginMousePressed() {
		login(brugerNavnBoks.value(), kodeBoks.value())
	}
	function registreMousePressed() {
		register(brugerNavnBoks.value(), kodeBoks.value())
	}

	// Opret en som kan inholde anddre ellementer som skal bruges til login
	const container = createDiv().style('text-align', 'center').style('margin-top', '50px');

	// Laver en boks til brugernavn, med teksten brugernavn i og vælger dens placering i forhold til andre elmenter samt udsene
	const brugerNavnBoks = createInput().attribute('placeholder', 'Brugernavn');
	brugerNavnBoks.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '200px');

	// Laver en boks til kode, med teksten kode i og vælger dens placering i forhold til andre elmenter samt udsene
	const kodeBoks = createInput('', 'Kode').attribute('placeholder', 'Kode');
	kodeBoks.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '200px');

	// Laver en login knap, med teksksten login på og vælger dens placering i forhold til andre elmenter samt udsene.Knappen kalder login funktiunen hvis den trykkes på.
	const loginKnap = createButton('Login');
	loginKnap.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '220px');
	loginKnap.mousePressed(loginMousePressed);

	// Laver en registre knap, med teksksten Register på og vælger dens placering i forhold til andre elmenter samt udsene. Kappen Kalder registre funktiunen hvis den trykkes på.
	const registreKnap = createButton('Register');
	registreKnap.style('display', 'block').style('margin', '10px auto').style('padding', '10px').style('width', '220px');
	registreKnap.mousePressed(registreMousePressed);

	// Opretter et tekst elemennt, som kan vise evt. fejlbeskeder. Her gives laut til det. 
	fejlBeskeder = createDiv().style('color', 'red').style('margin-top', '20px').style('font-weight', 'bold');

	// Tilføjer ellementer som oppeover er lavet til containeren
	container.child(brugerNavnBoks);
	container.child(kodeBoks);
	container.child(loginKnap);
	container.child(registreKnap);
	container.child(fejlBeskeder);
}

// Laver funktiunen visBesked som har et paremter.
function visBesked(besked) {
	// Skriver beskeden i html objektet 
	fejlBeskeder.html(besked);
}

//laver login funktion med to paremtere
function login(brugerNavn, kode) {
	if (!brugerNavn || !kode) {
		visBesked('Udfyld begge felter');
		return;
	}
	const gemBruger = localStorage.getItem(brugerNavn);
	if (gemBruger) {
		// JSON.pares henter den gemteBruger som er en streng og laver det om til et objekt
		const brugerData = JSON.parse(gemBruger);
		if (brugerData.kode === kode) {
			//Gemmer brugernavnet under aktiv bruger
			localStorage.setItem('aktivBruger', brugerNavn);
			// Går hen  til velkommensiden
			window.location.href = 'Velkommen.html';
		} else {
			visBesked('Forkert kode');
		}
	} else {
		visBesked('Brugern findes ikke');

	}
}
// funktiun til at registrer sig som bruger, med to paremtere.
function register(brugerNavn, kode) {
	if (!brugerNavn || !kode) {
		visBesked('Udfyld begge felter');
		return;
	}
	// tjekker om bruger navnet allrede er oprette
	if (localStorage.getItem(brugerNavn)) {
		visBesked('Brugern findes allrede');
		return;
	}
	// laver objektet bruger data, med mebere variablern bruger navn og kode.  
	const brugerData = { brugerNavn: brugerNavn, kode: kode };
	localStorage.setItem(brugerNavn, JSON.stringify(brugerData));
	//Gemmer brugernavnet under aktiv bruger
	localStorage.setItem('aktivBruger', brugerNavn);
	// Går til velkommensiden
	window.location.href = 'Velkommen.html';
}
