import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Loading from "./components/Loader/Loading";
import { fetchUsers } from "./store/dashboard";

const AddUser = lazy(() => import("./components/AddUserForm/AddUser"));
const EditUser = lazy(() => import("./components/EditUser/EditUser"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/add" component={AddUser} />
        <Route path="/edit" component={EditUser} />
      </Switch>
    </Suspense>
  );
}

export default App;
