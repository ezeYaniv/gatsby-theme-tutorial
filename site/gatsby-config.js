// Here, we changed our contentPath and basePath. 
// gatsby-theme-events was made to accept these options
// which means that in 'site', the 'events' directory is the one that holds data, instead of 'data' in gatsby-theme-events 
// Also, the basePath defaults to localhost:8000/events instead of localhost:8000

module.exports = {
	plugins: [
		{
			resolve: 'gatsby-theme-events',
			options: {
				contentPath: 'events',
				basePath: '/events',
			},
		},
	],
};
