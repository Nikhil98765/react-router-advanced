import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

import classes from './EventForm.module.css';

function EventForm({ method, event }) {

  const navigation = useNavigation();
  const navigate = useNavigate();
  
  //* Used to get the returned data from closest action function.
  const actionData = useActionData(); 

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {
        actionData && actionData.errors && 
        <ul>
            {Object.values(actionData.errors).map(error => {
              return <li key={error}>{ error}</li>
            })}
        </ul>
      }
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event.title ?? ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event.image ?? ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event.date ?? ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event.description ?? ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// * Action functions are executed in browser but not in server side.
// * Form element(from react-router) triggers the action if submit has happened in form when method is not get.
export async function action({ request, params }) {

  const method = request.method;
  const eventId = params.eventId;
  console.log("🚀 ~ action ~ method:", method)
  const data = await request.formData();
  
  const formData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }

  let url = "http://localhost:8080/events";
  if (method === 'PATCH') {
    url = url + '/' + eventId;
  }

  const response = await fetch(url, {
    method: method,
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
