export function createChannel<T = any>(name: string) {
  const channel = new BroadcastChannel(name);
  return channel as BroadcastChannel & { post: (data: T) => void };
}