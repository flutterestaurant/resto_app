import 'package:flutter/material.dart';
import 'screens/home_screen.dart';
import 'themes/app_theme.dart';
import 'screens/add_reservation_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Resto App',
      theme: AppTheme.lightTheme, // Utilise ton thème personnalisé
      home: const HomeScreen(), // Affiche l'écran d'accueil du resto
      debugShowCheckedModeBanner: false,
      routes: {
        '/add-reservation': (context) => const AddReservationScreen(),
      },
    );
  }
}
