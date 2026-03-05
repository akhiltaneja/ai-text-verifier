
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Eagerly load the index page for fast initial render
import Index from './pages/Index';

// Lazy load all other routes
const AIDetector = lazy(() => import('./pages/AIDetector'));
const AISummaryTool = lazy(() => import('./pages/AISummaryTool'));
const GrammarChecker = lazy(() => import('./pages/GrammarChecker'));
const TranslationTool = lazy(() => import('./pages/TranslationTool'));
const ParaphrasingTool = lazy(() => import('./pages/ParaphrasingTool'));
const Pricing = lazy(() => import('./pages/Pricing'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Profile = lazy(() => import('./pages/Profile'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const KnowledgeBase = lazy(() => import('./pages/KnowledgeBase'));
const Tutorials = lazy(() => import('./pages/Tutorials'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-detector" element={<AIDetector />} />
          <Route path="/ai-summary" element={<AISummaryTool />} />
          <Route path="/grammar-checker" element={<GrammarChecker />} />
          <Route path="/translation" element={<TranslationTool />} />
          <Route path="/translator" element={<TranslationTool />} />
          <Route path="/paraphrasing" element={<ParaphrasingTool />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/auth-callback" element={<AuthCallback />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
