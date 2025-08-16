import React, { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

// Critical components (loaded immediately)
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LoadingSpinner from './components/LoadingSpinner';
import BackToTop from './components/BackToTop';
import PageTransition from './components/PageTransition';

// Lazy loaded components (loaded on demand)
const Features = React.lazy(() => import('./components/Features'));
const Services = React.lazy(() => import('./components/Services'));
const Gallery = React.lazy(() => import('./components/Gallery'));
const BrandFeature = React.lazy(() => import('./components/BrandFeature'));
const About = React.lazy(() => import('./components/About'));
const Footer = React.lazy(() => import('./components/Footer'));
const FloatingContact = React.lazy(() => import('./components/FloatingContact'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageTransition>
        <div className="App">
          <Navigation />
          <main>
            <Hero />
            <Suspense fallback={<LoadingSpinner message="Loading our premium features..." minimal />}>
              <Features />
            </Suspense>
            <Suspense fallback={<LoadingSpinner message="Loading service details..." minimal />}>
              <Services />
            </Suspense>
            <Suspense fallback={<LoadingSpinner message="Loading our stunning gallery..." minimal />}>
              <Gallery />
            </Suspense>
            <Suspense fallback={<LoadingSpinner message="Loading brand story..." minimal />}>
              <BrandFeature />
            </Suspense>
            <Suspense fallback={<LoadingSpinner message="Loading about us..." minimal />}>
              <About />
            </Suspense>
          </main>
          <Suspense fallback={<LoadingSpinner minimal />}>
            <Footer />
          </Suspense>
          <Suspense fallback={<div />}>
            <FloatingContact />
          </Suspense>
          <BackToTop />
        </div>
      </PageTransition>
    </ThemeProvider>
  );
}

export default App;
