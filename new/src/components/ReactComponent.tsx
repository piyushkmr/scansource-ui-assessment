import { pubsub } from "../utils/pubSub";
import { FunctionComponent, MouseEvent, useEffect, useState } from "react";

export const ReactComponent: FunctionComponent = () => {
  const [data, setData] = useState();

  const handleClick1 = (e: MouseEvent<HTMLButtonElement>) => {
    pubsub.publish(e, 'topic1Click');
  };

  useEffect(() => {
    pubsub.subscribe((topicData) => setData(topicData), 'topic1');
  }, []);

  return <div className="component-frame">
    <h3>React Component</h3>
    <button onClick={handleClick1}>React Component</button>
    <div>
      <h4>Button clicked in Moo Tools</h4>
      [{data}]
    </div>
  </div>;
}
