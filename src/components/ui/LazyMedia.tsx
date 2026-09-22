'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Props = {
  src: string;
  type: 'video' | 'image';
  alt?: string;
  className?: string;
  style?: CSSProperties;
  /**
   * Classes for the wrapper. Must establish a height of its own, since the
   * media element is only rendered once near the viewport — an auto-height
   * wrapper collapses to nothing and the media never becomes visible.
   */
  holderClassName?: string;
  /** How far outside the viewport to start fetching. */
  rootMargin?: string;
};

/**
 * Defers fetching media until it is near the viewport and shows a skeleton
 * until it paints. The project videos are tens of MB each, so without this the
 * browser starts pulling every one of them on first render.
 */
export default function LazyMedia({
  src,
  type,
  alt = '',
  className = '',
  style,
  holderClassName = 'absolute inset-0',
  rootMargin = '400px',
}: Props) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={holderRef} className={holderClassName}>
      {!loaded && <div className="media-skeleton" aria-hidden="true" />}
      {near &&
        (type === 'video' ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            // No preload="none": it suppresses autoPlay's fetch entirely and
            // the pane stays blank. Laziness comes from the observer gating
            // whether this element is mounted at all.
            preload="metadata"
            onLoadedData={() => setLoaded(true)}
            className={className}
            style={style}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={className}
            style={style}
          />
        ))}
    </div>
  );
}
