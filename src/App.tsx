
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import WelcomePage from "./components/auth/WelcomePage";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import MainLayout from "./components/layout/MainLayout";
import FeedPage from "./pages/FeedPage";
import ExplorePage from "./pages/ExplorePage";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage from "./pages/MessagesPage";
import NotFound from "./pages/NotFound";
import ThreadsPage from "./pages/ThreadsPage";
import ConnectPage from "./pages/ConnectPage";
import QuickPicPage from "./pages/QuickPicPage";
import FilmsPage from "./pages/FilmsPage";
import SpacesPage from "./pages/SpacesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Main app routes - wrapped in MainLayout */}
            <Route path="/" element={<MainLayout />}>
              <Route path="/feed" element={<FeedPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/create" element={<CreatePostPage />} />
              <Route path="/activity" element={<Navigate to="/notifications" />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Feature routes */}
              <Route path="/threads" element={<ThreadsPage />} />
              <Route path="/connect" element={<ConnectPage />} />
              <Route path="/quickpic" element={<QuickPicPage />} />
              <Route path="/films" element={<FilmsPage />} />
              <Route path="/spaces" element={<SpacesPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
