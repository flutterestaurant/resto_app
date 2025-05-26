import 'package:flutter/material.dart';
import '../themes/app_theme.dart';

class ReservationButton extends StatelessWidget {
  const ReservationButton({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        // Navigation vers l'écran de réservation
        // Navigator.push(context, MaterialPageRoute(builder: (context) => ReservationScreen()));
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
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: const [
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
