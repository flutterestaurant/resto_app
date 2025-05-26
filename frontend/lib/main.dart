import 'package:flutter/material.dart';

import 'screens/add_reservation_screen.dart';
import 'screens/home_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'themes/app_theme.dart';

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
      home: const LoginScreen(), // Set LoginScreen as the initial screen
      debugShowCheckedModeBanner: false,
      routes: {
        '/add-reservation': (context) => const AddReservationScreen(),
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/home': (context) => const HomeScreen(), // Add a route for home screen
      },
    );
  }
}
