import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:tuple/tuple.dart';

class TextEditor extends StatefulWidget {
  const TextEditor({Key? key}) : super(key: key);

  @override
  State<TextEditor> createState() => _TextEditorState();
}

class _TextEditorState extends State<TextEditor> {
  final QuillController _controller = QuillController.basic();
  final FocusNode _focusNode = FocusNode();

  String currentText = '';

  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.5,
      height: MediaQuery.of(context).size.height * 0.5,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
          border: Border.all(color: const Color(0xffAE52F3)),
          borderRadius: const BorderRadius.all(Radius.circular(4))),
      child: Column(children: [
        QuillToolbar.basic(
            controller: _controller,
            multiRowsDisplay: true,
            toolbarSectionSpacing: 2,
            toolbarIconAlignment: WrapAlignment.start),
        Expanded(
            child: QuillEditor(
          controller: _controller,
          readOnly: false,
          scrollable: true,
          placeholder: 'Add text',
          expands: false,
          autoFocus: false,
          padding: EdgeInsets.zero,
          focusNode: _focusNode,
          customStyles: DefaultStyles(
              paragraph: DefaultTextBlockStyle(
                  const TextStyle(color: Colors.white),
                  const Tuple2(16, 0),
                  const Tuple2(16, 0),
                  const BoxDecoration())),
          scrollController: ScrollController(),
        ))
      ]),
    );
  }
}
