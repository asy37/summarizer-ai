export const runtime = "nodejs";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || !text.trim()) {
    return Response.json({ error: "Metin boş olamaz" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Hugging Face isteği başarısız: ${errorText}`);
    }

    const result = await response.json();
    const summary = result[0]?.summary_text || "Özet alınamadı";

    return Response.json({ summary });
  } catch (error: any) {
    console.error("Hugging Face Error:", error);
    return Response.json(
      { error: error.message || "Özetleme hatası oluştu" },
      { status: 500 }
    );
  }
}
