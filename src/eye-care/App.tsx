import { useState, createContext, useContext } from "react";
import { useAssessment } from "./hooks/useAssessment";
import Dashboard from "./pages/Dashboard";
import ChapterAssessment from "./pages/ChapterAssessment";
import Reports from "./pages/Reports";
import Setup from "./pages/Setup";
import Layout from "./components/Layout";

type Page = "dashboard" | "setup" | "assessment" | "reports";

interface AppContextType {
  currentPage: Page;
  selectedChapter: string | null;
  navigate: (page: Page, chapterId?: string) => void;
  assessment: ReturnType<typeof useAssessment>;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppContext");
  return ctx;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const assessment = useAssessment();

  const navigate = (page: Page, chapterId?: string) => {
    setCurrentPage(page);
    if (chapterId) setSelectedChapter(chapterId);
  };

  return (
    <AppContext.Provider value={{ currentPage, selectedChapter, navigate, assessment }}>
      <Layout>
        {currentPage === "dashboard" && <Dashboard />}
        {currentPage === "setup" && <Setup />}
        {currentPage === "assessment" && selectedChapter && (
          <ChapterAssessment chapterId={selectedChapter} />
        )}
        {currentPage === "reports" && <Reports />}
      </Layout>
    </AppContext.Provider>
  );
}
