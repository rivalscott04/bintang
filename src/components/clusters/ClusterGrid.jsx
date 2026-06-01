import ClusterCard from './ClusterCard';

function ClusterSkeleton() {
  return (
    <div
      className="rounded-md border border-primary/5 bg-surface h-[520px] animate-pulse"
      aria-hidden
    />
  );
}

export default function ClusterGrid({ clusters, loading = false, emptyMessage }) {
  if (loading && clusters.length === 0) {
    return (
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:gap-6">
        {Array.from({ length: 2 }, (_, i) => (
          <ClusterSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (clusters.length === 0) {
    return <p className="text-center text-mute py-12">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8 max-lg:gap-6">
      {clusters.map((cluster) => (
        <ClusterCard key={cluster.slug ?? cluster.id} cluster={cluster} />
      ))}
    </div>
  );
}
