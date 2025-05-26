import 'package:flutter/material.dart';

class RestaurantInfoCard extends StatelessWidget {
  const RestaurantInfoCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4.0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12.0)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Le Gourmet Français',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8.0),
            const Text(
              'Une expérience culinaire authentiquement française dans un cadre élégant et convivial.',
              style: TextStyle(fontSize: 16),
            ),
            const Divider(height: 24),
            Row(
              children: const [
                Icon(Icons.access_time, size: 18),
                SizedBox(width: 8),
                Text('Ouvert: 12h00 - 14h30 | 19h00 - 22h30'),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: const [
                Icon(Icons.location_on, size: 18),
                SizedBox(width: 8),
                Text('15 rue de la Gastronomie, 75001 Paris'),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: const [
                Icon(Icons.phone, size: 18),
                SizedBox(width: 8),
                Text('01 23 45 67 89'),
              ],
            ),
            const SizedBox(height: 16),
         Wrap(
              spacing: 12,
              runSpacing: 8,
              alignment: WrapAlignment.spaceBetween,
              children: [
                _buildInfoChip(Icons.star, '4.8/5'),
                _buildInfoChip(Icons.euro, 'Menu à partir de 35€'),
                _buildInfoChip(Icons.local_parking, 'Parking'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoChip(IconData icon, String label) {
    return Chip(
      avatar: Icon(icon, size: 16),
      label: Text(label, style: const TextStyle(fontSize: 14)),
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
    );
  }
}
