import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Event from '../components/Event';

// the following query is using the eventID we passed in context to query a particular event by ID
export const query = graphql`
  query ($eventID: String!) {
    event(id: {eq: $eventID}) {
      name
      location
      startDate(formatString: "MMMM D, YYYY")
      endDate(formatString: "MMMM D, YYYY")
      url
      slug
    }
  }
`

const EventTemplate = ({ data: { event } }) => { // anything that goes through a page query gets passed in here as data
  
  return (
    <Layout>
    {/* Note: using the spread operator here means each piece of data (name, location, endDate, etc.) gets passed in to <Event /> as a prop */}
      <Event {...event} />
    </Layout>
  )
}

export default EventTemplate;