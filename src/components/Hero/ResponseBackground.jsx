import React from "react";

export default function ResponseBackground() {
  return (
    <picture>
      {/* Зображення для ретини (2x) */}
      <source
        media="(min-width: 1168px)"
        srcSet="/assets/images/hero/xl.jpg 1x, /assets/images/hero/retina/xl@2x.jpg 2x"
      />
      <source
        media="(min-width: 1024px)"
        srcSet="/assets/images/hero/lg.jpg 1x, /assets/images/hero/retina/lg@2x.jpg 2x"
      />
      <source
        media="(min-width: 768px)"
        srcSet="/assets/images/hero/md.jpg 1x, /assets/images/hero/retina/md@2x.jpg 2x"
      />
      {/* Fallback */}
      <img
        src="/assets/images/hero/sm.jpg"
        alt="Ukraine symbol image"
        className="hero__background"
        loading="lazy"
      />
    </picture>
  );
}
