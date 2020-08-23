let i = 0;
let images = [];
let time= 3000;

//image list
images[0] = './Images/recipe1.jpg';
images[1] = './Images/recipe2.jpg';
images[2] = './Images/recipe3.jpg';
images[3] = './Images/recipe4.jpg';
images[4] = './Images/recipe5.jpg';

//change image
function changeImage(){
    
    time =3000;
    document.slide.src=images[i];
    if(i<images.length - 1){
       i++ 
    }else{
        // last index reset it to 0
        i= 0;
    }
    setTimeout("changeImage()", time);

}
window.onload = changeImage;
 
// button redirection

const openButton= document.querySelector('.search-button');


//Event Listeners
openButton.addEventListener('click', showModal);


function showModal(e){
    if(e.target === openButton){
        window.location.href ='./src/recipe.html';
    }
}

//toggle button
const toggle =document.querySelector('.menu');
const ul= document.querySelector('.main-nav');
toggle.addEventListener('click',()=>{
    
    ul.classList.toggle('active');
})

//dark -mode
const btn = document.querySelector('.dark-btn');
btn.addEventListener('click', (e)=>{
    if(e.target === btn){
        let element = document.body;
        document.querySelector('link').style.color ='#fff';
        element.classList.toggle('dark-mode');
    }else{
        document.querySelector('link').style.color ='#000';
    }
   
    
})