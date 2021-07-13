import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import EventList from '../components/EventList';

const EventsTemplate = () => {
	const data = useStaticQuery(graphql`
		query {
			allEvent(sort: { fields: startDate, order: ASC }) {
				nodes {
					id
					name
					startDate
					endDate
					location
					url
					slug
				}
			}
		}
	`);

	const events = data.allEvent.nodes;

	return (
		<Layout>
			<EventList events={events} />
		</Layout>
	);
};

export default EventsTemplate;
