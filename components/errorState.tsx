import {  AlertTriangle,  RotateCw } from "lucide-react"
export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
        <AlertTriangle className="h-6 w-6" />
      </span>
      <p className="text-base font-semibold text-slate-900">Unable to load customers</p>
      <p className="text-sm text-slate-500">Something went wrong while fetching the data.</p>
      <button
        onClick={onRetry}
        className="mt-4 flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
      >
        <RotateCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}