// TOD/tod/apps-web/app/page.tsx
'use client';

import {useTranslations} from 'next-intl';

export default function HomePage() {
  const t = useTranslations('Home');

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
    </main>
  );
}
