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
    filename: 'luxury-gold-collection.jpg', // Place this file in src/assets/images/gallery/
    title: 'Luxury Gold Collection',
    description: 'Sophisticated gold patterns with intricate detailing and premium finishes',
    category: 'luxury',
    featured: true,
    tags: ['gold', 'elegant', 'sophisticated', 'premium'],
    dateAdded: '2024-01-15'
  },
  {
    id: 2,
    filename: 'baroque-elegance.jpg',
    title: 'Baroque Elegance',
    description: 'Ornate designs inspired by classical art with rich golden accents',
    category: 'classic',
    featured: false,
    tags: ['baroque', 'ornate', 'classical', 'vintage'],
    dateAdded: '2024-01-16'
  },
  {
    id: 3,
    filename: 'modern-minimalist.jpg',
    title: 'Modern Minimalist',
    description: 'Clean lines with subtle golden accents for contemporary elegance',
    category: 'modern',
    featured: false,
    tags: ['minimalist', 'clean', 'contemporary', 'subtle'],
    dateAdded: '2024-01-17'
  },
  {
    id: 4,
    filename: 'vintage-romance.jpg',
    title: 'Vintage Romance',
    description: 'Timeless patterns with romantic flair and delicate details',
    category: 'classic',
    featured: false,
    tags: ['vintage', 'romantic', 'delicate', 'timeless'],
    dateAdded: '2024-01-18'
  },
  {
    id: 5,
    filename: 'champagne-dreams.jpg',
    title: 'Champagne Dreams',
    description: 'Soft metallic tones with dreamy textures and ethereal beauty',
    category: 'luxury',
    featured: true,
    tags: ['champagne', 'metallic', 'dreamy', 'ethereal'],
    dateAdded: '2024-01-19'
  },
  {
    id: 6,
    filename: 'contemporary-art.jpg',
    title: 'Contemporary Art',
    description: 'Bold artistic expression with modern appeal and creative designs',
    category: 'artistic',
    featured: false,
    tags: ['artistic', 'bold', 'creative', 'expression'],
    dateAdded: '2024-01-20'
  },
  {
    id: 7,
    filename: 'festive-holiday.jpg',
    title: 'Festive Holiday',
    description: 'Seasonal designs perfect for special occasions and celebrations',
    category: 'seasonal',
    featured: false,
    tags: ['holiday', 'festive', 'seasonal', 'celebration'],
    dateAdded: '2024-01-21'
  },
  {
    id: 8,
    filename: 'crystal-elegance.jpg',
    title: 'Crystal Elegance',
    description: 'Crystal-inspired designs with stunning geometric patterns',
    category: 'luxury',
    featured: false,
    tags: ['crystal', 'geometric', 'stunning', 'elegant'],
    dateAdded: '2024-01-22'
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