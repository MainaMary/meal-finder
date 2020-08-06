
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
if(search !== '') {
    
     //get Request
     fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    
     //format the response to JSON
     .then(res => res.json())

     //we get the data in return
     .then(data =>{
         console.log(data);
         resultHeading.innerHTML= `<h2>Search results for '${search}':</h2>`
  //check meals with the serach value

if(data.meals === null){
        resultHeading.classList.add('show');
        resultHeading.innerHTML= `There are no search results for ${search}.Try again!`
}else{
         mealsElem.innerHTML = data.meals.map(meal => `
     <div class='meal'>
         <img src="${meal.strMealThumb}" alt=" ${meal.strMeal}"/>
         <div class='meal-info' data-mealID='${meal.idMeal}'>
        <h3>${meal.strMeal}</h3>
       </div>
        </div>
        <a href='https://www.youtube.com'>${meal.strYoutube}</div>
     `)
     .join(' '); // return the loop as a string
   }  
  });
  //Clear Search text
  search.value = ' ';
  document.getElementById('error').style.display='none';
 
    }else{
     document.getElementById('error').style.display='block';
   document.getElementById('error').innerHTML= 'Please type a search value *'; 
   resultHeading.innerHTML = ' ';
}


});

mealsElem.addEventListener('click', (e)=>{

    const mealInfo = e.path.find( (item)=>{

        if(item.classList){
            return item.classList.contains('meal-info');
        }else{

            return false;
        }
        console.log(item);
    });
    if(mealInfo){
        const mealId = mealInfo.getAttribute('data-mealID')
     console.log(mealID)
    }

});


