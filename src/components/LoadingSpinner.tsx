export default function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-[#FF8C00] ${className}`} />
  );
}
