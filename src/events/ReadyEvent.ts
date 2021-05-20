import Event from "../types/Event";

const ReadyEvent: Event = {
  name: 'ready',
  listener: () => {
    console.log("obenkyo bot ready...");
  }
}

export default ReadyEvent