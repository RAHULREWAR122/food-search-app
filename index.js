
const ApiId = "b37943e2";
const apiKey = "d475b3e2646b53b464d2236dd7144d40";


const form = document.querySelector('form');
const searchFoodImg = document.getElementById('search-img');
const foodShow = document.getElementById('foodShow');

async function foodShowNow() {
    const foodData = searchFoodImg.value;

    const apiUrl = `https://api.edamam.com/search?q=${foodData}&app_id=${ApiId}&app_key=${apiKey}&to=15`;

    try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        const hits = data.hits;

        foodShow.innerHTML = '';

        if (hits){
              data.hits.forEach(result => {
                const recipe = result.recipe;
                const div = document.createElement('div');
                div.classList.add('foodShowResults');
                div.innerHTML = `
                      <div class="details">
                      <img class="allImg" src="${recipe.image}"  alt="${recipe.label}">
                      <div class="moreInfo">
                      <h2 class="name"><strong style="color: rgb(255, 146, 5); font-family: cursive;">${recipe.label}</strong></h2>
                      <p class="calori">Calori :<strong>${recipe.calories}</strong></p>
                      <p class="healthLavel">HealthLavel <strong>${recipe.healthLabels}</strong></p>
                      <p class="dietLevel">Diet Level <strong>${recipe.dietLabels}</strong></p>
                      <p class="cuisine">Cuisine famous <strong>${recipe.cuisineType}</strong></p>
                   
                      </div>
                    </div> `;


                foodShow.appendChild(div);
                
            });
        
        } else {
            foodShow.innerHTML = 'No results found.';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    foodShowNow();
});

