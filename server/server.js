const express = require('express');
const db = require('./db');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.json());

const initializeDb = () => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        mood TEXT NOT NULL
    )`);

    // Sample recipes
    const recipes = [
        {
            name: "Comforting Mac and Cheese",
            ingredients: "Macaroni, cheddar cheese, milk, butter, flour, breadcrumbs",
            instructions: "Cook pasta, make cheese sauce, combine and bake until golden",
            mood: "sad"
        },
        {
            name: "Energizing Smoothie Bowl",
            ingredients: "Banana, berries, spinach, yogurt, granola, chia seeds",
            instructions: "Blend fruits and spinach, top with granola and seeds",
            mood: "tired"
        },
        {
            name: "Celebration Chocolate Cake",
            ingredients: "Flour, cocoa powder, sugar, eggs, butter, vanilla extract",
            instructions: "Mix dry and wet ingredients separately, combine and bake",
            mood: "happy"
        },
        {
            name: "Spicy Curry",
            ingredients: "Chicken, curry paste, coconut milk, vegetables, rice",
            instructions: "Cook chicken, add curry and coconut milk, serve with rice",
            mood: "stressed"
        },
        {
            name: "Fresh Mediterranean Salad",
            ingredients: "Cucumber, tomatoes, olives, feta, olive oil, lemon juice",
            instructions: "Chop vegetables, combine with feta, dress with oil and lemon",
            mood: "energetic"
        }
    ];

    // Insert recipes
    const insert = 'INSERT INTO recipes (name, ingredients, instructions, mood) VALUES (?, ?, ?, ?)';
    recipes.forEach(recipe => {
        db.run(insert, [recipe.name, recipe.ingredients, recipe.instructions, recipe.mood]);
    });
}

initializeDb();

app.get('/api/recipe/:mood', (req, res) => {
    const mood = req.params.mood;
    db.get(
        "SELECT * FROM recipes WHERE mood = ? ORDER BY RANDOM() LIMIT 1",
        [mood],
        (err, recipe) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(recipe);
        }
    );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 