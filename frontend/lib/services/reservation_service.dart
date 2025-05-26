import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/reservation.dart';

class ReservationService {
  static const String baseUrl = 'http://localhost:5000/api/reservations';

  static Future<List<Reservation>> fetchReservations() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      final List items = data['data'] ?? [];
      return items.map((item) => Reservation.fromJson(item)).toList();
    } else {
      throw Exception('Erreur lors du chargement des réservations');
    }
  }

  static Future<bool> addReservation(Reservation reservation) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode(reservation.toJson()),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return true;
    } else {
      throw Exception('Erreur lors de l\'ajout de la réservation');
    }
  }
}
