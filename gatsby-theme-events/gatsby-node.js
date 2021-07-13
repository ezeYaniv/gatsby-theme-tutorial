// NOTE: this builds on the _original gatsby-node by allowing options to be passed into the theme.
// See .onPreBootstrap and createResolvers and createPath
// Note: we still use 'or' operator || to specify default options in case we don't pass in a custom contentPath or basePath

const fs = require('fs');

// 1. Make sure data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
	const contentPath = options.contentPath || 'data'; //NOTE: 'data' is the data directory we created w/ events.yml

	if (!fs.existsSync(contentPath)) {
		reporter.info(`creating the ${contentPath} directory`);
		fs.mkdirSync(contentPath);
	}
};

// 2. Define the 'Event' type
exports.sourceNodes = ({ actions }) => {
	//sourceNodes is an API hook
	actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `);
};
// createTypes is built-in Gatsby
// Event implements Node @dontInfer - dontInfer means Gatsby shouldn't infer any fields, we are explicitly defining them here
// dates: we are using @proxy bc we want camel case here, but in the yml data file it's start_date
// slug: note, this is a custom field that doesn't exist in our data object. See #3 for how to define it

// 3. Define resolvers for any custom fields (for ex. 'slug')
exports.createResolvers = ({ createResolvers }, options) => {
	const basePath = options.basePath || '/';

	const slugify = (str) => {
		//this function converts whatever string is passed in to a slug
		const slug = str
			.toLowerCase() //we want a lowercase slug
			.replace(/[^a-z0-9]+/g, '-') //all non-letter or number chars get turned into a hyphen
			.replace(/(^-|-$)+/g, ''); //removes any quantity of leading or trailing hyphens (if string started with quotes)

		return `/${basePath}/${slug}`.replace(/\/\/+/g, '/'); //this makes sure we aren't accidentally adding double slashes
	};

	createResolvers({
		// We use the built in Gatsby createResolvers function to define the resolver that will define slug
		Event: {
			slug: {
				resolve: (source) => slugify(source.name), //source is the events.yml data
			},
		},
	});
};
// 4. Query for events and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
	// // this is async bc we're running a graphql query, using Gatsby built-in createPage method
	const basePath = options.basePath || '/';
	actions.createPage({
		//this defines the structure of this method***
		path: basePath,
		component: require.resolve('./src/templates/events.js'), //*see LAST STEP comment below
	});

	// the below 'await' gql query makes a query to the gql type Event that we defined above, and returns id and slug sorted by startdate
	const result = await graphql(`
		query {
			allEvent(sort: { fields: startDate, order: ASC }) {
				nodes {
					id
					slug
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panic('error loading events', reporter.errors);
		return;
	}

	const events = result.data.allEvent.nodes;

	events.forEach((event) => {
		//for each node (event) create a page for it
		const slug = event.slug; //pull out the slug object

		actions.createPage({
			path: slug,
			component: require.resolve('./src/templates/event.js'), //*see LAST STEP comment below
			context: {
				eventID: event.id, //this lets you identify which event is which
			},
		});
	});
	// LAST STEP BEFORE RUNNING GATSBY DEVELOP!!! Create src/templates/event.js and events.js so that the '/' path and all '/slug' paths render a component
};
