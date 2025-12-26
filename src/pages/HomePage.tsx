import { Hero } from '@zenra/components'
import { FeaturedDestinations, Experiences, CustomerExperience, CallToAction, ImageGallery, Map } from '@zenra/components';
import { PageTransition } from '@zenra/components';

export const HomePage = () => {
  return (
    <PageTransition>
      <Hero />
      <FeaturedDestinations />
      {/* <PopularPackages /> */}
      <ImageGallery />
      <Experiences />
      <CustomerExperience />
      <Map />
      <CallToAction />
    </PageTransition>
  );
};