/* global TRANSPORT_PROTO */

import _each from '../_each'; // eslint-disable-line camelcase
import * as coerce from './coerce.js';

let croutonThrift = null;
let proto = null;
if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
    proto = require('./generated_proto/collector_pb.js'); // eslint-disable-line global-require
}
if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
    croutonThrift = require('../platform_abstraction_layer').crouton_thrift; // eslint-disable-line global-require
}

export default class ReportImp {
    constructor(runtime, oldestMicros, youngestMicros, spanRecords, internalLogs, counters, timestampOffsetMicros) {
        this._runtime = runtime;
        this._oldestMicros = oldestMicros;
        this._youngestMicros = youngestMicros;
        this._spanRecords = spanRecords;
        this._internalLogs = internalLogs;
        this._counters = counters;
        this._timestampOffsetMicros = timestampOffsetMicros;
    }

    getSpanRecords() {
        return this._spanRecords;
    }

    getInternalLogs() {
        return this._internalLogs;
    }

    getCounters() {
        return this._counters;
    }

    toThrift() {
        if ((typeof TRANSPORT_PROTO === 'undefined') || !TRANSPORT_PROTO) {
            _each(this._spanRecords, (span) => {
                span.runtime_guid = this._runtimeGUID;
            });

            let thriftCounters = [];
            _each(this._counters, (value, key) => {
                if (value === 0) {
                    return;
                }
                thriftCounters.push(new croutonThrift.MetricsSample({
                    name         : coerce.toString(key),
                    double_value : coerce.toNumber(value),
                }));
            });

            let thriftSpanRecords = [];
            _each(this._spanRecords, (spanRecord) => {
                thriftSpanRecords.push(spanRecord._toThrift());
            });

            return new croutonThrift.ReportRequest({
                runtime          : this._runtime.toThrift(),
                oldest_micros    : this._oldestMicros,
                youngest_micros  : this._youngestMicros,
                span_records     : thriftSpanRecords,
                internal_logs    : this._internalLogs,
                internal_metrics : new croutonThrift.Metrics({
                    counts : thriftCounters,
                }),
                timestamp_offset_micros : this._timestampOffsetMicros,
            });
        }
    }

    toProto(auth) {
        if ((typeof TRANSPORT_PROTO === 'undefined') || TRANSPORT_PROTO) {
            let spansList = [];
            _each(this._spanRecords, (spanRecord) => {
                spansList.push(spanRecord._toProto());
            });

            let countsList = [];
            _each(this._counters, (count) => {
                let metricSample = new proto.MetricsSample();
                metricSample.setName(count.name);
                metricSample.setIntValue(count.int64_value);
                metricSample.setDoubleValue(count.double_value);
                countsList.push(metricSample);
            });

            let internalMetrics = new proto.InternalMetrics();
            internalMetrics.setCountsList(countsList);

            let reportProto = new proto.ReportRequest();
            reportProto.setAuth(auth.toProto());
            reportProto.setReporter(this._runtime.toProto());
            reportProto.setSpansList(spansList);
            reportProto.setTimestampOffsetMicros(this._timestampOffsetMicros);
            reportProto.setInternalMetrics(internalMetrics);
            return reportProto;
        }
    }
}
