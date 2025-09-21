import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  uploadedFile: File | null;
}

export default function FileUploader({ onFileSelect, uploadedFile }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onFileSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-card-foreground">Upload Image</h3>
      
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 flex-1 flex items-center justify-center
          ${isDragOver ? 'border-primary bg-primary/10' : 'border-muted'}
          ${uploadedFile ? 'bg-muted/20' : 'hover:border-primary/50 hover:bg-primary/5'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-testid="drop-zone"
      >
        {uploadedFile ? (
          <div className="space-y-2 max-w-full">
            <File className="w-8 h-8 mx-auto text-primary" />
            <div className="px-4">
              <p className="text-sm font-medium text-card-foreground break-all text-center" title={uploadedFile.name}>
                {uploadedFile.name}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-card-foreground">Drop file here or</p>
              <p className="text-xs text-muted-foreground">DICOM, JPEG, PNG supported</p>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.dcm,.dicom"
        onChange={handleFileSelect}
        className="hidden"
        data-testid="file-input"
      />

      <Button
        onClick={triggerFileSelect}
        variant="outline"
        className="w-full mt-4"
        data-testid="button-select-file"
      >
        <Upload className="w-4 h-4 mr-2" />
        Select File
      </Button>
    </Card>
  );
}