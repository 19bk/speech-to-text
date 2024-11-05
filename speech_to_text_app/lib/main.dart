import 'package:flutter/material.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:flutter_tts/flutter_tts.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() => runApp(SpeechToTextApp());

class SpeechToTextApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Speech to Text App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
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
        });
      }

      final response = await http.post(
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
              'content': text,
            }
          ],
          'temperature': 0.7,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          _response = data['choices'][0]['message']['content'];
          _text = '$text\n\nSentiment: $_sentiment${_containsVulgar ? ' (Contains vulgar language)' : ''}\n\nResponse: $_response';
        });
        await _speak();
      } else {
        print('Failed to get response: ${response.statusCode}');
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
        return Colors.green.shade100;
      case 'negative':
        return Colors.red.shade100;
      case 'neutral':
        return Colors.blue.shade100;
      default:
        return Colors.grey.shade200;
    }
  }

  Color _getSentimentTextColor() {
    switch (_sentiment.toLowerCase()) {
      case 'positive':
        return Colors.green.shade900;
      case 'negative':
        return Colors.red.shade900;
      case 'neutral':
        return Colors.blue.shade900;
      default:
        return Colors.grey.shade700;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AI Voice Assistant'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 16),
              decoration: BoxDecoration(
                color: _isListening ? Colors.green.shade100 : 
                      _isLoading ? Colors.orange.shade100 : 
                      _sentiment.isNotEmpty ? _getSentimentColor() : Colors.grey.shade200,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    _isListening ? 'Listening...' : 
                    _isLoading ? 'Getting Response...' : 
                    _sentiment.isNotEmpty ? '${_sentiment[0].toUpperCase()}${_sentiment.substring(1)}${_containsVulgar ? ' (Vulgar)' : ''}' : 
                    'Not Listening',
                    style: TextStyle(
                      fontSize: 20,
                      color: _isListening ? Colors.green.shade900 : 
                            _isLoading ? Colors.orange.shade900 : 
                            _sentiment.isNotEmpty ? _getSentimentTextColor() : Colors.grey.shade700,
                    ),
                  ),
                  if (!_isLoading) Text(
                    'Confidence: ${(_confidence * 100).toStringAsFixed(1)}%',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey.shade700,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            child: Container(
              padding: EdgeInsets.only(bottom: 150),
              child: SingleChildScrollView(
                reverse: true,
                child: Padding(
                  padding: const EdgeInsets.all(30.0),
                  child: Text(
                    _text,
                    style: TextStyle(
                      fontSize: 32,
                      color: Colors.black87,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          FloatingActionButton(
            onPressed: _listen,
            child: Icon(_isListening ? Icons.mic : Icons.mic_none),
            backgroundColor: _isListening ? Colors.green : Colors.blue,
          ),
          SizedBox(width: 20),
          FloatingActionButton(
            onPressed: _speak,
            child: Icon(Icons.play_arrow),
          ),
        ],
      ),
    );
  }
}
