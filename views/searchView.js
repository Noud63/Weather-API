import {domStrings} from './domstrings';

// Clear weather icons, prevent from showing up double after new search
 export function deleteIcon(){
     if(domStrings.weatherIcon && domStrings.weatherIcon2){
        domStrings.weatherIcon.innerHTML = "";
        domStrings.weatherIcon2.innerHTML = "";
     }
 }
 
 // Delete error message 
 export function deleteError() {
   if( domStrings.errorMessage.textContent === 'Oooops something went wrong!'){
           domStrings.errorMessage.textContent = ""
   }
 }

//Clear input field
export function clearInput() {
    if( domStrings.input.value){
           domStrings.input.value = ""
    } 
 }

 // Add city name to UI
 export function addName(name){
  if(name){
    domStrings.city.textContent = name
  }else{
    domStrings.city.textContent = 'Amsterdam'
  }
 
 }
 
 