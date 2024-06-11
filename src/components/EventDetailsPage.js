import {Await, defer, json, redirect, useRouteLoaderData} from "react-router-dom";

import EventItem from './EventItem';
import EventsList from './EventsList';
import {Suspense} from "react";

export const EventDetailPage = () => {

  const {events, event} = useRouteLoaderData("eventId");

  return (
    <>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent => <EventItem event={loadedEvent}/>)}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents}/>}
        </Await>
      </Suspense>
    </>
    // <>
    //   <EventItem event={data.event} />
    //   <EventsList />
    // </>
  );
}

async function loadEventItem(id) {

  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "couldn't fetch details for selected event." },
      {
        status: 500,
      }
    );
  }
  const resData = await response.json();
  return resData.event;
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Error({message: "couldn't fetch the events"});
    // throw new Response(JSON.stringify({ message: "couldn't fetch the events"}), { status: 500});
    // * Use json utility method in order to create a response object with built in headers set and react router will resolve the stringify data for us while accessing the error in error element.
    throw json({ message: "couldn't fetch the events" }, { status: 500 });
  }
  const resData = await response.json();
  return resData.events;
}

export async function loader({request, params}) {
    const eventId = params.eventId;
    return defer({
      event: await loadEventItem(eventId),
      events: loadEvents()
    })
}

export async function deleteAction({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "couldn't delete the event." },
      {
        status: 500,
      }
    );
  }
  return redirect('/events');
}
