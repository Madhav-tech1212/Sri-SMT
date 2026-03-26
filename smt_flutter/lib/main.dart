import 'package:flutter/material.dart';
import 'core/api/api_service.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: NameScreen(),
    );
  }
}

class NameScreen extends StatefulWidget {
  const NameScreen({super.key});

  @override
  State<NameScreen> createState() => _NameScreenState();
}

class _NameScreenState extends State<NameScreen> {
  final TextEditingController controller = TextEditingController();
  List names = [];

  void loadNames() async {
    final data = await ApiService.getNames();
    setState(() {
      names = data;
    });
  }

  void saveName() async {
    await ApiService.createName(controller.text);
    controller.clear();
    loadNames();
  }

  @override
  void initState() {
    super.initState();
    loadNames();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Names")),
      body: Column(
        children: [
          TextField(controller: controller),
          ElevatedButton(
            onPressed: saveName,
            child: const Text("Save"),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: names.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(names[index]["name"]),
                );
              },
            ),
          )
        ],
      ),
    );
  }
}