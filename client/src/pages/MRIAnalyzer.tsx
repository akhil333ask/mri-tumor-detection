import { useState } from 'react';
import FileUploader from '@/components/FileUploader';
import ImageViewer from '@/components/ImageViewer';
import ConfidenceControls from '@/components/ConfidenceControls';
import AIOutput from '@/components/AIOutput';

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

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setAnalysisResults(null);
    
    // Auto-start scanning after file upload
    setTimeout(() => {
      setIsScanning(true);
      setIsAnalyzing(true);
    }, 500);
  };

  const handleScanComplete = () => {
    setIsScanning(false);
    
    // Simulate analysis completion
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResults({
        detections: 1,
        primaryFindings: [
          'Glioma detected in frontal lobe region',
          'Tumor mass approximately 2.3cm in diameter',
          'High signal intensity on T2-weighted images',
          'No evidence of hemorrhage or necrosis'
        ],
        confidence: 82,
        recommendations: [
          'Recommend follow-up MRI in 3 months',
          'Consider consultation with neurosurgery',
          'Additional contrast-enhanced imaging may be beneficial',
          'Correlate with clinical symptoms and history'
        ]
      });
    }, 2000);
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
            Neural Network v2.1
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-card p-4">
          <FileUploader 
            onFileSelect={handleFileSelect}
            uploadedFile={uploadedFile}
          />
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