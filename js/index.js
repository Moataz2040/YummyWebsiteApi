// navbar
$("#showBtn").click(function () {
  showNavTab();
});
function showNavTab() {
  $(".nav-tab").show(500, function () {
    $(".close").html('<i class="fa-solid fa-xmark fa-3x" id="closeBtn"></i>');
    $("#closeBtn").click(function () {
      hideNavTab();
    });
  });
}
function hideNavTab() {
  $(".nav-tab").hide(500, function () {
    $(".close").html('<i class="fa-solid fa-bars fa-3x" id="showBtn"></i>');
    $("#showBtn").click(function () {
      showNavTab();
    });
  });
}
function sidebarClicks(){
  $("#search").click(()=>{
    $(".section").addClass("d-none");
    $(".search").removeClass("d-none");
    hideNavTab()
  })
  $("#categories").click(()=>{
    $(".section").addClass("d-none");
    $(".categories").removeClass("d-none");
    hideNavTab()
  })
  $("#area").click(()=>{
    $(".section").addClass("d-none");
    $(".area").removeClass("d-none");
    hideNavTab()
  })
  $("#ingredients").click(()=>{
    $(".section").addClass("d-none");
    $(".ingredients").removeClass("d-none");
    hideNavTab()
  })
  $("#contact-us").click(()=>{
    $(".section").addClass("d-none");
    $(".contact-us").removeClass("d-none");
    hideNavTab()
  })
}
sidebarClicks()
// search
let inputName = $("#exampleFormControlInput1");
inputName.change(() => {
  searchByName(inputName.val());
});
let inputFirstLitter = $("#exampleFormControlInput2");
inputFirstLitter.change(() => {
  searchByFirstLitter(inputFirstLitter.val());
});
async function searchByName(name) {
  let searchNameApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let serachNameResponse = await searchNameApi.json();
  let serchContain = document.querySelector(".search-contain");
  let searchCartona1 = "";
  if (serachNameResponse.meals != null) {
    for (let i = 0; i < serachNameResponse.meals.length; i++) {
      const meal = serachNameResponse.meals[i];
      searchCartona1 =
        searchCartona1 +`<div class="category category-meal rounded-2 col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 overflow-hidden" id="${meal.idMeal}">
    <div class="category-layer rounded-2 p-2 d-flex align-items-center">
      <h3>${meal.strMeal}</h3>
    </div>
    <figure class="w-100 h-100">
      <img src="${meal.strMealThumb}" class="w-100 h-100 rounded-2"/>
    </figure>
  </div>`;
    }
    serchContain.innerHTML = searchCartona1;
    $(".search-list").addClass("d-none")
    serchContain.classList.remove("d-none")
  }else{
    $(".search-list").removeClass("d-none")
    serchContain.classList.add("d-none")
  }
  categoryMeal = document.querySelectorAll(".category-meal");
  for (let i = 0; i < categoryMeal.length; i++) {
    categoryMeal[i].addEventListener("click", () => {
      let mealId = categoryMeal[i].id;
      displayMealData(mealId);
      $(".meal-details").removeClass("d-none");
      $(".search").addClass("d-none");
    });
  }
}
async function searchByFirstLitter(firstLitter) {
  let searchLitterApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLitter}`
  );
  let serchLitterResponce = await searchLitterApi.json();
  let serchContain = document.querySelector(".search-contain");
  let searchCartona1 = "";
  if (serchLitterResponce.meals != null) {
    for (let i = 0; i < serchLitterResponce.meals.length; i++) {
      const meal = serchLitterResponce.meals[i];
      searchCartona1 =
        searchCartona1 +`<div class="category category-meal rounded-2 col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 overflow-hidden" id="${meal.idMeal}">
    <div class="category-layer rounded-2 p-2 d-flex align-items-center">
      <h3>${meal.strMeal}</h3>
    </div>
    <figure class="w-100 h-100">
      <img src="${meal.strMealThumb}" class="w-100 h-100 rounded-2"/>
    </figure>
  </div>`;
    }
    serchContain.innerHTML = searchCartona1;
    $(".search-list").addClass("d-none")
    serchContain.classList.remove("d-none")
  }else{
    $(".search-list").removeClass("d-none")
    serchContain.classList.add("d-none")
  }
  categoryMeal = document.querySelectorAll(".category-meal");
  for (let i = 0; i < categoryMeal.length; i++) {
    categoryMeal[i].addEventListener("click", () => {
      let mealId = categoryMeal[i].id;
      displayMealData(mealId);
      $(".meal-details").removeClass("d-none");
      $(".search").addClass("d-none");
    });
  }
}
// Categories
async function displayMealCategory() {
  let secCategory = document.querySelector(".category-content");
  let api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php?c=list`
  );
  let response = await api.json();
  let categories = response.categories;
  let cartona = "";
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    cartona =
      cartona +
      `
    <div class="category rounded-2 col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 overflow-hidden">
      <div class="category-layer rounded-2 text-center">
        <h3 id="mealName${i}">${category.strCategory}</h3>
        <p>
          ${category.strCategoryDescription.split("").splice(0, 50).join("")}
          prehistoric times.[1]
        </p>
      </div>
      <figure>
        <img src="${category.strCategoryThumb}" alt="" class="w-100"/>
      </figure>
</div>`;
  }
  secCategory.innerHTML = cartona;
  takeCategoryName();
}
displayMealCategory();
function takeCategoryName() {
  categoryArray = document.querySelectorAll(".category");
  for (let i = 0; i < categoryArray.length; i++) {
    categoryArray[i].addEventListener("click", () => {
      let categoryName = document.querySelector(`#mealName${i}`).textContent;
      displayMeal(categoryName);
    });
  }
}
async function displayMeal(categoryName="Dessert") {
  let api2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  let response2 = await api2.json();
  let mealsArray = response2.meals;
  let mealContain = document.querySelector(".meal-contain");
  let cartona2 = "";
  for (let i = 0; i < mealsArray.length; i++) {
    const meal = mealsArray[i];
    cartona2 =
      cartona2 +
      `
  <div class="category category-meal rounded-2 col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 overflow-hidden" id="${meal.idMeal}">
  <div class="category-layer rounded-2 p-2 d-flex align-items-center">
    <h3>${meal.strMeal}</h3>
  </div>
  <figure class="w-100 h-100">
    <img src="${meal.strMealThumb}" class="w-100 h-100 rounded-2"/>
  </figure>
</div>`;
  }
  mealContain.innerHTML = cartona2;
  $(".meals").removeClass("d-none");
  $(".categories").addClass("d-none");
  categoryMeal = document.querySelectorAll(".category-meal");
  for (let i = 0; i < categoryMeal.length; i++) {
    categoryMeal[i].addEventListener("click", () => {
      let mealId = categoryMeal[i].id;
      displayMealData(mealId);
      $(".meal-details").removeClass("d-none");
      $(".meals").addClass("d-none");
    });
  }
}
displayMeal()
async function displayMealData(mealId) {
  let api3 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let response3 = await api3.json();
  let mealArray = response3.meals;
  let measure = ``;
  for (let i = 1; i < 21; i++) {
    if (mealArray[0][`strMeasure${i}`] != null) {
      if (mealArray[0][`strMeasure${i}`].length > 1) {
        measure =
          measure +
          `
      <li class="alert alert-info m-2 p-1">${mealArray[0][`strMeasure${i}`]} ${
            mealArray[0][`strIngredient${i}`]
          }</li>
      `;
      }
    }
  }
  let tag = "";
  if (mealArray[0].strTags != null) {
    tag = `<li class="alert alert-danger m-2 p-1">${mealArray[0].strTags}</li>`;
  }
  let mealData = document.querySelector(".meal-data");
  mealData.innerHTML = `<div class="row">
  <div class="col-10 col-sm-12 col-md-4 ms-auto mx-sm-auto mt-4 px-3">
    <figure>
      <img src="${mealArray[0].strMealThumb}" alt="" class="w-100 rounded-2" />
    </figure>
    <h2 class="px-3">${mealArray[0].strMeal}</h2>
  </div>
  <div class="col-10 col-sm-12 col-md-8 ms-auto mx-sm-auto mt-4 px-3">
    <h2>Instructions</h2>
    <p>
    ${mealArray[0].strInstructions}
    </p>
    <h3><span class="fw-bolder">Area : </span>${mealArray[0].strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${mealArray[0].strCategory}</h3>
    <h3><span class="fw-bolder">Recipes :</span></h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${measure}
    </ul>
    <h3><span class="fw-bolder">Tags :</span></h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
      ${tag}
    </ul>
    <a href="${mealArray[0].strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${mealArray[0].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
  </div>
</div>`;
}
// Area
async function displayArea() {
  let secArea = document.querySelector(".areas-contain");
  let areaApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let areaResponse = await areaApi.json();
  let areas = areaResponse.meals;
  let areaCartona = "";
  for (let i = 0; i < areas.length; i++) {
    const area = areas[i];
    areaCartona =
      areaCartona +
      `
      <div class="category meal-area col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 text-center">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3 id="areaName${i}">${area.strArea}</h3>
    </div>`;
  }
  secArea.innerHTML = areaCartona;
  takeAreaName();
}
displayArea();
function takeAreaName() {
  let areaArray = document.querySelectorAll(".meal-area");
  for (let i = 0; i < areaArray.length; i++) {
    areaArray[i].addEventListener("click", () => {
      let areaName = document.querySelector(`#areaName${i}`).textContent;
      displayAreaMeal(areaName);
    });
  }
}
async function displayAreaMeal(areaName) {
  let areaApi2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  let areaResponse2 = await areaApi2.json();
  let areaMealsArray = areaResponse2.meals;
  let mealContain = document.querySelector(".meal-contain");
  let areaCartona2 = "";
  for (let i = 0; i < areaMealsArray.length; i++) {
    const meal = areaMealsArray[i];
    areaCartona2 =
      areaCartona2 +
      `
  <div class="category category-meal rounded-2 col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 overflow-hidden" id="${meal.idMeal}">
  <div class="category-layer rounded-2 p-2 d-flex align-items-center">
    <h3>${meal.strMeal}</h3>
  </div>
  <figure class="w-100 h-100">
    <img src="${meal.strMealThumb}" class="w-100 h-100 rounded-2"/>
  </figure>
</div>`;
  }
  mealContain.innerHTML = areaCartona2;
  $(".meals").removeClass("d-none");
  $(".area").addClass("d-none");
  categoryMeal = document.querySelectorAll(".category-meal");
  for (let i = 0; i < categoryMeal.length; i++) {
    categoryMeal[i].addEventListener("click", () => {
      let mealId = categoryMeal[i].id;
      displayMealData(mealId);
      $(".meal-details").removeClass("d-none");
      $(".meals").addClass("d-none");
    });
  }
}
// Ingredients
async function displayIngredients() {
  let secIngredients = document.querySelector(".ingredients-contain");
  let ingredientsApi = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let ingredResponse = await ingredientsApi.json();
  let ingredients = ingredResponse.meals;
  let ingredCartona = "";
  for (let i = 0; i < 20; i++) {
    const ingred = ingredients[i];
    ingredCartona =
      ingredCartona +
      `
      <div class="category meal-ingredient col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 text-center">
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>
              <h3 id="ingredName${i}">${ingred.strIngredient}</h3>
              <p>
              ${ingred.strDescription.split("").splice(0, 95).join("")}
              </p>
            </div>`;
  }
  secIngredients.innerHTML = ingredCartona;
  takeIngredName();
}
displayIngredients();
function takeIngredName() {
  let ingredArray = document.querySelectorAll(".meal-ingredient");
  for (let i = 0; i < ingredArray.length; i++) {
    ingredArray[i].addEventListener("click", () => {
      let ingredName = document.querySelector(`#ingredName${i}`).textContent;
      displayIngredMeal(ingredName);
    });
  }
}
async function displayIngredMeal(ingredName) {
  let ingredApi2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredName}`
  );
  let ingredResponse2 = await ingredApi2.json();
  let ingredMealsArray = ingredResponse2.meals;
  let mealContain = document.querySelector(".meal-contain");
  let ingredCartona2 = "";
  for (let i = 0; i < ingredMealsArray.length; i++) {
    const meal = ingredMealsArray[i];
    ingredCartona2 =
      ingredCartona2 +
      `
  <div class="category category-meal rounded-2 col-10 col-sm-6 col-md-4 col-lg-3 ms-auto mx-sm-auto mt-4 px-3 overflow-hidden" id="${meal.idMeal}">
  <div class="category-layer rounded-2 p-2 d-flex align-items-center">
    <h3>${meal.strMeal}</h3>
  </div>
  <figure class="w-100 h-100">
    <img src="${meal.strMealThumb}" class="w-100 h-100 rounded-2"/>
  </figure>
</div>`;
  }
  mealContain.innerHTML = ingredCartona2;
  $(".meals").removeClass("d-none");
  $(".ingredients").addClass("d-none");
  categoryMeal = document.querySelectorAll(".category-meal");
  for (let i = 0; i < categoryMeal.length; i++) {
    categoryMeal[i].addEventListener("click", () => {
      let mealId = categoryMeal[i].id;
      displayMealData(mealId);
      $(".meal-details").removeClass("d-none");
      $(".meals").addClass("d-none");
    });
  }
}
//
function contactValidation(){
  $("#validName").change(()=>{
    let validName =$("#validName").val()
    if(validName.match(/^[A-Z][a-z]{3,8}$/)){
      $(".nameAlert").addClass('d-none');
    }else{
      $(".nameAlert").removeClass('d-none');
    }
  })
  $("#validEmail").change(()=>{
    let validEmail =$("#validEmail").val()
    if(validEmail.match(/.+\@.+\..+/)){
      $(".emailAlert").addClass('d-none');
    }else{
      $(".emailAlert").removeClass('d-none');
    }
  })
  $("#validPhone").change(()=>{
    let validPhone =$("#validPhone").val()
    if(validPhone.match(/^01[0-25][0-9]{8}$/)){
      $(".PhoneAlert").addClass('d-none');
    }else{
      $(".PhoneAlert").removeClass('d-none');
    }
  })
  $("#validPassword").change(()=>{
    let validPassword =$("#validPassword").val()
    if(validPassword.match(/^[a-zA-Z0-9]{8,30}$/g)){
      $(".passwordAlert").addClass('d-none');
    }else{
      $(".passwordAlert").removeClass('d-none');
    }
  })
  $("#validRepassword").change(()=>{
    let validRepassword =$("#validRepassword").val()
    if(validRepassword.match(/^[a-zA-Z0-9]{8,30}$/g)){
      $(".repasswordAlert").addClass('d-none');
    }else{
      $(".repasswordAlert").removeClass('d-none');
    }
  })
  
}
contactValidation()
