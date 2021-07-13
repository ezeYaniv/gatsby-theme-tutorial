import React from 'react';
import { Heading, Container } from 'theme-ui'; 
// This brings in all the components we styled in theme.js 
// note: they are just wrapper-type styling components, Header still needs h1 within it

const Layout = ({ children }) => {
	return (
		<div>
			<Heading>
				Gatsby Events Theme
			</Heading>
			{/* <Main> */}
				<Container>{children}</Container>
			{/* </Main> */}
		</div>
	);
};

export default Layout;
