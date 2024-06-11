import {Form, useFetcher} from "react-router-dom";

import classes from './NewsletterSignup.module.css';
import {useEffect} from "react";

function NewsletterSignup() {

  // useFetcher.Form will be used when we want to execute an action/loader of a route without navigating.
  const fetcher = useFetcher();
  const {data, state} = fetcher;

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      alert(data.message);
    }
  }, [data, state]);


  return (
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        name="email"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
