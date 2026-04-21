import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#03040a',
        backgroundImage: 'radial-gradient(circle at 30% 30%, #0c1520, #03040a 70%)',
        color: '#5dd3d6',
        fontFamily: 'monospace',
        fontSize: 18,
        fontWeight: 500,
        letterSpacing: '-0.04em',
        borderRadius: 8,
        boxShadow: 'inset 0 0 0 1px rgba(95,211,214,0.35)',
      }}
    >
      go
    </div>,
    size
  )
}
