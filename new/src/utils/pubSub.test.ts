import { pubsub } from "./pubSub";
import { wait } from "./testing";

describe('PubSub', () => {
  it('should get called on same topic', async () => {
    const callback = jest.fn();
    pubsub.subscribe(callback, 'topic');
    pubsub.publish('test-data', 'topic');
    await wait(() => {
      expect(callback).toHaveBeenCalledWith('test-data', 'topic');
    });
  });

  it('should not get called on other topic', async () => {
    const callback = jest.fn();
    pubsub.subscribe(callback, 'topic');
    pubsub.publish('test-data', 'topic1');
    await wait(() => {
      expect(callback).not.toHaveBeenCalled();
    });
  });

  it('should get called on global topic', async () => {
    const callback = jest.fn();
    pubsub.subscribe(callback);
    pubsub.publish('test-data', 'topic1');
    pubsub.publish('test-data', 'topic2');
    pubsub.publish('test-data');
    await wait(() => {
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  it('should should not call after unsubscribe', async () => {
    const callback = jest.fn();
    const subscriptionId = pubsub.subscribe(callback, 'topic');
    pubsub.publish('test-data', 'topic');
    await wait(() => {
      expect(callback).toHaveBeenCalled();
      callback.mockReset();
    });
    pubsub.unsubscribe(subscriptionId);
    pubsub.publish('test-data', 'topic');
    await wait(() => {
      expect(callback).not.toHaveBeenCalled();
    })
  });
})
