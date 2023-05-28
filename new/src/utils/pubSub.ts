import { useEffect, useRef, useState } from "react";

type TopicSubscriberCallbackk = (data: any, topic: string) => void;

interface TopicSubscriber{
  uid: string;
  callback: TopicSubscriberCallbackk;
}

const getUid = () => {
  const random = Math.random().toString(16).substring(2, 9);
  const timestamp = Date.now().toString(16);
  return `_${random}_${timestamp}`;
}

const ALL_TOPIC = '_ALL';
class PubSub {
  topics: Record<string, TopicSubscriber[]> = {};

  subscribe(callback: TopicSubscriberCallbackk, topic: string = ALL_TOPIC) {
    this.topics[topic] = this.topics[topic] || [];
    const uid = getUid();
    this.topics[topic].push({ uid, callback });
    return uid;
  }

  unsubscribe(uid: string) {
    for (const topicName in this.topics) {
      const topic = this.topics[topicName];
      const index = topic.findIndex((subscriber) => subscriber.uid === uid);
      if (index !== -1) {
        topic.splice(index, 1);
        return uid;
      }
    }
    return false;
  }

  publish(data: any, topic: string = ALL_TOPIC) {
    if (!this.topics[topic]) {
      return false;
    }
    let subscribers = this.topics[topic];
    if (topic !== ALL_TOPIC) {
      subscribers = subscribers.concat(this.topics[ALL_TOPIC] || []);
    }
    subscribers.forEach((subscriber) => {
      setTimeout(() => {
        try {
          subscriber.callback(data, topic);
        } catch (e) {
          console.error(e);
        }
      }, 0);
    });
  }
}

export const usePubSub = (subscribeTopic: string = ALL_TOPIC) => {
  const [data, setData] = useState<any>();
  const [topic, setTopic] = useState<any>();
  const uid = useRef<string | null>(null);

  useEffect(() => {
    uid.current = pubsub.subscribe((pubsubData, topic) => {
      setData(pubsubData);
      setTopic(topic);
    }, subscribeTopic);

    return () => {
      if (uid.current) {
        pubsub.unsubscribe(uid.current);
      }
    }
  }, []);

  const publish = (data: any, topic: string = subscribeTopic) => {
    pubsub.publish(data, topic);
  }

  const unsubscribe = () => {
    pubsub.unsubscribe(uid.current || '');
  }

  return {
    data,
    topic,
    publish,
    unsubscribe,
  }
};

export const pubsub = new PubSub();
(window as any).pubsub = pubsub;
