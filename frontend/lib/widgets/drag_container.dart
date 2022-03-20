import 'package:flutter/material.dart';

class DragContainer extends StatefulWidget {
  final Widget child;
  final dynamic data;
  final Offset? initPosition;
  const DragContainer(
      {Key? key, required this.child, this.data, this.initPosition})
      : super(key: key);

  @override
  State<DragContainer> createState() => _DragContainerState();
}

class _DragContainerState extends State<DragContainer> {
  Offset position = const Offset(0, 0);

  @override
  void initState() {
    super.initState();
    // if (widget.initPosition != null) {
    //   position = widget.initPosition!;
    // }
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: position.dy,
      left: position.dx,
      child: Draggable(
          data: widget.data,
          feedback: Material(child: widget.child),
          child: widget.child,
          childWhenDragging: Container(),
          onDraggableCanceled: (velocity, offset) {
            setState(() {
              position = Offset(offset.dx, offset.dy - 100);
            });
          }),
    );
  }
}
