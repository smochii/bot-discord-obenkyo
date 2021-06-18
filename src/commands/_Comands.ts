import Command from "../types/Command"
import CreateRoleCommand from "./CreateRoleCommand"
import DebugCommand from "./DebugCommand"
import PingCommand from "./PingCommand"
import GrantRoleCommand from "./GrantRoleCommand"

// Define commands to use.
const _Commands: Command[] = [
  PingCommand,
  GrantRoleCommand,
  CreateRoleCommand,
  DebugCommand
]

export default _Commands