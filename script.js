let search = document.querySelector(".SeachBox");
let btn = document.querySelector(".btn");
let recipeContainer = document.querySelector(".recipe-container");

let recipeDetailsContant = document.querySelector(".recipe-details-contant");
let closeButton = document.querySelector(".closebtn");


let url = "https://themealdb.com/api/json/v1/1/search.php?s=";

async function fetchRecipes(inp) {
  recipeContainer.innerHTML = "<H2>FETCHING RECIPES .............</H2>"
  try {
    let res = await axios.get(url + inp);
    return res.data;

  }
  catch (e) {
    return "Data not Found", (e);
  }

}

function show(recipes) {
  recipeContainer.innerHTML = "";
  recipes.meals.forEach(recipe => {
    let recipeDev = document.createElement("div");
    recipeDev.classList.add("recipe");
    recipeDev.innerHTML = `<img src=${recipe.strMealThumb}>
         <h3>${recipe.strMeal}</h3>
         <p><span>${recipe.strArea} </span> Dish</p>
         <p>Belongs to <span> ${recipe.strCategory} </span> Category</p>
    `
    let btn2 = document.createElement("button");
    btn2.innerText = "View Recipe"
    recipeDev.appendChild(btn2);

    //add Event listene

    btn2.addEventListener("click", () => {
     openRecipePopup(recipe); 

    })
    recipeContainer.appendChild(recipeDev);
  });
}

function  openRecipePopup(recipe){
             
  recipeDetailsContant.innerHTML = ` <h2>${recipe.strMeal}</h2> `           
             
      recipeDetailsContant.parentElement.style.display = "block ";       
} 

btn.addEventListener("click", async (e) => {
  e.preventDefault(e);
  let inp = search.value.trim();
  let recipes = await fetchRecipes(inp)
  console.log(recipes);
  show(recipes);
})