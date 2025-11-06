import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              AI Metin Özetleyici
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Yapay zeka destekli metin özetleme uygulaması
            </p>
            <p className="text-gray-500">
              Uzun metinlerinizi saniyeler içinde özetleyin ve kaydedin
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start text-left p-4 bg-blue-50 rounded-lg">
              <span className="text-2xl mr-3">🤖</span>
              <div>
                <h3 className="font-semibold text-gray-900">AI Destekli</h3>
                <p className="text-sm text-gray-600">
                  OpenAI teknolojisi ile güçlendirilmiş özetleme
                </p>
              </div>
            </div>
            <div className="flex items-start text-left p-4 bg-green-50 rounded-lg">
              <span className="text-2xl mr-3">💾</span>
              <div>
                <h3 className="font-semibold text-gray-900">Kayıt Sistemi</h3>
                <p className="text-sm text-gray-600">
                  Özetlerinizi veritabanında güvenle saklayın
                </p>
              </div>
            </div>
            <div className="flex items-start text-left p-4 bg-purple-50 rounded-lg">
              <span className="text-2xl mr-3">📋</span>
              <div>
                <h3 className="font-semibold text-gray-900">Geçmiş</h3>
                <p className="text-sm text-gray-600">
                  Tüm özetlerinize kolayca erişin
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/summarize"
            className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Hemen Başla →
          </Link>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Next.js • TypeScript • TailwindCSS • Prisma • OpenAI
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
