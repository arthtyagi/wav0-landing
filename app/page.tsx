import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { ChatPill } from "@/components/chat-pill"
import { Footer } from "@/components/footer"
import { WaterShaderBackground } from "@/components/ui/water-shader-background"

export default function WAV0Landing() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <HeroSection />

        <section className="py-32 px-6 relative">
          <div className="absolute inset-0 opacity-30">
            <WaterShaderBackground />
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-medium text-foreground mb-6 tracking-tight">
                Everything you need
              </h2>
              <p className="text-xl text-muted-foreground">Clean tools, predictable results, zero friction.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <FeatureSection title="WAV0 AI" description="Describe your idea. Get a track. Iterate fast." index={0} />

              <FeatureSection title="Studio" description="Browser-native DAW with zero downloads." index={1} />

              <FeatureSection title="Vault" description="Secure storage with version control." index={2} />

              <FeatureSection title="Export" description="One-click export to any format or platform." index={3} />
            </div>
          </div>
        </section>

        <Footer />

        <ChatPill />
      </div>
    </div>
  )
}
