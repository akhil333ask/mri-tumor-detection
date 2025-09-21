import ConfidenceControls from '../ConfidenceControls';

export default function ConfidenceControlsExample() {
  return (
    <div className="w-80">
      <ConfidenceControls 
        segmentationThreshold={50}
        classificationThreshold={75}
        onSegmentationChange={(value) => console.log('Segmentation threshold:', value)}
        onClassificationChange={(value) => console.log('Classification threshold:', value)}
      />
    </div>
  );
}