// Visa eller dölj mobilmenyn.
function visaMeny() {
    var meny = document.getElementById("main-nav");
    var knapp = document.getElementById("menyknapp");

    if (meny.style.display === "block") {
        meny.style.display = "";
        knapp.textContent = "Meny";
    } else {
        meny.style.display = "block";
        knapp.textContent = "Stäng meny";
    }
}

// Visa behandling och pris när en radioknapp väljs. Parametrarna namn och pris skickas med från HTML.
function valjBehandling(namn, pris) {
    document.getElementById("vald-behandling").textContent = namn;
    document.getElementById("valt-pris").textContent = pris;
    document.getElementById("bokningsmeddelande").textContent = "";
}

// Kontrollera valet när användaren trycker på Fortsätt.
function kontrolleraBokning() {
    var behandling = document.getElementById("vald-behandling").textContent;
    var meddelande = document.getElementById("bokningsmeddelande");

    if (behandling === "Inte vald") {
        meddelande.textContent = "Välj en behandling för att fortsätta.";
    } else {
        meddelande.textContent = "Du har valt " + behandling + ". Detta är ett skolprojekt. Ingen bokning har gjorts.";
    }

    // return false stoppar formuläret från att skickas.
    return false;
}

// HTML kontrollerar required och type="email" innan funktionen körs.
function skickaMeddelande() {
    document.getElementById("kontaktmeddelande").textContent = "Detta är ett skolprojekt. Ditt meddelande har inte skickats.";
    return false;
}

// Klocka längst ner i höger hörn på sidorna. Kontrollerar öppet-status på framsidan.
function uppdateraKlocka() {
    var nu = new Date();
    var timme = nu.getHours();
    var klocka = document.getElementById("klocka");
    var status = document.getElementById("oppet-status");
    var statustext = document.getElementById("status-text");

    // Visa lokala tiden som hämtas från användarens dator.
    if (klocka) {
        klocka.textContent = nu.toLocaleTimeString("sv-SE");
    }

    // Visar öppet före kl. 18:00 i hero-note på sidans framsida, annars visas stängt.
    if (status) {
        if (timme < 18 && timme > 10) {
            status.textContent = "Öppet – vi stänger kl. 18:00";
            statustext.textContent = "Välkommen in eller boka tid online";
        } else {
            status.textContent = "Stängt, vi öppnar kl. 10.00";
            statustext.textContent = "Välkommen att boka tid online";
        }
    }
}

// Startas när sidans HTML har laddats.
document.addEventListener("DOMContentLoaded", function () {
    uppdateraKlocka();
    setInterval(uppdateraKlocka, 1000); // 1000 betyder att klockan uppdateras varje sekund.
});
