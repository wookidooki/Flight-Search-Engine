import React from 'react'
import { Switch, Route } from 'react-router-dom';

/// components
import FlightSearch from './pages/Filght-Search';
import UserDetail from './pages/User-Detail';

// This is URL and rendered components
const appRoutes = [
  { url: "", component: FlightSearch},
  { url: "user-detail", component: UserDetail}
];

// This code is for routing where on particular route particular component will be rendered
const Router = () => {
  return (
    <div>
      <Switch>
        {appRoutes.map((data, i) => (
          <Route
            key={i}
            exact
            path={`/${data.url}`}
            component={data.component}
          />
        ))}
      </Switch>
    </div>
  )
};

export default Router;