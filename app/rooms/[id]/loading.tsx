export default function RoomDetailLoading() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="aspect-[16/9] bg-[#EFEAE0] rounded-lg animate-pulse mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <div className="h-10 w-3/4 bg-[#EFEAE0] rounded animate-pulse" />
            <div className="h-4 w-full bg-[#EFEAE0] rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-[#EFEAE0] rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-[#EFEAE0] rounded animate-pulse" />
          </div>
          <div className="bg-white rounded-lg p-6 space-y-4 h-fit shadow-sm">
            <div className="h-6 w-32 bg-[#EFEAE0] rounded animate-pulse" />
            <div className="h-12 w-full bg-[#EFEAE0] rounded animate-pulse" />
            <div className="h-12 w-full bg-[#EFEAE0] rounded animate-pulse" />
            <div className="h-12 w-full bg-[#C9A96E]/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
