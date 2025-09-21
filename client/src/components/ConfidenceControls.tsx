import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ConfidenceControlsProps {
  segmentationThreshold: number;
  classificationThreshold: number;
  onSegmentationChange: (value: number) => void;
  onClassificationChange: (value: number) => void;
}

export default function ConfidenceControls({
  segmentationThreshold,
  classificationThreshold,
  onSegmentationChange,
  onClassificationChange
}: ConfidenceControlsProps) {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-card-foreground">
            Segmentation Confidence Threshold
          </Label>
          <div className="flex items-center justify-between mt-2 mb-3">
            <span className="text-xs text-muted-foreground">0%</span>
            <span className="text-sm font-mono text-primary" data-testid="text-segmentation-value">
              {segmentationThreshold}%
            </span>
            <span className="text-xs text-muted-foreground">100%</span>
          </div>
          <Slider
            value={[segmentationThreshold]}
            onValueChange={([value]) => onSegmentationChange(value)}
            max={100}
            min={0}
            step={1}
            className="cursor-pointer"
            data-testid="slider-segmentation"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-card-foreground">
            Classification Confidence Threshold
          </Label>
          <div className="flex items-center justify-between mt-2 mb-3">
            <span className="text-xs text-muted-foreground">0%</span>
            <span className="text-sm font-mono text-primary" data-testid="text-classification-value">
              {classificationThreshold}%
            </span>
            <span className="text-xs text-muted-foreground">100%</span>
          </div>
          <Slider
            value={[classificationThreshold]}
            onValueChange={([value]) => onClassificationChange(value)}
            max={100}
            min={0}
            step={1}
            className="cursor-pointer"
            data-testid="slider-classification"
          />
        </div>
      </div>
    </Card>
  );
}