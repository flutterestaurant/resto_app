import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/menu_item.dart';

class MenuService {
  static const String baseUrl = 'http://localhost:5000/api/menu';

  static Future<List<MenuItem>> fetchMenuItems() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      final List items = data['data'];
      return items.map((item) => MenuItem.fromJson(item)).toList();
    } else {
      throw Exception('Erreur lors du chargement du menu');
    }
  }
}

