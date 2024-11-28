// components/AuthGuard.tsx
'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

// This component will check the session and redirect if the user is not authenticated
export default function AuthGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return // Wait for session loading
    if (!session) {
      // If no session, redirect to the sign-in page
      redirect('/auth/prihlasenie')
    } else {
      setLoading(false)
    }
  }, [session, status])

  if (loading || status === 'loading') {
    return <div>Loading...</div> // Show loading state while checking session
  }

  return <>{children}</> // Render the children if authenticated
}
