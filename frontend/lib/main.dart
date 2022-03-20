import 'package:flutter/material.dart';
import 'package:frontend/widgets/drag_container.dart';
import 'package:frontend/widgets/topbar.dart';
import 'package:frontend/widgets/text_editor.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Koios',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SizedBox(
      width: MediaQuery.of(context).size.width,
      height: MediaQuery.of(context).size.height,
      child: Container(
        color: const Color(0xff181818),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const TopBar(),
            const SizedBox(height: 50),
            Flexible(
              child: Stack(
                clipBehavior: Clip.none,
                fit: StackFit.expand,
                children: const [
                  DragContainer(
                    child: TextEditor(),
                    initPosition: Offset(0, 0),
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    ));
  }
}
