import Navbar from '../components/navigation/Navbar';
import Footer from '../components/layout/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1" role="main" id="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
}
