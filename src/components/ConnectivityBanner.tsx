import { useOnlineStatus } from '../hooks/useOnlineStatus'

export default function ConnectivityBanner() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div className="connectivity-banner" role="alert">
      <p>⚠️ No tienes conexión a internet. Algunas funciones podrían no estar disponibles.</p>
    </div>
  )
}
