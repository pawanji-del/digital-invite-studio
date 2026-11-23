"use client";

import React, { useEffect, useState, useRef } from "react";
import QRCode from "qrcode";
import { Download, X, Copy, Check, QrCode as QrIcon } from "lucide-react";

interface QRCodeModalProps {
  url: string;
  title: string;
  slug: string;
  onClose: () => void;
}

export function QRCodeModal({ url, title, slug, onClose }: QRCodeModalProps) {
  const [dataUrl, setDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: "#1c1917",
        light: "#ffffff",
      },
    })
      .then((res) => setDataUrl(res))
      .catch((err) => console.error("QR Code error:", err));
  }, [url]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${slug}-qr-code.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-stone-200">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 mb-2">
            <QrIcon className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">{title}</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Print this QR Code on wedding cards & envelopes
          </p>
        </div>

        {/* QR Code Display */}
        <div className="my-5 flex flex-col items-center justify-center rounded-xl bg-stone-50 p-4 border border-stone-200">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt="Invitation QR Code"
              className="h-52 w-52 rounded-lg shadow-sm"
            />
          ) : (
            <div className="h-52 w-52 flex items-center justify-center text-stone-400 text-sm">
              Generating QR Code...
            </div>
          )}
          <span className="mt-2 text-[11px] text-stone-400 truncate max-w-[240px]">
            {url}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={downloadQR}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-amber-700 transition active:scale-95"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </button>
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
