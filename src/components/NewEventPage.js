import { json, redirect } from "react-router-dom";
import EventForm from "./EventForm"

export const NewEventPage = () => {
  return (
    <EventForm event={{}}/>
  )
}

// * Action functions are executed in browser but not in server side.
// * Form element(from react-router) triggers the action if submit has happened in form when method is not get.
export async function action({ request, params }) {

  const data = await request.formData();
  
  const formData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (response.status === 422) {
    return response;
  }

  if(!response.ok) {
    throw json({ message: "Couldn't save the event." }, { status: 500 });
  }

  return redirect('/events');

}