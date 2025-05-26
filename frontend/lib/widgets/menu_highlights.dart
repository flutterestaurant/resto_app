import 'package:flutter/material.dart';
import '../themes/app_theme.dart';
import '../models/menu_item.dart';

class MenuHighlights extends StatelessWidget {
  const MenuHighlights({super.key});

  @override
  Widget build(BuildContext context) {
    // Simuler quelques plats du menu pour la démo
    final List<MenuItem> highlights = [
      MenuItem(
        name: 'Foie Gras Maison',
        description: 'Foie gras mi-cuit, chutney de figues et pain brioché toasté',
        price: 19.50,
        imageUrl: 'https://www.coopchezvous.com/img/recipe/245.webp',
      ),
      MenuItem(
        name: 'Magret de Canard',
        description: 'Magret de canard rôti, sauce aux fruits rouges, pommes de terre sarladaises',
        price: 28.00,
        imageUrl: 'https://www.epicurien.be/magazine/00-img-epicurien/recettes-w2000/magret-de-canard-poele-rotis-romarin.jpg',
      ),
      MenuItem(
        name: 'Crème Brûlée',
        description: 'Crème brûlée à la vanille de Madagascar',
        price: 11.00,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1713840472256-44579289f607?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ),
    ];

    return SizedBox(
      height: 280,
      child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 8.0),
        scrollDirection: Axis.horizontal,
        itemCount: highlights.length,
        itemBuilder: (context, index) {
          final item = highlights[index];
          return _buildMenuItemCard(item);
        },
      ),
    );
  }

  Widget _buildMenuItemCard(MenuItem item) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 8.0),
      width: 240,
      child: Card(
        clipBehavior: Clip.antiAlias,
        elevation: 3.0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12.0),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image du plat
            SizedBox(
              height: 140,
              width: double.infinity,
              child: item.imageUrl != null
                ? Image.network(
                    item.imageUrl!,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        color: Colors.grey[300],
                        child: const Center(
                          child: Icon(Icons.restaurant, size: 50, color: Colors.grey),
                        ),
                      );
                    },
                  )
                : Container(
                    color: Colors.grey[300],
                    child: const Center(
                      child: Icon(Icons.restaurant, size: 50, color: Colors.grey),
                    ),
                  ),
            ),

            // Informations sur le plat
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    item.name,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    item.description,
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[700],
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${item.price.toStringAsFixed(2)} €',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.primaryColor,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
