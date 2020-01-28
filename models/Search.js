import axios from 'axios';

// Class constructor Weather
export default class Weather {
    constructor(city){   
      this.city = city;
      this.key = '31ba0dfb2a415daf8797fbb435b2f213'
}

async getData(){
         const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${this.key}`;
         const data = await axios(url)
         console.log(data)
         this.data = data
      }
}


