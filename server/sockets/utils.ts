export function generateRoomCode(length: number): string {
  console.log('room code generation requested');
  let res = "";

  for(let i = 0; i < length; i++) {
    res += Math.floor(Math.random() * 8).toString();
  }

  console.log('room created with code: ' + res);
  return res;
}
