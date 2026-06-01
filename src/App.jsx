import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ClusterDetailPage from './pages/ClusterDetailPage';
import ClustersListPage from './pages/ClustersListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import LocationPage from './pages/LocationPage';
import ProjectsListPage from './pages/ProjectsListPage';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projek" element={<ProjectsListPage />} />
        <Route path="/projek/:slug" element={<ProjectDetailPage />} />
        <Route path="/lokasi" element={<LocationPage />} />
        <Route path="/klaster" element={<ClustersListPage />} />
        <Route path="/klaster/:slug/tur" element={<ClusterDetailPage />} />
        <Route path="/klaster/:clusterSlug/projek/:slug" element={<ProjectDetailPage />} />
        <Route path="/klaster/:slug" element={<ClusterDetailPage />} />
      </Route>
    </Routes>
  );
}
