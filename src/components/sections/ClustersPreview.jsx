import { Link } from 'react-router-dom';
import ClusterGrid from '../clusters/ClusterGrid';
import SectionHeader from '../ui/SectionHeader';
import { useClusters } from '../../hooks/useClusters';
import { COPY } from '../../utils/messages';
import { getFeaturedClusters } from '../../utils/clusters';

export default function ClustersPreview() {
  const { clusters, syncing, error } = useClusters();
  const featured = getFeaturedClusters(clusters, 2);
  const preview = featured.length > 0 ? featured : clusters.slice(0, 2);

  return (
    <section id="clusters" className="py-24 bg-white" aria-labelledby="clusters-preview-title">
      <div className="container-x">
        <SectionHeader
          label="PILIHAN HUNIAN & BISNIS"
          title="Masterpiece Residential & Shophouses"
          description="Koleksi hunian eksklusif yang dirancang secara detail untuk memaksimalkan kenyamanan keluarga serta mendukung produktivitas bisnis Anda."
        />

        {error && (
          <p className="text-mute text-sm mb-6 text-center" role="status">
            {COPY.apiFallbackClusters}
          </p>
        )}
        {syncing && !error && (
          <p className="text-mute text-sm mb-6 text-center sr-only" aria-live="polite">
            Memperbarui daftar klaster…
          </p>
        )}

        <ClusterGrid clusters={preview} emptyMessage="Belum ada klaster untuk ditampilkan." />

        <div className="text-center mt-12">
          <Link to="/klaster" className="btn-primary">
            Lihat Semua Klaster <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
