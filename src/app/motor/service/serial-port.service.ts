
import { fromWebSerial } from '@rxjs-ninja/rxjs-utility';
import { BinaryProtocolFrame, BinaryProtocolParser, BinaryProtocolSchema } from 'protocol-parser-ts';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';


export class SerialPortService {

  private writer: Subject<Uint8Array> = new Subject<Uint8Array>();
  private parser: BinaryProtocolParser;
  private abortController: AbortController;
  constructor(private schema: BinaryProtocolSchema) {

    this.parser = new BinaryProtocolParser(schema);
  }

  public connect(port: SerialPort, option: SerialOptions): Observable<BinaryProtocolFrame> {
    if (!port) {
      throw new Error('No port');
    }
    this.deployAbortController();
    return fromWebSerial(port, this.writer, option, this.abortController.signal).pipe(
      mergeMap((data) => {
        this.parser.feed(data);
        let frames: BinaryProtocolFrame[] = [];
        do {
          let frame = this.parser.parse();
          if (frame) {
            frames.push(frame);
          }
          else {
            return Observable.of(...frames);
          }
        } while (true);
      })
    );
  }

  private deployAbortController() {
    this.abortController = new AbortController();
  }

  public disconnect() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  public send(frame: BinaryProtocolFrame) {
    if (!this.writer) {
      throw new Error('No writer');
    }
    return this.writer.next(frame.buffer);
  }

}
