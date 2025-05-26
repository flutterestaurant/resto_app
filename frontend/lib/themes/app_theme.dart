import 'package:flutter/material.dart';

class AppTheme {
  // Couleurs principales
  static const Color primaryColor = Color(0xFF8D1A1D); // Rouge bordeaux
  static const Color secondaryColor = Color(0xFFFFD700); // Or
  static const Color backgroundColor = Color(0xFFFAF7F2); // Beige clair
  static const Color textColor = Color(0xFF333333); // Gris foncé
  static const Color accentColor = Color(0xFF2E7D32); // Vert

  // Thème clair
  static ThemeData lightTheme = ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: primaryColor,
      primary: primaryColor,
      secondary: secondaryColor,
      background: backgroundColor,
    ),
    scaffoldBackgroundColor: backgroundColor,
    textTheme: const TextTheme(
      displayLarge: TextStyle(color: textColor, fontWeight: FontWeight.bold),
      displayMedium: TextStyle(color: textColor, fontWeight: FontWeight.bold),
      displaySmall: TextStyle(color: textColor, fontWeight: FontWeight.bold),
      bodyLarge: TextStyle(color: textColor),
      bodyMedium: TextStyle(color: textColor),
    ),
    buttonTheme: const ButtonThemeData(
      buttonColor: primaryColor,
      textTheme: ButtonTextTheme.primary,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8.0),
        ),
      ),
    ),
    appBarTheme: const AppBarTheme(
      backgroundColor: primaryColor,
      foregroundColor: Colors.white,
    ),
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8.0),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8.0),
        borderSide: const BorderSide(color: primaryColor),
      ),
    ),
  );
}
