import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import { fetchUsers } from "./store/dashboard";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </>
  );
}

export default App;
