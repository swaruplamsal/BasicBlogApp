// app/design-showcase/page.js
"use client";

export default function DesignShowcase() {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-gradient animate-fade-in-up">
            Modern Editorial Design System
          </h1>
          <p className="text-xl text-neutral-300 mt-6 max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms]">
            Transforming generic themes with sophisticated typography, premium colors, 
            and distinctive brand identity for professional blogs.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-center">
            Color System: Emerald + Mint
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Brand Colors */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-4 text-neutral-100">Brand Primary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-400 rounded-lg shadow-medium"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#34d399</div>
                    <div className="text-xs text-neutral-500">brand-400</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-500 rounded-lg shadow-brand"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#10b981</div>
                    <div className="text-xs text-neutral-500">brand-500 (primary)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-600 rounded-lg shadow-medium"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#059669</div>
                    <div className="text-xs text-neutral-500">brand-600</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Mint Secondary */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-4 text-neutral-100">Mint Secondary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mint-400 rounded-lg shadow-medium"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#2dd4bf</div>
                    <div className="text-xs text-neutral-500">mint-400</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mint-500 rounded-lg shadow-medium"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#14b8a6</div>
                    <div className="text-xs text-neutral-500">mint-500</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-mint-600 rounded-lg shadow-medium"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#0d9488</div>
                    <div className="text-xs text-neutral-500">mint-600</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Neutral Grays */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-4 text-neutral-100">Modern Neutrals</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-800 rounded-lg border border-neutral-700"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#262626</div>
                    <div className="text-xs text-neutral-500">neutral-800</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-900 rounded-lg border border-neutral-700"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#171717</div>
                    <div className="text-xs text-neutral-500">neutral-900</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-neutral-950 rounded-lg border border-neutral-700"></div>
                  <div>
                    <div className="font-mono text-sm text-neutral-300">#0a0a0a</div>
                    <div className="text-xs text-neutral-500">neutral-950</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-center">
            Typography: Inter + Source Serif Pro
          </h2>
          
          <div className="glass-card mb-8">
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-serif font-bold">Elegant Headlines</h1>
                <p className="text-sm text-neutral-500 mt-2 font-mono">font-serif, text-5xl, font-bold</p>
              </div>
              
              <div>
                <h2 className="text-3xl font-serif font-semibold">Section Headings</h2>
                <p className="text-sm text-neutral-500 mt-2 font-mono">font-serif, text-3xl, font-semibold</p>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-medium">Subsection Titles</h3>
                <p className="text-sm text-neutral-500 mt-2 font-mono">font-serif, text-xl, font-medium</p>
              </div>
              
              <div>
                <p className="text-lg text-neutral-300 leading-relaxed">
                  Body text uses Geist for exceptional readability and modern appeal. 
                  The letterSpacing is carefully tuned for optimal reading experience 
                  across devices and screen sizes.
                </p>
                <p className="text-sm text-neutral-500 mt-2 font-mono">font-geist, text-lg, leading-relaxed</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  Small caps for metadata
                </p>
                <p className="text-sm text-neutral-500 mt-2 font-mono">text-sm, uppercase, tracking-wider</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-center">
            Premium Components
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Buttons */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-6">Button System</h3>
              <div className="space-y-4">
                <button className="btn btn-primary">Primary Action</button>
                <button className="btn btn-secondary">Secondary Action</button>
                <button className="btn btn-outline">Outline Style</button>
                <button className="btn btn-ghost">Ghost Style</button>
              </div>
            </div>
            
            {/* Cards */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-6">Card Variants</h3>
              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-medium text-neutral-100 mb-2">Basic Card</h4>
                  <p className="text-sm text-neutral-400">Standard card styling</p>
                </div>
                <div className="card-hover p-4">
                  <h4 className="font-medium text-neutral-100 mb-2">Hover Card</h4>
                  <p className="text-sm text-neutral-400">Interactive with hover effects</p>
                </div>
              </div>
            </div>
            
            {/* Badges */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-6">Badge System</h3>
              <div className="flex flex-wrap gap-3">
                <span className="badge-primary">Primary</span>
                <span className="badge-secondary">Secondary</span>
                <span className="badge-success">Success</span>
                <span className="badge-warning">Warning</span>
                <span className="badge-error">Error</span>
              </div>
            </div>
            
            {/* Form Elements */}
            <div className="glass-card">
              <h3 className="text-lg font-medium mb-6">Form Elements</h3>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter your email..."
                  />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Write your message..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-semibold mb-12 text-center">
            Transformation Impact
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card border-error-500/20">
              <h3 className="text-lg font-medium mb-6 text-error-400">❌ Before: Generic Theme</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>• Muddy brown backgrounds (#3a2525)</li>
                <li>• Harsh red accents (#ff0000)</li>
                <li>• Basic Inter + Playfair fonts</li>
                <li>• No semantic color system</li>
                <li>• Generic component styling</li>
                <li>• Poor visual hierarchy</li>
                <li>• Limited brand personality</li>
              </ul>
            </div>
            
            <div className="glass-card border-brand-500/20">
              <h3 className="text-lg font-medium mb-6 text-brand-400">✅ After: Premium Editorial</h3>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li>• Pure black backgrounds (#0a0a0a)</li>
                <li>• Sophisticated emerald + mint palette</li>
                <li>• Geist + Source Serif Pro typography</li>
                <li>• Complete semantic color system</li>
                <li>• Glass morphism & modern effects</li>
                <li>• Strong visual hierarchy</li>
                <li>• Distinctive brand identity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <div className="text-center py-16">
        <p className="text-neutral-500 text-sm">
          🎨 Design system successfully transformed from generic to distinctive
        </p>
      </div>
    </div>
  );
}