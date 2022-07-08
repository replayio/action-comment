var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default;
var init_dist = __esm({
  "node_modules/data-uri-to-buffer/dist/index.js"() {
    dist_default = dataUriToBuffer;
  }
});

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports2, function(exports3) {
      "use strict";
      const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
      function noop2() {
        return void 0;
      }
      function getGlobals() {
        if (typeof self !== "undefined") {
          return self;
        } else if (typeof window !== "undefined") {
          return window;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function typeIsObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseResolve = Promise.resolve.bind(originalPromise);
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return originalPromiseResolve(value);
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      const queueMicrotask = (() => {
        const globalQueueMicrotask = globals && globals.queueMicrotask;
        if (typeof globalQueueMicrotask === "function") {
          return globalQueueMicrotask;
        }
        const resolvedPromise = promiseResolvedWith(void 0);
        return (fn) => PerformPromiseThen(resolvedPromise, fn);
      })();
      function reflectCall(F2, V, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V, args);
      }
      function promiseCall(F2, V, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        forEach(callback) {
          let i2 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i2 !== elements.length || node._next !== void 0) {
            if (i2 === elements.length) {
              node = node._next;
              elements = node._elements;
              i2 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i2]);
            ++i2;
          }
        }
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        if (reader._ownerReadableStream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        reader._ownerReadableStream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
      const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
      const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
      const PullSteps = SymbolPolyfill("[[PullSteps]]");
      const NumberIsFinite = Number.isFinite || function(x2) {
        return typeof x2 === "number" && isFinite(x2);
      };
      const MathTrunc = Math.trunc || function(v) {
        return v < 0 ? Math.ceil(v) : Math.floor(v);
      };
      function isDictionary(x2) {
        return typeof x2 === "object" || typeof x2 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x2, context) {
        if (typeof x2 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x2) {
        return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
      }
      function assertObject(x2, context) {
        if (!isObject(x2)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x2, position, context) {
        if (x2 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x2, field, context) {
        if (x2 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x2) {
        return x2 === 0 ? 0 : x2;
      }
      function integerPart(x2) {
        return censorNegativeZero(MathTrunc(x2));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x2 = Number(value);
        x2 = censorNegativeZero(x2);
        if (!NumberIsFinite(x2)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x2 = integerPart(x2);
        if (x2 < lowerBound || x2 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x2) || x2 === 0) {
          return 0;
        }
        return x2;
      }
      function assertReadableStream(x2, context) {
        if (!IsReadableStream(x2)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("iterate"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (reader._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("finish iterating"));
          }
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      if (AsyncIteratorPrototype !== void 0) {
        Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      }
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x2) {
        return x2 !== x2;
      };
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
      }
      function TransferArrayBuffer(O) {
        return O;
      }
      function IsDetachedBuffer(O) {
        return false;
      }
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function IsNonNegativeNumber(v) {
        if (typeof v !== "number") {
          return false;
        }
        if (NumberIsNaN(v)) {
          return false;
        }
        if (v < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size) {
        if (!IsNonNegativeNumber(size) || size === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size });
        container._queueTotalSize += size;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer))
            ;
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            const entry = this._queue.shift();
            this._queueTotalSize -= entry.byteLength;
            ReadableByteStreamControllerHandleQueueDrain(this);
            const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
            readRequest._chunkSteps(view);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
          return false;
        }
        return x2 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableByteStreamControllerError(controller, e2);
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const elementSize = pullIntoDescriptor.elementSize;
        const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        if (maxAlignedBytes > currentAlignedBytes) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        let elementSize = 1;
        if (view.constructor !== DataView) {
          elementSize = view.constructor.BYTES_PER_ELEMENT;
        }
        const ctor = view.constructor;
        const buffer = TransferArrayBuffer(view.buffer);
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset: view.byteOffset,
          byteLength: view.byteLength,
          bytesFilled: 0,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            readIntoRequest._errorSteps(e2);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled > 0) {
            const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e2);
            throw e2;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const buffer = chunk.buffer;
        const byteOffset = chunk.byteOffset;
        const byteLength = chunk.byteLength;
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer))
            ;
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
        }
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        if (ReadableStreamHasDefaultReader(stream)) {
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e2) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }, (r2) => {
          ReadableByteStreamControllerError(controller, r2);
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer))
            ;
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e2) => rejectPromise(e2)
          };
          ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
          return promise;
        }
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          if (this._readIntoRequests.length > 0) {
            throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
          }
          ReadableStreamReaderGenericRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
          return false;
        }
        return x2 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
        }
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size } = strategy;
        if (!size) {
          return () => 1;
        }
        return size;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x2, context) {
        if (!IsWritableStream(x2)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
          return false;
        }
        return x2 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        error(e2 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e2);
        }
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
          return false;
        }
        return x2 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (r2) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r2);
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let writeAlgorithm = () => promiseResolvedWith(void 0);
        let closeAlgorithm = () => promiseResolvedWith(void 0);
        let abortAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a) {
          return false;
        }
      }
      function createDOMExceptionPolyfill() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = new DOMException$1("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        error(e2 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e2);
        }
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
          return false;
        }
        return x2 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
        }, (e2) => {
          ReadableStreamDefaultControllerError(controller, e2);
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e2) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e2);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }, (r2) => {
          ReadableStreamDefaultControllerError(controller, r2);
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm = () => void 0;
        let pullAlgorithm = () => promiseResolvedWith(void 0);
        let cancelAlgorithm = () => promiseResolvedWith(void 0);
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r2) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r2) => {
            if (thisReader !== reader) {
              return;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r2);
            ReadableByteStreamControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e2) {
            return promiseRejectedWith(e2);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
      }
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      if (typeof SymbolPolyfill.asyncIterator === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
          value: ReadableStream2.prototype.values,
          writable: true,
          configurable: true
        });
      }
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
          return false;
        }
        return x2 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
          reader._readRequests = new SimpleQueue();
        }
      }
      function ReadableStreamError(stream, e2) {
        stream._state = "errored";
        stream._storedError = e2;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e2);
        if (IsReadableStreamDefaultReader(reader)) {
          reader._readRequests.forEach((readRequest) => {
            readRequest._errorSteps(e2);
          });
          reader._readRequests = new SimpleQueue();
        } else {
          reader._readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._errorSteps(e2);
          });
          reader._readIntoRequests = new SimpleQueue();
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      try {
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      try {
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
      } catch (_a) {
      }
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x2 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          TransformStreamErrorWritableAndUnblockWrite(stream, reason);
          return promiseResolvedWith(void 0);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
          return false;
        }
        return x2 instanceof TransformStream;
      }
      function TransformStreamError(stream, e2) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
        TransformStreamErrorWritableAndUnblockWrite(stream, e2);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      if (typeof SymbolPolyfill.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x2) {
        if (!typeIsObject(x2)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
          return false;
        }
        return x2 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm = (chunk) => {
          try {
            TransformStreamDefaultControllerEnqueue(controller, chunk);
            return promiseResolvedWith(void 0);
          } catch (transformResultE) {
            return promiseRejectedWith(transformResultE);
          }
        };
        let flushAlgorithm = () => promiseResolvedWith(void 0);
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e2) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e2) {
        TransformStreamError(controller._controlledTransformStream, e2);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r2) => {
          TransformStreamError(controller._controlledTransformStream, r2);
          throw r2;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        TransformStreamError(stream, reason);
        return promiseResolvedWith(void 0);
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const readable = stream._readable;
        const controller = stream._transformStreamController;
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        return transformPromiseWith(flushPromise, () => {
          if (readable._state === "errored") {
            throw readable._storedError;
          }
          ReadableStreamDefaultControllerClose(readable._readableStreamController);
        }, (r2) => {
          TransformStreamError(stream, r2);
          throw readable._storedError;
        });
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports3.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports3.CountQueuingStrategy = CountQueuingStrategy;
      exports3.ReadableByteStreamController = ReadableByteStreamController;
      exports3.ReadableStream = ReadableStream2;
      exports3.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports3.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports3.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports3.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports3.TransformStream = TransformStream;
      exports3.TransformStreamDefaultController = TransformStreamDefaultController;
      exports3.WritableStream = WritableStream;
      exports3.WritableStreamDefaultController = WritableStreamDefaultController;
      exports3.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
      Object.defineProperty(exports3, "__esModule", { value: true });
    });
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b = part;
      while (position !== b.size) {
        const chunk = b.slice(position, Math.min(b.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob2, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null)
          options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    fetch_blob_default = Blob2;
  }
});

// node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null)
          options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B = fetch_blob_default) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new file_default([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError;
var init_base = __esm({
  "node_modules/node-fetch/src/errors/base.js"() {
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
  }
});

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError;
var init_fetch_error = __esm({
  "node_modules/node-fetch/src/errors/fetch-error.js"() {
    init_base();
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
  }
});

// node_modules/node-fetch/src/utils/is.js
var NAME, isURLSearchParameters, isBlob, isAbortSignal, isDomainOrSubdomain;
var init_is = __esm({
  "node_modules/node-fetch/src/utils/is.js"() {
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    isDomainOrSubdomain = (destination, original) => {
      const orig = new URL(original).hostname;
      const dest = new URL(destination).hostname;
      return orig === dest || orig.endsWith(`.${dest}`);
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports2, module2) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module2.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
var import_node_fs, import_node_path, import_node_domexception, stat, blobFromSync, blobFrom, fileFrom, fileFromSync, fromBlob, fromFile, BlobDataItem;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_fs = require("node:fs");
    import_node_path = require("node:path");
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = import_node_fs.promises);
    blobFromSync = (path, type) => fromBlob((0, import_node_fs.statSync)(path), path, type);
    blobFrom = (path, type) => stat(path).then((stat2) => fromBlob(stat2, path, type));
    fileFrom = (path, type) => stat(path).then((stat2) => fromFile(stat2, path, type));
    fileFromSync = (path, type) => fromFile((0, import_node_fs.statSync)(path), path, type);
    fromBlob = (stat2, path, type = "") => new fetch_blob_default([new BlobDataItem({
      path,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], { type });
    fromFile = (stat2, path, type = "") => new file_default([new BlobDataItem({
      path,
      size: stat2.size,
      lastModified: stat2.mtimeMs,
      start: 0
    })], (0, import_node_path.basename)(path), { type, lastModified: stat2.mtimeMs });
    BlobDataItem = class {
      #path;
      #start;
      constructor(options) {
        this.#path = options.path;
        this.#start = options.start;
        this.size = options.size;
        this.lastModified = options.lastModified;
      }
      slice(start, end) {
        return new BlobDataItem({
          path: this.#path,
          lastModified: this.lastModified,
          size: end - start,
          start: this.#start + start
        });
      }
      async *stream() {
        const { mtimeMs } = await stat(this.#path);
        if (mtimeMs > this.lastModified) {
          throw new import_node_domexception.default("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        }
        yield* (0, import_node_fs.createReadStream)(this.#path, {
          start: this.#start,
          end: this.#start + this.size - 1
        });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/node-fetch/src/body.js
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return import_node_buffer.Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream.default)) {
    return import_node_buffer.Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return import_node_buffer.Buffer.from(accum.join(""));
      }
      return import_node_buffer.Buffer.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var import_node_stream, import_node_util, import_node_buffer, pipeline, INTERNALS, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream;
var init_body = __esm({
  "node_modules/node-fetch/src/body.js"() {
    import_node_stream = __toESM(require("node:stream"), 1);
    import_node_util = require("node:util");
    import_node_buffer = require("node:buffer");
    init_fetch_blob();
    init_esm_min();
    init_fetch_error();
    init_base();
    init_is();
    pipeline = (0, import_node_util.promisify)(import_node_stream.default.pipeline);
    INTERNALS = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = import_node_buffer.Buffer.from(body.toString());
        } else if (isBlob(body)) {
        } else if (import_node_buffer.Buffer.isBuffer(body)) {
        } else if (import_node_util.types.isAnyArrayBuffer(body)) {
          body = import_node_buffer.Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = import_node_buffer.Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream.default) {
        } else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = import_node_buffer.Buffer.from(String(body));
        }
        let stream = body;
        if (import_node_buffer.Buffer.isBuffer(body)) {
          stream = import_node_stream.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream.default.Readable.from(body.stream());
        }
        this[INTERNALS] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream.default) {
          body.on("error", (error_) => {
            const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS].error = error;
          });
        }
      }
      get body() {
        return this[INTERNALS].stream;
      }
      get bodyUsed() {
        return this[INTERNALS].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
        const buf = await this.arrayBuffer();
        return new fetch_blob_default([buf], {
          type: ct
        });
      }
      async json() {
        const text = await this.text();
        return JSON.parse(text);
      }
      async text() {
        const buffer = await consumeBody(this);
        return new TextDecoder().decode(buffer);
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true },
      data: { get: (0, import_node_util.deprecate)(() => {
      }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream.PassThrough({ highWaterMark });
        p2 = new import_node_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (import_node_buffer.Buffer.isBuffer(body) || import_node_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (import_node_buffer.Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = async (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        await pipeline(body, dest);
      }
    };
  }
});

// node_modules/node-fetch/src/headers.js
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var import_node_util2, import_node_http, validateHeaderName, validateHeaderValue, Headers;
var init_headers = __esm({
  "node_modules/node-fetch/src/headers.js"() {
    import_node_util2 = require("node:util");
    import_node_http = __toESM(require("node:http"), 1);
    validateHeaderName = typeof import_node_http.default.validateHeaderName === "function" ? import_node_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error;
      }
    };
    validateHeaderValue = typeof import_node_http.default.validateHeaderValue === "function" ? import_node_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
        throw error;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init) {
        let result = [];
        if (init instanceof Headers) {
          const raw = init.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init == null) {
        } else if (typeof init === "object" && !import_node_util2.types.isBoxedPrimitive(init)) {
          const method = init[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
  }
});

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus, isRedirect;
var init_is_redirect = __esm({
  "node_modules/node-fetch/src/utils/is-redirect.js"() {
    redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
  }
});

// node_modules/node-fetch/src/response.js
var INTERNALS2, Response;
var init_response = __esm({
  "node_modules/node-fetch/src/response.js"() {
    init_headers();
    init_body();
    init_is_redirect();
    INTERNALS2 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options = {}) {
        super(body, options);
        const status = options.status != null ? options.status : 200;
        const headers = new Headers(options.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS2] = {
          type: "default",
          url: options.url,
          status,
          statusText: options.statusText || "",
          headers,
          counter: options.counter,
          highWaterMark: options.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS2].type;
      }
      get url() {
        return this[INTERNALS2].url || "";
      }
      get status() {
        return this[INTERNALS2].status;
      }
      get ok() {
        return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
      }
      get redirected() {
        return this[INTERNALS2].counter > 0;
      }
      get statusText() {
        return this[INTERNALS2].statusText;
      }
      get headers() {
        return this[INTERNALS2].headers;
      }
      get highWaterMark() {
        return this[INTERNALS2].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response(null, { status: 0, statusText: "" });
        response[INTERNALS2].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
  }
});

// node_modules/node-fetch/src/utils/get-search.js
var getSearch;
var init_get_search = __esm({
  "node_modules/node-fetch/src/utils/get-search.js"() {
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
    };
  }
});

// node_modules/node-fetch/src/utils/referrer.js
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_node_net.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
var import_node_net, ReferrerPolicy, DEFAULT_REFERRER_POLICY;
var init_referrer = __esm({
  "node_modules/node-fetch/src/utils/referrer.js"() {
    import_node_net = require("node:net");
    ReferrerPolicy = /* @__PURE__ */ new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
  }
});

// node_modules/node-fetch/src/request.js
var import_node_url, import_node_util3, INTERNALS3, isRequest, doBadDataWarn, Request, getNodeRequestOptions;
var init_request = __esm({
  "node_modules/node-fetch/src/request.js"() {
    import_node_url = require("node:url");
    import_node_util3 = require("node:util");
    init_headers();
    init_body();
    init_is();
    init_get_search();
    init_referrer();
    INTERNALS3 = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS3] === "object";
    };
    doBadDataWarn = (0, import_node_util3.deprecate)(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    Request = class extends Body {
      constructor(input, init = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
        }
        let method = init.method || input.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(method)) {
          method = method.toUpperCase();
        }
        if ("data" in init) {
          doBadDataWarn();
        }
        if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init.size || input.size || 0
        });
        const headers = new Headers(init.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init) {
          signal = init.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init.referrer == null ? input.referrer : init.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS3] = {
          method,
          redirect: init.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
        this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
        this.counter = init.counter || input.counter || 0;
        this.agent = init.agent || input.agent;
        this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS3].method;
      }
      get url() {
        return (0, import_node_url.format)(this[INTERNALS3].parsedURL);
      }
      get headers() {
        return this[INTERNALS3].headers;
      }
      get redirect() {
        return this[INTERNALS3].redirect;
      }
      get signal() {
        return this[INTERNALS3].signal;
      }
      get referrer() {
        if (this[INTERNALS3].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS3].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS3].referrer) {
          return this[INTERNALS3].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS3].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS3];
      const headers = new Headers(request[INTERNALS3].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS3].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS3].referrer = "no-referrer";
      }
      if (request[INTERNALS3].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip, deflate, br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options
      };
    };
  }
});

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError;
var init_abort_error = __esm({
  "node_modules/node-fetch/src/errors/abort-error.js"() {
    init_base();
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
  }
});

// node_modules/node-fetch/src/index.js
var src_exports = {};
__export(src_exports, {
  AbortError: () => AbortError,
  Blob: () => fetch_blob_default,
  FetchError: () => FetchError,
  File: () => file_default,
  FormData: () => FormData,
  Headers: () => Headers,
  Request: () => Request,
  Response: () => Response,
  blobFrom: () => blobFrom,
  blobFromSync: () => blobFromSync,
  default: () => fetch,
  fileFrom: () => fileFrom,
  fileFromSync: () => fileFromSync,
  isRedirect: () => isRedirect
});
async function fetch(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s2) => {
        let endedWithEventsCount;
        s2.prependListener("end", () => {
          endedWithEventsCount = s2._eventsCount;
        });
        s2.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s2._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib.default.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = import_node_buffer2.Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = import_node_buffer2.Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = import_node_buffer2.Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && import_node_buffer2.Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}
var import_node_http2, import_node_https, import_node_zlib, import_node_stream2, import_node_buffer2, supportedSchemas;
var init_src = __esm({
  "node_modules/node-fetch/src/index.js"() {
    import_node_http2 = __toESM(require("node:http"), 1);
    import_node_https = __toESM(require("node:https"), 1);
    import_node_zlib = __toESM(require("node:zlib"), 1);
    import_node_stream2 = __toESM(require("node:stream"), 1);
    import_node_buffer2 = require("node:buffer");
    init_dist();
    init_body();
    init_response();
    init_headers();
    init_request();
    init_fetch_error();
    init_abort_error();
    init_is_redirect();
    init_esm_min();
    init_is();
    init_referrer();
    init_from();
    supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/dedent/dist/dedent.js
var require_dedent = __commonJS({
  "node_modules/dedent/dist/dedent.js"(exports2, module2) {
    "use strict";
    function dedent2(strings) {
      var raw = void 0;
      if (typeof strings === "string") {
        raw = [strings];
      } else {
        raw = strings.raw;
      }
      var result = "";
      for (var i2 = 0; i2 < raw.length; i2++) {
        result += raw[i2].replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`");
        if (i2 < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
          result += arguments.length <= i2 + 1 ? void 0 : arguments[i2 + 1];
        }
      }
      var lines = result.split("\n");
      var mindent = null;
      lines.forEach(function(l) {
        var m2 = l.match(/^(\s+)\S+/);
        if (m2) {
          var indent = m2[1].length;
          if (!mindent) {
            mindent = indent;
          } else {
            mindent = Math.min(mindent, indent);
          }
        }
      });
      if (mindent !== null) {
        result = lines.map(function(l) {
          return l[0] === " " ? l.slice(mindent) : l;
        }).join("\n");
      }
      result = result.trim();
      return result.replace(/\\n/g, "\n");
    }
    if (typeof module2 !== "undefined") {
      module2.exports = dedent2;
    }
  }
});

// node_modules/tslib/tslib.js
var require_tslib = __commonJS({
  "node_modules/tslib/tslib.js"(exports2, module2) {
    var __extends;
    var __assign;
    var __rest;
    var __decorate;
    var __param;
    var __metadata;
    var __awaiter;
    var __generator;
    var __exportStar;
    var __values;
    var __read;
    var __spread;
    var __spreadArrays;
    var __spreadArray;
    var __await;
    var __asyncGenerator;
    var __asyncDelegator;
    var __asyncValues;
    var __makeTemplateObject;
    var __importStar;
    var __importDefault;
    var __classPrivateFieldGet;
    var __classPrivateFieldSet;
    var __classPrivateFieldIn;
    var __createBinding;
    (function(factory) {
      var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
      if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function(exports3) {
          factory(createExporter(root, createExporter(exports3)));
        });
      } else if (typeof module2 === "object" && typeof module2.exports === "object") {
        factory(createExporter(root, createExporter(module2.exports)));
      } else {
        factory(createExporter(root));
      }
      function createExporter(exports3, previous) {
        if (exports3 !== root) {
          if (typeof Object.create === "function") {
            Object.defineProperty(exports3, "__esModule", { value: true });
          } else {
            exports3.__esModule = true;
          }
        }
        return function(id, v) {
          return exports3[id] = previous ? previous(id, v) : v;
        };
      }
    })(function(exporter) {
      var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b;
      } || function(d, b) {
        for (var p in b)
          if (Object.prototype.hasOwnProperty.call(b, p))
            d[p] = b[p];
      };
      __extends = function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
      __assign = Object.assign || function(t2) {
        for (var s2, i2 = 1, n = arguments.length; i2 < n; i2++) {
          s2 = arguments[i2];
          for (var p in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p))
              t2[p] = s2[p];
        }
        return t2;
      };
      __rest = function(s2, e2) {
        var t2 = {};
        for (var p in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p) && e2.indexOf(p) < 0)
            t2[p] = s2[p];
        if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i2 = 0, p = Object.getOwnPropertySymbols(s2); i2 < p.length; i2++) {
            if (e2.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p[i2]))
              t2[p[i2]] = s2[p[i2]];
          }
        return t2;
      };
      __decorate = function(decorators, target, key, desc) {
        var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
          r2 = Reflect.decorate(decorators, target, key, desc);
        else
          for (var i2 = decorators.length - 1; i2 >= 0; i2--)
            if (d = decorators[i2])
              r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
        return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
      };
      __param = function(paramIndex, decorator) {
        return function(target, key) {
          decorator(target, key, paramIndex);
        };
      };
      __metadata = function(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
          return Reflect.metadata(metadataKey, metadataValue);
      };
      __awaiter = function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e2) {
              reject(e2);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e2) {
              reject(e2);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      __generator = function(thisArg, body) {
        var _ = { label: 0, sent: function() {
          if (t2[0] & 1)
            throw t2[1];
          return t2[1];
        }, trys: [], ops: [] }, f3, y, t2, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
          return this;
        }), g;
        function verb(n) {
          return function(v) {
            return step([n, v]);
          };
        }
        function step(op) {
          if (f3)
            throw new TypeError("Generator is already executing.");
          while (_)
            try {
              if (f3 = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done)
                return t2;
              if (y = 0, t2)
                op = [op[0] & 2, t2.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t2 = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t2[1]) {
                    _.label = t2[1];
                    t2 = op;
                    break;
                  }
                  if (t2 && _.label < t2[2]) {
                    _.label = t2[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t2[2])
                    _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f3 = t2 = 0;
            }
          if (op[0] & 5)
            throw op[1];
          return { value: op[0] ? op[1] : void 0, done: true };
        }
      };
      __exportStar = function(m2, o) {
        for (var p in m2)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
            __createBinding(o, m2, p);
      };
      __createBinding = Object.create ? function(o, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m2, k);
        if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m2[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m2, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m2[k];
      };
      __values = function(o) {
        var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o[s2], i2 = 0;
        if (m2)
          return m2.call(o);
        if (o && typeof o.length === "number")
          return {
            next: function() {
              if (o && i2 >= o.length)
                o = void 0;
              return { value: o && o[i2++], done: !o };
            }
          };
        throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
      };
      __read = function(o, n) {
        var m2 = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m2)
          return o;
        var i2 = m2.call(o), r2, ar = [], e2;
        try {
          while ((n === void 0 || n-- > 0) && !(r2 = i2.next()).done)
            ar.push(r2.value);
        } catch (error) {
          e2 = { error };
        } finally {
          try {
            if (r2 && !r2.done && (m2 = i2["return"]))
              m2.call(i2);
          } finally {
            if (e2)
              throw e2.error;
          }
        }
        return ar;
      };
      __spread = function() {
        for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
          ar = ar.concat(__read(arguments[i2]));
        return ar;
      };
      __spreadArrays = function() {
        for (var s2 = 0, i2 = 0, il = arguments.length; i2 < il; i2++)
          s2 += arguments[i2].length;
        for (var r2 = Array(s2), k = 0, i2 = 0; i2 < il; i2++)
          for (var a = arguments[i2], j = 0, jl = a.length; j < jl; j++, k++)
            r2[k] = a[j];
        return r2;
      };
      __spreadArray = function(to, from, pack) {
        if (pack || arguments.length === 2)
          for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
            if (ar || !(i2 in from)) {
              if (!ar)
                ar = Array.prototype.slice.call(from, 0, i2);
              ar[i2] = from[i2];
            }
          }
        return to.concat(ar || Array.prototype.slice.call(from));
      };
      __await = function(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
      };
      __asyncGenerator = function(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i2, q = [];
        return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2;
        function verb(n) {
          if (g[n])
            i2[n] = function(v) {
              return new Promise(function(a, b) {
                q.push([n, v, a, b]) > 1 || resume(n, v);
              });
            };
        }
        function resume(n, v) {
          try {
            step(g[n](v));
          } catch (e2) {
            settle(q[0][3], e2);
          }
        }
        function step(r2) {
          r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
        }
        function fulfill(value) {
          resume("next", value);
        }
        function reject(value) {
          resume("throw", value);
        }
        function settle(f3, v) {
          if (f3(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]);
        }
      };
      __asyncDelegator = function(o) {
        var i2, p;
        return i2 = {}, verb("next"), verb("throw", function(e2) {
          throw e2;
        }), verb("return"), i2[Symbol.iterator] = function() {
          return this;
        }, i2;
        function verb(n, f3) {
          i2[n] = o[n] ? function(v) {
            return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f3 ? f3(v) : v;
          } : f3;
        }
      };
      __asyncValues = function(o) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var m2 = o[Symbol.asyncIterator], i2;
        return m2 ? m2.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
          return this;
        }, i2);
        function verb(n) {
          i2[n] = o[n] && function(v) {
            return new Promise(function(resolve, reject) {
              v = o[n](v), settle(resolve, reject, v.done, v.value);
            });
          };
        }
        function settle(resolve, reject, d, v) {
          Promise.resolve(v).then(function(v2) {
            resolve({ value: v2, done: d });
          }, reject);
        }
      };
      __makeTemplateObject = function(cooked, raw) {
        if (Object.defineProperty) {
          Object.defineProperty(cooked, "raw", { value: raw });
        } else {
          cooked.raw = raw;
        }
        return cooked;
      };
      var __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      __importStar = function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result, mod, k);
        }
        __setModuleDefault(result, mod);
        return result;
      };
      __importDefault = function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      __classPrivateFieldGet = function(receiver, state, kind, f3) {
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f3 : kind === "a" ? f3.call(receiver) : f3 ? f3.value : state.get(receiver);
      };
      __classPrivateFieldSet = function(receiver, state, value, kind, f3) {
        if (kind === "m")
          throw new TypeError("Private method is not writable");
        if (kind === "a" && !f3)
          throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f3 : !state.has(receiver))
          throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f3.call(receiver, value) : f3 ? f3.value = value : state.set(receiver, value), value;
      };
      __classPrivateFieldIn = function(state, receiver) {
        if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
          throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
      };
      exporter("__extends", __extends);
      exporter("__assign", __assign);
      exporter("__rest", __rest);
      exporter("__decorate", __decorate);
      exporter("__param", __param);
      exporter("__metadata", __metadata);
      exporter("__awaiter", __awaiter);
      exporter("__generator", __generator);
      exporter("__exportStar", __exportStar);
      exporter("__createBinding", __createBinding);
      exporter("__values", __values);
      exporter("__read", __read);
      exporter("__spread", __spread);
      exporter("__spreadArrays", __spreadArrays);
      exporter("__spreadArray", __spreadArray);
      exporter("__await", __await);
      exporter("__asyncGenerator", __asyncGenerator);
      exporter("__asyncDelegator", __asyncDelegator);
      exporter("__asyncValues", __asyncValues);
      exporter("__makeTemplateObject", __makeTemplateObject);
      exporter("__importStar", __importStar);
      exporter("__importDefault", __importDefault);
      exporter("__classPrivateFieldGet", __classPrivateFieldGet);
      exporter("__classPrivateFieldSet", __classPrivateFieldSet);
      exporter("__classPrivateFieldIn", __classPrivateFieldIn);
    });
  }
});

// node_modules/@formatjs/intl/src/types.js
var require_types = __commonJS({
  "node_modules/@formatjs/intl/src/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@formatjs/icu-messageformat-parser/error.js
var require_error = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ErrorKind = void 0;
    var ErrorKind;
    (function(ErrorKind2) {
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
      ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
      ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
      ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
      ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
      ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
      ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
      ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
      ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
      ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
      ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
      ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
      ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
      ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
      ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
      ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
      ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
      ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
    })(ErrorKind = exports2.ErrorKind || (exports2.ErrorKind = {}));
  }
});

// node_modules/@formatjs/icu-messageformat-parser/types.js
var require_types2 = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/types.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createNumberElement = exports2.createLiteralElement = exports2.isDateTimeSkeleton = exports2.isNumberSkeleton = exports2.isTagElement = exports2.isPoundElement = exports2.isPluralElement = exports2.isSelectElement = exports2.isTimeElement = exports2.isDateElement = exports2.isNumberElement = exports2.isArgumentElement = exports2.isLiteralElement = exports2.SKELETON_TYPE = exports2.TYPE = void 0;
    var TYPE;
    (function(TYPE2) {
      TYPE2[TYPE2["literal"] = 0] = "literal";
      TYPE2[TYPE2["argument"] = 1] = "argument";
      TYPE2[TYPE2["number"] = 2] = "number";
      TYPE2[TYPE2["date"] = 3] = "date";
      TYPE2[TYPE2["time"] = 4] = "time";
      TYPE2[TYPE2["select"] = 5] = "select";
      TYPE2[TYPE2["plural"] = 6] = "plural";
      TYPE2[TYPE2["pound"] = 7] = "pound";
      TYPE2[TYPE2["tag"] = 8] = "tag";
    })(TYPE = exports2.TYPE || (exports2.TYPE = {}));
    var SKELETON_TYPE;
    (function(SKELETON_TYPE2) {
      SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
      SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
    })(SKELETON_TYPE = exports2.SKELETON_TYPE || (exports2.SKELETON_TYPE = {}));
    function isLiteralElement(el) {
      return el.type === TYPE.literal;
    }
    exports2.isLiteralElement = isLiteralElement;
    function isArgumentElement(el) {
      return el.type === TYPE.argument;
    }
    exports2.isArgumentElement = isArgumentElement;
    function isNumberElement(el) {
      return el.type === TYPE.number;
    }
    exports2.isNumberElement = isNumberElement;
    function isDateElement(el) {
      return el.type === TYPE.date;
    }
    exports2.isDateElement = isDateElement;
    function isTimeElement(el) {
      return el.type === TYPE.time;
    }
    exports2.isTimeElement = isTimeElement;
    function isSelectElement(el) {
      return el.type === TYPE.select;
    }
    exports2.isSelectElement = isSelectElement;
    function isPluralElement(el) {
      return el.type === TYPE.plural;
    }
    exports2.isPluralElement = isPluralElement;
    function isPoundElement(el) {
      return el.type === TYPE.pound;
    }
    exports2.isPoundElement = isPoundElement;
    function isTagElement(el) {
      return el.type === TYPE.tag;
    }
    exports2.isTagElement = isTagElement;
    function isNumberSkeleton(el) {
      return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
    }
    exports2.isNumberSkeleton = isNumberSkeleton;
    function isDateTimeSkeleton(el) {
      return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
    }
    exports2.isDateTimeSkeleton = isDateTimeSkeleton;
    function createLiteralElement(value) {
      return {
        type: TYPE.literal,
        value
      };
    }
    exports2.createLiteralElement = createLiteralElement;
    function createNumberElement(value, style) {
      return {
        type: TYPE.number,
        value,
        style
      };
    }
    exports2.createNumberElement = createNumberElement;
  }
});

// node_modules/@formatjs/icu-messageformat-parser/regex.generated.js
var require_regex_generated = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/regex.generated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WHITE_SPACE_REGEX = exports2.SPACE_SEPARATOR_REGEX = void 0;
    exports2.SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    exports2.WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/date-time.js
var require_date_time = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/date-time.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseDateTimeSkeleton = void 0;
    var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
    function parseDateTimeSkeleton(skeleton) {
      var result = {};
      skeleton.replace(DATE_TIME_REGEX, function(match) {
        var len = match.length;
        switch (match[0]) {
          case "G":
            result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
            break;
          case "y":
            result.year = len === 2 ? "2-digit" : "numeric";
            break;
          case "Y":
          case "u":
          case "U":
          case "r":
            throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
          case "q":
          case "Q":
            throw new RangeError("`q/Q` (quarter) patterns are not supported");
          case "M":
          case "L":
            result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
            break;
          case "w":
          case "W":
            throw new RangeError("`w/W` (week) patterns are not supported");
          case "d":
            result.day = ["numeric", "2-digit"][len - 1];
            break;
          case "D":
          case "F":
          case "g":
            throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
          case "E":
            result.weekday = len === 4 ? "short" : len === 5 ? "narrow" : "short";
            break;
          case "e":
            if (len < 4) {
              throw new RangeError("`e..eee` (weekday) patterns are not supported");
            }
            result.weekday = ["short", "long", "narrow", "short"][len - 4];
            break;
          case "c":
            if (len < 4) {
              throw new RangeError("`c..ccc` (weekday) patterns are not supported");
            }
            result.weekday = ["short", "long", "narrow", "short"][len - 4];
            break;
          case "a":
            result.hour12 = true;
            break;
          case "b":
          case "B":
            throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
          case "h":
            result.hourCycle = "h12";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "H":
            result.hourCycle = "h23";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "K":
            result.hourCycle = "h11";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "k":
            result.hourCycle = "h24";
            result.hour = ["numeric", "2-digit"][len - 1];
            break;
          case "j":
          case "J":
          case "C":
            throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
          case "m":
            result.minute = ["numeric", "2-digit"][len - 1];
            break;
          case "s":
            result.second = ["numeric", "2-digit"][len - 1];
            break;
          case "S":
          case "A":
            throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
          case "z":
            result.timeZoneName = len < 4 ? "short" : "long";
            break;
          case "Z":
          case "O":
          case "v":
          case "V":
          case "X":
          case "x":
            throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
        }
        return "";
      });
      return result;
    }
    exports2.parseDateTimeSkeleton = parseDateTimeSkeleton;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/regex.generated.js
var require_regex_generated2 = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/regex.generated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.WHITE_SPACE_REGEX = void 0;
    exports2.WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/number.js
var require_number = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/number.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parseNumberSkeleton = exports2.parseNumberSkeletonFromString = void 0;
    var tslib_1 = require_tslib();
    var regex_generated_1 = require_regex_generated2();
    function parseNumberSkeletonFromString(skeleton) {
      if (skeleton.length === 0) {
        throw new Error("Number skeleton cannot be empty");
      }
      var stringTokens = skeleton.split(regex_generated_1.WHITE_SPACE_REGEX).filter(function(x2) {
        return x2.length > 0;
      });
      var tokens = [];
      for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
        var stringToken = stringTokens_1[_i];
        var stemAndOptions = stringToken.split("/");
        if (stemAndOptions.length === 0) {
          throw new Error("Invalid number skeleton");
        }
        var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
        for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
          var option = options_1[_a];
          if (option.length === 0) {
            throw new Error("Invalid number skeleton");
          }
        }
        tokens.push({ stem, options });
      }
      return tokens;
    }
    exports2.parseNumberSkeletonFromString = parseNumberSkeletonFromString;
    function icuUnitToEcma(unit) {
      return unit.replace(/^(.*?)-/, "");
    }
    var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
    var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
    var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
    var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
    function parseSignificantPrecision(str) {
      var result = {};
      if (str[str.length - 1] === "r") {
        result.roundingPriority = "morePrecision";
      } else if (str[str.length - 1] === "s") {
        result.roundingPriority = "lessPrecision";
      }
      str.replace(SIGNIFICANT_PRECISION_REGEX, function(_, g1, g2) {
        if (typeof g2 !== "string") {
          result.minimumSignificantDigits = g1.length;
          result.maximumSignificantDigits = g1.length;
        } else if (g2 === "+") {
          result.minimumSignificantDigits = g1.length;
        } else if (g1[0] === "#") {
          result.maximumSignificantDigits = g1.length;
        } else {
          result.minimumSignificantDigits = g1.length;
          result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
        }
        return "";
      });
      return result;
    }
    function parseSign(str) {
      switch (str) {
        case "sign-auto":
          return {
            signDisplay: "auto"
          };
        case "sign-accounting":
        case "()":
          return {
            currencySign: "accounting"
          };
        case "sign-always":
        case "+!":
          return {
            signDisplay: "always"
          };
        case "sign-accounting-always":
        case "()!":
          return {
            signDisplay: "always",
            currencySign: "accounting"
          };
        case "sign-except-zero":
        case "+?":
          return {
            signDisplay: "exceptZero"
          };
        case "sign-accounting-except-zero":
        case "()?":
          return {
            signDisplay: "exceptZero",
            currencySign: "accounting"
          };
        case "sign-never":
        case "+_":
          return {
            signDisplay: "never"
          };
      }
    }
    function parseConciseScientificAndEngineeringStem(stem) {
      var result;
      if (stem[0] === "E" && stem[1] === "E") {
        result = {
          notation: "engineering"
        };
        stem = stem.slice(2);
      } else if (stem[0] === "E") {
        result = {
          notation: "scientific"
        };
        stem = stem.slice(1);
      }
      if (result) {
        var signDisplay = stem.slice(0, 2);
        if (signDisplay === "+!") {
          result.signDisplay = "always";
          stem = stem.slice(2);
        } else if (signDisplay === "+?") {
          result.signDisplay = "exceptZero";
          stem = stem.slice(2);
        }
        if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
          throw new Error("Malformed concise eng/scientific notation");
        }
        result.minimumIntegerDigits = stem.length;
      }
      return result;
    }
    function parseNotationOptions(opt) {
      var result = {};
      var signOpts = parseSign(opt);
      if (signOpts) {
        return signOpts;
      }
      return result;
    }
    function parseNumberSkeleton(tokens) {
      var result = {};
      for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        switch (token.stem) {
          case "percent":
          case "%":
            result.style = "percent";
            continue;
          case "%x100":
            result.style = "percent";
            result.scale = 100;
            continue;
          case "currency":
            result.style = "currency";
            result.currency = token.options[0];
            continue;
          case "group-off":
          case ",_":
            result.useGrouping = false;
            continue;
          case "precision-integer":
          case ".":
            result.maximumFractionDigits = 0;
            continue;
          case "measure-unit":
          case "unit":
            result.style = "unit";
            result.unit = icuUnitToEcma(token.options[0]);
            continue;
          case "compact-short":
          case "K":
            result.notation = "compact";
            result.compactDisplay = "short";
            continue;
          case "compact-long":
          case "KK":
            result.notation = "compact";
            result.compactDisplay = "long";
            continue;
          case "scientific":
            result = (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), { notation: "scientific" }), token.options.reduce(function(all, opt2) {
              return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, all), parseNotationOptions(opt2));
            }, {}));
            continue;
          case "engineering":
            result = (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), { notation: "engineering" }), token.options.reduce(function(all, opt2) {
              return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, all), parseNotationOptions(opt2));
            }, {}));
            continue;
          case "notation-simple":
            result.notation = "standard";
            continue;
          case "unit-width-narrow":
            result.currencyDisplay = "narrowSymbol";
            result.unitDisplay = "narrow";
            continue;
          case "unit-width-short":
            result.currencyDisplay = "code";
            result.unitDisplay = "short";
            continue;
          case "unit-width-full-name":
            result.currencyDisplay = "name";
            result.unitDisplay = "long";
            continue;
          case "unit-width-iso-code":
            result.currencyDisplay = "symbol";
            continue;
          case "scale":
            result.scale = parseFloat(token.options[0]);
            continue;
          case "integer-width":
            if (token.options.length > 1) {
              throw new RangeError("integer-width stems only accept a single optional option");
            }
            token.options[0].replace(INTEGER_WIDTH_REGEX, function(_, g1, g2, g3, g4, g5) {
              if (g1) {
                result.minimumIntegerDigits = g2.length;
              } else if (g3 && g4) {
                throw new Error("We currently do not support maximum integer digits");
              } else if (g5) {
                throw new Error("We currently do not support exact integer digits");
              }
              return "";
            });
            continue;
        }
        if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
          result.minimumIntegerDigits = token.stem.length;
          continue;
        }
        if (FRACTION_PRECISION_REGEX.test(token.stem)) {
          if (token.options.length > 1) {
            throw new RangeError("Fraction-precision stems only accept a single optional option");
          }
          token.stem.replace(FRACTION_PRECISION_REGEX, function(_, g1, g2, g3, g4, g5) {
            if (g2 === "*") {
              result.minimumFractionDigits = g1.length;
            } else if (g3 && g3[0] === "#") {
              result.maximumFractionDigits = g3.length;
            } else if (g4 && g5) {
              result.minimumFractionDigits = g4.length;
              result.maximumFractionDigits = g4.length + g5.length;
            } else {
              result.minimumFractionDigits = g1.length;
              result.maximumFractionDigits = g1.length;
            }
            return "";
          });
          var opt = token.options[0];
          if (opt === "w") {
            result = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), { trailingZeroDisplay: "stripIfInteger" });
          } else if (opt) {
            result = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), parseSignificantPrecision(opt));
          }
          continue;
        }
        if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
          result = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), parseSignificantPrecision(token.stem));
          continue;
        }
        var signOpts = parseSign(token.stem);
        if (signOpts) {
          result = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), signOpts);
        }
        var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
        if (conciseScientificAndEngineeringOpts) {
          result = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, result), conciseScientificAndEngineeringOpts);
        }
      }
      return result;
    }
    exports2.parseNumberSkeleton = parseNumberSkeleton;
  }
});

// node_modules/@formatjs/icu-skeleton-parser/index.js
var require_icu_skeleton_parser = __commonJS({
  "node_modules/@formatjs/icu-skeleton-parser/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    (0, tslib_1.__exportStar)(require_date_time(), exports2);
    (0, tslib_1.__exportStar)(require_number(), exports2);
  }
});

// node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js
var require_time_data_generated = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/time-data.generated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.timeData = void 0;
    exports2.timeData = {
      "AX": [
        "H"
      ],
      "BQ": [
        "H"
      ],
      "CP": [
        "H"
      ],
      "CZ": [
        "H"
      ],
      "DK": [
        "H"
      ],
      "FI": [
        "H"
      ],
      "ID": [
        "H"
      ],
      "IS": [
        "H"
      ],
      "ML": [
        "H"
      ],
      "NE": [
        "H"
      ],
      "RU": [
        "H"
      ],
      "SE": [
        "H"
      ],
      "SJ": [
        "H"
      ],
      "SK": [
        "H"
      ],
      "AS": [
        "h",
        "H"
      ],
      "BT": [
        "h",
        "H"
      ],
      "DJ": [
        "h",
        "H"
      ],
      "ER": [
        "h",
        "H"
      ],
      "GH": [
        "h",
        "H"
      ],
      "IN": [
        "h",
        "H"
      ],
      "LS": [
        "h",
        "H"
      ],
      "PG": [
        "h",
        "H"
      ],
      "PW": [
        "h",
        "H"
      ],
      "SO": [
        "h",
        "H"
      ],
      "TO": [
        "h",
        "H"
      ],
      "VU": [
        "h",
        "H"
      ],
      "WS": [
        "h",
        "H"
      ],
      "001": [
        "H",
        "h"
      ],
      "AL": [
        "h",
        "H",
        "hB"
      ],
      "TD": [
        "h",
        "H",
        "hB"
      ],
      "ca-ES": [
        "H",
        "h",
        "hB"
      ],
      "CF": [
        "H",
        "h",
        "hB"
      ],
      "CM": [
        "H",
        "h",
        "hB"
      ],
      "fr-CA": [
        "H",
        "h",
        "hB"
      ],
      "gl-ES": [
        "H",
        "h",
        "hB"
      ],
      "it-CH": [
        "H",
        "h",
        "hB"
      ],
      "it-IT": [
        "H",
        "h",
        "hB"
      ],
      "LU": [
        "H",
        "h",
        "hB"
      ],
      "NP": [
        "H",
        "h",
        "hB"
      ],
      "PF": [
        "H",
        "h",
        "hB"
      ],
      "SC": [
        "H",
        "h",
        "hB"
      ],
      "SM": [
        "H",
        "h",
        "hB"
      ],
      "SN": [
        "H",
        "h",
        "hB"
      ],
      "TF": [
        "H",
        "h",
        "hB"
      ],
      "VA": [
        "H",
        "h",
        "hB"
      ],
      "CY": [
        "h",
        "H",
        "hb",
        "hB"
      ],
      "GR": [
        "h",
        "H",
        "hb",
        "hB"
      ],
      "CO": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "DO": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "KP": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "KR": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "NA": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "PA": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "PR": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "VE": [
        "h",
        "H",
        "hB",
        "hb"
      ],
      "AC": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "AI": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "BW": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "BZ": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CC": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CK": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "CX": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "DG": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "FK": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "GB": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "GG": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "GI": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "IE": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "IM": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "IO": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "JE": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "LT": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "MK": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "MN": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "MS": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NF": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NG": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NR": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "NU": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "PN": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "SH": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "SX": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "TA": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "ZA": [
        "H",
        "h",
        "hb",
        "hB"
      ],
      "af-ZA": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "AR": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "CL": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "CR": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "CU": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "EA": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-BO": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-BR": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-EC": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-ES": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-GQ": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "es-PE": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "GT": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "HN": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "IC": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "KG": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "KM": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "LK": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "MA": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "MX": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "NI": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "PY": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "SV": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "UY": [
        "H",
        "h",
        "hB",
        "hb"
      ],
      "JP": [
        "H",
        "h",
        "K"
      ],
      "AD": [
        "H",
        "hB"
      ],
      "AM": [
        "H",
        "hB"
      ],
      "AO": [
        "H",
        "hB"
      ],
      "AT": [
        "H",
        "hB"
      ],
      "AW": [
        "H",
        "hB"
      ],
      "BE": [
        "H",
        "hB"
      ],
      "BF": [
        "H",
        "hB"
      ],
      "BJ": [
        "H",
        "hB"
      ],
      "BL": [
        "H",
        "hB"
      ],
      "BR": [
        "H",
        "hB"
      ],
      "CG": [
        "H",
        "hB"
      ],
      "CI": [
        "H",
        "hB"
      ],
      "CV": [
        "H",
        "hB"
      ],
      "DE": [
        "H",
        "hB"
      ],
      "EE": [
        "H",
        "hB"
      ],
      "FR": [
        "H",
        "hB"
      ],
      "GA": [
        "H",
        "hB"
      ],
      "GF": [
        "H",
        "hB"
      ],
      "GN": [
        "H",
        "hB"
      ],
      "GP": [
        "H",
        "hB"
      ],
      "GW": [
        "H",
        "hB"
      ],
      "HR": [
        "H",
        "hB"
      ],
      "IL": [
        "H",
        "hB"
      ],
      "IT": [
        "H",
        "hB"
      ],
      "KZ": [
        "H",
        "hB"
      ],
      "MC": [
        "H",
        "hB"
      ],
      "MD": [
        "H",
        "hB"
      ],
      "MF": [
        "H",
        "hB"
      ],
      "MQ": [
        "H",
        "hB"
      ],
      "MZ": [
        "H",
        "hB"
      ],
      "NC": [
        "H",
        "hB"
      ],
      "NL": [
        "H",
        "hB"
      ],
      "PM": [
        "H",
        "hB"
      ],
      "PT": [
        "H",
        "hB"
      ],
      "RE": [
        "H",
        "hB"
      ],
      "RO": [
        "H",
        "hB"
      ],
      "SI": [
        "H",
        "hB"
      ],
      "SR": [
        "H",
        "hB"
      ],
      "ST": [
        "H",
        "hB"
      ],
      "TG": [
        "H",
        "hB"
      ],
      "TR": [
        "H",
        "hB"
      ],
      "WF": [
        "H",
        "hB"
      ],
      "YT": [
        "H",
        "hB"
      ],
      "BD": [
        "h",
        "hB",
        "H"
      ],
      "PK": [
        "h",
        "hB",
        "H"
      ],
      "AZ": [
        "H",
        "hB",
        "h"
      ],
      "BA": [
        "H",
        "hB",
        "h"
      ],
      "BG": [
        "H",
        "hB",
        "h"
      ],
      "CH": [
        "H",
        "hB",
        "h"
      ],
      "GE": [
        "H",
        "hB",
        "h"
      ],
      "LI": [
        "H",
        "hB",
        "h"
      ],
      "ME": [
        "H",
        "hB",
        "h"
      ],
      "RS": [
        "H",
        "hB",
        "h"
      ],
      "UA": [
        "H",
        "hB",
        "h"
      ],
      "UZ": [
        "H",
        "hB",
        "h"
      ],
      "XK": [
        "H",
        "hB",
        "h"
      ],
      "AG": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "AU": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BB": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BS": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "CA": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "DM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "en-001": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "FJ": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "FM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GD": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GU": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "GY": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "JM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "KI": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "KN": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "KY": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "LC": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "LR": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "MH": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "MP": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "MW": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "NZ": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SB": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SG": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SL": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SS": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "SZ": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "TC": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "TT": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "UM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "US": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "VC": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "VG": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "VI": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "ZM": [
        "h",
        "hb",
        "H",
        "hB"
      ],
      "BO": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "EC": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "ES": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "GQ": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "PE": [
        "H",
        "hB",
        "h",
        "hb"
      ],
      "AE": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "ar-001": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "BH": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "DZ": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "EG": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "EH": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "HK": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "IQ": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "JO": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "KW": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "LB": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "LY": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "MO": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "MR": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "OM": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "PH": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "PS": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "QA": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "SA": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "SD": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "SY": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "TN": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "YE": [
        "h",
        "hB",
        "hb",
        "H"
      ],
      "AF": [
        "H",
        "hb",
        "hB",
        "h"
      ],
      "LA": [
        "H",
        "hb",
        "hB",
        "h"
      ],
      "CN": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "LV": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "TL": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "zu-ZA": [
        "H",
        "hB",
        "hb",
        "h"
      ],
      "CD": [
        "hB",
        "H"
      ],
      "IR": [
        "hB",
        "H"
      ],
      "hi-IN": [
        "hB",
        "h",
        "H"
      ],
      "kn-IN": [
        "hB",
        "h",
        "H"
      ],
      "ml-IN": [
        "hB",
        "h",
        "H"
      ],
      "te-IN": [
        "hB",
        "h",
        "H"
      ],
      "KH": [
        "hB",
        "h",
        "H",
        "hb"
      ],
      "ta-IN": [
        "hB",
        "h",
        "hb",
        "H"
      ],
      "BN": [
        "hb",
        "hB",
        "h",
        "H"
      ],
      "MY": [
        "hb",
        "hB",
        "h",
        "H"
      ],
      "ET": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "gu-IN": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "mr-IN": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "pa-IN": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "TW": [
        "hB",
        "hb",
        "h",
        "H"
      ],
      "KE": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "MM": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "TZ": [
        "hB",
        "hb",
        "H",
        "h"
      ],
      "UG": [
        "hB",
        "hb",
        "H",
        "h"
      ]
    };
  }
});

// node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js
var require_date_time_pattern_generator = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/date-time-pattern-generator.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getBestPattern = void 0;
    var time_data_generated_1 = require_time_data_generated();
    function getBestPattern(skeleton, locale) {
      var skeletonCopy = "";
      for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
        var patternChar = skeleton.charAt(patternPos);
        if (patternChar === "j") {
          var extraLength = 0;
          while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
            extraLength++;
            patternPos++;
          }
          var hourLen = 1 + (extraLength & 1);
          var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
          var dayPeriodChar = "a";
          var hourChar = getDefaultHourSymbolFromLocale(locale);
          if (hourChar == "H" || hourChar == "k") {
            dayPeriodLen = 0;
          }
          while (dayPeriodLen-- > 0) {
            skeletonCopy += dayPeriodChar;
          }
          while (hourLen-- > 0) {
            skeletonCopy = hourChar + skeletonCopy;
          }
        } else if (patternChar === "J") {
          skeletonCopy += "H";
        } else {
          skeletonCopy += patternChar;
        }
      }
      return skeletonCopy;
    }
    exports2.getBestPattern = getBestPattern;
    function getDefaultHourSymbolFromLocale(locale) {
      var hourCycle = locale.hourCycle;
      if (hourCycle === void 0 && locale.hourCycles && locale.hourCycles.length) {
        hourCycle = locale.hourCycles[0];
      }
      if (hourCycle) {
        switch (hourCycle) {
          case "h24":
            return "k";
          case "h23":
            return "H";
          case "h12":
            return "h";
          case "h11":
            return "K";
          default:
            throw new Error("Invalid hourCycle");
        }
      }
      var languageTag = locale.language;
      var regionTag;
      if (languageTag !== "root") {
        regionTag = locale.maximize().region;
      }
      var hourCycles = time_data_generated_1.timeData[regionTag || ""] || time_data_generated_1.timeData[languageTag || ""] || time_data_generated_1.timeData["".concat(languageTag, "-001")] || time_data_generated_1.timeData["001"];
      return hourCycles[0];
    }
  }
});

// node_modules/@formatjs/icu-messageformat-parser/parser.js
var require_parser = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/parser.js"(exports2) {
    "use strict";
    var _a;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Parser = void 0;
    var tslib_1 = require_tslib();
    var error_1 = require_error();
    var types_1 = require_types2();
    var regex_generated_1 = require_regex_generated();
    var icu_skeleton_parser_1 = require_icu_skeleton_parser();
    var date_time_pattern_generator_1 = require_date_time_pattern_generator();
    var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(regex_generated_1.SPACE_SEPARATOR_REGEX.source, "*"));
    var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(regex_generated_1.SPACE_SEPARATOR_REGEX.source, "*$"));
    function createLocation(start, end) {
      return { start, end };
    }
    var hasNativeStartsWith = !!String.prototype.startsWith;
    var hasNativeFromCodePoint = !!String.fromCodePoint;
    var hasNativeFromEntries = !!Object.fromEntries;
    var hasNativeCodePointAt = !!String.prototype.codePointAt;
    var hasTrimStart = !!String.prototype.trimStart;
    var hasTrimEnd = !!String.prototype.trimEnd;
    var hasNativeIsSafeInteger = !!Number.isSafeInteger;
    var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n && Math.abs(n) <= 9007199254740991;
    };
    var REGEX_SUPPORTS_U_AND_Y = true;
    try {
      re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
      REGEX_SUPPORTS_U_AND_Y = ((_a = re.exec("a")) === null || _a === void 0 ? void 0 : _a[0]) === "a";
    } catch (_) {
      REGEX_SUPPORTS_U_AND_Y = false;
    }
    var re;
    var startsWith = hasNativeStartsWith ? function startsWith2(s2, search, position) {
      return s2.startsWith(search, position);
    } : function startsWith2(s2, search, position) {
      return s2.slice(position, position + search.length) === search;
    };
    var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : function fromCodePoint2() {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
      }
      var elements = "";
      var length = codePoints.length;
      var i2 = 0;
      var code;
      while (length > i2) {
        code = codePoints[i2++];
        if (code > 1114111)
          throw RangeError(code + " is not a valid code point");
        elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
      }
      return elements;
    };
    var fromEntries = hasNativeFromEntries ? Object.fromEntries : function fromEntries2(entries) {
      var obj = {};
      for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
        var _a2 = entries_1[_i], k = _a2[0], v = _a2[1];
        obj[k] = v;
      }
      return obj;
    };
    var codePointAt = hasNativeCodePointAt ? function codePointAt2(s2, index) {
      return s2.codePointAt(index);
    } : function codePointAt2(s2, index) {
      var size = s2.length;
      if (index < 0 || index >= size) {
        return void 0;
      }
      var first = s2.charCodeAt(index);
      var second;
      return first < 55296 || first > 56319 || index + 1 === size || (second = s2.charCodeAt(index + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
    };
    var trimStart = hasTrimStart ? function trimStart2(s2) {
      return s2.trimStart();
    } : function trimStart2(s2) {
      return s2.replace(SPACE_SEPARATOR_START_REGEX, "");
    };
    var trimEnd = hasTrimEnd ? function trimEnd2(s2) {
      return s2.trimEnd();
    } : function trimEnd2(s2) {
      return s2.replace(SPACE_SEPARATOR_END_REGEX, "");
    };
    function RE(s2, flag) {
      return new RegExp(s2, flag);
    }
    var matchIdentifierAtIndex;
    if (REGEX_SUPPORTS_U_AND_Y) {
      IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
      matchIdentifierAtIndex = function matchIdentifierAtIndex2(s2, index) {
        var _a2;
        IDENTIFIER_PREFIX_RE_1.lastIndex = index;
        var match = IDENTIFIER_PREFIX_RE_1.exec(s2);
        return (_a2 = match[1]) !== null && _a2 !== void 0 ? _a2 : "";
      };
    } else {
      matchIdentifierAtIndex = function matchIdentifierAtIndex2(s2, index) {
        var match = [];
        while (true) {
          var c = codePointAt(s2, index);
          if (c === void 0 || _isWhiteSpace(c) || _isPatternSyntax(c)) {
            break;
          }
          match.push(c);
          index += c >= 65536 ? 2 : 1;
        }
        return fromCodePoint.apply(void 0, match);
      };
    }
    var IDENTIFIER_PREFIX_RE_1;
    var Parser = function() {
      function Parser2(message, options) {
        if (options === void 0) {
          options = {};
        }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
      }
      Parser2.prototype.parse = function() {
        if (this.offset() !== 0) {
          throw Error("parser can only be used once");
        }
        return this.parseMessage(0, "", false);
      };
      Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
          var char = this.char();
          if (char === 123) {
            var result = this.parseArgument(nestingLevel, expectingCloseTag);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          } else if (char === 125 && nestingLevel > 0) {
            break;
          } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
            var position = this.clonePosition();
            this.bump();
            elements.push({
              type: types_1.TYPE.pound,
              location: createLocation(position, this.clonePosition())
            });
          } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
            if (expectingCloseTag) {
              break;
            } else {
              return this.error(error_1.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
            }
          } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
            var result = this.parseTag(nestingLevel, parentArgType);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          } else {
            var result = this.parseLiteral(nestingLevel, parentArgType);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          }
        }
        return { val: elements, err: null };
      };
      Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump();
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf("/>")) {
          return {
            val: {
              type: types_1.TYPE.literal,
              value: "<".concat(tagName, "/>"),
              location: createLocation(startPosition, this.clonePosition())
            },
            err: null
          };
        } else if (this.bumpIf(">")) {
          var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
          if (childrenResult.err) {
            return childrenResult;
          }
          var children = childrenResult.val;
          var endTagStartPosition = this.clonePosition();
          if (this.bumpIf("</")) {
            if (this.isEOF() || !_isAlpha(this.char())) {
              return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
            }
            var closingTagNameStartPosition = this.clonePosition();
            var closingTagName = this.parseTagName();
            if (tagName !== closingTagName) {
              return this.error(error_1.ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
            }
            this.bumpSpace();
            if (!this.bumpIf(">")) {
              return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
            }
            return {
              val: {
                type: types_1.TYPE.tag,
                value: tagName,
                children,
                location: createLocation(startPosition, this.clonePosition())
              },
              err: null
            };
          } else {
            return this.error(error_1.ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
          }
        } else {
          return this.error(error_1.ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
      };
      Parser2.prototype.parseTagName = function() {
        var startOffset = this.offset();
        this.bump();
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
          this.bump();
        }
        return this.message.slice(startOffset, this.offset());
      };
      Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = "";
        while (true) {
          var parseQuoteResult = this.tryParseQuote(parentArgType);
          if (parseQuoteResult) {
            value += parseQuoteResult;
            continue;
          }
          var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
          if (parseUnquotedResult) {
            value += parseUnquotedResult;
            continue;
          }
          var parseLeftAngleResult = this.tryParseLeftAngleBracket();
          if (parseLeftAngleResult) {
            value += parseLeftAngleResult;
            continue;
          }
          break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
          val: { type: types_1.TYPE.literal, value, location },
          err: null
        };
      };
      Parser2.prototype.tryParseLeftAngleBracket = function() {
        if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || !_isAlphaOrSlash(this.peek() || 0))) {
          this.bump();
          return "<";
        }
        return null;
      };
      Parser2.prototype.tryParseQuote = function(parentArgType) {
        if (this.isEOF() || this.char() !== 39) {
          return null;
        }
        switch (this.peek()) {
          case 39:
            this.bump();
            this.bump();
            return "'";
          case 123:
          case 60:
          case 62:
          case 125:
            break;
          case 35:
            if (parentArgType === "plural" || parentArgType === "selectordinal") {
              break;
            }
            return null;
          default:
            return null;
        }
        this.bump();
        var codePoints = [this.char()];
        this.bump();
        while (!this.isEOF()) {
          var ch = this.char();
          if (ch === 39) {
            if (this.peek() === 39) {
              codePoints.push(39);
              this.bump();
            } else {
              this.bump();
              break;
            }
          } else {
            codePoints.push(ch);
          }
          this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
      };
      Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
        if (this.isEOF()) {
          return null;
        }
        var ch = this.char();
        if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
          return null;
        } else {
          this.bump();
          return fromCodePoint(ch);
        }
      };
      Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125) {
          this.bump();
          return this.error(error_1.ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
          return this.error(error_1.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
          case 125: {
            this.bump();
            return {
              val: {
                type: types_1.TYPE.argument,
                value,
                location: createLocation(openingBracePosition, this.clonePosition())
              },
              err: null
            };
          }
          case 44: {
            this.bump();
            this.bumpSpace();
            if (this.isEOF()) {
              return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
            }
            return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
          }
          default:
            return this.error(error_1.ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
      };
      Parser2.prototype.parseIdentifierIfPossible = function() {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value, location };
      };
      Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a2;
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
          case "":
            return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
          case "number":
          case "date":
          case "time": {
            this.bumpSpace();
            var styleAndLocation = null;
            if (this.bumpIf(",")) {
              this.bumpSpace();
              var styleStartPosition = this.clonePosition();
              var result = this.parseSimpleArgStyleIfPossible();
              if (result.err) {
                return result;
              }
              var style = trimEnd(result.val);
              if (style.length === 0) {
                return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
              }
              var styleLocation = createLocation(styleStartPosition, this.clonePosition());
              styleAndLocation = { style, styleLocation };
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            var location_1 = createLocation(openingBracePosition, this.clonePosition());
            if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
              var skeleton = trimStart(styleAndLocation.style.slice(2));
              if (argType === "number") {
                var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                if (result.err) {
                  return result;
                }
                return {
                  val: { type: types_1.TYPE.number, value, location: location_1, style: result.val },
                  err: null
                };
              } else {
                if (skeleton.length === 0) {
                  return this.error(error_1.ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                }
                var dateTimePattern = skeleton;
                if (this.locale) {
                  dateTimePattern = (0, date_time_pattern_generator_1.getBestPattern)(skeleton, this.locale);
                }
                var style = {
                  type: types_1.SKELETON_TYPE.dateTime,
                  pattern: dateTimePattern,
                  location: styleAndLocation.styleLocation,
                  parsedOptions: this.shouldParseSkeletons ? (0, icu_skeleton_parser_1.parseDateTimeSkeleton)(dateTimePattern) : {}
                };
                var type = argType === "date" ? types_1.TYPE.date : types_1.TYPE.time;
                return {
                  val: { type, value, location: location_1, style },
                  err: null
                };
              }
            }
            return {
              val: {
                type: argType === "number" ? types_1.TYPE.number : argType === "date" ? types_1.TYPE.date : types_1.TYPE.time,
                value,
                location: location_1,
                style: (_a2 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a2 !== void 0 ? _a2 : null
              },
              err: null
            };
          }
          case "plural":
          case "selectordinal":
          case "select": {
            var typeEndPosition_1 = this.clonePosition();
            this.bumpSpace();
            if (!this.bumpIf(",")) {
              return this.error(error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, (0, tslib_1.__assign)({}, typeEndPosition_1)));
            }
            this.bumpSpace();
            var identifierAndLocation = this.parseIdentifierIfPossible();
            var pluralOffset = 0;
            if (argType !== "select" && identifierAndLocation.value === "offset") {
              if (!this.bumpIf(":")) {
                return this.error(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
              }
              this.bumpSpace();
              var result = this.tryParseDecimalInteger(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, error_1.ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
              if (result.err) {
                return result;
              }
              this.bumpSpace();
              identifierAndLocation = this.parseIdentifierIfPossible();
              pluralOffset = result.val;
            }
            var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
            if (optionsResult.err) {
              return optionsResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            var location_2 = createLocation(openingBracePosition, this.clonePosition());
            if (argType === "select") {
              return {
                val: {
                  type: types_1.TYPE.select,
                  value,
                  options: fromEntries(optionsResult.val),
                  location: location_2
                },
                err: null
              };
            } else {
              return {
                val: {
                  type: types_1.TYPE.plural,
                  value,
                  options: fromEntries(optionsResult.val),
                  offset: pluralOffset,
                  pluralType: argType === "plural" ? "cardinal" : "ordinal",
                  location: location_2
                },
                err: null
              };
            }
          }
          default:
            return this.error(error_1.ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
      };
      Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
        if (this.isEOF() || this.char() !== 125) {
          return this.error(error_1.ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump();
        return { val: true, err: null };
      };
      Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
          var ch = this.char();
          switch (ch) {
            case 39: {
              this.bump();
              var apostrophePosition = this.clonePosition();
              if (!this.bumpUntil("'")) {
                return this.error(error_1.ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
              }
              this.bump();
              break;
            }
            case 123: {
              nestedBraces += 1;
              this.bump();
              break;
            }
            case 125: {
              if (nestedBraces > 0) {
                nestedBraces -= 1;
              } else {
                return {
                  val: this.message.slice(startPosition.offset, this.offset()),
                  err: null
                };
              }
              break;
            }
            default:
              this.bump();
              break;
          }
        }
        return {
          val: this.message.slice(startPosition.offset, this.offset()),
          err: null
        };
      };
      Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
        var tokens = [];
        try {
          tokens = (0, icu_skeleton_parser_1.parseNumberSkeletonFromString)(skeleton);
        } catch (e2) {
          return this.error(error_1.ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
          val: {
            type: types_1.SKELETON_TYPE.number,
            tokens,
            location,
            parsedOptions: this.shouldParseSkeletons ? (0, icu_skeleton_parser_1.parseNumberSkeleton)(tokens) : {}
          },
          err: null
        };
      };
      Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a2;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = /* @__PURE__ */ new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        while (true) {
          if (selector.length === 0) {
            var startPosition = this.clonePosition();
            if (parentArgType !== "select" && this.bumpIf("=")) {
              var result = this.tryParseDecimalInteger(error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, error_1.ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
              if (result.err) {
                return result;
              }
              selectorLocation = createLocation(startPosition, this.clonePosition());
              selector = this.message.slice(startPosition.offset, this.offset());
            } else {
              break;
            }
          }
          if (parsedSelectors.has(selector)) {
            return this.error(parentArgType === "select" ? error_1.ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : error_1.ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
          }
          if (selector === "other") {
            hasOtherClause = true;
          }
          this.bumpSpace();
          var openingBracePosition = this.clonePosition();
          if (!this.bumpIf("{")) {
            return this.error(parentArgType === "select" ? error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
          }
          var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
          if (fragmentResult.err) {
            return fragmentResult;
          }
          var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
          if (argCloseResult.err) {
            return argCloseResult;
          }
          options.push([
            selector,
            {
              value: fragmentResult.val,
              location: createLocation(openingBracePosition, this.clonePosition())
            }
          ]);
          parsedSelectors.add(selector);
          this.bumpSpace();
          _a2 = this.parseIdentifierIfPossible(), selector = _a2.value, selectorLocation = _a2.location;
        }
        if (options.length === 0) {
          return this.error(parentArgType === "select" ? error_1.ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : error_1.ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
          return this.error(error_1.ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
      };
      Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf("+")) {
        } else if (this.bumpIf("-")) {
          sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
          var ch = this.char();
          if (ch >= 48 && ch <= 57) {
            hasDigits = true;
            decimal = decimal * 10 + (ch - 48);
            this.bump();
          } else {
            break;
          }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
          return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
          return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
      };
      Parser2.prototype.offset = function() {
        return this.position.offset;
      };
      Parser2.prototype.isEOF = function() {
        return this.offset() === this.message.length;
      };
      Parser2.prototype.clonePosition = function() {
        return {
          offset: this.position.offset,
          line: this.position.line,
          column: this.position.column
        };
      };
      Parser2.prototype.char = function() {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
          throw Error("out of bound");
        }
        var code = codePointAt(this.message, offset);
        if (code === void 0) {
          throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
        }
        return code;
      };
      Parser2.prototype.error = function(kind, location) {
        return {
          val: null,
          err: {
            kind,
            message: this.message,
            location
          }
        };
      };
      Parser2.prototype.bump = function() {
        if (this.isEOF()) {
          return;
        }
        var code = this.char();
        if (code === 10) {
          this.position.line += 1;
          this.position.column = 1;
          this.position.offset += 1;
        } else {
          this.position.column += 1;
          this.position.offset += code < 65536 ? 1 : 2;
        }
      };
      Parser2.prototype.bumpIf = function(prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
          for (var i2 = 0; i2 < prefix.length; i2++) {
            this.bump();
          }
          return true;
        }
        return false;
      };
      Parser2.prototype.bumpUntil = function(pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
          this.bumpTo(index);
          return true;
        } else {
          this.bumpTo(this.message.length);
          return false;
        }
      };
      Parser2.prototype.bumpTo = function(targetOffset) {
        if (this.offset() > targetOffset) {
          throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
          var offset = this.offset();
          if (offset === targetOffset) {
            break;
          }
          if (offset > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
          }
          this.bump();
          if (this.isEOF()) {
            break;
          }
        }
      };
      Parser2.prototype.bumpSpace = function() {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
          this.bump();
        }
      };
      Parser2.prototype.peek = function() {
        if (this.isEOF()) {
          return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
      };
      return Parser2;
    }();
    exports2.Parser = Parser;
    function _isAlpha(codepoint) {
      return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
    }
    function _isAlphaOrSlash(codepoint) {
      return _isAlpha(codepoint) || codepoint === 47;
    }
    function _isPotentialElementNameChar(c) {
      return c === 45 || c === 46 || c >= 48 && c <= 57 || c === 95 || c >= 97 && c <= 122 || c >= 65 && c <= 90 || c == 183 || c >= 192 && c <= 214 || c >= 216 && c <= 246 || c >= 248 && c <= 893 || c >= 895 && c <= 8191 || c >= 8204 && c <= 8205 || c >= 8255 && c <= 8256 || c >= 8304 && c <= 8591 || c >= 11264 && c <= 12271 || c >= 12289 && c <= 55295 || c >= 63744 && c <= 64975 || c >= 65008 && c <= 65533 || c >= 65536 && c <= 983039;
    }
    function _isWhiteSpace(c) {
      return c >= 9 && c <= 13 || c === 32 || c === 133 || c >= 8206 && c <= 8207 || c === 8232 || c === 8233;
    }
    function _isPatternSyntax(c) {
      return c >= 33 && c <= 35 || c === 36 || c >= 37 && c <= 39 || c === 40 || c === 41 || c === 42 || c === 43 || c === 44 || c === 45 || c >= 46 && c <= 47 || c >= 58 && c <= 59 || c >= 60 && c <= 62 || c >= 63 && c <= 64 || c === 91 || c === 92 || c === 93 || c === 94 || c === 96 || c === 123 || c === 124 || c === 125 || c === 126 || c === 161 || c >= 162 && c <= 165 || c === 166 || c === 167 || c === 169 || c === 171 || c === 172 || c === 174 || c === 176 || c === 177 || c === 182 || c === 187 || c === 191 || c === 215 || c === 247 || c >= 8208 && c <= 8213 || c >= 8214 && c <= 8215 || c === 8216 || c === 8217 || c === 8218 || c >= 8219 && c <= 8220 || c === 8221 || c === 8222 || c === 8223 || c >= 8224 && c <= 8231 || c >= 8240 && c <= 8248 || c === 8249 || c === 8250 || c >= 8251 && c <= 8254 || c >= 8257 && c <= 8259 || c === 8260 || c === 8261 || c === 8262 || c >= 8263 && c <= 8273 || c === 8274 || c === 8275 || c >= 8277 && c <= 8286 || c >= 8592 && c <= 8596 || c >= 8597 && c <= 8601 || c >= 8602 && c <= 8603 || c >= 8604 && c <= 8607 || c === 8608 || c >= 8609 && c <= 8610 || c === 8611 || c >= 8612 && c <= 8613 || c === 8614 || c >= 8615 && c <= 8621 || c === 8622 || c >= 8623 && c <= 8653 || c >= 8654 && c <= 8655 || c >= 8656 && c <= 8657 || c === 8658 || c === 8659 || c === 8660 || c >= 8661 && c <= 8691 || c >= 8692 && c <= 8959 || c >= 8960 && c <= 8967 || c === 8968 || c === 8969 || c === 8970 || c === 8971 || c >= 8972 && c <= 8991 || c >= 8992 && c <= 8993 || c >= 8994 && c <= 9e3 || c === 9001 || c === 9002 || c >= 9003 && c <= 9083 || c === 9084 || c >= 9085 && c <= 9114 || c >= 9115 && c <= 9139 || c >= 9140 && c <= 9179 || c >= 9180 && c <= 9185 || c >= 9186 && c <= 9254 || c >= 9255 && c <= 9279 || c >= 9280 && c <= 9290 || c >= 9291 && c <= 9311 || c >= 9472 && c <= 9654 || c === 9655 || c >= 9656 && c <= 9664 || c === 9665 || c >= 9666 && c <= 9719 || c >= 9720 && c <= 9727 || c >= 9728 && c <= 9838 || c === 9839 || c >= 9840 && c <= 10087 || c === 10088 || c === 10089 || c === 10090 || c === 10091 || c === 10092 || c === 10093 || c === 10094 || c === 10095 || c === 10096 || c === 10097 || c === 10098 || c === 10099 || c === 10100 || c === 10101 || c >= 10132 && c <= 10175 || c >= 10176 && c <= 10180 || c === 10181 || c === 10182 || c >= 10183 && c <= 10213 || c === 10214 || c === 10215 || c === 10216 || c === 10217 || c === 10218 || c === 10219 || c === 10220 || c === 10221 || c === 10222 || c === 10223 || c >= 10224 && c <= 10239 || c >= 10240 && c <= 10495 || c >= 10496 && c <= 10626 || c === 10627 || c === 10628 || c === 10629 || c === 10630 || c === 10631 || c === 10632 || c === 10633 || c === 10634 || c === 10635 || c === 10636 || c === 10637 || c === 10638 || c === 10639 || c === 10640 || c === 10641 || c === 10642 || c === 10643 || c === 10644 || c === 10645 || c === 10646 || c === 10647 || c === 10648 || c >= 10649 && c <= 10711 || c === 10712 || c === 10713 || c === 10714 || c === 10715 || c >= 10716 && c <= 10747 || c === 10748 || c === 10749 || c >= 10750 && c <= 11007 || c >= 11008 && c <= 11055 || c >= 11056 && c <= 11076 || c >= 11077 && c <= 11078 || c >= 11079 && c <= 11084 || c >= 11085 && c <= 11123 || c >= 11124 && c <= 11125 || c >= 11126 && c <= 11157 || c === 11158 || c >= 11159 && c <= 11263 || c >= 11776 && c <= 11777 || c === 11778 || c === 11779 || c === 11780 || c === 11781 || c >= 11782 && c <= 11784 || c === 11785 || c === 11786 || c === 11787 || c === 11788 || c === 11789 || c >= 11790 && c <= 11798 || c === 11799 || c >= 11800 && c <= 11801 || c === 11802 || c === 11803 || c === 11804 || c === 11805 || c >= 11806 && c <= 11807 || c === 11808 || c === 11809 || c === 11810 || c === 11811 || c === 11812 || c === 11813 || c === 11814 || c === 11815 || c === 11816 || c === 11817 || c >= 11818 && c <= 11822 || c === 11823 || c >= 11824 && c <= 11833 || c >= 11834 && c <= 11835 || c >= 11836 && c <= 11839 || c === 11840 || c === 11841 || c === 11842 || c >= 11843 && c <= 11855 || c >= 11856 && c <= 11857 || c === 11858 || c >= 11859 && c <= 11903 || c >= 12289 && c <= 12291 || c === 12296 || c === 12297 || c === 12298 || c === 12299 || c === 12300 || c === 12301 || c === 12302 || c === 12303 || c === 12304 || c === 12305 || c >= 12306 && c <= 12307 || c === 12308 || c === 12309 || c === 12310 || c === 12311 || c === 12312 || c === 12313 || c === 12314 || c === 12315 || c === 12316 || c === 12317 || c >= 12318 && c <= 12319 || c === 12320 || c === 12336 || c === 64830 || c === 64831 || c >= 65093 && c <= 65094;
    }
  }
});

// node_modules/@formatjs/icu-messageformat-parser/index.js
var require_icu_messageformat_parser = __commonJS({
  "node_modules/@formatjs/icu-messageformat-parser/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.parse = void 0;
    var tslib_1 = require_tslib();
    var error_1 = require_error();
    var parser_1 = require_parser();
    var types_1 = require_types2();
    function pruneLocation(els) {
      els.forEach(function(el) {
        delete el.location;
        if ((0, types_1.isSelectElement)(el) || (0, types_1.isPluralElement)(el)) {
          for (var k in el.options) {
            delete el.options[k].location;
            pruneLocation(el.options[k].value);
          }
        } else if ((0, types_1.isNumberElement)(el) && (0, types_1.isNumberSkeleton)(el.style)) {
          delete el.style.location;
        } else if (((0, types_1.isDateElement)(el) || (0, types_1.isTimeElement)(el)) && (0, types_1.isDateTimeSkeleton)(el.style)) {
          delete el.style.location;
        } else if ((0, types_1.isTagElement)(el)) {
          pruneLocation(el.children);
        }
      });
    }
    function parse(message, opts) {
      if (opts === void 0) {
        opts = {};
      }
      opts = (0, tslib_1.__assign)({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
      var result = new parser_1.Parser(message, opts).parse();
      if (result.err) {
        var error = SyntaxError(error_1.ErrorKind[result.err.kind]);
        error.location = result.err.location;
        error.originalMessage = result.err.message;
        throw error;
      }
      if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
        pruneLocation(result.val);
      }
      return result.val;
    }
    exports2.parse = parse;
    (0, tslib_1.__exportStar)(require_types2(), exports2);
  }
});

// node_modules/@formatjs/fast-memoize/index.js
var require_fast_memoize = __commonJS({
  "node_modules/@formatjs/fast-memoize/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.strategies = void 0;
    function memoize(fn, options) {
      var cache = options && options.cache ? options.cache : cacheDefault;
      var serializer = options && options.serializer ? options.serializer : serializerDefault;
      var strategy = options && options.strategy ? options.strategy : strategyDefault;
      return strategy(fn, {
        cache,
        serializer
      });
    }
    exports2.default = memoize;
    function isPrimitive(value) {
      return value == null || typeof value === "number" || typeof value === "boolean";
    }
    function monadic(fn, cache, serializer, arg) {
      var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    function variadic(fn, cache, serializer) {
      var args = Array.prototype.slice.call(arguments, 3);
      var cacheKey = serializer(args);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    function assemble(fn, context, strategy, cache, serialize) {
      return strategy.bind(context, fn, cache, serialize);
    }
    function strategyDefault(fn, options) {
      var strategy = fn.length === 1 ? monadic : variadic;
      return assemble(fn, this, strategy, options.cache.create(), options.serializer);
    }
    function strategyVariadic(fn, options) {
      return assemble(fn, this, variadic, options.cache.create(), options.serializer);
    }
    function strategyMonadic(fn, options) {
      return assemble(fn, this, monadic, options.cache.create(), options.serializer);
    }
    var serializerDefault = function() {
      return JSON.stringify(arguments);
    };
    function ObjectWithoutPrototypeCache() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    ObjectWithoutPrototypeCache.prototype.get = function(key) {
      return this.cache[key];
    };
    ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
      this.cache[key] = value;
    };
    var cacheDefault = {
      create: function create() {
        return new ObjectWithoutPrototypeCache();
      }
    };
    exports2.strategies = {
      variadic: strategyVariadic,
      monadic: strategyMonadic
    };
  }
});

// node_modules/intl-messageformat/src/error.js
var require_error2 = __commonJS({
  "node_modules/intl-messageformat/src/error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MissingValueError = exports2.InvalidValueTypeError = exports2.InvalidValueError = exports2.FormatError = exports2.ErrorCode = void 0;
    var tslib_1 = require_tslib();
    var ErrorCode;
    (function(ErrorCode2) {
      ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
      ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
      ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
    })(ErrorCode = exports2.ErrorCode || (exports2.ErrorCode = {}));
    var FormatError = function(_super) {
      (0, tslib_1.__extends)(FormatError2, _super);
      function FormatError2(msg, code, originalMessage) {
        var _this = _super.call(this, msg) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
      }
      FormatError2.prototype.toString = function() {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
      };
      return FormatError2;
    }(Error);
    exports2.FormatError = FormatError;
    var InvalidValueError = function(_super) {
      (0, tslib_1.__extends)(InvalidValueError2, _super);
      function InvalidValueError2(variableId, value, options, originalMessage) {
        return _super.call(this, 'Invalid values for "'.concat(variableId, '": "').concat(value, '". Options are "').concat(Object.keys(options).join('", "'), '"'), ErrorCode.INVALID_VALUE, originalMessage) || this;
      }
      return InvalidValueError2;
    }(FormatError);
    exports2.InvalidValueError = InvalidValueError;
    var InvalidValueTypeError = function(_super) {
      (0, tslib_1.__extends)(InvalidValueTypeError2, _super);
      function InvalidValueTypeError2(value, type, originalMessage) {
        return _super.call(this, 'Value for "'.concat(value, '" must be of type ').concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
      }
      return InvalidValueTypeError2;
    }(FormatError);
    exports2.InvalidValueTypeError = InvalidValueTypeError;
    var MissingValueError = function(_super) {
      (0, tslib_1.__extends)(MissingValueError2, _super);
      function MissingValueError2(variableId, originalMessage) {
        return _super.call(this, 'The intl string context variable "'.concat(variableId, '" was not provided to the string "').concat(originalMessage, '"'), ErrorCode.MISSING_VALUE, originalMessage) || this;
      }
      return MissingValueError2;
    }(FormatError);
    exports2.MissingValueError = MissingValueError;
  }
});

// node_modules/intl-messageformat/src/formatters.js
var require_formatters = __commonJS({
  "node_modules/intl-messageformat/src/formatters.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatToParts = exports2.isFormatXMLElementFn = exports2.PART_TYPE = void 0;
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    var error_1 = require_error2();
    var PART_TYPE;
    (function(PART_TYPE2) {
      PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
      PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
    })(PART_TYPE = exports2.PART_TYPE || (exports2.PART_TYPE = {}));
    function mergeLiteral(parts) {
      if (parts.length < 2) {
        return parts;
      }
      return parts.reduce(function(all, part) {
        var lastPart = all[all.length - 1];
        if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
          all.push(part);
        } else {
          lastPart.value += part.value;
        }
        return all;
      }, []);
    }
    function isFormatXMLElementFn(el) {
      return typeof el === "function";
    }
    exports2.isFormatXMLElementFn = isFormatXMLElementFn;
    function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
      if (els.length === 1 && (0, icu_messageformat_parser_1.isLiteralElement)(els[0])) {
        return [
          {
            type: PART_TYPE.literal,
            value: els[0].value
          }
        ];
      }
      var result = [];
      for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
        var el = els_1[_i];
        if ((0, icu_messageformat_parser_1.isLiteralElement)(el)) {
          result.push({
            type: PART_TYPE.literal,
            value: el.value
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isPoundElement)(el)) {
          if (typeof currentPluralValue === "number") {
            result.push({
              type: PART_TYPE.literal,
              value: formatters.getNumberFormat(locales).format(currentPluralValue)
            });
          }
          continue;
        }
        var varName = el.value;
        if (!(values && varName in values)) {
          throw new error_1.MissingValueError(varName, originalMessage);
        }
        var value = values[varName];
        if ((0, icu_messageformat_parser_1.isArgumentElement)(el)) {
          if (!value || typeof value === "string" || typeof value === "number") {
            value = typeof value === "string" || typeof value === "number" ? String(value) : "";
          }
          result.push({
            type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
            value
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isDateElement)(el)) {
          var style = typeof el.style === "string" ? formats.date[el.style] : (0, icu_messageformat_parser_1.isDateTimeSkeleton)(el.style) ? el.style.parsedOptions : void 0;
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getDateTimeFormat(locales, style).format(value)
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isTimeElement)(el)) {
          var style = typeof el.style === "string" ? formats.time[el.style] : (0, icu_messageformat_parser_1.isDateTimeSkeleton)(el.style) ? el.style.parsedOptions : formats.time.medium;
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getDateTimeFormat(locales, style).format(value)
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isNumberElement)(el)) {
          var style = typeof el.style === "string" ? formats.number[el.style] : (0, icu_messageformat_parser_1.isNumberSkeleton)(el.style) ? el.style.parsedOptions : void 0;
          if (style && style.scale) {
            value = value * (style.scale || 1);
          }
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getNumberFormat(locales, style).format(value)
          });
          continue;
        }
        if ((0, icu_messageformat_parser_1.isTagElement)(el)) {
          var children = el.children, value_1 = el.value;
          var formatFn = values[value_1];
          if (!isFormatXMLElementFn(formatFn)) {
            throw new error_1.InvalidValueTypeError(value_1, "function", originalMessage);
          }
          var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
          var chunks = formatFn(parts.map(function(p) {
            return p.value;
          }));
          if (!Array.isArray(chunks)) {
            chunks = [chunks];
          }
          result.push.apply(result, chunks.map(function(c) {
            return {
              type: typeof c === "string" ? PART_TYPE.literal : PART_TYPE.object,
              value: c
            };
          }));
        }
        if ((0, icu_messageformat_parser_1.isSelectElement)(el)) {
          var opt = el.options[value] || el.options.other;
          if (!opt) {
            throw new error_1.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
          }
          result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
          continue;
        }
        if ((0, icu_messageformat_parser_1.isPluralElement)(el)) {
          var opt = el.options["=".concat(value)];
          if (!opt) {
            if (!Intl.PluralRules) {
              throw new error_1.FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', error_1.ErrorCode.MISSING_INTL_API, originalMessage);
            }
            var rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(value - (el.offset || 0));
            opt = el.options[rule] || el.options.other;
          }
          if (!opt) {
            throw new error_1.InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
          }
          result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
          continue;
        }
      }
      return mergeLiteral(result);
    }
    exports2.formatToParts = formatToParts;
  }
});

// node_modules/intl-messageformat/src/core.js
var require_core = __commonJS({
  "node_modules/intl-messageformat/src/core.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IntlMessageFormat = void 0;
    var tslib_1 = require_tslib();
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    var fast_memoize_1 = (0, tslib_1.__importStar)(require_fast_memoize());
    var formatters_1 = require_formatters();
    function mergeConfig(c1, c2) {
      if (!c2) {
        return c1;
      }
      return (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, c1 || {}), c2 || {}), Object.keys(c1).reduce(function(all, k) {
        all[k] = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, c1[k]), c2[k] || {});
        return all;
      }, {}));
    }
    function mergeConfigs(defaultConfig, configs) {
      if (!configs) {
        return defaultConfig;
      }
      return Object.keys(defaultConfig).reduce(function(all, k) {
        all[k] = mergeConfig(defaultConfig[k], configs[k]);
        return all;
      }, (0, tslib_1.__assign)({}, defaultConfig));
    }
    function createFastMemoizeCache(store) {
      return {
        create: function() {
          return {
            get: function(key) {
              return store[key];
            },
            set: function(key, value) {
              store[key] = value;
            }
          };
        }
      };
    }
    function createDefaultFormatters(cache) {
      if (cache === void 0) {
        cache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        };
      }
      return {
        getNumberFormat: (0, fast_memoize_1.default)(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.NumberFormat).bind.apply(_a, (0, tslib_1.__spreadArray)([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.number),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getDateTimeFormat: (0, fast_memoize_1.default)(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.DateTimeFormat).bind.apply(_a, (0, tslib_1.__spreadArray)([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.dateTime),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getPluralRules: (0, fast_memoize_1.default)(function() {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new ((_a = Intl.PluralRules).bind.apply(_a, (0, tslib_1.__spreadArray)([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.pluralRules),
          strategy: fast_memoize_1.strategies.variadic
        })
      };
    }
    var IntlMessageFormat = function() {
      function IntlMessageFormat2(message, locales, overrideFormats, opts) {
        var _this = this;
        if (locales === void 0) {
          locales = IntlMessageFormat2.defaultLocale;
        }
        this.formatterCache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        };
        this.format = function(values) {
          var parts = _this.formatToParts(values);
          if (parts.length === 1) {
            return parts[0].value;
          }
          var result = parts.reduce(function(all, part) {
            if (!all.length || part.type !== formatters_1.PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
              all.push(part.value);
            } else {
              all[all.length - 1] += part.value;
            }
            return all;
          }, []);
          if (result.length <= 1) {
            return result[0] || "";
          }
          return result;
        };
        this.formatToParts = function(values) {
          return (0, formatters_1.formatToParts)(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
        };
        this.resolvedOptions = function() {
          var _a;
          return {
            locale: ((_a = _this.resolvedLocale) === null || _a === void 0 ? void 0 : _a.toString()) || Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
          };
        };
        this.getAst = function() {
          return _this.ast;
        };
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat2.resolveLocale(locales);
        if (typeof message === "string") {
          this.message = message;
          if (!IntlMessageFormat2.__parse) {
            throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
          }
          this.ast = IntlMessageFormat2.__parse(message, {
            ignoreTag: opts === null || opts === void 0 ? void 0 : opts.ignoreTag,
            locale: this.resolvedLocale
          });
        } else {
          this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
          throw new TypeError("A message must be provided as a String or AST.");
        }
        this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
        this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
      }
      Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
        get: function() {
          if (!IntlMessageFormat2.memoizedDefaultLocale) {
            IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
          }
          return IntlMessageFormat2.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
      });
      IntlMessageFormat2.memoizedDefaultLocale = null;
      IntlMessageFormat2.resolveLocale = function(locales) {
        if (typeof Intl.Locale === "undefined") {
          return;
        }
        var supportedLocales = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales.length > 0) {
          return new Intl.Locale(supportedLocales[0]);
        }
        return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
      };
      IntlMessageFormat2.__parse = icu_messageformat_parser_1.parse;
      IntlMessageFormat2.formats = {
        number: {
          integer: {
            maximumFractionDigits: 0
          },
          currency: {
            style: "currency"
          },
          percent: {
            style: "percent"
          }
        },
        date: {
          short: {
            month: "numeric",
            day: "numeric",
            year: "2-digit"
          },
          medium: {
            month: "short",
            day: "numeric",
            year: "numeric"
          },
          long: {
            month: "long",
            day: "numeric",
            year: "numeric"
          },
          full: {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        },
        time: {
          short: {
            hour: "numeric",
            minute: "numeric"
          },
          medium: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          },
          long: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          },
          full: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          }
        }
      };
      return IntlMessageFormat2;
    }();
    exports2.IntlMessageFormat = IntlMessageFormat;
  }
});

// node_modules/intl-messageformat/index.js
var require_intl_messageformat = __commonJS({
  "node_modules/intl-messageformat/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    var core_1 = require_core();
    (0, tslib_1.__exportStar)(require_formatters(), exports2);
    (0, tslib_1.__exportStar)(require_core(), exports2);
    (0, tslib_1.__exportStar)(require_error2(), exports2);
    exports2.default = core_1.IntlMessageFormat;
  }
});

// node_modules/@formatjs/intl/src/error.js
var require_error3 = __commonJS({
  "node_modules/@formatjs/intl/src/error.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MissingTranslationError = exports2.MessageFormatError = exports2.IntlFormatError = exports2.MissingDataError = exports2.InvalidConfigError = exports2.UnsupportedFormatterError = exports2.IntlError = exports2.IntlErrorCode = void 0;
    var tslib_1 = require_tslib();
    var IntlErrorCode;
    (function(IntlErrorCode2) {
      IntlErrorCode2["FORMAT_ERROR"] = "FORMAT_ERROR";
      IntlErrorCode2["UNSUPPORTED_FORMATTER"] = "UNSUPPORTED_FORMATTER";
      IntlErrorCode2["INVALID_CONFIG"] = "INVALID_CONFIG";
      IntlErrorCode2["MISSING_DATA"] = "MISSING_DATA";
      IntlErrorCode2["MISSING_TRANSLATION"] = "MISSING_TRANSLATION";
    })(IntlErrorCode = exports2.IntlErrorCode || (exports2.IntlErrorCode = {}));
    var IntlError = function(_super) {
      (0, tslib_1.__extends)(IntlError2, _super);
      function IntlError2(code, message, exception) {
        var _this = this;
        var err = exception ? exception instanceof Error ? exception : new Error(String(exception)) : void 0;
        _this = _super.call(this, "[@formatjs/intl Error ".concat(code, "] ").concat(message, "\n").concat(err ? "\n".concat(err.message, "\n").concat(err.stack) : "")) || this;
        _this.code = code;
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(_this, IntlError2);
        }
        return _this;
      }
      return IntlError2;
    }(Error);
    exports2.IntlError = IntlError;
    var UnsupportedFormatterError = function(_super) {
      (0, tslib_1.__extends)(UnsupportedFormatterError2, _super);
      function UnsupportedFormatterError2(message, exception) {
        return _super.call(this, IntlErrorCode.UNSUPPORTED_FORMATTER, message, exception) || this;
      }
      return UnsupportedFormatterError2;
    }(IntlError);
    exports2.UnsupportedFormatterError = UnsupportedFormatterError;
    var InvalidConfigError = function(_super) {
      (0, tslib_1.__extends)(InvalidConfigError2, _super);
      function InvalidConfigError2(message, exception) {
        return _super.call(this, IntlErrorCode.INVALID_CONFIG, message, exception) || this;
      }
      return InvalidConfigError2;
    }(IntlError);
    exports2.InvalidConfigError = InvalidConfigError;
    var MissingDataError = function(_super) {
      (0, tslib_1.__extends)(MissingDataError2, _super);
      function MissingDataError2(message, exception) {
        return _super.call(this, IntlErrorCode.MISSING_DATA, message, exception) || this;
      }
      return MissingDataError2;
    }(IntlError);
    exports2.MissingDataError = MissingDataError;
    var IntlFormatError = function(_super) {
      (0, tslib_1.__extends)(IntlFormatError2, _super);
      function IntlFormatError2(message, locale, exception) {
        return _super.call(this, IntlErrorCode.FORMAT_ERROR, "".concat(message, "\nLocale: ").concat(locale, "\n"), exception) || this;
      }
      return IntlFormatError2;
    }(IntlError);
    exports2.IntlFormatError = IntlFormatError;
    var MessageFormatError = function(_super) {
      (0, tslib_1.__extends)(MessageFormatError2, _super);
      function MessageFormatError2(message, locale, descriptor, exception) {
        var _this = _super.call(this, "".concat(message, "\nMessageID: ").concat(descriptor === null || descriptor === void 0 ? void 0 : descriptor.id, "\nDefault Message: ").concat(descriptor === null || descriptor === void 0 ? void 0 : descriptor.defaultMessage, "\nDescription: ").concat(descriptor === null || descriptor === void 0 ? void 0 : descriptor.description, "\n"), locale, exception) || this;
        _this.descriptor = descriptor;
        return _this;
      }
      return MessageFormatError2;
    }(IntlFormatError);
    exports2.MessageFormatError = MessageFormatError;
    var MissingTranslationError = function(_super) {
      (0, tslib_1.__extends)(MissingTranslationError2, _super);
      function MissingTranslationError2(descriptor, locale) {
        var _this = _super.call(this, IntlErrorCode.MISSING_TRANSLATION, 'Missing message: "'.concat(descriptor.id, '" for locale "').concat(locale, '", using ').concat(descriptor.defaultMessage ? "default message (".concat(typeof descriptor.defaultMessage === "string" ? descriptor.defaultMessage : descriptor.defaultMessage.map(function(e2) {
          var _a;
          return (_a = e2.value) !== null && _a !== void 0 ? _a : JSON.stringify(e2);
        }).join(), ")") : "id", " as fallback.")) || this;
        _this.descriptor = descriptor;
        return _this;
      }
      return MissingTranslationError2;
    }(IntlError);
    exports2.MissingTranslationError = MissingTranslationError;
  }
});

// node_modules/@formatjs/intl/src/utils.js
var require_utils = __commonJS({
  "node_modules/@formatjs/intl/src/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getNamedFormat = exports2.createFormatters = exports2.createIntlCache = exports2.DEFAULT_INTL_CONFIG = exports2.filterProps = void 0;
    var tslib_1 = require_tslib();
    var intl_messageformat_1 = require_intl_messageformat();
    var fast_memoize_1 = (0, tslib_1.__importStar)(require_fast_memoize());
    var error_1 = require_error3();
    function filterProps(props, allowlist, defaults) {
      if (defaults === void 0) {
        defaults = {};
      }
      return allowlist.reduce(function(filtered, name) {
        if (name in props) {
          filtered[name] = props[name];
        } else if (name in defaults) {
          filtered[name] = defaults[name];
        }
        return filtered;
      }, {});
    }
    exports2.filterProps = filterProps;
    var defaultErrorHandler = function(error) {
      if (process.env.NODE_ENV !== "production") {
        console.error(error);
      }
    };
    var defaultWarnHandler = function(warning) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(warning);
      }
    };
    exports2.DEFAULT_INTL_CONFIG = {
      formats: {},
      messages: {},
      timeZone: void 0,
      defaultLocale: "en",
      defaultFormats: {},
      fallbackOnEmptyString: true,
      onError: defaultErrorHandler,
      onWarn: defaultWarnHandler
    };
    function createIntlCache() {
      return {
        dateTime: {},
        number: {},
        message: {},
        relativeTime: {},
        pluralRules: {},
        list: {},
        displayNames: {}
      };
    }
    exports2.createIntlCache = createIntlCache;
    function createFastMemoizeCache(store) {
      return {
        create: function() {
          return {
            get: function(key) {
              return store[key];
            },
            set: function(key, value) {
              store[key] = value;
            }
          };
        }
      };
    }
    function createFormatters(cache) {
      if (cache === void 0) {
        cache = createIntlCache();
      }
      var RelativeTimeFormat = Intl.RelativeTimeFormat;
      var ListFormat = Intl.ListFormat;
      var DisplayNames = Intl.DisplayNames;
      var getDateTimeFormat = (0, fast_memoize_1.default)(function() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new ((_a = Intl.DateTimeFormat).bind.apply(_a, (0, tslib_1.__spreadArray)([void 0], args, false)))();
      }, {
        cache: createFastMemoizeCache(cache.dateTime),
        strategy: fast_memoize_1.strategies.variadic
      });
      var getNumberFormat = (0, fast_memoize_1.default)(function() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new ((_a = Intl.NumberFormat).bind.apply(_a, (0, tslib_1.__spreadArray)([void 0], args, false)))();
      }, {
        cache: createFastMemoizeCache(cache.number),
        strategy: fast_memoize_1.strategies.variadic
      });
      var getPluralRules = (0, fast_memoize_1.default)(function() {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new ((_a = Intl.PluralRules).bind.apply(_a, (0, tslib_1.__spreadArray)([void 0], args, false)))();
      }, {
        cache: createFastMemoizeCache(cache.pluralRules),
        strategy: fast_memoize_1.strategies.variadic
      });
      return {
        getDateTimeFormat,
        getNumberFormat,
        getMessageFormat: (0, fast_memoize_1.default)(function(message, locales, overrideFormats, opts) {
          return new intl_messageformat_1.IntlMessageFormat(message, locales, overrideFormats, (0, tslib_1.__assign)({ formatters: {
            getNumberFormat,
            getDateTimeFormat,
            getPluralRules
          } }, opts || {}));
        }, {
          cache: createFastMemoizeCache(cache.message),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getRelativeTimeFormat: (0, fast_memoize_1.default)(function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new (RelativeTimeFormat.bind.apply(RelativeTimeFormat, (0, tslib_1.__spreadArray)([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.relativeTime),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getPluralRules,
        getListFormat: (0, fast_memoize_1.default)(function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new (ListFormat.bind.apply(ListFormat, (0, tslib_1.__spreadArray)([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.list),
          strategy: fast_memoize_1.strategies.variadic
        }),
        getDisplayNames: (0, fast_memoize_1.default)(function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return new (DisplayNames.bind.apply(DisplayNames, (0, tslib_1.__spreadArray)([void 0], args, false)))();
        }, {
          cache: createFastMemoizeCache(cache.displayNames),
          strategy: fast_memoize_1.strategies.variadic
        })
      };
    }
    exports2.createFormatters = createFormatters;
    function getNamedFormat(formats, type, name, onError) {
      var formatType = formats && formats[type];
      var format;
      if (formatType) {
        format = formatType[name];
      }
      if (format) {
        return format;
      }
      onError(new error_1.UnsupportedFormatterError("No ".concat(type, " format named: ").concat(name)));
    }
    exports2.getNamedFormat = getNamedFormat;
  }
});

// node_modules/@formatjs/ecma402-abstract/CanonicalizeLocaleList.js
var require_CanonicalizeLocaleList = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/CanonicalizeLocaleList.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CanonicalizeLocaleList = void 0;
    function CanonicalizeLocaleList(locales) {
      return Intl.getCanonicalLocales(locales);
    }
    exports2.CanonicalizeLocaleList = CanonicalizeLocaleList;
  }
});

// node_modules/@formatjs/ecma402-abstract/CanonicalizeTimeZoneName.js
var require_CanonicalizeTimeZoneName = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/CanonicalizeTimeZoneName.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CanonicalizeTimeZoneName = void 0;
    function CanonicalizeTimeZoneName(tz, _a) {
      var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
      var uppercasedTz = tz.toUpperCase();
      var uppercasedZones = Object.keys(tzData).reduce(function(all, z) {
        all[z.toUpperCase()] = z;
        return all;
      }, {});
      var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];
      if (ianaTimeZone === "Etc/UTC" || ianaTimeZone === "Etc/GMT") {
        return "UTC";
      }
      return ianaTimeZone;
    }
    exports2.CanonicalizeTimeZoneName = CanonicalizeTimeZoneName;
  }
});

// node_modules/@formatjs/ecma402-abstract/262.js
var require__ = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/262.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.msFromTime = exports2.OrdinaryHasInstance = exports2.SecFromTime = exports2.MinFromTime = exports2.HourFromTime = exports2.DateFromTime = exports2.MonthFromTime = exports2.InLeapYear = exports2.DayWithinYear = exports2.DaysInYear = exports2.YearFromTime = exports2.TimeFromYear = exports2.DayFromYear = exports2.WeekDay = exports2.Day = exports2.Type = exports2.HasOwnProperty = exports2.ArrayCreate = exports2.SameValue = exports2.ToObject = exports2.TimeClip = exports2.ToNumber = exports2.ToString = void 0;
    function ToString(o) {
      if (typeof o === "symbol") {
        throw TypeError("Cannot convert a Symbol value to a string");
      }
      return String(o);
    }
    exports2.ToString = ToString;
    function ToNumber(val) {
      if (val === void 0) {
        return NaN;
      }
      if (val === null) {
        return 0;
      }
      if (typeof val === "boolean") {
        return val ? 1 : 0;
      }
      if (typeof val === "number") {
        return val;
      }
      if (typeof val === "symbol" || typeof val === "bigint") {
        throw new TypeError("Cannot convert symbol/bigint to number");
      }
      return Number(val);
    }
    exports2.ToNumber = ToNumber;
    function ToInteger(n) {
      var number = ToNumber(n);
      if (isNaN(number) || SameValue(number, -0)) {
        return 0;
      }
      if (isFinite(number)) {
        return number;
      }
      var integer = Math.floor(Math.abs(number));
      if (number < 0) {
        integer = -integer;
      }
      if (SameValue(integer, -0)) {
        return 0;
      }
      return integer;
    }
    function TimeClip(time) {
      if (!isFinite(time)) {
        return NaN;
      }
      if (Math.abs(time) > 8.64 * 1e15) {
        return NaN;
      }
      return ToInteger(time);
    }
    exports2.TimeClip = TimeClip;
    function ToObject(arg) {
      if (arg == null) {
        throw new TypeError("undefined/null cannot be converted to object");
      }
      return Object(arg);
    }
    exports2.ToObject = ToObject;
    function SameValue(x2, y) {
      if (Object.is) {
        return Object.is(x2, y);
      }
      if (x2 === y) {
        return x2 !== 0 || 1 / x2 === 1 / y;
      }
      return x2 !== x2 && y !== y;
    }
    exports2.SameValue = SameValue;
    function ArrayCreate(len) {
      return new Array(len);
    }
    exports2.ArrayCreate = ArrayCreate;
    function HasOwnProperty(o, prop) {
      return Object.prototype.hasOwnProperty.call(o, prop);
    }
    exports2.HasOwnProperty = HasOwnProperty;
    function Type(x2) {
      if (x2 === null) {
        return "Null";
      }
      if (typeof x2 === "undefined") {
        return "Undefined";
      }
      if (typeof x2 === "function" || typeof x2 === "object") {
        return "Object";
      }
      if (typeof x2 === "number") {
        return "Number";
      }
      if (typeof x2 === "boolean") {
        return "Boolean";
      }
      if (typeof x2 === "string") {
        return "String";
      }
      if (typeof x2 === "symbol") {
        return "Symbol";
      }
      if (typeof x2 === "bigint") {
        return "BigInt";
      }
    }
    exports2.Type = Type;
    var MS_PER_DAY = 864e5;
    function mod(x2, y) {
      return x2 - Math.floor(x2 / y) * y;
    }
    function Day(t2) {
      return Math.floor(t2 / MS_PER_DAY);
    }
    exports2.Day = Day;
    function WeekDay(t2) {
      return mod(Day(t2) + 4, 7);
    }
    exports2.WeekDay = WeekDay;
    function DayFromYear(y) {
      return Date.UTC(y, 0) / MS_PER_DAY;
    }
    exports2.DayFromYear = DayFromYear;
    function TimeFromYear(y) {
      return Date.UTC(y, 0);
    }
    exports2.TimeFromYear = TimeFromYear;
    function YearFromTime(t2) {
      return new Date(t2).getUTCFullYear();
    }
    exports2.YearFromTime = YearFromTime;
    function DaysInYear(y) {
      if (y % 4 !== 0) {
        return 365;
      }
      if (y % 100 !== 0) {
        return 366;
      }
      if (y % 400 !== 0) {
        return 365;
      }
      return 366;
    }
    exports2.DaysInYear = DaysInYear;
    function DayWithinYear(t2) {
      return Day(t2) - DayFromYear(YearFromTime(t2));
    }
    exports2.DayWithinYear = DayWithinYear;
    function InLeapYear(t2) {
      return DaysInYear(YearFromTime(t2)) === 365 ? 0 : 1;
    }
    exports2.InLeapYear = InLeapYear;
    function MonthFromTime(t2) {
      var dwy = DayWithinYear(t2);
      var leap = InLeapYear(t2);
      if (dwy >= 0 && dwy < 31) {
        return 0;
      }
      if (dwy < 59 + leap) {
        return 1;
      }
      if (dwy < 90 + leap) {
        return 2;
      }
      if (dwy < 120 + leap) {
        return 3;
      }
      if (dwy < 151 + leap) {
        return 4;
      }
      if (dwy < 181 + leap) {
        return 5;
      }
      if (dwy < 212 + leap) {
        return 6;
      }
      if (dwy < 243 + leap) {
        return 7;
      }
      if (dwy < 273 + leap) {
        return 8;
      }
      if (dwy < 304 + leap) {
        return 9;
      }
      if (dwy < 334 + leap) {
        return 10;
      }
      if (dwy < 365 + leap) {
        return 11;
      }
      throw new Error("Invalid time");
    }
    exports2.MonthFromTime = MonthFromTime;
    function DateFromTime(t2) {
      var dwy = DayWithinYear(t2);
      var mft = MonthFromTime(t2);
      var leap = InLeapYear(t2);
      if (mft === 0) {
        return dwy + 1;
      }
      if (mft === 1) {
        return dwy - 30;
      }
      if (mft === 2) {
        return dwy - 58 - leap;
      }
      if (mft === 3) {
        return dwy - 89 - leap;
      }
      if (mft === 4) {
        return dwy - 119 - leap;
      }
      if (mft === 5) {
        return dwy - 150 - leap;
      }
      if (mft === 6) {
        return dwy - 180 - leap;
      }
      if (mft === 7) {
        return dwy - 211 - leap;
      }
      if (mft === 8) {
        return dwy - 242 - leap;
      }
      if (mft === 9) {
        return dwy - 272 - leap;
      }
      if (mft === 10) {
        return dwy - 303 - leap;
      }
      if (mft === 11) {
        return dwy - 333 - leap;
      }
      throw new Error("Invalid time");
    }
    exports2.DateFromTime = DateFromTime;
    var HOURS_PER_DAY = 24;
    var MINUTES_PER_HOUR = 60;
    var SECONDS_PER_MINUTE = 60;
    var MS_PER_SECOND = 1e3;
    var MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
    var MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
    function HourFromTime(t2) {
      return mod(Math.floor(t2 / MS_PER_HOUR), HOURS_PER_DAY);
    }
    exports2.HourFromTime = HourFromTime;
    function MinFromTime(t2) {
      return mod(Math.floor(t2 / MS_PER_MINUTE), MINUTES_PER_HOUR);
    }
    exports2.MinFromTime = MinFromTime;
    function SecFromTime(t2) {
      return mod(Math.floor(t2 / MS_PER_SECOND), SECONDS_PER_MINUTE);
    }
    exports2.SecFromTime = SecFromTime;
    function IsCallable(fn) {
      return typeof fn === "function";
    }
    function OrdinaryHasInstance(C, O, internalSlots) {
      if (!IsCallable(C)) {
        return false;
      }
      if (internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction) {
        var BC = internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction;
        return O instanceof BC;
      }
      if (typeof O !== "object") {
        return false;
      }
      var P = C.prototype;
      if (typeof P !== "object") {
        throw new TypeError("OrdinaryHasInstance called on an object with an invalid prototype property.");
      }
      return Object.prototype.isPrototypeOf.call(P, O);
    }
    exports2.OrdinaryHasInstance = OrdinaryHasInstance;
    function msFromTime(t2) {
      return mod(t2, MS_PER_SECOND);
    }
    exports2.msFromTime = msFromTime;
  }
});

// node_modules/@formatjs/ecma402-abstract/CoerceOptionsToObject.js
var require_CoerceOptionsToObject = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/CoerceOptionsToObject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CoerceOptionsToObject = void 0;
    var _262_1 = require__();
    function CoerceOptionsToObject(options) {
      if (typeof options === "undefined") {
        return /* @__PURE__ */ Object.create(null);
      }
      return (0, _262_1.ToObject)(options);
    }
    exports2.CoerceOptionsToObject = CoerceOptionsToObject;
  }
});

// node_modules/@formatjs/ecma402-abstract/DefaultNumberOption.js
var require_DefaultNumberOption = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/DefaultNumberOption.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.DefaultNumberOption = void 0;
    function DefaultNumberOption(val, min, max, fallback) {
      if (val !== void 0) {
        val = Number(val);
        if (isNaN(val) || val < min || val > max) {
          throw new RangeError("".concat(val, " is outside of range [").concat(min, ", ").concat(max, "]"));
        }
        return Math.floor(val);
      }
      return fallback;
    }
    exports2.DefaultNumberOption = DefaultNumberOption;
  }
});

// node_modules/@formatjs/ecma402-abstract/GetNumberOption.js
var require_GetNumberOption = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/GetNumberOption.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GetNumberOption = void 0;
    var DefaultNumberOption_1 = require_DefaultNumberOption();
    function GetNumberOption(options, property, minimum, maximum, fallback) {
      var val = options[property];
      return (0, DefaultNumberOption_1.DefaultNumberOption)(val, minimum, maximum, fallback);
    }
    exports2.GetNumberOption = GetNumberOption;
  }
});

// node_modules/@formatjs/ecma402-abstract/GetOption.js
var require_GetOption = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/GetOption.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GetOption = void 0;
    var _262_1 = require__();
    function GetOption(opts, prop, type, values, fallback) {
      if (typeof opts !== "object") {
        throw new TypeError("Options must be an object");
      }
      var value = opts[prop];
      if (value !== void 0) {
        if (type !== "boolean" && type !== "string") {
          throw new TypeError("invalid type");
        }
        if (type === "boolean") {
          value = Boolean(value);
        }
        if (type === "string") {
          value = (0, _262_1.ToString)(value);
        }
        if (values !== void 0 && !values.filter(function(val) {
          return val == value;
        }).length) {
          throw new RangeError("".concat(value, " is not within ").concat(values.join(", ")));
        }
        return value;
      }
      return fallback;
    }
    exports2.GetOption = GetOption;
  }
});

// node_modules/@formatjs/ecma402-abstract/GetOptionsObject.js
var require_GetOptionsObject = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/GetOptionsObject.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.GetOptionsObject = void 0;
    function GetOptionsObject(options) {
      if (typeof options === "undefined") {
        return /* @__PURE__ */ Object.create(null);
      }
      if (typeof options === "object") {
        return options;
      }
      throw new TypeError("Options must be an object");
    }
    exports2.GetOptionsObject = GetOptionsObject;
  }
});

// node_modules/@formatjs/ecma402-abstract/IsSanctionedSimpleUnitIdentifier.js
var require_IsSanctionedSimpleUnitIdentifier = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/IsSanctionedSimpleUnitIdentifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IsSanctionedSimpleUnitIdentifier = exports2.SIMPLE_UNITS = exports2.removeUnitNamespace = exports2.SANCTIONED_UNITS = void 0;
    exports2.SANCTIONED_UNITS = [
      "angle-degree",
      "area-acre",
      "area-hectare",
      "concentr-percent",
      "digital-bit",
      "digital-byte",
      "digital-gigabit",
      "digital-gigabyte",
      "digital-kilobit",
      "digital-kilobyte",
      "digital-megabit",
      "digital-megabyte",
      "digital-petabyte",
      "digital-terabit",
      "digital-terabyte",
      "duration-day",
      "duration-hour",
      "duration-millisecond",
      "duration-minute",
      "duration-month",
      "duration-second",
      "duration-week",
      "duration-year",
      "length-centimeter",
      "length-foot",
      "length-inch",
      "length-kilometer",
      "length-meter",
      "length-mile-scandinavian",
      "length-mile",
      "length-millimeter",
      "length-yard",
      "mass-gram",
      "mass-kilogram",
      "mass-ounce",
      "mass-pound",
      "mass-stone",
      "temperature-celsius",
      "temperature-fahrenheit",
      "volume-fluid-ounce",
      "volume-gallon",
      "volume-liter",
      "volume-milliliter"
    ];
    function removeUnitNamespace(unit) {
      return unit.slice(unit.indexOf("-") + 1);
    }
    exports2.removeUnitNamespace = removeUnitNamespace;
    exports2.SIMPLE_UNITS = exports2.SANCTIONED_UNITS.map(removeUnitNamespace);
    function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
      return exports2.SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
    }
    exports2.IsSanctionedSimpleUnitIdentifier = IsSanctionedSimpleUnitIdentifier;
  }
});

// node_modules/@formatjs/ecma402-abstract/IsValidTimeZoneName.js
var require_IsValidTimeZoneName = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/IsValidTimeZoneName.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IsValidTimeZoneName = void 0;
    function IsValidTimeZoneName(tz, _a) {
      var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
      var uppercasedTz = tz.toUpperCase();
      var zoneNames = /* @__PURE__ */ new Set();
      var linkNames = /* @__PURE__ */ new Set();
      Object.keys(tzData).map(function(z) {
        return z.toUpperCase();
      }).forEach(function(z) {
        return zoneNames.add(z);
      });
      Object.keys(uppercaseLinks).forEach(function(linkName) {
        linkNames.add(linkName.toUpperCase());
        zoneNames.add(uppercaseLinks[linkName].toUpperCase());
      });
      return zoneNames.has(uppercasedTz) || linkNames.has(uppercasedTz);
    }
    exports2.IsValidTimeZoneName = IsValidTimeZoneName;
  }
});

// node_modules/@formatjs/ecma402-abstract/IsWellFormedCurrencyCode.js
var require_IsWellFormedCurrencyCode = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/IsWellFormedCurrencyCode.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IsWellFormedCurrencyCode = void 0;
    function toUpperCase(str) {
      return str.replace(/([a-z])/g, function(_, c) {
        return c.toUpperCase();
      });
    }
    var NOT_A_Z_REGEX = /[^A-Z]/;
    function IsWellFormedCurrencyCode(currency) {
      currency = toUpperCase(currency);
      if (currency.length !== 3) {
        return false;
      }
      if (NOT_A_Z_REGEX.test(currency)) {
        return false;
      }
      return true;
    }
    exports2.IsWellFormedCurrencyCode = IsWellFormedCurrencyCode;
  }
});

// node_modules/@formatjs/ecma402-abstract/IsWellFormedUnitIdentifier.js
var require_IsWellFormedUnitIdentifier = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/IsWellFormedUnitIdentifier.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.IsWellFormedUnitIdentifier = void 0;
    var IsSanctionedSimpleUnitIdentifier_1 = require_IsSanctionedSimpleUnitIdentifier();
    function toLowerCase(str) {
      return str.replace(/([A-Z])/g, function(_, c) {
        return c.toLowerCase();
      });
    }
    function IsWellFormedUnitIdentifier(unit) {
      unit = toLowerCase(unit);
      if ((0, IsSanctionedSimpleUnitIdentifier_1.IsSanctionedSimpleUnitIdentifier)(unit)) {
        return true;
      }
      var units = unit.split("-per-");
      if (units.length !== 2) {
        return false;
      }
      var numerator = units[0], denominator = units[1];
      if (!(0, IsSanctionedSimpleUnitIdentifier_1.IsSanctionedSimpleUnitIdentifier)(numerator) || !(0, IsSanctionedSimpleUnitIdentifier_1.IsSanctionedSimpleUnitIdentifier)(denominator)) {
        return false;
      }
      return true;
    }
    exports2.IsWellFormedUnitIdentifier = IsWellFormedUnitIdentifier;
  }
});

// node_modules/@formatjs/ecma402-abstract/utils.js
var require_utils2 = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.invariant = exports2.UNICODE_EXTENSION_SEQUENCE_REGEX = exports2.defineProperty = exports2.isLiteralPart = exports2.getMultiInternalSlots = exports2.getInternalSlot = exports2.setMultiInternalSlots = exports2.setInternalSlot = exports2.repeat = exports2.getMagnitude = void 0;
    function getMagnitude(x2) {
      return Math.floor(Math.log(x2) * Math.LOG10E);
    }
    exports2.getMagnitude = getMagnitude;
    function repeat(s2, times) {
      if (typeof s2.repeat === "function") {
        return s2.repeat(times);
      }
      var arr = new Array(times);
      for (var i2 = 0; i2 < arr.length; i2++) {
        arr[i2] = s2;
      }
      return arr.join("");
    }
    exports2.repeat = repeat;
    function setInternalSlot(map, pl, field, value) {
      if (!map.get(pl)) {
        map.set(pl, /* @__PURE__ */ Object.create(null));
      }
      var slots = map.get(pl);
      slots[field] = value;
    }
    exports2.setInternalSlot = setInternalSlot;
    function setMultiInternalSlots(map, pl, props) {
      for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var k = _a[_i];
        setInternalSlot(map, pl, k, props[k]);
      }
    }
    exports2.setMultiInternalSlots = setMultiInternalSlots;
    function getInternalSlot(map, pl, field) {
      return getMultiInternalSlots(map, pl, field)[field];
    }
    exports2.getInternalSlot = getInternalSlot;
    function getMultiInternalSlots(map, pl) {
      var fields = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        fields[_i - 2] = arguments[_i];
      }
      var slots = map.get(pl);
      if (!slots) {
        throw new TypeError("".concat(pl, " InternalSlot has not been initialized"));
      }
      return fields.reduce(function(all, f3) {
        all[f3] = slots[f3];
        return all;
      }, /* @__PURE__ */ Object.create(null));
    }
    exports2.getMultiInternalSlots = getMultiInternalSlots;
    function isLiteralPart(patternPart) {
      return patternPart.type === "literal";
    }
    exports2.isLiteralPart = isLiteralPart;
    function defineProperty(target, name, _a) {
      var value = _a.value;
      Object.defineProperty(target, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value
      });
    }
    exports2.defineProperty = defineProperty;
    exports2.UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
    function invariant(condition, message, Err) {
      if (Err === void 0) {
        Err = Error;
      }
      if (!condition) {
        throw new Err(message);
      }
    }
    exports2.invariant = invariant;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/ComputeExponentForMagnitude.js
var require_ComputeExponentForMagnitude = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/ComputeExponentForMagnitude.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ComputeExponentForMagnitude = void 0;
    function ComputeExponentForMagnitude(numberFormat, magnitude, _a) {
      var getInternalSlots = _a.getInternalSlots;
      var internalSlots = getInternalSlots(numberFormat);
      var notation = internalSlots.notation, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
      switch (notation) {
        case "standard":
          return 0;
        case "scientific":
          return magnitude;
        case "engineering":
          return Math.floor(magnitude / 3) * 3;
        default: {
          var compactDisplay = internalSlots.compactDisplay, style = internalSlots.style, currencyDisplay = internalSlots.currencyDisplay;
          var thresholdMap = void 0;
          if (style === "currency" && currencyDisplay !== "name") {
            var currency = dataLocaleData.numbers.currency[numberingSystem] || dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
            thresholdMap = currency.short;
          } else {
            var decimal = dataLocaleData.numbers.decimal[numberingSystem] || dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
            thresholdMap = compactDisplay === "long" ? decimal.long : decimal.short;
          }
          if (!thresholdMap) {
            return 0;
          }
          var num = String(Math.pow(10, magnitude));
          var thresholds = Object.keys(thresholdMap);
          if (num < thresholds[0]) {
            return 0;
          }
          if (num > thresholds[thresholds.length - 1]) {
            return thresholds[thresholds.length - 1].length - 1;
          }
          var i2 = thresholds.indexOf(num);
          if (i2 === -1) {
            return 0;
          }
          var magnitudeKey = thresholds[i2];
          var compactPattern = thresholdMap[magnitudeKey].other;
          if (compactPattern === "0") {
            return 0;
          }
          return magnitudeKey.length - thresholdMap[magnitudeKey].other.match(/0+/)[0].length;
        }
      }
    }
    exports2.ComputeExponentForMagnitude = ComputeExponentForMagnitude;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/ToRawPrecision.js
var require_ToRawPrecision = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/ToRawPrecision.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ToRawPrecision = void 0;
    var utils_1 = require_utils2();
    function ToRawPrecision(x2, minPrecision, maxPrecision) {
      var p = maxPrecision;
      var m2;
      var e2;
      var xFinal;
      if (x2 === 0) {
        m2 = (0, utils_1.repeat)("0", p);
        e2 = 0;
        xFinal = 0;
      } else {
        var xToString = x2.toString();
        var xToStringExponentIndex = xToString.indexOf("e");
        var _a = xToString.split("e"), xToStringMantissa = _a[0], xToStringExponent = _a[1];
        var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace(".", "");
        if (xToStringExponentIndex >= 0 && xToStringMantissaWithoutDecimalPoint.length <= p) {
          e2 = +xToStringExponent;
          m2 = xToStringMantissaWithoutDecimalPoint + (0, utils_1.repeat)("0", p - xToStringMantissaWithoutDecimalPoint.length);
          xFinal = x2;
        } else {
          e2 = (0, utils_1.getMagnitude)(x2);
          var decimalPlaceOffset = e2 - p + 1;
          var n = Math.round(adjustDecimalPlace(x2, decimalPlaceOffset));
          if (adjustDecimalPlace(n, p - 1) >= 10) {
            e2 = e2 + 1;
            n = Math.floor(n / 10);
          }
          m2 = n.toString();
          xFinal = adjustDecimalPlace(n, p - 1 - e2);
        }
      }
      var int;
      if (e2 >= p - 1) {
        m2 = m2 + (0, utils_1.repeat)("0", e2 - p + 1);
        int = e2 + 1;
      } else if (e2 >= 0) {
        m2 = "".concat(m2.slice(0, e2 + 1), ".").concat(m2.slice(e2 + 1));
        int = e2 + 1;
      } else {
        m2 = "0.".concat((0, utils_1.repeat)("0", -e2 - 1)).concat(m2);
        int = 1;
      }
      if (m2.indexOf(".") >= 0 && maxPrecision > minPrecision) {
        var cut = maxPrecision - minPrecision;
        while (cut > 0 && m2[m2.length - 1] === "0") {
          m2 = m2.slice(0, -1);
          cut--;
        }
        if (m2[m2.length - 1] === ".") {
          m2 = m2.slice(0, -1);
        }
      }
      return { formattedString: m2, roundedNumber: xFinal, integerDigitsCount: int };
      function adjustDecimalPlace(x3, magnitude) {
        return magnitude < 0 ? x3 * Math.pow(10, -magnitude) : x3 / Math.pow(10, magnitude);
      }
    }
    exports2.ToRawPrecision = ToRawPrecision;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/ToRawFixed.js
var require_ToRawFixed = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/ToRawFixed.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ToRawFixed = void 0;
    var utils_1 = require_utils2();
    function ToRawFixed(x2, minFraction, maxFraction) {
      var f3 = maxFraction;
      var n = Math.round(x2 * Math.pow(10, f3));
      var xFinal = n / Math.pow(10, f3);
      var m2;
      if (n < 1e21) {
        m2 = n.toString();
      } else {
        m2 = n.toString();
        var _a = m2.split("e"), mantissa = _a[0], exponent = _a[1];
        m2 = mantissa.replace(".", "");
        m2 = m2 + (0, utils_1.repeat)("0", Math.max(+exponent - m2.length + 1, 0));
      }
      var int;
      if (f3 !== 0) {
        var k = m2.length;
        if (k <= f3) {
          var z = (0, utils_1.repeat)("0", f3 + 1 - k);
          m2 = z + m2;
          k = f3 + 1;
        }
        var a = m2.slice(0, k - f3);
        var b = m2.slice(k - f3);
        m2 = "".concat(a, ".").concat(b);
        int = a.length;
      } else {
        int = m2.length;
      }
      var cut = maxFraction - minFraction;
      while (cut > 0 && m2[m2.length - 1] === "0") {
        m2 = m2.slice(0, -1);
        cut--;
      }
      if (m2[m2.length - 1] === ".") {
        m2 = m2.slice(0, -1);
      }
      return { formattedString: m2, roundedNumber: xFinal, integerDigitsCount: int };
    }
    exports2.ToRawFixed = ToRawFixed;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/FormatNumericToString.js
var require_FormatNumericToString = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/FormatNumericToString.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FormatNumericToString = void 0;
    var _262_1 = require__();
    var ToRawPrecision_1 = require_ToRawPrecision();
    var utils_1 = require_utils2();
    var ToRawFixed_1 = require_ToRawFixed();
    function FormatNumericToString(intlObject, x2) {
      var isNegative = x2 < 0 || (0, _262_1.SameValue)(x2, -0);
      if (isNegative) {
        x2 = -x2;
      }
      var result;
      var rourndingType = intlObject.roundingType;
      switch (rourndingType) {
        case "significantDigits":
          result = (0, ToRawPrecision_1.ToRawPrecision)(x2, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
          break;
        case "fractionDigits":
          result = (0, ToRawFixed_1.ToRawFixed)(x2, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits);
          break;
        default:
          result = (0, ToRawPrecision_1.ToRawPrecision)(x2, 1, 2);
          if (result.integerDigitsCount > 1) {
            result = (0, ToRawFixed_1.ToRawFixed)(x2, 0, 0);
          }
          break;
      }
      x2 = result.roundedNumber;
      var string = result.formattedString;
      var int = result.integerDigitsCount;
      var minInteger = intlObject.minimumIntegerDigits;
      if (int < minInteger) {
        var forwardZeros = (0, utils_1.repeat)("0", minInteger - int);
        string = forwardZeros + string;
      }
      if (isNegative) {
        x2 = -x2;
      }
      return { roundedNumber: x2, formattedString: string };
    }
    exports2.FormatNumericToString = FormatNumericToString;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/ComputeExponent.js
var require_ComputeExponent = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/ComputeExponent.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ComputeExponent = void 0;
    var utils_1 = require_utils2();
    var ComputeExponentForMagnitude_1 = require_ComputeExponentForMagnitude();
    var FormatNumericToString_1 = require_FormatNumericToString();
    function ComputeExponent(numberFormat, x2, _a) {
      var getInternalSlots = _a.getInternalSlots;
      if (x2 === 0) {
        return [0, 0];
      }
      if (x2 < 0) {
        x2 = -x2;
      }
      var magnitude = (0, utils_1.getMagnitude)(x2);
      var exponent = (0, ComputeExponentForMagnitude_1.ComputeExponentForMagnitude)(numberFormat, magnitude, {
        getInternalSlots
      });
      x2 = exponent < 0 ? x2 * Math.pow(10, -exponent) : x2 / Math.pow(10, exponent);
      var formatNumberResult = (0, FormatNumericToString_1.FormatNumericToString)(getInternalSlots(numberFormat), x2);
      if (formatNumberResult.roundedNumber === 0) {
        return [exponent, magnitude];
      }
      var newMagnitude = (0, utils_1.getMagnitude)(formatNumberResult.roundedNumber);
      if (newMagnitude === magnitude - exponent) {
        return [exponent, magnitude];
      }
      return [
        (0, ComputeExponentForMagnitude_1.ComputeExponentForMagnitude)(numberFormat, magnitude + 1, {
          getInternalSlots
        }),
        magnitude + 1
      ];
    }
    exports2.ComputeExponent = ComputeExponent;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/CurrencyDigits.js
var require_CurrencyDigits = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/CurrencyDigits.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CurrencyDigits = void 0;
    var _262_1 = require__();
    function CurrencyDigits(c, _a) {
      var currencyDigitsData = _a.currencyDigitsData;
      return (0, _262_1.HasOwnProperty)(currencyDigitsData, c) ? currencyDigitsData[c] : 2;
    }
    exports2.CurrencyDigits = CurrencyDigits;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/digit-mapping.generated.js
var require_digit_mapping_generated = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/digit-mapping.generated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.digitMapping = void 0;
    exports2.digitMapping = { "adlm": ["\u{1E950}", "\u{1E951}", "\u{1E952}", "\u{1E953}", "\u{1E954}", "\u{1E955}", "\u{1E956}", "\u{1E957}", "\u{1E958}", "\u{1E959}"], "ahom": ["\u{11730}", "\u{11731}", "\u{11732}", "\u{11733}", "\u{11734}", "\u{11735}", "\u{11736}", "\u{11737}", "\u{11738}", "\u{11739}"], "arab": ["\u0660", "\u0661", "\u0662", "\u0663", "\u0664", "\u0665", "\u0666", "\u0667", "\u0668", "\u0669"], "arabext": ["\u06F0", "\u06F1", "\u06F2", "\u06F3", "\u06F4", "\u06F5", "\u06F6", "\u06F7", "\u06F8", "\u06F9"], "bali": ["\u1B50", "\u1B51", "\u1B52", "\u1B53", "\u1B54", "\u1B55", "\u1B56", "\u1B57", "\u1B58", "\u1B59"], "beng": ["\u09E6", "\u09E7", "\u09E8", "\u09E9", "\u09EA", "\u09EB", "\u09EC", "\u09ED", "\u09EE", "\u09EF"], "bhks": ["\u{11C50}", "\u{11C51}", "\u{11C52}", "\u{11C53}", "\u{11C54}", "\u{11C55}", "\u{11C56}", "\u{11C57}", "\u{11C58}", "\u{11C59}"], "brah": ["\u{11066}", "\u{11067}", "\u{11068}", "\u{11069}", "\u{1106A}", "\u{1106B}", "\u{1106C}", "\u{1106D}", "\u{1106E}", "\u{1106F}"], "cakm": ["\u{11136}", "\u{11137}", "\u{11138}", "\u{11139}", "\u{1113A}", "\u{1113B}", "\u{1113C}", "\u{1113D}", "\u{1113E}", "\u{1113F}"], "cham": ["\uAA50", "\uAA51", "\uAA52", "\uAA53", "\uAA54", "\uAA55", "\uAA56", "\uAA57", "\uAA58", "\uAA59"], "deva": ["\u0966", "\u0967", "\u0968", "\u0969", "\u096A", "\u096B", "\u096C", "\u096D", "\u096E", "\u096F"], "diak": ["\u{11950}", "\u{11951}", "\u{11952}", "\u{11953}", "\u{11954}", "\u{11955}", "\u{11956}", "\u{11957}", "\u{11958}", "\u{11959}"], "fullwide": ["\uFF10", "\uFF11", "\uFF12", "\uFF13", "\uFF14", "\uFF15", "\uFF16", "\uFF17", "\uFF18", "\uFF19"], "gong": ["\u{11DA0}", "\u{11DA1}", "\u{11DA2}", "\u{11DA3}", "\u{11DA4}", "\u{11DA5}", "\u{11DA6}", "\u{11DA7}", "\u{11DA8}", "\u{11DA9}"], "gonm": ["\u{11D50}", "\u{11D51}", "\u{11D52}", "\u{11D53}", "\u{11D54}", "\u{11D55}", "\u{11D56}", "\u{11D57}", "\u{11D58}", "\u{11D59}"], "gujr": ["\u0AE6", "\u0AE7", "\u0AE8", "\u0AE9", "\u0AEA", "\u0AEB", "\u0AEC", "\u0AED", "\u0AEE", "\u0AEF"], "guru": ["\u0A66", "\u0A67", "\u0A68", "\u0A69", "\u0A6A", "\u0A6B", "\u0A6C", "\u0A6D", "\u0A6E", "\u0A6F"], "hanidec": ["\u3007", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D", "\u4E03", "\u516B", "\u4E5D"], "hmng": ["\u{16B50}", "\u{16B51}", "\u{16B52}", "\u{16B53}", "\u{16B54}", "\u{16B55}", "\u{16B56}", "\u{16B57}", "\u{16B58}", "\u{16B59}"], "hmnp": ["\u{1E140}", "\u{1E141}", "\u{1E142}", "\u{1E143}", "\u{1E144}", "\u{1E145}", "\u{1E146}", "\u{1E147}", "\u{1E148}", "\u{1E149}"], "java": ["\uA9D0", "\uA9D1", "\uA9D2", "\uA9D3", "\uA9D4", "\uA9D5", "\uA9D6", "\uA9D7", "\uA9D8", "\uA9D9"], "kali": ["\uA900", "\uA901", "\uA902", "\uA903", "\uA904", "\uA905", "\uA906", "\uA907", "\uA908", "\uA909"], "khmr": ["\u17E0", "\u17E1", "\u17E2", "\u17E3", "\u17E4", "\u17E5", "\u17E6", "\u17E7", "\u17E8", "\u17E9"], "knda": ["\u0CE6", "\u0CE7", "\u0CE8", "\u0CE9", "\u0CEA", "\u0CEB", "\u0CEC", "\u0CED", "\u0CEE", "\u0CEF"], "lana": ["\u1A80", "\u1A81", "\u1A82", "\u1A83", "\u1A84", "\u1A85", "\u1A86", "\u1A87", "\u1A88", "\u1A89"], "lanatham": ["\u1A90", "\u1A91", "\u1A92", "\u1A93", "\u1A94", "\u1A95", "\u1A96", "\u1A97", "\u1A98", "\u1A99"], "laoo": ["\u0ED0", "\u0ED1", "\u0ED2", "\u0ED3", "\u0ED4", "\u0ED5", "\u0ED6", "\u0ED7", "\u0ED8", "\u0ED9"], "lepc": ["\u1A90", "\u1A91", "\u1A92", "\u1A93", "\u1A94", "\u1A95", "\u1A96", "\u1A97", "\u1A98", "\u1A99"], "limb": ["\u1946", "\u1947", "\u1948", "\u1949", "\u194A", "\u194B", "\u194C", "\u194D", "\u194E", "\u194F"], "mathbold": ["\u{1D7CE}", "\u{1D7CF}", "\u{1D7D0}", "\u{1D7D1}", "\u{1D7D2}", "\u{1D7D3}", "\u{1D7D4}", "\u{1D7D5}", "\u{1D7D6}", "\u{1D7D7}"], "mathdbl": ["\u{1D7D8}", "\u{1D7D9}", "\u{1D7DA}", "\u{1D7DB}", "\u{1D7DC}", "\u{1D7DD}", "\u{1D7DE}", "\u{1D7DF}", "\u{1D7E0}", "\u{1D7E1}"], "mathmono": ["\u{1D7F6}", "\u{1D7F7}", "\u{1D7F8}", "\u{1D7F9}", "\u{1D7FA}", "\u{1D7FB}", "\u{1D7FC}", "\u{1D7FD}", "\u{1D7FE}", "\u{1D7FF}"], "mathsanb": ["\u{1D7EC}", "\u{1D7ED}", "\u{1D7EE}", "\u{1D7EF}", "\u{1D7F0}", "\u{1D7F1}", "\u{1D7F2}", "\u{1D7F3}", "\u{1D7F4}", "\u{1D7F5}"], "mathsans": ["\u{1D7E2}", "\u{1D7E3}", "\u{1D7E4}", "\u{1D7E5}", "\u{1D7E6}", "\u{1D7E7}", "\u{1D7E8}", "\u{1D7E9}", "\u{1D7EA}", "\u{1D7EB}"], "mlym": ["\u0D66", "\u0D67", "\u0D68", "\u0D69", "\u0D6A", "\u0D6B", "\u0D6C", "\u0D6D", "\u0D6E", "\u0D6F"], "modi": ["\u{11650}", "\u{11651}", "\u{11652}", "\u{11653}", "\u{11654}", "\u{11655}", "\u{11656}", "\u{11657}", "\u{11658}", "\u{11659}"], "mong": ["\u1810", "\u1811", "\u1812", "\u1813", "\u1814", "\u1815", "\u1816", "\u1817", "\u1818", "\u1819"], "mroo": ["\u{16A60}", "\u{16A61}", "\u{16A62}", "\u{16A63}", "\u{16A64}", "\u{16A65}", "\u{16A66}", "\u{16A67}", "\u{16A68}", "\u{16A69}"], "mtei": ["\uABF0", "\uABF1", "\uABF2", "\uABF3", "\uABF4", "\uABF5", "\uABF6", "\uABF7", "\uABF8", "\uABF9"], "mymr": ["\u1040", "\u1041", "\u1042", "\u1043", "\u1044", "\u1045", "\u1046", "\u1047", "\u1048", "\u1049"], "mymrshan": ["\u1090", "\u1091", "\u1092", "\u1093", "\u1094", "\u1095", "\u1096", "\u1097", "\u1098", "\u1099"], "mymrtlng": ["\uA9F0", "\uA9F1", "\uA9F2", "\uA9F3", "\uA9F4", "\uA9F5", "\uA9F6", "\uA9F7", "\uA9F8", "\uA9F9"], "newa": ["\u{11450}", "\u{11451}", "\u{11452}", "\u{11453}", "\u{11454}", "\u{11455}", "\u{11456}", "\u{11457}", "\u{11458}", "\u{11459}"], "nkoo": ["\u07C0", "\u07C1", "\u07C2", "\u07C3", "\u07C4", "\u07C5", "\u07C6", "\u07C7", "\u07C8", "\u07C9"], "olck": ["\u1C50", "\u1C51", "\u1C52", "\u1C53", "\u1C54", "\u1C55", "\u1C56", "\u1C57", "\u1C58", "\u1C59"], "orya": ["\u0B66", "\u0B67", "\u0B68", "\u0B69", "\u0B6A", "\u0B6B", "\u0B6C", "\u0B6D", "\u0B6E", "\u0B6F"], "osma": ["\u{104A0}", "\u{104A1}", "\u{104A2}", "\u{104A3}", "\u{104A4}", "\u{104A5}", "\u{104A6}", "\u{104A7}", "\u{104A8}", "\u{104A9}"], "rohg": ["\u{10D30}", "\u{10D31}", "\u{10D32}", "\u{10D33}", "\u{10D34}", "\u{10D35}", "\u{10D36}", "\u{10D37}", "\u{10D38}", "\u{10D39}"], "saur": ["\uA8D0", "\uA8D1", "\uA8D2", "\uA8D3", "\uA8D4", "\uA8D5", "\uA8D6", "\uA8D7", "\uA8D8", "\uA8D9"], "segment": ["\u{1FBF0}", "\u{1FBF1}", "\u{1FBF2}", "\u{1FBF3}", "\u{1FBF4}", "\u{1FBF5}", "\u{1FBF6}", "\u{1FBF7}", "\u{1FBF8}", "\u{1FBF9}"], "shrd": ["\u{111D0}", "\u{111D1}", "\u{111D2}", "\u{111D3}", "\u{111D4}", "\u{111D5}", "\u{111D6}", "\u{111D7}", "\u{111D8}", "\u{111D9}"], "sind": ["\u{112F0}", "\u{112F1}", "\u{112F2}", "\u{112F3}", "\u{112F4}", "\u{112F5}", "\u{112F6}", "\u{112F7}", "\u{112F8}", "\u{112F9}"], "sinh": ["\u0DE6", "\u0DE7", "\u0DE8", "\u0DE9", "\u0DEA", "\u0DEB", "\u0DEC", "\u0DED", "\u0DEE", "\u0DEF"], "sora": ["\u{110F0}", "\u{110F1}", "\u{110F2}", "\u{110F3}", "\u{110F4}", "\u{110F5}", "\u{110F6}", "\u{110F7}", "\u{110F8}", "\u{110F9}"], "sund": ["\u1BB0", "\u1BB1", "\u1BB2", "\u1BB3", "\u1BB4", "\u1BB5", "\u1BB6", "\u1BB7", "\u1BB8", "\u1BB9"], "takr": ["\u{116C0}", "\u{116C1}", "\u{116C2}", "\u{116C3}", "\u{116C4}", "\u{116C5}", "\u{116C6}", "\u{116C7}", "\u{116C8}", "\u{116C9}"], "talu": ["\u19D0", "\u19D1", "\u19D2", "\u19D3", "\u19D4", "\u19D5", "\u19D6", "\u19D7", "\u19D8", "\u19D9"], "tamldec": ["\u0BE6", "\u0BE7", "\u0BE8", "\u0BE9", "\u0BEA", "\u0BEB", "\u0BEC", "\u0BED", "\u0BEE", "\u0BEF"], "telu": ["\u0C66", "\u0C67", "\u0C68", "\u0C69", "\u0C6A", "\u0C6B", "\u0C6C", "\u0C6D", "\u0C6E", "\u0C6F"], "thai": ["\u0E50", "\u0E51", "\u0E52", "\u0E53", "\u0E54", "\u0E55", "\u0E56", "\u0E57", "\u0E58", "\u0E59"], "tibt": ["\u0F20", "\u0F21", "\u0F22", "\u0F23", "\u0F24", "\u0F25", "\u0F26", "\u0F27", "\u0F28", "\u0F29"], "tirh": ["\u{114D0}", "\u{114D1}", "\u{114D2}", "\u{114D3}", "\u{114D4}", "\u{114D5}", "\u{114D6}", "\u{114D7}", "\u{114D8}", "\u{114D9}"], "vaii": ["\u1620", "\u1621", "\u1622", "\u1623", "\u1624", "\u1625", "\u1626", "\u1627", "\u1628", "\u1629"], "wara": ["\u{118E0}", "\u{118E1}", "\u{118E2}", "\u{118E3}", "\u{118E4}", "\u{118E5}", "\u{118E6}", "\u{118E7}", "\u{118E8}", "\u{118E9}"], "wcho": ["\u{1E2F0}", "\u{1E2F1}", "\u{1E2F2}", "\u{1E2F3}", "\u{1E2F4}", "\u{1E2F5}", "\u{1E2F6}", "\u{1E2F7}", "\u{1E2F8}", "\u{1E2F9}"] };
  }
});

// node_modules/@formatjs/ecma402-abstract/regex.generated.js
var require_regex_generated3 = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/regex.generated.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.S_UNICODE_REGEX = void 0;
    exports2.S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/format_to_parts.js
var require_format_to_parts = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/format_to_parts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var ToRawFixed_1 = require_ToRawFixed();
    var digit_mapping_generated_1 = require_digit_mapping_generated();
    var regex_generated_1 = require_regex_generated3();
    var CARET_S_UNICODE_REGEX = new RegExp("^".concat(regex_generated_1.S_UNICODE_REGEX.source));
    var S_DOLLAR_UNICODE_REGEX = new RegExp("".concat(regex_generated_1.S_UNICODE_REGEX.source, "$"));
    var CLDR_NUMBER_PATTERN = /[#0](?:[\.,][#0]+)*/g;
    function formatToParts(numberResult, data, pl, options) {
      var sign = numberResult.sign, exponent = numberResult.exponent, magnitude = numberResult.magnitude;
      var notation = options.notation, style = options.style, numberingSystem = options.numberingSystem;
      var defaultNumberingSystem = data.numbers.nu[0];
      var compactNumberPattern = null;
      if (notation === "compact" && magnitude) {
        compactNumberPattern = getCompactDisplayPattern(numberResult, pl, data, style, options.compactDisplay, options.currencyDisplay, numberingSystem);
      }
      var nonNameCurrencyPart;
      if (style === "currency" && options.currencyDisplay !== "name") {
        var byCurrencyDisplay = data.currencies[options.currency];
        if (byCurrencyDisplay) {
          switch (options.currencyDisplay) {
            case "code":
              nonNameCurrencyPart = options.currency;
              break;
            case "symbol":
              nonNameCurrencyPart = byCurrencyDisplay.symbol;
              break;
            default:
              nonNameCurrencyPart = byCurrencyDisplay.narrow;
              break;
          }
        } else {
          nonNameCurrencyPart = options.currency;
        }
      }
      var numberPattern;
      if (!compactNumberPattern) {
        if (style === "decimal" || style === "unit" || style === "currency" && options.currencyDisplay === "name") {
          var decimalData = data.numbers.decimal[numberingSystem] || data.numbers.decimal[defaultNumberingSystem];
          numberPattern = getPatternForSign(decimalData.standard, sign);
        } else if (style === "currency") {
          var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
          numberPattern = getPatternForSign(currencyData[options.currencySign], sign);
        } else {
          var percentPattern = data.numbers.percent[numberingSystem] || data.numbers.percent[defaultNumberingSystem];
          numberPattern = getPatternForSign(percentPattern, sign);
        }
      } else {
        numberPattern = compactNumberPattern;
      }
      var decimalNumberPattern = CLDR_NUMBER_PATTERN.exec(numberPattern)[0];
      numberPattern = numberPattern.replace(CLDR_NUMBER_PATTERN, "{0}").replace(/'(.)'/g, "$1");
      if (style === "currency" && options.currencyDisplay !== "name") {
        var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
        var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
        if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
          numberPattern = numberPattern.replace("\xA4{0}", "\xA4".concat(afterCurrency, "{0}"));
        }
        var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
        if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
          numberPattern = numberPattern.replace("{0}\xA4", "{0}".concat(beforeCurrency, "\xA4"));
        }
      }
      var numberPatternParts = numberPattern.split(/({c:[^}]+}|\{0\}|[¤%\-\+])/g);
      var numberParts = [];
      var symbols = data.numbers.symbols[numberingSystem] || data.numbers.symbols[defaultNumberingSystem];
      for (var _i = 0, numberPatternParts_1 = numberPatternParts; _i < numberPatternParts_1.length; _i++) {
        var part = numberPatternParts_1[_i];
        if (!part) {
          continue;
        }
        switch (part) {
          case "{0}": {
            numberParts.push.apply(numberParts, paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, !compactNumberPattern && options.useGrouping, decimalNumberPattern));
            break;
          }
          case "-":
            numberParts.push({ type: "minusSign", value: symbols.minusSign });
            break;
          case "+":
            numberParts.push({ type: "plusSign", value: symbols.plusSign });
            break;
          case "%":
            numberParts.push({ type: "percentSign", value: symbols.percentSign });
            break;
          case "\xA4":
            numberParts.push({ type: "currency", value: nonNameCurrencyPart });
            break;
          default:
            if (/^\{c:/.test(part)) {
              numberParts.push({
                type: "compact",
                value: part.substring(3, part.length - 1)
              });
            } else {
              numberParts.push({ type: "literal", value: part });
            }
            break;
        }
      }
      switch (style) {
        case "currency": {
          if (options.currencyDisplay === "name") {
            var unitPattern = (data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem]).unitPattern;
            var unitName = void 0;
            var currencyNameData = data.currencies[options.currency];
            if (currencyNameData) {
              unitName = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), currencyNameData.displayName);
            } else {
              unitName = options.currency;
            }
            var unitPatternParts = unitPattern.split(/(\{[01]\})/g);
            var result = [];
            for (var _a = 0, unitPatternParts_1 = unitPatternParts; _a < unitPatternParts_1.length; _a++) {
              var part = unitPatternParts_1[_a];
              switch (part) {
                case "{0}":
                  result.push.apply(result, numberParts);
                  break;
                case "{1}":
                  result.push({ type: "currency", value: unitName });
                  break;
                default:
                  if (part) {
                    result.push({ type: "literal", value: part });
                  }
                  break;
              }
            }
            return result;
          } else {
            return numberParts;
          }
        }
        case "unit": {
          var unit = options.unit, unitDisplay = options.unitDisplay;
          var unitData = data.units.simple[unit];
          var unitPattern = void 0;
          if (unitData) {
            unitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[unit][unitDisplay]);
          } else {
            var _b = unit.split("-per-"), numeratorUnit = _b[0], denominatorUnit = _b[1];
            unitData = data.units.simple[numeratorUnit];
            var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[numeratorUnit][unitDisplay]);
            var perUnitPattern = data.units.simple[denominatorUnit].perUnit[unitDisplay];
            if (perUnitPattern) {
              unitPattern = perUnitPattern.replace("{0}", numeratorUnitPattern);
            } else {
              var perPattern = data.units.compound.per[unitDisplay];
              var denominatorPattern = selectPlural(pl, 1, data.units.simple[denominatorUnit][unitDisplay]);
              unitPattern = unitPattern = perPattern.replace("{0}", numeratorUnitPattern).replace("{1}", denominatorPattern.replace("{0}", ""));
            }
          }
          var result = [];
          for (var _c = 0, _d = unitPattern.split(/(\s*\{0\}\s*)/); _c < _d.length; _c++) {
            var part = _d[_c];
            var interpolateMatch = /^(\s*)\{0\}(\s*)$/.exec(part);
            if (interpolateMatch) {
              if (interpolateMatch[1]) {
                result.push({ type: "literal", value: interpolateMatch[1] });
              }
              result.push.apply(result, numberParts);
              if (interpolateMatch[2]) {
                result.push({ type: "literal", value: interpolateMatch[2] });
              }
            } else if (part) {
              result.push({ type: "unit", value: part });
            }
          }
          return result;
        }
        default:
          return numberParts;
      }
    }
    exports2.default = formatToParts;
    function paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping, decimalNumberPattern) {
      var result = [];
      var n = numberResult.formattedString, x2 = numberResult.roundedNumber;
      if (isNaN(x2)) {
        return [{ type: "nan", value: n }];
      } else if (!isFinite(x2)) {
        return [{ type: "infinity", value: n }];
      }
      var digitReplacementTable = digit_mapping_generated_1.digitMapping[numberingSystem];
      if (digitReplacementTable) {
        n = n.replace(/\d/g, function(digit) {
          return digitReplacementTable[+digit] || digit;
        });
      }
      var decimalSepIndex = n.indexOf(".");
      var integer;
      var fraction;
      if (decimalSepIndex > 0) {
        integer = n.slice(0, decimalSepIndex);
        fraction = n.slice(decimalSepIndex + 1);
      } else {
        integer = n;
      }
      if (useGrouping && (notation !== "compact" || x2 >= 1e4)) {
        var groupSepSymbol = symbols.group;
        var groups = [];
        var integerNumberPattern = decimalNumberPattern.split(".")[0];
        var patternGroups = integerNumberPattern.split(",");
        var primaryGroupingSize = 3;
        var secondaryGroupingSize = 3;
        if (patternGroups.length > 1) {
          primaryGroupingSize = patternGroups[patternGroups.length - 1].length;
        }
        if (patternGroups.length > 2) {
          secondaryGroupingSize = patternGroups[patternGroups.length - 2].length;
        }
        var i2 = integer.length - primaryGroupingSize;
        if (i2 > 0) {
          groups.push(integer.slice(i2, i2 + primaryGroupingSize));
          for (i2 -= secondaryGroupingSize; i2 > 0; i2 -= secondaryGroupingSize) {
            groups.push(integer.slice(i2, i2 + secondaryGroupingSize));
          }
          groups.push(integer.slice(0, i2 + secondaryGroupingSize));
        } else {
          groups.push(integer);
        }
        while (groups.length > 0) {
          var integerGroup = groups.pop();
          result.push({ type: "integer", value: integerGroup });
          if (groups.length > 0) {
            result.push({ type: "group", value: groupSepSymbol });
          }
        }
      } else {
        result.push({ type: "integer", value: integer });
      }
      if (fraction !== void 0) {
        result.push({ type: "decimal", value: symbols.decimal }, { type: "fraction", value: fraction });
      }
      if ((notation === "scientific" || notation === "engineering") && isFinite(x2)) {
        result.push({ type: "exponentSeparator", value: symbols.exponential });
        if (exponent < 0) {
          result.push({ type: "exponentMinusSign", value: symbols.minusSign });
          exponent = -exponent;
        }
        var exponentResult = (0, ToRawFixed_1.ToRawFixed)(exponent, 0, 0);
        result.push({
          type: "exponentInteger",
          value: exponentResult.formattedString
        });
      }
      return result;
    }
    function getPatternForSign(pattern, sign) {
      if (pattern.indexOf(";") < 0) {
        pattern = "".concat(pattern, ";-").concat(pattern);
      }
      var _a = pattern.split(";"), zeroPattern = _a[0], negativePattern = _a[1];
      switch (sign) {
        case 0:
          return zeroPattern;
        case -1:
          return negativePattern;
        default:
          return negativePattern.indexOf("-") >= 0 ? negativePattern.replace(/-/g, "+") : "+".concat(zeroPattern);
      }
    }
    function getCompactDisplayPattern(numberResult, pl, data, style, compactDisplay, currencyDisplay, numberingSystem) {
      var _a;
      var roundedNumber = numberResult.roundedNumber, sign = numberResult.sign, magnitude = numberResult.magnitude;
      var magnitudeKey = String(Math.pow(10, magnitude));
      var defaultNumberingSystem = data.numbers.nu[0];
      var pattern;
      if (style === "currency" && currencyDisplay !== "name") {
        var byNumberingSystem = data.numbers.currency;
        var currencyData = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
        var compactPluralRules = (_a = currencyData.short) === null || _a === void 0 ? void 0 : _a[magnitudeKey];
        if (!compactPluralRules) {
          return null;
        }
        pattern = selectPlural(pl, roundedNumber, compactPluralRules);
      } else {
        var byNumberingSystem = data.numbers.decimal;
        var byCompactDisplay = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
        var compactPlaralRule = byCompactDisplay[compactDisplay][magnitudeKey];
        if (!compactPlaralRule) {
          return null;
        }
        pattern = selectPlural(pl, roundedNumber, compactPlaralRule);
      }
      if (pattern === "0") {
        return null;
      }
      pattern = getPatternForSign(pattern, sign).replace(/([^\s;\-\+\d¤]+)/g, "{c:$1}").replace(/0+/, "0");
      return pattern;
    }
    function selectPlural(pl, x2, rules) {
      return rules[pl.select(x2)] || rules.other;
    }
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/PartitionNumberPattern.js
var require_PartitionNumberPattern = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/PartitionNumberPattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PartitionNumberPattern = void 0;
    var tslib_1 = require_tslib();
    var FormatNumericToString_1 = require_FormatNumericToString();
    var _262_1 = require__();
    var ComputeExponent_1 = require_ComputeExponent();
    var format_to_parts_1 = (0, tslib_1.__importDefault)(require_format_to_parts());
    function PartitionNumberPattern(numberFormat, x2, _a) {
      var _b;
      var getInternalSlots = _a.getInternalSlots;
      var internalSlots = getInternalSlots(numberFormat);
      var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
      var symbols = dataLocaleData.numbers.symbols[numberingSystem] || dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
      var magnitude = 0;
      var exponent = 0;
      var n;
      if (isNaN(x2)) {
        n = symbols.nan;
      } else if (!isFinite(x2)) {
        n = symbols.infinity;
      } else {
        if (internalSlots.style === "percent") {
          x2 *= 100;
        }
        ;
        _b = (0, ComputeExponent_1.ComputeExponent)(numberFormat, x2, {
          getInternalSlots
        }), exponent = _b[0], magnitude = _b[1];
        x2 = exponent < 0 ? x2 * Math.pow(10, -exponent) : x2 / Math.pow(10, exponent);
        var formatNumberResult = (0, FormatNumericToString_1.FormatNumericToString)(internalSlots, x2);
        n = formatNumberResult.formattedString;
        x2 = formatNumberResult.roundedNumber;
      }
      var sign;
      var signDisplay = internalSlots.signDisplay;
      switch (signDisplay) {
        case "never":
          sign = 0;
          break;
        case "auto":
          if ((0, _262_1.SameValue)(x2, 0) || x2 > 0 || isNaN(x2)) {
            sign = 0;
          } else {
            sign = -1;
          }
          break;
        case "always":
          if ((0, _262_1.SameValue)(x2, 0) || x2 > 0 || isNaN(x2)) {
            sign = 1;
          } else {
            sign = -1;
          }
          break;
        default:
          if (x2 === 0 || isNaN(x2)) {
            sign = 0;
          } else if (x2 > 0) {
            sign = 1;
          } else {
            sign = -1;
          }
      }
      return (0, format_to_parts_1.default)({ roundedNumber: x2, formattedString: n, exponent, magnitude, sign }, internalSlots.dataLocaleData, pl, internalSlots);
    }
    exports2.PartitionNumberPattern = PartitionNumberPattern;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/FormatNumericToParts.js
var require_FormatNumericToParts = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/FormatNumericToParts.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.FormatNumericToParts = void 0;
    var PartitionNumberPattern_1 = require_PartitionNumberPattern();
    var _262_1 = require__();
    function FormatNumericToParts(nf, x2, implDetails) {
      var parts = (0, PartitionNumberPattern_1.PartitionNumberPattern)(nf, x2, implDetails);
      var result = (0, _262_1.ArrayCreate)(0);
      for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        result.push({
          type: part.type,
          value: part.value
        });
      }
      return result;
    }
    exports2.FormatNumericToParts = FormatNumericToParts;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/CanonicalizeLocaleList.js
var require_CanonicalizeLocaleList2 = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/CanonicalizeLocaleList.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.CanonicalizeLocaleList = void 0;
    function CanonicalizeLocaleList(locales) {
      return Intl.getCanonicalLocales(locales);
    }
    exports2.CanonicalizeLocaleList = CanonicalizeLocaleList;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/utils.js
var require_utils3 = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.invariant = exports2.UNICODE_EXTENSION_SEQUENCE_REGEX = void 0;
    exports2.UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
    function invariant(condition, message, Err) {
      if (Err === void 0) {
        Err = Error;
      }
      if (!condition) {
        throw new Err(message);
      }
    }
    exports2.invariant = invariant;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/BestAvailableLocale.js
var require_BestAvailableLocale = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/BestAvailableLocale.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BestAvailableLocale = void 0;
    function BestAvailableLocale(availableLocales, locale) {
      var candidate = locale;
      while (true) {
        if (availableLocales.has(candidate)) {
          return candidate;
        }
        var pos = candidate.lastIndexOf("-");
        if (!~pos) {
          return void 0;
        }
        if (pos >= 2 && candidate[pos - 2] === "-") {
          pos -= 2;
        }
        candidate = candidate.slice(0, pos);
      }
    }
    exports2.BestAvailableLocale = BestAvailableLocale;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/LookupMatcher.js
var require_LookupMatcher = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/LookupMatcher.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LookupMatcher = void 0;
    var utils_1 = require_utils3();
    var BestAvailableLocale_1 = require_BestAvailableLocale();
    function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
      var result = { locale: "" };
      for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, "");
        var availableLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(availableLocales, noExtensionLocale);
        if (availableLocale) {
          result.locale = availableLocale;
          if (locale !== noExtensionLocale) {
            result.extension = locale.slice(noExtensionLocale.length + 1, locale.length);
          }
          return result;
        }
      }
      result.locale = getDefaultLocale();
      return result;
    }
    exports2.LookupMatcher = LookupMatcher;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/BestFitMatcher.js
var require_BestFitMatcher = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/BestFitMatcher.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.BestFitMatcher = void 0;
    var BestAvailableLocale_1 = require_BestAvailableLocale();
    var utils_1 = require_utils3();
    function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
      var minimizedAvailableLocaleMap = {};
      var availableLocaleMap = {};
      var canonicalizedLocaleMap = {};
      var minimizedAvailableLocales = /* @__PURE__ */ new Set();
      availableLocales.forEach(function(locale2) {
        var minimizedLocale = new Intl.Locale(locale2).minimize().toString();
        var canonicalizedLocale = Intl.getCanonicalLocales(locale2)[0] || locale2;
        minimizedAvailableLocaleMap[minimizedLocale] = locale2;
        availableLocaleMap[locale2] = locale2;
        canonicalizedLocaleMap[canonicalizedLocale] = locale2;
        minimizedAvailableLocales.add(minimizedLocale);
        minimizedAvailableLocales.add(locale2);
        minimizedAvailableLocales.add(canonicalizedLocale);
      });
      var foundLocale;
      for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
        var l = requestedLocales_1[_i];
        if (foundLocale) {
          break;
        }
        var noExtensionLocale = l.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, "");
        if (availableLocales.has(noExtensionLocale)) {
          foundLocale = noExtensionLocale;
          break;
        }
        if (minimizedAvailableLocales.has(noExtensionLocale)) {
          foundLocale = noExtensionLocale;
          break;
        }
        var locale = new Intl.Locale(noExtensionLocale);
        var maximizedRequestedLocale = locale.maximize().toString();
        var minimizedRequestedLocale = locale.minimize().toString();
        if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
          foundLocale = minimizedRequestedLocale;
          break;
        }
        foundLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(minimizedAvailableLocales, maximizedRequestedLocale);
      }
      if (!foundLocale) {
        return { locale: getDefaultLocale() };
      }
      return {
        locale: availableLocaleMap[foundLocale] || canonicalizedLocaleMap[foundLocale] || minimizedAvailableLocaleMap[foundLocale] || foundLocale
      };
    }
    exports2.BestFitMatcher = BestFitMatcher;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/UnicodeExtensionValue.js
var require_UnicodeExtensionValue = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/UnicodeExtensionValue.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.UnicodeExtensionValue = void 0;
    var utils_1 = require_utils3();
    function UnicodeExtensionValue(extension, key) {
      (0, utils_1.invariant)(key.length === 2, "key must have 2 elements");
      var size = extension.length;
      var searchValue = "-".concat(key, "-");
      var pos = extension.indexOf(searchValue);
      if (pos !== -1) {
        var start = pos + 4;
        var end = start;
        var k = start;
        var done = false;
        while (!done) {
          var e2 = extension.indexOf("-", k);
          var len = void 0;
          if (e2 === -1) {
            len = size - k;
          } else {
            len = e2 - k;
          }
          if (len === 2) {
            done = true;
          } else if (e2 === -1) {
            end = size;
            done = true;
          } else {
            end = e2;
            k = e2 + 1;
          }
        }
        return extension.slice(start, end);
      }
      searchValue = "-".concat(key);
      pos = extension.indexOf(searchValue);
      if (pos !== -1 && pos + 3 === size) {
        return "";
      }
      return void 0;
    }
    exports2.UnicodeExtensionValue = UnicodeExtensionValue;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/ResolveLocale.js
var require_ResolveLocale = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/ResolveLocale.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ResolveLocale = void 0;
    var LookupMatcher_1 = require_LookupMatcher();
    var BestFitMatcher_1 = require_BestFitMatcher();
    var utils_1 = require_utils3();
    var UnicodeExtensionValue_1 = require_UnicodeExtensionValue();
    function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
      var matcher = options.localeMatcher;
      var r2;
      if (matcher === "lookup") {
        r2 = (0, LookupMatcher_1.LookupMatcher)(availableLocales, requestedLocales, getDefaultLocale);
      } else {
        r2 = (0, BestFitMatcher_1.BestFitMatcher)(availableLocales, requestedLocales, getDefaultLocale);
      }
      var foundLocale = r2.locale;
      var result = { locale: "", dataLocale: foundLocale };
      var supportedExtension = "-u";
      for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
        var key = relevantExtensionKeys_1[_i];
        (0, utils_1.invariant)(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
        var foundLocaleData = localeData[foundLocale];
        (0, utils_1.invariant)(typeof foundLocaleData === "object" && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
        var keyLocaleData = foundLocaleData[key];
        (0, utils_1.invariant)(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
        var value = keyLocaleData[0];
        (0, utils_1.invariant)(typeof value === "string" || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
        var supportedExtensionAddition = "";
        if (r2.extension) {
          var requestedValue = (0, UnicodeExtensionValue_1.UnicodeExtensionValue)(r2.extension, key);
          if (requestedValue !== void 0) {
            if (requestedValue !== "") {
              if (~keyLocaleData.indexOf(requestedValue)) {
                value = requestedValue;
                supportedExtensionAddition = "-".concat(key, "-").concat(value);
              }
            } else if (~requestedValue.indexOf("true")) {
              value = "true";
              supportedExtensionAddition = "-".concat(key);
            }
          }
        }
        if (key in options) {
          var optionsValue = options[key];
          (0, utils_1.invariant)(typeof optionsValue === "string" || typeof optionsValue === "undefined" || optionsValue === null, "optionsValue must be String, Undefined or Null");
          if (~keyLocaleData.indexOf(optionsValue)) {
            if (optionsValue !== value) {
              value = optionsValue;
              supportedExtensionAddition = "";
            }
          }
        }
        result[key] = value;
        supportedExtension += supportedExtensionAddition;
      }
      if (supportedExtension.length > 2) {
        var privateIndex = foundLocale.indexOf("-x-");
        if (privateIndex === -1) {
          foundLocale = foundLocale + supportedExtension;
        } else {
          var preExtension = foundLocale.slice(0, privateIndex);
          var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
          foundLocale = preExtension + supportedExtension + postExtension;
        }
        foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
      }
      result.locale = foundLocale;
      return result;
    }
    exports2.ResolveLocale = ResolveLocale;
  }
});

// node_modules/@formatjs/intl-localematcher/abstract/LookupSupportedLocales.js
var require_LookupSupportedLocales = __commonJS({
  "node_modules/@formatjs/intl-localematcher/abstract/LookupSupportedLocales.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.LookupSupportedLocales = void 0;
    var utils_1 = require_utils3();
    var BestAvailableLocale_1 = require_BestAvailableLocale();
    function LookupSupportedLocales(availableLocales, requestedLocales) {
      var subset = [];
      for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
        var locale = requestedLocales_1[_i];
        var noExtensionLocale = locale.replace(utils_1.UNICODE_EXTENSION_SEQUENCE_REGEX, "");
        var availableLocale = (0, BestAvailableLocale_1.BestAvailableLocale)(availableLocales, noExtensionLocale);
        if (availableLocale) {
          subset.push(availableLocale);
        }
      }
      return subset;
    }
    exports2.LookupSupportedLocales = LookupSupportedLocales;
  }
});

// node_modules/@formatjs/intl-localematcher/index.js
var require_intl_localematcher = __commonJS({
  "node_modules/@formatjs/intl-localematcher/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ResolveLocale = exports2.LookupSupportedLocales = exports2.match = void 0;
    var CanonicalizeLocaleList_1 = require_CanonicalizeLocaleList2();
    var ResolveLocale_1 = require_ResolveLocale();
    function match(requestedLocales, availableLocales, defaultLocale, opts) {
      var locales = availableLocales.reduce(function(all, l) {
        all.add(l);
        return all;
      }, /* @__PURE__ */ new Set());
      return (0, ResolveLocale_1.ResolveLocale)(locales, (0, CanonicalizeLocaleList_1.CanonicalizeLocaleList)(requestedLocales), {
        localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || "best fit"
      }, [], {}, function() {
        return defaultLocale;
      }).locale;
    }
    exports2.match = match;
    var LookupSupportedLocales_1 = require_LookupSupportedLocales();
    Object.defineProperty(exports2, "LookupSupportedLocales", { enumerable: true, get: function() {
      return LookupSupportedLocales_1.LookupSupportedLocales;
    } });
    var ResolveLocale_2 = require_ResolveLocale();
    Object.defineProperty(exports2, "ResolveLocale", { enumerable: true, get: function() {
      return ResolveLocale_2.ResolveLocale;
    } });
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/SetNumberFormatUnitOptions.js
var require_SetNumberFormatUnitOptions = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/SetNumberFormatUnitOptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SetNumberFormatUnitOptions = void 0;
    var GetOption_1 = require_GetOption();
    var IsWellFormedCurrencyCode_1 = require_IsWellFormedCurrencyCode();
    var IsWellFormedUnitIdentifier_1 = require_IsWellFormedUnitIdentifier();
    function SetNumberFormatUnitOptions(nf, options, _a) {
      if (options === void 0) {
        options = /* @__PURE__ */ Object.create(null);
      }
      var getInternalSlots = _a.getInternalSlots;
      var internalSlots = getInternalSlots(nf);
      var style = (0, GetOption_1.GetOption)(options, "style", "string", ["decimal", "percent", "currency", "unit"], "decimal");
      internalSlots.style = style;
      var currency = (0, GetOption_1.GetOption)(options, "currency", "string", void 0, void 0);
      if (currency !== void 0 && !(0, IsWellFormedCurrencyCode_1.IsWellFormedCurrencyCode)(currency)) {
        throw RangeError("Malformed currency code");
      }
      if (style === "currency" && currency === void 0) {
        throw TypeError("currency cannot be undefined");
      }
      var currencyDisplay = (0, GetOption_1.GetOption)(options, "currencyDisplay", "string", ["code", "symbol", "narrowSymbol", "name"], "symbol");
      var currencySign = (0, GetOption_1.GetOption)(options, "currencySign", "string", ["standard", "accounting"], "standard");
      var unit = (0, GetOption_1.GetOption)(options, "unit", "string", void 0, void 0);
      if (unit !== void 0 && !(0, IsWellFormedUnitIdentifier_1.IsWellFormedUnitIdentifier)(unit)) {
        throw RangeError("Invalid unit argument for Intl.NumberFormat()");
      }
      if (style === "unit" && unit === void 0) {
        throw TypeError("unit cannot be undefined");
      }
      var unitDisplay = (0, GetOption_1.GetOption)(options, "unitDisplay", "string", ["short", "narrow", "long"], "short");
      if (style === "currency") {
        internalSlots.currency = currency.toUpperCase();
        internalSlots.currencyDisplay = currencyDisplay;
        internalSlots.currencySign = currencySign;
      }
      if (style === "unit") {
        internalSlots.unit = unit;
        internalSlots.unitDisplay = unitDisplay;
      }
    }
    exports2.SetNumberFormatUnitOptions = SetNumberFormatUnitOptions;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/SetNumberFormatDigitOptions.js
var require_SetNumberFormatDigitOptions = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/SetNumberFormatDigitOptions.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SetNumberFormatDigitOptions = void 0;
    var GetNumberOption_1 = require_GetNumberOption();
    var DefaultNumberOption_1 = require_DefaultNumberOption();
    function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
      var mnid = (0, GetNumberOption_1.GetNumberOption)(opts, "minimumIntegerDigits", 1, 21, 1);
      var mnfd = opts.minimumFractionDigits;
      var mxfd = opts.maximumFractionDigits;
      var mnsd = opts.minimumSignificantDigits;
      var mxsd = opts.maximumSignificantDigits;
      internalSlots.minimumIntegerDigits = mnid;
      if (mnsd !== void 0 || mxsd !== void 0) {
        internalSlots.roundingType = "significantDigits";
        mnsd = (0, DefaultNumberOption_1.DefaultNumberOption)(mnsd, 1, 21, 1);
        mxsd = (0, DefaultNumberOption_1.DefaultNumberOption)(mxsd, mnsd, 21, 21);
        internalSlots.minimumSignificantDigits = mnsd;
        internalSlots.maximumSignificantDigits = mxsd;
      } else if (mnfd !== void 0 || mxfd !== void 0) {
        internalSlots.roundingType = "fractionDigits";
        mnfd = (0, DefaultNumberOption_1.DefaultNumberOption)(mnfd, 0, 20, mnfdDefault);
        var mxfdActualDefault = Math.max(mnfd, mxfdDefault);
        mxfd = (0, DefaultNumberOption_1.DefaultNumberOption)(mxfd, mnfd, 20, mxfdActualDefault);
        internalSlots.minimumFractionDigits = mnfd;
        internalSlots.maximumFractionDigits = mxfd;
      } else if (notation === "compact") {
        internalSlots.roundingType = "compactRounding";
      } else {
        internalSlots.roundingType = "fractionDigits";
        internalSlots.minimumFractionDigits = mnfdDefault;
        internalSlots.maximumFractionDigits = mxfdDefault;
      }
    }
    exports2.SetNumberFormatDigitOptions = SetNumberFormatDigitOptions;
  }
});

// node_modules/@formatjs/ecma402-abstract/NumberFormat/InitializeNumberFormat.js
var require_InitializeNumberFormat = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/NumberFormat/InitializeNumberFormat.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.InitializeNumberFormat = void 0;
    var CanonicalizeLocaleList_1 = require_CanonicalizeLocaleList();
    var GetOption_1 = require_GetOption();
    var intl_localematcher_1 = require_intl_localematcher();
    var SetNumberFormatUnitOptions_1 = require_SetNumberFormatUnitOptions();
    var CurrencyDigits_1 = require_CurrencyDigits();
    var SetNumberFormatDigitOptions_1 = require_SetNumberFormatDigitOptions();
    var utils_1 = require_utils2();
    var CoerceOptionsToObject_1 = require_CoerceOptionsToObject();
    function InitializeNumberFormat(nf, locales, opts, _a) {
      var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData = _a.currencyDigitsData;
      var requestedLocales = (0, CanonicalizeLocaleList_1.CanonicalizeLocaleList)(locales);
      var options = (0, CoerceOptionsToObject_1.CoerceOptionsToObject)(opts);
      var opt = /* @__PURE__ */ Object.create(null);
      var matcher = (0, GetOption_1.GetOption)(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
      opt.localeMatcher = matcher;
      var numberingSystem = (0, GetOption_1.GetOption)(options, "numberingSystem", "string", void 0, void 0);
      if (numberingSystem !== void 0 && numberingSystemNames.indexOf(numberingSystem) < 0) {
        throw RangeError("Invalid numberingSystems: ".concat(numberingSystem));
      }
      opt.nu = numberingSystem;
      var r2 = (0, intl_localematcher_1.ResolveLocale)(availableLocales, requestedLocales, opt, ["nu"], localeData, getDefaultLocale);
      var dataLocaleData = localeData[r2.dataLocale];
      (0, utils_1.invariant)(!!dataLocaleData, "Missing locale data for ".concat(r2.dataLocale));
      var internalSlots = getInternalSlots(nf);
      internalSlots.locale = r2.locale;
      internalSlots.dataLocale = r2.dataLocale;
      internalSlots.numberingSystem = r2.nu;
      internalSlots.dataLocaleData = dataLocaleData;
      (0, SetNumberFormatUnitOptions_1.SetNumberFormatUnitOptions)(nf, options, { getInternalSlots });
      var style = internalSlots.style;
      var mnfdDefault;
      var mxfdDefault;
      if (style === "currency") {
        var currency = internalSlots.currency;
        var cDigits = (0, CurrencyDigits_1.CurrencyDigits)(currency, { currencyDigitsData });
        mnfdDefault = cDigits;
        mxfdDefault = cDigits;
      } else {
        mnfdDefault = 0;
        mxfdDefault = style === "percent" ? 0 : 3;
      }
      var notation = (0, GetOption_1.GetOption)(options, "notation", "string", ["standard", "scientific", "engineering", "compact"], "standard");
      internalSlots.notation = notation;
      (0, SetNumberFormatDigitOptions_1.SetNumberFormatDigitOptions)(internalSlots, options, mnfdDefault, mxfdDefault, notation);
      var compactDisplay = (0, GetOption_1.GetOption)(options, "compactDisplay", "string", ["short", "long"], "short");
      if (notation === "compact") {
        internalSlots.compactDisplay = compactDisplay;
      }
      var useGrouping = (0, GetOption_1.GetOption)(options, "useGrouping", "boolean", void 0, true);
      internalSlots.useGrouping = useGrouping;
      var signDisplay = (0, GetOption_1.GetOption)(options, "signDisplay", "string", ["auto", "never", "always", "exceptZero"], "auto");
      internalSlots.signDisplay = signDisplay;
      return nf;
    }
    exports2.InitializeNumberFormat = InitializeNumberFormat;
  }
});

// node_modules/@formatjs/ecma402-abstract/PartitionPattern.js
var require_PartitionPattern = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/PartitionPattern.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PartitionPattern = void 0;
    var utils_1 = require_utils2();
    function PartitionPattern(pattern) {
      var result = [];
      var beginIndex = pattern.indexOf("{");
      var endIndex = 0;
      var nextIndex = 0;
      var length = pattern.length;
      while (beginIndex < pattern.length && beginIndex > -1) {
        endIndex = pattern.indexOf("}", beginIndex);
        (0, utils_1.invariant)(endIndex > beginIndex, "Invalid pattern ".concat(pattern));
        if (beginIndex > nextIndex) {
          result.push({
            type: "literal",
            value: pattern.substring(nextIndex, beginIndex)
          });
        }
        result.push({
          type: pattern.substring(beginIndex + 1, endIndex),
          value: void 0
        });
        nextIndex = endIndex + 1;
        beginIndex = pattern.indexOf("{", nextIndex);
      }
      if (nextIndex < length) {
        result.push({
          type: "literal",
          value: pattern.substring(nextIndex, length)
        });
      }
      return result;
    }
    exports2.PartitionPattern = PartitionPattern;
  }
});

// node_modules/@formatjs/ecma402-abstract/SupportedLocales.js
var require_SupportedLocales = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/SupportedLocales.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SupportedLocales = void 0;
    var _262_1 = require__();
    var GetOption_1 = require_GetOption();
    var intl_localematcher_1 = require_intl_localematcher();
    function SupportedLocales(availableLocales, requestedLocales, options) {
      var matcher = "best fit";
      if (options !== void 0) {
        options = (0, _262_1.ToObject)(options);
        matcher = (0, GetOption_1.GetOption)(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
      }
      if (matcher === "best fit") {
        return (0, intl_localematcher_1.LookupSupportedLocales)(availableLocales, requestedLocales);
      }
      return (0, intl_localematcher_1.LookupSupportedLocales)(availableLocales, requestedLocales);
    }
    exports2.SupportedLocales = SupportedLocales;
  }
});

// node_modules/@formatjs/ecma402-abstract/data.js
var require_data = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/data.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isMissingLocaleDataError = void 0;
    var tslib_1 = require_tslib();
    var MissingLocaleDataError = function(_super) {
      (0, tslib_1.__extends)(MissingLocaleDataError2, _super);
      function MissingLocaleDataError2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "MISSING_LOCALE_DATA";
        return _this;
      }
      return MissingLocaleDataError2;
    }(Error);
    function isMissingLocaleDataError(e2) {
      return e2.type === "MISSING_LOCALE_DATA";
    }
    exports2.isMissingLocaleDataError = isMissingLocaleDataError;
  }
});

// node_modules/@formatjs/ecma402-abstract/types/relative-time.js
var require_relative_time = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/types/relative-time.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@formatjs/ecma402-abstract/types/date-time.js
var require_date_time2 = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/types/date-time.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RangePatternType = void 0;
    var RangePatternType;
    (function(RangePatternType2) {
      RangePatternType2["startRange"] = "startRange";
      RangePatternType2["shared"] = "shared";
      RangePatternType2["endRange"] = "endRange";
    })(RangePatternType = exports2.RangePatternType || (exports2.RangePatternType = {}));
  }
});

// node_modules/@formatjs/ecma402-abstract/types/list.js
var require_list = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/types/list.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@formatjs/ecma402-abstract/types/plural-rules.js
var require_plural_rules = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/types/plural-rules.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@formatjs/ecma402-abstract/types/number.js
var require_number2 = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/types/number.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@formatjs/ecma402-abstract/types/displaynames.js
var require_displaynames = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/types/displaynames.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
  }
});

// node_modules/@formatjs/ecma402-abstract/index.js
var require_ecma402_abstract = __commonJS({
  "node_modules/@formatjs/ecma402-abstract/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.invariant = exports2.isMissingLocaleDataError = exports2.defineProperty = exports2.getMagnitude = exports2.setMultiInternalSlots = exports2.setInternalSlot = exports2.isLiteralPart = exports2.getMultiInternalSlots = exports2.getInternalSlot = exports2._formatToParts = void 0;
    var tslib_1 = require_tslib();
    (0, tslib_1.__exportStar)(require_CanonicalizeLocaleList(), exports2);
    (0, tslib_1.__exportStar)(require_CanonicalizeTimeZoneName(), exports2);
    (0, tslib_1.__exportStar)(require_CoerceOptionsToObject(), exports2);
    (0, tslib_1.__exportStar)(require_GetNumberOption(), exports2);
    (0, tslib_1.__exportStar)(require_GetOption(), exports2);
    (0, tslib_1.__exportStar)(require_GetOptionsObject(), exports2);
    (0, tslib_1.__exportStar)(require_IsSanctionedSimpleUnitIdentifier(), exports2);
    (0, tslib_1.__exportStar)(require_IsValidTimeZoneName(), exports2);
    (0, tslib_1.__exportStar)(require_IsWellFormedCurrencyCode(), exports2);
    (0, tslib_1.__exportStar)(require_IsWellFormedUnitIdentifier(), exports2);
    (0, tslib_1.__exportStar)(require_ComputeExponent(), exports2);
    (0, tslib_1.__exportStar)(require_ComputeExponentForMagnitude(), exports2);
    (0, tslib_1.__exportStar)(require_CurrencyDigits(), exports2);
    (0, tslib_1.__exportStar)(require_FormatNumericToParts(), exports2);
    (0, tslib_1.__exportStar)(require_FormatNumericToString(), exports2);
    (0, tslib_1.__exportStar)(require_InitializeNumberFormat(), exports2);
    (0, tslib_1.__exportStar)(require_PartitionNumberPattern(), exports2);
    (0, tslib_1.__exportStar)(require_SetNumberFormatDigitOptions(), exports2);
    (0, tslib_1.__exportStar)(require_SetNumberFormatUnitOptions(), exports2);
    (0, tslib_1.__exportStar)(require_ToRawFixed(), exports2);
    (0, tslib_1.__exportStar)(require_ToRawPrecision(), exports2);
    var format_to_parts_1 = require_format_to_parts();
    Object.defineProperty(exports2, "_formatToParts", { enumerable: true, get: function() {
      return (0, tslib_1.__importDefault)(format_to_parts_1).default;
    } });
    (0, tslib_1.__exportStar)(require_PartitionPattern(), exports2);
    (0, tslib_1.__exportStar)(require_SupportedLocales(), exports2);
    var utils_1 = require_utils2();
    Object.defineProperty(exports2, "getInternalSlot", { enumerable: true, get: function() {
      return utils_1.getInternalSlot;
    } });
    Object.defineProperty(exports2, "getMultiInternalSlots", { enumerable: true, get: function() {
      return utils_1.getMultiInternalSlots;
    } });
    Object.defineProperty(exports2, "isLiteralPart", { enumerable: true, get: function() {
      return utils_1.isLiteralPart;
    } });
    Object.defineProperty(exports2, "setInternalSlot", { enumerable: true, get: function() {
      return utils_1.setInternalSlot;
    } });
    Object.defineProperty(exports2, "setMultiInternalSlots", { enumerable: true, get: function() {
      return utils_1.setMultiInternalSlots;
    } });
    Object.defineProperty(exports2, "getMagnitude", { enumerable: true, get: function() {
      return utils_1.getMagnitude;
    } });
    Object.defineProperty(exports2, "defineProperty", { enumerable: true, get: function() {
      return utils_1.defineProperty;
    } });
    var data_1 = require_data();
    Object.defineProperty(exports2, "isMissingLocaleDataError", { enumerable: true, get: function() {
      return data_1.isMissingLocaleDataError;
    } });
    (0, tslib_1.__exportStar)(require_relative_time(), exports2);
    (0, tslib_1.__exportStar)(require_date_time2(), exports2);
    (0, tslib_1.__exportStar)(require_list(), exports2);
    (0, tslib_1.__exportStar)(require_plural_rules(), exports2);
    (0, tslib_1.__exportStar)(require_number2(), exports2);
    (0, tslib_1.__exportStar)(require_displaynames(), exports2);
    var utils_2 = require_utils2();
    Object.defineProperty(exports2, "invariant", { enumerable: true, get: function() {
      return utils_2.invariant;
    } });
    (0, tslib_1.__exportStar)(require__(), exports2);
  }
});

// node_modules/@formatjs/intl/src/message.js
var require_message = __commonJS({
  "node_modules/@formatjs/intl/src/message.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatMessage = void 0;
    var tslib_1 = require_tslib();
    var ecma402_abstract_1 = require_ecma402_abstract();
    var intl_messageformat_1 = require_intl_messageformat();
    var error_1 = require_error3();
    var icu_messageformat_parser_1 = require_icu_messageformat_parser();
    function setTimeZoneInOptions(opts, timeZone) {
      return Object.keys(opts).reduce(function(all, k) {
        all[k] = (0, tslib_1.__assign)({ timeZone }, opts[k]);
        return all;
      }, {});
    }
    function deepMergeOptions(opts1, opts2) {
      var keys = Object.keys((0, tslib_1.__assign)((0, tslib_1.__assign)({}, opts1), opts2));
      return keys.reduce(function(all, k) {
        all[k] = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, opts1[k] || {}), opts2[k] || {});
        return all;
      }, {});
    }
    function deepMergeFormatsAndSetTimeZone(f1, timeZone) {
      if (!timeZone) {
        return f1;
      }
      var mfFormats = intl_messageformat_1.IntlMessageFormat.formats;
      return (0, tslib_1.__assign)((0, tslib_1.__assign)((0, tslib_1.__assign)({}, mfFormats), f1), { date: deepMergeOptions(setTimeZoneInOptions(mfFormats.date, timeZone), setTimeZoneInOptions(f1.date || {}, timeZone)), time: deepMergeOptions(setTimeZoneInOptions(mfFormats.time, timeZone), setTimeZoneInOptions(f1.time || {}, timeZone)) });
    }
    var formatMessage = function(_a, state, messageDescriptor, values, opts) {
      var locale = _a.locale, formats = _a.formats, messages = _a.messages, defaultLocale = _a.defaultLocale, defaultFormats = _a.defaultFormats, fallbackOnEmptyString = _a.fallbackOnEmptyString, onError = _a.onError, timeZone = _a.timeZone, defaultRichTextElements = _a.defaultRichTextElements;
      if (messageDescriptor === void 0) {
        messageDescriptor = { id: "" };
      }
      var msgId = messageDescriptor.id, defaultMessage = messageDescriptor.defaultMessage;
      (0, ecma402_abstract_1.invariant)(!!msgId, "[@formatjs/intl] An `id` must be provided to format a message. You can either:\n1. Configure your build toolchain with [babel-plugin-formatjs](https://formatjs.io/docs/tooling/babel-plugin)\nor [@formatjs/ts-transformer](https://formatjs.io/docs/tooling/ts-transformer) OR\n2. Configure your `eslint` config to include [eslint-plugin-formatjs](https://formatjs.io/docs/tooling/linter#enforce-id)\nto autofix this issue");
      var id = String(msgId);
      var message = messages && Object.prototype.hasOwnProperty.call(messages, id) && messages[id];
      if (Array.isArray(message) && message.length === 1 && message[0].type === icu_messageformat_parser_1.TYPE.literal) {
        return message[0].value;
      }
      if (!values && message && typeof message === "string" && !defaultRichTextElements) {
        return message.replace(/'\{(.*?)\}'/gi, "{$1}");
      }
      values = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, defaultRichTextElements), values || {});
      formats = deepMergeFormatsAndSetTimeZone(formats, timeZone);
      defaultFormats = deepMergeFormatsAndSetTimeZone(defaultFormats, timeZone);
      if (!message) {
        if (fallbackOnEmptyString === false && message === "") {
          return message;
        }
        if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
          onError(new error_1.MissingTranslationError(messageDescriptor, locale));
        }
        if (defaultMessage) {
          try {
            var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats, opts);
            return formatter.format(values);
          } catch (e2) {
            onError(new error_1.MessageFormatError('Error formatting default message for: "'.concat(id, '", rendering default message verbatim'), locale, messageDescriptor, e2));
            return typeof defaultMessage === "string" ? defaultMessage : id;
          }
        }
        return id;
      }
      try {
        var formatter = state.getMessageFormat(message, locale, formats, (0, tslib_1.__assign)({ formatters: state }, opts || {}));
        return formatter.format(values);
      } catch (e2) {
        onError(new error_1.MessageFormatError('Error formatting message: "'.concat(id, '", using ').concat(defaultMessage ? "default message" : "id", " as fallback."), locale, messageDescriptor, e2));
      }
      if (defaultMessage) {
        try {
          var formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats, opts);
          return formatter.format(values);
        } catch (e2) {
          onError(new error_1.MessageFormatError('Error formatting the default message for: "'.concat(id, '", rendering message verbatim'), locale, messageDescriptor, e2));
        }
      }
      if (typeof message === "string") {
        return message;
      }
      if (typeof defaultMessage === "string") {
        return defaultMessage;
      }
      return id;
    };
    exports2.formatMessage = formatMessage;
  }
});

// node_modules/@formatjs/intl/src/dateTime.js
var require_dateTime = __commonJS({
  "node_modules/@formatjs/intl/src/dateTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatTimeToParts = exports2.formatDateToParts = exports2.formatDateTimeRange = exports2.formatTime = exports2.formatDate = exports2.getFormatter = void 0;
    var tslib_1 = require_tslib();
    var utils_1 = require_utils();
    var error_1 = require_error3();
    var DATE_TIME_FORMAT_OPTIONS = [
      "formatMatcher",
      "timeZone",
      "hour12",
      "weekday",
      "era",
      "year",
      "month",
      "day",
      "hour",
      "minute",
      "second",
      "timeZoneName",
      "hourCycle",
      "dateStyle",
      "timeStyle",
      "calendar",
      "numberingSystem",
      "fractionalSecondDigits"
    ];
    function getFormatter(_a, type, getDateTimeFormat, options) {
      var locale = _a.locale, formats = _a.formats, onError = _a.onError, timeZone = _a.timeZone;
      if (options === void 0) {
        options = {};
      }
      var format = options.format;
      var defaults = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, timeZone && { timeZone }), format && (0, utils_1.getNamedFormat)(formats, type, format, onError));
      var filteredOptions = (0, utils_1.filterProps)(options, DATE_TIME_FORMAT_OPTIONS, defaults);
      if (type === "time" && !filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second && !filteredOptions.timeStyle && !filteredOptions.dateStyle) {
        filteredOptions = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, filteredOptions), { hour: "numeric", minute: "numeric" });
      }
      return getDateTimeFormat(locale, filteredOptions);
    }
    exports2.getFormatter = getFormatter;
    function formatDate(config, getDateTimeFormat) {
      var _a = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
      }
      var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
      var date = typeof value === "string" ? new Date(value || 0) : value;
      try {
        return getFormatter(config, "date", getDateTimeFormat, options).format(date);
      } catch (e2) {
        config.onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting date.", e2));
      }
      return String(date);
    }
    exports2.formatDate = formatDate;
    function formatTime(config, getDateTimeFormat) {
      var _a = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
      }
      var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
      var date = typeof value === "string" ? new Date(value || 0) : value;
      try {
        return getFormatter(config, "time", getDateTimeFormat, options).format(date);
      } catch (e2) {
        config.onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting time.", e2));
      }
      return String(date);
    }
    exports2.formatTime = formatTime;
    function formatDateTimeRange(config, getDateTimeFormat) {
      var _a = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
      }
      var from = _a[0], to = _a[1], _b = _a[2], options = _b === void 0 ? {} : _b;
      var timeZone = config.timeZone, locale = config.locale, onError = config.onError;
      var filteredOptions = (0, utils_1.filterProps)(options, DATE_TIME_FORMAT_OPTIONS, timeZone ? { timeZone } : {});
      try {
        return getDateTimeFormat(locale, filteredOptions).formatRange(from, to);
      } catch (e2) {
        onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting date time range.", e2));
      }
      return String(from);
    }
    exports2.formatDateTimeRange = formatDateTimeRange;
    function formatDateToParts(config, getDateTimeFormat) {
      var _a = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
      }
      var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
      var date = typeof value === "string" ? new Date(value || 0) : value;
      try {
        return getFormatter(config, "date", getDateTimeFormat, options).formatToParts(date);
      } catch (e2) {
        config.onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting date.", e2));
      }
      return [];
    }
    exports2.formatDateToParts = formatDateToParts;
    function formatTimeToParts(config, getDateTimeFormat) {
      var _a = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        _a[_i - 2] = arguments[_i];
      }
      var value = _a[0], _b = _a[1], options = _b === void 0 ? {} : _b;
      var date = typeof value === "string" ? new Date(value || 0) : value;
      try {
        return getFormatter(config, "time", getDateTimeFormat, options).formatToParts(date);
      } catch (e2) {
        config.onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting time.", e2));
      }
      return [];
    }
    exports2.formatTimeToParts = formatTimeToParts;
  }
});

// node_modules/@formatjs/intl/src/displayName.js
var require_displayName = __commonJS({
  "node_modules/@formatjs/intl/src/displayName.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatDisplayName = void 0;
    var utils_1 = require_utils();
    var intl_messageformat_1 = require_intl_messageformat();
    var error_1 = require_error3();
    var DISPLAY_NAMES_OPTONS = [
      "style",
      "type",
      "fallback"
    ];
    function formatDisplayName(_a, getDisplayNames, value, options) {
      var locale = _a.locale, onError = _a.onError;
      var DisplayNames = Intl.DisplayNames;
      if (!DisplayNames) {
        onError(new intl_messageformat_1.FormatError('Intl.DisplayNames is not available in this environment.\nTry polyfilling it using "@formatjs/intl-displaynames"\n', intl_messageformat_1.ErrorCode.MISSING_INTL_API));
      }
      var filteredOptions = (0, utils_1.filterProps)(options, DISPLAY_NAMES_OPTONS);
      try {
        return getDisplayNames(locale, filteredOptions).of(value);
      } catch (e2) {
        onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting display name.", e2));
      }
    }
    exports2.formatDisplayName = formatDisplayName;
  }
});

// node_modules/@formatjs/intl/src/list.js
var require_list2 = __commonJS({
  "node_modules/@formatjs/intl/src/list.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatListToParts = exports2.formatList = void 0;
    var tslib_1 = require_tslib();
    var utils_1 = require_utils();
    var intl_messageformat_1 = require_intl_messageformat();
    var error_1 = require_error3();
    var LIST_FORMAT_OPTIONS = [
      "type",
      "style"
    ];
    var now = Date.now();
    function generateToken(i2) {
      return "".concat(now, "_").concat(i2, "_").concat(now);
    }
    function formatList(opts, getListFormat, values, options) {
      if (options === void 0) {
        options = {};
      }
      var results = formatListToParts(opts, getListFormat, values, options).reduce(function(all, el) {
        var val = el.value;
        if (typeof val !== "string") {
          all.push(val);
        } else if (typeof all[all.length - 1] === "string") {
          all[all.length - 1] += val;
        } else {
          all.push(val);
        }
        return all;
      }, []);
      return results.length === 1 ? results[0] : results;
    }
    exports2.formatList = formatList;
    function formatListToParts(_a, getListFormat, values, options) {
      var locale = _a.locale, onError = _a.onError;
      if (options === void 0) {
        options = {};
      }
      var ListFormat = Intl.ListFormat;
      if (!ListFormat) {
        onError(new intl_messageformat_1.FormatError('Intl.ListFormat is not available in this environment.\nTry polyfilling it using "@formatjs/intl-listformat"\n', intl_messageformat_1.ErrorCode.MISSING_INTL_API));
      }
      var filteredOptions = (0, utils_1.filterProps)(options, LIST_FORMAT_OPTIONS);
      try {
        var richValues_1 = {};
        var serializedValues = values.map(function(v, i2) {
          if (typeof v === "object") {
            var id = generateToken(i2);
            richValues_1[id] = v;
            return id;
          }
          return String(v);
        });
        return getListFormat(locale, filteredOptions).formatToParts(serializedValues).map(function(part) {
          return part.type === "literal" ? part : (0, tslib_1.__assign)((0, tslib_1.__assign)({}, part), { value: richValues_1[part.value] || part.value });
        });
      } catch (e2) {
        onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting list.", e2));
      }
      return values;
    }
    exports2.formatListToParts = formatListToParts;
  }
});

// node_modules/@formatjs/intl/src/plural.js
var require_plural = __commonJS({
  "node_modules/@formatjs/intl/src/plural.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatPlural = void 0;
    var utils_1 = require_utils();
    var error_1 = require_error3();
    var intl_messageformat_1 = require_intl_messageformat();
    var PLURAL_FORMAT_OPTIONS = ["type"];
    function formatPlural(_a, getPluralRules, value, options) {
      var locale = _a.locale, onError = _a.onError;
      if (options === void 0) {
        options = {};
      }
      if (!Intl.PluralRules) {
        onError(new intl_messageformat_1.FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', intl_messageformat_1.ErrorCode.MISSING_INTL_API));
      }
      var filteredOptions = (0, utils_1.filterProps)(options, PLURAL_FORMAT_OPTIONS);
      try {
        return getPluralRules(locale, filteredOptions).select(value);
      } catch (e2) {
        onError(new error_1.IntlFormatError("Error formatting plural.", locale, e2));
      }
      return "other";
    }
    exports2.formatPlural = formatPlural;
  }
});

// node_modules/@formatjs/intl/src/relativeTime.js
var require_relativeTime = __commonJS({
  "node_modules/@formatjs/intl/src/relativeTime.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatRelativeTime = void 0;
    var utils_1 = require_utils();
    var intl_messageformat_1 = require_intl_messageformat();
    var error_1 = require_error3();
    var RELATIVE_TIME_FORMAT_OPTIONS = ["numeric", "style"];
    function getFormatter(_a, getRelativeTimeFormat, options) {
      var locale = _a.locale, formats = _a.formats, onError = _a.onError;
      if (options === void 0) {
        options = {};
      }
      var format = options.format;
      var defaults = !!format && (0, utils_1.getNamedFormat)(formats, "relative", format, onError) || {};
      var filteredOptions = (0, utils_1.filterProps)(options, RELATIVE_TIME_FORMAT_OPTIONS, defaults);
      return getRelativeTimeFormat(locale, filteredOptions);
    }
    function formatRelativeTime(config, getRelativeTimeFormat, value, unit, options) {
      if (options === void 0) {
        options = {};
      }
      if (!unit) {
        unit = "second";
      }
      var RelativeTimeFormat = Intl.RelativeTimeFormat;
      if (!RelativeTimeFormat) {
        config.onError(new intl_messageformat_1.FormatError('Intl.RelativeTimeFormat is not available in this environment.\nTry polyfilling it using "@formatjs/intl-relativetimeformat"\n', intl_messageformat_1.ErrorCode.MISSING_INTL_API));
      }
      try {
        return getFormatter(config, getRelativeTimeFormat, options).format(value, unit);
      } catch (e2) {
        config.onError(new error_1.IntlFormatError("Error formatting relative time.", config.locale, e2));
      }
      return String(value);
    }
    exports2.formatRelativeTime = formatRelativeTime;
  }
});

// node_modules/@formatjs/intl/src/number.js
var require_number3 = __commonJS({
  "node_modules/@formatjs/intl/src/number.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.formatNumberToParts = exports2.formatNumber = exports2.getFormatter = void 0;
    var utils_1 = require_utils();
    var error_1 = require_error3();
    var NUMBER_FORMAT_OPTIONS = [
      "style",
      "currency",
      "currencyDisplay",
      "unit",
      "unitDisplay",
      "useGrouping",
      "minimumIntegerDigits",
      "minimumFractionDigits",
      "maximumFractionDigits",
      "minimumSignificantDigits",
      "maximumSignificantDigits",
      "compactDisplay",
      "currencyDisplay",
      "currencySign",
      "notation",
      "signDisplay",
      "unit",
      "unitDisplay",
      "numberingSystem"
    ];
    function getFormatter(_a, getNumberFormat, options) {
      var locale = _a.locale, formats = _a.formats, onError = _a.onError;
      if (options === void 0) {
        options = {};
      }
      var format = options.format;
      var defaults = format && (0, utils_1.getNamedFormat)(formats, "number", format, onError) || {};
      var filteredOptions = (0, utils_1.filterProps)(options, NUMBER_FORMAT_OPTIONS, defaults);
      return getNumberFormat(locale, filteredOptions);
    }
    exports2.getFormatter = getFormatter;
    function formatNumber(config, getNumberFormat, value, options) {
      if (options === void 0) {
        options = {};
      }
      try {
        return getFormatter(config, getNumberFormat, options).format(value);
      } catch (e2) {
        config.onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting number.", e2));
      }
      return String(value);
    }
    exports2.formatNumber = formatNumber;
    function formatNumberToParts(config, getNumberFormat, value, options) {
      if (options === void 0) {
        options = {};
      }
      try {
        return getFormatter(config, getNumberFormat, options).formatToParts(value);
      } catch (e2) {
        config.onError(new error_1.IntlError(error_1.IntlErrorCode.FORMAT_ERROR, "Error formatting number.", e2));
      }
      return [];
    }
    exports2.formatNumberToParts = formatNumberToParts;
  }
});

// node_modules/@formatjs/intl/src/create-intl.js
var require_create_intl = __commonJS({
  "node_modules/@formatjs/intl/src/create-intl.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createIntl = void 0;
    var tslib_1 = require_tslib();
    var utils_1 = require_utils();
    var error_1 = require_error3();
    var number_1 = require_number3();
    var relativeTime_1 = require_relativeTime();
    var dateTime_1 = require_dateTime();
    var plural_1 = require_plural();
    var message_1 = require_message();
    var list_1 = require_list2();
    var displayName_1 = require_displayName();
    function messagesContainString(messages) {
      var firstMessage = messages ? messages[Object.keys(messages)[0]] : void 0;
      return typeof firstMessage === "string";
    }
    function verifyConfigMessages(config) {
      if (config.onWarn && config.defaultRichTextElements && messagesContainString(config.messages || {})) {
        config.onWarn('[@formatjs/intl] "defaultRichTextElements" was specified but "message" was not pre-compiled. \nPlease consider using "@formatjs/cli" to pre-compile your messages for performance.\nFor more details see https://formatjs.io/docs/getting-started/message-distribution');
      }
    }
    function createIntl2(config, cache) {
      var formatters = (0, utils_1.createFormatters)(cache);
      var resolvedConfig = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, utils_1.DEFAULT_INTL_CONFIG), config);
      var locale = resolvedConfig.locale, defaultLocale = resolvedConfig.defaultLocale, onError = resolvedConfig.onError;
      if (!locale) {
        if (onError) {
          onError(new error_1.InvalidConfigError('"locale" was not configured, using "'.concat(defaultLocale, '" as fallback. See https://formatjs.io/docs/react-intl/api#intlshape for more details')));
        }
        resolvedConfig.locale = resolvedConfig.defaultLocale || "en";
      } else if (!Intl.NumberFormat.supportedLocalesOf(locale).length && onError) {
        onError(new error_1.MissingDataError('Missing locale data for locale: "'.concat(locale, '" in Intl.NumberFormat. Using default locale: "').concat(defaultLocale, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details')));
      } else if (!Intl.DateTimeFormat.supportedLocalesOf(locale).length && onError) {
        onError(new error_1.MissingDataError('Missing locale data for locale: "'.concat(locale, '" in Intl.DateTimeFormat. Using default locale: "').concat(defaultLocale, '" as fallback. See https://formatjs.io/docs/react-intl#runtime-requirements for more details')));
      }
      verifyConfigMessages(resolvedConfig);
      return (0, tslib_1.__assign)((0, tslib_1.__assign)({}, resolvedConfig), { formatters, formatNumber: number_1.formatNumber.bind(null, resolvedConfig, formatters.getNumberFormat), formatNumberToParts: number_1.formatNumberToParts.bind(null, resolvedConfig, formatters.getNumberFormat), formatRelativeTime: relativeTime_1.formatRelativeTime.bind(null, resolvedConfig, formatters.getRelativeTimeFormat), formatDate: dateTime_1.formatDate.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatDateToParts: dateTime_1.formatDateToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatTime: dateTime_1.formatTime.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatDateTimeRange: dateTime_1.formatDateTimeRange.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatTimeToParts: dateTime_1.formatTimeToParts.bind(null, resolvedConfig, formatters.getDateTimeFormat), formatPlural: plural_1.formatPlural.bind(null, resolvedConfig, formatters.getPluralRules), formatMessage: message_1.formatMessage.bind(null, resolvedConfig, formatters), $t: message_1.formatMessage.bind(null, resolvedConfig, formatters), formatList: list_1.formatList.bind(null, resolvedConfig, formatters.getListFormat), formatListToParts: list_1.formatListToParts.bind(null, resolvedConfig, formatters.getListFormat), formatDisplayName: displayName_1.formatDisplayName.bind(null, resolvedConfig, formatters.getDisplayNames) });
    }
    exports2.createIntl = createIntl2;
  }
});

// node_modules/@formatjs/intl/index.js
var require_intl = __commonJS({
  "node_modules/@formatjs/intl/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.createIntl = exports2.formatNumberToParts = exports2.formatNumber = exports2.formatRelativeTime = exports2.formatPlural = exports2.formatList = exports2.formatDisplayName = exports2.formatTimeToParts = exports2.formatTime = exports2.formatDateToParts = exports2.formatDate = exports2.formatMessage = exports2.getNamedFormat = exports2.createFormatters = exports2.DEFAULT_INTL_CONFIG = exports2.filterProps = exports2.createIntlCache = exports2.defineMessage = exports2.defineMessages = void 0;
    var tslib_1 = require_tslib();
    (0, tslib_1.__exportStar)(require_types(), exports2);
    function defineMessages(msgs) {
      return msgs;
    }
    exports2.defineMessages = defineMessages;
    function defineMessage(msg) {
      return msg;
    }
    exports2.defineMessage = defineMessage;
    var utils_1 = require_utils();
    Object.defineProperty(exports2, "createIntlCache", { enumerable: true, get: function() {
      return utils_1.createIntlCache;
    } });
    Object.defineProperty(exports2, "filterProps", { enumerable: true, get: function() {
      return utils_1.filterProps;
    } });
    Object.defineProperty(exports2, "DEFAULT_INTL_CONFIG", { enumerable: true, get: function() {
      return utils_1.DEFAULT_INTL_CONFIG;
    } });
    Object.defineProperty(exports2, "createFormatters", { enumerable: true, get: function() {
      return utils_1.createFormatters;
    } });
    Object.defineProperty(exports2, "getNamedFormat", { enumerable: true, get: function() {
      return utils_1.getNamedFormat;
    } });
    (0, tslib_1.__exportStar)(require_error3(), exports2);
    var message_1 = require_message();
    Object.defineProperty(exports2, "formatMessage", { enumerable: true, get: function() {
      return message_1.formatMessage;
    } });
    var dateTime_1 = require_dateTime();
    Object.defineProperty(exports2, "formatDate", { enumerable: true, get: function() {
      return dateTime_1.formatDate;
    } });
    Object.defineProperty(exports2, "formatDateToParts", { enumerable: true, get: function() {
      return dateTime_1.formatDateToParts;
    } });
    Object.defineProperty(exports2, "formatTime", { enumerable: true, get: function() {
      return dateTime_1.formatTime;
    } });
    Object.defineProperty(exports2, "formatTimeToParts", { enumerable: true, get: function() {
      return dateTime_1.formatTimeToParts;
    } });
    var displayName_1 = require_displayName();
    Object.defineProperty(exports2, "formatDisplayName", { enumerable: true, get: function() {
      return displayName_1.formatDisplayName;
    } });
    var list_1 = require_list2();
    Object.defineProperty(exports2, "formatList", { enumerable: true, get: function() {
      return list_1.formatList;
    } });
    var plural_1 = require_plural();
    Object.defineProperty(exports2, "formatPlural", { enumerable: true, get: function() {
      return plural_1.formatPlural;
    } });
    var relativeTime_1 = require_relativeTime();
    Object.defineProperty(exports2, "formatRelativeTime", { enumerable: true, get: function() {
      return relativeTime_1.formatRelativeTime;
    } });
    var number_1 = require_number3();
    Object.defineProperty(exports2, "formatNumber", { enumerable: true, get: function() {
      return number_1.formatNumber;
    } });
    Object.defineProperty(exports2, "formatNumberToParts", { enumerable: true, get: function() {
      return number_1.formatNumberToParts;
    } });
    var create_intl_1 = require_create_intl();
    Object.defineProperty(exports2, "createIntl", { enumerable: true, get: function() {
      return create_intl_1.createIntl;
    } });
  }
});

// comment.js
var fetch2 = (init_src(), __toCommonJS(src_exports));
var dedent = require_dedent();
var { createIntl } = require_intl();
async function getWorkspaceId(apiKey) {
  try {
    const resp = await fetch2("https://api.replay.io/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        variables: {},
        query: `
          query GetWS {
            viewer {
              user {
                id
              }
            }
            auth {
              workspaces {
                edges {
                  node {
                    id
                  }
                }
              }
            }
          }
        `
      })
    });
    const json = await resp.json();
    if (json.errors) {
      throw new Error(errors[0].message);
    } else if (!json.data) {
      throw new Error("No data was returned");
    } else if (json.data.user) {
      return new Error("Unable to return a team for a user API Key");
    }
    const workspaces = json.data.auth.workspaces.edges;
    if (workspaces.length !== 1) {
      throw new Error("Multiple teams returned for the provided API key");
    }
    return workspaces[0].node.id;
  } catch (e2) {
    console.log(e2 && e2.message || "Unexpected error retrieving team ID");
    return null;
  }
}
async function comment({
  apiKey,
  context,
  github,
  issue_number,
  recordings,
  summaryMessage,
  testRunId,
  testRunMessage
}) {
  const {
    repo: { owner, repo }
  } = context;
  const intl = createIntl({
    locale: "en",
    messages: {
      summaryMessage: {
        id: "summary",
        defaultMessage: summaryMessage
      },
      testRunMessage: {
        id: "test-run",
        defaultMessage: testRunMessage
      }
    }
  });
  if (!issue_number) {
    console.log("No issue number");
    return;
  }
  if (!recordings || recordings.length === 0) {
    console.log("No recordings created");
    return;
  }
  let formattedTestRunMessage = "";
  if (apiKey && testRunId) {
    const workspaceId = await getWorkspaceId(apiKey);
    console.log(">>>>", 1);
    if (workspaceId) {
      console.log(">>>>", 2);
      formattedTestRunMessage = intl.formatMessage(intl.messages.testRunMessage, {
        link: `https://app.replay.io/team/${workspaceId}/runs/${testRunId}`
      });
    }
  }
  console.log({ apiKey });
  console.log({ testRunId });
  console.log({ formattedTestRunMessage });
  const commitId = recordings[0].metadata.source.commit.id;
  const failedRecordings = recordings.filter((r2) => r2.metadata.test.result && r2.metadata.test.result !== "passed");
  const passedRecordings = recordings.filter((r2) => r2.metadata.test.result && r2.metadata.test.result === "passed");
  const body = dedent`# [![logo](https://static.replay.io/images/logo-horizontal-small-light.svg)](https://app.replay.io)

  **${recordings.length} replays** were recorded for ${commitId}.

  ${generateDetailsString(failedRecordings, false)}
  ${generateDetailsString(passedRecordings, true)}

  ${formattedTestRunMessage}
  `;
  return github.rest.issues.createComment({
    issue_number,
    owner,
    repo,
    body
  });
}
function generateDetailsString(recordings, isPassed) {
  const summary = isPassed ? dedent`
      <summary>
          <img width="14" alt="image" src="https://user-images.githubusercontent.com/15959269/177834869-851c4e78-e9d8-4ea3-bc1d-5bc372ab593a.png">
          <b>${recordings.length} Passed</b>
        </summary>
    ` : dedent`
      <summary>
        <img width="14" alt="image" src="https://user-images.githubusercontent.com/15959269/177835072-8cafcea8-146d-410a-b02e-321390e8bd95.png">    
        <b>${recordings.length} Failed</b>
      </summary>
    `;
  return dedent`
    <details ${!isPassed && "open"}>
      ${summary}
      ${generateRecordingListString(recordings)}
    </details>
  `;
}
function generateRecordingListString(recordings) {
  return dedent`
  <ul>
    ${recordings.map(({ id, metadata: { title } }) => `<li><a href=https://app.replay.io/recording/${id}>${title || id}</a></li>`).join("\n")}
  </ul>
  `;
}
module.exports = comment;
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
