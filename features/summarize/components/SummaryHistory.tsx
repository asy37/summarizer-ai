"use client";

import { toast } from "react-toastify";

interface Summary {
  id: string;
  originalText: string;
  summary: string;
  createdAt: string;
}

interface SummaryHistoryProps {
  histories: Summary[];
}

export const SummaryHistory = ({ histories }: SummaryHistoryProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Özet panoya kopyalandı!");
  };

  if (histories.length === 0) {
    return (
      <div className="mt-6 bg-white rounded-lg shadow-xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Özet Geçmişi</h2>
        <p className="text-gray-600 text-center py-8">
          Henüz kaydedilmiş özet bulunmuyor.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Özet Geçmişi ({histories.length})
      </h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {histories.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-500">
                {formatDate(item.createdAt)}
              </span>
              <button
                onClick={() => handleCopy(item.summary)}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
              >
                📋 Kopyala
              </button>
            </div>
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Orijinal Metin:
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.originalText}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Özet:
              </h4>
              <p className="text-sm text-gray-800">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

