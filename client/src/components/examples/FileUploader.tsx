import FileUploader from '../FileUploader';

export default function FileUploaderExample() {
  const mockFile = new File([''], 'brain_scan.dcm', { type: 'application/dicom' });
  
  return (
    <div className="w-80">
      <FileUploader 
        onFileSelect={(file) => console.log('File selected:', file.name)}
        uploadedFile={mockFile}
      />
    </div>
  );
}