/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Extend the Webpack configuration
      config.module.rules.push({
        test: /\.svg$/, // Match .svg files
        use: ["@svgr/webpack"], // Use @svgr/webpack to handle SVG imports as React components
      });
  
      return config; // Return the updated config
    },
  };
  
  export default nextConfig;
  