import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Import the Sections (Or separate page files if you have them)
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
        {/* Everything inside Layout gets the Sidebar */}
        <Route element={<Layout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/achievements" element={<AchievementsSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;