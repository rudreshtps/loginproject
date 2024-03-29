import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import CoursePage from "./CoursePage";
import IndexPage from './IndexPage';
import CertificatePage from "./CertificatePage"
import TheoryPage from  "./TheoryPage";
import ExercisePage from "./ExercisePage";
import ChapterSummaryPage from "./ChapterSummaryPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CoursePage" element={<CoursePage />} />
        <Route path="/IndexPage" element={<IndexPage />} />
        <Route path="/TheoryPage" element={<TheoryPage />} />
        <Route path="/ExercisePage" element={<ExercisePage />} />
        <Route path="/ChapterSummaryPage" element={<ChapterSummaryPage />} />
        <Route path="/CertificatePage" element={<CertificatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
