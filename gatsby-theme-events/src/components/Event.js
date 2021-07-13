import React from 'react';

const Event = ({ name, location, startDate, endDate, url }) => {
	return (
		<div>
			<h1>
				{name} ({location})
			</h1>
			<p>
				{startDate} - {endDate}
			</p>
			<p>
				Website: <a href={url}>{url}</a>
			</p>
		</div>
	);
};

export default Event;
