import Command from "../types/Command"
import PingCommand from "./PingCommand"
import RoleCommand from "./RoleCommand"

// Define commands to use.
const _Commands: Command[] = [
  PingCommand,
  RoleCommand
]

export default _Commands