const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/database.sqlite');

// Initialize database
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ingredients TEXT,
        instructions TEXT,
        mood TEXT
    )`);

    // Insert some sample data
    const sampleRecipes = [
        {
            name: 'Comforting Mac and Cheese',
            ingredients: 'Macaroni, cheese, milk, butter, flour',
            instructions: 'Cook macaroni. Make cheese sauce. Combine.',
            mood: 'sad'
        },
        {
            name: 'Energizing Smoothie Bowl',
            ingredients: 'Banana, berries, yogurt, granola, honey',
            instructions: 'Blend fruits. Top with granola and honey.',
            mood: 'tired'
        },
        {
            name: 'Celebratory Chocolate Cake',
            ingredients: 'Flour, cocoa, sugar, eggs, milk',
            instructions: 'Mix dry ingredients. Add wet ingredients. Bake.',
            mood: 'happy'
        }
    ];

    db.get("SELECT COUNT(*) as count FROM recipes", (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO recipes (name, ingredients, instructions, mood) VALUES (?, ?, ?, ?)");
            sampleRecipes.forEach(recipe => {
                stmt.run(recipe.name, recipe.ingredients, recipe.instructions, recipe.mood);
            });
            stmt.finalize();
        }
    });
});

module.exports = db; 