import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // You can keep adding things here later, like:
  // experimental: { turbopack: true },
};

export default withNextIntl(nextConfig);
