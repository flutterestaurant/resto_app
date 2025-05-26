import 'package:flutter/material.dart';

import '../models/reservation.dart';
import '../services/reservation_service.dart';
import '../utils/auth_storage.dart'; // Import AuthStorage

class ReservationsScreen extends StatefulWidget {
  const ReservationsScreen({super.key});

  @override
  State<ReservationsScreen> createState() => _ReservationsScreenState();
}

class _ReservationsScreenState extends State<ReservationsScreen> {
  late Future<List<Reservation>> _reservationsFuture;

  @override
  void initState() {
    super.initState();
    _reservationsFuture = _fetchReservations();
  }

  Future<List<Reservation>> _fetchReservations() async {
    try {
      return await ReservationService.fetchReservations();
    } catch (e) {
      if (e.toString().contains('Unauthorized')) {
        // Clear token and redirect to login
        await AuthStorage.clearAuthData();
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Session expired. Please log in again.')),
          );
          Navigator.of(context).pushReplacementNamed('/login');
        }
      }
      rethrow; // Re-throw other errors
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Réservations')),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.pushNamed(context, '/add-reservation');
          if (result == true) {
            // Refresh the screen after adding a reservation
            setState(() {
              _reservationsFuture = _fetchReservations();
            });
          }
        },
        child: const Icon(Icons.add),
        tooltip: 'Ajouter une réservation',
      ),
      body: FutureBuilder<List<Reservation>>(
        future: _reservationsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            // Display a generic error message if not an unauthorized error
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
