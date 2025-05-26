import 'package:flutter/material.dart';
import '../models/reservation.dart';
import '../services/reservation_service.dart';

class ReservationsScreen extends StatelessWidget {
  const ReservationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Réservations')),
      body: FutureBuilder<List<Reservation>>(
        future: ReservationService.fetchReservations(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Erreur : ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('Aucune réservation trouvée.'));
          }
          final reservations = snapshot.data!;
          return ListView.builder(
            itemCount: reservations.length,
            itemBuilder: (context, index) {
              final r = reservations[index];
              return ListTile(
                leading: const Icon(Icons.calendar_today),
                title: Text(r.name),
                subtitle: Text('Date : ${r.date} | Heure : ${r.time} | Personnes : ${r.guests}'),
                trailing: Text(r.status ?? ''),
              );
            },
          );
        },
      ),
    );
  }
}

