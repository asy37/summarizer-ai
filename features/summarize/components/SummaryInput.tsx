import React from "react";
import { SummaryActions } from "./SummaryActions";

interface Props {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  summary: string;
  loading: boolean;
  error: string;
  saved: boolean;
  handleSummarize: () => void;
  handleSave: () => void;
  handleRetry: () => void;
  handleCopy: () => void;
}

export const SummaryInput: React.FC<Props> = ({
  text,
  setText,
  summary,
  loading,
  error,
  saved,
  handleSummarize,
  handleSave,
  handleRetry,
  handleCopy,
}) => {
  return (
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

      <SummaryActions
        summary={summary}
        loading={loading}
        saved={saved}
        handleSave={handleSave}
        handleRetry={handleRetry}
        handleCopy={handleCopy}
      />
    </div>
  );
};
