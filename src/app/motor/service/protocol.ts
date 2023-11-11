import { BinaryProtocolSchema, BinaryProtocolFrame } from 'protocol-parser-ts';


const FRAME_HEAD = [0x55, 0x50];

export enum CommandType {
    MODE_STOP_REQ = 0x00,
    MODE_CALIBRATE_REQ = 0x01,
    MODE_OPEN_LOOP_REQ = 0x02, // 8, udq_ref
    MODE_CURRENT_CLOSE_LOOP_REQ = 0x03, // 8, idq_ref
    MODE_SPEED_CLOSE_LOOP_REQ = 0x04, // 4, spdm_ref
    MODE_POSITION_CLOSE_LOOP_REQ = 0x05, // 4, posm_ref

    PID_CURRENT_SET_REQ = 0x11, // 12, pid
    PID_CURRENT_GET_REQ = 0x13,
    PID_CURRENT_GET_RESP = 0x14, // 12, pid
    PID_SPEED_SET_REQ = 0x15, // 12, pid
    PID_SPEED_GET_REQ = 0x17,
    PID_SPEED_GET_RESP = 0x18, // 12, pid
    PID_POSITION_SET_REQ = 0x19, // 12, pid
    PID_POSITION_GET_REQ = 0x1B,
    PID_POSITION_GET_RESP = 0x1C, // 12, pid

    MONITOR_RESP = 0x30,
    MONITOR_STATE_START_REQ = 0x31,  // ubus, ibus, spdm, posm,
    MONITOR_STATE_STOP_REQ = 0x32,

    MONITOR_ABC_START_REQ = 0x33,  // iabc, uabc(dabc_ref)
    MONITOR_ABC_STOP_REQ = 0x34,

    MONITOR_DQ_START_REQ = 0x35,  // idq, idq_ref
    MONITOR_DQ_STOP_REQ = 0x36,

    MONITOR_SPD_START_REQ = 0x37,  // spde, spdm, spde_ref, spdm_ref
    MONITOR_SPD_STOP_REQ = 0x38,

    MONITOR_POS_START_REQ = 0x39,  // pose, spdm, pose_ref, spdm_ref
    MONITOR_POS_STOP_REQ = 0x3A,


}

export const CommandSchema: BinaryProtocolSchema = {
    prefix: new Uint8Array(FRAME_HEAD),
    commandSize: 1,
    lengthSchemas: [
        {
            command: new Uint8Array([CommandType.MODE_OPEN_LOOP_REQ]),
            length: {
                mode: 'fixed',
                length: 8,
            }
        },
        {
            command: new Uint8Array([CommandType.MODE_CURRENT_CLOSE_LOOP_REQ]),
            length: {
                mode: 'fixed',
                length: 8,
            }
        },
        {
            command: new Uint8Array([CommandType.MODE_SPEED_CLOSE_LOOP_REQ]),
            length: {
                mode: 'fixed',
                length: 4,
            }
        },
        {
            command: new Uint8Array([CommandType.MODE_POSITION_CLOSE_LOOP_REQ]),
            length: {
                mode: 'fixed',
                length: 4,
            }
        },
        {
            command: new Uint8Array([CommandType.PID_CURRENT_SET_REQ]),
            length: {
                mode: 'fixed',
                length: 12,
            }
        },
        {
            command: new Uint8Array([CommandType.PID_CURRENT_GET_RESP]),
            length: {
                mode: 'fixed',
                length: 12,
            }
        },
        {
            command: new Uint8Array([CommandType.PID_SPEED_SET_REQ]),
            length: {
                mode: 'fixed',
                length: 12,
            }
        },
        {
            command: new Uint8Array([CommandType.PID_SPEED_GET_RESP]),
            length: {
                mode: 'fixed',
                length: 12,
            }
        },
        {
            command: new Uint8Array([CommandType.PID_POSITION_SET_REQ]),
            length: {
                mode: 'fixed',
                length: 12,
            }
        },
        {
            command: new Uint8Array([CommandType.PID_POSITION_GET_RESP]),
            length: {
                mode: 'fixed',
                length: 12,
            }
        },
        {
            command: new Uint8Array([CommandType.MONITOR_RESP]),
            length: {
                mode: 'dynamic',
                lengthSize: 1,
            }
        },
    ],
    defaultLength: { mode: 'fixed', length: 0 },
    alterDataSize: 0,
    crcSize: 1,
    suffix: undefined,
}

export class RequestCommand {
    protected frame: BinaryProtocolFrame;
    constructor(protected command: CommandType, protected contentLength: number) {
        this.frame = BinaryProtocolFrame.create(CommandSchema, new Uint8Array([this.command]), this.contentLength);
    }
    public getFrame(): BinaryProtocolFrame {

        return this.frame;
    }
}

export class SimpleRequestCommandBase extends RequestCommand {
    public constructor(command: CommandType) {
        super(command, 0);
    }
}

export class ModeStopRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MODE_STOP_REQ);
    }
}

export class ModeCalibrateRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MODE_CALIBRATE_REQ);
    }
}

export class ModeOpenLoopRequestCommand extends RequestCommand {
    public constructor(dutyD: number, dutyQ: number) {
        super(CommandType.MODE_OPEN_LOOP_REQ, 8);
        let ctn = this.frame.getContent()!;
        ctn.setFloat32(0, dutyD, false);
        ctn.setFloat32(4, dutyQ, false);
    }
}

export class ModeCurrentCloseLoopRequestCommand extends RequestCommand {
    public constructor(iD: number, iQ: number) {
        super(CommandType.MODE_CURRENT_CLOSE_LOOP_REQ, 8);
        let ctn = this.frame.getContent()!;
        ctn.setFloat32(0, iD, false);
        ctn.setFloat32(4, iQ, false);
    }
}

export class ModeSpeedCloseLoopRequestCommand extends RequestCommand {
    public constructor(speed: number) {
        super(CommandType.MODE_SPEED_CLOSE_LOOP_REQ, 4);
        let ctn = this.frame.getContent()!;
        ctn.setFloat32(0, speed, false);
    }
}

export class ModePositionCloseLoopRequestCommand extends RequestCommand {
    public constructor(position: number) {
        super(CommandType.MODE_POSITION_CLOSE_LOOP_REQ, 4);
        let ctn = this.frame.getContent()!;
        ctn.setFloat32(0, position, false);
    }
}

export class PidSetRequestCommandBase extends RequestCommand {
    public constructor(command: CommandType, kp: number, ki: number, kd: number) {
        super(command, 12);
        let ctn = this.frame.getContent()!;
        ctn.setFloat32(0, kp, true);
        ctn.setFloat32(4, ki, true);
        ctn.setFloat32(8, kd, true);
    }
}

export class CurrentPidSetRequestCommand extends PidSetRequestCommandBase {
    public constructor(kp: number, ki: number, kd: number) {
        super(CommandType.PID_CURRENT_SET_REQ, kp, ki, kd);
    }
}

export class SpeedPidSetRequestCommand extends PidSetRequestCommandBase {
    public constructor(kp: number, ki: number, kd: number) {
        super(CommandType.PID_SPEED_SET_REQ, kp, ki, kd);
    }
}

export class PositionPidSetRequestCommand extends PidSetRequestCommandBase {
    public constructor(kp: number, ki: number, kd: number) {
        super(CommandType.PID_POSITION_SET_REQ, kp, ki, kd);
    }
}

export class CurrentPidGetRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.PID_CURRENT_GET_REQ);
    }
}

export class SpeedPidGetRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.PID_SPEED_GET_REQ);
    }
}

export class PositionPidGetRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.PID_POSITION_GET_REQ);
    }
}

export class MonitorStateStartRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_STATE_START_REQ);
    }
}

export class MonitorStateStopRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_STATE_STOP_REQ);
    }
}

export class MonitorAbcStartRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_ABC_START_REQ);
    }
}

export class MonitorAbcStopRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_ABC_STOP_REQ);
    }
}


export class MonitorDqStartRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_DQ_START_REQ);
    }
}

export class MonitorDqStopRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_DQ_STOP_REQ);
    }
}


export class MonitorSpeedStartRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_SPD_START_REQ);
    }
}

export class MonitorSpeedStopRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_SPD_STOP_REQ);
    }
}


export class MonitorPositionStartRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_POS_START_REQ);
    }
}

export class MonitorPositionStopRequestCommand extends SimpleRequestCommandBase {
    public constructor() {
        super(CommandType.MONITOR_POS_STOP_REQ);
    }
}




