import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ImageViewer from '@/components/ImageViewer';
import ConfidenceControls from '@/components/ConfidenceControls';
import AIOutput from '@/components/AIOutput';
import { useToast } from '@/hooks/use-toast';

export default function MRIAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [segmentationThreshold, setSegmentationThreshold] = useState(50);
  const [classificationThreshold, setClassificationThreshold] = useState(75);
  const [analysisResults, setAnalysisResults] = useState<{
    detections: number;
    primaryFindings: string[];
    confidence: number;
    recommendations: string[];
  } | null>(null);

  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setAnalysisResults(null);
    setIsScanning(false);
    setIsAnalyzing(false);
    
    // Auto-start scanning after file upload
    setTimeout(() => {
      setIsScanning(true);
      setIsAnalyzing(true);
      performAnalysis(file);
    }, 500);
  };

  const performAnalysis = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('segmentationThreshold', segmentationThreshold.toString());
      formData.append('classificationThreshold', classificationThreshold.toString());

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      setAnalysisResults({
        detections: result.detections,
        primaryFindings: result.primaryFindings,
        confidence: result.confidence,
        recommendations: result.recommendations
      });

      toast({
        title: "Analysis Complete",
        description: `${result.detections} object(s) detected with ${result.confidence}% confidence`,
      });

    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResults({
        detections: 0,
        primaryFindings: ['Analysis failed - please try again'],
        confidence: 0,
        recommendations: ['Check file format and try again', 'Contact support if issue persists']
      });
      
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleScanComplete = () => {
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-semibold text-card-foreground">MRI Tumor Detection</h1>
          </div>
          <div className="text-sm text-muted-foreground">
            YOLOv8 + DenseNet121
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-card p-4 flex flex-col">
          <div className="flex-1">
            <FileUploader 
              onFileSelect={handleFileSelect}
              uploadedFile={uploadedFile}
            />
          </div>
        </div>

        {/* Center - Image Viewer */}
        <div className="flex-1 p-4">
          <ImageViewer 
            imageFile={uploadedFile}
            isScanning={isScanning}
            onScanComplete={handleScanComplete}
            segmentationThreshold={segmentationThreshold}
            classificationThreshold={classificationThreshold}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border bg-card p-4 space-y-4">
          <ConfidenceControls 
            segmentationThreshold={segmentationThreshold}
            classificationThreshold={classificationThreshold}
            onSegmentationChange={setSegmentationThreshold}
            onClassificationChange={setClassificationThreshold}
          />
          
          <AIOutput 
            isAnalyzing={isAnalyzing}
            results={analysisResults}
          />
        </div>
      </div>
    </div>
  );
}