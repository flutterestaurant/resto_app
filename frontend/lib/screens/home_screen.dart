import 'package:flutter/material.dart';

import '../services/auth_service.dart'; // Import AuthService
import '../themes/app_theme.dart';
import '../utils/auth_storage.dart'; // Import AuthStorage
import '../widgets/menu_highlights.dart';
import '../widgets/restaurant_info_card.dart';
import 'menu_screen.dart';
import 'reservations_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    final token = await AuthStorage.getToken();
    setState(() {
      _isLoggedIn = token != null;
    });
  }

  Future<void> _logout() async {
    await AuthService().logout();
    if (mounted) {
      setState(() {
        _isLoggedIn = false; // Update state after logout
      });
      Navigator.of(context).pushReplacementNamed('/home'); // Navigate to home screen
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Le Gourmet Français'),
        // Conditionally hide the back button if it's the first route
        automaticallyImplyLeading: false,
        actions: [
          if (_isLoggedIn) // Show logout button only if logged in
            IconButton(
              icon: const Icon(Icons.logout),
              onPressed: _logout,
            ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Image d'en-tête avec une belle image
            Container(
              height: 200,
              width: double.infinity,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: Image.network('https://www.lyonresto.com/contenu/photo_restaurant/0_photo_automatique_big/la_cocagne/la_cocagne_28-selection.jpg')
                      .image,
                  fit: BoxFit.cover,
                  colorFilter: ColorFilter.mode(
                    Colors.black.withOpacity(0.3),
                    BlendMode.darken,
                  ),
                ),
              ),
              alignment: Alignment.center,
              child: const Text(
                'Bienvenue au Gourmet Français',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  shadows: [
                    Shadow(
                      blurRadius: 8,
                      color: Colors.black54,
                      offset: Offset(2, 2),
                    ),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
            ), // Informations sur le restaurant
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: RestaurantInfoCard(),
            ),

            // Titre du menu
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: Text(
                'Nos spécialités',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
            ),

            // Aperçu du menu
            const MenuHighlights(),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: AppTheme.primaryColor,
        currentIndex: 0,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Accueil'),
          BottomNavigationBarItem(
            icon: Icon(Icons.restaurant_menu),
            label: 'Menu',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            label: 'Réservations',
          ),
        ],
        onTap: (index) {
          switch (index) {
            case 0:
              // Déjà sur l'accueil
              break;
            case 1:
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const MenuScreen()),
              );
              break;
            case 2:
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const ReservationsScreen(),
                ),
              );
              break;
          }
        },
      ),
    );
  }
}
