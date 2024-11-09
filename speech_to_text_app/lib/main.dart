import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:flutter_tts/flutter_tts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'wave_animation.dart';

void main() => runApp(SpeechToTextApp());

class SpeechToTextApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Speech to Text App',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: Color(0xFF0A1A2F),
        primaryColor: Colors.blue,
      ),
      home: SpeechHomePage(),
    );
  }
}

class SpeechHomePage extends StatefulWidget {
  @override
  _SpeechHomePageState createState() => _SpeechHomePageState();
}

class _SpeechHomePageState extends State<SpeechHomePage> {
  late stt.SpeechToText _speech;
  bool _isListening = false;
  String _text = 'Press the button and start speaking';
  String _response = '';
  double _confidence = 1.0;
  late FlutterTts _flutterTts;
  bool _isLoading = false;
  String _sentiment = '';
  bool _containsVulgar = false;
  
  @override
  void initState() {
    super.initState();
    _speech = stt.SpeechToText();
    _flutterTts = FlutterTts();
  }

  Future<void> _getOpenAIResponse(String text) async {
    setState(() => _isLoading = true);
    
    try {
      final analysisResponse = await http.post(
        Uri.parse('https://api.openai.com/v1/chat/completions'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: jsonEncode({
          'model': 'gpt-3.5-turbo',
          'messages': [
            {
              'role': 'user',
              'content': 'Analyze this text: "$text". Respond in JSON format with two fields: "sentiment" (either "positive", "negative", or "neutral") and "containsVulgar" (true/false). Only respond with the JSON, nothing else.',
            }
          ],
        }),
      );

      if (analysisResponse.statusCode == 200) {
        final analysisData = jsonDecode(analysisResponse.body);
        final analysis = jsonDecode(analysisData['choices'][0]['message']['content']);
        
        setState(() {
          _sentiment = analysis['sentiment'];
          _containsVulgar = analysis['containsVulgar'];
          _text = '$text\n\nSentiment: $_sentiment${_containsVulgar ? ' (Contains vulgar language)' : ''}';
        });
      } else {
        print('Failed to get response: ${analysisResponse.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  void _listen() async {
    if (!_isListening) {
      bool available = await _speech.initialize(
        onStatus: (status) {
          print('Status: $status');
          if (status == 'done') {
            setState(() => _isListening = false);
            _getOpenAIResponse(_text);
          }
        },
        onError: (val) => print('Error: $val'),
      );
      if (available) {
        setState(() => _isListening = true);
        _speech.listen(
          onResult: (val) => setState(() {
            _text = val.recognizedWords;
            if (val.hasConfidenceRating && val.confidence > 0) {
              _confidence = val.confidence;
            }
          }),
          localeId: 'en_US',
        );
      }
    } else {
      setState(() => _isListening = false);
      _speech.stop();
    }
  }

  Future _speak() async {
    await _flutterTts.speak(_text);
  }

  Color _getSentimentColor() {
    switch (_sentiment.toLowerCase()) {
      case 'positive':
        return Colors.green;
      case 'negative':
        return Colors.red;
      case 'neutral':
        return Colors.blue;
      default:
        return Colors.grey;
    }
  }

  Color _getSentimentTextColor() {
    return Colors.white;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Background gradient
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [Color(0xFF0A1A2F), Color(0xFF0D2644)],
              ),
            ),
          ),
          
          // Main content
          SafeArea(
            child: Column(
              children: [
                Expanded(
                  child: Center(
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Text(
                        _isListening ? 'Listening...' : _text,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          fontWeight: FontWeight.w300,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),
                ),
                
                // Status container
                if (_sentiment.isNotEmpty)
                  Container(
                    margin: EdgeInsets.all(20),
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                    decoration: BoxDecoration(
                      color: _getSentimentColor().withOpacity(0.2),
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: Text(
                      '${_sentiment[0].toUpperCase()}${_sentiment.substring(1)}${_containsVulgar ? ' (Vulgar)' : ''}',
                      style: TextStyle(
                        color: _getSentimentTextColor(),
                        fontSize: 16,
                      ),
                    ),
                  ),
                
                // Microphone button
                Container(
                  margin: EdgeInsets.only(bottom: 50),
                  child: WaveAnimation(
                    isAnimating: _isListening,
                    color: Colors.blue,
                    child: GestureDetector(
                      onTap: _listen,
                      child: Container(
                        height: 80,
                        width: 80,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: _isListening ? Colors.blue.withOpacity(0.2) : Colors.blue.withOpacity(0.1),
                        ),
                        child: Icon(
                          _isListening ? Icons.mic : Icons.mic_none,
                          color: Colors.white,
                          size: 40,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
