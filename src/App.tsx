import * as React from "react";
import "./App.css";
import { Employee, getData } from "./data.utils";

function App() {
  const [users, setUsers] = React.useState<Employee[]>([])

  React.useEffect(() => {
    getData().then((data) => {
      setUsers(data)
    });
  }, []);

  return users.length === 0 ? <div>loading</div> : <div className="App" data-testid="main-app"><div>{users[0].name}</div></div>;
}

export default App;
