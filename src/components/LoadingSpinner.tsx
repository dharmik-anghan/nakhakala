import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[8]};
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid ${({ theme }) => theme.colors.neutrals[200]};
  border-top: 3px solid ${({ theme }) => theme.colors.gold.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.neutrals[600]};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  animation: ${pulse} 1.5s ease-in-out infinite;
  margin: 0;
`;

const NailEmoji = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  animation: ${pulse} 2s ease-in-out infinite;
`;

interface LoadingSpinnerProps {
  message?: string;
  minimal?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading beautiful nail art...", 
  minimal = false 
}) => {
  if (minimal) {
    return (
      <LoadingContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ minHeight: '100px', padding: '2rem' }}
      >
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <LoadingContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <NailEmoji>💅</NailEmoji>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;