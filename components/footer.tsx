"use client"

export function Footer() {
  return (
    <footer className="relative bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="text-center mb-12">
          <h2 className="text-8xl select-none md:text-9xl font-mono tracking-[-0.1em] text-muted-foreground font-light">WAV_0</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Product</h3>
            <div className="space-y-2">
              <a href="/docs" className="block text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
              <a href="/features" className="block text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Community</h3>
            <div className="space-y-2">
              <a
                href="https://github.com"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://discord.com"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Discord
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Support</h3>
            <div className="space-y-2">
              <a href="/help" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Legal</h3>
            <div className="space-y-2">
              <a href="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">© 2025 WAV0. Open-source AI music studio.</p>
        </div>
      </div>
    </footer>
  )
}
