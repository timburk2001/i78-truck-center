export default function CautionStripe({ height = 'h-10', className = '' }) {
  return (
    <div
      className={`caution-stripe w-full ${height} ${className}`}
      aria-hidden="true"
    />
  )
}
