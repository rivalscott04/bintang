import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClusterGrid from '../components/clusters/ClusterGrid';
import SectionHeader from '../components/ui/SectionHeader';
import { useClusters } from '../hooks/useClusters';
import { COPY } from '../utils/messages';

export default function ClustersListPage() {
  const { clusters, syncing, error } = useClusters();

  useEffect(() => {
    document.title = 'Klaster Hunian | Grand Kota Bintang';
  }, []);

  return (
    <main id="content" className="pt-28 pb-24 bg-white min-h-screen">
      <div className="container-x">
        <nav className="text-[0.85rem] text-mute mb-8" aria-label="Breadcrumb">
          <Link to="/" className="text-mute no-underline hover:text-secondary transition-colors">
            Beranda
          </Link>
          <span className="mx-2 opacity-50">/</span>
          <span className="text-primary font-medium">Klaster Hunian</span>
        </nav>

        <SectionHeader
          label="PILIHAN HUNIAN & BISNIS"
          title="Semua Klaster Grand Kota Bintang"
          description="Koleksi hunian eksklusif dan ruko premium yang dirancang untuk memaksimalkan kenyamanan keluarga serta mendukung produktivitas bisnis Anda di dalam superblock."
        />

        {error && (
          <p className="text-center text-mute text-sm mb-6" role="status">
            {COPY.apiFallbackClusters}
          </p>
        )}
        {syncing && !error && (
          <p className="text-center text-mute text-sm mb-6 sr-only" aria-live="polite">
            Memperbarui daftar klaster…
          </p>
        )}

        <ClusterGrid clusters={clusters} emptyMessage="Belum ada klaster untuk ditampilkan." />
      </div>
    </main>
  );
}
