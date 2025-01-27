
import Hero from './components/Hero';
import LogoSection from './components/logosection';
import FeaturedProducts from './components/FeaturedProduct';
import TopProducts from './components/Topproducts';
import ImageCard from './components/ImageCard';

export default function Home() {
  return (
      <div>
      <Hero />
      <LogoSection />
      <FeaturedProducts />
      <TopProducts />
      <ImageCard />
    </div>
  );
};

