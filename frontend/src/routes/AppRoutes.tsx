import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import HomePage from "../pages/HomePage";
import HSCPage from "../pages/HSCPage";
import NotFoundPage from "../pages/NotFoundPage";
import DegreePage from "../pages/DegreePage";
import HonoursAndMasters from "../pages/HonoursAndMasters";
import GalleryPage from "../pages/GalleryPage";
import OfficialsPage from "../pages/OfficialsPage";
import AdmissionPage from "../pages/AdmissionPage";
import GeneralPage from "../pages/GeneralPage";
import ExamNoticePage from "../pages/ExamNoticePage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages using the main layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/notice/hsc" element={<HSCPage />} />
        <Route path="/notice/degree" element={<DegreePage />} />
        <Route path="/notice/honours&masters" element={<HonoursAndMasters />} />
        <Route path="/notice/officials" element={<OfficialsPage />} />
        <Route path="/notice/admission" element={<AdmissionPage />} />
        <Route path="/notice/exam" element={<ExamNoticePage />} />
        <Route path="/notice/general" element={<GeneralPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin login — no public Header/Footer */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected admin */}
      <Route element={<ProtectedAdminRoute />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboardPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;