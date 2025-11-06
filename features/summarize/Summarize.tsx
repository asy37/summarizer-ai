"use client";

import { useState, useEffect } from "react";
import SummaryHistory from "./components/SummaryHistory";

interface Summary {
  id: string;
  originalText: string;
  summary: string;
  createdAt: string;
}

export default function SummarizePage() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [histories, setHistories] = useState<Summary[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("summaries");
    if (stored) {
      try {
        setHistories(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse localStorage:", e);
      }
    }
  }, []);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError("Lütfen özetlemek için bir metin girin");
      return;
    }

    setLoading(true);
    setError("");
    setSummary("");
    setSaved(false);

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Özetleme başarısız oldu");
      }

      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/save-summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalText: text,
          summary,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Kaydetme başarısız oldu");
      }

      setSaved(true);

      // Save to localStorage as well
      const newSummary: Summary = {
        id: data.data.id,
        originalText: text,
        summary,
        createdAt: new Date().toISOString(),
      };
      const updated = [newSummary, ...histories];
      setHistories(updated);
      localStorage.setItem("summaries", JSON.stringify(updated));

      // Clear form after 2 seconds
      setTimeout(() => {
        setText("");
        setSummary("");
        setSaved(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setSummary("");
    setSaved(false);
    handleSummarize();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    alert("Özet panoya kopyalandı!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Metin Özetleyici
          </h1>
          <p className="text-gray-600">
            Uzun metinlerinizi hızlıca özetleyin ve kaydedin
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="mb-6">
            <label
              htmlFor="text-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Özetlemek İstediğiniz Metin
            </label>
            <textarea
              id="text-input"
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-900"
              placeholder="Metninizi buraya yapıştırın..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || !text.trim()}
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading && !summary ? "Özetleniyor..." : "Özetle"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {summary && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Özet</h3>
                  <button
                    onClick={handleCopy}
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    📋 Kopyala
                  </button>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
              </div>

              {saved ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                  <p className="text-blue-800 font-medium">
                    ✓ Özet başarıyla kaydedildi!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                  >
                    {loading ? "Kaydediliyor..." : "✓ Onayla ve Kaydet"}
                  </button>
                  <button
                    onClick={handleRetry}
                    disabled={loading}
                    className="bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 disabled:bg-gray-400 transition-colors"
                  >
                    🔄 Beğenmedim, Yeniden Dene
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {showHistory ? "▲ Geçmişi Gizle" : "▼ Özet Geçmişini Göster"}
          </button>
        </div>

        {showHistory && <SummaryHistory histories={histories} />}
      </div>
    </div>
  );
}
