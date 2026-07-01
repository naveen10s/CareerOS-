import React from "react";
import profileData from "@/data/profile.json";

export function SchemaOrg() {
  const profile = profileData.example as any;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-07-01T12:00:00Z",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.headline,
      description: profile.summary,
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.location.split(",")[0].trim(),
        addressRegion: profile.location.split(",")[1]?.trim() || "",
        addressCountry: "US",
      },
      email: profile.email,
      url: "https://careeros.dev",
      sameAs: [
        profile.links?.linkedin || "https://linkedin.com",
        profile.links?.github || "https://github.com",
      ],
      knowsAbout: profile.strengths || [],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default SchemaOrg;
