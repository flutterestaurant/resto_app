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
        id: '1',
        name: 'Foie Gras Maison',
        description: 'Foie gras mi-cuit, chutney de figues et pain brioché toasté',
        price: 19.50,
        category: 'entrée',
        imageUrl: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Zm9pZSUyMGdyYXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      ),
      MenuItem(
        id: '2',
        name: 'Magret de Canard',
        description: 'Magret de canard rôti, sauce aux fruits rouges, pommes de terre sarladaises',
        price: 28.00,
        category: 'plat',
        imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHVjayUyMGJyZWFzdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
      ),
      MenuItem(
        id: '3',
        name: 'Crème Brûlée',
        description: 'Crème brûlée à la vanille de Madagascar',
        price: 11.00,
        category: 'dessert',
        imageUrl: 'https://images.unsplash.com/photo-1586040215767-8a80b0629786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3JlbWUlMjBicnVsZWV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
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
