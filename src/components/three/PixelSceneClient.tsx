'use client';

import dynamic from 'next/dynamic';

const PixelControlScene = dynamic(
  () => import('@/components/three/PixelControlScene').then(mod => mod.PixelControlScene),
  { ssr: false }
);

interface PixelSceneClientProps {
  className?: string;
}

export function PixelSceneClient({ className }: PixelSceneClientProps) {
  return <PixelControlScene className={className} />;
}
