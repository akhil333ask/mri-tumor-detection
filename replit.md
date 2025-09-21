# MRI Tumor Detection Interface

## Overview

This is a medical AI application for MRI brain tumor detection and analysis. The system provides a professional medical imaging interface that allows users to upload MRI scans, configure AI analysis parameters, and receive detailed diagnostic reports with tumor detection results. The application simulates AI-powered tumor detection using YOLOv8 and DenseNet121 models, providing confidence scores, segmentation overlays, and comprehensive medical reports.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React + TypeScript**: Modern component-based architecture with strict typing
- **Vite**: Fast development build tool with hot module replacement
- **Tailwind CSS**: Utility-first styling with custom medical UI theme
- **Shadcn/ui Components**: Professional component library based on Radix UI primitives
- **Wouter**: Lightweight client-side routing
- **TanStack Query**: Server state management and caching

### Backend Architecture
- **Express.js**: RESTful API server with middleware support
- **Node.js**: Runtime environment with ES modules
- **Multer**: File upload handling for medical images (DICOM, JPEG, PNG)
- **Sharp**: Image processing library for medical image manipulation
- **TypeScript**: Full-stack type safety

### Data Storage
- **Drizzle ORM**: Type-safe database operations with PostgreSQL support
- **In-memory Storage**: Development fallback storage implementation
- **Database Schema**: Users table and analysis_results table with JSONB for detection data

### Medical AI Simulation
- **File Processing**: Multi-format support (DICOM, standard image formats)
- **Confidence Thresholds**: Dual-slider controls for segmentation and classification
- **Detection Simulation**: Algorithmic tumor detection based on filename patterns and randomization
- **Report Generation**: Structured medical findings with recommendations

### Design System
- **Medical Professional Theme**: Dark mode interface optimized for clinical use
- **High Contrast Colors**: Medical-grade color palette for accuracy
- **Professional Typography**: Inter/Roboto fonts for clinical precision
- **Component Architecture**: Modular UI components (FileUploader, ImageViewer, ConfidenceControls, AIOutput)

## External Dependencies

### UI Framework Dependencies
- **@radix-ui/***: Complete set of accessible UI primitives for professional interface components
- **class-variance-authority**: Type-safe component variant management
- **tailwindcss**: Core styling framework with medical theme customization

### Backend Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity for production
- **connect-pg-simple**: PostgreSQL session store for user authentication
- **multer**: Multipart form data handling for medical image uploads
- **sharp**: High-performance image processing for DICOM and medical images

### Development Tools
- **drizzle-kit**: Database schema management and migrations
- **tsx**: TypeScript execution for development server
- **esbuild**: Production build optimization

### Form and State Management
- **@hookform/resolvers**: Form validation with Zod schema integration
- **@tanstack/react-query**: Server state synchronization and caching
- **zod**: Runtime type validation for API endpoints and forms

### Medical Image Support
- Support for DICOM format (medical imaging standard)
- JPEG/PNG fallback for standard image formats
- File size limits configured for medical imaging requirements (50MB)
- Image processing pipeline for thumbnail generation and display optimization