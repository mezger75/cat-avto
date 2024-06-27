/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test.taxivoshod.ru",
        port: "",
      },
    ],
  },
};

export default nextConfig;
