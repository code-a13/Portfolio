import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react'; // 1. Import the Analytics component
import Layout from './components/Layout';

import { 
  HeroSection, 
  ProjectsSection, 
  AchievementsSection, 
  AboutSection, 
  ContactSection 
} from './components/home/Sections';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route element={<Layout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/achievements" element={<AchievementsSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Route>
      </Routes>
      
      <Analytics /> 
    </Router>
  );
}

export default App;