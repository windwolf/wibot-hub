import { map, tap } from 'rxjs/operators';
import { SerialPortService } from './serial-port.service';
import { Injectable } from '@angular/core';
import { BinaryProtocolFrame, BinaryProtocolSchema } from 'protocol-parser-ts';
import { CommandSchema, CommandType, CurrentPidGetRequestCommand, CurrentPidSetRequestCommand, PositionPidGetRequestCommand, PositionPidSetRequestCommand, SpeedPidGetRequestCommand, SpeedPidSetRequestCommand } from './protocol';
import { PidType, PidValue } from './model';
import { BehaviorSubject, Observable, Subject, } from 'rxjs-compat';
import { partition } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MotorCommService {
  public connected: boolean = false;
  public pidCurrentSource: Subject<PidValue>;
  public pidSpeedSource: Subject<PidValue>;
  public pidPositionSource: Subject<PidValue>;
  public monitorSource: Subject<any>;
  private serialPortService: SerialPortService;

  constructor() {
    this.serialPortService = new SerialPortService(CommandSchema);
    this.pidCurrentSource = new Subject<PidValue>();
    this.pidSpeedSource = new Subject<PidValue>();
    this.pidPositionSource = new Subject<PidValue>();
    this.monitorSource = new Subject<any>();

  };

  public async connect(): Promise<void> {
    if (this.connected) { return Promise.resolve(); }
    let port = await navigator.serial.requestPort();
    if (port) {
      this.connected = true;
      let rawSource = this.serialPortService.connect(port, { baudRate: 9600 }).subscribe(
        (next) => {
          switch (next.getCommand().getUint8(0)) {
            case CommandType.MONITOR_RESP: {
              this.monitorSource.next(next);
              break;
            }

            case CommandType.PID_CURRENT_GET_RESP: {
              const ctn = next.getContent();
              this.pidCurrentSource.next({
                p: ctn.getFloat32(0),
                i: ctn.getFloat32(4),
                d: ctn.getFloat32(8)
              });
              break;
            }

            case CommandType.PID_SPEED_GET_RESP: {
              const ctn = next.getContent();
              this.pidSpeedSource.next({
                p: ctn.getFloat32(0),
                i: ctn.getFloat32(4),
                d: ctn.getFloat32(8)
              });
              break;
            }

            case CommandType.PID_POSITION_GET_RESP: {
              const ctn = next.getContent();
              this.pidPositionSource.next({
                p: ctn.getFloat32(0),
                i: ctn.getFloat32(4),
                d: ctn.getFloat32(8)
              });
              break;
            }

          }
        },
        (err) => { this.connected = false; },
        () => { this.connected = false; }
      );
    }
  };


  public disconnect() {
    this.serialPortService.disconnect();
  };

  public setPid(type: PidType, value: PidValue) {
    switch (type) {
      case PidType.current: {
        const cmd = new CurrentPidSetRequestCommand(value.p, value.i, value.d);
        this.serialPortService.send(cmd.getFrame());
        break;
      }
      case PidType.speed: {
        const cmd = new SpeedPidSetRequestCommand(value.p, value.i, value.d);
        this.serialPortService.send(cmd.getFrame());
        break;
      }
      case PidType.position: {
        const cmd = new PositionPidSetRequestCommand(value.p, value.i, value.d);
        this.serialPortService.send(cmd.getFrame());
        break;
      }

    };
  }

  public getPid(type: PidType): Promise<PidValue> {
    switch (type) {
      case PidType.current: {
        let retValue = this.pidCurrentSource.toPromise();
        const cmd = new CurrentPidGetRequestCommand();
        this.serialPortService.send(cmd.getFrame());
        return retValue;
      }
      case PidType.speed: {
        let retValue = this.pidSpeedSource.toPromise();
        const cmd = new SpeedPidGetRequestCommand();
        this.serialPortService.send(cmd.getFrame());
        return retValue;
      }
      case PidType.position: {
        let retValue = this.pidPositionSource.toPromise();
        const cmd = new PositionPidGetRequestCommand();
        this.serialPortService.send(cmd.getFrame());
        return retValue;
      }
    };
  }

}
