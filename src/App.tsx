import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const GramAltinNedir = lazy(() => import("./pages/GramAltinNedir"));
const CeyrekAltinFiyati = lazy(() => import("./pages/CeyrekAltinFiyati"));
const YarimAltinFiyati = lazy(() => import("./pages/YarimAltinFiyati"));
const TamAltinFiyati = lazy(() => import("./pages/TamAltinFiyati"));
const AltinNasilAlinir = lazy(() => import("./pages/AltinNasilAlinir"));
const AltinYatirimRehberi = lazy(() => import("./pages/AltinYatirimRehberi"));
const AltinCesitleri = lazy(() => import("./pages/AltinCesitleri"));
const DovizKurlari = lazy(() => import("./pages/DovizKurlari"));
const KapalicarsiFiyatlari = lazy(() => import("./pages/KapalicarsiFiyatlari"));
const HaremAltin = lazy(() => import("./pages/HaremAltin"));
const GramAltinHesaplama = lazy(() => import("./pages/GramAltinHesaplama"));
const AltinFiyatlariBatman = lazy(() => import("./pages/AltinFiyatlariBatman"));
const Blog = lazy(() => import("./pages/Blog"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gram-altin-nedir" element={<GramAltinNedir />} />
            <Route path="/ceyrek-altin-fiyati" element={<CeyrekAltinFiyati />} />
            <Route path="/yarim-altin-fiyati" element={<YarimAltinFiyati />} />
            <Route path="/tam-altin-fiyati" element={<TamAltinFiyati />} />
            <Route path="/altin-nasil-alinir" element={<AltinNasilAlinir />} />
            <Route path="/altin-yatirim-rehberi" element={<AltinYatirimRehberi />} />
            <Route path="/altin-cesitleri" element={<AltinCesitleri />} />
            <Route path="/doviz-kurlari" element={<DovizKurlari />} />
            <Route path="/kapalicarsı-altin-fiyatlari" element={<KapalicarsiFiyatlari />} />
            <Route path="/harem-altin" element={<HaremAltin />} />
            <Route path="/gram-altin-hesaplama" element={<GramAltinHesaplama />} />
            <Route path="/altin-fiyatlari-batman" element={<AltinFiyatlariBatman />} />
            <Route path="/blog" element={<Blog />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
