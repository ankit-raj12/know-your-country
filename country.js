const countryName = new URLSearchParams(location.search).get("name")
const details = document.querySelector('.details')
const flagImg = document.querySelector('.flag img')
const title = document.querySelector('.title h1')
const nativeName = document.querySelector('.native-name p')
const population = document.querySelector('.population p')
const region = document.querySelector('.region p')
const subRegion = document.querySelector('.sub-region p')
const capital = document.querySelector('.capital p')
const tld = document.querySelector('.top-level-domain p')
const currency = document.querySelector('.currencies p')
const language = document.querySelector('.languages p')
const borderCountries = document.querySelector('.border-countries .links')
const back = document.querySelector('.back')
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
        const isDark = body.classList.contains('dark');
        const isDarkMode = body.classList.contains('dark');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
        circle1.setAttribute("fill", isDark ? "white" : "black");
        darkButtonPara.innerText = isDark ? "Light Mode" : "Dark Mode";
    }

console.log(population.innerText)
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res) => res.json()).then((data) => data.forEach((country) =>{
    // console.log(country)
    flagImg.src = `${data[0].flags.svg}`
    title.innerText = `${data[0].name.common}`
    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    }
    population.innerText = `${country.population.toLocaleString('en-IN')}`
    region.innerText = `${country.region}`
    subRegion.innerText = `${country.subregion}`
    capital.innerText = Object.values(country.capital).join(', ')
    tld.innerText = `${country.tld[0]}`
    if(country.currencies){
        currency.innerText = (Object.values(country.currencies).map((currency)=> currency.name).join(", "))   
    }
    if(country.languages){
        language.innerText = (Object.values(country.languages).join(', '))
    }

    if(country.borders){
        // console.log(country.borders)
        country.borders.forEach((nation)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${nation}`).then((res)=> res.json()).then((data)=>{
                console.log(data[0].name.common)
                const newborder = document.createElement('a')
                newborder.innerText = data[0].name.common
                newborder.href = `country.html?name=${data[0].name.common}`
                borderCountries.append(newborder)
            })
        })
    }
}))

