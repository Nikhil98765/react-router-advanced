import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "./MainNavigation";

export const RootLayout = () => {

  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
      <Outlet />
    </>
  )
}