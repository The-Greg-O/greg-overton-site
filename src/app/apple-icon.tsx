import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#03040a',
        backgroundImage:
          'radial-gradient(circle at 30% 25%, rgba(95,211,214,0.3), transparent 60%), linear-gradient(180deg, #080b15, #03040a)',
        color: '#5dd3d6',
        fontFamily: 'monospace',
        fontSize: 88,
        fontWeight: 500,
        letterSpacing: '-0.05em',
      }}
    >
      go
    </div>,
    size
  )
}
