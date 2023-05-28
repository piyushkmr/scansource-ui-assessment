import { usePubSub } from "../utils/pubSub";
import { FunctionComponent, MouseEvent } from "react";

export const ReactComponent: FunctionComponent = () => {
  const { publish } = usePubSub('topicMooToolsClick');
  const { data } = usePubSub('topicMooTools');
  const { publish: globalPublish } = usePubSub();

  const handleClick1 = () => {
    publish(`Topic1 [${Date.now()}]`, 'topic1');
  };

  const handleClick2 = () => {
    publish(`Topic2 [${Date.now()}]`, 'topic2');
  };

  const handleClickMooTools = (e: MouseEvent<HTMLButtonElement>) => {
    publish(e);
  };

  const handleGlobalClick = () => {
    globalPublish(`Global Message from ReactComponent [${Date.now()}]`);
  };

  return <div className="component-frame">
    <h3>React Component</h3>
    <button onClick={handleClickMooTools}>TopicMooTools</button>
    <button onClick={handleClick1}>TOPIC1</button>
    <button onClick={handleClick2}>TOPIC2</button>
    <button onClick={handleGlobalClick}>GlobalTopic</button>
    <div>
      <h4>Button clicked in Moo Tools (topic1)</h4>
      [{data}]
    </div>
  </div>;
}
