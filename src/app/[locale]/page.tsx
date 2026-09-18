import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = 'https://www.kongenshave.com';
  const url = locale === 'zh' ? `${baseUrl}/` : `${baseUrl}/en`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: "The King's Garden (Kongens Have)",
    alternateName: ['Kongens Have', 'King’s Garden', 'Kongens Have Copenhagen', '国王花园'],
    description:
      "Denmark's oldest royal garden in central Copenhagen, beside Rosenborg Castle. Free admission, open daily year-round.",
    url,
    image: [
      `${baseUrl}/gallery/images%20(1).jpg`,
      `${baseUrl}/gallery/images%20(2).jpg`,
      `${baseUrl}/gallery/images%20(3).jpg`,
    ],
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Øster Voldgade 4A',
      addressLocality: 'København',
      postalCode: '1307',
      addressCountry: 'DK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.685,
      longitude: 12.5791,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        name: 'Summer (Apr 1 – Sep 30)',
        validFrom: '2025-04-01',
        validThrough: '2025-09-30',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        name: 'Winter (Oct 1 – Mar 31)',
        validFrom: '2025-10-01',
        validThrough: '2026-03-31',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.6',
      reviewCount: '13430',
    },
    containsPlace: {
      '@type': 'TouristAttraction',
      name: 'Rosenborg Castle',
      description: '17th-century Renaissance castle housing the Danish Crown Jewels.',
    },
    touristType: ['Families', 'Couples', 'Solo', 'Friends'],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <PhotoSpotsSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
