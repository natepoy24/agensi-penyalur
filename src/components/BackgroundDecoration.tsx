// src/components/BackgroundDecoration.tsx

export default function BackgroundDecoration() {
  const svgPattern = `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fill-rule="evenodd">
        <g fill="#d1d5db" fill-opacity="0.4">
          <path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm-24 20v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z"/>
        </g>
      </g>
    </svg>
  `;

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgPattern)}")`,
        backgroundPosition: 'center',
      }}
    />
  );
} 