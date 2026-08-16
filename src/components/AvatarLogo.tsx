interface AvatarLogoProps {
  /** Pixel size of the avatar. */
  size?: number
  className?: string
}

/**
 * The site mark: a live, animated treatment of the portrait. A conic gradient
 * ring sweeps around it, a soft aura breathes underneath, and a scan band
 * travels down the face. Pure CSS over the existing image, so it costs nothing.
 */
export default function AvatarLogo({ size = 38, className = '' }: AvatarLogoProps) {
  return (
    <span
      className={`avatar-logo relative inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {/* Breathing aura */}
      <span className="avatar-aura absolute inset-[-22%] rounded-full" />

      {/* Static rim, with a single blue sweep travelling around it */}
      <span className="avatar-track absolute inset-0 rounded-full" />
      <span className="avatar-ring absolute inset-0 rounded-full" />

      {/* Portrait */}
      <span
        className="relative overflow-hidden rounded-full"
        style={{ width: size - 5, height: size - 5 }}
      >
        <img
          src="/avatar-logo.jpg"
          alt=""
          className="avatar-img h-full w-full object-cover"
          style={{ objectPosition: '50% 30%' }}
        />
        <span className="avatar-scan pointer-events-none absolute inset-x-0 h-1/3" />
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
      </span>
    </span>
  )
}
