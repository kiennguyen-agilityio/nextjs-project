import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to Our App - Explore Features and Resources',
  description:
    'Explore our application’s homepage to discover features, access resources, and connect with the community. Start your journey with us!',
};

const Homepage = () => {
  return (
    <main className="container mx-auto">
      <h1 className="text-lg font-semibold">This is homepage</h1>
    </main>
  );
};

export default Homepage;
