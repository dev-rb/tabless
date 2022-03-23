import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_auth_desktop/firebase_auth_desktop.dart';
import 'package:flutter/material.dart';
import 'package:frontend/widgets/drag_container.dart';
import 'package:frontend/widgets/pdf_viewer.dart';
import 'package:frontend/widgets/search_results.dart';
import 'package:frontend/widgets/topbar.dart';
import 'package:frontend/widgets/text_editor.dart';
import 'package:firebase_core/firebase_core.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
      options: const FirebaseOptions(
    apiKey: 'AIzaSyBeUk01P9gT8SRl3SVMqKJBln1x_iIBk0E',
    appId: '1:685635914796:web:482972591bbdbe2af09589',
    messagingSenderId: '685635914796',
    projectId: 'tabless-notes',
  ));
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
        primarySwatch: Colors.red,
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
        drawer: const MenuDrawer(),
        backgroundColor: const Color(0xff1D1D20),
        body: SizedBox(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          child: Column(
            mainAxisSize: MainAxisSize.max,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const TopBar(),
              Expanded(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  mainAxisSize: MainAxisSize.max,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: const [TextEditor(), SearchResults(), PdfViewer()],
                ),
              )
            ],
          ),
        ));
  }
}

class MenuDrawer extends StatelessWidget {
  const MenuDrawer({Key? key}) : super(key: key);

  void signInWithGoogle() {
    // GoogleAuthProvider provider = GoogleAuthProvider();
    // FirebaseAuthDesktop.instance.signInWithPopup(provider);
  }

  void signOut() {}

  @override
  Widget build(BuildContext context) {
    return Drawer(
        backgroundColor: const Color(0xff1D1D20),
        elevation: 4,
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(children: [
            ElevatedButton(
              onPressed: signInWithGoogle,
              style: ElevatedButton.styleFrom(
                  primary: Colors.blue, padding: const EdgeInsets.all(16)),
              child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: const [
                    Icon(Icons.login),
                    SizedBox(
                      width: 20,
                    ),
                    Text("Sign in with Google",
                        style: TextStyle(color: Colors.white))
                  ]),
            )
          ]),
        ));
  }
}
