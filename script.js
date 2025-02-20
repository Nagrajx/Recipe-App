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
  catch (error) {
     recipeContainer.innerHTML = "<H2> ERROE IN FETCHING RECIPES .............</H2>"
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

function openRecipePopup(recipe) {

  recipeDetailsContant.innerHTML = ` <h2 class="recipeName">${recipe.strMeal}</h2>
  
    <h3>Ingredents:</h3>
    <ul  class="IngredentsList">${fetchIngredents(recipe)}</ul>
    <div class="instructions">
    <h3 class ="h3">Instructions:</h3>
    <p>${recipe.strInstructions}</p>
    </div>
  `

  recipeDetailsContant.parentElement.style.display = "block ";
}
// function to fetcing ingredents===============================================================
function fetchIngredents(recipe) {
  let ingredentsList = " ";
  for (let i = 1; i <= 20; i++) {
    const ingredent = recipe[`strIngredient${i}`];
    if (ingredent) {
      const measure = recipe[`strMeasure${i}`];
      ingredentsList += `<li>${measure} ${ingredent}</li>`
    }
    else {
      break;
    }
  }
  return ingredentsList;
}

closeButton.addEventListener("click", () => {
  recipeDetailsContant.parentElement.style.display = "none";
});
btn.addEventListener("click", async (e) => {
  e.preventDefault(e);
  let inp = search.value.trim();
  if (inp == "") {
    recipeContainer.innerHTML = `<h2>Type the meal what you want.....</h2>`
    return;
  }
  let recipes = await fetchRecipes(inp)

  // console.log(recipes);
  show(recipes);
})