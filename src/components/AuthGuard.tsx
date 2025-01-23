// components/AuthGuard.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    if (!session) {
      redirect('/auth/prihlasenie')
    } else {
      setLoading(false)
    }
  }, [session, status])

  if (loading || status === 'loading') {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
