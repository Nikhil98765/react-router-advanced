import { Outlet } from "react-router-dom";

import EventsNavigation from "./EventsNavigation";

export const EventsRootLayout = () => {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  )
}