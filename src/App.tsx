import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { Toaster } from "sonner";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
      </Routes>
      <Toaster
        position="top-center"
        richColors
        closeButton
        offset={16}
        mobileOffset={{
          top: "max(1rem, env(safe-area-inset-top, 0px))",
          left: "max(1rem, env(safe-area-inset-left, 0px))",
          right: "max(1rem, env(safe-area-inset-right, 0px))",
        }}
        toastOptions={{
          style: {
            zIndex: 99999,
          },
          classNames: {
            toast: "mobile-friendly-toast",
            title: "mobile-friendly-toast__title",
            description: "mobile-friendly-toast__description",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
