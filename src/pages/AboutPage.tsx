import { PageTransition } from '../components/PageTransition';
import { AboutHero, AboutStats, AboutStory, AboutValues, AboutTeam } from '@zenra/components';

export const AboutPage = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <AboutHero />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AboutStats />
          <AboutStory />
          <AboutValues />
          <AboutTeam />
        </main>
      </div>
    </PageTransition>
  );
};