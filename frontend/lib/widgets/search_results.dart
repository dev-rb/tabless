import 'package:flutter/material.dart';

class SearchResults extends StatefulWidget {
  const SearchResults({Key? key}) : super(key: key);

  @override
  State<SearchResults> createState() => _SearchResultsState();
}

class _SearchResultsState extends State<SearchResults> {
  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(maxWidth: 400),
      padding: const EdgeInsets.all(16),
      decoration: const BoxDecoration(
        border: Border.symmetric(vertical: BorderSide(color: Colors.white)),
      ),
      child: Container(),
    );
  }
}
