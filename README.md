# Gatsby Theme Tutorial
## Introduction
Followed the tutorial located at https://www.gatsbyjs.com/tutorial/building-a-theme/ to learn how to create custom Gatsby themes and consume in other projects

## Yarn workspaces
Yarn workspaces are good for Gatsby theming because they allow you to keep multiple packages in a single parent directory and link dependencies.

In the root folder, create the main package.json.
- This lists the workspaces we will create.
- Create two directories, gatsby-theme-events and site

To start, created two Yarn workspaces: gatsby-theme-events and site. Both of them get a separate package.json file.
- gatsby-theme-events workspace is for the theme itself
- site is for an example site

These workspaces can be run separately, or as a dependency of the other. In this case, gatsby-theme-events is a dependency of site.

## Initial package installs
Add dependencies in site:
- Run the command `yarn workspace site add gatsby react react-dom gatsby-theme-events@*`
  - this adds gatsby, react, react-dom, and gatsby-theme-events as dependencies in site
  - `yarn workspace <package>` runs yarn commands for a specific workspace without needing to switch directories
  - the code above runs yarn workspace in the /site directory - the dependencies get added to site even though we're not running the CLI command from inside that dir
  - gatsby-theme-events@* - the @* tells the workspace to reference the unpublished gatsby-theme-events theme

Add peer dependencies to gatsby-theme-events:
- Run the command `yarn workspace gatsby-theme-events add -P gatsby react react-dom`

Add development dependencies to gatsby-theme-events:
- Run the command `yarn workspace gatsby-theme-events add -D gatsby react react-dom`
- We do this because we will use the theme as a regular Gatsby site during development

## Add Static Data to Theme
Add data>events.yml to gatsby-theme-events

yarn workspace gatsby-theme-events add gatsby-source-filesystem gatsby-transformer-yaml
- 💡 gatsby-source-filesystem will let you load the events.yml file. gatsby-transformer-yaml will let you parse it as YAML data.

## Add data directory and generate pages
Create a gatsby-config.js file in the gatsby-theme-events directory.

The gatsby-node.js file is what lets us create pages
### General Steps (See gatsby-node_original.js) for more comments:
1. Make sure data directory exists/create if not
2. Define the event type
3. Define resolvers for any custom fields (for ex. 'slug')
4. Query for events and create pages

### createPages, graphql queries
gatsby-node defines the query type, creates resolvers (if necessary), and creates pages 1. conditionally and 2. programatically:
1. Conditionally - depending on their slug by using 'path' property in actions.createPage
2. Programatically - by using forEach over an array of data returned from a gql query to render the same template as many times as needed
The pages created are written to the public directory.

We apply the template by using the template files events.js and event.js. In each of those, we first run a gql query to get page data, then render React components with that data passed through as props.
- **One option is using useStaticQuery(graphql`query...`) to query our data. This is useful for getting ALL data (ie. not filtering by a particular page's ID)**
- **To create a specific page, instead of using useStaticQuery, we use the context variable we specified in the createPage method in gatsby-node.js to filter graphql query**

## Configure Gatsby theme to take options
See the up-to-date gatsby-node and -config files (as opposed to previous _original files) for how to pass options into the gatsby methods used

### To test these options!!
Site directory is the test site - we'll try it out there.
Because gatsby-theme-events is already a dependency, this will be easy.
Create a gatsby-config.js file, with plugins resolving 'gatsby-theme-events', and pass it the options we want
In 'site' directory, copy events.yml from the theme into the /events directory (instead of /data directory as in gatsby-theme-events). This is the new contentPath.

## Make our theme's styles extendable
We do this using the gatsby-plugin-theme-ui package
1. yarn workspace gatsby-theme-events add gatsby-plugin-theme-ui theme-ui @emotion/react @emotion/styled @mdx-js/react
2. Add gatsby-plugin-theme-ui into our theme's gatsby-config.js as a plugin
3. Create a theme.js file in the root of 'src' directory of our theme
theme-ui is part of System UI network of gatsby tools. theme-ui gives us an object that follows System UI theme specification. 
4. Fill in the style options

5. ### Component Shadowing
Component shadowing overrides the default theme
💡 “Component shadowing” is a mechanism to override the default rendering provided by a Gatsby theme. To dig deeper on component shadowing, check out [this blog post](https://www.gatsbyjs.com/blog/2019-04-29-component-shadowing/) on the subject.
1. Create folder in /src called gatsby-plugin-theme-ui
2. Create index.js and shadow theme
3. In Layout and other components, import the new components and use them. Or, import {Styled} from 'theme-ui' to get access to the styled components by writing <Styled.h1>

## Finally, IF you want to access this theme publically, publish theme
1. change the name in the theme's package.json to @ezeyaniv/example-package
1. Make sure you're logged in to npmjs (npm whoami, or npm adduser)
2. cd into the theme's directory (gatsby-theme-events) and 'npm publish'

### To test/consume theme:
1. make a new project directory
1. yarn init -y
1. yarn add react react-dom gatsby @ezeyaniv/gatsby-theme-events2
1. 