import 'package:flutter/material.dart';
import '../models/menu_item.dart';
import '../services/menu_service.dart';

class MenuScreen extends StatelessWidget {
  const MenuScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Menu')),
      body: FutureBuilder<List<MenuItem>>(
        future: MenuService.fetchMenuItems(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erreur : \\${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('Aucun plat disponible.'));
          }
          final menuItems = snapshot.data!;
          return ListView.builder(
            itemCount: menuItems.length,
            itemBuilder: (context, index) {
              final item = menuItems[index];
              return ListTile(
                leading: (item.imageUrl != null && item.imageUrl!.isNotEmpty)
                    ? Image.network(
                        item.imageUrl!,
                        width: 50,
                        height: 50,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => const Icon(Icons.restaurant_menu),
                      )
                    : const Icon(Icons.restaurant_menu),
                title: Text(item.name),
                subtitle: Text(item.description),
                trailing: Text('€${item.price.toStringAsFixed(2)}'),
              );
            },
          );
        },
      ),
    );
  }
}

