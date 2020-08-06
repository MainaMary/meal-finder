
const form= document.getElementById('myForm');  //submitting on the form
const random= document.getElementById('random');
const mealsElem= document.getElementById('meals');
const resultHeading = document.getElementById('results-heading');
const single_mealElem= document.getElementById('single-meal');

//Event Listeners
form.addEventListener('submit',(e)=>{
    //get search input
    e.preventDefault();
    const search= document.getElementById('search').value;
    console.log(search);
  
  

//clear singlemeal
single_mealElem.innerHTML = ' ';




// check for empty
if(input.trim()){
     //console.log(input);
     fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=${search}')
     .then(res => res.json())
     .then(data =>{
         console.log(data);
         resultHeading.innerHTML= `<h2>Search results for ${ search}</h2>`
    if(data.meals === null){
        resultHeading.innerHTML= 'There are no search results for ${input}.Try again!'
    }else{
        mealsElem.innerHTML = data.meals.map(meal => ``)
    }
    
 })
    }else{
   document.getElementById('error').innerHTML= 'Please type a search value'; 
}


});


function searchMeals(e){


}

