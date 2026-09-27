import React, { useState } from 'react';
import {
  FileText,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Scan,
  ShieldCheck,
  QrCode,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { ApplicationDocument } from '../../types';

interface CertificateViewerProps {
  document: ApplicationDocument;
  applicantName: string;
}

export const CertificateViewer: React.FC<CertificateViewerProps> = ({
  document,
  applicantName
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showScanlines, setShowScanlines] = useState<boolean>(true);
  const [highlightedField, setHighlightedField] = useState<string | null>(null);

  const isIncome = document.type === 'Income Certificate';
  const isST = document.type === 'ST Certificate';
  const isAcademic = document.type === 'Academic Marksheet';
  const isID = document.type === 'Identity Proof';

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col h-full shadow-lg">
      {/* Viewer Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white block truncate max-w-[200px]">
              {document.fileName}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              OCR Engine v3.4 • 300 DPI Raw Capture
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setShowScanlines(!showScanlines)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
              showScanlines
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Toggle AI OCR Scanline overlay"
          >
            <Scan className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Scan Overlay</span>
          </button>

          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <button
              onClick={() => setZoomLevel((z) => Math.max(75, z - 15))}
              className="p-1.5 text-slate-400 hover:text-white rounded-md"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-300">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 15))}
              className="p-1.5 text-slate-400 hover:text-white rounded-md"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Document Canvas */}
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center relative bg-slate-950/60 rounded-xl my-3 min-h-[480px]">
        {/* Animated Scanline */}
        {showScanlines && (
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-scanline z-20 pointer-events-none" />
        )}

        {/* Certificate Paper */}
        <div
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          className="w-full max-w-md bg-[#FFFDF9] text-slate-900 rounded-lg p-6 shadow-2xl border-4 border-double border-amber-900/30 transition-transform relative select-none"
        >
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
            <div className="w-48 h-48 border-8 border-slate-900 rounded-full flex items-center justify-center font-bold text-center text-xs">
              GOVERNMENT OF INDIA • MINISTRY OF TRIBAL AFFAIRS
            </div>
          </div>

          {/* Certificate Header */}
          <div className="text-center pb-3 border-b-2 border-amber-900/20 mb-3 relative">
            <div className="w-10 h-10 mx-auto mb-1 flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-950">
              Government of Tamil Nadu
            </p>
            <p className="text-xs font-semibold text-slate-700">Revenue & Disaster Management Department</p>
            <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-950 mt-1 border-y border-amber-900/10 py-1 bg-amber-50/50">
              {isST
                ? 'Community Certificate (Scheduled Tribe)'
                : isIncome
                ? 'Annual Income Certificate'
                : isAcademic
                ? 'Consolidated Statement of Marks'
                : 'Official Proof of Identity'}
            </h2>
          </div>

          {/* Certificate Body */}
          <div className="text-[11px] leading-relaxed space-y-2.5 text-slate-800">
            {isST && (
              <>
                <div className="p-1.5 rounded-md border border-cyan-500/40 bg-cyan-50/40">
                  <span className="text-[9px] font-mono uppercase text-cyan-800 font-bold block">
                    OCR Detected [BOX-01: Cert ID]
                  </span>
                  Certificate No: <strong className="font-mono text-slate-900">ST/TN/SLM/2021/84920</strong>
                </div>

                <p>
                  This is to certify that <strong className="border-b border-slate-400 pb-0.5">{applicantName}</strong>, 
                  son of <strong>K. Ramanathan</strong>, residing at Yercaud Taluk, Salem District in the State of Tamil Nadu, 
                  belongs to the <strong className="text-blue-900 font-bold underline decoration-blue-400">Malayali Community</strong>, 
                  which is recognized as a <strong>Scheduled Tribe (ST)</strong> under the Constitution (Scheduled Tribes) Order, 1950.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[10px]">
                  <div>
                    <span className="text-slate-500 block">Date of Issue:</span>
                    <strong className="font-mono">14/03/2021</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Competent Authority:</span>
                    <strong>Revenue Divisional Officer</strong>
                  </div>
                </div>
              </>
            )}

            {isIncome && (
              <>
                <div className="p-1.5 rounded-md border border-amber-500/50 bg-amber-50/60">
                  <span className="text-[9px] font-mono uppercase text-amber-800 font-bold block">
                    OCR Detected [BOX-02: Income Value]
                  </span>
                  Annual Family Income: <strong className="text-amber-950 text-xs font-bold">
                    {document.ocrExtracted['Annual Family Income'] || '₹1,80,000'}
                  </strong>
                  <span className="text-[10px] text-amber-800 block mt-0.5">
                    (Rupees One Lakh Eighty Thousand Only)
                  </span>
                </div>

                <p>
                  Certified that the gross annual family income from all sources of <strong>{applicantName}</strong>, 
                  residing at Salem District, for the assessment year 2026-2027 is verified from local revenue records.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-[10px]">
                  <div>
                    <span className="text-slate-500 block">Validity Period:</span>
                    <strong>FY 2026 - 2027</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Issuing Officer:</span>
                    <strong>Tahsildar, Yercaud</strong>
                  </div>
                </div>
              </>
            )}

            {isAcademic && (
              <>
                <div className="p-1.5 rounded-md border border-emerald-500/40 bg-emerald-50/40">
                  <span className="text-[9px] font-mono uppercase text-emerald-800 font-bold block">
                    OCR Detected [BOX-03: Grade Point]
                  </span>
                  Aggregate Score: <strong className="text-emerald-950 text-xs font-bold">94.20% (CGPA 9.42 / 10)</strong>
                </div>
                <p>
                  Institution: <strong>Madras Christian College, Chennai</strong><br />
                  Degree: <strong>Master of Science in Botany (First Class with Distinction)</strong>
                </p>
              </>
            )}

            {!isST && !isIncome && !isAcademic && (
              <div className="p-2 space-y-2">
                <p>Document: <strong>{document.type}</strong></p>
                <p className="font-mono text-[10px] text-slate-600">
                  SHA-256 Hash: e7f8b9104812a4c... Verified with DigiLocker Gateway
                </p>
              </div>
            )}
          </div>

          {/* Stamps & Signatures */}
          <div className="mt-5 pt-3 border-t-2 border-slate-200 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 border border-slate-400 p-0.5 rounded-xs bg-white">
                <QrCode className="w-full h-full text-slate-800" />
              </div>
              <div className="text-[9px] font-mono text-slate-500">
                <span>TN-eSevai Validated</span>
                <span className="block text-emerald-700 font-bold">✓ Digital Sign Verified</span>
              </div>
            </div>

            <div className="text-right">
              <div className="w-20 h-7 border-b border-slate-400 mx-auto mb-0.5 flex items-center justify-center italic text-blue-900 text-[10px]">
                V. Radhakrishnan
              </div>
              <span className="text-[9px] font-semibold text-slate-600 block">Issuing Authority</span>
              <span className="text-[8px] text-slate-400 block font-mono">14/03/2021 11:24 IST</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Biometric & Hologram Seal Authenticated</span>
        </span>
        <span className="font-mono text-[11px] text-slate-400">
          Source: e-District State Repository
        </span>
      </div>
    </div>
  );
};
