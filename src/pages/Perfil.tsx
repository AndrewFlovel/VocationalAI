import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase, hasSupabase } from '../lib/supabase'
import type { Profile } from '../types/profile'
import { MUNICIPIOS, TIPOS_UNIDAD } from '../types/profile'

export default function Perfil() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [tipoUnidad, setTipoUnidad] = useState('')

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/iniciar-sesion', { replace: true })
      return
    }
    if (!user) return

    if (!hasSupabase || !supabase) {
      setLoading(false)
      return
    }
    const userId = user.id
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        setMessage('Error al cargar el perfil.')
        setLoading(false)
        return
      }
      if (data) {
        setProfile(data)
        setMunicipio(data.municipio ?? '')
        setTipoUnidad(data.tipo_unidad_educativa ?? '')
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user, authLoading, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !hasSupabase || !supabase) return
    setSaving(true)
    setMessage('')

    const { error } = await supabase
      .from('profiles')
      .upsert(
        {
          id: user.id,
          municipio: municipio || null,
          tipo_unidad_educativa: tipoUnidad || null,
        },
        { onConflict: 'id' }
      )

    setSaving(false)
    if (error) {
      setMessage('No se pudo guardar. Intenta de nuevo.')
      return
    }
    setMessage('Perfil guardado.')
    setProfile((prev) =>
      prev
        ? { ...prev, municipio: municipio || null, tipo_unidad_educativa: tipoUnidad || null }
        : null
    )
  }

  if (authLoading || (user && loading)) {
    return (
      <main className="app-main">
        <p className="auth-subtitle">Cargando perfil…</p>
      </main>
    )
  }

  return (
    <main className="app-main">
      <div className="auth-card">
        <h1 className="page-heading">Mi perfil</h1>
        <p className="auth-subtitle">
          Completa tu información para personalizar la orientación (Santa Cruz, Montero, Warnes).
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {message && (
            <p className={message.startsWith('Error') ? 'form-error' : 'form-success'} role="status">
              {message}
            </p>
          )}
          <label className="form-label">
            Municipio
            <select
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              className="form-input"
            >
              <option value="">Selecciona tu municipio</option>
              {MUNICIPIOS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="form-label">
            Tipo de unidad educativa
            <select
              value={tipoUnidad}
              onChange={(e) => setTipoUnidad(e.target.value)}
              className="form-input"
            >
              <option value="">Selecciona</option>
              {TIPOS_UNIDAD.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn btn-block" disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar perfil'}
          </button>
        </form>

        {profile && (
          <p className="auth-footer" style={{ marginTop: '1rem' }}>
            Correo: <strong>{user?.email}</strong>
          </p>
        )}
      </div>
    </main>
  )
}
