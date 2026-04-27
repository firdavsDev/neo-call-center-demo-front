export interface LogoProps {
  size?: number
  mono?: boolean
  color?: string
  showWordmark?: boolean
}

export function Logo({ size = 28, mono = false, color, showWordmark = true }: LogoProps) {
  const wordmarkColor = color || (mono ? 'currentColor' : 'var(--text-primary)')
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <img
        src="/raqamli-logo.svg"
        width={size}
        height={size}
        alt="Raqamli Bank"
        style={{ display: 'block', filter: mono ? 'grayscale(1) brightness(0.5)' : 'none' }}
      />
      {showWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: size * 0.6,
            letterSpacing: '0.02em',
            color: wordmarkColor,
          }}
        >
          Raqamli Bank
        </span>
      )}
    </span>
  )
}
