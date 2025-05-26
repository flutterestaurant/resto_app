import 'package:flutter/material.dart';

import '../themes/app_theme.dart';
import '../utils/auth_storage.dart'; // Import AuthStorage

class ReservationButton extends StatelessWidget {
  const ReservationButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () async {
        final token = await AuthStorage.getToken();
        if (token != null) {
          // User is authenticated, navigate to reservation screen
          Navigator.of(context).pushNamed('/add-reservation');
        } else {
          // User is not authenticated, redirect to login screen
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Please log in to make a reservation.')),
          );
          Navigator.of(context).pushNamed('/login');
        }
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: AppTheme.primaryColor,
        foregroundColor: Colors.white,
        padding: const EdgeInsets.symmetric(vertical: 15),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        elevation: 4,
      ),
      child: const Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.calendar_today, size: 24),
          SizedBox(width: 12),
          Text(
            'Réserver une table',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
