import { useNearViewport } from '../../hooks/useNearViewport';

/** Mount children only when the placeholder nears the viewport: avoids early chunk fetch. */
export default function LazyWhenVisible({ children, rootMargin, className, minHeight }) {
  const { ref, isNear } = useNearViewport({ rootMargin });

  return (
    <div ref={ref} className={className} style={minHeight ? { minHeight } : undefined}>
      {isNear ? children : null}
    </div>
  );
}
