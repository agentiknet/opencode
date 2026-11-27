import { Agent } from "@opencode/schema/agent"
import { Permission } from "@opencode/schema/permission"
import { Schema } from "effect"

export const CallToolInput = Schema.Struct({
  sessionID: Permission.Request.fields.sessionID,
  agent: Agent.ID.pipe(Schema.optional),
  server: Schema.String,
  name: Schema.String,
  args: Schema.Record(Schema.String, Schema.Unknown).pipe(Schema.optional),
})
export interface CallToolInput extends Schema.Schema.Type<typeof CallToolInput> {}

export const ReadResourceInput = Schema.Struct({
  sessionID: Permission.Request.fields.sessionID,
  agent: Agent.ID.pipe(Schema.optional),
  server: Schema.String,
  uri: Schema.String,
})
export interface ReadResourceInput extends Schema.Schema.Type<typeof ReadResourceInput> {}

/** An MCP `tools/call` result as the server sent it. */
export interface CallToolResult {
  readonly content: ReadonlyArray<{ readonly type: string; readonly _meta?: Record<string, unknown> }>
  readonly structuredContent?: unknown
  readonly isError?: boolean
  readonly _meta?: Record<string, unknown>
}

/** An MCP `resources/read` result as the server sent it. */
export interface ReadResourceResult {
  readonly contents: ReadonlyArray<{
    readonly uri: string
    readonly mimeType?: string
    readonly text?: string
    readonly blob?: string
    readonly _meta?: Record<string, unknown>
  }>
  readonly _meta?: Record<string, unknown>
}
