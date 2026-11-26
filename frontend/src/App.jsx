import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./lib/AuthContext.jsx";
import { Spinner } from "./components/ui.jsx";
import AppShell from "./components/AppShell.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
function Protected() {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="screen-loader">
        <Spinner text="Loading workspace" />
      </div>
    );
  return user ? <AppShell /> : <Navigate to="/login" replace />;
}
function Guest({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="screen-loader">
        <Spinner />
      </div>
    );
  return user ? <Navigate to="/app" replace /> : children;
}
export default function App() {
  document.documentElement.dataset.theme =
    localStorage.getItem("review_theme") === "light" ? "light" : "dark";
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <Guest>
            <AuthPage mode="login" />
          </Guest>
        }
      />
      <Route
        path="/register"
        element={
          <Guest>
            <AuthPage mode="register" />
          </Guest>
        }
      />
      <Route path="/app" element={<Protected />}>
        <Route index element={<DashboardPage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="review/:id" element={<ResultsPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
