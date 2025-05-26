import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/user.dart';
import '../utils/auth_storage.dart';

class AuthService {
  final String _baseUrl = 'http://localhost:5000/api/auth'; // Adjust if your backend runs on a different port/path

  Future<Map<String, dynamic>> register(String name, String email, String password, String phone) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/register'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'name': name, 'email': email, 'password': password, 'phone': phone}),
    );

    final responseBody = json.decode(response.body);
    if (responseBody['success']) {
      final user = User.fromJson(responseBody['user']);
      await AuthStorage.saveToken(responseBody['token']);
      await AuthStorage.saveUser(user);
    }
    return responseBody;
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$_baseUrl/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email, 'password': password}),
    );

    final responseBody = json.decode(response.body);
    if (responseBody['success']) {
      final user = User.fromJson(responseBody['user']);
      await AuthStorage.saveToken(responseBody['token']);
      await AuthStorage.saveUser(user);
    }
    return responseBody;
  }

  Future<void> logout() async {
    await AuthStorage.clearAuthData();
  }

  Future<User?> getCurrentUser() async {
    return await AuthStorage.getUser();
  }

  Future<String?> getToken() async {
    return await AuthStorage.getToken();
  }
}
