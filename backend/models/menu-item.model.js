const pool = require('../config/db');

// Récupérer tous les items du menu
async function getAllMenuItems() {
    // const { rows } = await pool.query('SELECT * FROM menu_items');
    // pour aller plus vite, on va simuler la récupération des données
    const rows = JSON.parse(`[
        {
            "name": "Salade César",
            "description": "Laitue, poulet, croûtons, parmesan",
            "price": 8.50,
            "imageUrl": "assets/images/salade.jpg"
        },
        {
            "name": "Soupe à l'oignon",
            "description": "Gratinée au fromage",
            "price": 7.00,
            "imageUrl": "assets/images/soupe.jpg"
        },
        {
            "name": "Assiette de charcuterie",
            "description": "Saucisson, jambon cru, pâté",
            "price": 12.00,
            "imageUrl": "assets/images/charcut.webp"
        },
        {
            "name": "Pâtes au Pesto",
            "description": "Mélange italien de basilic et de pignon de pain",
            "price": 14.00,
            "imageUrl": "assets/images/pesto.jpg"
        },
        {
            "name": "Boeuf Bourguignon",
            "description": "Viande de boeuf mijotée au vin rouge",
            "price": 15.50,
            "imageUrl": "assets/images/bourguignon.webp"
        },
        {
            "name": "Filet de saumon grillé",
            "description": "Sauce à l'aneth",
            "price": 16.00,
            "imageUrl": "assets/images/saumon.jpeg"
        },
        {
            "name": "Risotto aux champignons",
            "description": "Crémé et parfumé",
            "price": 14.00,
            "imageUrl": "assets/images/risotto.jpg"
        },
        {
            "name": "Magret de canard",
            "description": "Sauce au miel et figues",
            "price": 18.00,
            "imageUrl": "assets/images/canard.jpg"
        },
        {
            "name": "Crème brûlée",
            "description": "Caramélisée à la cassonade",
            "price": 6.00,
            "imageUrl": "assets/images/creme.webp"
        },
        {
            "name": "Tarte aux pommes",
            "description": "Faite maison",
            "price": 5.50,
            "imageUrl": "assets/images/tarte.webp"
        },
        {
            "name": "Mousse au chocolat",
            "description": "Noir intense",
            "price": 6.50,
            "imageUrl": "assets/images/mousse.jpg"
        },
        {
            "name": "Île flottante",
            "description": "Crème anglaise et caramel",
            "price": 7.00,
            "imageUrl": "assets/images/ile.jpg"
        }]`);
    return rows;
}

module.exports = {
    getAllMenuItems,
};
