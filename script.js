const inputField = document.getElementById('input-field');
const showFood = document.getElementById('searce-food')
const spinner = document.getElementById('spinner')
const drinksTitle = document.getElementById('drinks-title')
const drinksImg = document.getElementById('drinks-img')
const drinksIntro = document.getElementById('drinks-intro');
const errorMessage1 = document.getElementById('error1')
const errorMessage2 = document.getElementById('error2')
spinner.style.display ='none'

const searceFood = () => {
    const inputText = inputField.value;
    inputField.value = '';
    if(inputText == ''){
        errorMessage1.style.display = 'block'
        errorMessage2.style.display = 'none'
    }
    else{
        spinner.style.display ='block'

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`)
            .then(res => res.json())
            .then(data => displayFood(data.drinks))
            .catch((err) => errorHandle(err))
    }
}

const errorHandle = (err) => {
    errorMessage1.style.display = 'none'
    errorMessage2.style.display = 'block'
}

const displayFood = (drinks) => {
    spinner.style.display ='none'
    errorMessage1.style.display = 'none'
    errorMessage2.style.display = 'none'
    showFood.innerText = '';
    drinks.forEach(drink => {
        // console.log(drink.idDrink)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card h-100">
                <img src="${drink.strDrinkThumb}" class="card-img-top p-3" alt="...">
                <div class="card-body">
                    <h3 class="card-title text-info fw-bold">${drink.strDrink}</h3>
                </div>
                <div class="card-footer text-center">
                    <button onclick="showDetails(${drink.idDrink})" data-bs-toggle="modal" data-bs-target="#detailsModal" class="btn btn-outline-info fw-bold">Show details</button>
                </div>
            </div>
        `
        showFood.appendChild(div)
    });
}

const showDetails = (mealId) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => modalDetails(data.drinks[0]))
}

const modalDetails = (drink) => {
    drinksTitle.innerText = `${drink.strDrink}`;
    drinksImg.src = `${drink.strDrinkThumb}`
    drinksIntro.innerText = `${drink.strInstructions.slice(0,200)}`
}