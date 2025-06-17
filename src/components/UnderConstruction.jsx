import React from "react";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 text-yellow-800 px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4">🚧 Page Under Construction</h1>
        <p className="text-lg mb-2">
          We're still working on this page. Please check back soon!
        </p>
        <p className="text-sm text-yellow-700">
          If you believe you've reached this in error, contact us at{" "}
          <a
            href="mailto:info@persianparade.com"
            className="underline hover:text-yellow-900"
          >
            info@persianparade.com
          </a>.
        </p>
      </div>
    </div>
  );
}
