// Override TXHRTransport.flush
//
// The 0.9.2 transport flush() method implementation only calls the callback on
// status 200 and never invokes the client callback on HTTP status errors. This
// replaces the implementation with one that always calls the callback,
// including on errors and exceptions.

Thrift.TXHRTransport.prototype.flush = function(async, callback) {
    var self = this;
    if ((async && !callback) || this.url === undefined || this.url === '') {
        return this.send_buf;
    }

    var xreq = this.getXmlHttpRequestObject();

    if (xreq.overrideMimeType) {
        xreq.overrideMimeType('application/json');
    }

    if (callback) {
        //Ignore XHR callbacks until the data arrives, then call the
        //  client's callback
        //========
        // BEGIN CODE PATCH
        //========
        /*
          xreq.onreadystatechange =
          (function() {
            var clientCallback = callback;
            return function() {
              if (this.readyState == 4 && this.status == 200) {
                self.setRecvBuffer(this.responseText);
                clientCallback();
              }
            };
          }());
        */
        //========
        // MODIFIED CODE
        //========
        xreq.onreadystatechange = function() {
            if (this.readyState == 4) {
                //
                // The incoming callback doesn't actually take an error object
                // (another limitation of the thrift code) so there's no way
                // to properly move the status code error back to client callback.
                //
                // To workaround this, short of making signficant patches to the
                // Thrift library, we *rely on the fact that we're using a JSON
                // protocol* and set the buffer to invalid JSON.  The true error
                // gets lost, but at least the client is informed of *a* failure
                // rather than radio silence.
                //
                var err = (this.status == 200) ? false : true;
                self.setRecvBuffer(err ? "http_status_not_200" : this.responseText);
                callback();
            }
        };
        //========
        // END CODE PATCH
        //========
    }

    xreq.open('POST', this.url, !!async);
    xreq.send(this.send_buf);
    if (async && callback) {
        return;
    }

    if (xreq.readyState != 4) {
        throw 'encountered an unknown ajax ready state: ' + xreq.readyState;
    }

    if (xreq.status != 200) {
        throw 'encountered a unknown request status: ' + xreq.status;
    }

    this.recv_buf = xreq.responseText;
    this.recv_buf_sz = this.recv_buf.length;
    this.wpos = this.recv_buf.length;
    this.rpos = 0;
};
