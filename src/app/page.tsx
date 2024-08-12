import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'This is the homepage of the application',
};

const Homepage = () => {
  return (
    <main className="container mx-auto">
      <h1 className="text-lg font-semibold">This is homepage</h1>
    </main>
  );
};

export default Homepage;
