import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ImageViewerProps {
  imageFile: File | null;
  isScanning: boolean;
  onScanComplete: () => void;
  segmentationThreshold: number;
  classificationThreshold: number;
}

interface DetectionResult {
  type: string;
  confidence: number;
  x: number;
  y: number;
}

export default function ImageViewer({ 
  imageFile, 
  isScanning, 
  onScanComplete,
  segmentationThreshold,
  classificationThreshold 
}: ImageViewerProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  useEffect(() => {
    if (isScanning) {
      setScanProgress(0);
      setDetectionResults([]);
      
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // Simulate AI detection results
            const results: DetectionResult[] = [
              { type: 'glioma', confidence: 82, x: 45, y: 25 },
            ].filter(result => result.confidence >= classificationThreshold);
            
            setDetectionResults(results);
            onScanComplete();
            return 100;
          }
          return prev + 2;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isScanning, onScanComplete, classificationThreshold]);

  return (
    <Card className="flex-1 p-6">
      <div className="relative h-full min-h-[600px] bg-black rounded-lg overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="MRI Scan"
              className="w-full h-full object-contain"
              data-testid="mri-image"
            />
            
            {/* Scanning overlay */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="absolute w-full h-0.5 bg-primary shadow-lg shadow-primary/50 transition-all duration-75"
                  style={{ 
                    top: `${scanProgress}%`,
                    boxShadow: '0 0 20px hsl(var(--primary))'
                  }}
                  data-testid="scan-line"
                />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded px-3 py-1">
                  <span className="text-sm font-mono text-primary">
                    Scanning... {scanProgress.toFixed(0)}%
                  </span>
                </div>
              </div>
            )}

            {/* Detection results overlay */}
            {detectionResults.map((result, index) => (
              <div
                key={index}
                className="absolute pointer-events-none"
                style={{
                  left: `${result.x}%`,
                  top: `${result.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                data-testid={`detection-result-${index}`}
              >
                <div className="relative">
                  <div className="w-24 h-24 border-2 border-primary rounded-full animate-pulse" />
                  <Badge 
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
                  >
                    {result.type} {result.confidence}%
                  </Badge>
                </div>
              </div>
            ))}

            {/* Bottom detection counter */}
            {detectionResults.length > 0 && (
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded px-3 py-1">
                <span className="text-sm text-card-foreground">
                  {detectionResults.length} object{detectionResults.length !== 1 ? 's' : ''} detected
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <div className="w-24 h-24 mx-auto mb-4 border-2 border-dashed border-muted rounded-lg flex items-center justify-center">
                <span className="text-3xl">🧠</span>
              </div>
              <p className="text-lg font-medium">No image selected</p>
              <p className="text-sm">Upload an MRI scan to begin analysis</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}