import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function ServiceCard({ icon, title, description, linkTo = '/services', image }) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <article
      style={{
        background: 'white',
        border: '1px solid var(--grey)',
        boxShadow: hovered
          ? '0 12px 32px rgba(40,32,32,0.14)'
          : '0 2px 12px rgba(40,32,32,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — separate overflow:hidden so badge (outside this div) can overlap */}
      <div style={{ overflow: 'hidden', flexShrink: 0 }}>
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              display: 'block',
              width: '100%',
              aspectRatio: '16 / 10',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />
        ) : (
          <div style={{ aspectRatio: '16 / 10', background: 'var(--grey)', opacity: 0.4 }} />
        )}
      </div>

      {/* Card body — badge sits here with negative top margin to straddle image edge */}
      <div
        style={{
          padding: '0 24px 28px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {/* Red icon badge — negative margin-top pulls it up over the image boundary */}
        <div
          style={{
            width: 56,
            height: 56,
            background: 'var(--red)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            marginTop: -28,   /* Half the badge height — straddles image/body boundary */
            marginLeft: 0,
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Icon name={icon} size={24} style={{ color: 'white' }} />
        </div>

        <h3
          style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 800,
            fontSize: 20,
            lineHeight: 1.1,
            color: 'var(--ink)',
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: 'var(--ink-55)',
            fontSize: 15,
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
          }}
        >
          {description}
        </p>
        {linkTo && (
          <span
            style={{
              color: 'var(--red)',
              fontSize: 13,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginTop: 4,
            }}
          >
            Learn More
            <Icon name="arrow" size={14} />
          </span>
        )}
      </div>
    </article>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} style={{ display: 'block', textDecoration: 'none' }}>
        {card}
      </Link>
    )
  }
  return card
}
