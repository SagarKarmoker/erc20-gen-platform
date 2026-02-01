import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { CreateToken } from './pages/CreateToken';
import { MyTokens } from './pages/MyTokens';
import { TokenDetails } from './pages/TokenDetails';
import { Explore } from './pages/Explore';

function App() {
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
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
