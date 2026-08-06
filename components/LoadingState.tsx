import {RotateCw } from "lucide-react";
export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      <RotateCw className="h-6 w-6 animate-spin text-blue-600" />
      <p className="text-sm font-semibold text-slate-900">Loading customers...</p>
      <p className="text-sm text-slate-500">Please wait while we fetch the latest data.</p>
      <div className="mt-4 w-full max-w-xs space-y-2">
        <div className="h-2.5 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-slate-100" />
        <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-slate-100" />
      </div>
    </div>
  );
}