export const runtime = "nodejs";

export async function POST(req: Request) {
  const API_URL = process.env.HF_API_URL;
  const { text } = await req.json();

  if (!text?.trim()) {
    return Response.json({ error: "Metin boş olamaz" }, { status: 400 });
  }

  try {
    if(API_URL){
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: text }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Hugging Face isteği başarısız: ${errorText}`);
      }
  
      const result = await response.json();
      const summary = result[0]?.summary_text || "Özet alınamadı";
  
      return Response.json({ summary });
    }
   
  } catch (error: unknown) {
    console.error("Hugging Face Error:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Özetleme hatası oluştu",
      },
      { status: 500 }
    );
  }
}
