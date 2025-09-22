import { Bot, Sliders, Archive, FileText } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { ChatPill } from "@/components/chat-pill"
import { DynamicBackground } from "@/components/dynamic-background"
import { Footer } from "@/components/footer"
import { Client3DScene } from "@/components/client-3d-scene"

export default function WAV0Landing() {
  return (
    <div className="min-h-screen bg-background relative">
      <Client3DScene />
      <DynamicBackground />

      <div className="relative z-10">
        <HeroSection />

        <main>
          <FeatureSection
            title="WAV0 AI Agent"
            description="Just ask and it turns your idea to sound in seconds. Music Generation powered by ElevenLabs. Built with AI SDK."
            icon={<Bot size={40} />}
            delay={0.1}
            index={0}
            metric="<10s"
            metricLabel="Effects Gen"
          />

          <FeatureSection
            title="Music Studio"
            description="Browser-native DAW with zero downloads. Edit, create soundpacks, export to any format. Faster than stock sites."
            icon={<Sliders size={40} />}
            delay={0.2}
            index={1}
            metric="Zero"
            metricLabel="Friction Export"
          />

          <FeatureSection
            title="Music Vault"
            description="Secure flexible storage for your music. Easily store and have control over who has access to your music. Private by default."
            icon={<Archive size={40} />}
            delay={0.3}
            index={2}
            metric="Private"
            metricLabel="By Default"
          />

          <FeatureSection
            title="Version Control"
            description="Easily toggle between versions of your audio files in Vault and generations in WAV0 Agent."
            icon={<FileText size={40} />}
            delay={0.4}
            index={3}
            metric="1-Click"
            metricLabel="Rollback"
          />
        </main>

        <Footer />

        <ChatPill />
      </div>
    </div>
  )
}
