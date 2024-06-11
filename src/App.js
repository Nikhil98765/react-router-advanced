import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { HomePage } from './components/HomePage';
import EventsPage, { loader as EventsPageLoader } from "./components/EventsPage";
import {
  EventDetailPage,
  loader as EventDetailLoader,
  deleteAction,
} from "./components/EventDetailsPage";
import { NewEventPage } from './components/NewEventPage';
import { EditEventPage } from './components/EditEventPage';
import { RootLayout } from './components/RootLayout';
import { EventsRootLayout } from './components/EventsRootLayout';
import { Error } from './components/Error';
import { action as manipulateFormDataAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './components/Newsletter';

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            path: "",
            element: <EventsPage />,
            loader: EventsPageLoader,
          },
          {
            path: ":eventId",
            loader: EventDetailLoader,
            id: "eventId",
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateFormDataAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateFormDataAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
