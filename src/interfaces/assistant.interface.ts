// Generated by https://quicktype.io

export interface AssistantResponse {
  role: Role;
  content: string[];
}

export enum Role {
  Assistant = 'assistant',
  User = 'user',
}