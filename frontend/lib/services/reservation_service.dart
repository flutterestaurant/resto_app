import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/reservation.dart';
import '../utils/auth_storage.dart'; // Import AuthStorage

class ReservationService {
  static const String baseUrl = 'http://localhost:5000/api/reservations';

  static Future<Map<String, String>> _getHeaders() async {
    final token = await AuthStorage.getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  static Future<List<Reservation>> fetchReservations() async {
    final headers = await _getHeaders();
    final response = await http.get(Uri.parse(baseUrl), headers: headers);
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      final List items = data['data'] ?? [];
      return items.map((item) => Reservation.fromJson(item)).toList();
    } else if (response.statusCode == 401) {
      // Return an empty list or throw a specific exception for 401
      throw Exception('Unauthorized'); // Indicate authentication required
    } else {
      throw Exception('Erreur lors du chargement des réservations: ${response.statusCode} ${response.body}');
    }
  }

  static Future<bool> addReservation(Reservation reservation) async {
    final headers = await _getHeaders();
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: headers,
      body: json.encode(reservation.toJson()),
    );
    if (response.statusCode == 201 || response.statusCode == 200) {
      return true;
    } else if (response.statusCode == 401) {
      throw Exception('Unauthorized'); // Indicate authentication required
    } else {
      throw Exception('Erreur lors de l\'ajout de la réservation: ${response.statusCode} ${response.body}');
    }
  }
}
