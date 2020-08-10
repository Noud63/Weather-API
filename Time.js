// Convert sunrise/sunset timestamp to readable format

export function convertTime(unixTime){

    let dt = new Date(unixTime * 1000)
    
    let h = dt.getHours()
   
    let m = "0" + dt.getMinutes()
   
    let t = h + ":" + m.substr(-2)
     
  if( h < 10){
       t = "0" + h + ":" + m.substr(-2)
    }
    return t;
}

