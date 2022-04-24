interface AgentDetails {
  name: string,
  status: string,
  notes: string
}

interface SerialisedOutput {
  Monday: Array<AgentDetails>,
  Tuesday: Array<AgentDetails>,
  Wednesday: Array<AgentDetails>,
  Thursday: Array<AgentDetails>,
  Friday: Array<AgentDetails>,
  Saturday: Array<AgentDetails>,
  Sunday: Array<AgentDetails>,
  Adhoc: Array<AgentDetails>,
}

export {
  SerialisedOutput,
  AgentDetails
}
