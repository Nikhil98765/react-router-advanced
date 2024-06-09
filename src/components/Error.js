import { useRouteError } from "react-router-dom";

import PageContent from "./PageContent"
import MainNavigation from "./MainNavigation";

export const Error = () => {

  const error = useRouteError();
  console.log("🚀 ~ Error ~ error:", error);

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not Found!';
    message = 'Could not find resource or page';
  }

  

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}