export type State = "WAITING" | "RECORDING" | "PLAYING";

export interface EventProps {
  [key: string]: string;
}

export interface InstanceMethod {
  methodName: string;
  args: any[];
}

export interface KeyRecordingEntry {
  key: string | InstanceMethod;
  event: Event;
}

export interface Stroke {
    data: string | InstanceMethod, 
    timeStamp: number   
}
