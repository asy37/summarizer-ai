"use client";

import { useState, useEffect } from "react";
import { SummaryHistory } from "@/features/summarize/components/SummaryHistory";
import { SummaryInput } from "@/features/summarize/components/SummaryInput";
import { useSummarizer } from "@/features/summarize/hooks/useSummarizer";

export const SummarizeView = () => {
  const [showHistory, setShowHistory] = useState(false);
  const {
    text,
    setText,
    summary,
    loading,
    error,
    saved,
    histories,
    handleSummarize,
    handleSave,
    handleRetry,
    handleCopy,
    setHistories,
  } = useSummarizer();

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

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Metin Özetleyici
          </h1>
          <p className="text-gray-600">
            Uzun metinlerinizi hızlıca özetleyin ve kaydedin
          </p>
        </div>
        <SummaryInput
          text={text}
          setText={setText}
          summary={summary}
          loading={loading}
          error={error}
          saved={saved}
          handleSummarize={handleSummarize}
          handleSave={handleSave}
          handleRetry={handleRetry}
          handleCopy={handleCopy}
        />
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
};
