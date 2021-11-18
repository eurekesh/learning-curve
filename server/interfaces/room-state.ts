export interface IRoomState {
  roomId: string;
  hostId: string;
  guestIds: Map<string, number>; // client id and their score
  activeQuestion: string;
}
