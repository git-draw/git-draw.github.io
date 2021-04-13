export type CommandTypes = 'error'|'warning'|'success'|'info';
export type CommandFlow = 'input'|'output';

export interface Command {
  flow: CommandFlow;
  type?: CommandTypes;
  command: string;
}
