import { NotImplementedException } from './imp/exceptions';

export default class ActiveSpan {
    guid()                  { throw new NotImplementedException(); }
    tags()                  { throw new NotImplementedException(); }
    parent()                { throw new NotImplementedException(); }
    joinIDs()               { throw new NotImplementedException(); }
    endUserID()             { throw new NotImplementedException(); }
    operation()             { throw new NotImplementedException(); }

    span()                  { throw new NotImplementedException(); }

    infof(fmt, ...args)     { throw new NotImplementedException(); }
    warnf(fmt, ...args)     { throw new NotImplementedException(); }
    errorf(fmt, ...args)    { throw new NotImplementedException(); }
    fatalf(fmt, ...args)    { throw new NotImplementedException(); }

    end()                   { throw new NotImplementedException(); }
}
