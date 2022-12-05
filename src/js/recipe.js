import './general';
import getRecipe from './callrecipe';
import getInfo from  './callinfo';

class Recipe
{
    constructor()
    {
        // buttons
        this.$recipeBtn = document.querySelector('#recipeBtn');
        this.$ingredientBtn = document.querySelector('#ingredientBtn');
        // forms
        this.$recipeInput = document.querySelector('#recipe');
        this.$ingredientInput = document.querySelector('#ingredient');
        // other
        this.$results = document.querySelector('#results');

        this.addEventListeners();
    }

    addEventListeners() 
    {
        // bind methods to class
        this.searchRecipe = this.searchRecipe.bind(this);
        this.searchIngredient = this.searchIngredient.bind(this);
        // add event listeners to buttons and call method
        this.$recipeBtn.addEventListener('click', this.searchRecipe);
        this.$ingredientBtn.addEventListener('click', this.searchIngredient);
    }

    searchRecipe(event)
    {
        // prevent the event from triggering default response
        event.preventDefault();
        // get the input value (and remove punctuation)
        let query = this.removePunctuation(this.$recipeInput.value);
        this.getRecipeList(query);
    }

    searchIngredient(event)
    {
        // prevent the event from triggering default response
        event.preventDefault();
        // get the input value (and remove punctuation)
        let query = this.removePunctuation(this.$ingredientInput.value);
        this.getRecipeList(query);
    }

    getRecipeList(query)
    {
        let recipes = [];
        getRecipe(query)
            .then(data => {
                for (let i = 0; i < data.results.length; i++)
                {
                    getInfo(data.results[i].id)
                        .then(data => {
                            const recipe = {
                                id: data.id,
                                name: data.name,
                                tags: data.tags,
                                servings: data.num_servings,
                                totalTime: data.total_time_minutes,
                                imageUrl: data.thumbnail_url,
                                url: data.slug
                            }
                            this.createCard(recipe);
                        })
                }
            })
            .catch(error => {
                this.$results.innerHTML = `<h1>No results found for ${query}</h1>`;
            })
    }

    fillRecipes(recipes)
    {
        for (let card of recipes)
            this.$results.innerHTML += card;
    }

    createCard(recipe)
    {
        let cardHtml = `
            <div class="col-4">
                <div class="card">
                    <img class="card-img-top" src="${recipe.imageUrl}" alt="${recipe.name}" />
                    <div class="card-body">
                        <h4 class="card-title">${recipe.name}</h4>
                        <p class="card-text">
                            Servings: ${(recipe.servings == null) ? 'unknown' : recipe.servings}<br />
                            Ready In: ${(recipe.totalTime == null) ? 'unknown' : (recipe.totalTime + ' minutes')}<br />
                            <p id="tags">${this.getTags(recipe.tags)}</p>
                        </p>
                        <a href="https://tasty.co/recipe/${recipe.url}" target="_blank" class="btn btn-success round-4" id="viewBtn">View Recipe</a>
                    </div>
                </div>
            </div>
        `;
        this.$results.innerHTML += cardHtml;
    }

    removePunctuation(query)
    {
        // this will add a + between all the words in a query, trust me
        return query.match(/[^_\W]+/g).join('+');
    }

    getTags(tags)
    {
        let names = [];
        for (let i = 0; i < tags.length; i++)
            names[i] = tags[i].display_name;
        const str = names.join(', ');
        return str;
    }
}

window.onload = () => { new Recipe(); }