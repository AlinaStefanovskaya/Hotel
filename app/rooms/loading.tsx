export default function RoomsLoading() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="h-10 w-60 bg-[#EFEAE0] rounded animate-pulse mb-4" />
        <div className="h-4 w-96 bg-[#EFEAE0] rounded animate-pulse mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] bg-[#EFEAE0] animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-2/3 bg-[#EFEAE0] rounded animate-pulse" />
                <div className="h-3 w-full bg-[#EFEAE0] rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-[#EFEAE0] rounded animate-pulse" />
                <div className="flex justify-between pt-4">
                  <div className="h-6 w-20 bg-[#EFEAE0] rounded animate-pulse" />
                  <div className="h-9 w-28 bg-[#EFEAE0] rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
