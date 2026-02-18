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
const AltinFiyatlariIstanbul = lazy(() => import("./pages/AltinFiyatlariIstanbul"));
const AltinFiyatlariAnkara = lazy(() => import("./pages/AltinFiyatlariAnkara"));
const AltinFiyatlariIzmir = lazy(() => import("./pages/AltinFiyatlariIzmir"));
const AltinFiyatlariAntalya = lazy(() => import("./pages/AltinFiyatlariAntalya"));
const AltinFiyatlariBursa = lazy(() => import("./pages/AltinFiyatlariBursa"));
const AltinFiyatlariDiyarbakir = lazy(() => import("./pages/AltinFiyatlariDiyarbakir"));
const AltinFiyatlariGaziantep = lazy(() => import("./pages/AltinFiyatlariGaziantep"));
const AltinFiyatlariAdana = lazy(() => import("./pages/AltinFiyatlariAdana"));
const CumhuriyetAltiniFiyati = lazy(() => import("./pages/CumhuriyetAltiniFiyati"));
const YirmiIkiAyarBilezikFiyati = lazy(() => import("./pages/YirmiIkiAyarBilezikFiyati"));
const OnsAltinFiyati = lazy(() => import("./pages/OnsAltinFiyati"));

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
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
            <Route path="/altin-fiyatlari-istanbul" element={<AltinFiyatlariIstanbul />} />
            <Route path="/altin-fiyatlari-ankara" element={<AltinFiyatlariAnkara />} />
            <Route path="/altin-fiyatlari-izmir" element={<AltinFiyatlariIzmir />} />
            <Route path="/altin-fiyatlari-antalya" element={<AltinFiyatlariAntalya />} />
            <Route path="/altin-fiyatlari-bursa" element={<AltinFiyatlariBursa />} />
            <Route path="/altin-fiyatlari-diyarbakir" element={<AltinFiyatlariDiyarbakir />} />
            <Route path="/altin-fiyatlari-gaziantep" element={<AltinFiyatlariGaziantep />} />
            <Route path="/altin-fiyatlari-adana" element={<AltinFiyatlariAdana />} />
            <Route path="/cumhuriyet-altini-fiyati" element={<CumhuriyetAltiniFiyati />} />
            <Route path="/22-ayar-bilezik-fiyati" element={<YirmiIkiAyarBilezikFiyati />} />
            <Route path="/ons-altin-fiyati" element={<OnsAltinFiyati />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
