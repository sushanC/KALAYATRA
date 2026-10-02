import { Routes, Route } from 'react-router-dom';
import { CityProvider } from './context/CityContext';
import { ToastProvider } from './context/ToastContext';
import MainLayout from './layouts/MainLayout';

// Page components
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import ArtFormDetailPage from './pages/ArtFormDetailPage';
import ExperiencesPage from './pages/ExperiencesPage';
import GuidePage from './pages/GuidePage';
import JourneyPage from './pages/JourneyPage';
import BecomePartPage from './pages/BecomePartPage';
import MapPage from './pages/MapPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <CityProvider>
      <ToastProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/art-forms/:slug" element={<ArtFormDetailPage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/become-part" element={<BecomePartPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MainLayout>
      </ToastProvider>
    </CityProvider>
  );
}
