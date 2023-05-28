import { pubsub, usePubSub } from "../utils/pubSub";
import { FunctionComponent, MouseEvent, useEffect, useState } from "react";

export const ReactComponent: FunctionComponent = () => {
  const { publish } = usePubSub('topic1Click');
  const { data } = usePubSub('topic1');

  const handleClick1 = (e: MouseEvent<HTMLButtonElement>) => {
    publish(e);
  };

  return <div className="component-frame">
    <h3>React Component</h3>
    <button onClick={handleClick1}>React Component</button>
    <div>
      <h4>Button clicked in Moo Tools</h4>
      [{data}]
    </div>
  </div>;
}
