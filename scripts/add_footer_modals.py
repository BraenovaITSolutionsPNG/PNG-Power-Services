p = r"D:\BraeNova_Projects\PNG Power Services\src\components\PublicLandingPage.tsx"
s = open(p, encoding='utf-8').read()

old = "    </div>\n  )\n}"
new = """    </div>

      {/* Customer Charter Modal */}
      {showCustomerCharter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">PNG Power Customer Charter</h3>
              <button onClick={() => setShowCustomerCharter(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              <p className="text-sm leading-relaxed">
                PNG Power Limited is committed to providing reliable, safe, and affordable electricity to all Papua New Guineans.
                This Customer Charter outlines our service standards and your rights as a customer.
              </p>
              <h4 className="font-bold text-gray-900">Our Commitments</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Respond to power outage reports within 2 hours during business hours</li>
                <li>Restore power within 24 hours for standard faults</li>
                <li>Provide accurate and timely billing information</li>
                <li>Maintain safe electricity infrastructure</li>
                <li>Treat all customers with respect and fairness</li>
                <li>Protect customer data and privacy</li>
              </ul>
              <h4 className="font-bold text-gray-900">Your Rights</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Right to reliable electricity supply</li>
                <li>Right to clear and transparent billing</li>
                <li>Right to lodge complaints and receive responses</li>
                <li>Right to safety information about electrical hazards</li>
              </ul>
              <h4 className="font-bold text-gray-900">How to Contact Us</h4>
              <p className="text-sm">National Call Centre: 7090 8000 (24/7) | Toll Free: 116</p>
              <p className="text-sm">Email: customercare@pngpower.com.pg</p>
            </div>
            <div className="pt-4">
              <button onClick={() => setShowCustomerCharter(false)} className="button button-secondary w-full">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-gray-200 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-gray-900">Privacy Policy</h3>
              <button onClick={() => setShowPrivacyPolicy(false)} className="text-gray-500 hover:text-gray-900">
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              <p className="text-sm leading-relaxed">
                PNG Power Limited is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.
              </p>
              <h4 className="font-bold text-gray-900">Information We Collect</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Name and contact details (phone, email)</li>
                <li>Location and address information</li>
                <li>Fault reports and service requests</li>
                <li>Account and billing information</li>
              </ul>
              <h4 className="font-bold text-gray-900">How We Use Your Information</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>To process and respond to fault reports</li>
                <li>To dispatch field crews to your location</li>
                <li>To communicate service updates and restoration times</li>
                <li>To improve our services and infrastructure</li>
              </ul>
              <h4 className="font-bold text-gray-900">Data Security</h4>
              <p className="text-sm">We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
              <h4 className="font-bold text-gray-900">Contact Us</h4>
              <p className="text-sm">For privacy-related inquiries: privacy@pngpower.com.pg</p>
            </div>
            <div className="pt-4">
              <button onClick={() => setShowPrivacyPolicy(false)} className="button button-secondary w-full">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}"""
# Replace only the last occurrence
idx = s.rfind(old)
assert idx >= 0, "pattern not found"
s = s[:idx] + new + s[idx+len(old):]
open(p, 'w', encoding='utf-8').write(s)
print("done")
