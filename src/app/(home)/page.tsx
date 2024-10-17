// src/app/page.tsx

"use client";

import { useSession } from 'next-auth/react';
import AuthHomeView from '@/sections/AuthHomeView';
import NonAuthHomeView from '@/sections/NonAuthHomeView';

export default function Home() {
  const { data: session } = useSession(); // Get the current session

  return (
    <div>
      {session ? <AuthHomeView /> : <NonAuthHomeView />}
    </div>
  );
}
