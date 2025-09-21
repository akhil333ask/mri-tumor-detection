import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface AIOutputProps {
  isAnalyzing: boolean;
  results: {
    detections: number;
    primaryFindings: string[];
    confidence: number;
    recommendations: string[];
  } | null;
}

export default function AIOutput({ isAnalyzing, results }: AIOutputProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      setDisplayText('');
      setIsTyping(true);
      
      const processingMessages = [
        'Initializing YOLOv8 + DenseNet121 model...',
        'Loading neural network weights...',
        'Preprocessing MRI image data...',
        'Performing segmentation analysis...',
        'Running tumor classification algorithms...',
        'Computing confidence scores...',
        'Analyzing detection patterns...',
        'Generating medical report...'
      ];

      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < processingMessages.length) {
          setDisplayText(prev => prev + processingMessages[messageIndex] + '\n');
          messageIndex++;
        } else {
          clearInterval(interval);
        }
      }, 800);

      return () => clearInterval(interval);
    } else if (results) {
      setIsTyping(true);
      const fullReport = generateReport(results);
      
      let charIndex = 0;
      setDisplayText('');
      
      const typeInterval = setInterval(() => {
        if (charIndex < fullReport.length) {
          setDisplayText(fullReport.substring(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 20);

      return () => clearInterval(typeInterval);
    }
  }, [isAnalyzing, results]);

  const generateReport = (results: NonNullable<AIOutputProps['results']>) => {
    return `ANALYSIS COMPLETE
═══════════════════════════════════════

DETECTION SUMMARY:
• Objects detected: ${results.detections}
• Primary confidence: ${results.confidence}%
• Analysis status: COMPLETE

PRIMARY FINDINGS:
${results.primaryFindings.map(finding => `• ${finding}`).join('\n')}

CLINICAL RECOMMENDATIONS:
${results.recommendations.map(rec => `• ${rec}`).join('\n')}

TECHNICAL DETAILS:
• Segmentation algorithm: YOLOv8 + DenseNet121
• Classification model: EfficientNet-B7
• Image resolution: 512x512 pixels

Note: This analysis is for research purposes only and should not be used for clinical diagnosis without physician review.`;
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">Output</h3>
      
      <div className="relative">
        <Textarea
          value={displayText}
          readOnly
          className="min-h-[300px] font-mono text-sm bg-black text-green-400 border-muted resize-none"
          placeholder="AI analysis results will appear here..."
          data-testid="ai-output-text"
        />
        
        {isTyping && (
          <div className="absolute bottom-2 right-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}