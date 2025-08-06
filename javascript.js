
const weatherform = document.querySelector(".weatherform");
const inputdisplay = document.querySelector(".inputdisplay");
// const firstclass=document.querySelector(".first");
// const secondclass=document.querySelector(".second");
const card = document.querySelector(".card");
const apikey = "720ca21d8a525621bcfd6a3dbd7cbbf7";

weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = inputdisplay.value;
    if (city) {
        try {
            const weatherdata = await getweatherdata(city);
            dispweatherinfo(weatherdata);
        }
        catch (error) {
            console.error(error);
            displayerror(error);
        }
    }
    else {
        displayerror("please enter a city name!!");
    }
});

async function getweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("not found");
    }
    return await response.json();
}
function dispweatherinfo(data) {
    const { name: city, main: { temp, humidity, pressure, temp_min, temp_max }, weather: [{ description, id }], wind: { deg, speed }, sys: { country } } = data;
    console.log(data)

    card.textContent = ``;
    card.style.display = "flex";

    const citydisplay = document.createElement("h1");
    const disphumidity = document.createElement("p");
    const degree = document.createElement("p");
    const spd = document.createElement("p");
    const temp_minmax = document.createElement("p");
    const countrydisplay = document.createElement("p");
    const presuredisplay = document.createElement("p");
    const weatheremoji = document.createElement("p");
    const tempdisp = document.createElement("p");
    const descdisplay = document.createElement("p");
    const firstclass = document.createElement("div")
    const secondclass = document.createElement("div");
    const heading = document.createElement("div");

    citydisplay.textContent = city;
    disphumidity.textContent = `Humidity:${humidity}`;
    degree.textContent = `deg:${deg}`;
    spd.textContent = `speed:${speed.toFixed(1)}`;
    temp_minmax.textContent = `${((temp_min - 273.15) * (9 / 5) + 32).toFixed(0)}*  ${((temp_max - 273.15) * (9 / 5) + 32).toFixed(0)}*`;
    countrydisplay.textContent = `${country}`;
    presuredisplay.textContent = `pressure:${pressure}`;
    weatheremoji.textContent = getweatheremoji(id);
    tempdisp.textContent = `${((temp - 273.15) * (9 / 5) + 32).toFixed(0)}*`;
    descdisplay.textContent = `${description}`;


    citydisplay.classList.add("citydisplay");
    disphumidity.classList.add("disphumidity");
    degree.classList.add("degreedisplay");
    spd.classList.add("speeddisplay");
    countrydisplay.classList.add("disphumidity");
    presuredisplay.classList.add("disphumidity");
    weatheremoji.classList.add("weatheremoji");
    tempdisp.classList.add("tempdisp");
    descdisplay.classList.add("descdisplay");
    firstclass.classList.add("first");
    heading.classList.add("heading");
    temp_minmax.classList.add("temp_minmax");

    card.appendChild(heading);
    heading.appendChild(citydisplay);
    heading.appendChild(temp_minmax);
    card.appendChild(firstclass);
    firstclass.appendChild(secondclass);
    secondclass.appendChild(countrydisplay);
    secondclass.appendChild(disphumidity);
    secondclass.appendChild(degree);
    secondclass.appendChild(spd);
    secondclass.appendChild(presuredisplay);
    firstclass.appendChild(weatheremoji);
    firstclass.appendChild(tempdisp);
    card.appendChild(descdisplay);
}
function getweatheremoji(weatherid) {
    switch (true) {
        case (weatherid >= 200 && weatherid < 300):
            return "⛈";
        case (weatherid >= 300 && weatherid < 400):
            return "🌨";
        case (weatherid >= 500 && weatherid < 600):
            return "🌧";
        case (weatherid >= 600 && weatherid < 700):
            return "🌨";
        case (weatherid >= 700 && weatherid < 800):
            return "⛈";
        case (weatherid === 800):
            return "⛅";
        case (weatherid >= 800 && weatherid < 900):
            return "☁";
        default:
            return "🌥";
    }

}
function displayerror(message) {
    const errordisp = document.createElement("p");
    errordisp.textContent = message;
    errordisp.classList.add("errordisp");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errordisp);

}