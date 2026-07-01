import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          style: {
            zIndex: 99999,
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
