import {domStrings} from './views/domstrings';
import Weather from './models/Search';
import * as time from './models/Time'; 
import * as searchView from './views/searchView';


// Date today:  weekday/ month/ day
const now = new Date();
const options = { month: "long" , weekday: "long", day: "numeric"};
const newTime = now.toLocaleDateString("en-EN", options);
domStrings.day.textContent = newTime;


// Date tomorrow: weekday/ month/ day
const now2 = new Date();
var n = now2.setDate(now2.getDate() + 1)
const options2 = { month: "long" , weekday: "long", day: "numeric"};
var newTime2 = now2.toLocaleDateString("en-EN", options2);
domStrings.day2.textContent = newTime2;


//Search button 
domStrings.button.addEventListener('click', function(e){
    e.preventDefault()
 if(domStrings.input.value){
    searchView.deleteError();
    searchView.deleteIcon();
    searchView.addName(domStrings.input.value)
    controlData(domStrings.input.value);
    searchView.clearInput();
    }
 });
let loc;
let coord;
 // Control and process data
const controlData = async (input = 'Amsterdam') => {
    try{
      
      if(domStrings.input.value === ""){
        domStrings.city.textContent = 'Amsterdam'
        domStrings.city2.textContent = 'Amsterdam'
      }
      // Weather class instance
        Weather.newWeather = new Weather(input);
                await Weather.newWeather.getData();
      

      console.log(Weather.newWeather)  

      let list = Weather.newWeather.data.data.list
        
      const temp = list[0].main.temp;      // temp_max optional
                            domStrings.temperature.textContent =  Math.round(temp) + ' \xB0' + "C ";
      const temp2 = list[8].main.temp;     // temp_max optional
                            domStrings.temperature2.textContent =  Math.round(temp2) + ' \xB0' + "C ";
                
      const forecast = list[0].weather[0].description;
                            domStrings.foreCast.textContent = forecast.toLowerCase();
      const forecast2 = list[8].weather[0].description;
                            domStrings.foreCast2.textContent = forecast2.toLowerCase();
  
      const icon = list[0].weather[0].icon;
                            domStrings.weatherIcon.insertAdjacentHTML('afterbegin', `<img src="http://openweathermap.org/img/w/${icon}.png">`); 
      const icon2 = list[8].weather[0].icon
                            domStrings.weatherIcon2.insertAdjacentHTML('afterbegin', `<img src="http://openweathermap.org/img/w/${icon2}.png">`);
  
      let sRise = time.convertTime(Weather.newWeather.data.data.city.sunrise);
      let sSet = time.convertTime(Weather.newWeather.data.data.city.sunset);
                            domStrings.sunRise.textContent = `Sunrise today at ${sRise}`;
                            domStrings.sunSet.textContent = `Sunset today at ${sSet}`;
                        
    
    }catch(error){
                            domStrings.errorMessage.textContent = 'Oooops something went wrong!';
                }
                      
};
  
controlData();
 