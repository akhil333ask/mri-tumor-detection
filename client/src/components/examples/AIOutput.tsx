import AIOutput from '../AIOutput';

export default function AIOutputExample() {
  const mockResults = {
    detections: 1,
    primaryFindings: [
      'Glioma detected in frontal lobe region',
      'Tumor mass approximately 2.3cm in diameter',
      'High signal intensity on T2-weighted images'
    ],
    confidence: 82,
    recommendations: [
      'Recommend follow-up MRI in 3 months',
      'Consider consultation with neurosurgery',
      'Additional contrast-enhanced imaging may be beneficial'
    ]
  };

  return (
    <div className="w-96">
      <AIOutput 
        isAnalyzing={false}
        results={mockResults}
      />
    </div>
  );
}