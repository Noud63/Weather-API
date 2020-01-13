// Weather API DOMstrings
const weather = document.getElementById('today');
const temperature = document.getElementById('temp');
const temperature2 = document.getElementById('temp2');
const foreCast = document.getElementById('forecast');
const foreCast2 = document.getElementById('forecast2');
const errorMessage = document.getElementById('error');
const weatherIcon = document.getElementById('icon');
const weatherIcon2 = document.getElementById('icon2');
const sunSet = document.getElementById('sunset');
const sunRise = document.getElementById('sunrise');
const input = document.getElementById('input')
const button = document.getElementById('btn');

const day = document.getElementById('date');
const day2 = document.getElementById('date2');

// Date today:  weekday/ month/ day
const now = new Date();
const options = { month: "long" , weekday: "long", day: "numeric"}
const newTime = now.toLocaleDateString("en-EN", options)

// Date tomorrow: weekday/ month/ day
const now2 = new Date();
now2.setDate(now2.getDate() + 1)
const options2 = { month: "long" , weekday: "long", day: "numeric"}
const newTime2 = now2.toLocaleDateString("en-EN", options);


// Convert timestamp to readable format
function convertTime(unixTime){
    let dt = new Date(unixTime * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    if( h < 10){
       t = "0" + h + ":" + m.substr(-2)
    }
    return t
}


//Search button 
button.addEventListener('click', function(e){
  e.preventDefault()
 if(input.value){
   deleteError()
   deleteIcon()
   controlData(input.value)
   //clearInput()
 }
 
})


// Clear input field
function clearInput() {
   if(input.value){
      input.value = ""
   } 
}


// Clear weather icons, prevent from showing up double after new search
function deleteIcon(){
    if(weatherIcon && weatherIcon2){
      document.getElementById('icon').innerHTML = "";
      document.getElementById('icon2').innerHTML = "";
    }
}

function deleteError() {
  if(errorMessage.textContent === 'Oooops something went wrong!'){
    errorMessage.textContent = ""
  }
}
 

// Class constructor weather
class Weather {
    constructor(city, key){   
      this.city = city;
      this.key = '********************************'
}

async getData(){
         const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${this.key}`;
         const data = await axios(url)
         console.log(data)
         this.data = data
      }
}


// Process data
const controlData = async (input = 'Amsterdam') => {
  try{
    
    // Weather class instance
    newWeather = new Weather(input)
    
    await newWeather.getData()
    
    console.log(newWeather.data.data.city.name)

    const temp = newWeather.data.data.list[0].main.temp;
                         temperature.textContent =  temp.toFixed(1) + ' \xB0' + "C ";
    const temp2 = newWeather.data.data.list[1].main.temp;
                         temperature2.textContent =  temp2.toFixed(1) + ' \xB0' + "C ";

    const forecast = newWeather.data.data.list[0].weather[0].description;
                            foreCast.textContent = forecast.toLowerCase();
    const forecast2 = newWeather.data.data.list[1].weather[0].description;
                             foreCast2.textContent = forecast2.toLowerCase();

    const icon = newWeather.data.data.list[0].weather[0].icon
                        weatherIcon.insertAdjacentHTML('afterbegin', `<img src="http://openweathermap.org/img/w/${icon}.png">`) 
    const icon2 = newWeather.data.data.list[1].weather[0].icon
                        weatherIcon2.insertAdjacentHTML('afterbegin', `<img src="http://openweathermap.org/img/w/${icon2}.png">`) 
                       

                       day.textContent = newTime;
                      day2.textContent = newTime2;

    let sRise = convertTime(newWeather.data.data.city.sunrise);
     let sSet = convertTime(newWeather.data.data.city.sunset);
                      sunRise.textContent = `Sunrise ${sRise}`;
                       sunSet.textContent = `Sunset ${sSet}`;
  
 }catch(error){
            errorMessage.textContent = 'Oooops something went wrong!';
              }
    
              
}

controlData()
















