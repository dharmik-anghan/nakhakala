import React, { useState } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.neutrals[100]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ${({ theme }) => theme.transitions.smooth};
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.gradients.soft};
  color: ${({ theme }) => theme.colors.neutrals[500]};
  text-align: center;
  padding: ${({ theme }) => theme.spacing[4]};
`;

const PlaceholderIcon = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.gold.primary};
`;

const PlaceholderText = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.neutrals[600]};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
`;

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  title?: string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  title,
  loading = 'lazy',
  className
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <ImageContainer className={className}>
        <Placeholder>
          <PlaceholderIcon>🎨</PlaceholderIcon>
          <PlaceholderText>
            {title || alt}
            <br />
            <small>Image coming soon</small>
          </PlaceholderText>
        </Placeholder>
      </ImageContainer>
    );
  }

  return (
    <ImageContainer className={className}>
      {isLoading && (
        <Placeholder>
          <PlaceholderIcon>✨</PlaceholderIcon>
          <PlaceholderText>Loading...</PlaceholderText>
        </Placeholder>
      )}
      <Image
        src={src}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </ImageContainer>
  );
};

export default ImageWithFallback;