import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to Our Application - Explore Features, Learn, and Grow',
  description:
    'Discover the homepage of our innovative application where you can explore various features, access resources, and engage with a vibrant community. Start your journey with us today!',
};

const Homepage = () => {
  return (
    <main className="container mx-auto">
      <h1 className="text-lg font-semibold">This is homepage</h1>
    </main>
  );
};

export default Homepage;
