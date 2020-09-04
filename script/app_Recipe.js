
const form= document.getElementById('myForm');  //submitting on the form
const random= document.getElementById('random');
const mealsElem= document.getElementById('meals');
const resultHeading = document.getElementById('results-heading');
const single_mealElem= document.getElementById('single-meal');
const information= document.getElementById('info');

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
         resultHeading.innerHTML= `<h2 class='main-header'>Search results for '${search}':</h2>`
  //check meals with the search value

if(data.meals === null){
        resultHeading.classList.add('show');
        resultHeading.innerHTML= `There are no search results for ${search}.Try again!`
}else{
       information.innerHTML= 'Click on any image to get more information';
         mealsElem.innerHTML = data.meals.map(meal => `
     <div class='meal'>
         <img src="${meal.strMealThumb}" alt=" ${meal.strMeal}"/>
         <div class='meal-info' data-mealID='${meal.idMeal}'>
        <h3>${meal.strMeal}</h3>
       </div>
    </div>
`)

     .join(' '); // return the loop as a string
   }  
  })
  //<a href='https://www.youtube.com'>${meal.strYoutube}</div>
  //Clear Search text
  search.value = ' ';
  document.getElementById('error').style.display='none';
 
    }else{
     document.getElementById('error').style.display='flex';
     document.getElementById('error').style.justifyContent='center';
   document.getElementById('error').innerHTML= 'Please type a search value *'; 
   resultHeading.innerHTML = ' ';
   single_mealElem.innerHTML =' ';
}


});

//fetchMeal by ID
function getMealById(mealId){
    //make a fetch request
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res=> res.json())
    .then(data=>{
       console.log(data); //display the clicked element as an array
       const getMeal = data.meals[0];
       addMealToDOM(getMeal);
    });
}

//add meal to the DOM
function addMealToDOM(getMeal){
    const ingredients = [];
    // getMeal.forEach(elem=>{
    //     if(getMeal[`strIngredient${elem}`]){
    //         ingredients.push(`${getMeal[`strIngredient${elem}`]} - ${getMeal[`strMeasure${elem}`]}`);
   
    //     }
    //     else{
    //     return 'hey';
    //     }
    // });
    for(let i=1; i<= 20; i++){
        //use the bracket syntax bc we are using the getMeal variable
     if(getMeal[`strIngredient${i}`]){
         ingredients.push(`${getMeal[`strIngredient${i}`]} - ${getMeal[`strMeasure${i}`]}`);

     }else{
     break;
     }
    }
    // <div class='single-meal>
    single_mealElem.innerHTML =`
 <div class='single-meal-info'>
    <h2>${getMeal.strMeal}</h2>
    <img src='${getMeal.strMealThumb}' alt="${getMeal.strMeal} w" />
    <h2>Category</h2>
     ${getMeal.strCategory ? `<p>${getMeal.strCategory}</p>`: ''}
     <h2>Area</h2>
     ${getMeal.strArea ? `<p>${getMeal.strArea}</p>`: ''}
</div>
<div class='main'>
    <h2>Ingredients</h2>
    <ul>
      ${ingredients.map(ing=>`<li>${ing}</li>`).join(' ')}
    </ul>

    <h2>The Instructions</h2>
    <p class='instructions'>${getMeal.strInstructions}</p>
    <h2>Check out the youtube video</h2>
    <p><a href='${getMeal.strYoutube}'class='link'>${getMeal.strYoutube}</a></p>
    <h2>For more information. Kindly visit</h2> 
    <p><a href='${getMeal.strSource}' class= 'link'>${getMeal.strSource}</a></p>
 </div>`
    
   
}





//mealsElem the container of each meal
mealsElem.addEventListener('click', (e)=>{

    information.innerHTML =' ';
    document.querySelector('.popular').style.display= 'none';
    const mealInfo = e.path.find( (item)=>{
    //mealinfo - gives the item clicked with the ID
    //goes through the child elements of the meal object

        if(item.classList){
            return item.classList.contains('meal-info');
        }else{

            return false;
        }
        console.log(item);
    });
    if(mealInfo){
        const mealId = mealInfo.getAttribute('data-mealID')

        getMealById(mealId)
        console.log(mealId);
    }

});

const image = document.querySelector('.avatar-img');
image.addEventListener('click', addMealToDOM);
//Event Listener on the random meal button
random.addEventListener('click',()=>{
    //fetch random meal from API

    mealsElem.innerHTML =' ';
    resultHeading.innerHTML = ' ';
    document.getElementById('error').innerHTML= ' ';
    document.getElementById('error').style.display= 'none';
    document.querySelector('.popular').style.display= 'none';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(data =>{
        const getMeal = data.meals[0];

        addMealToDOM(getMeal);
    })


})

//The Modal
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', hideModal);
window.addEventListener('click', windowOnClick);

function hideModal (){
    modal.classList.add('remove');
}

function windowOnClick(event){
    if(event.target === modal){
        hideModal();
    }
}

//dark -mode
const btnDark = document.querySelector('.dark-btn');
btnDark.addEventListener('click', ()=>{

    let element = document.body;
    element.classList.toggle('dark-mode');
    
})