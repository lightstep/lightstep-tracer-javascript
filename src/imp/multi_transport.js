export default class MultiTransport {
    constructor(transports) {
      this._transports = transports;
  }

    ensureConnection(opts) {
      this._transports.forEach((transport) => {
        transport.ensureConnection(opts);
    });
  }

    report(detached, auth, reportRequest, done) {
      this._transports.forEach((transport) => {
        console.log(`reporting for transport ${transport.constructor.name}`);
        transport.report(detached, auth, reportRequest, done);
    });
  }
}
