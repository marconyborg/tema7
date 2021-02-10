const header = document.querySelector("header h1");
const medieurl = "https://babushka-dd8a.restdb.io/media/";
const myHeaders = {

    "x-apikey": "600ec2fb1346a1524ff12de4"
}
document.addEventListener("DOMContentLoaded", start)
let retter;
let filter = "alle";

// første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("nav button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
    loadJSON();
}

//eventlistener knyttet til knapperne der vælger hvad for et filter der er aktivt
function filtrerRetter() {
    filter = this.dataset.kategori; //sæt variabel "filter" til værdien af data-troende på den knap der er klikket på
    document.querySelector(".valgt").classList.remove("valgt"); // fjern klassen valgt fra den knap
    this.classList.add("valgt"); // marker den knap der er klikket på
    visRetter(); // kald functionen visPersoner efter det nye filter er sat
    header.textContent = this.textContent;
}

async function loadJSON() {
    const JSONData = await fetch("https://babushka-dd8a.restdb.io/rest/menu", {
        headers: myHeaders
    });
    retter = await JSONData.json();
    console.log("Retter", retter);
    visRetter();
}

//funktion der viser personer i liste view
function visRetter() {

    const dest = document.querySelector("#liste"); // container til articles med en person
    const skabelon = document.querySelector("template").content; // select indhold af html skabelon (article)
    dest.textContent = ""; //ryd container inden ny loop
    retter.forEach(ret => {
        console.log("Kategori", ret.kategori);
        // loop igennem json (retter)
        // tjek hvilken kategori retten har og sammenlign med aktuel filter eller vis alle, hvis filter har værdien "alle"
        if (filter == ret.kategori || filter == "alle") {
            const klon = skabelon.cloneNode(true);
            klon.querySelector(".navn").textContent = ret.navn;
            klon.querySelector(".billede").src = medieurl + ret.billede;
            klon.querySelector(".pris").textContent = ret.pris + ",-";
            klon.querySelector(".beskrivelse").textContent = ret.kortbeskrivelse;
            klon.querySelector(".oprindelse").textContent = ret.oprindelsesregion;
            klon.querySelector(".vismere").addEventListener("click", () => visDetaljer(ret));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvem) {
    location.href = `detaljer.html?id=${hvem._id}`;
}
