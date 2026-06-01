import { useState } from 'react';

const BLOCK_STATUS = {
  available: {
    label: 'Tersedia',
    className: 'bg-emerald-500/35 border-emerald-600/80 hover:bg-emerald-500/50',
  },
  reserved: {
    label: 'Reserved',
    className: 'bg-amber-400/35 border-amber-500/80 hover:bg-amber-400/50',
  },
  sold: {
    label: 'Terjual',
    className: 'bg-slate-500/45 border-slate-600/80 cursor-not-allowed',
  },
};

export default function ClusterSitePlan({ image, imageAlt, blocks = [] }) {
  const [activeBlock, setActiveBlock] = useState(null);

  if (!image) {
    return null;
  }

  const selected = blocks.find((b) => b.id === activeBlock);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 text-[0.85rem]">
        {Object.entries(BLOCK_STATUS).map(([key, meta]) => (
          <span key={key} className="inline-flex items-center gap-2 text-mute">
            <span
              className={`w-3 h-3 rounded-sm border ${meta.className.split(' ').slice(0, 2).join(' ')}`}
              aria-hidden
            />
            {meta.label}
          </span>
        ))}
      </div>

      <div className="relative rounded-md overflow-hidden border border-primary/10 shadow-soft bg-primary/5">
        <img
          src={image}
          alt={imageAlt || 'Site plan klaster'}
          className="w-full h-auto block select-none"
          draggable={false}
        />
        {blocks.map((block) => {
          const meta = BLOCK_STATUS[block.status] ?? BLOCK_STATUS.available;
          const isActive = activeBlock === block.id;

          return (
            <button
              key={block.id}
              type="button"
              title={`${block.label}, ${meta.label}`}
              aria-label={`${block.label}, ${meta.label}`}
              aria-pressed={isActive}
              disabled={block.status === 'sold'}
              onClick={() => setActiveBlock(isActive ? null : block.id)}
              className={[
                'absolute border-2 rounded-sm transition-all duration-300 ease-luxury',
                meta.className,
                isActive ? 'ring-2 ring-secondary ring-offset-2 z-10' : 'z-0',
              ].join(' ')}
              style={{
                left: `${block.x}%`,
                top: `${block.y}%`,
                width: `${block.width}%`,
                height: `${block.height}%`,
              }}
            />
          );
        })}
      </div>

      {selected && (
        <p className="text-[0.95rem] text-mute" role="status">
          <strong className="text-primary font-display">{selected.label}</strong>
          {', '}
          {(BLOCK_STATUS[selected.status] ?? BLOCK_STATUS.available).label}
        </p>
      )}
    </div>
  );
}
