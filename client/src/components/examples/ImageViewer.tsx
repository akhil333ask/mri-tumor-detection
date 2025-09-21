import ImageViewer from '../ImageViewer';

export default function ImageViewerExample() {
  // Mock MRI image using a data URL (simple brain scan representation)
  const mockImageFile = new File(['mock-content'], 'brain_scan.jpg', { type: 'image/jpeg' });
  
  return (
    <div className="h-96">
      <ImageViewer 
        imageFile={mockImageFile}
        isScanning={false}
        onScanComplete={() => console.log('Scan complete')}
        segmentationThreshold={50}
        classificationThreshold={75}
      />
    </div>
  );
}