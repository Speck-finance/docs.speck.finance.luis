import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { TableOfContents } from "./components/TableOfContents";
import { Main } from "./components/Main";
import { Overview } from "./pages/Overview";
import { Manifesto } from "./pages/Manifesto";
import { WhitePaper } from "./pages/WhitePaper";
import { Regulatory } from "./pages/Regulatory";
import { FAQ } from "./pages/FAQ";
// import { Partners } from "./pages/Partners";
import { ThemeProvider } from "./contexts/ThemeContext";

export const App: FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <Header />
          <div className="flex pt-14">
            <Sidebar />
            <Main className="w-full lg:ml-44 lg:mr-64">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/manifesto" element={<Manifesto />} />
                <Route path="/white-paper" element={<WhitePaper />} />
                <Route path="/regulatory" element={<Regulatory />} />
                <Route path="/faq" element={<FAQ />} />
                {/* <Route path="/partners" element={<Partners />} /> */}
              </Routes>
            </Main>
            <TableOfContents />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
