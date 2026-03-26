import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  static const String baseUrl = "http://172.20.10.2:5000/api/v1";

  static Future<void> createName(String name) async {
    await http.post(
      Uri.parse("$baseUrl/names"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"name": name}),
    );
  }

  static Future<List<dynamic>> getNames() async {
    final response = await http.get(
      Uri.parse("$baseUrl/names"),
    );

    return jsonDecode(response.body);
  }
}