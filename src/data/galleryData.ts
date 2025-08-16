// Gallery Data Management
// Add your images to src/assets/images/gallery/ and update this file

export interface GalleryImage {
  id: number;
  filename: string; // Just the filename, path will be auto-generated
  title: string;
  description: string;
  category: 'luxury' | 'classic' | 'modern' | 'artistic' | 'seasonal';
  featured?: boolean; // Mark special images as featured
  tags?: string[]; // Optional tags for better organization
  dateAdded?: string; // Optional date tracking
}

// INSTRUCTIONS FOR ADDING NEW IMAGES:
// 1. Save your image in: src/assets/images/gallery/
// 2. Add a new entry to the galleryImages array below
// 3. Use descriptive filenames (e.g., "luxury-gold-french-tips.jpg")
// 4. Choose appropriate category and add relevant tags

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    filename: 'elegant-french-tips.jpeg',
    title: 'Elegant French Tips',
    description: 'Classic French manicure with modern precision and premium finish',
    category: 'classic',
    featured: true,
    tags: ['french', 'classic', 'elegant', 'timeless'],
    dateAdded: '2025-08-16'
  },
  {
    id: 2,
    filename: 'luxury-gold-accent.jpeg',
    title: 'Luxury Gold Accents',
    description: 'Sophisticated gold foil details for special occasions',
    category: 'luxury',
    featured: true,
    tags: ['gold', 'luxury', 'sophisticated', 'premium'],
    dateAdded: '2025-08-16'
  },
  {
    id: 3,
    filename: 'artistic-floral-design.jpeg',
    title: 'Artistic Floral Design',
    description: 'Hand-painted botanical art with intricate detailing',
    category: 'artistic',
    featured: true,
    tags: ['floral', 'artistic', 'botanical', 'hand-painted'],
    dateAdded: '2025-08-16'
  },
  {
    id: 4,
    filename: 'modern-geometric-pattern.jpeg',
    title: 'Modern Geometric',
    description: 'Contemporary geometric patterns with clean lines',
    category: 'modern',
    featured: false,
    tags: ['geometric', 'modern', 'contemporary', 'clean'],
    dateAdded: '2025-08-16'
  },
  {
    id: 5,
    filename: 'classic-nude-elegance.jpeg',
    title: 'Classic Nude Elegance',
    description: 'Timeless nude tones perfect for everyday sophistication',
    category: 'classic',
    featured: false,
    tags: ['nude', 'classic', 'elegant', 'everyday'],
    dateAdded: '2025-08-16'
  },
  {
    id: 6,
    filename: 'bold-statement-nails.jpeg',
    title: 'Bold Statement',
    description: 'Eye-catching designs for those who love to stand out',
    category: 'artistic',
    featured: false,
    tags: ['bold', 'statement', 'eye-catching', 'dramatic'],
    dateAdded: '2025-08-16'
  },
  {
    id: 7,
    filename: 'glamorous-sparkle.jpeg',
    title: 'Glamorous Sparkle',
    description: 'Dazzling crystalline finishes for special events',
    category: 'luxury',
    featured: false,
    tags: ['sparkle', 'glamorous', 'crystalline', 'special'],
    dateAdded: '2025-08-16'
  },
  {
    id: 8,
    filename: 'premium-ombre-design.jpeg',
    title: 'Premium Ombré',
    description: 'Seamless color transitions with professional blending',
    category: 'artistic',
    featured: true,
    tags: ['ombre', 'gradient', 'blending', 'premium'],
    dateAdded: '2025-08-16'
  }
];

// Helper functions for gallery management
export const getImagePath = (filename: string): string => {
  // Auto-generate the path - images should be in src/assets/images/gallery/
  return `/assets/images/gallery/${filename}`;
};

export const getFeaturedImages = (): GalleryImage[] => {
  return galleryImages.filter(image => image.featured);
};

export const getImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'all') return galleryImages;
  return galleryImages.filter(image => image.category === category);
};

export const getImagesByTag = (tag: string): GalleryImage[] => {
  return galleryImages.filter(image => 
    image.tags?.includes(tag.toLowerCase())
  );
};

export const getRecentImages = (count: number = 6): GalleryImage[] => {
  return galleryImages
    .sort((a, b) => new Date(b.dateAdded || '').getTime() - new Date(a.dateAdded || '').getTime())
    .slice(0, count);
};

// Categories for filtering
export const galleryCategories = [
  { value: 'all', label: 'All Designs' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'classic', label: 'Classic' },
  { value: 'modern', label: 'Modern' },
  { value: 'artistic', label: 'Artistic' },
  { value: 'seasonal', label: 'Seasonal' }
];

// Easy way to add new categories
export const addNewCategory = (value: string, label: string) => {
  galleryCategories.push({ value, label });
};