import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/auth-pages/Welcome';
import AuthWrapper from './pages/auth-pages/AuthWrapper';
import LoadingScreen from './components/Loading';
import Dashboard from './pages/user/Dashboard';
import BattleSpace from './pages/user/BattleSpace';
import SetupSimulation from './pages/user/simulation/SetupSimulation1';
import SetupSimulationEnemy from './pages/user/simulation/SetupSimulation2';
import PlaySimulation from './pages/user/simulation/PlaySimulation';
import Simulation from './pages/user/Simulation';
import Missions from './pages/user/Missions';
import Equipment from './pages/user/Equipment';
import Profile from './pages/auth-pages/profile/Profile';
import Settings from './pages/user/Settings';
import MapComponent from './components/map/MapComponent';
import FriendPreview from './pages/user/preview/FriendPreview';
import EnemyPreview from './pages/user/preview/EnemyPreview';
import Preview from './pages/user/preview/Preview';


const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Welcome />} />  
          <Route path="/loading" element={<LoadingScreen />} />
          <Route path="/auth" element={<AuthWrapper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/battlespace" element={<BattleSpace />} />
          <Route path="/setup-simulation" element={<SetupSimulation />} />
          <Route path="/setup-simulation-enemy" element={<SetupSimulationEnemy />} />
          <Route path="/play-simulation" element={<PlaySimulation />} />
          <Route path="/simulation" element={<Simulation />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/map" element={<MapComponent />} />
          <Route path="/friend-preview" element={<FriendPreview />} />
          <Route path="/enemy-preview" element={<EnemyPreview />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
