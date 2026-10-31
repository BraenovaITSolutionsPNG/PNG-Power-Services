import { useState, type ReactNode } from 'react'

export type IconName =
  | 'alert'
  | 'arrow'
  | 'bolt'
  | 'briefcase'
  | 'check'
  | 'chevron'
  | 'clipboard'
  | 'clock'
  | 'close'
  | 'document'
  | 'home'
  | 'lock'
  | 'map'
  | 'menu'
  | 'phone'
  | 'plus'
  | 'search'
  | 'shield'
  | 'signal'
  | 'team'
  | 'user'
  | 'wrench'
  | 'zap'
  | 'info'
  | 'external'
  | 'download'

export function Icon({ name, className = 'size-5' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    alert: (
      <>
        <path d="M12 9v4m0 4h.01" />
        <path d="M10.3 3.6 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m14 7 5 5-5 5" />
      </>
    ),
    bolt: <path d="m13 2-9 12h8l-1 8 9-12h-8l1-8Z" />,
    briefcase: (
      <>
        <rect width="20" height="14" x="2" y="7" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m-4 4v4m-10-3h20" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clipboard: (
      <>
        <rect width="16" height="18" x="4" y="4" rx="2" />
        <path d="M9 4V2h6v2M8 9h8m-8 4h8m-8 4h5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8m-8 4h6" />
      </>
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </>
    ),
    lock: (
      <>
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" />
        <path d="M9 3v15m6-12v15" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c1 .3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    signal: (
      <>
        <path d="M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
        <path d="M12 20h.01" />
      </>
    ),
    team: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    wrench: (
      <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L4 17a2.1 2.1 0 0 0 3 3l8.3-8.3a4 4 0 0 0 5-5L18 9l-2.4-2.4 2.3-2.3a4 4 0 0 0-3.2 2Z" />
    ),
    zap: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />,
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4M12 8h.01" />
      </>
    ),
    external: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </>
    ),
    download: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  }

  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.bolt}
    </svg>
  )
}

export function Brand({ inverse = false, className = '' }: { inverse?: boolean; className?: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {!imgError ? (
        <img
          src="/png-power-logo.png"
          alt="PNG Power Logo"
          onError={() => setImgError(true)}
          className="size-11 object-contain shrink-0 drop-shadow-sm"
        />
      ) : (
        <div className="grid size-11 place-items-center rounded-xl bg-brand text-white shadow-brand">
          <Icon name="bolt" className="size-5 fill-current" />
        </div>
      )}
      <div>
        <div className={`text-lg font-extrabold leading-none tracking-tight ${inverse ? 'text-white' : 'text-ink'}`}>
          PNG POWER
        </div>
        <div
          className={`mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] ${
            inverse ? 'text-white/65' : 'text-muted'
          }`}
        >
          Powering Papua New Guinea
        </div>
      </div>
    </div>
  )
}

