/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clinica-admin.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  redirects: () => [
    {
      source: "/",
      destination: "/login",
      permanent: true,
    },
    {
      source: "/csr",
      destination: "/csr/quote-details",
      permanent: true,
    },
  ],
};

export default nextConfig;
