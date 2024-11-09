import 'package:flutter/material.dart';
import 'dart:math' as math;

class WaveAnimation extends StatefulWidget {
  final Widget child;
  final bool isAnimating;
  final Color color;

  WaveAnimation({
    required this.child,
    required this.isAnimating,
    this.color = Colors.blue,
  });

  @override
  _WaveAnimationState createState() => _WaveAnimationState();
}

class _WaveAnimationState extends State<WaveAnimation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: Duration(seconds: 2),
      vsync: this,
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return CustomPaint(
          painter: WavePainter(
            animation: _controller,
            isAnimating: widget.isAnimating,
            color: widget.color,
          ),
          child: child,
        );
      },
      child: widget.child,
    );
  }
}

class WavePainter extends CustomPainter {
  final Animation<double> animation;
  final bool isAnimating;
  final Color color;

  WavePainter({
    required this.animation,
    required this.isAnimating,
    required this.color,
  });

  @override
  void paint(Canvas canvas, Size size) {
    if (!isAnimating) return;

    final centerX = size.width / 2;
    final centerY = size.height / 2;
    final radius = math.min(size.width, size.height) / 2;

    for (int i = 0; i < 3; i++) {
      final paint = Paint()
        ..color = color.withOpacity((1 - (i * 0.3 + animation.value)).clamp(0.0, 1.0))
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2;

      final progress = (animation.value + (i * 0.3)) % 1.0;
      final currentRadius = radius * (0.5 + progress * 0.5);

      canvas.drawCircle(
        Offset(centerX, centerY),
        currentRadius,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(WavePainter oldDelegate) => true;
} 