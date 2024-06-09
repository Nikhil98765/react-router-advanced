import { useRouteLoaderData } from 'react-router-dom';
import EventForm from './EventForm';

export const EditEventPage = () => {

  const data = useRouteLoaderData("eventId");
  console.log("🚀 ~ EditEventPage ~ data:", data)
  

  return (
    <EventForm event={data.event}/>
  );
}