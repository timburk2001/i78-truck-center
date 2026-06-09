export default function CautionStripe({ height = 'h-10', className = '', variant = 'orange' }) {
  const variants = {
    orange: 'caution-stripe',
    grey: 'caution-stripe-grey',
    dark: 'caution-stripe-dark',
  }
  return (
    <div
      className={`w-full ${height} ${variants[variant] ?? 'caution-stripe'} ${className}`}
      aria-hidden="true"
    />
  )
}
