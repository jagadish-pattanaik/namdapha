import React, { useState } from 'react';
import { QrCode, Download, Copy, Check } from 'lucide-react';

interface QRCodeSectionProps {
  url?: string;
}

const QRCodeSection: React.FC<QRCodeSectionProps> = ({ url = window.location.href }) => {
  const [copied, setCopied] = useState(false);
  
  // Generate QR code URL using QR Server API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-12 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <QrCode className="w-5 h-5 text-white" />
          <h3 className="text-lg font-semibold text-white">Share This Page</h3>
        </div>
        
        <div className="bg-white p-4 rounded-xl inline-block mb-4">
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            className="w-32 h-32"
          />
        </div>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 group"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
            )}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          
          <button
            onClick={downloadQR}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 group"
          >
            <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Download QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeSection;