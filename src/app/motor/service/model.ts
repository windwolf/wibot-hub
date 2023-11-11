
export enum PidType {
    current = "current",
    speed = "speed",
    position = "position",
}

export interface PidValue {
    p: number;
    i: number;
    d: number;
};

export interface State {
    tick: number;

}
