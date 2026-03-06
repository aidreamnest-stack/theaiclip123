import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Wallpapers from './pages/Wallpapers';
import AddWallpaper from './pages/AddWallpaper';
import Blogs from './pages/Blogs';

function App() {
    return (
        <Router>
            <AdminLayout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/wallpapers" element={<Wallpapers />} />
                    <Route path="/wallpapers/add" element={<AddWallpaper />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/settings" element={<div className="text-white/40">Settings Page Under Construction</div>} />
                </Routes>
            </AdminLayout>
        </Router>
    );
}

export default App;
