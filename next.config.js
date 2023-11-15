/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: [
				{
					loader: "@svgr/webpack",
					options: {
						svgoConfig: {
							plugins: [
								{
									name: "preset-default",
									params: {
										overrides: {
											removeViewBox: false,
										},
									},
								},
							],
						},
					},
				},
			],
		});

		return config;
	},
  
}

module.exports = nextConfig
