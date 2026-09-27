import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Bot,
  Sparkles,
  ArrowRight,
  FileCheck2,
  SlidersHorizontal,
  Trophy,
  GraduationCap,
  BarChart3,
  MessageSquareWarning,
  CheckCircle2,
  Clock,
  Search,
  Lock,
  FileText,
  UserCheck,
  AlertTriangle,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* ==================================================
          1. HERO CONTAINER WITH CINEMATIC BACKGROUND
      ================================================== */}
      <section className="relative min-h-[740px] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-950 text-white">
        {/* Background Cinematic Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center md:bg-[center_top] bg-no-repeat transform scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${import.meta.env.BASE_URL}assets/tribal-aid-landing-bg.png')`,
          }}
        />

        {/* Multi-Stop Horizontal Navy Gradient Overlay (preserves students on right/center, ensures crisp text on left) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/20" />

        {/* Subtle Vertical Gradient to anchor header and bottom transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-transparent to-slate-950/95" />

        {/* Ambient Glow Accents */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ==================================================
            HEADER OVER HERO
        ================================================== */}
        <header className="relative z-30 border-b border-white/10 bg-slate-950/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Brand Logo & Title */}
            <div
              className="flex items-center gap-3.5 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md border border-white/30 flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={`${import.meta.env.BASE_URL}assets/tribalaid-logo.png`}
                  alt="TribalAid AI Official Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-white font-serif">
                    TRIBALAID AI
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full font-mono">
                    Governance
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium tracking-wide">
                  Ministry of Tribal Affairs • Government of India
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-200">
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('capabilities')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                Capabilities
              </button>
              <button
                onClick={() => scrollToSection('intelligence')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                AI Intelligence
              </button>
              <button
                onClick={() => scrollToSection('transparency')}
                className="hover:text-blue-300 transition-colors cursor-pointer"
              >
                Transparency
              </button>
            </nav>

            {/* Action CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate('/portal-selection')}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white text-xs font-bold tracking-wide shadow-lg shadow-blue-900/40 flex items-center gap-2 transition-all cursor-pointer border border-blue-400/30"
              >
                <span>Access Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-200 hover:bg-white/10 cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-950/95 border-b border-white/10 px-6 py-4 space-y-3 backdrop-blur-xl animate-in slide-in-from-top duration-200">
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('capabilities')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200"
              >
                Capabilities
              </button>
              <button
                onClick={() => scrollToSection('intelligence')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200"
              >
                AI Intelligence
              </button>
              <button
                onClick={() => scrollToSection('transparency')}
                className="block w-full text-left py-2 text-sm font-medium text-slate-200"
              >
                Transparency
              </button>
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => navigate('/portal-selection')}
                  className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <span>Access Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ==================================================
            HERO MAIN CONTENT & FLOATING CARDS
        ================================================== */}
        <div id="about" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column (Strictly on left to preserve visible students) */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-md shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>INTELLIGENT DIGITAL GOVERNANCE</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                Empowering Tribal Education Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
                  Intelligent Digital Governance
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl">
                TribalAid AI brings scholarship and fellowship administration into one secure, transparent and intelligent digital workflow — from application and document verification to selection, disbursement and post-selection management.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => navigate('/portal-selection')}
                  className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-900/50 flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-98 border border-blue-400/30"
                >
                  <span>Access TribalAid AI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm backdrop-blur-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Explore How It Works</span>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  National Fellowship (NFST) & Overseas (NOS)
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Statutory Human Oversight
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-300" />
                  Aadhaar DBT Mandate
                </span>
              </div>
            </div>

            {/* Right Column: Carefully Positioned Floating AI UI Cards */}
            <div className="lg:col-span-5 xl:col-span-6 relative h-64 lg:h-[480px] pointer-events-none">
              {/* Card 1: Top-Right (near Indian network visualization) */}
              <div className="absolute top-4 right-0 lg:right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/80 text-slate-900 flex items-center gap-3 animate-float max-w-[230px] pointer-events-auto">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    AI Document Intelligence
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">
                    ST Certificate
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Document verified
                  </span>
                </div>
              </div>

              {/* Card 2: Middle-Right */}
              <div className="absolute top-28 sm:top-36 right-4 sm:right-12 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/80 text-slate-900 flex items-center gap-3 animate-float-delayed max-w-[220px] pointer-events-auto">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Eligibility Check
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">
                    Criteria Validated
                  </span>
                  <span className="text-[11px] text-blue-700 font-bold block">
                    94% confidence
                  </span>
                </div>
              </div>

              {/* Card 3: Lower-Left / Center */}
              <div className="absolute bottom-6 left-0 sm:left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-white/80 text-slate-900 hidden sm:flex items-center gap-3 animate-float max-w-[220px] pointer-events-auto">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Application Status
                  </span>
                  <span className="text-xs font-bold text-slate-900 block">
                    NFST-2026-00482
                  </span>
                  <span className="text-[11px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded-sm">
                    Under Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            HERO BOTTOM WAVE TRANSITION
        ================================================== */}
        <div className="relative w-full overflow-hidden leading-none z-10">
          <svg
            className="relative block w-full h-10 sm:h-14 lg:h-18 text-slate-900 fill-current"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 400,100 600,60 C800,20 1050,80 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ==================================================
          2. PLATFORM STATS STRIP (DEEP NAVY / GOVERNMENT BLUE)
      ================================================== */}
      <section className="bg-slate-900 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono block">
                6
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                Operational Portals
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Strict RBAC boundaries
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono block">
                2
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                Core Schemes
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                NFST & NOS policy engines
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono block pt-1">
                End-to-End
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                Digital Workflow
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Zero paper handoffs
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono block pt-1">
                AI-Assisted
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                Verification
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Statutory human clearance
              </p>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400 mt-6 font-mono">
            *Integrated architecture parameters designed for the Ministry of Tribal Affairs administrative lifecycle simulation.
          </p>
        </div>
      </section>

      {/* ==================================================
          3. HOW IT WORKS (HORIZONTAL WORKFLOW)
      ================================================== */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-mono">
              Workflow Stages
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Statutory Lifecycle in 7 Connected Steps
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every stage seamlessly triggers the next, synchronizing applicant state with official scrutiny, selection, and disbursement records.
            </p>
          </div>

          {/* Workflow Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">01</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Apply</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Submit scheme-specific application and documents.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                Citizen Portal
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">02</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Doc Verification</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  AI-assisted OCR extracts and compares document information.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                AI Vision Pipeline
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">03</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Eligibility</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Configured scheme rules evaluate required criteria.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                Policy Engine
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">04</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Scrutiny</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Authorized officers review flagged issues.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                Scrutiny Desk
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">05</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Selection</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Committee reviews eligible candidates and records decisions.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                Selection Board
              </div>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">06</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Disbursement</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Track scholarship/fellowship payment status.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                DBT / PFMS Gateway
              </div>
            </div>

            {/* Step 7 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 relative flex flex-col justify-between hover:border-blue-400 hover:shadow-sm transition-all">
              <div>
                <span className="text-2xl font-black text-blue-700 font-mono">07</span>
                <h4 className="font-bold text-sm text-slate-950 mt-1">Fellowship</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Manage renewals and progress after selection.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-blue-800 font-semibold font-mono">
                Fellowship Cell
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          4. PLATFORM CAPABILITIES
      ================================================== */}
      <section id="capabilities" className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-mono">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              One Platform. Complete Scholarship Lifecycle.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From application to post-selection management, every stage is connected through a unified workflow.
            </p>
          </div>

          {/* 6 Capability Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                AI Document Intelligence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                OCR-assisted document extraction and discrepancy detection with explainable confidence indicators across certificates and affidavits.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <SlidersHorizontal className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Smart Eligibility Verification
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configurable scheme-specific rules support faster eligibility checks across statutory income limits, tribe notifications, and marks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Transparent Selection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Structured merit review with human oversight and audit trails, candidate comparisons, and formal quorum remarks recording.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Fellowship Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track renewals, progress reports and disbursement schedules for active doctoral researchers enrolled in accredited institutions.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Programme Analytics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitor applications, processing stages, bottlenecks and fund utilization across all states and districts in real time.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-lg transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <MessageSquareWarning className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">
                Grievance Redressal
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track applicant issues, SLA timelines and resolution with integrated two-way officer communication and case closures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          5. AI INTELLIGENCE SECTION (DEEP NAVY / BLUE)
      ================================================== */}
      <section id="intelligence" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Bot className="w-3.5 h-3.5" />
              <span>Assisted Verification Technology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Intelligence Where It Matters
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              AI serves as an operational co-pilot for authorized government officers — accelerating tedious data verification while strictly preserving statutory human accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: 3 Capabilities List */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2.5 text-blue-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <h4>Document Intelligence</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Extract structured information from uploaded documents. Sub-second OCR extraction for Scheduled Tribe and income certificates.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <h4>Discrepancy Detection</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Identify potential mismatches between application data and documents before approval.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <h4>Workflow Insights</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Surface processing bottlenecks and pending actions across state and district desks.
                </p>
              </div>
            </div>

            {/* Right: Split Interactive Mockup (App Form vs OCR Data) */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-slate-700/80 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono font-bold text-slate-200">
                      Application Data vs OCR Extracted Data
                    </span>
                  </div>
                  <span className="text-[11px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full font-mono font-bold">
                    AI Confidence: 94%
                  </span>
                </div>

                {/* Comparison Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Left: Application Form */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                      Application Form Data
                    </span>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Applicant Name</span>
                      <span className="font-bold text-white text-sm">Arun Kumar</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Certified Annual Income</span>
                      <span className="font-bold text-white text-sm">₹1,50,000</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Scheduled Tribe</span>
                      <span className="font-bold text-white text-sm">Malayali (ST)</span>
                    </div>
                  </div>

                  {/* Right: OCR Extracted Data */}
                  <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                      OCR Extracted Data
                    </span>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Certificate Name</span>
                      <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                        Arun Kumar ✓
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Certificate Income</span>
                      <span className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                        ₹1,80,000
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Revenue Caste Category</span>
                      <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                        Malayali (ST) ✓
                      </span>
                    </div>
                  </div>
                </div>

                {/* Potential Mismatch Flag */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">⚠ Potential Mismatch</span>
                    <p className="text-[11px] text-amber-300/80 mt-0.5 leading-relaxed">
                      Income declared: ₹1,50,000 vs OCR extracted: ₹1,80,000. Reconciled under allowable agricultural gross, under statutory ₹6L ceiling.
                    </p>
                  </div>
                </div>

                {/* Mandatory Disclaimer Note */}
                <p className="text-[11px] text-slate-400 font-mono text-center pt-2">
                  "AI assists authorized reviewers. Final decisions remain with designated human authorities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          6. TRANSPARENCY & ACCOUNTABILITY SECTION
      ================================================== */}
      <section id="transparency" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-mono">
              Institutional Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Designed for Transparency and Accountability
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every stage of scholarship and fellowship processing is bounded by statutory safeguards and verifiable audit controls.
            </p>
          </div>

          {/* 6 Transparency Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-blue-800 font-bold text-sm">
                <Lock className="w-4 h-4" />
                <h4>Role-Based Access</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strict operational boundaries guarantee that applicants, scrutiny desks, selection boards, and administrators only access permitted workspaces.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-indigo-800 font-bold text-sm">
                <FileCheck2 className="w-4 h-4" />
                <h4>Audit Trails</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every document clearance, deficiency issuance, and committee selection decision logs an unalterable timestamped actor record.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-sm">
                <UserCheck className="w-4 h-4" />
                <h4>Human Oversight</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                No candidate is ever rejected or awarded solely by algorithms. Qualified scrutiny officers and statutory committees govern every verdict.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-amber-800 font-bold text-sm">
                <Search className="w-4 h-4" />
                <h4>Application Tracking</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applicants have 100% visibility into their application journey, viewing the exact officer deficiency remarks and resolution steps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-rose-800 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <h4>Secure Document Workflow</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Encrypted digital archives with tamper-evident metadata prevent document loss and unauthorized third-party inspection.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
              <div className="flex items-center gap-2.5 text-cyan-800 font-bold text-sm">
                <Clock className="w-4 h-4" />
                <h4>SLA Monitoring</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configured operational time limits flag approaching deadlines to nodal desks, preventing bureaucratic delays in scholar onboarding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. PRODUCT DASHBOARD PREVIEW
      ================================================== */}
      <section id="preview" className="py-20 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full font-mono">
              Unified Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Every Role. One Connected Platform.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Real-time operational intelligence connecting applicants, scrutiny officers, committee chairs, and Ministry executives.
            </p>
          </div>

          {/* Large Non-Clickable Product Mockup */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Topbar of Mockup */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    ADM-2026-HQ
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    MoTA Programme Executive Overview
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-950 mt-1">
                  MoTA Analytics
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Operational Network</span>
              </div>
            </div>

            {/* Metric Counters */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Total Applications
                </span>
                <span className="text-2xl font-extrabold text-slate-900 mt-1 block font-mono">
                  1,248
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">100% Ingested</span>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Verified
                </span>
                <span className="text-2xl font-extrabold text-blue-900 mt-1 block font-mono">
                  892
                </span>
                <span className="text-[10px] text-blue-600 font-medium">71.4% Clearance Rate</span>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-100">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Selected
                </span>
                <span className="text-2xl font-extrabold text-amber-950 mt-1 block font-mono">
                  450
                </span>
                <span className="text-[10px] text-amber-700 font-medium">Composite Merit Quota</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Disbursed
                </span>
                <span className="text-2xl font-extrabold text-emerald-950 mt-1 block font-mono">
                  ₹14.2 Cr
                </span>
                <span className="text-[10px] text-emerald-600 font-medium">Statutory Allocation Met</span>
              </div>
            </div>

            {/* Funnel Preview Visualization */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Funnel: Applied → Verified → Selected → Disbursed
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  Cycle: 2026-27 (NFST & NOS)
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center">
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">1. Applied</span>
                  <span className="font-bold text-slate-900 text-base font-mono">1,248</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200 text-center">
                  <span className="text-blue-700 text-[10px] uppercase font-bold block">2. Verified</span>
                  <span className="font-bold text-blue-900 text-base font-mono">892</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200 text-center">
                  <span className="text-amber-800 text-[10px] uppercase font-bold block">3. Selected</span>
                  <span className="font-bold text-amber-900 text-base font-mono">450</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-center">
                  <span className="text-emerald-700 text-[10px] uppercase font-bold block">4. Disbursed</span>
                  <span className="font-bold text-emerald-900 text-base font-mono">380</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: State analytics, processing time & budget */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">State Analytics</span>
                <span className="font-bold text-slate-900 mt-1 block">Odisha (342) • Jharkhand (284) • MP (261)</span>
                <span className="text-[11px] text-slate-400">Integrated revenue verification linked</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Processing Time</span>
                <span className="font-bold text-slate-900 mt-1 block">4.8 Days Average</span>
                <span className="text-[11px] text-emerald-600">62% faster than paper baseline</span>
              </div>
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-bold block">Budget Utilization</span>
                <span className="font-bold text-slate-900 mt-1 block">91.4% Allocated</span>
                <span className="text-[11px] text-blue-600">Direct Benefit Transfer active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. FINAL CALL TO ACTION (CTA)
      ================================================== */}
      <section className="py-20 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Ready for Operational Deployment</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            One Platform. Complete Scholarship Lifecycle.
          </h2>

          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Connect application, verification, selection, disbursement and post-selection management through one intelligent workflow.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/portal-selection')}
              className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-extrabold shadow-xl hover:shadow-2xl transition-all cursor-pointer inline-flex items-center gap-2.5 active:scale-98 border border-blue-400/30"
            >
              <span>Access TribalAid AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          9. INSTITUTIONAL FOOTER WITH LOGO
      ================================================== */}
      <footer id="contact" className="bg-slate-950 text-slate-400 py-14 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Column 1: Brand Info with Official Logo */}
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-md border border-white/20 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/tribalaid-logo.png`}
                    alt="TribalAid AI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-xl tracking-tight">TRIBALAID AI</h3>
                  <p className="text-xs text-slate-400 font-medium">AI-Powered Scholarship & Fellowship Management Platform</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Ministry of Tribal Affairs • Government of India</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm pt-2">
                Designed to streamline the administration of National Fellowship for Higher Education (NFST) and National Overseas Scholarship (NOS) through verified digital workflows.
              </p>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform Navigation</h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors cursor-pointer">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('capabilities')} className="hover:text-white transition-colors cursor-pointer">
                    Capabilities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('transparency')} className="hover:text-white transition-colors cursor-pointer">
                    Transparency
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/portal-selection')} className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
                    Access Platform →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Statutory & Institutional */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Institutional Governance</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adhering to Central Civil Services administrative protocols, Direct Benefit Transfer (DBT) guidelines, and statutory Scheduled Tribe reservation directives under Article 342 of the Constitution of India.
              </p>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Simulation Prototype • Fictional Demonstration Data
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 TribalAid AI. Designed for Ministry of Tribal Affairs scholarship & fellowship workflow.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
              <span className="hover:text-slate-400 cursor-pointer">Contact</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
