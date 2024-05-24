import React from 'react';

function Privacy() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-semibold text-center mb-6">PRIVACY & POLICY</h1>
      <div className="max-w-prose">
        <p className="text-gray-800 leading-relaxed mb-4">
          We do not share your account or booking information with any third parties,
          as we prioritize your privacy. We want to ensure that you feel safe to share
          more with us to help improve your experience.
        </p>
        <p className="text-gray-800 leading-relaxed">
          Your trust is important to us, and we are committed to protecting the personal
          information you share with us. Our privacy policy outlines how we collect, use,
          and safeguard your data.
        </p>
      </div>
    </div>
  );
}

export default Privacy;