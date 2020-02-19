import { crouton_thrift } from '../platform_abstraction_layer'; // eslint-disable-line camelcase
import _each from '../_each'; // eslint-disable-line camelcase
import * as coerce from './coerce';

let proto = require('./generated_proto/collector_pb');

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
        _each(this._spanRecords, (span) => {
            span.runtime_guid = this._runtimeGUID;
        });

        let thriftCounters = [];
        _each(this._counters, (value, key) => {
            if (value === 0) {
                return;
            }
            thriftCounters.push(new crouton_thrift.MetricsSample({
                name         : coerce.toString(key),
                double_value : coerce.toNumber(value),
            }));
        });

        let thriftSpanRecords = [];
        _each(this._spanRecords, (spanRecord) => {
            thriftSpanRecords.push(spanRecord._toThrift());
        });

        return new crouton_thrift.ReportRequest({
            runtime          : this._runtime.toThrift(),
            oldest_micros    : this._oldestMicros,
            youngest_micros  : this._youngestMicros,
            span_records     : thriftSpanRecords,
            internal_logs    : this._internalLogs,
            internal_metrics : new crouton_thrift.Metrics({
                counts : thriftCounters,
            }),
            timestamp_offset_micros : this._timestampOffsetMicros,
        });
    }

    toProto(auth) {
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
        reportProto.setTimestampOffsetMicros(this._timestampOffsetMicros.toString(10));
        reportProto.setInternalMetrics(internalMetrics);
        return reportProto;
    }
}
