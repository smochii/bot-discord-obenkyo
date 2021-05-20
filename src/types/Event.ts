type Event = {
  name: string;
  listener: (...args: any) => any;
}

export default Event