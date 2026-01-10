import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

// Table skeleton for patient lists, records, etc.
export const TableSkeleton = ({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3 animate-fade-in">
    {/* Header */}
    <div className="flex gap-4 pb-3 border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="flex gap-4 py-4 items-center"
        style={{ animationDelay: `${rowIndex * 50}ms` }}
      >
        {/* Checkbox */}
        <Skeleton className="h-4 w-4 rounded" />
        {/* Avatar */}
        <Skeleton className="h-10 w-10 rounded-full" />
        {/* Content columns */}
        {Array.from({ length: columns - 2 }).map((_, colIndex) => (
          <div key={colIndex} className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
        {/* Actions */}
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    ))}
  </div>
);

// Card skeleton for dashboard stats
export const StatCardSkeleton = () => (
  <div className="health-card animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-12 w-12 rounded-xl" />
    </div>
  </div>
);

// Patient card skeleton
export const PatientCardSkeleton = () => (
  <div className="health-card animate-pulse">
    <div className="flex items-center gap-4">
      <Skeleton className="h-14 w-14 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <div className="mt-4 pt-4 border-t space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

// Appointment skeleton
export const AppointmentSkeleton = () => (
  <div className="flex items-center gap-4 p-4 rounded-lg border animate-pulse">
    <Skeleton className="h-12 w-12 rounded-lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
    <Skeleton className="h-6 w-20 rounded-full" />
  </div>
);

// Page header skeleton
export const PageHeaderSkeleton = () => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-64" />
    </div>
    <div className="flex gap-2">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

// Quick view panel skeleton
export const QuickViewSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex items-center gap-4">
      <Skeleton className="h-20 w-20 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-32" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </div>
    </div>
  </div>
);

// Dashboard grid skeleton
export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    <PageHeaderSkeleton />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <AppointmentSkeleton key={i} />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <PatientCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

// Shimmer loading effect component
export const ShimmerLoader = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative overflow-hidden bg-muted rounded-lg",
      "before:absolute before:inset-0",
      "before:translate-x-[-100%]",
      "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
      "before:animate-shimmer",
      className
    )}
  />
);
