
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/employee/list');
  }, [router]);

  return (
    <>
      {/* empty since will redirect to /list */}
    </>
  );
}