import { json, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom";

import EventItem from './EventItem';

export const EventDetailPage = () => {

  const data = useRouteLoaderData("eventId");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({request, params}) {
  console.log("🚀 ~ loader ~ params:", params)
  console.log("🚀 ~ loader ~ request:", request)

  const eventId = params.eventId;

  const response = await fetch(`http://localhost:8080/events/${eventId}`);

  if (!response.ok) {
    throw json({ message: "couldn't fetch details for selected event." }, {
      status: 500
    })
  }
  return response;
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