import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';

// Components
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import Gallery from './components/Gallery';
import BrandFeature from './components/BrandFeature';
import About from './components/About';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <Navigation />
        <main>
          <Hero />
          <Features />
          <Services />
          <Gallery />
          <BrandFeature />
          <About />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </ThemeProvider>
  );
}

export default App;
