let currentMood = '';

document.querySelectorAll('.mood-btn').forEach(button => {
    button.addEventListener('click', () => {
        currentMood = button.dataset.mood;
        getRecipe(currentMood);
    });
});

document.getElementById('new-recipe').addEventListener('click', () => {
    getRecipe(currentMood);
});

async function getRecipe(mood) {
    try {
        const response = await fetch(`/api/recipe/${mood}`);
        const recipe = await response.json();
        
        document.getElementById('recipe-container').classList.remove('hidden');
        document.getElementById('recipe-name').textContent = recipe.name;
        document.getElementById('recipe-ingredients').textContent = recipe.ingredients;
        document.getElementById('recipe-instructions').textContent = recipe.instructions;
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
} 