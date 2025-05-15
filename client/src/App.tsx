import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PublicRoutes from "./routes/PublicRoutes";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public - homepage, products, login, etc. */}
          <Route path="/*" element={<PublicRoutes />} />

          {/* Protected for logged-in users */}
          <Route path="/user/*" element={<PrivateRoutes />} />

          {/* Admin-only pages */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
