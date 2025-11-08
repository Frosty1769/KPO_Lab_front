/** @type {import('tailwindcss').Config} */

const { transform } = require('typescript');

module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			white: '#FFFFFF',
			black: '#000000',
			blackout: 'rgba(13, 13, 13, 0.3)',
			accent: {
				DEFAULT: '#a77236',
				hover: '#794a15',
				transparent: 'rgba(00, 172, 134, 0.1)'
			},
			gray: {
				1: '#F6F6F6',
				2: '#D0D2D2',
				3: '#969FA8',
				4: '#787F86',
			},
			system: {
				red: {
					DEFAULT: '#DF5049',
					hover: '#ED4938',
				},
				green: {
					DEFAULT: '#00AC86',
					hover: '#009B75',
				},
				yellow: {
					DEFAULT: '#E8B20C',
					hover: '#DCB349',
				},
			},
			constructor: {
				green: '#27B97C',
				purple: '#9261D1',
				peach: '#ED835F',
				blue: '#5885DB',
			},
		},
		boxShadow: {
			1: '0px 8px 20px rgba(0, 0, 0, 0.1)',
			2: '0px 4px 16px rgba(0, 0, 0, 0.06)',
			3: '0px 2px 24px rgba(0, 0, 0, 0.08)',
		},
		extend: {
			backgroundImage: {
				'gachi': "linear-gradient(90deg, rgba(228,3,3,1) 0%, rgba(255,140,0,1) 20%, rgba(221,205,0,1) 40%, rgba(0,128,38,1) 60%, rgba(36,64,142,1) 80%, rgba(115,41,130,1) 100%)",
			},
			texTruncate: {
				display: '-webkit-box',
				'-webkit-line-clamp': '2',
				'-webkit-box-orient': 'vertical',
				overflow: 'hidden',
				'text-overflow': 'ellipsis',
			},

			keyframes: {
				slideDown: {
					from: {
						height: 0,
					},
					to: {
						height: 'var(--radix-collapsible-content-height)',
					},
				},
				slideUp: {
					from: {
						height: 'var(--radix-collapsible-content-height)',
					},
					to: {
						height: 0,
					},
				},
				spinReverse: {
					from: {
					  transform: "rotate(360deg)",
					},
					to: {
					  transform: 'rotate(0deg)',
					},
					'0%, 100%': {
						opacity: 1,
					},
					'50%': {
						opacity: 0.2,
					}
				  },
				hoverUp: {
					'0%, 100%': {
						opacity: 1,
					},
					'50%': {
						opacity: 0.2,
					}
				},

				lol: {
					from: {
						scale: '100%',
					},
					to: {
						scale: '100%'
					},
					'50%': {
						scale: '150%',
					},

					'10%': {
						'background-color': 'rgb(255 200 200)',
						'box-shadow': '0px 0px 50px rgb(255 200 200)',
					},

					'30%': {
						'background-color': 'rgb(200 255 200)',
						'box-shadow': '0px 0px 50px rgb(200 255 200)',
					},

					'50%': {
						'background-color': 'rgb(200 200 255)',
						'box-shadow': '0px 0px 50px rgb(200 200 255)',
					},

					'70%': {
						'background-color': 'rgb(200 100 200)',
						'box-shadow': '0px 0px 50px rgb(200 100 200)',
					},

				},

				slideLeftRight: {
					'0%, 100%': {
						transform: 'translateX(0px) rotate(0deg)',
						
					},
					'50%': {
						transform: 'translateX(-1000px) rotate(360deg)',
					}
				},
				slideBounce: {
					'0%, 100%': {
						transform: 'translateX(-50px)',
						
					},
					'50%': {
						transform: 'translateX(1500px)',
					}
				},

				scaling: {
					from: {
						scale: '100%',
					},
					to: {
						scale: '100%'
					},
					'50%': {
						scale: '150%',
					},
				},

				feedback: {
					'25%': {
						transform: 'translateY(-1000px) translateX(0px)'
					},
					'26%': {
						transform: 'translateY(-1000px) translateX(-1800px)'
					},
					'50%': {
						transform: 'translateX(-1800px) translateY(-1000px)'
					},
					'75%': {
						transform: 'translateX(-1800px) translateY(1000px)'
					},
					'76%': {
						transform: 'translateX(1800px) translateY(1000px)'
					},
					'100%': {
						transform: 'translateX(1800px) translateY(1000px)'
					},
					
					// '50%': {
					// 	transform: 'translateX(-1000px) translateY(-1000px)'
					// },
				},

				feedbackOpenSide: {
					from: {
						transform: 'translateX(0px)',
					},
					to: {
						transform: 'translateX(-400px)',
					}
				},
				feedbackCloseSide: {
					from: {
						transform: 'translateX(-400px)',
					},
					to: {
						transform: 'translateX(0px)',
					}
				},
				
			},
			animation: {
				slideDown: 'slideDown 200ms ease-out',
				slideUp: 'slideUp 200ms ease-out',
				spinReverse: 'spinReverse 500ms linear infinite',
				hoverUp: 'hoverUp 500s linear infinite',
				lol: 'lol 1s linear infinite',
				slideLeftRight: 'slideLeftRight 1s linear infinite',
				slideBounce: 'slideBounce 2s linear infinite',
				scaling: 'scaling 1s linear infinite',
				feedback: 'feedback 5s linear infinite',
				feedbackOpenSide: 'feedbackOpenSide 2s linear forwards',
				feedbackCloseSide: 'feedbackCloseSide 2s linear forwards',
			},
			padding: {
				section: '4rem',
			},
			margin: {
				section: '4rem',
			},
		},
	},
	plugins: [],
};
