import 'dart:io';
import 'package:pdfx/pdfx.dart';
import 'package:flutter/material.dart';

class PdfViewer extends StatefulWidget {
  const PdfViewer({Key? key}) : super(key: key);

  @override
  State<PdfViewer> createState() => _PdfViewerState();
}

class _PdfViewerState extends State<PdfViewer> {
  final PdfController pinchController = PdfController(
      document: PdfDocument.openFile(r'D:\Desktop\School\Readings\BrayGT.pdf'));

  @override
  Widget build(BuildContext context) {
    return Flexible(
        child: Container(
            constraints: const BoxConstraints(maxWidth: 800),
            child: PdfView(
              controller: pinchController,
            )));
  }
}
