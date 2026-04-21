import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/constants'

export const runtime = 'edge'
export const alt = 'Greg Overton — Head of Research Engineering'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '64px 72px',
        color: '#dfe6ee',
        fontFamily: 'system-ui, sans-serif',
        backgroundColor: '#03040a',
        backgroundImage: [
          'radial-gradient(ellipse 1100px 700px at 12% -5%, rgba(95,211,214,0.24), transparent 55%)',
          'radial-gradient(ellipse 900px 700px at 95% 100%, rgba(132,91,213,0.18), transparent 55%)',
          'linear-gradient(180deg, #080b15 0%, #05080f 60%, #03040a 100%)',
        ].join(', '),
        position: 'relative',
      }}
    >
      {/* Top meta row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          fontFamily: 'monospace',
          fontSize: 22,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#8d9aa5',
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            backgroundColor: '#5dd3d6',
            boxShadow: '0 0 20px #5dd3d6',
          }}
        />
        <span style={{ color: '#7ae0e3' }}>LOG 00</span>
        <span>·</span>
        <span>Profile</span>
        <span style={{ color: '#4a5461', marginLeft: 8 }}>/</span>
        <span>47.6°N · 122.3°W</span>
      </div>

      {/* Main */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            fontWeight: 300,
            letterSpacing: '-0.035em',
            lineHeight: 0.95,
            color: '#eef4f8',
          }}
        >
          <span>Greg&nbsp;</span>
          <span
            style={{
              backgroundImage: 'linear-gradient(92deg, #5dd3d6, #7ae0e3 40%, #a4b8e6)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Overton
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontFamily: 'monospace',
            fontSize: 26,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#8d9aa5',
          }}
        >
          <span style={{ color: '#5dd3d6' }}>›</span>
          <span>Head of Research Engineering</span>
          <span style={{ color: '#4a5461' }}>·</span>
          <span style={{ color: '#dfe6ee' }}>Butlr Technologies</span>
        </div>
        <div
          style={{
            maxWidth: 900,
            fontSize: 30,
            lineHeight: 1.4,
            color: '#c9d4dd',
          }}
        >
          Real systems and real integrations that solve real problems — cutting-edge where it helps,
          practical first, with a heart for the human side.
        </div>
      </div>

      {/* Bottom meta row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'monospace',
          fontSize: 20,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#6b7682',
        }}
      >
        <span>{siteConfig.url.replace(/^https?:\/\//, '')}</span>
        <span>Seattle, WA</span>
      </div>
    </div>,
    size
  )
}
