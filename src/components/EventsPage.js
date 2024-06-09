import { json, useLoaderData } from "react-router-dom";

import EventsList from "./EventsList";

function EventsPage() {
  //* We can access data on the component where we attached the loader in routeDef and as well in any component which was used in the assigned component.
  const events = useLoaderData();
  console.log("🚀 ~ EventsPage ~ events:", events);

  if (events.isError) {
    return <p>{events.message}</p>
  }

  return (
    <>
       <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// * We can return response objects as well in loader function. It will resolve the response object and return us the data through useLoaderData hook
// * Runs in client side. we can use any browser API's but not react hooks (since these will work only in react functional components).
export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Error({message: "couldn't fetch the events"});
  // throw new Response(JSON.stringify({ message: "couldn't fetch the events"}), { status: 500});
  // * Use json utility method in order to create a response object with built in headers set and react router will resolve the stringify data for us while accessing the error in error element. 
    throw json({ message: "couldn't fetch the events" }, {status: 500});
  }
  const resData = await response.json();
  console.log("🚀 ~ loader: ~ resData:", resData);
  return resData.events;
}
