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
}

