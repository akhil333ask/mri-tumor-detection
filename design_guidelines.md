# MRI Tumor Detection Interface Design Guidelines

## Design Approach
**Reference-Based Approach**: Medical technology interfaces (inspired by professional medical imaging software like DICOM viewers, RadiAnt, and modern AI diagnostic platforms)

**Design Principles**:
- Clinical precision with modern aesthetics
- High contrast for medical accuracy
- Subtle animations that convey AI processing
- Professional credibility through clean typography

## Core Design Elements

### A. Color Palette
**Dark Mode Primary** (Medical Professional Theme):
- Background: 210 15% 8% (deep navy-black)
- Surface: 210 12% 12% (dark gray-blue)
- Primary: 200 100% 65% (medical blue)
- Success: 150 80% 50% (diagnostic green)
- Warning: 35 90% 60% (attention amber)
- Text Primary: 0 0% 95% (near white)
- Text Secondary: 0 0% 70% (muted gray)

### B. Typography
- **Primary**: Inter or Roboto (clinical precision)
- **Headers**: 24px-32px, medium weight
- **Body**: 14px-16px, regular weight
- **UI Labels**: 12px-14px, medium weight

### C. Layout System
**Tailwind Spacing**: Consistent use of 4, 6, 8, 12, 16 units
- Interface padding: p-6
- Component spacing: gap-4, gap-6
- Section margins: mb-8, mt-12

### D. Component Library

**Upload Interface**:
- Large drag-and-drop zone with dashed border
- Upload icon with subtle pulse animation
- File format indicators (DICOM, JPEG, PNG)

**Main Display Area**:
- Central image viewer with zoom controls
- Scanning overlay animation (thin blue line sweep)
- Result overlays with color-coded segmentation
- Loading states with medical scanner aesthetics

**Control Panel (Right Sidebar)**:
- Dual confidence threshold sliders
- Clean slider design with percentage displays
- Grouped controls with subtle borders

**AI Output Box**:
- Terminal-style text output
- Monospace font for technical data
- Real-time typing animation for results
- Status indicators (Processing/Complete)

**Navigation**:
- Minimal top navigation
- Medical cross or brain icon branding
- Clean typography hierarchy

### E. Animations
**Scanning Effect**: Horizontal blue line sweep across uploaded image (2-3 seconds)
**Loading States**: Subtle pulse on upload areas, spinner for AI processing
**Result Reveal**: Gentle fade-in for segmentation overlays and text output

## Visual Treatment
**High-Tech Medical Aesthetic**:
- Subtle grid patterns in backgrounds
- Soft glows around active elements
- Clean geometric borders
- Professional button styling with hover states

**Interface Personality**: Clinical precision meets modern AI - trustworthy, cutting-edge, and purpose-built for medical professionals.

## Images
No large hero image needed. The interface focuses on the uploaded MRI scan as the central visual element, with supporting medical iconography and subtle background patterns.