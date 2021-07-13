import React from 'react';
import { Link } from 'gatsby';
import { Themed } from 'theme-ui';

const EventList = ({ events }) => {
	return (
		<>
			<Themed.h1>upcoming events</Themed.h1>
			<Themed.ul>
				{events.map((event) => (
					<Themed.li key={event.id}>
						<Link to={event.slug}>{event.name}</Link>
						<br />
						{new Date(event.startDate).toLocaleDateString('en-US', {
							month: 'long',
							day: 'numeric',
							year: 'numeric',
						})}{' '}
						in {event.location}
					</Themed.li>
				))}
			</Themed.ul>
		</>
	);
};

export default EventList;
