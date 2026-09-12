import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import ProtectedAdminRoute from "../components/ProtectedAdminRoute";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminLoginPage from "../pages/admin/AdminLoginPage";
import HomePage from "../pages/HomePage";
import HSCPage from "../pages/notices/HSCPage";
import NotFoundPage from "../pages/NotFoundPage";
import DegreePage from "../pages/notices/DegreePage";
import HonoursAndMasters from "../pages/notices/HonoursAndMasters";
import GalleryPage from "../pages/GalleryPage";
import OfficialsPage from "../pages/notices/OfficialsPage";
import AdmissionPage from "../pages/AdmissionPage";
import GeneralPage from "../pages/notices/GeneralPage";
import ExamNoticePage from "../pages/notices/ExamNoticePage";
import ProfessorsPage from "../pages/faculty & employee/ProfessorsPage";
import EmployeesPage from "../pages/faculty & employee/EmployeesPage";
import PrinciplesDialoguePage from "../pages/dialogue/PrinciplesDialoguePage";
import VicePrinciplesDialoguePage from "../pages/dialogue/VicePrinciplesDialoguePage";
import AssistantProfessorPage from "../pages/faculty & employee/AssistantProfessorPage";
import LecturerPage from "../pages/faculty & employee/LecturerPage";
import ExhibitorPage from "../pages/faculty & employee/ExhibitorPage";
import SpandanPage from "../pages/clubs/SpandanPage";
import BNCCPage from "../pages/clubs/BNCCPage";
import SportsClubPage from "../pages/clubs/SportsClubPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public pages using the main layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/admission" element={<AdmissionPage />} />


        {/* notices */}
        <Route path="/notice/hsc" element={<HSCPage />} />
        <Route path="/notice/degree" element={<DegreePage />} />
        <Route path="/notice/honours&masters" element={<HonoursAndMasters />} />
        <Route path="/notice/officials" element={<OfficialsPage />} />
        <Route path="/notice/exam" element={<ExamNoticePage />} />
        <Route path="/notice/general" element={<GeneralPage />} />
        <Route path="/gallery" element={<GalleryPage />} />


        {/* dialogue */}
        <Route path="/principlesDialogue" element={<PrinciplesDialoguePage />}/>
        <Route path="/vicePrinciplesDialogue" element={<VicePrinciplesDialoguePage />}/>

        

        {/* faculty & employee */}
        <Route path="/professors" element={<ProfessorsPage />} />
        <Route path="/assistant-professors" element={<AssistantProfessorPage />}/>
        <Route path="/lecturers" element={<LecturerPage />} />
        <Route path="/exhibitors" element={<ExhibitorPage />} />
        <Route path="/employees" element={<EmployeesPage />} />



        {/* clubs */}
        <Route path="/স্পন্দন" element={<SpandanPage />} />
        <Route path="/BNCC" element={<BNCCPage />} />
        <Route path="/Sports Club" element={<SportsClubPage />} />

        
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin login — no public Header/Footer */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Protected admin */}
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
