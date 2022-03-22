import 'dart:io';
import 'package:pdfx/pdfx.dart';
import 'package:flutter/material.dart';
import 'dart:math' as math;

class PdfViewer extends StatefulWidget {
  const PdfViewer({Key? key}) : super(key: key);

  @override
  State<PdfViewer> createState() => _PdfViewerState();
}

class _PdfViewerState extends State<PdfViewer> {
  final PdfController pinchController = PdfController(
      document: PdfDocument.openFile(r'D:\Desktop\School\Readings\BrayGT.pdf'));

  bool isExpanded = false;

  @override
  Widget build(BuildContext context) {
    return Row(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          TextButton(
            onPressed: () {
              setState(() {
                isExpanded = !isExpanded;
              });
            },
            child: Container(
              width: 40,
              color: Colors.grey,
              height: double.infinity,
              child: Transform.rotate(
                  angle: -math.pi / 2,
                  child: const Icon(Icons.expand, color: Colors.black)),
            ),
          ),
          Container(
              width: isExpanded ? null : 0,
              constraints: BoxConstraints(
                  maxWidth: MediaQuery.of(context).size.width * 0.45),
              child: PdfView(
                controller: pinchController,
              ))
        ]);
  }
}
