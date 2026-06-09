const PATHS = {
  phone: (
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.27 9.6a19.79 19.79 0 01-3.07-8.64A2 2 0 012.18 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.41 9.1A16 16 0 0013.9 16.59l1.42-1.42a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  ),
  hook: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M12 12v4a4 4 0 004 4h2" />
    </>
  ),
  semi: (
    <>
      <rect x="1" y="10" width="14" height="10" rx="1" />
      <path d="M15 14h5l3 3v3h-8V14z" />
      <circle cx="5" cy="20" r="1.5" />
      <circle cx="19" cy="20" r="1.5" />
    </>
  ),
  car: (
    <>
      <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l2-3h8l2 3h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  flatbed: (
    <>
      <rect x="1" y="14" width="22" height="4" rx="1" />
      <path d="M4 14V9l4-4h8l4 4v5" />
      <circle cx="6" cy="18" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </>
  ),
  cone: (
    <>
      <path d="M12 2L4 20h16L12 2z" />
      <path d="M7 14h10M9 9h6" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  ),
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  bolt: (
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  ),
  route: (
    <>
      <polyline points="3 9 3 20 10 20 10 14 14 14 14 20 21 20 21 9" />
      <polyline points="3 9 12 3 21 9" />
    </>
  ),
  arrow: (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  mail: (
    <>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22 6 12 13 2 6" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  shop: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '', style }) {
  const content = PATHS[name]
  if (!content) return null
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {content}
    </svg>
  )
}
