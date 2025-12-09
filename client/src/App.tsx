import { Switch, Route, useLocation, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { LoadingScreen } from "@/components/LoadingScreen";
import { useState, useEffect } from "react";
import Landing from "@/pages/landing";
import FarmerRegister from "@/pages/farmer-register";
import FactoryDashboard from "@/pages/factory";
import AdminDashboard from "@/pages/admin";
import Backbone from "@/pages/backbone";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";

// Protected Route component
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    setLocation('/login');
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/farmer-register" component={FarmerRegister} />
      <Route path="/factory" component={FactoryDashboard} />
      <Route path="/login" component={Login} />
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminDashboard} />}
      </Route>
      <Route path="/backbone" component={Backbone} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [hasLoadedBefore, setHasLoadedBefore] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const visited = sessionStorage.getItem('pa_visited');
    if (visited) {
      setShowLoading(false);
      setHasLoadedBefore(true);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('pa_visited', 'true');
    setShowLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <LanguageProvider>
            <AuthProvider>
              {showLoading && !hasLoadedBefore && (
                <LoadingScreen onComplete={handleLoadingComplete} />
              )}
              <Toaster />
              <Router />
            </AuthProvider>
          </LanguageProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
