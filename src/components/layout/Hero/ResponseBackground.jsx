import React from "react";

export default function ResponseBackground() {
  return (
    /* Зображення для ретини (2x) */
    <picture>
      <source
        media="(min-width: 1168px)"
        srcSet="/images/xl.jpg 1x, /images/xl@2x.jpg 2x"
      />
      <source
        media="(min-width: 1024px)"
        srcSet="/images/lg.jpg 1x, /images/lg@2x.jpg 2x"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/images/md.jpg 1x, /images/md@2x.jpg 2x"
      />
      {/* Fallback */}
      <img
        src="/images/sm.jpg"
        alt="Ukraine symbol image"
        fetchPriority="high"
        className="hero__background"
      />
    </picture>
  );
}
