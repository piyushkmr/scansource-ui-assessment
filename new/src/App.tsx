import { FunctionComponent } from "react";
import { ReactComponent } from "./components/ReactComponent";
import "./app.scss";
import { GlobalListener } from "./components/GlobalListener";

export const App: FunctionComponent = () => {
  return <div>
    <ReactComponent />
    <GlobalListener />
  </div>;
}
