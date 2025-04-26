import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BlogList from "./pages/BlogList";
import CreateBlog from "./pages/CreateBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}

      <Routes>
        <Route path="/auth" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BlogList />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/blogs" element={<CreateBlog />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{ top: "50px" }}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
