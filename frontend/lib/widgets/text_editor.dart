import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart' as quill;
import 'package:tuple/tuple.dart';

class TextEditor extends StatefulWidget {
  const TextEditor({Key? key}) : super(key: key);

  @override
  State<TextEditor> createState() => _TextEditorState();
}

class _TextEditorState extends State<TextEditor> {
  final quill.QuillController _controller = quill.QuillController.basic();
  final FocusNode _focusNode = FocusNode();

  String currentText = '';

  Widget getToolBar() {
    return quill.QuillToolbar(children: [
      Row(
        children: [
          Flexible(
            child: EditorToolbarOptions(
              controller: _controller,
            ),
          ),
          IconButton(
              splashRadius: 20,
              onPressed: () {},
              icon: const Icon(
                Icons.info_outline,
                color: Color(0xff72747B),
              )),
        ],
      )
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Container(
        padding: const EdgeInsets.fromLTRB(100, 16, 16, 16),
        constraints:
            BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.45),
        child: Column(children: [
          getToolBar(),
          Expanded(
              child: quill.QuillEditor(
            controller: _controller,
            readOnly: false,
            scrollable: true,
            placeholder: 'Add text',
            expands: false,
            autoFocus: false,
            padding: EdgeInsets.zero,
            focusNode: _focusNode,
            customStyles: quill.DefaultStyles(
                paragraph: quill.DefaultTextBlockStyle(
                    const TextStyle(color: Colors.white),
                    const Tuple2(16, 0),
                    const Tuple2(16, 0),
                    const BoxDecoration())),
            scrollController: ScrollController(),
          ))
        ]),
      ),
    );
  }
}

class EditorToolbarOptions extends StatefulWidget {
  final quill.QuillController controller;
  const EditorToolbarOptions({Key? key, required this.controller})
      : super(key: key);

  @override
  State<EditorToolbarOptions> createState() => _EditorToolbarOptionsState();
}

class _EditorToolbarOptionsState extends State<EditorToolbarOptions> {
  String textStyleDropdown = 'Paragraph';

  @override
  Widget build(BuildContext context) {
    return Wrap(
        direction: Axis.horizontal,
        crossAxisAlignment: WrapCrossAlignment.center,
        alignment: WrapAlignment.start,
        children: [
          Container(
            decoration: BoxDecoration(color: Colors.transparent),
            child: DropdownButton<String>(
                onChanged: (obj) {
                  setState(() {
                    textStyleDropdown = obj!;
                  });
                },
                alignment: Alignment.bottomCenter,
                value: textStyleDropdown,
                icon: const Icon(Icons.arrow_drop_down),
                isDense: true,
                dropdownColor: Color.fromARGB(255, 42, 43, 46),
                style: const TextStyle(color: Color(0xff72747B)),
                items: const [
                  DropdownMenuItem<String>(
                    child: Text("Paragraph"),
                    value: "Paragraph",
                  ),
                  DropdownMenuItem<String>(
                    child: Text("Heading 1"),
                    value: "Heading 1",
                  ),
                  DropdownMenuItem<String>(
                    child: Text("Heading 2"),
                    value: "Heading 2",
                  )
                ]),
          ),
          const SizedBox(width: 15),
          const CustomVerticalDivider(
              color: Color(0xff44444D), height: 20, thickness: 2),
          quill.ToggleStyleButton(
              attribute: quill.Attribute.bold,
              icon: Icons.format_bold,
              controller: widget.controller,
              iconSize: 25,
              iconTheme: const quill.QuillIconTheme(
                  iconSelectedFillColor: Colors.transparent,
                  iconUnselectedFillColor: Colors.transparent,
                  iconSelectedColor: Color(0xff234AB2),
                  iconUnselectedColor: Color(0xff72747B))),
          quill.ToggleStyleButton(
              attribute: quill.Attribute.italic,
              icon: Icons.format_italic,
              controller: widget.controller,
              iconSize: 25,
              iconTheme: const quill.QuillIconTheme(
                  iconSelectedFillColor: Colors.transparent,
                  iconUnselectedFillColor: Colors.transparent,
                  iconSelectedColor: Color(0xff234AB2),
                  iconUnselectedColor: Color(0xff72747B))),
          quill.ToggleStyleButton(
              attribute: quill.Attribute.underline,
              icon: Icons.format_underline,
              controller: widget.controller,
              iconSize: 25,
              iconTheme: const quill.QuillIconTheme(
                  iconSelectedFillColor: Colors.transparent,
                  iconUnselectedFillColor: Colors.transparent,
                  iconSelectedColor: Color(0xff234AB2),
                  iconUnselectedColor: Color(0xff72747B))),
          const CustomVerticalDivider(
              color: Color(0xff44444D), height: 20, thickness: 2),
          quill.SelectAlignmentButton(
              showCenterAlignment: true,
              showJustifyAlignment: true,
              showLeftAlignment: true,
              showRightAlignment: true,
              controller: widget.controller,
              iconSize: 25,
              iconTheme: const quill.QuillIconTheme(
                  iconSelectedFillColor: Colors.transparent,
                  iconUnselectedFillColor: Colors.transparent,
                  iconSelectedColor: Color(0xff234AB2),
                  iconUnselectedColor: Color(0xff72747B))),
          const CustomVerticalDivider(
              color: Color(0xff44444D), height: 20, thickness: 2),
          quill.ToggleStyleButton(
              attribute: quill.Attribute.size,
              icon: Icons.format_size,
              controller: widget.controller,
              iconSize: 25,
              iconTheme: const quill.QuillIconTheme(
                  iconSelectedFillColor: Colors.transparent,
                  iconUnselectedFillColor: Colors.transparent,
                  iconSelectedColor: Color(0xff234AB2),
                  iconUnselectedColor: Color(0xff72747B))),
          quill.ClearFormatButton(
              controller: widget.controller,
              icon: Icons.format_clear,
              iconSize: 25,
              iconTheme: const quill.QuillIconTheme(
                  iconSelectedFillColor: Colors.transparent,
                  iconUnselectedFillColor: Colors.transparent,
                  iconSelectedColor: Color(0xff234AB2),
                  iconUnselectedColor: Color(0xff72747B))),
          quill.ColorButton(
            controller: widget.controller,
            iconTheme: const quill.QuillIconTheme(
                iconSelectedFillColor: Colors.transparent,
                iconUnselectedFillColor: Colors.transparent,
                iconSelectedColor: Color(0xff234AB2),
                iconUnselectedColor: Color(0xff72747B)),
            iconSize: 25,
            icon: Icons.text_format,
            background: false,
          ),
        ]);
  }
}

class CustomVerticalDivider extends StatelessWidget {
  final double height;
  final Color color;
  final double thickness;

  const CustomVerticalDivider(
      {Key? key,
      this.height = 20,
      this.color = Colors.white,
      this.thickness = 2})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
        width: thickness,
        height: height,
        child: Container(
            decoration: BoxDecoration(
                border: Border(
                    right: BorderSide(color: color, width: thickness)))));
  }
}
