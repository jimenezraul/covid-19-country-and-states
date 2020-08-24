const loader = document.getElementById('loader');
const covidGlobal = document.getElementById('covidGlobal');
const covidUsa = document.getElementById('covidUsa');
const global = document.getElementById("global");
const usa = document.getElementById("usa");
const title = document.getElementById("title");

// Search
function myFunction() {
    const x = document.getElementById("myInput");
    let input, filter, i, txtValue, h1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    const divs = covidGlobal.getElementsByClassName("carta");
    const div = covidGlobal.getElementsByClassName("card-header");
    const divsU = covidUsa.getElementsByClassName("carta");
    const divU = covidUsa.getElementsByClassName("card-header");
    if (input.placeholder === "Search by Country...") {
        showLoadingSpinner();
        for (i = 0; i < div.length; i++) {
            h3 = div[i].getElementsByTagName("h3")[0];
            txtValue = h3.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                divs[i].style.display = "";
            } else {
                divs[i].style.display = "none";
            }
        }
        removeLoadingSpinner();
    } else {
        for (i = 0; i < divU.length; i++) {
            h3 = divU[i].getElementsByTagName("h3")[0];
            txtValue = h3.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                divsU[i].style.display = "";
            } else {
                divsU[i].style.display = "none";
            }
        }
    }

}

function showLoadingSpinner() {
    loader.hidden = false;
    covidGlobal.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        covidGlobal.hidden = false;
    }
}

function showUsaLoadingSpinner() {
    loader.hidden = false;
    covidUsa.hidden = true;

}

function removeUsaLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        covidUsa.hidden = false;
    }
}

function GetSortOrder(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}

// Get Countries
async function getCountries() {
    document.getElementById("myInput").placeholder = "Search by Country...";
    title.innerHTML = "Country"
    covidGlobal.innerHTML = "";
    let input = document.getElementById("myInput");
    input.value = ''
    const apiUrl = 'https://coronavirus-19-api.herokuapp.com/countries';
    covidUsa.hidden = true;
    global.classList.add("active");
    usa.classList.remove("active");
    try {
        showLoadingSpinner();
        const response = await fetch(apiUrl);
        const data = await response.json();
        data.sort(GetSortOrder("country"));
        for (let i = 0; i < data.length; i++) {
            // API info
            let country = data[i].country;
            let cases = data[i].cases;
            let deaths = data[i].deaths;
            let recovered = data[i].recovered;
            let todayCases = data[i].todayCases;
            // Create Elements
            const div = document.createElement('div');
            const cardDiv = document.createElement('div');
            const header = document.createElement('div');
            const countryH1Element = document.createElement('h3');
            const casesElement = document.createElement('p');
            const deathsElement = document.createElement('p');
            const recoveredElement = document.createElement('p');
            const todayCasesElement = document.createElement('p');
            // Card Header
            countryH1Element.innerHTML = country;
            countryH1Element.className = "font-weight-bold";
            header.append(countryH1Element);
            header.className = 'card-header';
            cardDiv.append(header);
            // Total Cases
            casesElement.innerHTML = '<span class="font-weight-bold">Total Cases: </span>' + cases;
            cardDiv.append(casesElement);
            // Today Cases
            todayCasesElement.innerHTML = '<span class="font-weight-bold">Today Cases: </span>' + todayCases;
            cardDiv.append(todayCasesElement);
            // Deaths Cases
            deathsElement.innerHTML = '<span class="font-weight-bold">Deaths: </span>' + deaths;
            cardDiv.append(deathsElement);
            // Recoveres Cases
            recoveredElement.innerHTML = '<span class="font-weight-bold">Recovered: </span>' + recovered;
            cardDiv.append(recoveredElement);
            // Class Names for main and card div
            div.className = 'carta col-12 col-sm-6 col-md-6 col-lg-4 justify-content-center';
            cardDiv.className = 'col-12 card text-center mt-3 round shadow p-0';
            // Append card div to main div
            div.append(cardDiv);
            document.getElementById("covidGlobal").appendChild(div);
            removeLoadingSpinner();
        }

    } catch (error) {
        getCountries();
    }
}


// Get all Usa States
async function getCovidStates() {
    covidUsa.innerHTML = "";
    title.innerHTML = "United States";
    let input = document.getElementById("myInput");
    input.value = ''
    const url = "https://corona.lmao.ninja/v2/states?sort&yesterday";
    usa.classList.add("active");
    global.classList.remove("active");
    covidGlobal.hidden = true;
    covidUsa.hidden = false;
    
    try {
        showUsaLoadingSpinner();
        document.getElementById("myInput").placeholder = "Search by US States...";
        const response = await fetch(url);
        const data = await response.json();
        data.sort(GetSortOrder("state"));
        for (let i = 0; i < data.length; i++) {
            // API info
            let state = data[i].state;
            let cases = data[i].cases;
            let deaths = data[i].deaths;
            let recovered = data[i].recovered;
            if (recovered === null) {
                recovered = 0
            }
            let todayCases = data[i].todayCases;
            // Create Elements
            const div = document.createElement('div');
            const cardDiv = document.createElement('div');
            const header = document.createElement('div');
            const countryH1Element = document.createElement('h3');
            const casesElement = document.createElement('p');
            const deathsElement = document.createElement('p');
            const recoveredElement = document.createElement('p');
            const todayCasesElement = document.createElement('p');
            // Card Header
            countryH1Element.innerHTML = state;
            countryH1Element.className = "font-weight-bold";
            header.append(countryH1Element);
            header.className = 'card-header';
            cardDiv.append(header);
            // Total Cases
            casesElement.innerHTML = '<span class="font-weight-bold">Total Cases: </span>' + cases;
            cardDiv.append(casesElement);
            // Today Cases
            todayCasesElement.innerHTML = '<span class="font-weight-bold">New Cases: </span>' + todayCases;
            cardDiv.append(todayCasesElement);
            // Deaths Cases
            deathsElement.innerHTML = '<span class="font-weight-bold">Deaths: </span>' + deaths;
            cardDiv.append(deathsElement);
            // Recoveres Cases
            recoveredElement.innerHTML = '<span class="font-weight-bold">Recovered: </span>' + recovered;
            cardDiv.append(recoveredElement);
            // Class Names for main and card div
            div.className = 'carta col-12 col-sm-6 col-md-6 col-lg-4 justify-content-center';
            cardDiv.className = 'col-12 card text-center mt-3 round shadow p-0';
            // Append card div to main div
            div.append(cardDiv);
            document.getElementById("covidUsa").appendChild(div);
            removeUsaLoadingSpinner();
        }

    } catch (error) {

    }

}


// On Load
getCountries();
