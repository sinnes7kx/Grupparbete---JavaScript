// kontakt.js – Björns tillägg till kontaktsidan.
// Använder jQuery för två saker:
//   1. Validering av kontaktformuläret med egna felmeddelanden på svenska.
//   2. FAQ-sektion där svaren fälls ut och in när man klickar på en fråga.

// $(function () { ... }) körs när sidans HTML har laddats klart.
// Det är jQuerys kortform av document.addEventListener("DOMContentLoaded", ...).
$(function () {

    // ---------- 1. FORMULÄRVALIDERING ----------

    var maxTecken = 500; // Samma som maxlength på textarean i HTML.

    // Visar ett felmeddelande under ett fält och markerar fältet rött.
    function visaFel(falt, text) {
        $(falt).addClass("fel");
        $(falt).attr("aria-invalid", "true"); // Talar om för skärmläsare att fältet är fel.
        $(falt).closest(".field").find(".felmeddelande").text(text);
    }

    // Tar bort felmeddelandet och den röda markeringen.
    function taBortFel(falt) {
        $(falt).removeClass("fel");
        $(falt).removeAttr("aria-invalid");
        $(falt).closest(".field").find(".felmeddelande").text("");
    }

    // Kontrollerar ETT fält. Returnerar true om fältet är okej, annars false.
    function kontrolleraFalt(falt) {
        var id = $(falt).attr("id");
        var varde = $(falt).val().trim(); // trim() tar bort mellanslag i början och slutet.

        if (id === "name") {
            if (varde.length < 2) {
                visaFel(falt, "Skriv ditt namn (minst 2 tecken).");
                return false;
            }
        }

        if (id === "email") {
            // Reguljärt uttryck: något@något.något, utan mellanslag.
            var epostMonster = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
            if (varde === "") {
                visaFel(falt, "Skriv din e-postadress.");
                return false;
            }
            if (!epostMonster.test(varde)) {
                visaFel(falt, "E-postadressen ser inte rätt ut, t.ex. namn@exempel.se");
                return false;
            }
        }

        if (id === "phone") {
            // Telefon är valfritt. Bara om något är ifyllt kontrolleras det.
            if (varde !== "") {
                var baraSiffror = varde.replace(/[\s\-+]/g, ""); // Tar bort mellanslag, bindestreck och plus.
                var telefonMonster = /^[0-9]{8,13}$/; // 8–13 siffror och inget annat.
                if (!telefonMonster.test(baraSiffror)) {
                    visaFel(falt, "Skriv ett giltigt telefonnummer, t.ex. 070-123 45 67");
                    return false;
                }
            }
        }

        if (id === "subject") {
            if (varde === "") {
                visaFel(falt, "Välj vad ditt ärende gäller.");
                return false;
            }
        }

        if (id === "message") {
            if (varde.length < 10) {
                visaFel(falt, "Skriv ett meddelande på minst 10 tecken.");
                return false;
            }
        }

        taBortFel(falt);
        return true;
    }

    // Alla fält som ska kontrolleras.
    var alltFalt = $("#name, #email, #phone, #subject, #message");

    // Kontrollera ett fält när användaren lämnar det ("blur").
    alltFalt.on("blur", function () {
        kontrolleraFalt(this);
    });

    // Ta bort felet direkt när användaren börjar rätta ett fält som var fel.
    alltFalt.on("input change", function () {
        if ($(this).hasClass("fel")) {
            kontrolleraFalt(this);
        }
    });

    // Teckenräknare under meddelandet.
    $("#message").on("input", function () {
        var antal = $(this).val().length;
        $("#teckenraknare").text(antal + " / " + maxTecken + " tecken");
    });

    // När formuläret skickas.
    $("#kontaktformular").on("submit", function (event) {
        event.preventDefault(); // Stoppar webbläsaren från att skicka och ladda om sidan.

        var alltOk = true;

        // .each() går igenom fälten ett i taget.
        alltFalt.each(function () {
            if (!kontrolleraFalt(this)) {
                alltOk = false;
            }
        });

        var status = $("#kontaktmeddelande");

        if (!alltOk) {
            status.removeClass("lyckat").text("Rätta de markerade fälten och försök igen.");
            $(".fel").first().trigger("focus"); // Flyttar markören till första felet.
            return;
        }

        // Allt är rätt: tack-meddelande med namnet, sedan töms formuläret.
        var namn = $("#name").val().trim();
        status.addClass("lyckat").text("Tack " + namn + "! Detta är ett skolprojekt, så ditt meddelande har inte skickats.");

        this.reset(); // Tömmer alla fält.
        $("#teckenraknare").text("0 / " + maxTecken + " tecken");
    });


    // ---------- 2. FAQ (fäll ut / fäll in) ----------

    $(".faq-fraga").on("click", function () {
        var fraga = $(this);
        var svar = fraga.next(".faq-svar"); // Svaret ligger direkt efter frågan i HTML.
        var arOppen = fraga.attr("aria-expanded") === "true";

        // Stäng alla andra öppna svar så att bara ett är öppet åt gången.
        $(".faq-fraga").not(fraga).attr("aria-expanded", "false");
        $(".faq-svar").not(svar).slideUp(250);

        // Öppna eller stäng det svar man klickade på.
        fraga.attr("aria-expanded", arOppen ? "false" : "true");
        svar.slideToggle(250);
    });

});
