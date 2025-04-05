export interface ClassesRequests {
  grade: string;
  stream:string;

}
export interface ClassesResponse {
  streamID: string,
  stream: string,
  className: string,
  grade: string,
  deleted: Boolean
}
