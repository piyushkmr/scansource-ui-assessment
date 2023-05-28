import { usePubSub } from "../utils/pubSub";
import { FunctionComponent } from "react";

export const GlobalListener: FunctionComponent = () => {
  const { data, topic, publish } = usePubSub();
  const handleClick = () => {
    publish(`Global Message from GlobalListener Component [${Date.now()}]`);
  }
  return <div className="component-frame">
    <h3>Global Listener Component</h3>
    <button onClick={handleClick}>Global Publish</button>
    <div>
      <tbody>
        <tr>
          <td>Data</td>
          <td>{data?.toString()}</td>
        </tr>
        <tr>
          <td>Topic</td>
          <td>{topic}</td>
        </tr>
      </tbody>
    </div>
  </div>;
}
