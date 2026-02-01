import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateToken } from './pages/CreateToken';
import { MyTokens } from './pages/MyTokens';
import { TokenDetails } from './pages/TokenDetails';
import { Explore } from './pages/Explore';

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateToken />} />
          <Route path="/my-tokens" element={<MyTokens />} />
          <Route path="/token/:address" element={<TokenDetails />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Layout>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 5000,
          style: {
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f8fafc' : '#0f172a',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: theme === 'dark' ? '#1e293b' : '#ffffff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: theme === 'dark' ? '#1e293b' : '#ffffff',
            },
          },
        }}
      />
    </Router>
  );
}

function App() {
  return <AppContent />;
}

export default App;
