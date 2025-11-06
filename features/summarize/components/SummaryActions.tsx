interface Props {
  summary: string;
  loading: boolean;
  saved: boolean;
  handleSave: () => void;
  handleRetry: () => void;
  handleCopy: () => void;
}
export const SummaryActions: React.FC<Props> = ({
  saved,
  summary,
  handleSave,
  handleRetry,
  handleCopy,
  loading,
}) => {
  return (
    summary && (
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
    )
  );
};
