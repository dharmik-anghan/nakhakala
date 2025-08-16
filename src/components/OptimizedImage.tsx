import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageContainer = styled(motion.div)<{ $isLoading: boolean }>`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutrals[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${({ theme }) => theme.transitions.smooth};
  
  ${({ $isLoading }) => $isLoading && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}
`;

const Image = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity ${({ theme }) => theme.transitions.smooth};
  opacity: ${({ $loaded }) => $loaded ? 1 : 0};
`;

const LoadingPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.neutrals[400]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;
`;

const ErrorPlaceholder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.colors.neutrals[500]};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  priority = false,
  onLoad,
  onError
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  // Generate WebP and fallback URLs
  const getWebPUrl = (originalSrc: string) => {
    if (originalSrc.startsWith('data:') || originalSrc.startsWith('http')) {
      return originalSrc;
    }
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const webpSrc = getWebPUrl(src);
  const shouldUseWebP = webpSrc !== src;

  return (
    <ImageContainer
      className={className}
      $isLoading={isLoading && !error}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ width, height }}
    >
      {shouldUseWebP ? (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <Image
            src={src}
            alt={alt}
            loading={loading}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={handleLoad}
            onError={handleError}
            $loaded={loaded}
          />
        </picture>
      ) : (
        <Image
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          onError={handleError}
          $loaded={loaded}
        />
      )}

      {isLoading && !error && !loaded && (
        <LoadingPlaceholder>
          <div>⌛ Loading...</div>
        </LoadingPlaceholder>
      )}

      {error && (
        <ErrorPlaceholder>
          <div>🖼️</div>
          <div>Image unavailable</div>
        </ErrorPlaceholder>
      )}
    </ImageContainer>
  );
};

export default OptimizedImage;