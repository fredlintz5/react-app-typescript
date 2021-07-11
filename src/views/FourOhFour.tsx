import { useLocation } from 'react-router-dom'

export default function FourOhFourPage() {
  const location = useLocation();
  return (
    <div>
      <code>{location.pathname}</code>
      <h2>Page Not Found</h2>
    </div>
  )
}