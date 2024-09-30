/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects:() => [
    {
      source: "/",
      destination: "/login",
      permanent: true,
    },
  ]

};

export default nextConfig;
