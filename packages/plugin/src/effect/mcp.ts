import type { McpApi } from "@opencode/client/effect/api"
import type { Mcp } from "@opencode/schema/mcp"
import type { Tool } from "@opencode/schema/tool"
import type { Effect, Types } from "effect"
import type { CallToolInput, CallToolResult, ReadResourceInput, ReadResourceResult } from "../mcp.js"
import type { Transform } from "./registration.js"

export interface MCPEditor {
  list(): readonly [string, Types.DeepMutable<Mcp.ServerConfig>][]
  get(name: string): Types.DeepMutable<Mcp.ServerConfig> | undefined
  set(name: string, config: Mcp.ServerConfig): void
  update(name: string, update: (config: Types.DeepMutable<Mcp.ServerConfig>) => void): void
  remove(name: string): void
}

export interface MCPDomain extends Pick<McpApi<unknown>, "list"> {
  readonly transform: Transform<MCPEditor>
  readonly reload: () => Effect.Effect<void>
  /**
   * Calls a tool on a connected MCP server over the connection and credentials OpenCode already holds.
   * Asks the session's permission rules first, under the same action as a model call of that tool.
   * Succeeds with the server's result as sent, `_meta` included, also when it reports `isError`. A
   * deny rule, an unknown or disconnected server, or a failed request fails with a `Tool.Error`; a
   * plain rejection ends the current step.
   */
  readonly callTool: (input: CallToolInput) => Effect.Effect<CallToolResult, Tool.Error>
  /**
   * Reads a resource from a connected MCP server over the connection OpenCode already holds, such as
   * a `ui://` resource. Asks the session's permission rules first, under the `read_mcp_resource`
   * tool's action. Succeeds with the server's result as sent, `_meta` included.
   */
  readonly readResource: (input: ReadResourceInput) => Effect.Effect<ReadResourceResult, Tool.Error>
}
