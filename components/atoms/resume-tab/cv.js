import { useEffect, useState } from 'react';

export default function Cv({ dataCv }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    async function fetchPdf() {
      const response = await fetch(dataCv);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    }

    fetchPdf();
  }, [dataCv]);

  if (!pdfUrl) {
    return (
      <div className="flex flex-row items-center">
        <div className="animate-spin rounded-full h-5 w-5 border-r-2 border-[#E35D33] mr-2"></div>
        <p>Loading CV...</p>
      </div>
    );
  }

  return (
    <iframe
      src={pdfUrl}
      width="100%"
      height="600px"
      title="CV"
      style={{ border: 'none' }}
    />
  );
}
