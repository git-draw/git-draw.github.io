export interface Command {
  type: 'input' | 'output';
  command: string;
}
