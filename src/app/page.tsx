import { Suspense } from 'react';

const Homepage = () => {
  return (
    <Suspense>
      <main className="container mx-auto">
        <h1 className="text-lg font-semibold">This is homepage</h1>
      </main>
    </Suspense>
  );
};

export default Homepage;
