const countries = document.querySelector(".countries")
const filter = document.querySelector('.filter')
const inputValue = document.querySelector('.search input')
const body = document.querySelector('body')
const darkButton = document.querySelector("nav button")
const darkButtonPara = document.querySelector("nav button p")

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark');
    toggleColor(); // update icon and text
}

darkButton.addEventListener('click', ()=>{
    body.classList.toggle('dark')
    toggleColor()
})

function toggleColor() {
        const circle1 = document.querySelector(".darkMode1");
        const circle2 = document.querySelector(".darkMode2");
        const isDark = body.classList.contains('dark');
        const isDarkMode = body.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
        circle1.setAttribute("fill", isDark ? "white" : "black");
        circle2.setAttribute("fill", isDark ? "white" : "black");
        darkButtonPara.innerText = isDark ? "Light Mode" : "Dark Mode";
    }


let allCountriesData
function renderCountries(data){
    countries.innerHTML = ''
    data.forEach((country)=>{
        
        const countryCard = document.createElement("a")
        countryCard.classList.add("country-card")
        countryCard.href = `/country.html?name=${country.name.common}`
        countryCard.innerHTML =  `
        <img src="${country.flags.svg}" alt="">
        <h5 class="country-name">${country.name.common}</h5>
        <p class="population"><b>Population</b>: ${country.population.toLocaleString('en-IN')}</p>
        <p class="region"><b>Region</b>: ${country.region}</p>
        <p class="capital"><b>Capital</b>: ${country.capital}</p>
        `
        countries.append(countryCard)
        
    })
}

fetch("https://restcountries.com/v3.1/all").then((res) => res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data
})

filter.addEventListener(('change'), (e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res) => res.json())
.then((data) => {
    renderCountries(data)})
})
inputValue.addEventListener('input', (e)=>{
    let filteredCountries = allCountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredCountries)
})

