import { useState } from "react";
import { toast } from "react-toastify";

export interface Summary {
  id: string;
  originalText: string;
  summary: string;
  createdAt: string;
}

export function useSummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [histories, setHistories] = useState<Summary[]>([]);

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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
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
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu");
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
    toast("Özet panoya kopyalandı!");
  };

  return {
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
  };
}
