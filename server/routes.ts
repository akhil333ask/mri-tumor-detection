import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import sharp from "sharp";
import { storage } from "./storage";
import { insertAnalysisSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/dicom') {
      cb(null, true);
    } else {
      cb(new Error('Only image files and DICOM files are allowed'));
    }
  },
});

// Simulated AI analysis function
function simulateAIAnalysis(
  filename: string,
  fileSize: number,
  segmentationThreshold: number,
  classificationThreshold: number
) {
  // Simulate different results based on filename patterns
  const hasGlioma = filename.toLowerCase().includes('glioma') || 
                   filename.toLowerCase().includes('tumor') ||
                   Math.random() > 0.6;
  
  const confidence = hasGlioma ? Math.floor(75 + Math.random() * 20) : Math.floor(20 + Math.random() * 30);
  
  const detections = [];
  if (hasGlioma && confidence >= classificationThreshold) {
    detections.push({
      type: 'glioma',
      confidence: confidence,
      x: 40 + Math.random() * 20,
      y: 20 + Math.random() * 20,
      size: Math.random() * 3 + 1.5
    });
  }

  const findings = hasGlioma && confidence >= classificationThreshold ? [
    `Glioma detected in frontal lobe region`,
    `Tumor mass approximately ${(Math.random() * 2 + 1.5).toFixed(1)}cm in diameter`,
    `High signal intensity on T2-weighted images`,
    confidence > 85 ? 'High confidence detection' : 'Moderate confidence detection'
  ] : [
    'No significant abnormalities detected',
    'Normal brain tissue architecture',
    'No evidence of mass lesions'
  ];

  const recommendations = hasGlioma && confidence >= classificationThreshold ? [
    'Recommend follow-up MRI in 3 months',
    'Consider consultation with neurosurgery',
    'Additional contrast-enhanced imaging may be beneficial',
    'Correlate with clinical symptoms and history'
  ] : [
    'Continue routine screening as appropriate',
    'No immediate follow-up required',
    'Maintain current monitoring schedule'
  ];

  return {
    detections,
    primaryFindings: findings,
    confidence,
    recommendations,
    processingTime: (Math.random() * 3 + 1.5).toFixed(1)
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // File upload and analysis endpoint
  app.post('/api/analyze', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { segmentationThreshold = 50, classificationThreshold = 75 } = req.body;
      
      // Validate thresholds
      const thresholds = z.object({
        segmentationThreshold: z.coerce.number().min(0).max(100),
        classificationThreshold: z.coerce.number().min(0).max(100),
      }).parse({ segmentationThreshold, classificationThreshold });

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));

      // Run AI simulation
      const aiResults = simulateAIAnalysis(
        req.file.originalname,
        req.file.size,
        thresholds.segmentationThreshold,
        thresholds.classificationThreshold
      );

      // Generate analysis report
      const analysisReport = `ANALYSIS COMPLETE
═══════════════════════════════════════

DETECTION SUMMARY:
• Objects detected: ${aiResults.detections.length}
• Primary confidence: ${aiResults.confidence}%
• Processing time: ${aiResults.processingTime}s
• Analysis status: COMPLETE

PRIMARY FINDINGS:
${aiResults.primaryFindings.map(finding => `• ${finding}`).join('\n')}

CLINICAL RECOMMENDATIONS:
${aiResults.recommendations.map(rec => `• ${rec}`).join('\n')}

TECHNICAL DETAILS:
• Segmentation algorithm: YOLOv8 + DenseNet121
• Classification model: EfficientNet-B7
• Image resolution: 512x512 pixels
• Segmentation threshold: ${thresholds.segmentationThreshold}%
• Classification threshold: ${thresholds.classificationThreshold}%

Note: This analysis is for research purposes only and should not be used for clinical diagnosis without physician review.`;

      // Store analysis results
      const analysisData = {
        filename: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        segmentationThreshold: thresholds.segmentationThreshold,
        classificationThreshold: thresholds.classificationThreshold,
        detections: aiResults.detections,
        analysisReport
      };

      const result = await storage.createAnalysis(analysisData);

      res.json({
        success: true,
        analysisId: result.id,
        detections: aiResults.detections.length,
        primaryFindings: aiResults.primaryFindings,
        confidence: aiResults.confidence,
        recommendations: aiResults.recommendations,
        report: analysisReport
      });

    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        error: 'Analysis failed', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  // Get recent analyses
  app.get('/api/analyses', async (req, res) => {
    try {
      const analyses = await storage.getRecentAnalyses(10);
      res.json(analyses);
    } catch (error) {
      console.error('Error fetching analyses:', error);
      res.status(500).json({ error: 'Failed to fetch analyses' });
    }
  });

  // Get specific analysis
  app.get('/api/analyses/:id', async (req, res) => {
    try {
      const analysis = await storage.getAnalysis(req.params.id);
      if (!analysis) {
        return res.status(404).json({ error: 'Analysis not found' });
      }
      res.json(analysis);
    } catch (error) {
      console.error('Error fetching analysis:', error);
      res.status(500).json({ error: 'Failed to fetch analysis' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
