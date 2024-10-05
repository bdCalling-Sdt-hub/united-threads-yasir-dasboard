/** @type {import('next').NextConfig} */
const nextConfig = {
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
