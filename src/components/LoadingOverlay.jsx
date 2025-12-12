/**
 * Loading Overlay Component
 * Hiển thị loading spinner toàn màn hình
 */
const LoadingOverlay = ({ message = 'Đang tải...' }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003AAB]"></div>
        
        {/* Message */}
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
