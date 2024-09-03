import Footer from '../../components/footer/footer';
import Navbar from '../../components/navbar/navbar';
import {
  FifthSection,
  FirstSection,
  FourthSection,
  HeroSection,
  SecondSection,
  SixthSection,
  ThirdSection
} from './_components';

const PersonalPage = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <Footer />
    </div>
  );
};

export default PersonalPage;
