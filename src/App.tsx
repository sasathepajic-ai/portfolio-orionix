import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { ServiceDetail } from './pages/ServiceDetail';
import { ScrollToHash } from './components/ScrollToHash';

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
