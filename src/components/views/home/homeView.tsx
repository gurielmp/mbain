import HeroSection from "./components/heroSection"
import FeaturesSection from "./components/featuresSection"
import TestimonialsSection from "./components/testimonialsSection"
import CallToActionSection from "./components/callToActionSection"

const HomeView = () => {
  return (
    <div className="bg-[#fefae5] pt-8 text-gray-800">
      <FeaturesSection />
      <HeroSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  )
}

export default HomeView
