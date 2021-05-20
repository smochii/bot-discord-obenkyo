import Event from "../types/Event";
import MessageEvent from "./MessageEvent";
import ReadyEvent from "./ReadyEvent";
import VoiceStateUpdateEvent from "./VoiceStateUpdateEvent";

// Define events to use.
const _Events: Event[] = [
  ReadyEvent,
  MessageEvent,
  VoiceStateUpdateEvent
]

export default _Events