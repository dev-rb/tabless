import 'package:flutter/material.dart';

class TopBar extends StatelessWidget {
  const TopBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      color: const Color(0xff212121),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Row(children: [
          IconButton(
              onPressed: () {},
              icon: const Icon(
                Icons.menu,
                color: Colors.white,
              )),
          const SizedBox(width: 50),
          Row(
            children: [
              TextButton(
                onPressed: () {},
                child: const Text(
                  "File",
                  style: TextStyle(color: Colors.white),
                ),
                style: TextButton.styleFrom(
                    primary: const Color.fromARGB(255, 245, 186, 255)),
              ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  "Open PDF",
                  style: TextStyle(color: Colors.white),
                ),
                style: TextButton.styleFrom(
                    primary: const Color.fromARGB(255, 245, 186, 255)),
              ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  "View",
                  style: TextStyle(color: Colors.white),
                ),
                style: TextButton.styleFrom(
                    primary: const Color.fromARGB(255, 245, 186, 255)),
              ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  "Help",
                  style: TextStyle(color: Colors.white),
                ),
                style: TextButton.styleFrom(
                    primary: const Color.fromARGB(255, 245, 186, 255)),
              ),
            ],
          )
        ]),
      ),
    );
  }
}
