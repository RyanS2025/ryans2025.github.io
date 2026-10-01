import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ClickSparkle from "./components/ClickSparkle";
import ResumeProvider from "./context/ResumeProvider";
import BlogPost from "./pages/BlogPost";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="*" element={
          <PageTransition>
            <div className="max-w-3xl mx-auto px-6 py-24 text-center">
              <h1 className="text-5xl font-bold mb-4">404</h1>
              <p className="text-gray-400 mb-8">This page doesn't exist.</p>
              <Link to="/" className="px-6 py-3 bg-amber-400 text-gray-950 rounded-full font-medium hover:bg-amber-300 transition-colors">
                Go home
              </Link>
            </div>
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
      <ClickSparkle>
        <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </ClickSparkle>
      </ResumeProvider>
    </BrowserRouter>
  );
}