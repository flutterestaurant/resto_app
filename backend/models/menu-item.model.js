const { db } = require('../config/db');

// Récupérer tous les items du menu
async function getAllMenuItems() {
    // const { rows } = await pool.query('SELECT * FROM menu_items');
    // pour aller plus vite, on va simuler la récupération des données
    const rows = JSON.parse(`[
        {
            "name": "Salade César",
            "description": "Laitue, poulet, croûtons, parmesan",
            "price": 8.50,
            "imageUrl": "https://rians.com/wp-content/uploads/2024/04/1000038128.jpg"
        },
        {
            "name": "Soupe à l'oignon",
            "description": "Gratinée au fromage",
            "price": 7.00,
            "imageUrl": "https://assets.afcdn.com/recipe/20210104/116953_w1024h1024c1cx806cy863cxt0cyt382cxb1641cyb1350.jpg"
        },
        {
            "name": "Assiette de charcuterie",
            "description": "Saucisson, jambon cru, pâté",
            "price": 12.00,
            "imageUrl": "https://img.cuisineaz.com/660x495/2016/07/14/i11037-planche-charcuterie.jpeg"
        },
        {
            "name": "Pâtes au Pesto",
            "description": "Mélange italien de basilic et de pignon de pain",
            "price": 14.00,
            "imageUrl": "https://media.soscuisine.com/images/recettes/large/682.jpg"
        },
        {
            "name": "Boeuf Bourguignon",
            "description": "Viande de boeuf mijotée au vin rouge",
            "price": 15.50,
            "imageUrl": "https://img-3.journaldesfemmes.fr/7Q3SWWBmmU_JAs4WovfF6lzYzoM=/750x500/d5bc2b8de40e429ba48a3393206fb4fd/ccmcms-jdf/39884634.jpg"
        },
        {
            "name": "Filet de saumon grillé",
            "description": "Sauce à l'aneth",
            "price": 16.00,
            "imageUrl": "https://www.cuisineactuelle.fr/imgre/fit/~1~cac~2018~09~25~117c7fb9-7f78-47bd-b9b7-433f5b83e54b.jpeg/650x365/quality/80/crop-from/center/saumon-grille.jpeg"
        },
        {
            "name": "Risotto aux champignons",
            "description": "Crémé et parfumé",
            "price": 14.00,
            "imageUrl": "https://img.cuisineaz.com/1024x768/2018/09/25/i142810-risotto-de-champignons-de-paris.webp"
        },
        {
            "name": "Magret de canard",
            "description": "Sauce au miel et figues",
            "price": 18.00,
            "imageUrl": "https://files.meilleurduchef.com/mdc/photo/recette/magret-canard/magret-canard-640.jpg"
        },
        {
            "name": "Crème brûlée",
            "description": "Caramélisée à la cassonade",
            "price": 6.00,
            "imageUrl": "https://www.markal.fr/application/files/medias_markal/recettes/988-recette-creme-brulee.jpg"
        },
        {
            "name": "Tarte aux pommes",
            "description": "Faite maison",
            "price": 5.50,
            "imageUrl": "https://assets.afcdn.com/recipe/20220128/128250_w1024h1024c1cx1294cy688cxt0cyt0cxb2037cyb1472.webp"
        },
        {
            "name": "Mousse au chocolat",
            "description": "Noir intense",
            "price": 6.50,
            "imageUrl": "https://assets.afcdn.com/recipe/20210311/118509_w1024h1024c1cx300cy533cxt0cyt0cxb600cyb1066.jpg"
        },
        {
            "name": "Île flottante",
            "description": "Crème anglaise et caramel",
            "price": 7.00,
            "imageUrl": "https://assets.afcdn.com/recipe/20181017/82823_w1024h1024c1cx1869cy2492cxt0cyt0cxb3738cyb4984.jpg"
        }]`);
    return rows;
  return db.menuItems;
}

// Récupérer un item par ID
async function getMenuItemById(id) {
  return db.menuItems.find(item => item.id === id);
}

// Créer un nouvel item
async function createMenuItem(data) {
  const { name, description, price, category, imageUrl, isAvailable, isSpecial, allergens } = data;
  const newItem = {
    id: db.menuItems.length > 0 ? Math.max(...db.menuItems.map(item => item.id)) + 1 : 1,
    name,
    description,
    price,
    category,
    imageUrl,
    isAvailable: isAvailable || false,
    isSpecial: isSpecial || false,
    allergens: allergens || [],
  };
  db.menuItems.push(newItem);
  return newItem;
}

// Mettre à jour un item
async function updateMenuItem(id, data) {
  const itemIndex = db.menuItems.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return null;
  }
  const item = db.menuItems[itemIndex];
  const updatedItem = {
    ...item,
    name: data.name || item.name,
    description: data.description || item.description,
    price: data.price || item.price,
    category: data.category || item.category,
    imageUrl: data.imageUrl || item.imageUrl,
    isAvailable: data.isAvailable !== undefined ? data.isAvailable : item.isAvailable,
    isSpecial: data.isSpecial !== undefined ? data.isSpecial : item.isSpecial,
    allergens: data.allergens || item.allergens,
  };
  db.menuItems[itemIndex] = updatedItem;
  return updatedItem;
}

// Supprimer un item
async function deleteMenuItem(id) {
  const initialLength = db.menuItems.length;
  db.menuItems = db.menuItems.filter(item => item.id !== id);
  return db.menuItems.length < initialLength; // Return true if item was deleted
}

module.exports = {
    getAllMenuItems,
};
