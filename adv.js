/*! [adv.js]; ===WEBPACK BUILD: --buildversion=1.23.1226.0933=== */
(() => {
  var __webpack_modules__ = {
      9118: (e, a, i) => {
        e.exports = {
          parallel: i(9162),
          serial: i(1357),
          serialOrdered: i(9087)
        }
      },
      7651: e => {
        function a(e) {
          "function" == typeof this.jobs[e] && this.jobs[e]()
        }
        e.exports = function(e) {
          Object.keys(e.jobs).forEach(a.bind(e)), e.jobs = {}
        }
      },
      5912: (e, a, i) => {
        var n = i(9265);
        e.exports = function(e) {
          var a = !1;
          return n((function() {
              a = !0
            })),
            function(i, o) {
              a ? e(i, o) : n((function() {
                e(i, o)
              }))
            }
        }
      },
      9265: e => {
        e.exports = function(e) {
          var a = "function" == typeof setImmediate ? setImmediate : "object" == typeof process && "function" == typeof process.nextTick ? process.nextTick : null;
          a ? a(e) : setTimeout(e, 0)
        }
      },
      346: (e, a, i) => {
        var n = i(5912),
          o = i(7651);
        e.exports = function(e, a, i, s) {
          var t = i.keyedList ? i.keyedList[i.index] : i.index;
          i.jobs[t] = function(e, a, i, o) {
            var s;
            s = 2 == e.length ? e(i, n(o)) : e(i, a, n(o));
            return s
          }(a, t, e[t], (function(e, a) {
            t in i.jobs && (delete i.jobs[t], e ? o(i) : i.results[t] = a, s(e, i.results))
          }))
        }
      },
      4528: e => {
        e.exports = function(e, a) {
          var i = !Array.isArray(e),
            n = {
              index: 0,
              keyedList: i || a ? Object.keys(e) : null,
              jobs: {},
              results: i ? {} : [],
              size: i ? Object.keys(e).length : e.length
            };
          a && n.keyedList.sort(i ? a : function(i, n) {
            return a(e[i], e[n])
          });
          return n
        }
      },
      5353: (e, a, i) => {
        var n = i(7651),
          o = i(5912);
        e.exports = function(e) {
          if (!Object.keys(this.jobs).length) return;
          this.index = this.size, n(this), o(e)(null, this.results)
        }
      },
      9162: (e, a, i) => {
        var n = i(346),
          o = i(4528),
          s = i(5353);
        e.exports = function(e, a, i) {
          var t = o(e);
          for (; t.index < (t.keyedList || e).length;) n(e, a, t, (function(e, a) {
            e ? i(e, a) : 0 !== Object.keys(t.jobs).length || i(null, t.results)
          })), t.index++;
          return s.bind(t, i)
        }
      },
      1357: (e, a, i) => {
        var n = i(9087);
        e.exports = function(e, a, i) {
          return n(e, a, null, i)
        }
      },
      9087: (e, a, i) => {
        var n = i(346),
          o = i(4528),
          s = i(5353);

        function t(e, a) {
          return e < a ? -1 : e > a ? 1 : 0
        }
        e.exports = function(e, a, i, t) {
          var r = o(e, i);
          return n(e, a, r, (function i(o, s) {
            o ? t(o, s) : (r.index++, r.index < (r.keyedList || e).length ? n(e, a, r, i) : t(null, r.results))
          })), s.bind(r, t)
        }, e.exports.ascending = t, e.exports.descending = function(e, a) {
          return -1 * t(e, a)
        }
      },
      9779: (e, a, i) => {
        var n = i(3837),
          o = i(2781).Stream,
          s = i(3463);

        function t() {
          this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2097152, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1
        }
        e.exports = t, n.inherits(t, o), t.create = function(e) {
          var a = new this;
          for (var i in e = e || {}) a[i] = e[i];
          return a
        }, t.isStreamLike = function(e) {
          return "function" != typeof e && "string" != typeof e && "boolean" != typeof e && "number" != typeof e && !Buffer.isBuffer(e)
        }, t.prototype.append = function(e) {
          if (t.isStreamLike(e)) {
            if (!(e instanceof s)) {
              var a = s.create(e, {
                maxDataSize: 1 / 0,
                pauseStream: this.pauseStreams
              });
              e.on("data", this._checkDataSize.bind(this)), e = a
            }
            this._handleErrors(e), this.pauseStreams && e.pause()
          }
          return this._streams.push(e), this
        }, t.prototype.pipe = function(e, a) {
          return o.prototype.pipe.call(this, e, a), this.resume(), e
        }, t.prototype._getNext = function() {
          if (this._currentStream = null, this._insideLoop) this._pendingNext = !0;
          else {
            this._insideLoop = !0;
            try {
              do {
                this._pendingNext = !1, this._realGetNext()
              } while (this._pendingNext)
            } finally {
              this._insideLoop = !1
            }
          }
        }, t.prototype._realGetNext = function() {
          var e = this._streams.shift();
          void 0 !== e ? "function" == typeof e ? e(function(e) {
            t.isStreamLike(e) && (e.on("data", this._checkDataSize.bind(this)), this._handleErrors(e)), this._pipeNext(e)
          }.bind(this)) : this._pipeNext(e) : this.end()
        }, t.prototype._pipeNext = function(e) {
          if (this._currentStream = e, t.isStreamLike(e)) return e.on("end", this._getNext.bind(this)), void e.pipe(this, {
            end: !1
          });
          var a = e;
          this.write(a), this._getNext()
        }, t.prototype._handleErrors = function(e) {
          var a = this;
          e.on("error", (function(e) {
            a._emitError(e)
          }))
        }, t.prototype.write = function(e) {
          this.emit("data", e)
        }, t.prototype.pause = function() {
          this.pauseStreams && (this.pauseStreams && this._currentStream && "function" == typeof this._currentStream.pause && this._currentStream.pause(), this.emit("pause"))
        }, t.prototype.resume = function() {
          this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && "function" == typeof this._currentStream.resume && this._currentStream.resume(), this.emit("resume")
        }, t.prototype.end = function() {
          this._reset(), this.emit("end")
        }, t.prototype.destroy = function() {
          this._reset(), this.emit("close")
        }, t.prototype._reset = function() {
          this.writable = !1, this._streams = [], this._currentStream = null
        }, t.prototype._checkDataSize = function() {
          if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
            var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
            this._emitError(new Error(e))
          }
        }, t.prototype._updateDataSize = function() {
          this.dataSize = 0;
          var e = this;
          this._streams.forEach((function(a) {
            a.dataSize && (e.dataSize += a.dataSize)
          })), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize)
        }, t.prototype._emitError = function(e) {
          this._reset(), this.emit("error", e)
        }
      },
      3463: (e, a, i) => {
        var n = i(2781).Stream,
          o = i(3837);

        function s() {
          this.source = null, this.dataSize = 0, this.maxDataSize = 1048576, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = []
        }
        e.exports = s, o.inherits(s, n), s.create = function(e, a) {
          var i = new this;
          for (var n in a = a || {}) i[n] = a[n];
          i.source = e;
          var o = e.emit;
          return e.emit = function() {
            return i._handleEmit(arguments), o.apply(e, arguments)
          }, e.on("error", (function() {})), i.pauseStream && e.pause(), i
        }, Object.defineProperty(s.prototype, "readable", {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return this.source.readable
          }
        }), s.prototype.setEncoding = function() {
          return this.source.setEncoding.apply(this.source, arguments)
        }, s.prototype.resume = function() {
          this._released || this.release(), this.source.resume()
        }, s.prototype.pause = function() {
          this.source.pause()
        }, s.prototype.release = function() {
          this._released = !0, this._bufferedEvents.forEach(function(e) {
            this.emit.apply(this, e)
          }.bind(this)), this._bufferedEvents = []
        }, s.prototype.pipe = function() {
          var e = n.prototype.pipe.apply(this, arguments);
          return this.resume(), e
        }, s.prototype._handleEmit = function(e) {
          this._released ? this.emit.apply(this, e) : ("data" === e[0] && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e))
        }, s.prototype._checkIfMaxDataSizeExceeded = function() {
          if (!(this._maxDataSizeExceeded || this.dataSize <= this.maxDataSize)) {
            this._maxDataSizeExceeded = !0;
            var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
            this.emit("error", new Error(e))
          }
        }
      },
      2261: (e, a, i) => {
        var n;
        e.exports = function() {
          if (!n) {
            try {
              n = i(Object(function() {
                var e = new Error("Cannot find module 'debug'");
                throw e.code = "MODULE_NOT_FOUND", e
              }()))("follow-redirects")
            } catch (e) {}
            "function" != typeof n && (n = function() {})
          }
          n.apply(null, arguments)
        }
      },
      938: (e, a, i) => {
        var n = i(7310),
          o = n.URL,
          s = i(3685),
          t = i(5687),
          r = i(2781).Writable,
          c = i(9491),
          p = i(2261),
          l = ["abort", "aborted", "connect", "error", "socket", "timeout"],
          u = Object.create(null);
        l.forEach((function(e) {
          u[e] = function(a, i, n) {
            this._redirectable.emit(e, a, i, n)
          }
        }));
        var m = k("ERR_INVALID_URL", "Invalid URL", TypeError),
          d = k("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed"),
          x = k("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded"),
          f = k("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit"),
          v = k("ERR_STREAM_WRITE_AFTER_END", "write after end"),
          h = r.prototype.destroy || y;

        function b(e, a) {
          r.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], a && this.on("response", a);
          var i = this;
          this._onNativeResponse = function(e) {
            i._processResponse(e)
          }, this._performRequest()
        }

        function g(e) {
          var a = {
              maxRedirects: 21,
              maxBodyLength: 10485760
            },
            i = {};
          return Object.keys(e).forEach((function(s) {
            var t = s + ":",
              r = i[t] = e[s],
              l = a[s] = Object.create(r);
            Object.defineProperties(l, {
              request: {
                value: function(e, s, r) {
                  if (j(e)) {
                    var l;
                    try {
                      l = w(new o(e))
                    } catch (a) {
                      l = n.parse(e)
                    }
                    if (!j(l.protocol)) throw new m({
                      input: e
                    });
                    e = l
                  } else o && e instanceof o ? e = w(e) : (r = s, s = e, e = {
                    protocol: t
                  });
                  return E(s) && (r = s, s = null), (s = Object.assign({
                    maxRedirects: a.maxRedirects,
                    maxBodyLength: a.maxBodyLength
                  }, e, s)).nativeProtocols = i, j(s.host) || j(s.hostname) || (s.hostname = "::1"), c.equal(s.protocol, t, "protocol mismatch"), p("options", s), new b(s, r)
                },
                configurable: !0,
                enumerable: !0,
                writable: !0
              },
              get: {
                value: function(e, a, i) {
                  var n = l.request(e, a, i);
                  return n.end(), n
                },
                configurable: !0,
                enumerable: !0,
                writable: !0
              }
            })
          })), a
        }

        function y() {}

        function w(e) {
          var a = {
            protocol: e.protocol,
            hostname: e.hostname.startsWith("[") ? e.hostname.slice(1, -1) : e.hostname,
            hash: e.hash,
            search: e.search,
            pathname: e.pathname,
            path: e.pathname + e.search,
            href: e.href
          };
          return "" !== e.port && (a.port = Number(e.port)), a
        }

        function _(e, a) {
          var i;
          for (var n in a) e.test(n) && (i = a[n], delete a[n]);
          return null == i ? void 0 : String(i).trim()
        }

        function k(e, a, i) {
          function n(i) {
            Error.captureStackTrace(this, this.constructor), Object.assign(this, i || {}), this.code = e, this.message = this.cause ? a + ": " + this.cause.message : a
          }
          return n.prototype = new(i || Error), n.prototype.constructor = n, n.prototype.name = "Error [" + e + "]", n
        }

        function S(e, a) {
          for (var i of l) e.removeListener(i, u[i]);
          e.on("error", y), e.destroy(a)
        }

        function j(e) {
          return "string" == typeof e || e instanceof String
        }

        function E(e) {
          return "function" == typeof e
        }
        b.prototype = Object.create(r.prototype), b.prototype.abort = function() {
          S(this._currentRequest), this._currentRequest.abort(), this.emit("abort")
        }, b.prototype.destroy = function(e) {
          return S(this._currentRequest, e), h.call(this, e), this
        }, b.prototype.write = function(e, a, i) {
          if (this._ending) throw new v;
          if (!j(e) && ("object" != typeof(n = e) || !("length" in n))) throw new TypeError("data should be a string, Buffer or Uint8Array");
          var n;
          E(a) && (i = a, a = null), 0 !== e.length ? this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({
            data: e,
            encoding: a
          }), this._currentRequest.write(e, a, i)) : (this.emit("error", new f), this.abort()) : i && i()
        }, b.prototype.end = function(e, a, i) {
          if (E(e) ? (i = e, e = a = null) : E(a) && (i = a, a = null), e) {
            var n = this,
              o = this._currentRequest;
            this.write(e, a, (function() {
              n._ended = !0, o.end(null, null, i)
            })), this._ending = !0
          } else this._ended = this._ending = !0, this._currentRequest.end(null, null, i)
        }, b.prototype.setHeader = function(e, a) {
          this._options.headers[e] = a, this._currentRequest.setHeader(e, a)
        }, b.prototype.removeHeader = function(e) {
          delete this._options.headers[e], this._currentRequest.removeHeader(e)
        }, b.prototype.setTimeout = function(e, a) {
          var i = this;

          function n(a) {
            a.setTimeout(e), a.removeListener("timeout", a.destroy), a.addListener("timeout", a.destroy)
          }

          function o(a) {
            i._timeout && clearTimeout(i._timeout), i._timeout = setTimeout((function() {
              i.emit("timeout"), s()
            }), e), n(a)
          }

          function s() {
            i._timeout && (clearTimeout(i._timeout), i._timeout = null), i.removeListener("abort", s), i.removeListener("error", s), i.removeListener("response", s), i.removeListener("close", s), a && i.removeListener("timeout", a), i.socket || i._currentRequest.removeListener("socket", o)
          }
          return a && this.on("timeout", a), this.socket ? o(this.socket) : this._currentRequest.once("socket", o), this.on("socket", n), this.on("abort", s), this.on("error", s), this.on("response", s), this.on("close", s), this
        }, ["flushHeaders", "getHeader", "setNoDelay", "setSocketKeepAlive"].forEach((function(e) {
          b.prototype[e] = function(a, i) {
            return this._currentRequest[e](a, i)
          }
        })), ["aborted", "connection", "socket"].forEach((function(e) {
          Object.defineProperty(b.prototype, e, {
            get: function() {
              return this._currentRequest[e]
            }
          })
        })), b.prototype._sanitizeOptions = function(e) {
          if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
            var a = e.path.indexOf("?");
            a < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, a), e.search = e.path.substring(a))
          }
        }, b.prototype._performRequest = function() {
          var e = this._options.protocol,
            a = this._options.nativeProtocols[e];
          if (a) {
            if (this._options.agents) {
              var i = e.slice(0, -1);
              this._options.agent = this._options.agents[i]
            }
            var o = this._currentRequest = a.request(this._options, this._onNativeResponse);
            for (var s of (o._redirectable = this, l)) o.on(s, u[s]);
            if (this._currentUrl = /^\//.test(this._options.path) ? n.format(this._options) : this._options.path, this._isRedirect) {
              var t = 0,
                r = this,
                c = this._requestBodyBuffers;
              ! function e(a) {
                if (o === r._currentRequest)
                  if (a) r.emit("error", a);
                  else if (t < c.length) {
                  var i = c[t++];
                  o.finished || o.write(i.data, i.encoding, e)
                } else r._ended && o.end()
              }()
            }
          } else this.emit("error", new TypeError("Unsupported protocol " + e))
        }, b.prototype._processResponse = function(e) {
          var a = e.statusCode;
          this._options.trackRedirects && this._redirects.push({
            url: this._currentUrl,
            headers: e.headers,
            statusCode: a
          });
          var i = e.headers.location;
          if (!i || !1 === this._options.followRedirects || a < 300 || a >= 400) return e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), void(this._requestBodyBuffers = []);
          if (S(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects) this.emit("error", new x);
          else {
            var o, s = this._options.beforeRedirect;
            s && (o = Object.assign({
              Host: e.req.getHeader("host")
            }, this._options.headers));
            var t = this._options.method;
            ((301 === a || 302 === a) && "POST" === this._options.method || 303 === a && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], _(/^content-/i, this._options.headers));
            var r, l = _(/^host$/i, this._options.headers),
              u = n.parse(this._currentUrl),
              m = l || u.host,
              f = /^\w+:/.test(i) ? this._currentUrl : n.format(Object.assign(u, {
                host: m
              }));
            try {
              r = n.resolve(f, i)
            } catch (e) {
              return void this.emit("error", new d({
                cause: e
              }))
            }
            p("redirecting to", r), this._isRedirect = !0;
            var v = n.parse(r);
            if (Object.assign(this._options, v), (v.protocol !== u.protocol && "https:" !== v.protocol || v.host !== m && ! function(e, a) {
                c(j(e) && j(a));
                var i = e.length - a.length - 1;
                return i > 0 && "." === e[i] && e.endsWith(a)
              }(v.host, m)) && _(/^(?:authorization|cookie)$/i, this._options.headers), E(s)) {
              var h = {
                  headers: e.headers,
                  statusCode: a
                },
                b = {
                  url: f,
                  method: t,
                  headers: o
                };
              try {
                s(this._options, h, b)
              } catch (e) {
                return void this.emit("error", e)
              }
              this._sanitizeOptions(this._options)
            }
            try {
              this._performRequest()
            } catch (e) {
              this.emit("error", new d({
                cause: e
              }))
            }
          }
        }, e.exports = g({
          http: s,
          https: t
        }), e.exports.wrap = g
      },
      6882: (e, a, i) => {
        var n = i(9779),
          o = i(3837),
          s = i(1017),
          t = i(3685),
          r = i(5687),
          c = i(7310).parse,
          p = i(7147),
          l = i(2781).Stream,
          u = i(983),
          m = i(9118),
          d = i(2275);

        function x(e) {
          if (!(this instanceof x)) return new x(e);
          for (var a in this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], n.call(this), e = e || {}) this[a] = e[a]
        }
        e.exports = x, o.inherits(x, n), x.LINE_BREAK = "\r\n", x.DEFAULT_CONTENT_TYPE = "application/octet-stream", x.prototype.append = function(e, a, i) {
          "string" == typeof(i = i || {}) && (i = {
            filename: i
          });
          var s = n.prototype.append.bind(this);
          if ("number" == typeof a && (a = "" + a), o.isArray(a)) this._error(new Error("Arrays are not supported."));
          else {
            var t = this._multiPartHeader(e, a, i),
              r = this._multiPartFooter();
            s(t), s(a), s(r), this._trackLength(t, a, i)
          }
        }, x.prototype._trackLength = function(e, a, i) {
          var n = 0;
          null != i.knownLength ? n += +i.knownLength : Buffer.isBuffer(a) ? n = a.length : "string" == typeof a && (n = Buffer.byteLength(a)), this._valueLength += n, this._overheadLength += Buffer.byteLength(e) + x.LINE_BREAK.length, a && (a.path || a.readable && a.hasOwnProperty("httpVersion") || a instanceof l) && (i.knownLength || this._valuesToMeasure.push(a))
        }, x.prototype._lengthRetriever = function(e, a) {
          e.hasOwnProperty("fd") ? null != e.end && e.end != 1 / 0 && null != e.start ? a(null, e.end + 1 - (e.start ? e.start : 0)) : p.stat(e.path, (function(i, n) {
            var o;
            i ? a(i) : (o = n.size - (e.start ? e.start : 0), a(null, o))
          })) : e.hasOwnProperty("httpVersion") ? a(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", (function(i) {
            e.pause(), a(null, +i.headers["content-length"])
          })), e.resume()) : a("Unknown stream")
        }, x.prototype._multiPartHeader = function(e, a, i) {
          if ("string" == typeof i.header) return i.header;
          var n, o = this._getContentDisposition(a, i),
            s = this._getContentType(a, i),
            t = "",
            r = {
              "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(o || []),
              "Content-Type": [].concat(s || [])
            };
          for (var c in "object" == typeof i.header && d(r, i.header), r) r.hasOwnProperty(c) && null != (n = r[c]) && (Array.isArray(n) || (n = [n]), n.length && (t += c + ": " + n.join("; ") + x.LINE_BREAK));
          return "--" + this.getBoundary() + x.LINE_BREAK + t + x.LINE_BREAK
        }, x.prototype._getContentDisposition = function(e, a) {
          var i, n;
          return "string" == typeof a.filepath ? i = s.normalize(a.filepath).replace(/\\/g, "/") : a.filename || e.name || e.path ? i = s.basename(a.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (i = s.basename(e.client._httpMessage.path || "")), i && (n = 'filename="' + i + '"'), n
        }, x.prototype._getContentType = function(e, a) {
          var i = a.contentType;
          return !i && e.name && (i = u.lookup(e.name)), !i && e.path && (i = u.lookup(e.path)), !i && e.readable && e.hasOwnProperty("httpVersion") && (i = e.headers["content-type"]), i || !a.filepath && !a.filename || (i = u.lookup(a.filepath || a.filename)), i || "object" != typeof e || (i = x.DEFAULT_CONTENT_TYPE), i
        }, x.prototype._multiPartFooter = function() {
          return function(e) {
            var a = x.LINE_BREAK;
            0 === this._streams.length && (a += this._lastBoundary()), e(a)
          }.bind(this)
        }, x.prototype._lastBoundary = function() {
          return "--" + this.getBoundary() + "--" + x.LINE_BREAK
        }, x.prototype.getHeaders = function(e) {
          var a, i = {
            "content-type": "multipart/form-data; boundary=" + this.getBoundary()
          };
          for (a in e) e.hasOwnProperty(a) && (i[a.toLowerCase()] = e[a]);
          return i
        }, x.prototype.setBoundary = function(e) {
          this._boundary = e
        }, x.prototype.getBoundary = function() {
          return this._boundary || this._generateBoundary(), this._boundary
        }, x.prototype.getBuffer = function() {
          for (var e = new Buffer.alloc(0), a = this.getBoundary(), i = 0, n = this._streams.length; i < n; i++) "function" != typeof this._streams[i] && (e = Buffer.isBuffer(this._streams[i]) ? Buffer.concat([e, this._streams[i]]) : Buffer.concat([e, Buffer.from(this._streams[i])]), "string" == typeof this._streams[i] && this._streams[i].substring(2, a.length + 2) === a || (e = Buffer.concat([e, Buffer.from(x.LINE_BREAK)])));
          return Buffer.concat([e, Buffer.from(this._lastBoundary())])
        }, x.prototype._generateBoundary = function() {
          for (var e = "--------------------------", a = 0; a < 24; a++) e += Math.floor(10 * Math.random()).toString(16);
          this._boundary = e
        }, x.prototype.getLengthSync = function() {
          var e = this._overheadLength + this._valueLength;
          return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e
        }, x.prototype.hasKnownLength = function() {
          var e = !0;
          return this._valuesToMeasure.length && (e = !1), e
        }, x.prototype.getLength = function(e) {
          var a = this._overheadLength + this._valueLength;
          this._streams.length && (a += this._lastBoundary().length), this._valuesToMeasure.length ? m.parallel(this._valuesToMeasure, this._lengthRetriever, (function(i, n) {
            i ? e(i) : (n.forEach((function(e) {
              a += e
            })), e(null, a))
          })) : process.nextTick(e.bind(this, null, a))
        }, x.prototype.submit = function(e, a) {
          var i, n, o = {
            method: "post"
          };
          return "string" == typeof e ? (e = c(e), n = d({
            port: e.port,
            path: e.pathname,
            host: e.hostname,
            protocol: e.protocol
          }, o)) : (n = d(e, o)).port || (n.port = "https:" == n.protocol ? 443 : 80), n.headers = this.getHeaders(e.headers), i = "https:" == n.protocol ? r.request(n) : t.request(n), this.getLength(function(e, n) {
            if (e && "Unknown stream" !== e) this._error(e);
            else if (n && i.setHeader("Content-Length", n), this.pipe(i), a) {
              var o, s = function(e, n) {
                return i.removeListener("error", s), i.removeListener("response", o), a.call(this, e, n)
              };
              o = s.bind(this, null), i.on("error", s), i.on("response", o)
            }
          }.bind(this)), i
        }, x.prototype._error = function(e) {
          this.error || (this.error = e, this.pause(), this.emit("error", e))
        }, x.prototype.toString = function() {
          return "[object FormData]"
        }
      },
      2275: e => {
        e.exports = function(e, a) {
          return Object.keys(a).forEach((function(i) {
            e[i] = e[i] || a[i]
          })), e
        }
      },
      5234: (e, a, i) => {
        e.exports = i(3765)
      },
      983: (e, a, i) => {
        "use strict";
        var n, o, s, t = i(5234),
          r = i(1017).extname,
          c = /^\s*([^;\s]*)(?:;|\s|$)/,
          p = /^text\//i;

        function l(e) {
          if (!e || "string" != typeof e) return !1;
          var a = c.exec(e),
            i = a && t[a[1].toLowerCase()];
          return i && i.charset ? i.charset : !(!a || !p.test(a[1])) && "UTF-8"
        }
        a.charset = l, a.charsets = {
          lookup: l
        }, a.contentType = function(e) {
          if (!e || "string" != typeof e) return !1;
          var i = -1 === e.indexOf("/") ? a.lookup(e) : e;
          if (!i) return !1;
          if (-1 === i.indexOf("charset")) {
            var n = a.charset(i);
            n && (i += "; charset=" + n.toLowerCase())
          }
          return i
        }, a.extension = function(e) {
          if (!e || "string" != typeof e) return !1;
          var i = c.exec(e),
            n = i && a.extensions[i[1].toLowerCase()];
          if (!n || !n.length) return !1;
          return n[0]
        }, a.extensions = Object.create(null), a.lookup = function(e) {
          if (!e || "string" != typeof e) return !1;
          var i = r("x." + e).toLowerCase().substr(1);
          if (!i) return !1;
          return a.types[i] || !1
        }, a.types = Object.create(null), n = a.extensions, o = a.types, s = ["nginx", "apache", void 0, "iana"], Object.keys(t).forEach((function(e) {
          var a = t[e],
            i = a.extensions;
          if (i && i.length) {
            n[e] = i;
            for (var r = 0; r < i.length; r++) {
              var c = i[r];
              if (o[c]) {
                var p = s.indexOf(t[o[c]].source),
                  l = s.indexOf(a.source);
                if ("application/octet-stream" !== o[c] && (p > l || p === l && "application/" === o[c].substr(0, 12))) continue
              }
              o[c] = e
            }
          }
        }))
      },
      1394: (e, a, i) => {
        "use strict";
        var n = i(7310).parse,
          o = {
            ftp: 21,
            gopher: 70,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
          },
          s = String.prototype.endsWith || function(e) {
            return e.length <= this.length && -1 !== this.indexOf(e, this.length - e.length)
          };

        function t(e) {
          return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || ""
        }
        a.getProxyForUrl = function(e) {
          var a = "string" == typeof e ? n(e) : e || {},
            i = a.protocol,
            r = a.host,
            c = a.port;
          if ("string" != typeof r || !r || "string" != typeof i) return "";
          if (i = i.split(":", 1)[0], ! function(e, a) {
              var i = (t("npm_config_no_proxy") || t("no_proxy")).toLowerCase();
              if (!i) return !0;
              if ("*" === i) return !1;
              return i.split(/[,\s]/).every((function(i) {
                if (!i) return !0;
                var n = i.match(/^(.+):(\d+)$/),
                  o = n ? n[1] : i,
                  t = n ? parseInt(n[2]) : 0;
                return !(!t || t === a) || (/^[.*]/.test(o) ? ("*" === o.charAt(0) && (o = o.slice(1)), !s.call(e, o)) : e !== o)
              }))
            }(r = r.replace(/:\d*$/, ""), c = parseInt(c) || o[i] || 0)) return "";
          var p = t("npm_config_" + i + "_proxy") || t(i + "_proxy") || t("npm_config_proxy") || t("all_proxy");
          return p && -1 === p.indexOf("://") && (p = i + "://" + p), p
        }
      },
      2441: function(e, a, i) {
        e.exports = (i(2081), i(6113), function(e) {
          function a(n) {
            if (i[n]) return i[n].exports;
            var o = i[n] = {
              exports: {},
              id: n,
              loaded: !1
            };
            return e[n].call(o.exports, o, o.exports, a), o.loaded = !0, o.exports
          }
          var i = {};
          return a.m = e, a.c = i, a.p = "", a(0)
        }([function(e, a, i) {
          e.exports = i(34)
        }, function(e, a, i) {
          var n = i(29)("wks"),
            o = i(33),
            s = i(2).Symbol,
            t = "function" == typeof s;
          (e.exports = function(e) {
            return n[e] || (n[e] = t && s[e] || (t ? s : o)("Symbol." + e))
          }).store = n
        }, function(e, a) {
          var i = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
          "number" == typeof __g && (__g = i)
        }, function(e, a, i) {
          var n = i(9);
          e.exports = function(e) {
            if (!n(e)) throw TypeError(e + " is not an object!");
            return e
          }
        }, function(e, a, i) {
          e.exports = !i(24)((function() {
            return 7 != Object.defineProperty({}, "a", {
              get: function() {
                return 7
              }
            }).a
          }))
        }, function(e, a, i) {
          var n = i(12),
            o = i(17);
          e.exports = i(4) ? function(e, a, i) {
            return n.f(e, a, o(1, i))
          } : function(e, a, i) {
            return e[a] = i, e
          }
        }, function(e, a) {
          var i = e.exports = {
            version: "2.4.0"
          };
          "number" == typeof __e && (__e = i)
        }, function(e, a, i) {
          var n = i(14);
          e.exports = function(e, a, i) {
            if (n(e), void 0 === a) return e;
            switch (i) {
              case 1:
                return function(i) {
                  return e.call(a, i)
                };
              case 2:
                return function(i, n) {
                  return e.call(a, i, n)
                };
              case 3:
                return function(i, n, o) {
                  return e.call(a, i, n, o)
                }
            }
            return function() {
              return e.apply(a, arguments)
            }
          }
        }, function(e, a) {
          var i = {}.hasOwnProperty;
          e.exports = function(e, a) {
            return i.call(e, a)
          }
        }, function(e, a) {
          e.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
          }
        }, function(e, a) {
          e.exports = {}
        }, function(e, a) {
          var i = {}.toString;
          e.exports = function(e) {
            return i.call(e).slice(8, -1)
          }
        }, function(e, a, i) {
          var n = i(3),
            o = i(26),
            s = i(32),
            t = Object.defineProperty;
          a.f = i(4) ? Object.defineProperty : function(e, a, i) {
            if (n(e), a = s(a, !0), n(i), o) try {
              return t(e, a, i)
            } catch (e) {}
            if ("get" in i || "set" in i) throw TypeError("Accessors not supported!");
            return "value" in i && (e[a] = i.value), e
          }
        }, function(e, a, i) {
          var n = i(42),
            o = i(15);
          e.exports = function(e) {
            return n(o(e))
          }
        }, function(e, a) {
          e.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
          }
        }, function(e, a) {
          e.exports = function(e) {
            if (null == e) throw TypeError("Can't call method on  " + e);
            return e
          }
        }, function(e, a, i) {
          var n = i(9),
            o = i(2).document,
            s = n(o) && n(o.createElement);
          e.exports = function(e) {
            return s ? o.createElement(e) : {}
          }
        }, function(e, a) {
          e.exports = function(e, a) {
            return {
              enumerable: !(1 & e),
              configurable: !(2 & e),
              writable: !(4 & e),
              value: a
            }
          }
        }, function(e, a, i) {
          var n = i(12).f,
            o = i(8),
            s = i(1)("toStringTag");
          e.exports = function(e, a, i) {
            e && !o(e = i ? e : e.prototype, s) && n(e, s, {
              configurable: !0,
              value: a
            })
          }
        }, function(e, a, i) {
          var n = i(29)("keys"),
            o = i(33);
          e.exports = function(e) {
            return n[e] || (n[e] = o(e))
          }
        }, function(e, a) {
          var i = Math.ceil,
            n = Math.floor;
          e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? n : i)(e)
          }
        }, function(e, a, i) {
          var n = i(11),
            o = i(1)("toStringTag"),
            s = "Arguments" == n(function() {
              return arguments
            }()),
            t = function(e, a) {
              try {
                return e[a]
              } catch (e) {}
            };
          e.exports = function(e) {
            var a, i, r;
            return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(i = t(a = Object(e), o)) ? i : s ? n(a) : "Object" == (r = n(a)) && "function" == typeof a.callee ? "Arguments" : r
          }
        }, function(e, a) {
          e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
        }, function(e, a, i) {
          var n = i(2),
            o = i(6),
            s = i(7),
            t = i(5),
            r = "prototype",
            c = function(e, a, i) {
              var p, l, u, m = e & c.F,
                d = e & c.G,
                x = e & c.S,
                f = e & c.P,
                v = e & c.B,
                h = e & c.W,
                b = d ? o : o[a] || (o[a] = {}),
                g = b[r],
                y = d ? n : x ? n[a] : (n[a] || {})[r];
              for (p in d && (i = a), i)(l = !m && y && void 0 !== y[p]) && p in b || (u = l ? y[p] : i[p], b[p] = d && "function" != typeof y[p] ? i[p] : v && l ? s(u, n) : h && y[p] == u ? function(e) {
                var a = function(a, i, n) {
                  if (this instanceof e) {
                    switch (arguments.length) {
                      case 0:
                        return new e;
                      case 1:
                        return new e(a);
                      case 2:
                        return new e(a, i)
                    }
                    return new e(a, i, n)
                  }
                  return e.apply(this, arguments)
                };
                return a[r] = e[r], a
              }(u) : f && "function" == typeof u ? s(Function.call, u) : u, f && ((b.virtual || (b.virtual = {}))[p] = u, e & c.R && g && !g[p] && t(g, p, u)))
            };
          c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
        }, function(e, a) {
          e.exports = function(e) {
            try {
              return !!e()
            } catch (e) {
              return !0
            }
          }
        }, function(e, a, i) {
          e.exports = i(2).document && document.documentElement
        }, function(e, a, i) {
          e.exports = !i(4) && !i(24)((function() {
            return 7 != Object.defineProperty(i(16)("div"), "a", {
              get: function() {
                return 7
              }
            }).a
          }))
        }, function(e, a, i) {
          "use strict";
          var n = i(28),
            o = i(23),
            s = i(57),
            t = i(5),
            r = i(8),
            c = i(10),
            p = i(45),
            l = i(18),
            u = i(52),
            m = i(1)("iterator"),
            d = !([].keys && "next" in [].keys()),
            x = "@@iterator",
            f = "keys",
            v = "values",
            h = function() {
              return this
            };
          e.exports = function(e, a, i, b, g, y, w) {
            p(i, a, b);
            var _, k, S, j = function(e) {
                if (!d && e in N) return N[e];
                switch (e) {
                  case f:
                  case v:
                    return function() {
                      return new i(this, e)
                    }
                }
                return function() {
                  return new i(this, e)
                }
              },
              E = a + " Iterator",
              A = g == v,
              O = !1,
              N = e.prototype,
              T = N[m] || N[x] || g && N[g],
              B = T || j(g),
              R = g ? A ? j("entries") : B : void 0,
              F = "Array" == a && N.entries || T;
            if (F && (S = u(F.call(new e))) !== Object.prototype && (l(S, E, !0), n || r(S, m) || t(S, m, h)), A && T && T.name !== v && (O = !0, B = function() {
                return T.call(this)
              }), n && !w || !d && !O && N[m] || t(N, m, B), c[a] = B, c[E] = h, g)
              if (_ = {
                  values: A ? B : j(v),
                  keys: y ? B : j(f),
                  entries: R
                }, w)
                for (k in _) k in N || s(N, k, _[k]);
              else o(o.P + o.F * (d || O), a, _);
            return _
          }
        }, function(e, a) {
          e.exports = !0
        }, function(e, a, i) {
          var n = i(2),
            o = "__core-js_shared__",
            s = n[o] || (n[o] = {});
          e.exports = function(e) {
            return s[e] || (s[e] = {})
          }
        }, function(e, a, i) {
          var n, o, s, t = i(7),
            r = i(41),
            c = i(25),
            p = i(16),
            l = i(2),
            u = l.process,
            m = l.setImmediate,
            d = l.clearImmediate,
            x = l.MessageChannel,
            f = 0,
            v = {},
            h = "onreadystatechange",
            b = function() {
              var e = +this;
              if (v.hasOwnProperty(e)) {
                var a = v[e];
                delete v[e], a()
              }
            },
            g = function(e) {
              b.call(e.data)
            };
          m && d || (m = function(e) {
            for (var a = [], i = 1; arguments.length > i;) a.push(arguments[i++]);
            return v[++f] = function() {
              r("function" == typeof e ? e : Function(e), a)
            }, n(f), f
          }, d = function(e) {
            delete v[e]
          }, "process" == i(11)(u) ? n = function(e) {
            u.nextTick(t(b, e, 1))
          } : x ? (s = (o = new x).port2, o.port1.onmessage = g, n = t(s.postMessage, s, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (n = function(e) {
            l.postMessage(e + "", "*")
          }, l.addEventListener("message", g, !1)) : n = h in p("script") ? function(e) {
            c.appendChild(p("script"))[h] = function() {
              c.removeChild(this), b.call(e)
            }
          } : function(e) {
            setTimeout(t(b, e, 1), 0)
          }), e.exports = {
            set: m,
            clear: d
          }
        }, function(e, a, i) {
          var n = i(20),
            o = Math.min;
          e.exports = function(e) {
            return e > 0 ? o(n(e), 9007199254740991) : 0
          }
        }, function(e, a, i) {
          var n = i(9);
          e.exports = function(e, a) {
            if (!n(e)) return e;
            var i, o;
            if (a && "function" == typeof(i = e.toString) && !n(o = i.call(e))) return o;
            if ("function" == typeof(i = e.valueOf) && !n(o = i.call(e))) return o;
            if (!a && "function" == typeof(i = e.toString) && !n(o = i.call(e))) return o;
            throw TypeError("Can't convert object to primitive value")
          }
        }, function(e, a) {
          var i = 0,
            n = Math.random();
          e.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++i + n).toString(36))
          }
        }, function(e, a, i) {
          "use strict";

          function n(e) {
            return e && e.__esModule ? e : {
              default: e
            }
          }

          function o() {
            return "win32" !== process.platform ? "" : "ia32" === process.arch && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432") ? "mixed" : "native"
          }

          function s(e) {
            return (0, u.createHash)("sha256").update(e).digest("hex")
          }

          function t(e) {
            switch (m) {
              case "darwin":
                return e.split("IOPlatformUUID")[1].split("\n")[0].replace(/\=|\s+|\"/gi, "").toLowerCase();
              case "win32":
                return e.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase();
              case "linux":
              case "freebsd":
                return e.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
              default:
                throw new Error("Unsupported platform: " + process.platform)
            }
          }

          function r(e) {
            var a = t((0, l.execSync)(d[m]).toString());
            return e ? a : s(a)
          }

          function c(e) {
            return new p.default((function(a, i) {
              return (0, l.exec)(d[m], {}, (function(n, o, r) {
                if (n) return i(new Error("Error while obtaining machine id: " + n.stack));
                var c = t(o.toString());
                return a(e ? c : s(c))
              }))
            }))
          }
          Object.defineProperty(a, "__esModule", {
            value: !0
          });
          var p = n(i(35));
          a.machineIdSync = r, a.machineId = c;
          var l = i(70),
            u = i(71),
            m = process.platform,
            d = {
              darwin: "ioreg -rd1 -c IOPlatformExpertDevice",
              win32: {
                native: "%windir%\\System32",
                mixed: "%windir%\\sysnative\\cmd.exe /c %windir%\\System32"
              } [o()] + "\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid",
              linux: "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :",
              freebsd: "kenv -q smbios.system.uuid || sysctl -n kern.hostuuid"
            }
        }, function(e, a, i) {
          e.exports = {
            default: i(36),
            __esModule: !0
          }
        }, function(e, a, i) {
          i(66), i(68), i(69), i(67), e.exports = i(6).Promise
        }, function(e, a) {
          e.exports = function() {}
        }, function(e, a) {
          e.exports = function(e, a, i, n) {
            if (!(e instanceof a) || void 0 !== n && n in e) throw TypeError(i + ": incorrect invocation!");
            return e
          }
        }, function(e, a, i) {
          var n = i(13),
            o = i(31),
            s = i(62);
          e.exports = function(e) {
            return function(a, i, t) {
              var r, c = n(a),
                p = o(c.length),
                l = s(t, p);
              if (e && i != i) {
                for (; p > l;)
                  if ((r = c[l++]) != r) return !0
              } else
                for (; p > l; l++)
                  if ((e || l in c) && c[l] === i) return e || l || 0;
              return !e && -1
            }
          }
        }, function(e, a, i) {
          var n = i(7),
            o = i(44),
            s = i(43),
            t = i(3),
            r = i(31),
            c = i(64),
            p = {},
            l = {};
          a = e.exports = function(e, a, i, u, m) {
            var d, x, f, v, h = m ? function() {
                return e
              } : c(e),
              b = n(i, u, a ? 2 : 1),
              g = 0;
            if ("function" != typeof h) throw TypeError(e + " is not iterable!");
            if (s(h)) {
              for (d = r(e.length); d > g; g++)
                if ((v = a ? b(t(x = e[g])[0], x[1]) : b(e[g])) === p || v === l) return v
            } else
              for (f = h.call(e); !(x = f.next()).done;)
                if ((v = o(f, b, x.value, a)) === p || v === l) return v
          }, a.BREAK = p, a.RETURN = l
        }, function(e, a) {
          e.exports = function(e, a, i) {
            var n = void 0 === i;
            switch (a.length) {
              case 0:
                return n ? e() : e.call(i);
              case 1:
                return n ? e(a[0]) : e.call(i, a[0]);
              case 2:
                return n ? e(a[0], a[1]) : e.call(i, a[0], a[1]);
              case 3:
                return n ? e(a[0], a[1], a[2]) : e.call(i, a[0], a[1], a[2]);
              case 4:
                return n ? e(a[0], a[1], a[2], a[3]) : e.call(i, a[0], a[1], a[2], a[3])
            }
            return e.apply(i, a)
          }
        }, function(e, a, i) {
          var n = i(11);
          e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == n(e) ? e.split("") : Object(e)
          }
        }, function(e, a, i) {
          var n = i(10),
            o = i(1)("iterator"),
            s = Array.prototype;
          e.exports = function(e) {
            return void 0 !== e && (n.Array === e || s[o] === e)
          }
        }, function(e, a, i) {
          var n = i(3);
          e.exports = function(e, a, i, o) {
            try {
              return o ? a(n(i)[0], i[1]) : a(i)
            } catch (a) {
              var s = e.return;
              throw void 0 !== s && n(s.call(e)), a
            }
          }
        }, function(e, a, i) {
          "use strict";
          var n = i(49),
            o = i(17),
            s = i(18),
            t = {};
          i(5)(t, i(1)("iterator"), (function() {
            return this
          })), e.exports = function(e, a, i) {
            e.prototype = n(t, {
              next: o(1, i)
            }), s(e, a + " Iterator")
          }
        }, function(e, a, i) {
          var n = i(1)("iterator"),
            o = !1;
          try {
            var s = [7][n]();
            s.return = function() {
              o = !0
            }, Array.from(s, (function() {
              throw 2
            }))
          } catch (e) {}
          e.exports = function(e, a) {
            if (!a && !o) return !1;
            var i = !1;
            try {
              var s = [7],
                t = s[n]();
              t.next = function() {
                return {
                  done: i = !0
                }
              }, s[n] = function() {
                return t
              }, e(s)
            } catch (e) {}
            return i
          }
        }, function(e, a) {
          e.exports = function(e, a) {
            return {
              value: a,
              done: !!e
            }
          }
        }, function(e, a, i) {
          var n = i(2),
            o = i(30).set,
            s = n.MutationObserver || n.WebKitMutationObserver,
            t = n.process,
            r = n.Promise,
            c = "process" == i(11)(t);
          e.exports = function() {
            var e, a, i, p = function() {
              var n, o;
              for (c && (n = t.domain) && n.exit(); e;) {
                o = e.fn, e = e.next;
                try {
                  o()
                } catch (n) {
                  throw e ? i() : a = void 0, n
                }
              }
              a = void 0, n && n.enter()
            };
            if (c) i = function() {
              t.nextTick(p)
            };
            else if (s) {
              var l = !0,
                u = document.createTextNode("");
              new s(p).observe(u, {
                characterData: !0
              }), i = function() {
                u.data = l = !l
              }
            } else if (r && r.resolve) {
              var m = r.resolve();
              i = function() {
                m.then(p)
              }
            } else i = function() {
              o.call(n, p)
            };
            return function(n) {
              var o = {
                fn: n,
                next: void 0
              };
              a && (a.next = o), e || (e = o, i()), a = o
            }
          }
        }, function(e, a, i) {
          var n = i(3),
            o = i(50),
            s = i(22),
            t = i(19)("IE_PROTO"),
            r = function() {},
            c = "prototype",
            p = function() {
              var e, a = i(16)("iframe"),
                n = s.length,
                o = ">";
              for (a.style.display = "none", i(25).appendChild(a), a.src = "javascript:", (e = a.contentWindow.document).open(), e.write("<script>document.F=Object</script" + o), e.close(), p = e.F; n--;) delete p[c][s[n]];
              return p()
            };
          e.exports = Object.create || function(e, a) {
            var i;
            return null !== e ? (r[c] = n(e), i = new r, r[c] = null, i[t] = e) : i = p(), void 0 === a ? i : o(i, a)
          }
        }, function(e, a, i) {
          var n = i(12),
            o = i(3),
            s = i(54);
          e.exports = i(4) ? Object.defineProperties : function(e, a) {
            o(e);
            for (var i, t = s(a), r = t.length, c = 0; r > c;) n.f(e, i = t[c++], a[i]);
            return e
          }
        }, function(e, a, i) {
          var n = i(55),
            o = i(17),
            s = i(13),
            t = i(32),
            r = i(8),
            c = i(26),
            p = Object.getOwnPropertyDescriptor;
          a.f = i(4) ? p : function(e, a) {
            if (e = s(e), a = t(a, !0), c) try {
              return p(e, a)
            } catch (e) {}
            if (r(e, a)) return o(!n.f.call(e, a), e[a])
          }
        }, function(e, a, i) {
          var n = i(8),
            o = i(63),
            s = i(19)("IE_PROTO"),
            t = Object.prototype;
          e.exports = Object.getPrototypeOf || function(e) {
            return e = o(e), n(e, s) ? e[s] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? t : null
          }
        }, function(e, a, i) {
          var n = i(8),
            o = i(13),
            s = i(39)(!1),
            t = i(19)("IE_PROTO");
          e.exports = function(e, a) {
            var i, r = o(e),
              c = 0,
              p = [];
            for (i in r) i != t && n(r, i) && p.push(i);
            for (; a.length > c;) n(r, i = a[c++]) && (~s(p, i) || p.push(i));
            return p
          }
        }, function(e, a, i) {
          var n = i(53),
            o = i(22);
          e.exports = Object.keys || function(e) {
            return n(e, o)
          }
        }, function(e, a) {
          a.f = {}.propertyIsEnumerable
        }, function(e, a, i) {
          var n = i(5);
          e.exports = function(e, a, i) {
            for (var o in a) i && e[o] ? e[o] = a[o] : n(e, o, a[o]);
            return e
          }
        }, function(e, a, i) {
          e.exports = i(5)
        }, function(e, a, i) {
          var n = i(9),
            o = i(3),
            s = function(e, a) {
              if (o(e), !n(a) && null !== a) throw TypeError(a + ": can't set as prototype!")
            };
          e.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, a, n) {
              try {
                (n = i(7)(Function.call, i(51).f(Object.prototype, "__proto__").set, 2))(e, []), a = !(e instanceof Array)
              } catch (e) {
                a = !0
              }
              return function(e, i) {
                return s(e, i), a ? e.__proto__ = i : n(e, i), e
              }
            }({}, !1) : void 0),
            check: s
          }
        }, function(e, a, i) {
          "use strict";
          var n = i(2),
            o = i(6),
            s = i(12),
            t = i(4),
            r = i(1)("species");
          e.exports = function(e) {
            var a = "function" == typeof o[e] ? o[e] : n[e];
            t && a && !a[r] && s.f(a, r, {
              configurable: !0,
              get: function() {
                return this
              }
            })
          }
        }, function(e, a, i) {
          var n = i(3),
            o = i(14),
            s = i(1)("species");
          e.exports = function(e, a) {
            var i, t = n(e).constructor;
            return void 0 === t || null == (i = n(t)[s]) ? a : o(i)
          }
        }, function(e, a, i) {
          var n = i(20),
            o = i(15);
          e.exports = function(e) {
            return function(a, i) {
              var s, t, r = String(o(a)),
                c = n(i),
                p = r.length;
              return c < 0 || c >= p ? e ? "" : void 0 : (s = r.charCodeAt(c)) < 55296 || s > 56319 || c + 1 === p || (t = r.charCodeAt(c + 1)) < 56320 || t > 57343 ? e ? r.charAt(c) : s : e ? r.slice(c, c + 2) : t - 56320 + (s - 55296 << 10) + 65536
            }
          }
        }, function(e, a, i) {
          var n = i(20),
            o = Math.max,
            s = Math.min;
          e.exports = function(e, a) {
            return (e = n(e)) < 0 ? o(e + a, 0) : s(e, a)
          }
        }, function(e, a, i) {
          var n = i(15);
          e.exports = function(e) {
            return Object(n(e))
          }
        }, function(e, a, i) {
          var n = i(21),
            o = i(1)("iterator"),
            s = i(10);
          e.exports = i(6).getIteratorMethod = function(e) {
            if (null != e) return e[o] || e["@@iterator"] || s[n(e)]
          }
        }, function(e, a, i) {
          "use strict";
          var n = i(37),
            o = i(47),
            s = i(10),
            t = i(13);
          e.exports = i(27)(Array, "Array", (function(e, a) {
            this._t = t(e), this._i = 0, this._k = a
          }), (function() {
            var e = this._t,
              a = this._k,
              i = this._i++;
            return !e || i >= e.length ? (this._t = void 0, o(1)) : o(0, "keys" == a ? i : "values" == a ? e[i] : [i, e[i]])
          }), "values"), s.Arguments = s.Array, n("keys"), n("values"), n("entries")
        }, function(e, a) {}, function(e, a, i) {
          "use strict";
          var n, o, s, t = i(28),
            r = i(2),
            c = i(7),
            p = i(21),
            l = i(23),
            u = i(9),
            m = (i(3), i(14)),
            d = i(38),
            x = i(40),
            f = (i(58).set, i(60)),
            v = i(30).set,
            h = i(48)(),
            b = "Promise",
            g = r.TypeError,
            y = r.process,
            w = r[b],
            _ = "process" == p(y = r.process),
            k = function() {},
            S = !! function() {
              try {
                var e = w.resolve(1),
                  a = (e.constructor = {})[i(1)("species")] = function(e) {
                    e(k, k)
                  };
                return (_ || "function" == typeof PromiseRejectionEvent) && e.then(k) instanceof a
              } catch (e) {}
            }(),
            j = function(e, a) {
              return e === a || e === w && a === s
            },
            E = function(e) {
              var a;
              return !(!u(e) || "function" != typeof(a = e.then)) && a
            },
            A = function(e) {
              return j(w, e) ? new O(e) : new o(e)
            },
            O = o = function(e) {
              var a, i;
              this.promise = new e((function(e, n) {
                if (void 0 !== a || void 0 !== i) throw g("Bad Promise constructor");
                a = e, i = n
              })), this.resolve = m(a), this.reject = m(i)
            },
            N = function(e) {
              try {
                e()
              } catch (e) {
                return {
                  error: e
                }
              }
            },
            T = function(e, a) {
              if (!e._n) {
                e._n = !0;
                var i = e._c;
                h((function() {
                  for (var n = e._v, o = 1 == e._s, s = 0, t = function(a) {
                      var i, s, t = o ? a.ok : a.fail,
                        r = a.resolve,
                        c = a.reject,
                        p = a.domain;
                      try {
                        t ? (o || (2 == e._h && F(e), e._h = 1), !0 === t ? i = n : (p && p.enter(), i = t(n), p && p.exit()), i === a.promise ? c(g("Promise-chain cycle")) : (s = E(i)) ? s.call(i, r, c) : r(i)) : c(n)
                      } catch (e) {
                        c(e)
                      }
                    }; i.length > s;) t(i[s++]);
                  e._c = [], e._n = !1, a && !e._h && B(e)
                }))
              }
            },
            B = function(e) {
              v.call(r, (function() {
                var a, i, n, o = e._v;
                if (R(e) && (a = N((function() {
                    _ ? y.emit("unhandledRejection", o, e) : (i = r.onunhandledrejection) ? i({
                      promise: e,
                      reason: o
                    }) : (n = r.console) && n.error && n.error("Unhandled promise rejection", o)
                  })), e._h = _ || R(e) ? 2 : 1), e._a = void 0, a) throw a.error
              }))
            },
            R = function(e) {
              if (1 == e._h) return !1;
              for (var a, i = e._a || e._c, n = 0; i.length > n;)
                if ((a = i[n++]).fail || !R(a.promise)) return !1;
              return !0
            },
            F = function(e) {
              v.call(r, (function() {
                var a;
                _ ? y.emit("rejectionHandled", e) : (a = r.onrejectionhandled) && a({
                  promise: e,
                  reason: e._v
                })
              }))
            },
            z = function(e) {
              var a = this;
              a._d || (a._d = !0, (a = a._w || a)._v = e, a._s = 2, a._a || (a._a = a._c.slice()), T(a, !0))
            },
            C = function(e) {
              var a, i = this;
              if (!i._d) {
                i._d = !0, i = i._w || i;
                try {
                  if (i === e) throw g("Promise can't be resolved itself");
                  (a = E(e)) ? h((function() {
                    var n = {
                      _w: i,
                      _d: !1
                    };
                    try {
                      a.call(e, c(C, n, 1), c(z, n, 1))
                    } catch (e) {
                      z.call(n, e)
                    }
                  })): (i._v = e, i._s = 1, T(i, !1))
                } catch (e) {
                  z.call({
                    _w: i,
                    _d: !1
                  }, e)
                }
              }
            };
          S || (w = function(e) {
            d(this, w, b, "_h"), m(e), n.call(this);
            try {
              e(c(C, this, 1), c(z, this, 1))
            } catch (e) {
              z.call(this, e)
            }
          }, (n = function(e) {
            this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
          }).prototype = i(56)(w.prototype, {
            then: function(e, a) {
              var i = A(f(this, w));
              return i.ok = "function" != typeof e || e, i.fail = "function" == typeof a && a, i.domain = _ ? y.domain : void 0, this._c.push(i), this._a && this._a.push(i), this._s && T(this, !1), i.promise
            },
            catch: function(e) {
              return this.then(void 0, e)
            }
          }), O = function() {
            var e = new n;
            this.promise = e, this.resolve = c(C, e, 1), this.reject = c(z, e, 1)
          }), l(l.G + l.W + l.F * !S, {
            Promise: w
          }), i(18)(w, b), i(59)(b), s = i(6)[b], l(l.S + l.F * !S, b, {
            reject: function(e) {
              var a = A(this);
              return (0, a.reject)(e), a.promise
            }
          }), l(l.S + l.F * (t || !S), b, {
            resolve: function(e) {
              if (e instanceof w && j(e.constructor, this)) return e;
              var a = A(this);
              return (0, a.resolve)(e), a.promise
            }
          }), l(l.S + l.F * !(S && i(46)((function(e) {
            w.all(e).catch(k)
          }))), b, {
            all: function(e) {
              var a = this,
                i = A(a),
                n = i.resolve,
                o = i.reject,
                s = N((function() {
                  var i = [],
                    s = 0,
                    t = 1;
                  x(e, !1, (function(e) {
                    var r = s++,
                      c = !1;
                    i.push(void 0), t++, a.resolve(e).then((function(e) {
                      c || (c = !0, i[r] = e, --t || n(i))
                    }), o)
                  })), --t || n(i)
                }));
              return s && o(s.error), i.promise
            },
            race: function(e) {
              var a = this,
                i = A(a),
                n = i.reject,
                o = N((function() {
                  x(e, !1, (function(e) {
                    a.resolve(e).then(i.resolve, n)
                  }))
                }));
              return o && n(o.error), i.promise
            }
          })
        }, function(e, a, i) {
          "use strict";
          var n = i(61)(!0);
          i(27)(String, "String", (function(e) {
            this._t = String(e), this._i = 0
          }), (function() {
            var e, a = this._t,
              i = this._i;
            return i >= a.length ? {
              value: void 0,
              done: !0
            } : (e = n(a, i), this._i += e.length, {
              value: e,
              done: !1
            })
          }))
        }, function(e, a, i) {
          i(65);
          for (var n = i(2), o = i(5), s = i(10), t = i(1)("toStringTag"), r = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], c = 0; c < 5; c++) {
            var p = r[c],
              l = n[p],
              u = l && l.prototype;
            u && !u[t] && o(u, t, p), s[p] = s.Array
          }
        }, function(e, a) {
          e.exports = i(2081)
        }, function(e, a) {
          e.exports = i(6113)
        }]))
      },
      878: module => {
        const rON = {
            GSSCRIPT: "GSSCRIPT",
            CHROMEEX: "CHROMEEX",
            NODEJS: "NODEJS"
          },
          rKiwiEnum = {
            googleScriptError_doGetNotFound: "googleScriptError_doGetNotFound"
          },
          rRunTime = (() => {
            const logStarted = ({
              filename: e = ""
            }) => {
              console.log(`[STARTED;1.23.1226.0933]:${e}`)
            };
            class Gscript {
              constructor() {
                this.ON = rON.GSSCRIPT, this.toBase64 = e => Utilities.base64Encode(e), this.fromBase64 = e => Utilities.newBlob(Utilities.base64Decode(e)).getDataAsString(), this.getFieldNameOfBodyFetch = () => "payload", this.doFetch = e => UrlFetchApp.fetch(e.url, e), this.LogStarted = logStarted
              }
              setAxios(e) {}
            }
            class ChromeEx {
              constructor() {
                this.ON = rON.CHROMEEX, this.toBase64 = e => btoa(e), this.fromBase64 = e => atob(e), this.getFieldNameOfBodyFetch = () => "body", this.doFetch = e => {
                  try {
                    return fetch(e.url, e)
                  } catch (e) {
                    throw e
                  }
                }, this.LogStarted = logStarted
              }
              setAxios(e) {}
            }
            class NodeJS {
              constructor() {
                this.ON = rON.NODEJS, this.axios = void 0, this.toBase64 = e => Buffer.from(e).toString("base64"), this.fromBase64 = e => Buffer.from(e, "base64").toString("utf-8"), this.getFieldNameOfBodyFetch = () => "data", this.doFetch = config => {
                  try {
                    return void 0 === this.axios && (this.axios = eval('require("axios");')), this.axios(config).catch((e => Promise.reject(e)))
                  } catch (e) {
                    throw e
                  }
                }, this.LogStarted = logStarted
              }
              setAxios(e) {
                this.axios = e
              }
            }
            var runner = new NodeJS;
            switch (!0) {
              case "undefined" != typeof ScriptApp && "function" == typeof ScriptApp.getOAuthToken && "undefined" != typeof Utilities:
                runner = new Gscript;
                break;
              case "undefined" != typeof chrome && "runtime" in chrome && void 0 !== chrome.runtime && "id" in chrome.runtime:
                runner = new ChromeEx
            }
            return runner
          })(),
          rType = (() => {
            const e = e => Object.prototype.toString.call(e).slice(8, -1).toLowerCase(),
              a = {
                array: "array",
                object: "object",
                string: "string",
                date: "date",
                number: "number",
                function: "function",
                asyncfunction: "asyncfunction",
                regexp: "regexp",
                boolean: "boolean",
                null: "null",
                undefined: "undefined",
                bigint: "bigint",
                symbol: "symbol"
              },
              i = i => `|${a.null}|${a.undefined}|`.includes(e(i));
            return {
              v: a,
              GetTypeString: e,
              IsArray: i => e(i) === a.array,
              IsArrayNotEmpty: i => e(i) === a.array && i.length > 0,
              IsObject: i => e(i) === a.object,
              IsObjectNotEmpty: i => e(i) === a.object && Object.keys(i).length > 0,
              IsString: i => e(i) === a.string,
              IsStringNotEmpty: i => e(i) === a.string && i.length > 0,
              IsStringNotEmptyIsFalse: i => !(e(i) === a.string && i.length > 0),
              IsDate: i => e(i) === a.date,
              IsNumber: i => `|${a.number}|${a.bigint}|`.includes(e(i)),
              IsFunction: i => e(i) === a.function || e(i) === a.asyncfunction,
              IsBoolean: i => e(i) === a.boolean,
              IsNull: i,
              IsNotNull: e => !i(e)
            }
          })(),
          rString = (() => {
            const e = e => rType.IsStringNotEmpty(e) ? e.replace(/[^a-zA-Z0-9]/g, "") : e,
              a = (e, a) => {
                try {
                  return e.match(new RegExp(".{1," + a + "}", "g"))
                } catch (e) {
                  throw e
                }
              },
              i = e => e.split("").reverse().join(""),
              n = (e, a) => {
                if (!1 === rType.IsStringNotEmpty(a)) return e;
                if (rType.IsStringNotEmpty(e))
                  for (; e.endsWith(a);) e = e.slice(0, -1);
                return e
              },
              o = (e, a) => {
                if (!1 === rType.IsStringNotEmpty(a)) return e;
                if (rType.IsStringNotEmpty(e))
                  for (; e.startsWith(a);) e = e.substring(1);
                return e
              },
              s = (e, a) => (!1 === rType.IsStringNotEmpty(a) || rType.IsStringNotEmpty(e) && (e = o(e, a), e = n(e, a)), e),
              t = (...e) => {
                if (0 === e.length) return "";
                for (let a = 0; a < e.length; a++)
                  if (rType.IsStringNotEmpty(e[a])) return e[a];
                return ""
              },
              r = (e, a, i) => {
                var n = i.indexOf(e);
                if (-1 === n) return "";
                var o = n + e.length,
                  s = i.indexOf(a, o);
                return -1 === s ? "" : i.substring(o, s)
              },
              c = (e, a, i) => {
                let n = [],
                  o = (i + "").split(e).slice(1);
                for (let e = 0; e < o.length; e++) {
                  let i = o[e],
                    s = i.indexOf(a);
                  s > -1 && n.push(i.substring(0, s))
                }
                return n
              },
              p = (e, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
                const i = a || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let n = "";
                const o = i.length;
                for (let a = 0; a < e; a++) n += i.charAt(Math.floor(Math.random() * o));
                return n
              };
            const l = e => {
                let a = e.match(/--[a-z0-9]+=/gi);
                if (null == a || 0 === a.length) return {};
                let i = {};
                return a.forEach((a => {
                  e.includes(a) && (i[a.replace("--", "").replace("=", "").toLowerCase()] = e.split(a)[1])
                })), Object.keys(i).forEach((e => {
                  let a = i[e] + "",
                    n = a.match(/\s--[a-z0-9_]+=/i);
                  null !== n && (a = a.substring(0, n.index)), i[e] = a.trimEnd().trimStart()
                })), i
              },
              u = e => (e = e || "").split("").map((e => e.charCodeAt(0))).reduce(((e, a) => e + a));
            return {
              SplitLines: e => {
                try {
                  return e.split(/\r\n|\r|\n/)
                } catch {
                  return [e]
                }
              },
              RemoveSpecialChars: e,
              Keymail: e,
              ChunkString: a,
              TrimEnd: n,
              TrimStart: o,
              TrimStartEnd: s,
              GetNotEmptyFirst: t,
              IsStringNotEmptyAll: (...e) => {
                if (0 === e.length) return !1;
                let a = rType.IsStringNotEmpty(e[0]);
                if (a)
                  for (let i = 1; i < e.length && (a = rType.IsStringNotEmpty(e[i]), !1 !== a); i++);
                return a
              },
              getQueryValueByNameInURL: (e, a = "") => {
                try {
                  e = e.replace(/[\[\]]/g, "\\$&");
                  var i = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(a);
                  return i && i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : ""
                } catch (e) {
                  throw e
                }
              },
              isURL: e => {
                try {
                  let a = (e + "").toLowerCase();
                  return -1 !== a.indexOf("http://localhost") || -1 !== a.indexOf("http://127.0.0.1") || (["chrome-extension://", "chrome://"].findIndex((e => a.startsWith(e))) > -1 || (!0 === a.startsWith("chrome://") || null !== a.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)))
                } catch {
                  return !1
                }
              },
              isEmail: e => {
                try {
                  return /\S+@\S+\.\S+/.test(e)
                } catch {
                  return !1
                }
              },
              extractAddressMails: e => {
                try {
                  let a = (e + "").match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gim);
                  if (rType.IsArrayNotEmpty(a)) return rArray.RemoveDuplicate(a)
                } catch {}
                return []
              },
              parseBetweenForceEmpty: (e, a, i) => {
                let n = r(e, a, i);
                return s(n.replace(/(\r\n|\r|\n)/g, ""), " ")
              },
              parseBetweenReplace: (e, a, i, n) => {
                let o = c(e, a, i);
                for (let s = 0; s < o.length; s++) {
                  let t = `${e}${o[s]}${a}`,
                    r = `${e}${n}${a}`;
                  for (; i.indexOf(t) > -1;) i = i.replace(t, r)
                }
                return i
              },
              parseBetweenRemove: (e, a, i) => {
                let n = i,
                  o = () => `${e}${r(e,a,n)}${a}`,
                  s = o();
                for (; n.includes(s);) n = n.replace(s, ""), s = o();
                return n
              },
              parseBetweenForceEmptyWithoutTrim: r,
              parseBetweenForceArrayEmptyWithoutTrim: c,
              extractLinks: e => {
                try {
                  let a = (e + "").match(/\bhttps?:\/\/\S+/gi);
                  if (rType.IsArrayNotEmpty(a)) return a
                } catch {}
                return []
              },
              includesIgnoreCaseByOR: (e, ...a) => {
                if (!1 === rType.IsStringNotEmpty(e)) return !1;
                if (void 0 === a || 0 === a.length) return !1;
                let i = rString.TrimStartEnd(e + "", " ").toLowerCase();
                for (let e = 0; e < a.length; e++) {
                  let n = rString.TrimStartEnd(a[e], " ").toLowerCase();
                  if (i.includes(n)) return !0
                }
                return !1
              },
              includesIgnoreCaseByAND: (e, ...a) => {
                if (!1 === rType.IsStringNotEmpty(e)) return !1;
                if (void 0 === a || 0 === a.length) return !1;
                let i = rString.TrimStartEnd(e + "", " ").toLowerCase();
                for (let e = 0; e < a.length; e++) {
                  let n = rString.TrimStartEnd(a[e], " ").toLowerCase();
                  if (!1 === i.includes(n)) return !1
                }
                return !0
              },
              randomString: p,
              randomStringLower: (e, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => p(e, a).toLowerCase(),
              randomStringUpper: (e, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => p(e, a).toUpperCase(),
              toUnixSep: e => (e + "").replace(/[\\/]+/g, "/"),
              encodeUrlForBase64: function(e) {
                return e.replace(/\+/g, "~").replace(/\//g, "_").replace(/=/g, "-")
              },
              decodeUrlForBase64: function(e) {
                return e.replace(/~/g, "+").replace(/_/g, "/").replace(/-/g, "=")
              },
              getFileExtension: function(e) {
                var a = /^.+\.([^.]+)$/.exec(e);
                return null == a ? "" : `.${a[1]}`
              },
              buildUrlPaths: (e = []) => rType.IsArrayNotEmpty(e) ? e.reduce(((e, a) => (e += `/${s(a,"/")}`, s(e, "/"))), "") : "",
              parseAgrumentCommandsToObject: l,
              parseAgrumentCommandsToObjectByProcess: () => {
                try {
                  let e = process.argv.slice(2);
                  return l(e.join(" "))
                } catch (e) {
                  return {}
                }
              },
              getIncrementLastDigit: e => {
                try {
                  return (e = e || "").replace(/\d+$/, (function(e) {
                    let a = e.length;
                    return (parseInt(e) + 1).toString().padStart(a, "0")
                  }))
                } catch (e) {
                  throw e
                }
              },
              ToNumberASCIICode: u,
              ToNumberByMod: (e, a = 1) => (e = t(e, ""), a = a || 1, u(e) % a),
              EncodeSimple: (e = "") => (e += "").length <= 0 ? e : a(e, 2).map((e => i(e))).reverse().join(""),
              DecodeSimple: (e = "") => (e += "").length <= 0 ? e : a(e, 2).reverse().map((e => i(e))).join(""),
              replaceAllByEscapeRegExp: function(e, a, i) {
                return e.replace(new RegExp(a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), i)
              },
              humanFileSize: function(e) {
                const a = 1024;
                if (Math.abs(e) < a) return e + " B";
                const i = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
                let n = -1;
                do {
                  e /= a, ++n
                } while (Math.round(100 * Math.abs(e)) / 100 >= a && n < i.length - 1);
                return e.toFixed(2) + " " + i[n]
              },
              extractIPAddressFirst: (e = "") => {
                try {
                  return (e + "").match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)[0]
                } catch {
                  return ""
                }
              }
            }
          })(),
          rObject = (() => {
            const e = (a, i) => {
                if (!1 === rType.IsObjectNotEmpty(a) && !1 === rType.IsArrayNotEmpty(a)) return;
                if (!1 === rType.IsStringNotEmpty(i)) return;
                parts = i.split(".");
                let n = parts[0];
                return n in a == !1 && (n = Object.keys(a).find((e => e.toLowerCase() === parts[0].toLowerCase()))), 1 === parts.length ? a[n] : e(a[n], parts.slice(1).join("."))
              },
              a = (a, i) => {
                let n = e(a, i);
                return rType.IsNotNull(n) ? n + "" : ""
              },
              i = (e, a = "") => {
                try {
                  if ((a + "").indexOf(".") > -1) {
                    let i = e,
                      n = a.split(".");
                    for (let e = 0; e < n.length; e++)
                      if (e === n.length - 1) {
                        try {
                          delete i[n[e]]
                        } catch {}
                        try {
                          delete i[n[e].toLowerCase()]
                        } catch {}
                      } else i = i[n[e]]
                  } else delete e[a]
                } catch {}
              },
              n = (e, a = []) => {
                for (let n = 0; n < a.length; n++) i(e, a[n])
              },
              o = (...e) => {
                const a = e => e && "object" == typeof e;
                return e.reduce(((e, i) => (Object.keys(i).forEach((n => {
                  const s = e[n],
                    t = i[n];
                  if (Array.isArray(s) && Array.isArray(t)) {
                    let a = s.concat(...t);
                    a.length > 0 && (a = rArray.RemoveDuplicateObject(a)), e[n] = a
                  } else a(s) && a(t) ? e[n] = o(s, t) : e[n] = t
                })), e)), {})
              };

            function s(e, a) {
              const i = new Set;
              return JSON.stringify(e, ((e, a) => (i.add(e), a))), JSON.stringify(e, Array.from(i).sort(), a)
            }
            const t = (() => {
                var e = Object.prototype.hasOwnProperty;
                const a = e => "[Throws: " + (e ? e.message : "?") + "]",
                  i = i => {
                    var n = [];
                    return function i(o) {
                      if (null === o || "object" != typeof o) return o;
                      if (-1 !== n.indexOf(o)) return "[Circular]";
                      if (n.push(o), "function" == typeof o.toJSON) try {
                        var s = i(o.toJSON());
                        return n.pop(), s
                      } catch (e) {
                        return a(e)
                      }
                      if (Array.isArray(o)) {
                        var t = o.map(i);
                        return n.pop(), t
                      }
                      var r = Object.keys(o).reduce((function(n, s) {
                        return n[s] = i(((i, n) => {
                          if (e.call(i, n)) try {
                            return i[n]
                          } catch (e) {
                            return a(e)
                          }
                          return i[n]
                        })(o, s)), n
                      }), {});
                      return n.pop(), r
                    }(i)
                  };
                return (e, a, n) => JSON.stringify(i(e), a, n)
              })(),
              r = (e, a) => {
                const i = {};
                return function e(a, n, o = "") {
                  for (const e of Object.keys(a)) {
                    const a = "" === o ? e : `${o}.${e}`;
                    void 0 === n[e] && (i[a] = "-")
                  }
                  for (const [s, t] of Object.entries(n)) {
                    const r = Array.isArray(n) ? o + `[${s}]` : "" === o ? s : `${o}.${s}`;
                    void 0 === a[s] ? i[r] = "+" : t !== a[s] && ("object" == typeof t && "object" == typeof a[s] ? e(a[s], t, r) : i[r] = n[s])
                  }
                }(e, a), i
              };
            return {
              GetValueByPath: e,
              GetValueByPathForceString: a,
              DeleteProperty: i,
              DeleteProperties: n,
              mergeDeep: o,
              createFormDataBody: e => {
                if (!1 === rType.IsObjectNotEmpty(e)) return "";
                var a = [];
                for (var i in e) {
                  var n = encodeURIComponent(i),
                    o = encodeURIComponent(e[i]);
                  a.push(n + "=" + o)
                }
                return a.join("&")
              },
              createQueryString: e => {
                if (!1 === rType.IsObjectNotEmpty(e)) return "";
                var a = [];
                for (var i in e) {
                  var n = i,
                    o = encodeURIComponent(e[i]);
                  a.push(n + "=" + o)
                }
                return a.join("&")
              },
              buildObjWithValue: (e, a = "") => {
                const i = e.split(".");
                return i.reduceRight(((e, n, o) => ({
                  [n]: o === i.length - 1 ? a : e
                })), {})
              },
              buildObjKeyValue: (e, a) => {
                let i = {};
                return i[e] = a, i
              },
              JSONstringifyOrder: s,
              safeJson: t,
              ResolveProcessEnv: async (e = {}, i = "") => {
                e = e || {};
                try {
                  e = JSON.parse(JSON.stringify(e)), ["toJSON_github", "toJSON_secrets"].forEach((a => {
                    a in e && (e[a] = JSON.parse(e[a]))
                  }));
                  let a = [],
                    n = "",
                    o = ["API_VARIABLES", "API_VARIABLES_1", "API_VARIABLES_2", "API_VARIABLES_3", "API_VARIABLES_4", "API_VARIABLES_5"];
                  switch (e.ManualRunInputs = {}, !0) {
                    case "GITHUB_SERVER_URL" in e:
                      a.push(e.GITHUB_SERVER_URL), a.push(e.GITHUB_REPOSITORY), a.push(`actions/runs/${e.GITHUB_RUN_ID}`), n = `gh-${e.GITHUB_REPOSITORY.replace("/","-")}-${e.GITHUB_RUN_ID}`, o.forEach((a => {
                        e.ManualRunInputs[a.toLowerCase()] = rObject.GetValueByPathForceString(e, `toJSON_github.event.inputs.${a}`)
                      }));
                      break;
                    case "SYSTEM_TEAMFOUNDATIONSERVERURI" in e:
                      a.push(e.SYSTEM_TEAMFOUNDATIONSERVERURI), a.push(e.BUILD_REPOSITORY_NAME), a.push(`_build/results?buildId=${e.BUILD_BUILDID}&view=logs`);
                      let s = new URL(e.SYSTEM_TEAMFOUNDATIONCOLLECTIONURI).pathname;
                      n = `az-${rJS.String.TrimStartEnd(s,"/")}-${e.BUILD_REPOSITORY_NAME}-${e.BUILD_BUILDID}`, o.forEach((a => {
                        e.ManualRunInputs[a.toLowerCase()] = rObject.GetValueByPathForceString(e, `${a}`)
                      }));
                      break;
                    default:
                      a.push(`http://${await rJS.Fetch.getPublicIP()}`), a.push(e.COMPUTERNAME), a.push(rJS.String.toUnixSep(i)), n = e.COMPUTERNAME, o.forEach((a => {
                        e.ManualRunInputs[a.toLowerCase()] = ""
                      }))
                  }
                  e.viewlog = rJS.String.buildUrlPaths(a), e.ownerUrl = "", rType.IsStringNotEmpty(e.ImageVersion) && (e.ownerUrl = (() => {
                    const a = new URL(e.viewlog);
                    return `${a.origin}/${a.pathname.split("/")[1]}`
                  })(), e.ownerFB = e.ownerUrl.replace("https://github.com/", "gh-").replace("https://dev.azure.com/", "az-")), e.nameFile = n
                } catch (a) {
                  e.error = a, e.errorString = a + ""
                }
                try {
                  e.WEBPACK_BUILD_VERSION = "1.23.1226.0933"
                } catch {}
                try {
                  e.DataInputs = {};
                  let i = a(e, "ManualRunInputs.api_variables");
                  rType.IsStringNotEmpty(i) && (e.DataInputs = JSON.parse(Buffer.from(i, "base64").toString("utf8")))
                } catch {}
                try {
                  e.SecretInputs = {};
                  let i = ["secret_variable", "secret_variable_1", "secret_variable_2", "secret_variable_3", "secret_variable_4", "secret_variable_5"].reduce(((i, n) => {
                    let o = a(e, n);
                    return rType.IsStringNotEmpty(o) && (i += o), i
                  }), "");
                  e.SecretInputs = Buffer.from(i || "", "base64").toString("utf8");
                  try {
                    e.SecretInputs = JSON.parse(e.SecretInputs)
                  } catch {
                    e.SecretInputs = {}
                  }
                } catch {}
                return e
              },
              handleAxiosError: e => {
                let a = {
                  data: e?.response?.data,
                  status: e?.response?.status,
                  headers: e?.response?.headers,
                  message: e?.message,
                  config: e?.config
                };
                return n(a.config, ["transitional", "adapter", "transformRequest", "transformResponse", "timeout", "xsrfCookieName", "xsrfHeaderName", "maxContentLength", "maxBodyLength", "env", "validateStatus", "mode", "cache", "credentials", "redirect", "referrerPolicy", "muteHttpExceptions"]), a
              },
              JSONParseForceInput: e => {
                try {
                  return JSON.parse(e)
                } catch (a) {
                  return e
                }
              },
              BuildUrlIdRunner: async (e = {}) => {
                let a = [];
                switch (!0) {
                  case "GITHUB_SERVER_URL" in e:
                    a.push(e.GITHUB_SERVER_URL), a.push(e.GITHUB_REPOSITORY);
                    break;
                  case "SYSTEM_TEAMFOUNDATIONSERVERURI" in e:
                    a.push(e.SYSTEM_TEAMFOUNDATIONSERVERURI), a.push(e.BUILD_REPOSITORY_NAME), a.push(e.BUILD_BUILDID);
                    break;
                  default:
                    a.push(`http://${await rJS.Fetch.getPublicIP()}`), a.push(e.COMPUTERNAME), "undefined" != typeof process && rType.IsArrayNotEmpty(process.argv) && a.push(rString.toUnixSep(process.argv[1]))
                }
                return rJS.String.buildUrlPaths(a)
              },
              compareByJSON: (e, a) => {
                try {
                  return s(e || {}) === s(a || {})
                } catch (e) {
                  throw e
                }
              },
              keyChanges: r,
              GetDiff: r,
              SetValueByPath: (e, a, i) => {
                if (void 0 === e) throw new Error("SetValueByPath[object is undefined]");
                if (null === e) throw new Error("SetValueByPath[object is null]");
                const n = a.split("."),
                  o = n.length - 1;
                for (let a = 0; a < o; ++a) {
                  const i = n[a];
                  e = e[i] ?? (e[i] = {})
                }
                e[n[o]] = i
              }
            }
          })(),
          rArray = {
            Chunk: (e = [], a = 0) => {
              try {
                if (!1 === rType.IsArrayNotEmpty(e)) return [e];
                if (a >= e.length || a <= 0) return [e];
                let i = [];
                for (let n = 0; n < e.length; n += a) i.push(e.slice(n, n + a));
                return i
              } catch (e) {
                throw e
              }
            },
            RemoveDuplicate: e => [...new Set(e)],
            RandomItem: function(e) {
              if (e && e.length > 0) return e[Math.floor(Math.random() * e.length)]
            },
            RemoveDuplicateObject: e => {
              try {
                return e.filter(((a, i) => i === e.findIndex((e => JSON.stringify(e) === JSON.stringify(a)))))
              } catch {
                return e
              }
            }
          },
          rHash = (() => {
            const e = e => {
                function a(e, a) {
                  return e << a | e >>> 32 - a
                }

                function i(e) {
                  var a, i = "";
                  for (a = 7; a >= 0; a--) i += (e >>> 4 * a & 15).toString(16);
                  return i
                }
                var n, o, s, t, r, c, p, l, u, m = new Array(80),
                  d = 1732584193,
                  x = 4023233417,
                  f = 2562383102,
                  v = 271733878,
                  h = 3285377520,
                  b = (e = function(e) {
                    e = e.replace(/\r\n/g, "\n");
                    for (var a = "", i = 0; i < e.length; i++) {
                      var n = e.charCodeAt(i);
                      n < 128 ? a += String.fromCharCode(n) : n > 127 && n < 2048 ? (a += String.fromCharCode(n >> 6 | 192), a += String.fromCharCode(63 & n | 128)) : (a += String.fromCharCode(n >> 12 | 224), a += String.fromCharCode(n >> 6 & 63 | 128), a += String.fromCharCode(63 & n | 128))
                    }
                    return a
                  }(e)).length,
                  g = new Array;
                for (o = 0; o < b - 3; o += 4) s = e.charCodeAt(o) << 24 | e.charCodeAt(o + 1) << 16 | e.charCodeAt(o + 2) << 8 | e.charCodeAt(o + 3), g.push(s);
                switch (b % 4) {
                  case 0:
                    o = 2147483648;
                    break;
                  case 1:
                    o = e.charCodeAt(b - 1) << 24 | 8388608;
                    break;
                  case 2:
                    o = e.charCodeAt(b - 2) << 24 | e.charCodeAt(b - 1) << 16 | 32768;
                    break;
                  case 3:
                    o = e.charCodeAt(b - 3) << 24 | e.charCodeAt(b - 2) << 16 | e.charCodeAt(b - 1) << 8 | 128
                }
                for (g.push(o); g.length % 16 != 14;) g.push(0);
                for (g.push(b >>> 29), g.push(b << 3 & 4294967295), n = 0; n < g.length; n += 16) {
                  for (o = 0; o < 16; o++) m[o] = g[n + o];
                  for (o = 16; o <= 79; o++) m[o] = a(m[o - 3] ^ m[o - 8] ^ m[o - 14] ^ m[o - 16], 1);
                  for (t = d, r = x, c = f, p = v, l = h, o = 0; o <= 19; o++) u = a(t, 5) + (r & c | ~r & p) + l + m[o] + 1518500249 & 4294967295, l = p, p = c, c = a(r, 30), r = t, t = u;
                  for (o = 20; o <= 39; o++) u = a(t, 5) + (r ^ c ^ p) + l + m[o] + 1859775393 & 4294967295, l = p, p = c, c = a(r, 30), r = t, t = u;
                  for (o = 40; o <= 59; o++) u = a(t, 5) + (r & c | r & p | c & p) + l + m[o] + 2400959708 & 4294967295, l = p, p = c, c = a(r, 30), r = t, t = u;
                  for (o = 60; o <= 79; o++) u = a(t, 5) + (r ^ c ^ p) + l + m[o] + 3395469782 & 4294967295, l = p, p = c, c = a(r, 30), r = t, t = u;
                  d = d + t & 4294967295, x = x + r & 4294967295, f = f + c & 4294967295, v = v + p & 4294967295, h = h + l & 4294967295
                }
                return (u = i(d) + i(x) + i(f) + i(v) + i(h)).toLowerCase()
              },
              a = (() => {
                function e(e, a) {
                  var t = e[0],
                    r = e[1],
                    c = e[2],
                    l = e[3];
                  t = i(t, r, c, l, a[0], 7, -680876936), l = i(l, t, r, c, a[1], 12, -389564586), c = i(c, l, t, r, a[2], 17, 606105819), r = i(r, c, l, t, a[3], 22, -1044525330), t = i(t, r, c, l, a[4], 7, -176418897), l = i(l, t, r, c, a[5], 12, 1200080426), c = i(c, l, t, r, a[6], 17, -1473231341), r = i(r, c, l, t, a[7], 22, -45705983), t = i(t, r, c, l, a[8], 7, 1770035416), l = i(l, t, r, c, a[9], 12, -1958414417), c = i(c, l, t, r, a[10], 17, -42063), r = i(r, c, l, t, a[11], 22, -1990404162), t = i(t, r, c, l, a[12], 7, 1804603682), l = i(l, t, r, c, a[13], 12, -40341101), c = i(c, l, t, r, a[14], 17, -1502002290), t = n(t, r = i(r, c, l, t, a[15], 22, 1236535329), c, l, a[1], 5, -165796510), l = n(l, t, r, c, a[6], 9, -1069501632), c = n(c, l, t, r, a[11], 14, 643717713), r = n(r, c, l, t, a[0], 20, -373897302), t = n(t, r, c, l, a[5], 5, -701558691), l = n(l, t, r, c, a[10], 9, 38016083), c = n(c, l, t, r, a[15], 14, -660478335), r = n(r, c, l, t, a[4], 20, -405537848), t = n(t, r, c, l, a[9], 5, 568446438), l = n(l, t, r, c, a[14], 9, -1019803690), c = n(c, l, t, r, a[3], 14, -187363961), r = n(r, c, l, t, a[8], 20, 1163531501), t = n(t, r, c, l, a[13], 5, -1444681467), l = n(l, t, r, c, a[2], 9, -51403784), c = n(c, l, t, r, a[7], 14, 1735328473), t = o(t, r = n(r, c, l, t, a[12], 20, -1926607734), c, l, a[5], 4, -378558), l = o(l, t, r, c, a[8], 11, -2022574463), c = o(c, l, t, r, a[11], 16, 1839030562), r = o(r, c, l, t, a[14], 23, -35309556), t = o(t, r, c, l, a[1], 4, -1530992060), l = o(l, t, r, c, a[4], 11, 1272893353), c = o(c, l, t, r, a[7], 16, -155497632), r = o(r, c, l, t, a[10], 23, -1094730640), t = o(t, r, c, l, a[13], 4, 681279174), l = o(l, t, r, c, a[0], 11, -358537222), c = o(c, l, t, r, a[3], 16, -722521979), r = o(r, c, l, t, a[6], 23, 76029189), t = o(t, r, c, l, a[9], 4, -640364487), l = o(l, t, r, c, a[12], 11, -421815835), c = o(c, l, t, r, a[15], 16, 530742520), t = s(t, r = o(r, c, l, t, a[2], 23, -995338651), c, l, a[0], 6, -198630844), l = s(l, t, r, c, a[7], 10, 1126891415), c = s(c, l, t, r, a[14], 15, -1416354905), r = s(r, c, l, t, a[5], 21, -57434055), t = s(t, r, c, l, a[12], 6, 1700485571), l = s(l, t, r, c, a[3], 10, -1894986606), c = s(c, l, t, r, a[10], 15, -1051523), r = s(r, c, l, t, a[1], 21, -2054922799), t = s(t, r, c, l, a[8], 6, 1873313359), l = s(l, t, r, c, a[15], 10, -30611744), c = s(c, l, t, r, a[6], 15, -1560198380), r = s(r, c, l, t, a[13], 21, 1309151649), t = s(t, r, c, l, a[4], 6, -145523070), l = s(l, t, r, c, a[11], 10, -1120210379), c = s(c, l, t, r, a[2], 15, 718787259), r = s(r, c, l, t, a[9], 21, -343485551), e[0] = p(t, e[0]), e[1] = p(r, e[1]), e[2] = p(c, e[2]), e[3] = p(l, e[3])
                }

                function a(e, a, i, n, o, s) {
                  return a = p(p(a, e), p(n, s)), p(a << o | a >>> 32 - o, i)
                }

                function i(e, i, n, o, s, t, r) {
                  return a(i & n | ~i & o, e, i, s, t, r)
                }

                function n(e, i, n, o, s, t, r) {
                  return a(i & o | n & ~o, e, i, s, t, r)
                }

                function o(e, i, n, o, s, t, r) {
                  return a(i ^ n ^ o, e, i, s, t, r)
                }

                function s(e, i, n, o, s, t, r) {
                  return a(n ^ (i | ~o), e, i, s, t, r)
                }

                function t(e) {
                  var a, i = [];
                  for (a = 0; a < 64; a += 4) i[a >> 2] = e.charCodeAt(a) + (e.charCodeAt(a + 1) << 8) + (e.charCodeAt(a + 2) << 16) + (e.charCodeAt(a + 3) << 24);
                  return i
                }
                var r = "0123456789abcdef".split("");

                function c(e) {
                  for (var a = "", i = 0; i < 4; i++) a += r[e >> 8 * i + 4 & 15] + r[e >> 8 * i & 15];
                  return a
                }
                return function(a) {
                  return function(e) {
                    for (var a = 0; a < e.length; a++) e[a] = c(e[a]);
                    return e.join("")
                  }(function(a) {
                    txt = "";
                    var i, n = a.length,
                      o = [1732584193, -271733879, -1732584194, 271733878];
                    for (i = 64; i <= a.length; i += 64) e(o, t(a.substring(i - 64, i)));
                    a = a.substring(i - 64);
                    var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                    for (i = 0; i < a.length; i++) s[i >> 2] |= a.charCodeAt(i) << (i % 4 << 3);
                    if (s[i >> 2] |= 128 << (i % 4 << 3), i > 55)
                      for (e(o, s), i = 0; i < 16; i++) s[i] = 0;
                    return s[14] = 8 * n, e(o, s), o
                  }(a))
                };

                function p(e, a) {
                  return e + a & 4294967295
                }
              })();
            return {
              SHA1: e,
              MD5: a,
              CRC32: function(e) {
                for (var a, i = [], n = 0; n < 256; n++) {
                  a = n;
                  for (var o = 0; o < 8; o++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
                  i[n] = a
                }
                for (var s = -1, t = 0; t < e.length; t++) s = s >>> 8 ^ i[255 & (s ^ e.charCodeAt(t))];
                return ((-1 ^ s) >>> 0).toString(16)
              },
              SHA1Object: a => e(rObject.JSONstringifyOrder(a))
            }
          })(),
          rTime = (() => {
            let e = {};
            const a = "Asia/Bangkok",
              i = (e, a) => new Date(("string" == typeof e ? new Date(e) : e).toLocaleString("en-US", {
                timeZone: a
              })),
              n = e => i(e, a),
              o = e => {
                let a = {
                  dd: e.getDate().toString().padStart(2, 0),
                  MM: (e.getMonth() + 1).toString().padStart(2, 0),
                  yyyy: e.getFullYear() + "",
                  HH: e.getHours().toString().padStart(2, 0),
                  mm: e.getMinutes().toString().padStart(2, 0),
                  ss: e.getSeconds().toString().padStart(2, 0)
                };
                return a.YY = (a.yyyy + "").substring(2, 4), a
              },
              s = e => {
                let a = o(n(e));
                return `${a.dd}/${a.MM}/${a.yyyy} ${a.HH}:${a.mm}:${a.ss}`
              },
              t = (e, a) => {
                a = a || "dd/MM/yyyy HH:mm:ss";
                let i = o(n(e));
                return Object.keys(i).forEach((e => {
                  a = a.replace(e, i[e])
                })), a
              };
            return {
              sleepSeconds: e => !e || e <= 0 ? Promise.resolve() : new Promise((a => {
                setTimeout(a, 1e3 * e)
              })),
              sleepMiliSeconds: e => !e || e <= 0 ? Promise.resolve() : new Promise((a => {
                setTimeout(a, e)
              })),
              timeZoneVN: a,
              convertTZ: i,
              toTimeZoneVN: n,
              nowVN: () => n(new Date),
              parseFormatObject: o,
              formatVN: s,
              formatVNBy: t,
              nowFormatVN: () => s(new Date),
              nowFormatVNBy: e => t(new Date, e),
              executeStart: (a = "me") => {
                e[a] = {}, e[a].start = Date.now()
              },
              executeEnd: (a = "me", i = !0) => {
                try {
                  if (a in e != !0) return `NOT FOUND executeStart(${a});`;
                  e[a].end = Date.now(), e[a].label = a, e[a].span = (e[a].end - e[a].start) / 1e3;
                  let n = `${a}: ${e[a].span} (s)`;
                  return i && console.log(n), n
                } catch (e) {
                  return console.error("rTime.executeEnd:::", e), e
                } finally {
                  e[a] = void 0
                }
              },
              toDaysMinutesSeconds: (e = 0) => {
                function a(e, a) {
                  return e > 0 ? e + (1 === e ? ` ${a}, ` : ` ${a}s, `) : ""
                }
                const i = Math.floor(e % 60),
                  n = Math.floor(e % 3600 / 60),
                  o = Math.floor(e % 86400 / 3600),
                  s = Math.floor(e / 86400),
                  t = a(i, "second"),
                  r = a(n, "minute"),
                  c = a(o, "hour");
                return `${a(s,"day")}${c}${r}${t}`.replace(/,\s*$/, "")
              },
              addDays: (e, a) => {
                var i = new Date(e);
                return i.setDate(i.getDate() + a), i
              }
            }
          })(),
          rFetch = (() => {
            const e = e => {
                rString.isURL(e) && (e = {
                  url: e
                }), rType.IsStringNotEmpty(e) && (e = {
                  url: e
                });
                var {
                  auth: a,
                  data: i,
                  basic_token: n,
                  access_token: o
                } = e;
                rType.IsStringNotEmpty(n) && (a = `Basic ${rRunTime.toBase64(":"+n)}`), rType.IsStringNotEmpty(o) && (a = `Bearer ${o}`);
                var s = {
                  method: "GET",
                  url: "",
                  headers: {},
                  mode: "cors",
                  cache: "no-cache",
                  credentials: "same-origin",
                  redirect: "follow",
                  referrerPolicy: "no-referrer",
                  muteHttpExceptions: !0,
                  ...e
                };
                "" === rObject.GetValueByPathForceString(s, "headers.content-type") && (s.headers["content-type"] = "application/json");
                let t = (s.url + "").toLowerCase();
                switch (!0) {
                  case t.startsWith("https://api.heroku.com"):
                    s.headers.Accept = "application/vnd.heroku+json; version=3";
                    break;
                  case t.startsWith("https://api.github.com"):
                    s.headers.Accept = "application/vnd.github.v3+json";
                    break;
                  case t.startsWith("https://api.ngrok.com"):
                    s.headers["Ngrok-Version"] = 2
                }
                if ("string" == typeof a && "" !== a && (s.headers.Authorization = a), rType.IsNotNull(i) && "rawBody" in s != !0) {
                  !0 === (() => {
                    let e = ["content-type", "contenttype"];
                    for (let a = 0; a < e.length; a++)
                      if (rObject.GetValueByPathForceString(s, `headers.${e[a]}`).toLowerCase().includes("application/x-www-form-urlencoded")) return !0;
                    return !1
                  })() || "undefined" != typeof FormData && i instanceof FormData || rRunTime.ON === rON.NODEJS && !0 === rType.IsObjectNotEmpty(i) ? s[rRunTime.getFieldNameOfBodyFetch()] = i : s[rRunTime.getFieldNameOfBodyFetch()] = JSON.stringify(i)
                }
                return "rawBody" in s && (s[rRunTime.getFieldNameOfBodyFetch()] = s.rawBody), s
              },
              a = (a, i = "", n = "same-origin", o = "cors", s = !1) => {
                let t = e(a);
                return rType.IsStringNotEmpty(i) && (t.method = i), rType.IsStringNotEmpty(n) && (t.credentials = n), rType.IsStringNotEmpty(o) && (t.mode = o), !0 === s && (t.validateStatus = e => !0), t
              },
              i = async a => {
                try {
                  let i = e(a);
                  return await rRunTime.doFetch(i)
                } catch (e) {
                  throw e
                }
              }, n = async e => {
                try {
                  switch (rRunTime.ON) {
                    case rON.GSSCRIPT:
                      return JSON.parse(i(e).getContentText());
                    case rON.CHROMEEX:
                    case rON.NODEJS:
                      let a = await i(e);
                      return rRunTime.ON === rON.CHROMEEX ? await a.json() : a.data
                  }
                } catch (e) {
                  throw e
                }
              };
            class ApiFetch {
              constructor(e = "same-origin", o = "cors", s = !1) {
                this.credentials = e, this.mode = o, this.validateStatusForce = s, this.Res = async e => {
                  try {
                    return await i(a(e, "", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.Json = async e => {
                  try {
                    return await n(a(e, "", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.Get = async e => {
                  try {
                    return await n(a(e, "GET", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.Post = async e => {
                  try {
                    return await n(a(e, "POST", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.Patch = async e => {
                  try {
                    return await n(a(e, "PATCH", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.Put = async e => {
                  try {
                    return await n(a(e, "PUT", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.Delete = async e => {
                  try {
                    return await n(a(e, "DELETE", this.credentials, this.mode, this.validateStatusForce))
                  } catch (e) {
                    throw e
                  }
                }, this.PageSource = {
                  parseBetweenForceEmptyWithoutTrim: async (e, n, o) => {
                    let s = await i(a({
                      url: e
                    }, "", this.credentials, this.mode)).then((e => e.text()));
                    return Promise.resolve(rJS.String.parseBetweenForceEmptyWithoutTrim(n, o, s))
                  }
                }
              }
            }
            const o = {
                Include: new ApiFetch("include"),
                Omit: new ApiFetch("omit"),
                IncludeNoCors: new ApiFetch("include", "no-cors"),
                OmitNoCors: new ApiFetch("omit", "no-cors")
              },
              s = new ApiFetch("", "", !0);
            return {
              ...new ApiFetch,
              ChromeEx: o,
              Force: s,
              setAxios: e => {
                rRunTime.setAxios(e)
              },
              getPublicIP: async () => {
                let e = ["https://api.ipify.org/", "https://ident.me/", "https://api.myip.com/", "https://ifconfig.co/ip"];
                const a = async (e = "") => {
                  try {
                    let a = rString.extractIPAddressFirst(await i({
                      url: e
                    }).then((e => e.text())));
                    if (rType.IsStringNotEmpty(a)) return a;
                    throw new Error("Empty IP")
                  } catch (e) {
                    throw e
                  }
                };
                let n = [];
                for (let i = 0; i < e.length; i++) n.push(a(e[i]));
                return Promise.any(n).then((e => e)).catch((e => ""))
              },
              gsFetch: a => {
                try {
                  a = e(a);
                  let i = UrlFetchApp.fetch(a.url, a);
                  try {
                    return JSON.parse(i.getContentText())
                  } catch {
                    return i.getContentText()
                  }
                } catch (e) {
                  throw e
                }
              }
            }
          })(),
          rChromeEx = {
            AT: {
              CONTENT: "CONTENT",
              BACKGROUND: "BACKGROUND"
            },
            sendMessage: (e, a) => chrome.runtime.sendMessage("", {
              pathObject: e,
              executeArgs: a
            }, {}),
            executeMessage: (e, a, i) => {
              let n = rObject.GetValueByPathForceString(a, "pathObject"),
                o = rObject.GetValueByPath(e, n);
              if (!1 === rType.IsFunction(o))
                for (; n.includes(".");) {
                  let a = n.split(".");
                  if (a.shift(), n = a.join("."), o = rObject.GetValueByPath(e, n), !0 === rType.IsFunction(o)) break
                }
              if (o) {
                let e = rObject.GetValueByPathForceString(a, "executeArgs.senderPath").replace("sender.", "");
                return rType.IsStringNotEmpty(e) && (a.executeArgs = rObject.GetValueByPath(i, e)), o(a.executeArgs)
              }
            },
            sendBGEvent: (e, a) => chrome.runtime.sendMessage("", {
              BGEvent: !0,
              event: e,
              objData: a
            }, {}),
            BGEvent: {
              CHECK_CHROME_VERSION: "CHECK_CHROME_VERSION",
              CURRENT_GOOGLE_ACCOUNT: "CURRENT_GOOGLE_ACCOUNT",
              LOGIN_SUCCESSED_DEVAZURECOM: "LOGIN_SUCCESSED_DEVAZURECOM",
              LOGIN_SUCCESSED_GITLABCOM: "LOGIN_SUCCESSED_GITLABCOM",
              TERMS_GITLABCOM: "TERMS_GITLABCOM",
              LOGIN_SUCCESSED_BITBUCKETORG: "LOGIN_SUCCESSED_BITBUCKETORG",
              LOGIN_SUCCESSED_NGROKCOM: "LOGIN_SUCCESSED_NGROKCOM",
              LOGIN_SUCCESSED_MICROSOFTACCOUNT: "LOGIN_SUCCESSED_MICROSOFTACCOUNT"
            }
          },
          rRtdb = {
            encodeKey: function(e) {
              return (e += "").replace(/\%/g, "~25~").replace(/\./g, "~2E~").replace(/\#/g, "~23~").replace(/\$/g, "~24~").replace(/\//g, "~2F~").replace(/\[/g, "~5B~").replace(/\]/g, "~5D~").replace(/\s/g, "~20~")
            },
            decodeKey: function(e) {
              return (e += "").replace(/\~25~/g, "%").replace(/\~2E~/g, ".").replace(/\~23~/g, "#").replace(/\~24~/g, "$").replace(/\~2F~/g, "/").replace(/\~5B~/g, "[").replace(/\~5D~/g, "]").replace(/\~20~/g, " ")
            }
          };
        class TaskResult {
          constructor({
            name: e = "",
            status: a = !1,
            input: i = {}
          } = {}, n = {}, o = []) {
            this.name = "✅-" + (e || ""), this.status = a || !1, this.input = i || {}, this.output = n || {}, this.errors = o || []
          }
          handleError(e, a = !0) {
            return this.status = !1, !0 === a && console.error(`🆘[${this.name}]: ${e+""}`), this.errors.push(e), this
          }
        }
        const rKiwi = {
            IsCURByBrowserStack: (e = {}) => {
              let a = rObject.GetValueByPathForceString(e, "email");
              return !0 === a.startsWith("i23.") || !0 === a.startsWith("dhmabv") || a.startsWith("dh0") || a.startsWith("dh1") || a.startsWith("dh2") || a.startsWith("dh3")
            }
          },
          rONNODE = (() => {
            const e = "buildwpversion";
            return {
              initializeENVWebpack: () => {
                rJS.Object.SetValueByPath(process.env, e, process.env.BUILDWPVERSION)
              },
              ENKeyENVPath: e
            }
          })();
        var rJS = {
          ChromeEx: rChromeEx,
          ON: rON,
          RunTime: rRunTime,
          Type: rType,
          String: rString,
          Object: rObject,
          Array: rArray,
          Hash: rHash,
          Time: rTime,
          Fetch: rFetch,
          Rtdb: rRtdb,
          TaskResult,
          KiwiEnum: rKiwiEnum,
          Kiwi: rKiwi,
          ONNODE: rONNODE
        };
        module.exports = rJS
      },
      6096: (e, a, i) => {
        const n = i(7147),
          o = i(1017),
          s = i(878);
        var t = i(6113),
          r = i(2037),
          c = i(2081);
        const p = (() => {
            var e = function(a, i, s) {
              try {
                var t = n.existsSync(a),
                  r = t && n.statSync(a),
                  c = t && r.isDirectory();
                !0 === (() => {
                  if (!(Array.isArray(s) && s.length > 0)) return !0;
                  let e = o.resolve(a + "").toLowerCase();
                  return -1 === s.findIndex((a => (a = o.resolve(a).toLowerCase(), e.startsWith(a))))
                })() && (c ? (!1 === n.existsSync(i) && n.mkdirSync(i, {
                  recursive: !0
                }), n.readdirSync(a).forEach((function(n) {
                  let t = o.join(a, n),
                    r = o.join(i, n);
                  e(t, r, s)
                }))) : n.copyFileSync(a, i))
              } catch (e) {
                throw console.error({
                  src: a,
                  dest: i,
                  srcPathExcludes: s,
                  error: e
                }), e
              }
            };
            const a = async (e, {
              arrIgnoreNames: i = [],
              arrExtensions: t = [],
              arrIgnoreExtensions: r = [],
              arrFileNames: c = [],
              arrIgnoreStartwithNames: p = []
            } = {}) => {
              let l = [];
              const u = n.readdirSync(e, {
                withFileTypes: !0
              });
              for (const n of u) {
                let u = !(Array.isArray(i) && i.includes(n.name));
                if (!0 === u && Array.isArray(p))
                  for (let e = 0; e < p.length; e++) {
                    let a = p[e];
                    if (!0 === n.name.startsWith(a)) {
                      u = !1;
                      break
                    }
                  }
                if (!0 === u) {
                  let u = o.join(e, n.name);
                  if (n.isDirectory()) l = [...l, ...await a(`${u}`, {
                    arrIgnoreNames: i,
                    arrExtensions: t,
                    arrIgnoreExtensions: r,
                    arrFileNames: c,
                    arrIgnoreStartwithNames: p
                  })];
                  else {
                    let e = s.String.getFileExtension(n.name),
                      a = !0;
                    a && s.Type.IsArrayNotEmpty(t) && !1 === t.includes(e) && (a = !1), a && s.Type.IsArrayNotEmpty(r) && !0 === r.includes(e) && (a = !1), a && s.Type.IsArrayNotEmpty(c) && !1 === c.includes(n.name) && (a = !1), a && l.push(`${u}`)
                  }
                }
              }
              return l
            };
            return {
              copyRecursiveSync: e,
              getAllFiles: a,
              chooseFirstExistPath: (...e) => {
                for (const a of e)
                  if (s.Type.IsArrayNotEmpty(a)) {
                    for (let e = 0; e < a.length; e++)
                      if (n.existsSync(a[e])) return a[e]
                  } else if (n.existsSync(a)) return a;
                return ""
              },
              removeOldFiles: async (e = "", a = 1) => {
                !0 === n.existsSync(e) && (a < 1 || n.readdirSync(e).forEach((i => {
                  let s = o.join(e, i),
                    t = 60 * a * 1e3;
                  try {
                    let e = n.statSync(s),
                      a = e.ctime < Date.now() - t;
                    !0 !== a && (a = 0 === e.size), !0 === a && n.rmSync(s, {
                      force: !0
                    })
                  } catch (e) {}
                })))
              },
              hashDir: async (e, {
                arrIgnoreNames: i = [],
                arrExtensions: n = [],
                arrIgnoreExtensions: s = [],
                arrFileNames: t = [],
                arrIgnoreStartwithNames: r = []
              } = {}) => {
                try {
                  let c = await a(e, {
                      arrIgnoreNames: i,
                      arrExtensions: n,
                      arrIgnoreExtensions: s,
                      arrFileNames: t,
                      arrIgnoreStartwithNames: r
                    }),
                    p = {
                      hash: "",
                      count: c.length,
                      details: []
                    };
                  for (let a = 0; a < c.length; a++) {
                    let i = o.relative(e, c[a]),
                      n = await m.hashMd5File(c[a]);
                    p.details.push(`${i}:${n}`)
                  }
                  return p.details.sort(), p.hash = m.hashMd5(JSON.stringify(p)), p
                } catch (e) {
                  throw e
                }
              }
            }
          })(),
          l = (() => {
            const e = {
                encoding: "utf8"
              },
              a = a => n.readFileSync(a, e),
              i = (a, i) => n.writeFileSync(a, i, e),
              o = (e, a = {}) => {
                try {
                  let i = l.readFileSync(e);
                  Object.keys(a).forEach((e => {
                    i = s.String.replaceAllByEscapeRegExp(i, e, a[e])
                  })), l.writeFileSync(e, i)
                } catch (e) {
                  throw e
                }
              };
            return {
              readFileSync: a,
              writeFileSync: i,
              appendFileSync: (a, i) => n.appendFileSync(a, i, e),
              saveEnvProperty: (e, o, s) => {
                let t = (o + "=").toLowerCase();
                `${o}=${s}`.toLowerCase().replace(/\s/g, "");
                try {
                  if (!0 !== n.existsSync(e)) return;
                  let r = a(e).split(/\r?\n/) || [];
                  for (let e = 0; e < r.length; e++) {
                    r[e].toLowerCase().replace(/\s/g, "").startsWith(t) && (r[e] = "# " + r[e])
                  }
                  r.push(`${o}=${s}`), i(e, r.join("\n")), console.log(r)
                } catch (e) {
                  throw e
                }
              },
              replaceInFile: o,
              replaceInFile_process_argv_1: (e = {}) => {
                o(process.argv[1], e)
              },
              writeFileSyncByObject: (e, a) => i(e, JSON.stringify(a, null, 2)),
              readJsonFileSync: a => JSON.parse(n.readFileSync(a, e))
            }
          })();
        class VerifyPath {
          static type = {
            isAbsolute: "isAbsolute",
            existsSync: "existsSync",
            isDirectory: "isDirectory",
            isFile: "isFile"
          };
          constructor(e = []) {
            this.dirPaths = e, this.type = VerifyPath.type
          }
          listDirs() {
            return this.dirPaths.join(";")
          }
          verify(e = "", a = VerifyPath.type.existsSync) {
            const i = (e, a) => {
              try {
                return "isDirectory" === a || "isFile" === a ? n.statSync(e)[a]() : o[a](e)
              } catch (e) {
                return !1
              }
            };
            if ("" === e) return "";
            if (i(e, a)) return o.resolve(e);
            for (let n = 0; n < this.dirPaths.length; n++) {
              let s = o.join(this.dirPaths[n], e);
              if (i(s, a)) return o.resolve(s)
            }
            return ""
          }
          verifyIsFile(e = "") {
            return this.verify(e, VerifyPath.type.isFile)
          }
          verifyIsDirectory(e = "") {
            return this.verify(e, VerifyPath.type.isDirectory)
          }
          verifyExistsSync(e = "") {
            return this.verify(e, VerifyPath.type.existsSync)
          }
          verifyIsAbsolute(e = "") {
            return this.verify(e, VerifyPath.type.isAbsolute)
          }
        }
        const u = (() => {
            const e = e => {
              let a = e.match(/--[a-z0-9]+=/gi);
              if (null == a || 0 === a.length) return {};
              let i = {};
              return a.forEach((a => {
                e.includes(a) && (i[a.replace("--", "").replace("=", "").toLowerCase()] = e.split(a)[1])
              })), Object.keys(i).forEach((e => {
                let a = i[e] + "",
                  n = a.match(/\s--[a-z0-9_]+=/i);
                null !== n && (a = a.substring(0, n.index)), i[e] = a.trimEnd().trimStart()
              })), i.optionfile = i.optionfile || "", i
            };
            return ({
              executeAbsolutePath: a = "",
              extensionOptionFile: i = ".option.json",
              directoryPathVerifyPath: t = [],
              process_argv: r = [],
              optionfile: c = ""
            } = {}) => {
              !1 === i.startsWith(".") && (i = `.${i}`);
              let p = {
                ArgsCommand: e(r.slice(2).join(" ")) || {},
                VerifyPath: new VerifyPath(t)
              };
              p.__filename = p.VerifyPath.verifyIsFile(p.ArgsCommand.optionfile || ""), !1 === n.existsSync(p.__filename) && n.existsSync(c) && (p.__filename = c);
              const l = `${o.parse(a).base}${i}`,
                u = `ERROR: OPTION FILE NOT FOUND: ${p.ArgsCommand.optionfile}\n   ==>Resolve: 1. Path in args --optionfile (or empty --optionfile to resolve by 2.)\n               2. Name:${l} in (${p.VerifyPath.listDirs()})`,
                m = () => (s.Type.IsObjectNotEmpty(p.ArgsCommand) && Object.keys(p.ArgsCommand).forEach((e => {
                  p[e] = p.ArgsCommand[e]
                })), p);
              if ("" === p.__filename) {
                if (s.Type.IsStringNotEmpty(p.ArgsCommand.optionfile)) return console.warn(u), m();
                if (p.__filename = p.VerifyPath.verifyIsFile(l), "" === p.__filename) return console.warn(u), m()
              }
              return n.existsSync(p.__filename) && (p = {
                ...p,
                ...JSON.parse(n.readFileSync(p.__filename, {
                  encoding: "utf-8"
                }))
              }), m()
            }
          })(),
          m = {
            hashSha1: e => t.createHash("sha1").update(e).digest("hex"),
            sign: (e, a, i = "RSA-SHA1", n = "base64") => {
              try {
                let o = t.createSign(i || "RSA-SHA1");
                return o.update(e), o.sign(a, n || "base64")
              } catch (e) {
                throw e
              }
            },
            verify: (e, a, i, n = "RSA-SHA1", o = "base64") => {
              try {
                let s = t.createVerify(n || "RSA-SHA1");
                return s.update(e), s.verify(a, i, o || "base64")
              } catch (e) {
                throw e
              }
            },
            Enum: {
              algorithm: {
                RSAMD5: "RSA-MD5",
                RSASHA1: "RSA-SHA1",
                RSASHA256: "RSA-SHA256",
                RSASHA512: "RSA-SHA512"
              },
              outputFormat: {
                base64: "base64",
                hex: "hex"
              }
            },
            hashMd5: e => t.createHash("md5").update(e, "utf8").digest("hex"),
            hashMd5File: async e => !0 !== n.existsSync(e) ? "" : new Promise(((a, i) => {
              const o = t.createHash("md5"),
                s = n.createReadStream(e);
              s.on("data", (e => {
                o.update(e)
              })), s.on("end", (() => {
                a(o.digest("hex"))
              }))
            })),
            hashSha1File: async e => !0 !== n.existsSync(e) ? "" : new Promise(((a, i) => {
              const o = t.createHash("sha1"),
                s = n.createReadStream(e);
              s.on("data", (e => {
                o.update(e)
              })), s.on("end", (() => {
                a(o.digest("hex"))
              }))
            }))
          };
        const d = (() => {
            let e;
            const a = async (e, a = [], i) => {
              let {
                stdout: n = [],
                stderr: o = []
              } = {};
              try {
                return new Promise(((s, t) => {
                  let r = c.spawn(e, a, i);
                  r.stdout.on("data", (e => {
                    n.push(e.toString().replace(/(\r\n|\n|\r)/gm, ""))
                  })), r.stderr.on("data", (e => {
                    o.push(e.toString().replace(/(\r\n|\n|\r)/gm, ""))
                  })), r.on("close", (function(t) {
                    s({
                      stdout: n,
                      stderr: o,
                      code: t,
                      command: e,
                      args: a,
                      options: i,
                      hasCode0: 0 === t
                    })
                  }))
                }))
              } catch (e) {
                throw e
              }
            }, i = e => a("win32" === process.platform ? "powershell.exe" : "pwsh", ["-Command", e]);
            return {
              spawn: a,
              spawnPSScript: i,
              getLibraryFile: async e => {
                let a = await i(`\n$ErrorActionPreference = 'SilentlyContinue'\n\n$pathLibrary = '${e}'\n[System.IO.FileInfo]$infoFile = New-Object System.IO.FileInfo($pathLibrary);\n\n$fileBytes=[System.IO.File]::ReadAllBytes($pathLibrary)\n$assembly = [System.Reflection.Assembly]::Load($fileBytes)\n$assemblyGetName = $assembly.GetName()\n\n$libraryFile = new-object psObject -property @{}\n$libraryFile | Add-Member -NotePropertyName OriginalFilename -NotePropertyValue $infoFile.Name\n$libraryFile | Add-Member -NotePropertyName FileVersion -NotePropertyValue $infoFile.VersionInfo.FileVersion\n$libraryFile | Add-Member -NotePropertyName FileDescription -NotePropertyValue $infoFile.VersionInfo.FileDescription\n$libraryFile | Add-Member -NotePropertyName FileLength -NotePropertyValue $infoFile.Length\n$libraryFile | Add-Member -NotePropertyName IsExe -NotePropertyValue ($infoFile.Name -match '.exe$')\n\n$libraryFile | Add-Member -NotePropertyName FileHashMD5 -NotePropertyValue ((Get-FileHash -InputStream  ([System.IO.MemoryStream]::New($fileBytes)) -Algorithm MD5).hash)\n$libraryFile | Add-Member -NotePropertyName FileHashSHA1 -NotePropertyValue ((Get-FileHash -InputStream  ([System.IO.MemoryStream]::New($fileBytes)) -Algorithm SHA1).hash)\ntry{\n   $libraryFile | Add-Member -NotePropertyName AssemblyFullName -NotePropertyValue $assembly.FullName\n   \n   $libraryFile | Add-Member -NotePropertyName AssemblyFullNameMD5 -NotePropertyValue ((Get-FileHash -Algorithm MD5 -InputStream ([System.IO.MemoryStream]::New([System.Text.Encoding]::ASCII.GetBytes($assembly.FullName)))).hash)\n   $libraryFile | Add-Member -NotePropertyName AssemblyFullNameSHA1 -NotePropertyValue ((Get-FileHash -Algorithm SHA1 -InputStream ([System.IO.MemoryStream]::New([System.Text.Encoding]::ASCII.GetBytes($assembly.FullName)))).hash)\n\n   $libraryFile | Add-Member -NotePropertyName AssemblyName -NotePropertyValue $assemblyGetName.Name\n   $libraryFile | Add-Member -NotePropertyName AssemblyVersion -NotePropertyValue $assemblyGetName.Version.ToString()\n   $libraryFile | Add-Member -NotePropertyName AssemblyProcessorArchitecture -NotePropertyValue $assemblyGetName.ProcessorArchitecture.ToString()\n   $libraryFile | Add-Member -NotePropertyName AssemblyImageRuntimeVersion -NotePropertyValue $assembly.ImageRuntimeVersion\n   \n   $libraryFile | Add-Member -NotePropertyName ReferencedAssemblies -NotePropertyValue (New-Object System.Collections.Generic.List[string])\n   Foreach ($asm in $assembly.GetReferencedAssemblies()) {\n      $asmFullname = $asm.ToString().ToLower()\n      $assemblySYSTEM = $asmFullname.StartsWith("mscorlib,".ToLower())\n      $assemblySYSTEM = $assemblySYSTEM -or $asmFullname.StartsWith("WindowsBase,".ToLower())\n      $assemblySYSTEM = $assemblySYSTEM -or $asmFullname.StartsWith("System,".ToLower())\n      $assemblySYSTEM = $assemblySYSTEM -or $asmFullname.StartsWith("System.".ToLower())\n      if ($assemblySYSTEM -eq $false) {\n         $libraryFile.ReferencedAssemblies.Add($asm.FullName.ToString())\n      }\n   }\n}\ncatch {\n}\n$libraryFile | ConvertTo-Json\n#$Text = ($libraryFile | ConvertTo-Json)\n#$Bytes = [System.Text.Encoding]::UTF8.GetBytes($Text)\n#$EncodedText = [Convert]::ToBase64String($Bytes)\n#$EncodedText\n   `);
                if (s.Type.IsArrayNotEmpty(a.stdout)) try {
                  let e;
                  try {
                    e = JSON.parse(a.stdout.join(""))
                  } catch (e) {
                    console.error('JSON.parse(spawnResult.stdout.join(""))'), console.error(JSON.stringify(a.stdout))
                  }
                  return e
                } catch (e) {
                  console.error(JSON.stringify(a))
                } else console.error(JSON.stringify(a))
              },
              setoCrytoJS: a => {
                e = a
              },
              spawnPSCommand: (e, i = []) => a("win32" === process.platform ? "powershell.exe" : "pwsh", ["-Command", e, ...i]),
              spawnInConsole: (e, a = [], i) => {
                console.log(`===[STARTED:${e} ${a.join(" ")}]===`);
                try {
                  return new Promise(((n, o) => {
                    let s = c.spawn(e, a, i);
                    s.stdout.on("data", (e => {
                      console.info("  ", e.toString().replace(/(\r\n|\n|\r)/gm, ""))
                    })), s.stderr.on("data", (e => {
                      console.error("  ", e.toString().replace(/(\r\n|\n|\r)/gm, ""))
                    })), s.on("close", (function(e) {
                      console.log(`===[ENDED: exitCode(${e})]===`), n(e)
                    }))
                  }))
                } catch (e) {
                  throw e
                }
              },
              spawnInBackground: (e, a = [], i = {
                hasLogFile: !0,
                outLogOpenSyncFile: void 0,
                errLogOpenSyncFile: void 0,
                removeFileMinutes: -1
              }) => {
                let {
                  logDir: t = o.join(v.jsMainDirectoryPath(), "logs")
                } = {};
                try {
                  let {
                    hasLogFile: r = !0,
                    outLogOpenSyncFile: l,
                    errLogOpenSyncFile: u,
                    outLog: m = "",
                    errLog: d = ""
                  } = i;
                  (() => {
                    if (!0 === r) {
                      !0 !== n.existsSync(t) && n.mkdirSync(t, {
                        recursive: !0
                      });
                      let e = s.Time.nowFormatVNBy("yyyy-MM-dd-HHmmss");
                      m = o.join(t, `spawnBG.out-${e}-.log`), d = o.join(t, `spawnBG.err-${e}-.log`), void 0 === l && (l = n.openSync(m, "a")), void 0 === u && (u = n.openSync(d, "a"))
                    }
                  })();
                  let x = {
                    detached: !0,
                    stdio: ["inherit", l, u]
                  };
                  const f = c.spawn(e, a, x);
                  return f.unref(), f
                } catch (e) {
                  throw e
                } finally {
                  n.existsSync(t) && p.removeOldFiles(t, i.removeFileMinutes)
                }
              }
            }
          })(),
          x = {
            createSignature: (e, a) => {
              const i = t.createSign("RSA-SHA1");
              return i.write(e), i.end(), i.sign(a, "base64")
            }
          },
          f = {
            copyString: e => {
              c.spawn("clip").stdin.end(e)
            }
          },
          v = (() => {
            const e = () => "undefined" != typeof process && s.Type.IsArrayNotEmpty(process.argv) ? process.argv[1] : "",
              a = "win32" === process.platform;
            return {
              jsMainFilePath: e,
              jsMainDirectoryPath: () => {
                let a = e();
                return s.Type.IsStringNotEmpty(a) ? o.dirname(a) : ""
              },
              runByOForever: () => "true" === s.Object.GetValueByPathForceString(s.String.parseAgrumentCommandsToObjectByProcess(), "oforever").toLowerCase(),
              isWin: a
            }
          })(),
          h = (b = i(5055), {
            AES: {
              encrypt: (e, a) => b.AES.encrypt(e, a).toString(),
              decrypt: (e, a) => b.AES.decrypt(e, a).toString(b.enc.Utf8),
              decryptForceCipher: (e, a) => {
                let i = e + "";
                try {
                  let n = b.AES.decrypt(e, a).toString(b.enc.Utf8);
                  return "" === n ? i : n
                } catch {
                  return i
                }
              }
            }
          });
        var b;
        e.exports = {
          rfs: p,
          rCrypto: m,
          VerifyPath,
          verifyExecuter: u,
          Clienter: class Clienter {
            constructor() {
              this.createAt = "", this.computerName = process.env.COMPUTERNAME, this.machineId = "", this.operatingSystem = {
                version: r.version(),
                release: r.release(),
                arch: process.arch,
                platform: process.platform
              }, this.processorModel = "", this.totalMemmory = r.totalmem(), this.nodeRuntime = {
                version: process.version,
                env: process.env
              };
              try {
                let e = r.cpus();
                this.processorModel = `${e[0].model} [:${e.length}]`
              } catch {}
              try {
                this.machineId = i(2441).machineIdSync({
                  original: !0
                })
              } catch {}
              try {
                this.createAt = s.Time.nowFormatVN()
              } catch {}
              this.machineId = this.machineId.toUpperCase()
            }
          },
          rChild_process: d,
          SignData: x,
          Clipboard: f,
          rfsUtf8: l,
          OnRunning: v,
          _LOG: (e = {}) => {
            let a = "E:/CLOUDCODE/github.com/ongtrieuhau/o-webpack/_.json";
            n.existsSync(a) && l.writeFileSyncByObject(a, e)
          },
          CryptoJS: h
        }
      },
      2211: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(32), i(8570), i(1045), i(458), function() {
          var e = n,
            a = e.lib.BlockCipher,
            i = e.algo,
            o = [],
            s = [],
            t = [],
            r = [],
            c = [],
            p = [],
            l = [],
            u = [],
            m = [],
            d = [];
          ! function() {
            for (var e = [], a = 0; a < 256; a++) e[a] = a < 128 ? a << 1 : a << 1 ^ 283;
            var i = 0,
              n = 0;
            for (a = 0; a < 256; a++) {
              var x = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
              x = x >>> 8 ^ 255 & x ^ 99, o[i] = x, s[x] = i;
              var f = e[i],
                v = e[f],
                h = e[v],
                b = 257 * e[x] ^ 16843008 * x;
              t[i] = b << 24 | b >>> 8, r[i] = b << 16 | b >>> 16, c[i] = b << 8 | b >>> 24, p[i] = b, b = 16843009 * h ^ 65537 * v ^ 257 * f ^ 16843008 * i, l[x] = b << 24 | b >>> 8, u[x] = b << 16 | b >>> 16, m[x] = b << 8 | b >>> 24, d[x] = b, i ? (i = f ^ e[e[e[h ^ f]]], n ^= e[e[n]]) : i = n = 1
            }
          }();
          var x = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
            f = i.AES = a.extend({
              _doReset: function() {
                if (!this._nRounds || this._keyPriorReset !== this._key) {
                  for (var e = this._keyPriorReset = this._key, a = e.words, i = e.sigBytes / 4, n = 4 * ((this._nRounds = i + 6) + 1), s = this._keySchedule = [], t = 0; t < n; t++) t < i ? s[t] = a[t] : (p = s[t - 1], t % i ? i > 6 && t % i == 4 && (p = o[p >>> 24] << 24 | o[p >>> 16 & 255] << 16 | o[p >>> 8 & 255] << 8 | o[255 & p]) : (p = o[(p = p << 8 | p >>> 24) >>> 24] << 24 | o[p >>> 16 & 255] << 16 | o[p >>> 8 & 255] << 8 | o[255 & p], p ^= x[t / i | 0] << 24), s[t] = s[t - i] ^ p);
                  for (var r = this._invKeySchedule = [], c = 0; c < n; c++) {
                    if (t = n - c, c % 4) var p = s[t];
                    else p = s[t - 4];
                    r[c] = c < 4 || t <= 4 ? p : l[o[p >>> 24]] ^ u[o[p >>> 16 & 255]] ^ m[o[p >>> 8 & 255]] ^ d[o[255 & p]]
                  }
                }
              },
              encryptBlock: function(e, a) {
                this._doCryptBlock(e, a, this._keySchedule, t, r, c, p, o)
              },
              decryptBlock: function(e, a) {
                var i = e[a + 1];
                e[a + 1] = e[a + 3], e[a + 3] = i, this._doCryptBlock(e, a, this._invKeySchedule, l, u, m, d, s), i = e[a + 1], e[a + 1] = e[a + 3], e[a + 3] = i
              },
              _doCryptBlock: function(e, a, i, n, o, s, t, r) {
                for (var c = this._nRounds, p = e[a] ^ i[0], l = e[a + 1] ^ i[1], u = e[a + 2] ^ i[2], m = e[a + 3] ^ i[3], d = 4, x = 1; x < c; x++) {
                  var f = n[p >>> 24] ^ o[l >>> 16 & 255] ^ s[u >>> 8 & 255] ^ t[255 & m] ^ i[d++],
                    v = n[l >>> 24] ^ o[u >>> 16 & 255] ^ s[m >>> 8 & 255] ^ t[255 & p] ^ i[d++],
                    h = n[u >>> 24] ^ o[m >>> 16 & 255] ^ s[p >>> 8 & 255] ^ t[255 & l] ^ i[d++],
                    b = n[m >>> 24] ^ o[p >>> 16 & 255] ^ s[l >>> 8 & 255] ^ t[255 & u] ^ i[d++];
                  p = f, l = v, u = h, m = b
                }
                f = (r[p >>> 24] << 24 | r[l >>> 16 & 255] << 16 | r[u >>> 8 & 255] << 8 | r[255 & m]) ^ i[d++], v = (r[l >>> 24] << 24 | r[u >>> 16 & 255] << 16 | r[m >>> 8 & 255] << 8 | r[255 & p]) ^ i[d++], h = (r[u >>> 24] << 24 | r[m >>> 16 & 255] << 16 | r[p >>> 8 & 255] << 8 | r[255 & l]) ^ i[d++], b = (r[m >>> 24] << 24 | r[p >>> 16 & 255] << 16 | r[l >>> 8 & 255] << 8 | r[255 & u]) ^ i[d++], e[a] = f, e[a + 1] = v, e[a + 2] = h, e[a + 3] = b
              },
              keySize: 8
            });
          e.AES = a._createHelper(f)
        }(), n.AES)
      },
      458: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(1045), void(n.lib.Cipher || function(e) {
          var a = n,
            i = a.lib,
            o = i.Base,
            s = i.WordArray,
            t = i.BufferedBlockAlgorithm,
            r = a.enc,
            c = (r.Utf8, r.Base64),
            p = a.algo.EvpKDF,
            l = i.Cipher = t.extend({
              cfg: o.extend(),
              createEncryptor: function(e, a) {
                return this.create(this._ENC_XFORM_MODE, e, a)
              },
              createDecryptor: function(e, a) {
                return this.create(this._DEC_XFORM_MODE, e, a)
              },
              init: function(e, a, i) {
                this.cfg = this.cfg.extend(i), this._xformMode = e, this._key = a, this.reset()
              },
              reset: function() {
                t.reset.call(this), this._doReset()
              },
              process: function(e) {
                return this._append(e), this._process()
              },
              finalize: function(e) {
                return e && this._append(e), this._doFinalize()
              },
              keySize: 4,
              ivSize: 4,
              _ENC_XFORM_MODE: 1,
              _DEC_XFORM_MODE: 2,
              _createHelper: function() {
                function e(e) {
                  return "string" == typeof e ? g : h
                }
                return function(a) {
                  return {
                    encrypt: function(i, n, o) {
                      return e(n).encrypt(a, i, n, o)
                    },
                    decrypt: function(i, n, o) {
                      return e(n).decrypt(a, i, n, o)
                    }
                  }
                }
              }()
            }),
            u = (i.StreamCipher = l.extend({
              _doFinalize: function() {
                return this._process(!0)
              },
              blockSize: 1
            }), a.mode = {}),
            m = i.BlockCipherMode = o.extend({
              createEncryptor: function(e, a) {
                return this.Encryptor.create(e, a)
              },
              createDecryptor: function(e, a) {
                return this.Decryptor.create(e, a)
              },
              init: function(e, a) {
                this._cipher = e, this._iv = a
              }
            }),
            d = u.CBC = function() {
              var a = m.extend();

              function i(a, i, n) {
                var o, s = this._iv;
                s ? (o = s, this._iv = e) : o = this._prevBlock;
                for (var t = 0; t < n; t++) a[i + t] ^= o[t]
              }
              return a.Encryptor = a.extend({
                processBlock: function(e, a) {
                  var n = this._cipher,
                    o = n.blockSize;
                  i.call(this, e, a, o), n.encryptBlock(e, a), this._prevBlock = e.slice(a, a + o)
                }
              }), a.Decryptor = a.extend({
                processBlock: function(e, a) {
                  var n = this._cipher,
                    o = n.blockSize,
                    s = e.slice(a, a + o);
                  n.decryptBlock(e, a), i.call(this, e, a, o), this._prevBlock = s
                }
              }), a
            }(),
            x = (a.pad = {}).Pkcs7 = {
              pad: function(e, a) {
                for (var i = 4 * a, n = i - e.sigBytes % i, o = n << 24 | n << 16 | n << 8 | n, t = [], r = 0; r < n; r += 4) t.push(o);
                var c = s.create(t, n);
                e.concat(c)
              },
              unpad: function(e) {
                var a = 255 & e.words[e.sigBytes - 1 >>> 2];
                e.sigBytes -= a
              }
            },
            f = (i.BlockCipher = l.extend({
              cfg: l.cfg.extend({
                mode: d,
                padding: x
              }),
              reset: function() {
                var e;
                l.reset.call(this);
                var a = this.cfg,
                  i = a.iv,
                  n = a.mode;
                this._xformMode == this._ENC_XFORM_MODE ? e = n.createEncryptor : (e = n.createDecryptor, this._minBufferSize = 1), this._mode && this._mode.__creator == e ? this._mode.init(this, i && i.words) : (this._mode = e.call(n, this, i && i.words), this._mode.__creator = e)
              },
              _doProcessBlock: function(e, a) {
                this._mode.processBlock(e, a)
              },
              _doFinalize: function() {
                var e, a = this.cfg.padding;
                return this._xformMode == this._ENC_XFORM_MODE ? (a.pad(this._data, this.blockSize), e = this._process(!0)) : (e = this._process(!0), a.unpad(e)), e
              },
              blockSize: 4
            }), i.CipherParams = o.extend({
              init: function(e) {
                this.mixIn(e)
              },
              toString: function(e) {
                return (e || this.formatter).stringify(this)
              }
            })),
            v = (a.format = {}).OpenSSL = {
              stringify: function(e) {
                var a = e.ciphertext,
                  i = e.salt;
                return (i ? s.create([1398893684, 1701076831]).concat(i).concat(a) : a).toString(c)
              },
              parse: function(e) {
                var a, i = c.parse(e),
                  n = i.words;
                return 1398893684 == n[0] && 1701076831 == n[1] && (a = s.create(n.slice(2, 4)), n.splice(0, 4), i.sigBytes -= 16), f.create({
                  ciphertext: i,
                  salt: a
                })
              }
            },
            h = i.SerializableCipher = o.extend({
              cfg: o.extend({
                format: v
              }),
              encrypt: function(e, a, i, n) {
                n = this.cfg.extend(n);
                var o = e.createEncryptor(i, n),
                  s = o.finalize(a),
                  t = o.cfg;
                return f.create({
                  ciphertext: s,
                  key: i,
                  iv: t.iv,
                  algorithm: e,
                  mode: t.mode,
                  padding: t.padding,
                  blockSize: e.blockSize,
                  formatter: n.format
                })
              },
              decrypt: function(e, a, i, n) {
                return n = this.cfg.extend(n), a = this._parse(a, n.format), e.createDecryptor(i, n).finalize(a.ciphertext)
              },
              _parse: function(e, a) {
                return "string" == typeof e ? a.parse(e, this) : e
              }
            }),
            b = (a.kdf = {}).OpenSSL = {
              execute: function(e, a, i, n) {
                n || (n = s.random(8));
                var o = p.create({
                    keySize: a + i
                  }).compute(e, n),
                  t = s.create(o.words.slice(a), 4 * i);
                return o.sigBytes = 4 * a, f.create({
                  key: o,
                  iv: t,
                  salt: n
                })
              }
            },
            g = i.PasswordBasedCipher = h.extend({
              cfg: h.cfg.extend({
                kdf: b
              }),
              encrypt: function(e, a, i, n) {
                var o = (n = this.cfg.extend(n)).kdf.execute(i, e.keySize, e.ivSize);
                n.iv = o.iv;
                var s = h.encrypt.call(this, e, a, o.key, n);
                return s.mixIn(o), s
              },
              decrypt: function(e, a, i, n) {
                n = this.cfg.extend(n), a = this._parse(a, n.format);
                var o = n.kdf.execute(i, e.keySize, e.ivSize, a.salt);
                return n.iv = o.iv, h.decrypt.call(this, e, a, o.key, n)
              }
            })
        }()))
      },
      3593: function(e, a, i) {
        var n;
        e.exports = (n = n || function(e, a) {
          var n;
          if ("undefined" != typeof window && window.crypto && (n = window.crypto), "undefined" != typeof self && self.crypto && (n = self.crypto), "undefined" != typeof globalThis && globalThis.crypto && (n = globalThis.crypto), !n && "undefined" != typeof window && window.msCrypto && (n = window.msCrypto), !n && "undefined" != typeof global && global.crypto && (n = global.crypto), !n) try {
            n = i(6113)
          } catch (e) {}
          var o = function() {
              if (n) {
                if ("function" == typeof n.getRandomValues) try {
                  return n.getRandomValues(new Uint32Array(1))[0]
                } catch (e) {}
                if ("function" == typeof n.randomBytes) try {
                  return n.randomBytes(4).readInt32LE()
                } catch (e) {}
              }
              throw new Error("Native crypto module could not be used to get secure random number.")
            },
            s = Object.create || function() {
              function e() {}
              return function(a) {
                var i;
                return e.prototype = a, i = new e, e.prototype = null, i
              }
            }(),
            t = {},
            r = t.lib = {},
            c = r.Base = {
              extend: function(e) {
                var a = s(this);
                return e && a.mixIn(e), a.hasOwnProperty("init") && this.init !== a.init || (a.init = function() {
                  a.$super.init.apply(this, arguments)
                }), a.init.prototype = a, a.$super = this, a
              },
              create: function() {
                var e = this.extend();
                return e.init.apply(e, arguments), e
              },
              init: function() {},
              mixIn: function(e) {
                for (var a in e) e.hasOwnProperty(a) && (this[a] = e[a]);
                e.hasOwnProperty("toString") && (this.toString = e.toString)
              },
              clone: function() {
                return this.init.prototype.extend(this)
              }
            },
            p = r.WordArray = c.extend({
              init: function(e, i) {
                e = this.words = e || [], this.sigBytes = i != a ? i : 4 * e.length
              },
              toString: function(e) {
                return (e || u).stringify(this)
              },
              concat: function(e) {
                var a = this.words,
                  i = e.words,
                  n = this.sigBytes,
                  o = e.sigBytes;
                if (this.clamp(), n % 4)
                  for (var s = 0; s < o; s++) {
                    var t = i[s >>> 2] >>> 24 - s % 4 * 8 & 255;
                    a[n + s >>> 2] |= t << 24 - (n + s) % 4 * 8
                  } else
                    for (var r = 0; r < o; r += 4) a[n + r >>> 2] = i[r >>> 2];
                return this.sigBytes += o, this
              },
              clamp: function() {
                var a = this.words,
                  i = this.sigBytes;
                a[i >>> 2] &= 4294967295 << 32 - i % 4 * 8, a.length = e.ceil(i / 4)
              },
              clone: function() {
                var e = c.clone.call(this);
                return e.words = this.words.slice(0), e
              },
              random: function(e) {
                for (var a = [], i = 0; i < e; i += 4) a.push(o());
                return new p.init(a, e)
              }
            }),
            l = t.enc = {},
            u = l.Hex = {
              stringify: function(e) {
                for (var a = e.words, i = e.sigBytes, n = [], o = 0; o < i; o++) {
                  var s = a[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                  n.push((s >>> 4).toString(16)), n.push((15 & s).toString(16))
                }
                return n.join("")
              },
              parse: function(e) {
                for (var a = e.length, i = [], n = 0; n < a; n += 2) i[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;
                return new p.init(i, a / 2)
              }
            },
            m = l.Latin1 = {
              stringify: function(e) {
                for (var a = e.words, i = e.sigBytes, n = [], o = 0; o < i; o++) {
                  var s = a[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                  n.push(String.fromCharCode(s))
                }
                return n.join("")
              },
              parse: function(e) {
                for (var a = e.length, i = [], n = 0; n < a; n++) i[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;
                return new p.init(i, a)
              }
            },
            d = l.Utf8 = {
              stringify: function(e) {
                try {
                  return decodeURIComponent(escape(m.stringify(e)))
                } catch (e) {
                  throw new Error("Malformed UTF-8 data")
                }
              },
              parse: function(e) {
                return m.parse(unescape(encodeURIComponent(e)))
              }
            },
            x = r.BufferedBlockAlgorithm = c.extend({
              reset: function() {
                this._data = new p.init, this._nDataBytes = 0
              },
              _append: function(e) {
                "string" == typeof e && (e = d.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
              },
              _process: function(a) {
                var i, n = this._data,
                  o = n.words,
                  s = n.sigBytes,
                  t = this.blockSize,
                  r = s / (4 * t),
                  c = (r = a ? e.ceil(r) : e.max((0 | r) - this._minBufferSize, 0)) * t,
                  l = e.min(4 * c, s);
                if (c) {
                  for (var u = 0; u < c; u += t) this._doProcessBlock(o, u);
                  i = o.splice(0, c), n.sigBytes -= l
                }
                return new p.init(i, l)
              },
              clone: function() {
                var e = c.clone.call(this);
                return e._data = this._data.clone(), e
              },
              _minBufferSize: 0
            }),
            f = (r.Hasher = x.extend({
              cfg: c.extend(),
              init: function(e) {
                this.cfg = this.cfg.extend(e), this.reset()
              },
              reset: function() {
                x.reset.call(this), this._doReset()
              },
              update: function(e) {
                return this._append(e), this._process(), this
              },
              finalize: function(e) {
                return e && this._append(e), this._doFinalize()
              },
              blockSize: 16,
              _createHelper: function(e) {
                return function(a, i) {
                  return new e.init(i).finalize(a)
                }
              },
              _createHmacHelper: function(e) {
                return function(a, i) {
                  return new f.HMAC.init(e, i).finalize(a)
                }
              }
            }), t.algo = {});
          return t
        }(Math), n)
      },
      32: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function() {
          var e = n,
            a = e.lib.WordArray;

          function i(e, i, n) {
            for (var o = [], s = 0, t = 0; t < i; t++)
              if (t % 4) {
                var r = n[e.charCodeAt(t - 1)] << t % 4 * 2 | n[e.charCodeAt(t)] >>> 6 - t % 4 * 2;
                o[s >>> 2] |= r << 24 - s % 4 * 8, s++
              } return a.create(o, s)
          }
          e.enc.Base64 = {
            stringify: function(e) {
              var a = e.words,
                i = e.sigBytes,
                n = this._map;
              e.clamp();
              for (var o = [], s = 0; s < i; s += 3)
                for (var t = (a[s >>> 2] >>> 24 - s % 4 * 8 & 255) << 16 | (a[s + 1 >>> 2] >>> 24 - (s + 1) % 4 * 8 & 255) << 8 | a[s + 2 >>> 2] >>> 24 - (s + 2) % 4 * 8 & 255, r = 0; r < 4 && s + .75 * r < i; r++) o.push(n.charAt(t >>> 6 * (3 - r) & 63));
              var c = n.charAt(64);
              if (c)
                for (; o.length % 4;) o.push(c);
              return o.join("")
            },
            parse: function(e) {
              var a = e.length,
                n = this._map,
                o = this._reverseMap;
              if (!o) {
                o = this._reverseMap = [];
                for (var s = 0; s < n.length; s++) o[n.charCodeAt(s)] = s
              }
              var t = n.charAt(64);
              if (t) {
                var r = e.indexOf(t); - 1 !== r && (a = r)
              }
              return i(e, a, o)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
          }
        }(), n.enc.Base64)
      },
      1115: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function() {
          var e = n,
            a = e.lib.WordArray;

          function i(e, i, n) {
            for (var o = [], s = 0, t = 0; t < i; t++)
              if (t % 4) {
                var r = n[e.charCodeAt(t - 1)] << t % 4 * 2 | n[e.charCodeAt(t)] >>> 6 - t % 4 * 2;
                o[s >>> 2] |= r << 24 - s % 4 * 8, s++
              } return a.create(o, s)
          }
          e.enc.Base64url = {
            stringify: function(e, a = !0) {
              var i = e.words,
                n = e.sigBytes,
                o = a ? this._safe_map : this._map;
              e.clamp();
              for (var s = [], t = 0; t < n; t += 3)
                for (var r = (i[t >>> 2] >>> 24 - t % 4 * 8 & 255) << 16 | (i[t + 1 >>> 2] >>> 24 - (t + 1) % 4 * 8 & 255) << 8 | i[t + 2 >>> 2] >>> 24 - (t + 2) % 4 * 8 & 255, c = 0; c < 4 && t + .75 * c < n; c++) s.push(o.charAt(r >>> 6 * (3 - c) & 63));
              var p = o.charAt(64);
              if (p)
                for (; s.length % 4;) s.push(p);
              return s.join("")
            },
            parse: function(e, a = !0) {
              var n = e.length,
                o = a ? this._safe_map : this._map,
                s = this._reverseMap;
              if (!s) {
                s = this._reverseMap = [];
                for (var t = 0; t < o.length; t++) s[o.charCodeAt(t)] = t
              }
              var r = o.charAt(64);
              if (r) {
                var c = e.indexOf(r); - 1 !== c && (n = c)
              }
              return i(e, n, s)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
          }
        }(), n.enc.Base64url)
      },
      9174: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function() {
          var e = n,
            a = e.lib.WordArray,
            i = e.enc;

          function o(e) {
            return e << 8 & 4278255360 | e >>> 8 & 16711935
          }
          i.Utf16 = i.Utf16BE = {
            stringify: function(e) {
              for (var a = e.words, i = e.sigBytes, n = [], o = 0; o < i; o += 2) {
                var s = a[o >>> 2] >>> 16 - o % 4 * 8 & 65535;
                n.push(String.fromCharCode(s))
              }
              return n.join("")
            },
            parse: function(e) {
              for (var i = e.length, n = [], o = 0; o < i; o++) n[o >>> 1] |= e.charCodeAt(o) << 16 - o % 2 * 16;
              return a.create(n, 2 * i)
            }
          }, i.Utf16LE = {
            stringify: function(e) {
              for (var a = e.words, i = e.sigBytes, n = [], s = 0; s < i; s += 2) {
                var t = o(a[s >>> 2] >>> 16 - s % 4 * 8 & 65535);
                n.push(String.fromCharCode(t))
              }
              return n.join("")
            },
            parse: function(e) {
              for (var i = e.length, n = [], s = 0; s < i; s++) n[s >>> 1] |= o(e.charCodeAt(s) << 16 - s % 2 * 16);
              return a.create(n, 2 * i)
            }
          }
        }(), n.enc.Utf16)
      },
      1045: function(e, a, i) {
        var n, o, s, t, r, c, p, l;
        e.exports = (l = i(3593), i(4022), i(5946), o = (n = l).lib, s = o.Base, t = o.WordArray, r = n.algo, c = r.MD5, p = r.EvpKDF = s.extend({
          cfg: s.extend({
            keySize: 4,
            hasher: c,
            iterations: 1
          }),
          init: function(e) {
            this.cfg = this.cfg.extend(e)
          },
          compute: function(e, a) {
            for (var i, n = this.cfg, o = n.hasher.create(), s = t.create(), r = s.words, c = n.keySize, p = n.iterations; r.length < c;) {
              i && o.update(i), i = o.update(e).finalize(a), o.reset();
              for (var l = 1; l < p; l++) i = o.finalize(i), o.reset();
              s.concat(i)
            }
            return s.sigBytes = 4 * c, s
          }
        }), n.EvpKDF = function(e, a, i) {
          return p.create(i).compute(e, a)
        }, l.EvpKDF)
      },
      9706: function(e, a, i) {
        var n, o, s, t;
        e.exports = (t = i(3593), i(458), o = (n = t).lib.CipherParams, s = n.enc.Hex, n.format.Hex = {
          stringify: function(e) {
            return e.ciphertext.toString(s)
          },
          parse: function(e) {
            var a = s.parse(e);
            return o.create({
              ciphertext: a
            })
          }
        }, t.format.Hex)
      },
      5946: function(e, a, i) {
        var n, o, s, t;
        e.exports = (n = i(3593), s = (o = n).lib.Base, t = o.enc.Utf8, void(o.algo.HMAC = s.extend({
          init: function(e, a) {
            e = this._hasher = new e.init, "string" == typeof a && (a = t.parse(a));
            var i = e.blockSize,
              n = 4 * i;
            a.sigBytes > n && (a = e.finalize(a)), a.clamp();
            for (var o = this._oKey = a.clone(), s = this._iKey = a.clone(), r = o.words, c = s.words, p = 0; p < i; p++) r[p] ^= 1549556828, c[p] ^= 909522486;
            o.sigBytes = s.sigBytes = n, this.reset()
          },
          reset: function() {
            var e = this._hasher;
            e.reset(), e.update(this._iKey)
          },
          update: function(e) {
            return this._hasher.update(e), this
          },
          finalize: function(e) {
            var a = this._hasher,
              i = a.finalize(e);
            return a.reset(), a.finalize(this._oKey.clone().concat(i))
          }
        })))
      },
      5055: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(8569), i(1822), i(9174), i(32), i(1115), i(8570), i(4022), i(7968), i(5634), i(3629), i(6994), i(7594), i(6894), i(5946), i(8855), i(1045), i(458), i(4216), i(7510), i(3392), i(5982), i(247), i(3408), i(1592), i(9325), i(7731), i(9891), i(9706), i(2211), i(8382), i(3484), i(3260), i(17), n)
      },
      1822: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function() {
          if ("function" == typeof ArrayBuffer) {
            var e = n.lib.WordArray,
              a = e.init,
              i = e.init = function(e) {
                if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), (e instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array) && (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)), e instanceof Uint8Array) {
                  for (var i = e.byteLength, n = [], o = 0; o < i; o++) n[o >>> 2] |= e[o] << 24 - o % 4 * 8;
                  a.call(this, n, i)
                } else a.apply(this, arguments)
              };
            i.prototype = e
          }
        }(), n.lib.WordArray)
      },
      8570: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function(e) {
          var a = n,
            i = a.lib,
            o = i.WordArray,
            s = i.Hasher,
            t = a.algo,
            r = [];
          ! function() {
            for (var a = 0; a < 64; a++) r[a] = 4294967296 * e.abs(e.sin(a + 1)) | 0
          }();
          var c = t.MD5 = s.extend({
            _doReset: function() {
              this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878])
            },
            _doProcessBlock: function(e, a) {
              for (var i = 0; i < 16; i++) {
                var n = a + i,
                  o = e[n];
                e[n] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
              }
              var s = this._hash.words,
                t = e[a + 0],
                c = e[a + 1],
                d = e[a + 2],
                x = e[a + 3],
                f = e[a + 4],
                v = e[a + 5],
                h = e[a + 6],
                b = e[a + 7],
                g = e[a + 8],
                y = e[a + 9],
                w = e[a + 10],
                _ = e[a + 11],
                k = e[a + 12],
                S = e[a + 13],
                j = e[a + 14],
                E = e[a + 15],
                A = s[0],
                O = s[1],
                N = s[2],
                T = s[3];
              A = p(A, O, N, T, t, 7, r[0]), T = p(T, A, O, N, c, 12, r[1]), N = p(N, T, A, O, d, 17, r[2]), O = p(O, N, T, A, x, 22, r[3]), A = p(A, O, N, T, f, 7, r[4]), T = p(T, A, O, N, v, 12, r[5]), N = p(N, T, A, O, h, 17, r[6]), O = p(O, N, T, A, b, 22, r[7]), A = p(A, O, N, T, g, 7, r[8]), T = p(T, A, O, N, y, 12, r[9]), N = p(N, T, A, O, w, 17, r[10]), O = p(O, N, T, A, _, 22, r[11]), A = p(A, O, N, T, k, 7, r[12]), T = p(T, A, O, N, S, 12, r[13]), N = p(N, T, A, O, j, 17, r[14]), A = l(A, O = p(O, N, T, A, E, 22, r[15]), N, T, c, 5, r[16]), T = l(T, A, O, N, h, 9, r[17]), N = l(N, T, A, O, _, 14, r[18]), O = l(O, N, T, A, t, 20, r[19]), A = l(A, O, N, T, v, 5, r[20]), T = l(T, A, O, N, w, 9, r[21]), N = l(N, T, A, O, E, 14, r[22]), O = l(O, N, T, A, f, 20, r[23]), A = l(A, O, N, T, y, 5, r[24]), T = l(T, A, O, N, j, 9, r[25]), N = l(N, T, A, O, x, 14, r[26]), O = l(O, N, T, A, g, 20, r[27]), A = l(A, O, N, T, S, 5, r[28]), T = l(T, A, O, N, d, 9, r[29]), N = l(N, T, A, O, b, 14, r[30]), A = u(A, O = l(O, N, T, A, k, 20, r[31]), N, T, v, 4, r[32]), T = u(T, A, O, N, g, 11, r[33]), N = u(N, T, A, O, _, 16, r[34]), O = u(O, N, T, A, j, 23, r[35]), A = u(A, O, N, T, c, 4, r[36]), T = u(T, A, O, N, f, 11, r[37]), N = u(N, T, A, O, b, 16, r[38]), O = u(O, N, T, A, w, 23, r[39]), A = u(A, O, N, T, S, 4, r[40]), T = u(T, A, O, N, t, 11, r[41]), N = u(N, T, A, O, x, 16, r[42]), O = u(O, N, T, A, h, 23, r[43]), A = u(A, O, N, T, y, 4, r[44]), T = u(T, A, O, N, k, 11, r[45]), N = u(N, T, A, O, E, 16, r[46]), A = m(A, O = u(O, N, T, A, d, 23, r[47]), N, T, t, 6, r[48]), T = m(T, A, O, N, b, 10, r[49]), N = m(N, T, A, O, j, 15, r[50]), O = m(O, N, T, A, v, 21, r[51]), A = m(A, O, N, T, k, 6, r[52]), T = m(T, A, O, N, x, 10, r[53]), N = m(N, T, A, O, w, 15, r[54]), O = m(O, N, T, A, c, 21, r[55]), A = m(A, O, N, T, g, 6, r[56]), T = m(T, A, O, N, E, 10, r[57]), N = m(N, T, A, O, h, 15, r[58]), O = m(O, N, T, A, S, 21, r[59]), A = m(A, O, N, T, f, 6, r[60]), T = m(T, A, O, N, _, 10, r[61]), N = m(N, T, A, O, d, 15, r[62]), O = m(O, N, T, A, y, 21, r[63]), s[0] = s[0] + A | 0, s[1] = s[1] + O | 0, s[2] = s[2] + N | 0, s[3] = s[3] + T | 0
            },
            _doFinalize: function() {
              var a = this._data,
                i = a.words,
                n = 8 * this._nDataBytes,
                o = 8 * a.sigBytes;
              i[o >>> 5] |= 128 << 24 - o % 32;
              var s = e.floor(n / 4294967296),
                t = n;
              i[15 + (o + 64 >>> 9 << 4)] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), i[14 + (o + 64 >>> 9 << 4)] = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8), a.sigBytes = 4 * (i.length + 1), this._process();
              for (var r = this._hash, c = r.words, p = 0; p < 4; p++) {
                var l = c[p];
                c[p] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
              }
              return r
            },
            clone: function() {
              var e = s.clone.call(this);
              return e._hash = this._hash.clone(), e
            }
          });

          function p(e, a, i, n, o, s, t) {
            var r = e + (a & i | ~a & n) + o + t;
            return (r << s | r >>> 32 - s) + a
          }

          function l(e, a, i, n, o, s, t) {
            var r = e + (a & n | i & ~n) + o + t;
            return (r << s | r >>> 32 - s) + a
          }

          function u(e, a, i, n, o, s, t) {
            var r = e + (a ^ i ^ n) + o + t;
            return (r << s | r >>> 32 - s) + a
          }

          function m(e, a, i, n, o, s, t) {
            var r = e + (i ^ (a | ~n)) + o + t;
            return (r << s | r >>> 32 - s) + a
          }
          a.MD5 = s._createHelper(c), a.HmacMD5 = s._createHmacHelper(c)
        }(Math), n.MD5)
      },
      4216: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.mode.CFB = function() {
          var e = n.lib.BlockCipherMode.extend();

          function a(e, a, i, n) {
            var o, s = this._iv;
            s ? (o = s.slice(0), this._iv = void 0) : o = this._prevBlock, n.encryptBlock(o, 0);
            for (var t = 0; t < i; t++) e[a + t] ^= o[t]
          }
          return e.Encryptor = e.extend({
            processBlock: function(e, i) {
              var n = this._cipher,
                o = n.blockSize;
              a.call(this, e, i, o, n), this._prevBlock = e.slice(i, i + o)
            }
          }), e.Decryptor = e.extend({
            processBlock: function(e, i) {
              var n = this._cipher,
                o = n.blockSize,
                s = e.slice(i, i + o);
              a.call(this, e, i, o, n), this._prevBlock = s
            }
          }), e
        }(), n.mode.CFB)
      },
      3392: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.mode.CTRGladman = function() {
          var e = n.lib.BlockCipherMode.extend();

          function a(e) {
            if (255 == (e >> 24 & 255)) {
              var a = e >> 16 & 255,
                i = e >> 8 & 255,
                n = 255 & e;
              255 === a ? (a = 0, 255 === i ? (i = 0, 255 === n ? n = 0 : ++n) : ++i) : ++a, e = 0, e += a << 16, e += i << 8, e += n
            } else e += 1 << 24;
            return e
          }

          function i(e) {
            return 0 === (e[0] = a(e[0])) && (e[1] = a(e[1])), e
          }
          var o = e.Encryptor = e.extend({
            processBlock: function(e, a) {
              var n = this._cipher,
                o = n.blockSize,
                s = this._iv,
                t = this._counter;
              s && (t = this._counter = s.slice(0), this._iv = void 0), i(t);
              var r = t.slice(0);
              n.encryptBlock(r, 0);
              for (var c = 0; c < o; c++) e[a + c] ^= r[c]
            }
          });
          return e.Decryptor = o, e
        }(), n.mode.CTRGladman)
      },
      7510: function(e, a, i) {
        var n, o, s;
        e.exports = (s = i(3593), i(458), s.mode.CTR = (n = s.lib.BlockCipherMode.extend(), o = n.Encryptor = n.extend({
          processBlock: function(e, a) {
            var i = this._cipher,
              n = i.blockSize,
              o = this._iv,
              s = this._counter;
            o && (s = this._counter = o.slice(0), this._iv = void 0);
            var t = s.slice(0);
            i.encryptBlock(t, 0), s[n - 1] = s[n - 1] + 1 | 0;
            for (var r = 0; r < n; r++) e[a + r] ^= t[r]
          }
        }), n.Decryptor = o, n), s.mode.CTR)
      },
      247: function(e, a, i) {
        var n, o;
        e.exports = (o = i(3593), i(458), o.mode.ECB = ((n = o.lib.BlockCipherMode.extend()).Encryptor = n.extend({
          processBlock: function(e, a) {
            this._cipher.encryptBlock(e, a)
          }
        }), n.Decryptor = n.extend({
          processBlock: function(e, a) {
            this._cipher.decryptBlock(e, a)
          }
        }), n), o.mode.ECB)
      },
      5982: function(e, a, i) {
        var n, o, s;
        e.exports = (s = i(3593), i(458), s.mode.OFB = (n = s.lib.BlockCipherMode.extend(), o = n.Encryptor = n.extend({
          processBlock: function(e, a) {
            var i = this._cipher,
              n = i.blockSize,
              o = this._iv,
              s = this._keystream;
            o && (s = this._keystream = o.slice(0), this._iv = void 0), i.encryptBlock(s, 0);
            for (var t = 0; t < n; t++) e[a + t] ^= s[t]
          }
        }), n.Decryptor = o, n), s.mode.OFB)
      },
      3408: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.pad.AnsiX923 = {
          pad: function(e, a) {
            var i = e.sigBytes,
              n = 4 * a,
              o = n - i % n,
              s = i + o - 1;
            e.clamp(), e.words[s >>> 2] |= o << 24 - s % 4 * 8, e.sigBytes += o
          },
          unpad: function(e) {
            var a = 255 & e.words[e.sigBytes - 1 >>> 2];
            e.sigBytes -= a
          }
        }, n.pad.Ansix923)
      },
      1592: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.pad.Iso10126 = {
          pad: function(e, a) {
            var i = 4 * a,
              o = i - e.sigBytes % i;
            e.concat(n.lib.WordArray.random(o - 1)).concat(n.lib.WordArray.create([o << 24], 1))
          },
          unpad: function(e) {
            var a = 255 & e.words[e.sigBytes - 1 >>> 2];
            e.sigBytes -= a
          }
        }, n.pad.Iso10126)
      },
      9325: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.pad.Iso97971 = {
          pad: function(e, a) {
            e.concat(n.lib.WordArray.create([2147483648], 1)), n.pad.ZeroPadding.pad(e, a)
          },
          unpad: function(e) {
            n.pad.ZeroPadding.unpad(e), e.sigBytes--
          }
        }, n.pad.Iso97971)
      },
      9891: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.pad.NoPadding = {
          pad: function() {},
          unpad: function() {}
        }, n.pad.NoPadding)
      },
      7731: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(458), n.pad.ZeroPadding = {
          pad: function(e, a) {
            var i = 4 * a;
            e.clamp(), e.sigBytes += i - (e.sigBytes % i || i)
          },
          unpad: function(e) {
            var a = e.words,
              i = e.sigBytes - 1;
            for (i = e.sigBytes - 1; i >= 0; i--)
              if (a[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
                e.sigBytes = i + 1;
                break
              }
          }
        }, n.pad.ZeroPadding)
      },
      8855: function(e, a, i) {
        var n, o, s, t, r, c, p, l, u;
        e.exports = (u = i(3593), i(4022), i(5946), o = (n = u).lib, s = o.Base, t = o.WordArray, r = n.algo, c = r.SHA1, p = r.HMAC, l = r.PBKDF2 = s.extend({
          cfg: s.extend({
            keySize: 4,
            hasher: c,
            iterations: 1
          }),
          init: function(e) {
            this.cfg = this.cfg.extend(e)
          },
          compute: function(e, a) {
            for (var i = this.cfg, n = p.create(i.hasher, e), o = t.create(), s = t.create([1]), r = o.words, c = s.words, l = i.keySize, u = i.iterations; r.length < l;) {
              var m = n.update(a).finalize(s);
              n.reset();
              for (var d = m.words, x = d.length, f = m, v = 1; v < u; v++) {
                f = n.finalize(f), n.reset();
                for (var h = f.words, b = 0; b < x; b++) d[b] ^= h[b]
              }
              o.concat(m), c[0]++
            }
            return o.sigBytes = 4 * l, o
          }
        }), n.PBKDF2 = function(e, a, i) {
          return l.create(i).compute(e, a)
        }, u.PBKDF2)
      },
      17: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(32), i(8570), i(1045), i(458), function() {
          var e = n,
            a = e.lib.StreamCipher,
            i = e.algo,
            o = [],
            s = [],
            t = [],
            r = i.RabbitLegacy = a.extend({
              _doReset: function() {
                var e = this._key.words,
                  a = this.cfg.iv,
                  i = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                  n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                this._b = 0;
                for (var o = 0; o < 4; o++) c.call(this);
                for (o = 0; o < 8; o++) n[o] ^= i[o + 4 & 7];
                if (a) {
                  var s = a.words,
                    t = s[0],
                    r = s[1],
                    p = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8),
                    l = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                    u = p >>> 16 | 4294901760 & l,
                    m = l << 16 | 65535 & p;
                  for (n[0] ^= p, n[1] ^= u, n[2] ^= l, n[3] ^= m, n[4] ^= p, n[5] ^= u, n[6] ^= l, n[7] ^= m, o = 0; o < 4; o++) c.call(this)
                }
              },
              _doProcessBlock: function(e, a) {
                var i = this._X;
                c.call(this), o[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, o[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, o[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, o[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                for (var n = 0; n < 4; n++) o[n] = 16711935 & (o[n] << 8 | o[n] >>> 24) | 4278255360 & (o[n] << 24 | o[n] >>> 8), e[a + n] ^= o[n]
              },
              blockSize: 4,
              ivSize: 2
            });

          function c() {
            for (var e = this._X, a = this._C, i = 0; i < 8; i++) s[i] = a[i];
            for (a[0] = a[0] + 1295307597 + this._b | 0, a[1] = a[1] + 3545052371 + (a[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0, a[2] = a[2] + 886263092 + (a[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0, a[3] = a[3] + 1295307597 + (a[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0, a[4] = a[4] + 3545052371 + (a[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0, a[5] = a[5] + 886263092 + (a[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0, a[6] = a[6] + 1295307597 + (a[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0, a[7] = a[7] + 3545052371 + (a[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0, this._b = a[7] >>> 0 < s[7] >>> 0 ? 1 : 0, i = 0; i < 8; i++) {
              var n = e[i] + a[i],
                o = 65535 & n,
                r = n >>> 16,
                c = ((o * o >>> 17) + o * r >>> 15) + r * r,
                p = ((4294901760 & n) * n | 0) + ((65535 & n) * n | 0);
              t[i] = c ^ p
            }
            e[0] = t[0] + (t[7] << 16 | t[7] >>> 16) + (t[6] << 16 | t[6] >>> 16) | 0, e[1] = t[1] + (t[0] << 8 | t[0] >>> 24) + t[7] | 0, e[2] = t[2] + (t[1] << 16 | t[1] >>> 16) + (t[0] << 16 | t[0] >>> 16) | 0, e[3] = t[3] + (t[2] << 8 | t[2] >>> 24) + t[1] | 0, e[4] = t[4] + (t[3] << 16 | t[3] >>> 16) + (t[2] << 16 | t[2] >>> 16) | 0, e[5] = t[5] + (t[4] << 8 | t[4] >>> 24) + t[3] | 0, e[6] = t[6] + (t[5] << 16 | t[5] >>> 16) + (t[4] << 16 | t[4] >>> 16) | 0, e[7] = t[7] + (t[6] << 8 | t[6] >>> 24) + t[5] | 0
          }
          e.RabbitLegacy = a._createHelper(r)
        }(), n.RabbitLegacy)
      },
      3260: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(32), i(8570), i(1045), i(458), function() {
          var e = n,
            a = e.lib.StreamCipher,
            i = e.algo,
            o = [],
            s = [],
            t = [],
            r = i.Rabbit = a.extend({
              _doReset: function() {
                for (var e = this._key.words, a = this.cfg.iv, i = 0; i < 4; i++) e[i] = 16711935 & (e[i] << 8 | e[i] >>> 24) | 4278255360 & (e[i] << 24 | e[i] >>> 8);
                var n = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                  o = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                for (this._b = 0, i = 0; i < 4; i++) c.call(this);
                for (i = 0; i < 8; i++) o[i] ^= n[i + 4 & 7];
                if (a) {
                  var s = a.words,
                    t = s[0],
                    r = s[1],
                    p = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8),
                    l = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                    u = p >>> 16 | 4294901760 & l,
                    m = l << 16 | 65535 & p;
                  for (o[0] ^= p, o[1] ^= u, o[2] ^= l, o[3] ^= m, o[4] ^= p, o[5] ^= u, o[6] ^= l, o[7] ^= m, i = 0; i < 4; i++) c.call(this)
                }
              },
              _doProcessBlock: function(e, a) {
                var i = this._X;
                c.call(this), o[0] = i[0] ^ i[5] >>> 16 ^ i[3] << 16, o[1] = i[2] ^ i[7] >>> 16 ^ i[5] << 16, o[2] = i[4] ^ i[1] >>> 16 ^ i[7] << 16, o[3] = i[6] ^ i[3] >>> 16 ^ i[1] << 16;
                for (var n = 0; n < 4; n++) o[n] = 16711935 & (o[n] << 8 | o[n] >>> 24) | 4278255360 & (o[n] << 24 | o[n] >>> 8), e[a + n] ^= o[n]
              },
              blockSize: 4,
              ivSize: 2
            });

          function c() {
            for (var e = this._X, a = this._C, i = 0; i < 8; i++) s[i] = a[i];
            for (a[0] = a[0] + 1295307597 + this._b | 0, a[1] = a[1] + 3545052371 + (a[0] >>> 0 < s[0] >>> 0 ? 1 : 0) | 0, a[2] = a[2] + 886263092 + (a[1] >>> 0 < s[1] >>> 0 ? 1 : 0) | 0, a[3] = a[3] + 1295307597 + (a[2] >>> 0 < s[2] >>> 0 ? 1 : 0) | 0, a[4] = a[4] + 3545052371 + (a[3] >>> 0 < s[3] >>> 0 ? 1 : 0) | 0, a[5] = a[5] + 886263092 + (a[4] >>> 0 < s[4] >>> 0 ? 1 : 0) | 0, a[6] = a[6] + 1295307597 + (a[5] >>> 0 < s[5] >>> 0 ? 1 : 0) | 0, a[7] = a[7] + 3545052371 + (a[6] >>> 0 < s[6] >>> 0 ? 1 : 0) | 0, this._b = a[7] >>> 0 < s[7] >>> 0 ? 1 : 0, i = 0; i < 8; i++) {
              var n = e[i] + a[i],
                o = 65535 & n,
                r = n >>> 16,
                c = ((o * o >>> 17) + o * r >>> 15) + r * r,
                p = ((4294901760 & n) * n | 0) + ((65535 & n) * n | 0);
              t[i] = c ^ p
            }
            e[0] = t[0] + (t[7] << 16 | t[7] >>> 16) + (t[6] << 16 | t[6] >>> 16) | 0, e[1] = t[1] + (t[0] << 8 | t[0] >>> 24) + t[7] | 0, e[2] = t[2] + (t[1] << 16 | t[1] >>> 16) + (t[0] << 16 | t[0] >>> 16) | 0, e[3] = t[3] + (t[2] << 8 | t[2] >>> 24) + t[1] | 0, e[4] = t[4] + (t[3] << 16 | t[3] >>> 16) + (t[2] << 16 | t[2] >>> 16) | 0, e[5] = t[5] + (t[4] << 8 | t[4] >>> 24) + t[3] | 0, e[6] = t[6] + (t[5] << 16 | t[5] >>> 16) + (t[4] << 16 | t[4] >>> 16) | 0, e[7] = t[7] + (t[6] << 8 | t[6] >>> 24) + t[5] | 0
          }
          e.Rabbit = a._createHelper(r)
        }(), n.Rabbit)
      },
      3484: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(32), i(8570), i(1045), i(458), function() {
          var e = n,
            a = e.lib.StreamCipher,
            i = e.algo,
            o = i.RC4 = a.extend({
              _doReset: function() {
                for (var e = this._key, a = e.words, i = e.sigBytes, n = this._S = [], o = 0; o < 256; o++) n[o] = o;
                o = 0;
                for (var s = 0; o < 256; o++) {
                  var t = o % i,
                    r = a[t >>> 2] >>> 24 - t % 4 * 8 & 255;
                  s = (s + n[o] + r) % 256;
                  var c = n[o];
                  n[o] = n[s], n[s] = c
                }
                this._i = this._j = 0
              },
              _doProcessBlock: function(e, a) {
                e[a] ^= s.call(this)
              },
              keySize: 8,
              ivSize: 0
            });

          function s() {
            for (var e = this._S, a = this._i, i = this._j, n = 0, o = 0; o < 4; o++) {
              i = (i + e[a = (a + 1) % 256]) % 256;
              var s = e[a];
              e[a] = e[i], e[i] = s, n |= e[(e[a] + e[i]) % 256] << 24 - 8 * o
            }
            return this._i = a, this._j = i, n
          }
          e.RC4 = a._createHelper(o);
          var t = i.RC4Drop = o.extend({
            cfg: o.cfg.extend({
              drop: 192
            }),
            _doReset: function() {
              o._doReset.call(this);
              for (var e = this.cfg.drop; e > 0; e--) s.call(this)
            }
          });
          e.RC4Drop = a._createHelper(t)
        }(), n.RC4)
      },
      6894: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function(e) {
          var a = n,
            i = a.lib,
            o = i.WordArray,
            s = i.Hasher,
            t = a.algo,
            r = o.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
            c = o.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
            p = o.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
            l = o.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
            u = o.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
            m = o.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
            d = t.RIPEMD160 = s.extend({
              _doReset: function() {
                this._hash = o.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
              },
              _doProcessBlock: function(e, a) {
                for (var i = 0; i < 16; i++) {
                  var n = a + i,
                    o = e[n];
                  e[n] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                }
                var s, t, d, y, w, _, k, S, j, E, A, O = this._hash.words,
                  N = u.words,
                  T = m.words,
                  B = r.words,
                  R = c.words,
                  F = p.words,
                  z = l.words;
                for (_ = s = O[0], k = t = O[1], S = d = O[2], j = y = O[3], E = w = O[4], i = 0; i < 80; i += 1) A = s + e[a + B[i]] | 0, A += i < 16 ? x(t, d, y) + N[0] : i < 32 ? f(t, d, y) + N[1] : i < 48 ? v(t, d, y) + N[2] : i < 64 ? h(t, d, y) + N[3] : b(t, d, y) + N[4], A = (A = g(A |= 0, F[i])) + w | 0, s = w, w = y, y = g(d, 10), d = t, t = A, A = _ + e[a + R[i]] | 0, A += i < 16 ? b(k, S, j) + T[0] : i < 32 ? h(k, S, j) + T[1] : i < 48 ? v(k, S, j) + T[2] : i < 64 ? f(k, S, j) + T[3] : x(k, S, j) + T[4], A = (A = g(A |= 0, z[i])) + E | 0, _ = E, E = j, j = g(S, 10), S = k, k = A;
                A = O[1] + d + j | 0, O[1] = O[2] + y + E | 0, O[2] = O[3] + w + _ | 0, O[3] = O[4] + s + k | 0, O[4] = O[0] + t + S | 0, O[0] = A
              },
              _doFinalize: function() {
                var e = this._data,
                  a = e.words,
                  i = 8 * this._nDataBytes,
                  n = 8 * e.sigBytes;
                a[n >>> 5] |= 128 << 24 - n % 32, a[14 + (n + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), e.sigBytes = 4 * (a.length + 1), this._process();
                for (var o = this._hash, s = o.words, t = 0; t < 5; t++) {
                  var r = s[t];
                  s[t] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8)
                }
                return o
              },
              clone: function() {
                var e = s.clone.call(this);
                return e._hash = this._hash.clone(), e
              }
            });

          function x(e, a, i) {
            return e ^ a ^ i
          }

          function f(e, a, i) {
            return e & a | ~e & i
          }

          function v(e, a, i) {
            return (e | ~a) ^ i
          }

          function h(e, a, i) {
            return e & i | a & ~i
          }

          function b(e, a, i) {
            return e ^ (a | ~i)
          }

          function g(e, a) {
            return e << a | e >>> 32 - a
          }
          a.RIPEMD160 = s._createHelper(d), a.HmacRIPEMD160 = s._createHmacHelper(d)
        }(Math), n.RIPEMD160)
      },
      4022: function(e, a, i) {
        var n, o, s, t, r, c, p, l;
        e.exports = (l = i(3593), o = (n = l).lib, s = o.WordArray, t = o.Hasher, r = n.algo, c = [], p = r.SHA1 = t.extend({
          _doReset: function() {
            this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
          },
          _doProcessBlock: function(e, a) {
            for (var i = this._hash.words, n = i[0], o = i[1], s = i[2], t = i[3], r = i[4], p = 0; p < 80; p++) {
              if (p < 16) c[p] = 0 | e[a + p];
              else {
                var l = c[p - 3] ^ c[p - 8] ^ c[p - 14] ^ c[p - 16];
                c[p] = l << 1 | l >>> 31
              }
              var u = (n << 5 | n >>> 27) + r + c[p];
              u += p < 20 ? 1518500249 + (o & s | ~o & t) : p < 40 ? 1859775393 + (o ^ s ^ t) : p < 60 ? (o & s | o & t | s & t) - 1894007588 : (o ^ s ^ t) - 899497514, r = t, t = s, s = o << 30 | o >>> 2, o = n, n = u
            }
            i[0] = i[0] + n | 0, i[1] = i[1] + o | 0, i[2] = i[2] + s | 0, i[3] = i[3] + t | 0, i[4] = i[4] + r | 0
          },
          _doFinalize: function() {
            var e = this._data,
              a = e.words,
              i = 8 * this._nDataBytes,
              n = 8 * e.sigBytes;
            return a[n >>> 5] |= 128 << 24 - n % 32, a[14 + (n + 64 >>> 9 << 4)] = Math.floor(i / 4294967296), a[15 + (n + 64 >>> 9 << 4)] = i, e.sigBytes = 4 * a.length, this._process(), this._hash
          },
          clone: function() {
            var e = t.clone.call(this);
            return e._hash = this._hash.clone(), e
          }
        }), n.SHA1 = t._createHelper(p), n.HmacSHA1 = t._createHmacHelper(p), l.SHA1)
      },
      5634: function(e, a, i) {
        var n, o, s, t, r, c;
        e.exports = (c = i(3593), i(7968), o = (n = c).lib.WordArray, s = n.algo, t = s.SHA256, r = s.SHA224 = t.extend({
          _doReset: function() {
            this._hash = new o.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
          },
          _doFinalize: function() {
            var e = t._doFinalize.call(this);
            return e.sigBytes -= 4, e
          }
        }), n.SHA224 = t._createHelper(r), n.HmacSHA224 = t._createHmacHelper(r), c.SHA224)
      },
      7968: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function(e) {
          var a = n,
            i = a.lib,
            o = i.WordArray,
            s = i.Hasher,
            t = a.algo,
            r = [],
            c = [];
          ! function() {
            function a(a) {
              for (var i = e.sqrt(a), n = 2; n <= i; n++)
                if (!(a % n)) return !1;
              return !0
            }

            function i(e) {
              return 4294967296 * (e - (0 | e)) | 0
            }
            for (var n = 2, o = 0; o < 64;) a(n) && (o < 8 && (r[o] = i(e.pow(n, .5))), c[o] = i(e.pow(n, 1 / 3)), o++), n++
          }();
          var p = [],
            l = t.SHA256 = s.extend({
              _doReset: function() {
                this._hash = new o.init(r.slice(0))
              },
              _doProcessBlock: function(e, a) {
                for (var i = this._hash.words, n = i[0], o = i[1], s = i[2], t = i[3], r = i[4], l = i[5], u = i[6], m = i[7], d = 0; d < 64; d++) {
                  if (d < 16) p[d] = 0 | e[a + d];
                  else {
                    var x = p[d - 15],
                      f = (x << 25 | x >>> 7) ^ (x << 14 | x >>> 18) ^ x >>> 3,
                      v = p[d - 2],
                      h = (v << 15 | v >>> 17) ^ (v << 13 | v >>> 19) ^ v >>> 10;
                    p[d] = f + p[d - 7] + h + p[d - 16]
                  }
                  var b = n & o ^ n & s ^ o & s,
                    g = (n << 30 | n >>> 2) ^ (n << 19 | n >>> 13) ^ (n << 10 | n >>> 22),
                    y = m + ((r << 26 | r >>> 6) ^ (r << 21 | r >>> 11) ^ (r << 7 | r >>> 25)) + (r & l ^ ~r & u) + c[d] + p[d];
                  m = u, u = l, l = r, r = t + y | 0, t = s, s = o, o = n, n = y + (g + b) | 0
                }
                i[0] = i[0] + n | 0, i[1] = i[1] + o | 0, i[2] = i[2] + s | 0, i[3] = i[3] + t | 0, i[4] = i[4] + r | 0, i[5] = i[5] + l | 0, i[6] = i[6] + u | 0, i[7] = i[7] + m | 0
              },
              _doFinalize: function() {
                var a = this._data,
                  i = a.words,
                  n = 8 * this._nDataBytes,
                  o = 8 * a.sigBytes;
                return i[o >>> 5] |= 128 << 24 - o % 32, i[14 + (o + 64 >>> 9 << 4)] = e.floor(n / 4294967296), i[15 + (o + 64 >>> 9 << 4)] = n, a.sigBytes = 4 * i.length, this._process(), this._hash
              },
              clone: function() {
                var e = s.clone.call(this);
                return e._hash = this._hash.clone(), e
              }
            });
          a.SHA256 = s._createHelper(l), a.HmacSHA256 = s._createHmacHelper(l)
        }(Math), n.SHA256)
      },
      7594: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(8569), function(e) {
          var a = n,
            i = a.lib,
            o = i.WordArray,
            s = i.Hasher,
            t = a.x64.Word,
            r = a.algo,
            c = [],
            p = [],
            l = [];
          ! function() {
            for (var e = 1, a = 0, i = 0; i < 24; i++) {
              c[e + 5 * a] = (i + 1) * (i + 2) / 2 % 64;
              var n = (2 * e + 3 * a) % 5;
              e = a % 5, a = n
            }
            for (e = 0; e < 5; e++)
              for (a = 0; a < 5; a++) p[e + 5 * a] = a + (2 * e + 3 * a) % 5 * 5;
            for (var o = 1, s = 0; s < 24; s++) {
              for (var r = 0, u = 0, m = 0; m < 7; m++) {
                if (1 & o) {
                  var d = (1 << m) - 1;
                  d < 32 ? u ^= 1 << d : r ^= 1 << d - 32
                }
                128 & o ? o = o << 1 ^ 113 : o <<= 1
              }
              l[s] = t.create(r, u)
            }
          }();
          var u = [];
          ! function() {
            for (var e = 0; e < 25; e++) u[e] = t.create()
          }();
          var m = r.SHA3 = s.extend({
            cfg: s.cfg.extend({
              outputLength: 512
            }),
            _doReset: function() {
              for (var e = this._state = [], a = 0; a < 25; a++) e[a] = new t.init;
              this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
            },
            _doProcessBlock: function(e, a) {
              for (var i = this._state, n = this.blockSize / 2, o = 0; o < n; o++) {
                var s = e[a + 2 * o],
                  t = e[a + 2 * o + 1];
                s = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8), t = 16711935 & (t << 8 | t >>> 24) | 4278255360 & (t << 24 | t >>> 8), (O = i[o]).high ^= t, O.low ^= s
              }
              for (var r = 0; r < 24; r++) {
                for (var m = 0; m < 5; m++) {
                  for (var d = 0, x = 0, f = 0; f < 5; f++) d ^= (O = i[m + 5 * f]).high, x ^= O.low;
                  var v = u[m];
                  v.high = d, v.low = x
                }
                for (m = 0; m < 5; m++) {
                  var h = u[(m + 4) % 5],
                    b = u[(m + 1) % 5],
                    g = b.high,
                    y = b.low;
                  for (d = h.high ^ (g << 1 | y >>> 31), x = h.low ^ (y << 1 | g >>> 31), f = 0; f < 5; f++)(O = i[m + 5 * f]).high ^= d, O.low ^= x
                }
                for (var w = 1; w < 25; w++) {
                  var _ = (O = i[w]).high,
                    k = O.low,
                    S = c[w];
                  S < 32 ? (d = _ << S | k >>> 32 - S, x = k << S | _ >>> 32 - S) : (d = k << S - 32 | _ >>> 64 - S, x = _ << S - 32 | k >>> 64 - S);
                  var j = u[p[w]];
                  j.high = d, j.low = x
                }
                var E = u[0],
                  A = i[0];
                for (E.high = A.high, E.low = A.low, m = 0; m < 5; m++)
                  for (f = 0; f < 5; f++) {
                    var O = i[w = m + 5 * f],
                      N = u[w],
                      T = u[(m + 1) % 5 + 5 * f],
                      B = u[(m + 2) % 5 + 5 * f];
                    O.high = N.high ^ ~T.high & B.high, O.low = N.low ^ ~T.low & B.low
                  }
                O = i[0];
                var R = l[r];
                O.high ^= R.high, O.low ^= R.low
              }
            },
            _doFinalize: function() {
              var a = this._data,
                i = a.words,
                n = (this._nDataBytes, 8 * a.sigBytes),
                s = 32 * this.blockSize;
              i[n >>> 5] |= 1 << 24 - n % 32, i[(e.ceil((n + 1) / s) * s >>> 5) - 1] |= 128, a.sigBytes = 4 * i.length, this._process();
              for (var t = this._state, r = this.cfg.outputLength / 8, c = r / 8, p = [], l = 0; l < c; l++) {
                var u = t[l],
                  m = u.high,
                  d = u.low;
                m = 16711935 & (m << 8 | m >>> 24) | 4278255360 & (m << 24 | m >>> 8), d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8), p.push(d), p.push(m)
              }
              return new o.init(p, r)
            },
            clone: function() {
              for (var e = s.clone.call(this), a = e._state = this._state.slice(0), i = 0; i < 25; i++) a[i] = a[i].clone();
              return e
            }
          });
          a.SHA3 = s._createHelper(m), a.HmacSHA3 = s._createHmacHelper(m)
        }(Math), n.SHA3)
      },
      6994: function(e, a, i) {
        var n, o, s, t, r, c, p, l;
        e.exports = (l = i(3593), i(8569), i(3629), o = (n = l).x64, s = o.Word, t = o.WordArray, r = n.algo, c = r.SHA512, p = r.SHA384 = c.extend({
          _doReset: function() {
            this._hash = new t.init([new s.init(3418070365, 3238371032), new s.init(1654270250, 914150663), new s.init(2438529370, 812702999), new s.init(355462360, 4144912697), new s.init(1731405415, 4290775857), new s.init(2394180231, 1750603025), new s.init(3675008525, 1694076839), new s.init(1203062813, 3204075428)])
          },
          _doFinalize: function() {
            var e = c._doFinalize.call(this);
            return e.sigBytes -= 16, e
          }
        }), n.SHA384 = c._createHelper(p), n.HmacSHA384 = c._createHmacHelper(p), l.SHA384)
      },
      3629: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(8569), function() {
          var e = n,
            a = e.lib.Hasher,
            i = e.x64,
            o = i.Word,
            s = i.WordArray,
            t = e.algo;

          function r() {
            return o.create.apply(o, arguments)
          }
          var c = [r(1116352408, 3609767458), r(1899447441, 602891725), r(3049323471, 3964484399), r(3921009573, 2173295548), r(961987163, 4081628472), r(1508970993, 3053834265), r(2453635748, 2937671579), r(2870763221, 3664609560), r(3624381080, 2734883394), r(310598401, 1164996542), r(607225278, 1323610764), r(1426881987, 3590304994), r(1925078388, 4068182383), r(2162078206, 991336113), r(2614888103, 633803317), r(3248222580, 3479774868), r(3835390401, 2666613458), r(4022224774, 944711139), r(264347078, 2341262773), r(604807628, 2007800933), r(770255983, 1495990901), r(1249150122, 1856431235), r(1555081692, 3175218132), r(1996064986, 2198950837), r(2554220882, 3999719339), r(2821834349, 766784016), r(2952996808, 2566594879), r(3210313671, 3203337956), r(3336571891, 1034457026), r(3584528711, 2466948901), r(113926993, 3758326383), r(338241895, 168717936), r(666307205, 1188179964), r(773529912, 1546045734), r(1294757372, 1522805485), r(1396182291, 2643833823), r(1695183700, 2343527390), r(1986661051, 1014477480), r(2177026350, 1206759142), r(2456956037, 344077627), r(2730485921, 1290863460), r(2820302411, 3158454273), r(3259730800, 3505952657), r(3345764771, 106217008), r(3516065817, 3606008344), r(3600352804, 1432725776), r(4094571909, 1467031594), r(275423344, 851169720), r(430227734, 3100823752), r(506948616, 1363258195), r(659060556, 3750685593), r(883997877, 3785050280), r(958139571, 3318307427), r(1322822218, 3812723403), r(1537002063, 2003034995), r(1747873779, 3602036899), r(1955562222, 1575990012), r(2024104815, 1125592928), r(2227730452, 2716904306), r(2361852424, 442776044), r(2428436474, 593698344), r(2756734187, 3733110249), r(3204031479, 2999351573), r(3329325298, 3815920427), r(3391569614, 3928383900), r(3515267271, 566280711), r(3940187606, 3454069534), r(4118630271, 4000239992), r(116418474, 1914138554), r(174292421, 2731055270), r(289380356, 3203993006), r(460393269, 320620315), r(685471733, 587496836), r(852142971, 1086792851), r(1017036298, 365543100), r(1126000580, 2618297676), r(1288033470, 3409855158), r(1501505948, 4234509866), r(1607167915, 987167468), r(1816402316, 1246189591)],
            p = [];
          ! function() {
            for (var e = 0; e < 80; e++) p[e] = r()
          }();
          var l = t.SHA512 = a.extend({
            _doReset: function() {
              this._hash = new s.init([new o.init(1779033703, 4089235720), new o.init(3144134277, 2227873595), new o.init(1013904242, 4271175723), new o.init(2773480762, 1595750129), new o.init(1359893119, 2917565137), new o.init(2600822924, 725511199), new o.init(528734635, 4215389547), new o.init(1541459225, 327033209)])
            },
            _doProcessBlock: function(e, a) {
              for (var i = this._hash.words, n = i[0], o = i[1], s = i[2], t = i[3], r = i[4], l = i[5], u = i[6], m = i[7], d = n.high, x = n.low, f = o.high, v = o.low, h = s.high, b = s.low, g = t.high, y = t.low, w = r.high, _ = r.low, k = l.high, S = l.low, j = u.high, E = u.low, A = m.high, O = m.low, N = d, T = x, B = f, R = v, F = h, z = b, C = g, P = y, I = w, L = _, D = k, U = S, M = j, q = E, $ = A, H = O, V = 0; V < 80; V++) {
                var G, W, J = p[V];
                if (V < 16) W = J.high = 0 | e[a + 2 * V], G = J.low = 0 | e[a + 2 * V + 1];
                else {
                  var K = p[V - 15],
                    Y = K.high,
                    X = K.low,
                    Z = (Y >>> 1 | X << 31) ^ (Y >>> 8 | X << 24) ^ Y >>> 7,
                    Q = (X >>> 1 | Y << 31) ^ (X >>> 8 | Y << 24) ^ (X >>> 7 | Y << 25),
                    ee = p[V - 2],
                    ae = ee.high,
                    ie = ee.low,
                    ne = (ae >>> 19 | ie << 13) ^ (ae << 3 | ie >>> 29) ^ ae >>> 6,
                    oe = (ie >>> 19 | ae << 13) ^ (ie << 3 | ae >>> 29) ^ (ie >>> 6 | ae << 26),
                    se = p[V - 7],
                    te = se.high,
                    re = se.low,
                    ce = p[V - 16],
                    pe = ce.high,
                    le = ce.low;
                  W = (W = (W = Z + te + ((G = Q + re) >>> 0 < Q >>> 0 ? 1 : 0)) + ne + ((G += oe) >>> 0 < oe >>> 0 ? 1 : 0)) + pe + ((G += le) >>> 0 < le >>> 0 ? 1 : 0), J.high = W, J.low = G
                }
                var ue, me = I & D ^ ~I & M,
                  de = L & U ^ ~L & q,
                  xe = N & B ^ N & F ^ B & F,
                  fe = T & R ^ T & z ^ R & z,
                  ve = (N >>> 28 | T << 4) ^ (N << 30 | T >>> 2) ^ (N << 25 | T >>> 7),
                  he = (T >>> 28 | N << 4) ^ (T << 30 | N >>> 2) ^ (T << 25 | N >>> 7),
                  be = (I >>> 14 | L << 18) ^ (I >>> 18 | L << 14) ^ (I << 23 | L >>> 9),
                  ge = (L >>> 14 | I << 18) ^ (L >>> 18 | I << 14) ^ (L << 23 | I >>> 9),
                  ye = c[V],
                  we = ye.high,
                  _e = ye.low,
                  ke = $ + be + ((ue = H + ge) >>> 0 < H >>> 0 ? 1 : 0),
                  Se = he + fe;
                $ = M, H = q, M = D, q = U, D = I, U = L, I = C + (ke = (ke = (ke = ke + me + ((ue += de) >>> 0 < de >>> 0 ? 1 : 0)) + we + ((ue += _e) >>> 0 < _e >>> 0 ? 1 : 0)) + W + ((ue += G) >>> 0 < G >>> 0 ? 1 : 0)) + ((L = P + ue | 0) >>> 0 < P >>> 0 ? 1 : 0) | 0, C = F, P = z, F = B, z = R, B = N, R = T, N = ke + (ve + xe + (Se >>> 0 < he >>> 0 ? 1 : 0)) + ((T = ue + Se | 0) >>> 0 < ue >>> 0 ? 1 : 0) | 0
              }
              x = n.low = x + T, n.high = d + N + (x >>> 0 < T >>> 0 ? 1 : 0), v = o.low = v + R, o.high = f + B + (v >>> 0 < R >>> 0 ? 1 : 0), b = s.low = b + z, s.high = h + F + (b >>> 0 < z >>> 0 ? 1 : 0), y = t.low = y + P, t.high = g + C + (y >>> 0 < P >>> 0 ? 1 : 0), _ = r.low = _ + L, r.high = w + I + (_ >>> 0 < L >>> 0 ? 1 : 0), S = l.low = S + U, l.high = k + D + (S >>> 0 < U >>> 0 ? 1 : 0), E = u.low = E + q, u.high = j + M + (E >>> 0 < q >>> 0 ? 1 : 0), O = m.low = O + H, m.high = A + $ + (O >>> 0 < H >>> 0 ? 1 : 0)
            },
            _doFinalize: function() {
              var e = this._data,
                a = e.words,
                i = 8 * this._nDataBytes,
                n = 8 * e.sigBytes;
              return a[n >>> 5] |= 128 << 24 - n % 32, a[30 + (n + 128 >>> 10 << 5)] = Math.floor(i / 4294967296), a[31 + (n + 128 >>> 10 << 5)] = i, e.sigBytes = 4 * a.length, this._process(), this._hash.toX32()
            },
            clone: function() {
              var e = a.clone.call(this);
              return e._hash = this._hash.clone(), e
            },
            blockSize: 32
          });
          e.SHA512 = a._createHelper(l), e.HmacSHA512 = a._createHmacHelper(l)
        }(), n.SHA512)
      },
      8382: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), i(32), i(8570), i(1045), i(458), function() {
          var e = n,
            a = e.lib,
            i = a.WordArray,
            o = a.BlockCipher,
            s = e.algo,
            t = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
            r = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
            c = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
            p = [{
              0: 8421888,
              268435456: 32768,
              536870912: 8421378,
              805306368: 2,
              1073741824: 512,
              1342177280: 8421890,
              1610612736: 8389122,
              1879048192: 8388608,
              2147483648: 514,
              2415919104: 8389120,
              2684354560: 33280,
              2952790016: 8421376,
              3221225472: 32770,
              3489660928: 8388610,
              3758096384: 0,
              4026531840: 33282,
              134217728: 0,
              402653184: 8421890,
              671088640: 33282,
              939524096: 32768,
              1207959552: 8421888,
              1476395008: 512,
              1744830464: 8421378,
              2013265920: 2,
              2281701376: 8389120,
              2550136832: 33280,
              2818572288: 8421376,
              3087007744: 8389122,
              3355443200: 8388610,
              3623878656: 32770,
              3892314112: 514,
              4160749568: 8388608,
              1: 32768,
              268435457: 2,
              536870913: 8421888,
              805306369: 8388608,
              1073741825: 8421378,
              1342177281: 33280,
              1610612737: 512,
              1879048193: 8389122,
              2147483649: 8421890,
              2415919105: 8421376,
              2684354561: 8388610,
              2952790017: 33282,
              3221225473: 514,
              3489660929: 8389120,
              3758096385: 32770,
              4026531841: 0,
              134217729: 8421890,
              402653185: 8421376,
              671088641: 8388608,
              939524097: 512,
              1207959553: 32768,
              1476395009: 8388610,
              1744830465: 2,
              2013265921: 33282,
              2281701377: 32770,
              2550136833: 8389122,
              2818572289: 514,
              3087007745: 8421888,
              3355443201: 8389120,
              3623878657: 0,
              3892314113: 33280,
              4160749569: 8421378
            }, {
              0: 1074282512,
              16777216: 16384,
              33554432: 524288,
              50331648: 1074266128,
              67108864: 1073741840,
              83886080: 1074282496,
              100663296: 1073758208,
              117440512: 16,
              134217728: 540672,
              150994944: 1073758224,
              167772160: 1073741824,
              184549376: 540688,
              201326592: 524304,
              218103808: 0,
              234881024: 16400,
              251658240: 1074266112,
              8388608: 1073758208,
              25165824: 540688,
              41943040: 16,
              58720256: 1073758224,
              75497472: 1074282512,
              92274688: 1073741824,
              109051904: 524288,
              125829120: 1074266128,
              142606336: 524304,
              159383552: 0,
              176160768: 16384,
              192937984: 1074266112,
              209715200: 1073741840,
              226492416: 540672,
              243269632: 1074282496,
              260046848: 16400,
              268435456: 0,
              285212672: 1074266128,
              301989888: 1073758224,
              318767104: 1074282496,
              335544320: 1074266112,
              352321536: 16,
              369098752: 540688,
              385875968: 16384,
              402653184: 16400,
              419430400: 524288,
              436207616: 524304,
              452984832: 1073741840,
              469762048: 540672,
              486539264: 1073758208,
              503316480: 1073741824,
              520093696: 1074282512,
              276824064: 540688,
              293601280: 524288,
              310378496: 1074266112,
              327155712: 16384,
              343932928: 1073758208,
              360710144: 1074282512,
              377487360: 16,
              394264576: 1073741824,
              411041792: 1074282496,
              427819008: 1073741840,
              444596224: 1073758224,
              461373440: 524304,
              478150656: 0,
              494927872: 16400,
              511705088: 1074266128,
              528482304: 540672
            }, {
              0: 260,
              1048576: 0,
              2097152: 67109120,
              3145728: 65796,
              4194304: 65540,
              5242880: 67108868,
              6291456: 67174660,
              7340032: 67174400,
              8388608: 67108864,
              9437184: 67174656,
              10485760: 65792,
              11534336: 67174404,
              12582912: 67109124,
              13631488: 65536,
              14680064: 4,
              15728640: 256,
              524288: 67174656,
              1572864: 67174404,
              2621440: 0,
              3670016: 67109120,
              4718592: 67108868,
              5767168: 65536,
              6815744: 65540,
              7864320: 260,
              8912896: 4,
              9961472: 256,
              11010048: 67174400,
              12058624: 65796,
              13107200: 65792,
              14155776: 67109124,
              15204352: 67174660,
              16252928: 67108864,
              16777216: 67174656,
              17825792: 65540,
              18874368: 65536,
              19922944: 67109120,
              20971520: 256,
              22020096: 67174660,
              23068672: 67108868,
              24117248: 0,
              25165824: 67109124,
              26214400: 67108864,
              27262976: 4,
              28311552: 65792,
              29360128: 67174400,
              30408704: 260,
              31457280: 65796,
              32505856: 67174404,
              17301504: 67108864,
              18350080: 260,
              19398656: 67174656,
              20447232: 0,
              21495808: 65540,
              22544384: 67109120,
              23592960: 256,
              24641536: 67174404,
              25690112: 65536,
              26738688: 67174660,
              27787264: 65796,
              28835840: 67108868,
              29884416: 67109124,
              30932992: 67174400,
              31981568: 4,
              33030144: 65792
            }, {
              0: 2151682048,
              65536: 2147487808,
              131072: 4198464,
              196608: 2151677952,
              262144: 0,
              327680: 4198400,
              393216: 2147483712,
              458752: 4194368,
              524288: 2147483648,
              589824: 4194304,
              655360: 64,
              720896: 2147487744,
              786432: 2151678016,
              851968: 4160,
              917504: 4096,
              983040: 2151682112,
              32768: 2147487808,
              98304: 64,
              163840: 2151678016,
              229376: 2147487744,
              294912: 4198400,
              360448: 2151682112,
              425984: 0,
              491520: 2151677952,
              557056: 4096,
              622592: 2151682048,
              688128: 4194304,
              753664: 4160,
              819200: 2147483648,
              884736: 4194368,
              950272: 4198464,
              1015808: 2147483712,
              1048576: 4194368,
              1114112: 4198400,
              1179648: 2147483712,
              1245184: 0,
              1310720: 4160,
              1376256: 2151678016,
              1441792: 2151682048,
              1507328: 2147487808,
              1572864: 2151682112,
              1638400: 2147483648,
              1703936: 2151677952,
              1769472: 4198464,
              1835008: 2147487744,
              1900544: 4194304,
              1966080: 64,
              2031616: 4096,
              1081344: 2151677952,
              1146880: 2151682112,
              1212416: 0,
              1277952: 4198400,
              1343488: 4194368,
              1409024: 2147483648,
              1474560: 2147487808,
              1540096: 64,
              1605632: 2147483712,
              1671168: 4096,
              1736704: 2147487744,
              1802240: 2151678016,
              1867776: 4160,
              1933312: 2151682048,
              1998848: 4194304,
              2064384: 4198464
            }, {
              0: 128,
              4096: 17039360,
              8192: 262144,
              12288: 536870912,
              16384: 537133184,
              20480: 16777344,
              24576: 553648256,
              28672: 262272,
              32768: 16777216,
              36864: 537133056,
              40960: 536871040,
              45056: 553910400,
              49152: 553910272,
              53248: 0,
              57344: 17039488,
              61440: 553648128,
              2048: 17039488,
              6144: 553648256,
              10240: 128,
              14336: 17039360,
              18432: 262144,
              22528: 537133184,
              26624: 553910272,
              30720: 536870912,
              34816: 537133056,
              38912: 0,
              43008: 553910400,
              47104: 16777344,
              51200: 536871040,
              55296: 553648128,
              59392: 16777216,
              63488: 262272,
              65536: 262144,
              69632: 128,
              73728: 536870912,
              77824: 553648256,
              81920: 16777344,
              86016: 553910272,
              90112: 537133184,
              94208: 16777216,
              98304: 553910400,
              102400: 553648128,
              106496: 17039360,
              110592: 537133056,
              114688: 262272,
              118784: 536871040,
              122880: 0,
              126976: 17039488,
              67584: 553648256,
              71680: 16777216,
              75776: 17039360,
              79872: 537133184,
              83968: 536870912,
              88064: 17039488,
              92160: 128,
              96256: 553910272,
              100352: 262272,
              104448: 553910400,
              108544: 0,
              112640: 553648128,
              116736: 16777344,
              120832: 262144,
              124928: 537133056,
              129024: 536871040
            }, {
              0: 268435464,
              256: 8192,
              512: 270532608,
              768: 270540808,
              1024: 268443648,
              1280: 2097152,
              1536: 2097160,
              1792: 268435456,
              2048: 0,
              2304: 268443656,
              2560: 2105344,
              2816: 8,
              3072: 270532616,
              3328: 2105352,
              3584: 8200,
              3840: 270540800,
              128: 270532608,
              384: 270540808,
              640: 8,
              896: 2097152,
              1152: 2105352,
              1408: 268435464,
              1664: 268443648,
              1920: 8200,
              2176: 2097160,
              2432: 8192,
              2688: 268443656,
              2944: 270532616,
              3200: 0,
              3456: 270540800,
              3712: 2105344,
              3968: 268435456,
              4096: 268443648,
              4352: 270532616,
              4608: 270540808,
              4864: 8200,
              5120: 2097152,
              5376: 268435456,
              5632: 268435464,
              5888: 2105344,
              6144: 2105352,
              6400: 0,
              6656: 8,
              6912: 270532608,
              7168: 8192,
              7424: 268443656,
              7680: 270540800,
              7936: 2097160,
              4224: 8,
              4480: 2105344,
              4736: 2097152,
              4992: 268435464,
              5248: 268443648,
              5504: 8200,
              5760: 270540808,
              6016: 270532608,
              6272: 270540800,
              6528: 270532616,
              6784: 8192,
              7040: 2105352,
              7296: 2097160,
              7552: 0,
              7808: 268435456,
              8064: 268443656
            }, {
              0: 1048576,
              16: 33555457,
              32: 1024,
              48: 1049601,
              64: 34604033,
              80: 0,
              96: 1,
              112: 34603009,
              128: 33555456,
              144: 1048577,
              160: 33554433,
              176: 34604032,
              192: 34603008,
              208: 1025,
              224: 1049600,
              240: 33554432,
              8: 34603009,
              24: 0,
              40: 33555457,
              56: 34604032,
              72: 1048576,
              88: 33554433,
              104: 33554432,
              120: 1025,
              136: 1049601,
              152: 33555456,
              168: 34603008,
              184: 1048577,
              200: 1024,
              216: 34604033,
              232: 1,
              248: 1049600,
              256: 33554432,
              272: 1048576,
              288: 33555457,
              304: 34603009,
              320: 1048577,
              336: 33555456,
              352: 34604032,
              368: 1049601,
              384: 1025,
              400: 34604033,
              416: 1049600,
              432: 1,
              448: 0,
              464: 34603008,
              480: 33554433,
              496: 1024,
              264: 1049600,
              280: 33555457,
              296: 34603009,
              312: 1,
              328: 33554432,
              344: 1048576,
              360: 1025,
              376: 34604032,
              392: 33554433,
              408: 34603008,
              424: 0,
              440: 34604033,
              456: 1049601,
              472: 1024,
              488: 33555456,
              504: 1048577
            }, {
              0: 134219808,
              1: 131072,
              2: 134217728,
              3: 32,
              4: 131104,
              5: 134350880,
              6: 134350848,
              7: 2048,
              8: 134348800,
              9: 134219776,
              10: 133120,
              11: 134348832,
              12: 2080,
              13: 0,
              14: 134217760,
              15: 133152,
              2147483648: 2048,
              2147483649: 134350880,
              2147483650: 134219808,
              2147483651: 134217728,
              2147483652: 134348800,
              2147483653: 133120,
              2147483654: 133152,
              2147483655: 32,
              2147483656: 134217760,
              2147483657: 2080,
              2147483658: 131104,
              2147483659: 134350848,
              2147483660: 0,
              2147483661: 134348832,
              2147483662: 134219776,
              2147483663: 131072,
              16: 133152,
              17: 134350848,
              18: 32,
              19: 2048,
              20: 134219776,
              21: 134217760,
              22: 134348832,
              23: 131072,
              24: 0,
              25: 131104,
              26: 134348800,
              27: 134219808,
              28: 134350880,
              29: 133120,
              30: 2080,
              31: 134217728,
              2147483664: 131072,
              2147483665: 2048,
              2147483666: 134348832,
              2147483667: 133152,
              2147483668: 32,
              2147483669: 134348800,
              2147483670: 134217728,
              2147483671: 134219808,
              2147483672: 134350880,
              2147483673: 134217760,
              2147483674: 134219776,
              2147483675: 0,
              2147483676: 133120,
              2147483677: 2080,
              2147483678: 131104,
              2147483679: 134350848
            }],
            l = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
            u = s.DES = o.extend({
              _doReset: function() {
                for (var e = this._key.words, a = [], i = 0; i < 56; i++) {
                  var n = t[i] - 1;
                  a[i] = e[n >>> 5] >>> 31 - n % 32 & 1
                }
                for (var o = this._subKeys = [], s = 0; s < 16; s++) {
                  var p = o[s] = [],
                    l = c[s];
                  for (i = 0; i < 24; i++) p[i / 6 | 0] |= a[(r[i] - 1 + l) % 28] << 31 - i % 6, p[4 + (i / 6 | 0)] |= a[28 + (r[i + 24] - 1 + l) % 28] << 31 - i % 6;
                  for (p[0] = p[0] << 1 | p[0] >>> 31, i = 1; i < 7; i++) p[i] = p[i] >>> 4 * (i - 1) + 3;
                  p[7] = p[7] << 5 | p[7] >>> 27
                }
                var u = this._invSubKeys = [];
                for (i = 0; i < 16; i++) u[i] = o[15 - i]
              },
              encryptBlock: function(e, a) {
                this._doCryptBlock(e, a, this._subKeys)
              },
              decryptBlock: function(e, a) {
                this._doCryptBlock(e, a, this._invSubKeys)
              },
              _doCryptBlock: function(e, a, i) {
                this._lBlock = e[a], this._rBlock = e[a + 1], m.call(this, 4, 252645135), m.call(this, 16, 65535), d.call(this, 2, 858993459), d.call(this, 8, 16711935), m.call(this, 1, 1431655765);
                for (var n = 0; n < 16; n++) {
                  for (var o = i[n], s = this._lBlock, t = this._rBlock, r = 0, c = 0; c < 8; c++) r |= p[c][((t ^ o[c]) & l[c]) >>> 0];
                  this._lBlock = t, this._rBlock = s ^ r
                }
                var u = this._lBlock;
                this._lBlock = this._rBlock, this._rBlock = u, m.call(this, 1, 1431655765), d.call(this, 8, 16711935), d.call(this, 2, 858993459), m.call(this, 16, 65535), m.call(this, 4, 252645135), e[a] = this._lBlock, e[a + 1] = this._rBlock
              },
              keySize: 2,
              ivSize: 2,
              blockSize: 2
            });

          function m(e, a) {
            var i = (this._lBlock >>> e ^ this._rBlock) & a;
            this._rBlock ^= i, this._lBlock ^= i << e
          }

          function d(e, a) {
            var i = (this._rBlock >>> e ^ this._lBlock) & a;
            this._lBlock ^= i, this._rBlock ^= i << e
          }
          e.DES = o._createHelper(u);
          var x = s.TripleDES = o.extend({
            _doReset: function() {
              var e = this._key.words;
              if (2 !== e.length && 4 !== e.length && e.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
              var a = e.slice(0, 2),
                n = e.length < 4 ? e.slice(0, 2) : e.slice(2, 4),
                o = e.length < 6 ? e.slice(0, 2) : e.slice(4, 6);
              this._des1 = u.createEncryptor(i.create(a)), this._des2 = u.createEncryptor(i.create(n)), this._des3 = u.createEncryptor(i.create(o))
            },
            encryptBlock: function(e, a) {
              this._des1.encryptBlock(e, a), this._des2.decryptBlock(e, a), this._des3.encryptBlock(e, a)
            },
            decryptBlock: function(e, a) {
              this._des3.decryptBlock(e, a), this._des2.encryptBlock(e, a), this._des1.decryptBlock(e, a)
            },
            keySize: 6,
            ivSize: 2,
            blockSize: 2
          });
          e.TripleDES = o._createHelper(x)
        }(), n.TripleDES)
      },
      8569: function(e, a, i) {
        var n;
        e.exports = (n = i(3593), function(e) {
          var a = n,
            i = a.lib,
            o = i.Base,
            s = i.WordArray,
            t = a.x64 = {};
          t.Word = o.extend({
            init: function(e, a) {
              this.high = e, this.low = a
            }
          }), t.WordArray = o.extend({
            init: function(a, i) {
              a = this.words = a || [], this.sigBytes = i != e ? i : 8 * a.length
            },
            toX32: function() {
              for (var e = this.words, a = e.length, i = [], n = 0; n < a; n++) {
                var o = e[n];
                i.push(o.high), i.push(o.low)
              }
              return s.create(i, this.sigBytes)
            },
            clone: function() {
              for (var e = o.clone.call(this), a = e.words = this.words.slice(0), i = a.length, n = 0; n < i; n++) a[n] = a[n].clone();
              return e
            }
          })
        }(), n)
      },
      4008: (e, a, i) => {
        e.exports = {
          parallel: i(4944),
          serial: i(9260),
          serialOrdered: i(4487)
        }
      },
      3610: e => {
        function a(e) {
          "function" == typeof this.jobs[e] && this.jobs[e]()
        }
        e.exports = function(e) {
          Object.keys(e.jobs).forEach(a.bind(e)), e.jobs = {}
        }
      },
      403: (e, a, i) => {
        var n = i(6335);
        e.exports = function(e) {
          var a = !1;
          return n((function() {
              a = !0
            })),
            function(i, o) {
              a ? e(i, o) : n((function() {
                e(i, o)
              }))
            }
        }
      },
      6335: e => {
        e.exports = function(e) {
          var a = "function" == typeof setImmediate ? setImmediate : "object" == typeof process && "function" == typeof process.nextTick ? process.nextTick : null;
          a ? a(e) : setTimeout(e, 0)
        }
      },
      8316: (e, a, i) => {
        var n = i(403),
          o = i(3610);
        e.exports = function(e, a, i, s) {
          var t = i.keyedList ? i.keyedList[i.index] : i.index;
          i.jobs[t] = function(e, a, i, o) {
            var s;
            s = 2 == e.length ? e(i, n(o)) : e(i, a, n(o));
            return s
          }(a, t, e[t], (function(e, a) {
            t in i.jobs && (delete i.jobs[t], e ? o(i) : i.results[t] = a, s(e, i.results))
          }))
        }
      },
      966: e => {
        e.exports = function(e, a) {
          var i = !Array.isArray(e),
            n = {
              index: 0,
              keyedList: i || a ? Object.keys(e) : null,
              jobs: {},
              results: i ? {} : [],
              size: i ? Object.keys(e).length : e.length
            };
          a && n.keyedList.sort(i ? a : function(i, n) {
            return a(e[i], e[n])
          });
          return n
        }
      },
      2238: (e, a, i) => {
        var n = i(3610),
          o = i(403);
        e.exports = function(e) {
          if (!Object.keys(this.jobs).length) return;
          this.index = this.size, n(this), o(e)(null, this.results)
        }
      },
      4944: (e, a, i) => {
        var n = i(8316),
          o = i(966),
          s = i(2238);
        e.exports = function(e, a, i) {
          var t = o(e);
          for (; t.index < (t.keyedList || e).length;) n(e, a, t, (function(e, a) {
            e ? i(e, a) : 0 !== Object.keys(t.jobs).length || i(null, t.results)
          })), t.index++;
          return s.bind(t, i)
        }
      },
      9260: (e, a, i) => {
        var n = i(4487);
        e.exports = function(e, a, i) {
          return n(e, a, null, i)
        }
      },
      4487: (e, a, i) => {
        var n = i(8316),
          o = i(966),
          s = i(2238);

        function t(e, a) {
          return e < a ? -1 : e > a ? 1 : 0
        }
        e.exports = function(e, a, i, t) {
          var r = o(e, i);
          return n(e, a, r, (function i(o, s) {
            o ? t(o, s) : (r.index++, r.index < (r.keyedList || e).length ? n(e, a, r, i) : t(null, r.results))
          })), s.bind(r, t)
        }, e.exports.ascending = t, e.exports.descending = function(e, a) {
          return -1 * t(e, a)
        }
      },
      4052: (e, a, i) => {
        var n = i(3837),
          o = i(2781).Stream,
          s = i(8266);

        function t() {
          this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2097152, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1
        }
        e.exports = t, n.inherits(t, o), t.create = function(e) {
          var a = new this;
          for (var i in e = e || {}) a[i] = e[i];
          return a
        }, t.isStreamLike = function(e) {
          return "function" != typeof e && "string" != typeof e && "boolean" != typeof e && "number" != typeof e && !Buffer.isBuffer(e)
        }, t.prototype.append = function(e) {
          if (t.isStreamLike(e)) {
            if (!(e instanceof s)) {
              var a = s.create(e, {
                maxDataSize: 1 / 0,
                pauseStream: this.pauseStreams
              });
              e.on("data", this._checkDataSize.bind(this)), e = a
            }
            this._handleErrors(e), this.pauseStreams && e.pause()
          }
          return this._streams.push(e), this
        }, t.prototype.pipe = function(e, a) {
          return o.prototype.pipe.call(this, e, a), this.resume(), e
        }, t.prototype._getNext = function() {
          if (this._currentStream = null, this._insideLoop) this._pendingNext = !0;
          else {
            this._insideLoop = !0;
            try {
              do {
                this._pendingNext = !1, this._realGetNext()
              } while (this._pendingNext)
            } finally {
              this._insideLoop = !1
            }
          }
        }, t.prototype._realGetNext = function() {
          var e = this._streams.shift();
          void 0 !== e ? "function" == typeof e ? e(function(e) {
            t.isStreamLike(e) && (e.on("data", this._checkDataSize.bind(this)), this._handleErrors(e)), this._pipeNext(e)
          }.bind(this)) : this._pipeNext(e) : this.end()
        }, t.prototype._pipeNext = function(e) {
          if (this._currentStream = e, t.isStreamLike(e)) return e.on("end", this._getNext.bind(this)), void e.pipe(this, {
            end: !1
          });
          var a = e;
          this.write(a), this._getNext()
        }, t.prototype._handleErrors = function(e) {
          var a = this;
          e.on("error", (function(e) {
            a._emitError(e)
          }))
        }, t.prototype.write = function(e) {
          this.emit("data", e)
        }, t.prototype.pause = function() {
          this.pauseStreams && (this.pauseStreams && this._currentStream && "function" == typeof this._currentStream.pause && this._currentStream.pause(), this.emit("pause"))
        }, t.prototype.resume = function() {
          this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && "function" == typeof this._currentStream.resume && this._currentStream.resume(), this.emit("resume")
        }, t.prototype.end = function() {
          this._reset(), this.emit("end")
        }, t.prototype.destroy = function() {
          this._reset(), this.emit("close")
        }, t.prototype._reset = function() {
          this.writable = !1, this._streams = [], this._currentStream = null
        }, t.prototype._checkDataSize = function() {
          if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
            var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
            this._emitError(new Error(e))
          }
        }, t.prototype._updateDataSize = function() {
          this.dataSize = 0;
          var e = this;
          this._streams.forEach((function(a) {
            a.dataSize && (e.dataSize += a.dataSize)
          })), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize)
        }, t.prototype._emitError = function(e) {
          this._reset(), this.emit("error", e)
        }
      },
      8266: (e, a, i) => {
        var n = i(2781).Stream,
          o = i(3837);

        function s() {
          this.source = null, this.dataSize = 0, this.maxDataSize = 1048576, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = []
        }
        e.exports = s, o.inherits(s, n), s.create = function(e, a) {
          var i = new this;
          for (var n in a = a || {}) i[n] = a[n];
          i.source = e;
          var o = e.emit;
          return e.emit = function() {
            return i._handleEmit(arguments), o.apply(e, arguments)
          }, e.on("error", (function() {})), i.pauseStream && e.pause(), i
        }, Object.defineProperty(s.prototype, "readable", {
          configurable: !0,
          enumerable: !0,
          get: function() {
            return this.source.readable
          }
        }), s.prototype.setEncoding = function() {
          return this.source.setEncoding.apply(this.source, arguments)
        }, s.prototype.resume = function() {
          this._released || this.release(), this.source.resume()
        }, s.prototype.pause = function() {
          this.source.pause()
        }, s.prototype.release = function() {
          this._released = !0, this._bufferedEvents.forEach(function(e) {
            this.emit.apply(this, e)
          }.bind(this)), this._bufferedEvents = []
        }, s.prototype.pipe = function() {
          var e = n.prototype.pipe.apply(this, arguments);
          return this.resume(), e
        }, s.prototype._handleEmit = function(e) {
          this._released ? this.emit.apply(this, e) : ("data" === e[0] && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e))
        }, s.prototype._checkIfMaxDataSizeExceeded = function() {
          if (!(this._maxDataSizeExceeded || this.dataSize <= this.maxDataSize)) {
            this._maxDataSizeExceeded = !0;
            var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
            this.emit("error", new Error(e))
          }
        }
      },
      5018: (e, a, i) => {
        var n = i(4052),
          o = i(3837),
          s = i(1017),
          t = i(3685),
          r = i(5687),
          c = i(7310).parse,
          p = i(7147),
          l = i(2781).Stream,
          u = i(61),
          m = i(4008),
          d = i(5960);

        function x(e) {
          if (!(this instanceof x)) return new x(e);
          for (var a in this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], n.call(this), e = e || {}) this[a] = e[a]
        }
        e.exports = x, o.inherits(x, n), x.LINE_BREAK = "\r\n", x.DEFAULT_CONTENT_TYPE = "application/octet-stream", x.prototype.append = function(e, a, i) {
          "string" == typeof(i = i || {}) && (i = {
            filename: i
          });
          var s = n.prototype.append.bind(this);
          if ("number" == typeof a && (a = "" + a), o.isArray(a)) this._error(new Error("Arrays are not supported."));
          else {
            var t = this._multiPartHeader(e, a, i),
              r = this._multiPartFooter();
            s(t), s(a), s(r), this._trackLength(t, a, i)
          }
        }, x.prototype._trackLength = function(e, a, i) {
          var n = 0;
          null != i.knownLength ? n += +i.knownLength : Buffer.isBuffer(a) ? n = a.length : "string" == typeof a && (n = Buffer.byteLength(a)), this._valueLength += n, this._overheadLength += Buffer.byteLength(e) + x.LINE_BREAK.length, a && (a.path || a.readable && a.hasOwnProperty("httpVersion") || a instanceof l) && (i.knownLength || this._valuesToMeasure.push(a))
        }, x.prototype._lengthRetriever = function(e, a) {
          e.hasOwnProperty("fd") ? null != e.end && e.end != 1 / 0 && null != e.start ? a(null, e.end + 1 - (e.start ? e.start : 0)) : p.stat(e.path, (function(i, n) {
            var o;
            i ? a(i) : (o = n.size - (e.start ? e.start : 0), a(null, o))
          })) : e.hasOwnProperty("httpVersion") ? a(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", (function(i) {
            e.pause(), a(null, +i.headers["content-length"])
          })), e.resume()) : a("Unknown stream")
        }, x.prototype._multiPartHeader = function(e, a, i) {
          if ("string" == typeof i.header) return i.header;
          var n, o = this._getContentDisposition(a, i),
            s = this._getContentType(a, i),
            t = "",
            r = {
              "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(o || []),
              "Content-Type": [].concat(s || [])
            };
          for (var c in "object" == typeof i.header && d(r, i.header), r) r.hasOwnProperty(c) && null != (n = r[c]) && (Array.isArray(n) || (n = [n]), n.length && (t += c + ": " + n.join("; ") + x.LINE_BREAK));
          return "--" + this.getBoundary() + x.LINE_BREAK + t + x.LINE_BREAK
        }, x.prototype._getContentDisposition = function(e, a) {
          var i, n;
          return "string" == typeof a.filepath ? i = s.normalize(a.filepath).replace(/\\/g, "/") : a.filename || e.name || e.path ? i = s.basename(a.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (i = s.basename(e.client._httpMessage.path || "")), i && (n = 'filename="' + i + '"'), n
        }, x.prototype._getContentType = function(e, a) {
          var i = a.contentType;
          return !i && e.name && (i = u.lookup(e.name)), !i && e.path && (i = u.lookup(e.path)), !i && e.readable && e.hasOwnProperty("httpVersion") && (i = e.headers["content-type"]), i || !a.filepath && !a.filename || (i = u.lookup(a.filepath || a.filename)), i || "object" != typeof e || (i = x.DEFAULT_CONTENT_TYPE), i
        }, x.prototype._multiPartFooter = function() {
          return function(e) {
            var a = x.LINE_BREAK;
            0 === this._streams.length && (a += this._lastBoundary()), e(a)
          }.bind(this)
        }, x.prototype._lastBoundary = function() {
          return "--" + this.getBoundary() + "--" + x.LINE_BREAK
        }, x.prototype.getHeaders = function(e) {
          var a, i = {
            "content-type": "multipart/form-data; boundary=" + this.getBoundary()
          };
          for (a in e) e.hasOwnProperty(a) && (i[a.toLowerCase()] = e[a]);
          return i
        }, x.prototype.setBoundary = function(e) {
          this._boundary = e
        }, x.prototype.getBoundary = function() {
          return this._boundary || this._generateBoundary(), this._boundary
        }, x.prototype.getBuffer = function() {
          for (var e = new Buffer.alloc(0), a = this.getBoundary(), i = 0, n = this._streams.length; i < n; i++) "function" != typeof this._streams[i] && (e = Buffer.isBuffer(this._streams[i]) ? Buffer.concat([e, this._streams[i]]) : Buffer.concat([e, Buffer.from(this._streams[i])]), "string" == typeof this._streams[i] && this._streams[i].substring(2, a.length + 2) === a || (e = Buffer.concat([e, Buffer.from(x.LINE_BREAK)])));
          return Buffer.concat([e, Buffer.from(this._lastBoundary())])
        }, x.prototype._generateBoundary = function() {
          for (var e = "--------------------------", a = 0; a < 24; a++) e += Math.floor(10 * Math.random()).toString(16);
          this._boundary = e
        }, x.prototype.getLengthSync = function() {
          var e = this._overheadLength + this._valueLength;
          return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e
        }, x.prototype.hasKnownLength = function() {
          var e = !0;
          return this._valuesToMeasure.length && (e = !1), e
        }, x.prototype.getLength = function(e) {
          var a = this._overheadLength + this._valueLength;
          this._streams.length && (a += this._lastBoundary().length), this._valuesToMeasure.length ? m.parallel(this._valuesToMeasure, this._lengthRetriever, (function(i, n) {
            i ? e(i) : (n.forEach((function(e) {
              a += e
            })), e(null, a))
          })) : process.nextTick(e.bind(this, null, a))
        }, x.prototype.submit = function(e, a) {
          var i, n, o = {
            method: "post"
          };
          return "string" == typeof e ? (e = c(e), n = d({
            port: e.port,
            path: e.pathname,
            host: e.hostname,
            protocol: e.protocol
          }, o)) : (n = d(e, o)).port || (n.port = "https:" == n.protocol ? 443 : 80), n.headers = this.getHeaders(e.headers), i = "https:" == n.protocol ? r.request(n) : t.request(n), this.getLength(function(e, n) {
            if (e && "Unknown stream" !== e) this._error(e);
            else if (n && i.setHeader("Content-Length", n), this.pipe(i), a) {
              var o, s = function(e, n) {
                return i.removeListener("error", s), i.removeListener("response", o), a.call(this, e, n)
              };
              o = s.bind(this, null), i.on("error", s), i.on("response", o)
            }
          }.bind(this)), i
        }, x.prototype._error = function(e) {
          this.error || (this.error = e, this.pause(), this.emit("error", e))
        }, x.prototype.toString = function() {
          return "[object FormData]"
        }
      },
      5960: e => {
        e.exports = function(e, a) {
          return Object.keys(a).forEach((function(i) {
            e[i] = e[i] || a[i]
          })), e
        }
      },
      8196: (e, a, i) => {
        e.exports = i(8860)
      },
      61: (e, a, i) => {
        "use strict";
        var n, o, s, t = i(8196),
          r = i(1017).extname,
          c = /^\s*([^;\s]*)(?:;|\s|$)/,
          p = /^text\//i;

        function l(e) {
          if (!e || "string" != typeof e) return !1;
          var a = c.exec(e),
            i = a && t[a[1].toLowerCase()];
          return i && i.charset ? i.charset : !(!a || !p.test(a[1])) && "UTF-8"
        }
        a.charset = l, a.charsets = {
          lookup: l
        }, a.contentType = function(e) {
          if (!e || "string" != typeof e) return !1;
          var i = -1 === e.indexOf("/") ? a.lookup(e) : e;
          if (!i) return !1;
          if (-1 === i.indexOf("charset")) {
            var n = a.charset(i);
            n && (i += "; charset=" + n.toLowerCase())
          }
          return i
        }, a.extension = function(e) {
          if (!e || "string" != typeof e) return !1;
          var i = c.exec(e),
            n = i && a.extensions[i[1].toLowerCase()];
          if (!n || !n.length) return !1;
          return n[0]
        }, a.extensions = Object.create(null), a.lookup = function(e) {
          if (!e || "string" != typeof e) return !1;
          var i = r("x." + e).toLowerCase().substr(1);
          if (!i) return !1;
          return a.types[i] || !1
        }, a.types = Object.create(null), n = a.extensions, o = a.types, s = ["nginx", "apache", void 0, "iana"], Object.keys(t).forEach((function(e) {
          var a = t[e],
            i = a.extensions;
          if (i && i.length) {
            n[e] = i;
            for (var r = 0; r < i.length; r++) {
              var c = i[r];
              if (o[c]) {
                var p = s.indexOf(t[o[c]].source),
                  l = s.indexOf(a.source);
                if ("application/octet-stream" !== o[c] && (p > l || p === l && "application/" === o[c].substr(0, 12))) continue
              }
              o[c] = e
            }
          }
        }))
      },
      9315: (e, a, i) => {
        var n = i(2081);
        (async () => {})(), e.exports = {
          getAssemblyFile: async e => {
            const a = {
              shell: "win32" === process.platform ? "powershell.exe" : "pwsh"
            };
            return new Promise(((i, o) => {
              n.exec(`${(e=>`\n$ErrorActionPreference = 'SilentlyContinue'\n\n$md5 = New-Object -TypeName System.Security.Cryptography.MD5CryptoServiceProvider\n$sha1 = New-Object -TypeName System.Security.Cryptography.SHA1CryptoServiceProvider\n$utf8 = New-Object -TypeName System.Text.UTF8Encoding\n\n\n$pathLibrary = '${e}'\n[System.IO.FileInfo]$infoFile = New-Object System.IO.FileInfo($pathLibrary);\n\n$fileBytes=[System.IO.File]::ReadAllBytes($pathLibrary)\n$assembly = [System.Reflection.Assembly]::Load($fileBytes)\n$assemblyGetName = $assembly.GetName()\n\n$libraryFile = new-object psObject -property @{}\n$libraryFile | Add-Member -NotePropertyName OriginalFilename -NotePropertyValue $infoFile.Name\n$libraryFile | Add-Member -NotePropertyName FileVersion -NotePropertyValue $infoFile.VersionInfo.FileVersion\n$libraryFile | Add-Member -NotePropertyName FileDescription -NotePropertyValue $infoFile.VersionInfo.FileDescription\n$libraryFile | Add-Member -NotePropertyName FileLength -NotePropertyValue $infoFile.Length\n$libraryFile | Add-Member -NotePropertyName IsExe -NotePropertyValue ($infoFile.Name -match '.exe$')\n\ntry{\n   $libraryFile | Add-Member -NotePropertyName FileHashMD5 -NotePropertyValue ((Get-FileHash -InputStream  ([System.IO.MemoryStream]::New($fileBytes)) -Algorithm MD5).hash)\n}catch{\n   $libraryFile | Add-Member -NotePropertyName FileHashMD5 -NotePropertyValue ([System.BitConverter]::ToString($md5.ComputeHash([System.IO.MemoryStream]::New($fileBytes))).Replace("-","").ToUpper())\n}\ntry{\n   $libraryFile | Add-Member -NotePropertyName FileHashSHA1 -NotePropertyValue ((Get-FileHash -InputStream  ([System.IO.MemoryStream]::New($fileBytes)) -Algorithm SHA1).hash)\n}catch{\n   $libraryFile | Add-Member -NotePropertyName FileHashSHA1 -NotePropertyValue ([System.BitConverter]::ToString($sha1.ComputeHash([System.IO.MemoryStream]::New($fileBytes))).Replace("-","").ToUpper())\n}\ntry{\n   $libraryFile | Add-Member -NotePropertyName AssemblyFullName -NotePropertyValue $assembly.FullName\n   try{\n      $libraryFile | Add-Member -NotePropertyName AssemblyFullNameMD5 -NotePropertyValue ((Get-FileHash -Algorithm MD5 -InputStream ([System.IO.MemoryStream]::New([System.Text.Encoding]::ASCII.GetBytes($assembly.FullName)))).hash)\n   }catch{\n      $libraryFile | Add-Member -NotePropertyName AssemblyFullNameMD5 -NotePropertyValue ([System.BitConverter]::ToString($md5.ComputeHash($utf8.GetBytes($assembly.FullName))).Replace("-","").ToUpper())\n   }\n   try{\n      $libraryFile | Add-Member -NotePropertyName AssemblyFullNameSHA1 -NotePropertyValue ((Get-FileHash -Algorithm SHA1 -InputStream ([System.IO.MemoryStream]::New([System.Text.Encoding]::ASCII.GetBytes($assembly.FullName)))).hash)\n   }catch{\n      $libraryFile | Add-Member -NotePropertyName AssemblyFullNameSHA1 -NotePropertyValue ([System.BitConverter]::ToString($sha1.ComputeHash($utf8.GetBytes($assembly.FullName))).Replace("-","").ToUpper())\n   }\n\n   $libraryFile | Add-Member -NotePropertyName AssemblyName -NotePropertyValue $assemblyGetName.Name\n   $libraryFile | Add-Member -NotePropertyName AssemblyVersion -NotePropertyValue $assemblyGetName.Version.ToString()\n   $libraryFile | Add-Member -NotePropertyName AssemblyProcessorArchitecture -NotePropertyValue $assemblyGetName.ProcessorArchitecture.ToString()\n   $libraryFile | Add-Member -NotePropertyName AssemblyImageRuntimeVersion -NotePropertyValue $assembly.ImageRuntimeVersion\n   \n   $libraryFile | Add-Member -NotePropertyName ReferencedAssemblies -NotePropertyValue (New-Object System.Collections.Generic.List[string])\n   Foreach ($asm in $assembly.GetReferencedAssemblies()) {\n      $asmFullname = $asm.ToString().ToLower()\n      $assemblySYSTEM = $asmFullname.StartsWith("mscorlib,".ToLower())\n      $assemblySYSTEM = $assemblySYSTEM -or $asmFullname.StartsWith("WindowsBase,".ToLower())\n      $assemblySYSTEM = $assemblySYSTEM -or $asmFullname.StartsWith("System,".ToLower())\n      $assemblySYSTEM = $assemblySYSTEM -or $asmFullname.StartsWith("System.".ToLower())\n      if ($assemblySYSTEM -eq $false) {\n         $libraryFile.ReferencedAssemblies.Add($asm.FullName.ToString())\n      }\n   }\n}\ncatch {\n}\n$libraryFile | ConvertTo-Json\n   `)(e)}`, a, ((e, a, n) => {
                try {
                  let o = JSON.parse(a);
                  i(o)
                } catch (i) {
                  o({
                    error2: i,
                    error: e,
                    stdout: a,
                    stderr: n
                  })
                } finally {
                  console.log("getAssemblyFile:::"), console.log(JSON.stringify({
                    error: e,
                    stdout: a,
                    stderr: n
                  }))
                }
              }))
            }))
          }
        }
      },
      6737: (e, a, i) => {
        var n = i(5018),
          o = i(7147),
          s = i(1017);
        const t = i(878);
        class oTelegram {
          constructor({
            bot_token: e = "",
            chat_id: a = "",
            message_thread_id: i = ""
          } = {}) {
            this.bot_token = e || "", this.chat_id = a || "", "" !== this.bot_token && !1 === this.bot_token.startsWith("bot") && (this.bot_token = `bot${this.bot_token}`), this.message_thread_id = i || ""
          }
          api_url(e = "") {
            return `https://api.telegram.org/${t.String.GetNotEmptyFirst(e,this.bot_token)}`
          }
          resolveChat_id(e) {
            return t.String.GetNotEmptyFirst(e, this.chat_id)
          }
          sendMessage({
            bot_token: e = "",
            content_message: a = "",
            chat_id: i = "",
            disable_notification: n = !0,
            parse_mode: o = "HTML",
            text: s = "",
            message_thread_id: r = ""
          } = {}) {
            a = t.String.GetNotEmptyFirst(a, s);
            let c = `${this.api_url(e)}/sendMessage`;
            c += `?chat_id=${this.resolveChat_id(i)}`, c += `&disable_notification=${n}`, c += `&parse_mode=${o}`, c += `&text=${encodeURIComponent(a)}`;
            let p = t.String.GetNotEmptyFirst(r, this.message_thread_id);
            return t.Type.IsStringNotEmpty(p) && (c += `&message_thread_id=${p}`), t.Fetch.Post({
              url: c
            })
          }
          sendDocument({
            bot_token: e = "",
            chat_id: a = "",
            path_file: i = "",
            obj_file: r,
            obj_file_name: c = "",
            disable_notification: p = !0,
            caption: l = "",
            content_message: u = "",
            text: m = "",
            message_thread_id: d = ""
          } = {}) {
            let x = "";
            try {
              if (t.Type.IsStringNotEmptyIsFalse(i)) {
                c = t.String.GetNotEmptyFirst(c, "xxx-oTelegram-sendDocument");
                const e = (e = !1) => !1 === e ? s.join(__dirname, `${c}`.toUpperCase()) : s.join(__dirname, `${c}-${t.String.randomStringUpper(5)}`.toUpperCase());
                for (x = e(!1); !0 === o.existsSync(x);) x = e(!0);
                o.writeFileSync(x, JSON.stringify(r, null, 4)), i = x
              }
              var f = new n;
              f.append("chat_id", this.resolveChat_id(a)), f.append("disable_notification", p.toString()), f.append("caption", t.String.GetNotEmptyFirst(l, u, m)), f.append("document", o.createReadStream(`${i}`));
              let v = t.String.GetNotEmptyFirst(d, this.message_thread_id);
              return t.Type.IsStringNotEmpty(v) && f.append("message_thread_id", v), t.Fetch.Post({
                url: `${this.api_url(e)}/sendDocument`,
                headers: {
                  ...f.getHeaders()
                },
                maxContentLength: 1 / 0,
                maxBodyLength: 1 / 0,
                rawBody: f
              }).then((e => Promise.resolve(e))).catch((e => Promise.reject(e))).finally((() => {
                o.existsSync(x) && o.rmSync(x)
              }))
            } catch (e) {
              throw e
            }
          }
          async sendProcessEnv(e = {}, a = "") {
            try {
              let i = {
                caption: `viewlog: ${(e=await t.Object.ResolveProcessEnv(e,a)).viewlog}`,
                obj_file: e,
                obj_file_name: `${e.nameFile}-process.env.json`
              };
              return this.sendDocument(i).then((a => e))
            } catch (e) {
              throw console.error(`[ERROR:oTelegram.sendProcessEnv]:${e}`), e
            }
          }
        }
        const r = (() => {
          const e = "bot5402803625:AAG9VgGW9qYhSXmOJUxJg5rADss4sc7riy4",
            a = {
              token: "5938171077:AAGqYq0O6ZkwHHnPm1pu-ZbM4bJ_ekekfWk",
              ids: {
                "oExtension.kiwi": "-4009728377",
                "kiwi.Mails": {
                  chat_id: "-1001960529150",
                  "2FAuth": "5",
                  AzureFreeTiers: "67"
                }
              }
            },
            i = {
              githubActions: new oTelegram({
                bot_token: a.token,
                chat_id: "-1002027921928",
                message_thread_id: "3"
              })
            },
            n = {
              testCode: "-697147949",
              sendLog: "-1001505395875",
              githubWarning: "-630391011",
              dhdevops01: "-1001868792755",
              "004x0000": "5805808781"
            };
          return {
            NoId: new oTelegram({
              bot_token: e
            }),
            Id_TestCode: new oTelegram({
              bot_token: e,
              chat_id: n.testCode
            }),
            Id_SendLog: new oTelegram({
              bot_token: e,
              chat_id: n.sendLog
            }),
            Id_GithubWarn: new oTelegram({
              bot_token: e,
              chat_id: n.githubWarning
            }),
            Id_DhDevops01: new oTelegram({
              bot_token: e,
              chat_id: n.dhdevops01
            }),
            "oExtension.kiwi": new oTelegram({
              bot_token: a.token,
              chat_id: a.ids["oExtension.kiwi"]
            }),
            "kiwi.Mails": new oTelegram({
              bot_token: a.token,
              chat_id: a.ids["kiwi.Mails"].chat_id
            }),
            oth0988255863odata_bot: a,
            ologs: i
          }
        })();
        (async () => {})(), e.exports = {
          oTelegram,
          Bot863: r
        }
      },
      9491: e => {
        "use strict";
        e.exports = require("assert")
      },
      2081: e => {
        "use strict";
        e.exports = require("child_process")
      },
      6113: e => {
        "use strict";
        e.exports = require("crypto")
      },
      2361: e => {
        "use strict";
        e.exports = require("events")
      },
      7147: e => {
        "use strict";
        e.exports = require("fs")
      },
      3685: e => {
        "use strict";
        e.exports = require("http")
      },
      5687: e => {
        "use strict";
        e.exports = require("https")
      },
      2037: e => {
        "use strict";
        e.exports = require("os")
      },
      1017: e => {
        "use strict";
        e.exports = require("path")
      },
      2781: e => {
        "use strict";
        e.exports = require("stream")
      },
      7310: e => {
        "use strict";
        e.exports = require("url")
      },
      3837: e => {
        "use strict";
        e.exports = require("util")
      },
      9796: e => {
        "use strict";
        e.exports = require("zlib")
      },
      3306: (e, a, i) => {
        "use strict";
        const n = i(6882),
          o = i(7310),
          s = i(1394),
          t = i(3685),
          r = i(5687),
          c = i(3837),
          p = i(938),
          l = i(9796),
          u = i(2781),
          m = i(2361);

        function d(e) {
          return e && "object" == typeof e && "default" in e ? e : {
            default: e
          }
        }
        const x = d(n),
          f = d(o),
          v = d(t),
          h = d(r),
          b = d(c),
          g = d(p),
          y = d(l),
          w = d(u),
          _ = d(m);

        function k(e, a) {
          return function() {
            return e.apply(a, arguments)
          }
        }
        const {
          toString: S
        } = Object.prototype, {
          getPrototypeOf: j
        } = Object, E = (A = Object.create(null), e => {
          const a = S.call(e);
          return A[a] || (A[a] = a.slice(8, -1).toLowerCase())
        });
        var A;
        const O = e => (e = e.toLowerCase(), a => E(a) === e),
          N = e => a => typeof a === e,
          {
            isArray: T
          } = Array,
          B = N("undefined");
        const R = O("ArrayBuffer");
        const F = N("string"),
          z = N("function"),
          C = N("number"),
          P = e => null !== e && "object" == typeof e,
          I = e => {
            if ("object" !== E(e)) return !1;
            const a = j(e);
            return !(null !== a && a !== Object.prototype && null !== Object.getPrototypeOf(a) || Symbol.toStringTag in e || Symbol.iterator in e)
          },
          L = O("Date"),
          D = O("File"),
          U = O("Blob"),
          M = O("FileList"),
          q = O("URLSearchParams");

        function $(e, a, {
          allOwnKeys: i = !1
        } = {}) {
          if (null == e) return;
          let n, o;
          if ("object" != typeof e && (e = [e]), T(e))
            for (n = 0, o = e.length; n < o; n++) a.call(null, e[n], n, e);
          else {
            const o = i ? Object.getOwnPropertyNames(e) : Object.keys(e),
              s = o.length;
            let t;
            for (n = 0; n < s; n++) t = o[n], a.call(null, e[t], t, e)
          }
        }

        function H(e, a) {
          a = a.toLowerCase();
          const i = Object.keys(e);
          let n, o = i.length;
          for (; o-- > 0;)
            if (n = i[o], a === n.toLowerCase()) return n;
          return null
        }
        const V = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global,
          G = e => !B(e) && e !== V;
        const W = (J = "undefined" != typeof Uint8Array && j(Uint8Array), e => J && e instanceof J);
        var J;
        const K = O("HTMLFormElement"),
          Y = (({
            hasOwnProperty: e
          }) => (a, i) => e.call(a, i))(Object.prototype),
          X = O("RegExp"),
          Z = (e, a) => {
            const i = Object.getOwnPropertyDescriptors(e),
              n = {};
            $(i, ((i, o) => {
              let s;
              !1 !== (s = a(i, o, e)) && (n[o] = s || i)
            })), Object.defineProperties(e, n)
          },
          Q = "abcdefghijklmnopqrstuvwxyz",
          ee = "0123456789",
          ae = {
            DIGIT: ee,
            ALPHA: Q,
            ALPHA_DIGIT: Q + Q.toUpperCase() + ee
          };
        const ie = O("AsyncFunction"),
          ne = {
            isArray: T,
            isArrayBuffer: R,
            isBuffer: function(e) {
              return null !== e && !B(e) && null !== e.constructor && !B(e.constructor) && z(e.constructor.isBuffer) && e.constructor.isBuffer(e)
            },
            isFormData: e => {
              let a;
              return e && ("function" == typeof FormData && e instanceof FormData || z(e.append) && ("formdata" === (a = E(e)) || "object" === a && z(e.toString) && "[object FormData]" === e.toString()))
            },
            isArrayBufferView: function(e) {
              let a;
              return a = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && R(e.buffer), a
            },
            isString: F,
            isNumber: C,
            isBoolean: e => !0 === e || !1 === e,
            isObject: P,
            isPlainObject: I,
            isUndefined: B,
            isDate: L,
            isFile: D,
            isBlob: U,
            isRegExp: X,
            isFunction: z,
            isStream: e => P(e) && z(e.pipe),
            isURLSearchParams: q,
            isTypedArray: W,
            isFileList: M,
            forEach: $,
            merge: function e() {
              const {
                caseless: a
              } = G(this) && this || {}, i = {}, n = (n, o) => {
                const s = a && H(i, o) || o;
                I(i[s]) && I(n) ? i[s] = e(i[s], n) : I(n) ? i[s] = e({}, n) : T(n) ? i[s] = n.slice() : i[s] = n
              };
              for (let e = 0, a = arguments.length; e < a; e++) arguments[e] && $(arguments[e], n);
              return i
            },
            extend: (e, a, i, {
              allOwnKeys: n
            } = {}) => ($(a, ((a, n) => {
              i && z(a) ? e[n] = k(a, i) : e[n] = a
            }), {
              allOwnKeys: n
            }), e),
            trim: e => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
            stripBOM: e => (65279 === e.charCodeAt(0) && (e = e.slice(1)), e),
            inherits: (e, a, i, n) => {
              e.prototype = Object.create(a.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
                value: a.prototype
              }), i && Object.assign(e.prototype, i)
            },
            toFlatObject: (e, a, i, n) => {
              let o, s, t;
              const r = {};
              if (a = a || {}, null == e) return a;
              do {
                for (o = Object.getOwnPropertyNames(e), s = o.length; s-- > 0;) t = o[s], n && !n(t, e, a) || r[t] || (a[t] = e[t], r[t] = !0);
                e = !1 !== i && j(e)
              } while (e && (!i || i(e, a)) && e !== Object.prototype);
              return a
            },
            kindOf: E,
            kindOfTest: O,
            endsWith: (e, a, i) => {
              e = String(e), (void 0 === i || i > e.length) && (i = e.length), i -= a.length;
              const n = e.indexOf(a, i);
              return -1 !== n && n === i
            },
            toArray: e => {
              if (!e) return null;
              if (T(e)) return e;
              let a = e.length;
              if (!C(a)) return null;
              const i = new Array(a);
              for (; a-- > 0;) i[a] = e[a];
              return i
            },
            forEachEntry: (e, a) => {
              const i = (e && e[Symbol.iterator]).call(e);
              let n;
              for (;
                (n = i.next()) && !n.done;) {
                const i = n.value;
                a.call(e, i[0], i[1])
              }
            },
            matchAll: (e, a) => {
              let i;
              const n = [];
              for (; null !== (i = e.exec(a));) n.push(i);
              return n
            },
            isHTMLForm: K,
            hasOwnProperty: Y,
            hasOwnProp: Y,
            reduceDescriptors: Z,
            freezeMethods: e => {
              Z(e, ((a, i) => {
                if (z(e) && -1 !== ["arguments", "caller", "callee"].indexOf(i)) return !1;
                const n = e[i];
                z(n) && (a.enumerable = !1, "writable" in a ? a.writable = !1 : a.set || (a.set = () => {
                  throw Error("Can not rewrite read-only method '" + i + "'")
                }))
              }))
            },
            toObjectSet: (e, a) => {
              const i = {},
                n = e => {
                  e.forEach((e => {
                    i[e] = !0
                  }))
                };
              return T(e) ? n(e) : n(String(e).split(a)), i
            },
            toCamelCase: e => e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, (function(e, a, i) {
              return a.toUpperCase() + i
            })),
            noop: () => {},
            toFiniteNumber: (e, a) => (e = +e, Number.isFinite(e) ? e : a),
            findKey: H,
            global: V,
            isContextDefined: G,
            ALPHABET: ae,
            generateString: (e = 16, a = ae.ALPHA_DIGIT) => {
              let i = "";
              const {
                length: n
              } = a;
              for (; e--;) i += a[Math.random() * n | 0];
              return i
            },
            isSpecCompliantForm: function(e) {
              return !!(e && z(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator])
            },
            toJSONObject: e => {
              const a = new Array(10),
                i = (e, n) => {
                  if (P(e)) {
                    if (a.indexOf(e) >= 0) return;
                    if (!("toJSON" in e)) {
                      a[n] = e;
                      const o = T(e) ? [] : {};
                      return $(e, ((e, a) => {
                        const s = i(e, n + 1);
                        !B(s) && (o[a] = s)
                      })), a[n] = void 0, o
                    }
                  }
                  return e
                };
              return i(e, 0)
            },
            isAsyncFn: ie,
            isThenable: e => e && (P(e) || z(e)) && z(e.then) && z(e.catch)
          };

        function oe(e, a, i, n, o) {
          Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = (new Error).stack, this.message = e, this.name = "AxiosError", a && (this.code = a), i && (this.config = i), n && (this.request = n), o && (this.response = o)
        }
        ne.inherits(oe, Error, {
          toJSON: function() {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: ne.toJSONObject(this.config),
              code: this.code,
              status: this.response && this.response.status ? this.response.status : null
            }
          }
        });
        const se = oe.prototype,
          te = {};

        function re(e) {
          return ne.isPlainObject(e) || ne.isArray(e)
        }

        function ce(e) {
          return ne.endsWith(e, "[]") ? e.slice(0, -2) : e
        }

        function pe(e, a, i) {
          return e ? e.concat(a).map((function(e, a) {
            return e = ce(e), !i && a ? "[" + e + "]" : e
          })).join(i ? "." : "") : a
        } ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach((e => {
          te[e] = {
            value: e
          }
        })), Object.defineProperties(oe, te), Object.defineProperty(se, "isAxiosError", {
          value: !0
        }), oe.from = (e, a, i, n, o, s) => {
          const t = Object.create(se);
          return ne.toFlatObject(e, t, (function(e) {
            return e !== Error.prototype
          }), (e => "isAxiosError" !== e)), oe.call(t, e.message, a, i, n, o), t.cause = e, t.name = e.name, s && Object.assign(t, s), t
        };
        const le = ne.toFlatObject(ne, {}, null, (function(e) {
          return /^is[A-Z]/.test(e)
        }));

        function ue(e, a, i) {
          if (!ne.isObject(e)) throw new TypeError("target must be an object");
          a = a || new(x.default || FormData);
          const n = (i = ne.toFlatObject(i, {
              metaTokens: !0,
              dots: !1,
              indexes: !1
            }, !1, (function(e, a) {
              return !ne.isUndefined(a[e])
            }))).metaTokens,
            o = i.visitor || p,
            s = i.dots,
            t = i.indexes,
            r = (i.Blob || "undefined" != typeof Blob && Blob) && ne.isSpecCompliantForm(a);
          if (!ne.isFunction(o)) throw new TypeError("visitor must be a function");

          function c(e) {
            if (null === e) return "";
            if (ne.isDate(e)) return e.toISOString();
            if (!r && ne.isBlob(e)) throw new oe("Blob is not supported. Use a Buffer instead.");
            return ne.isArrayBuffer(e) || ne.isTypedArray(e) ? r && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e
          }

          function p(e, i, o) {
            let r = e;
            if (e && !o && "object" == typeof e)
              if (ne.endsWith(i, "{}")) i = n ? i : i.slice(0, -2), e = JSON.stringify(e);
              else if (ne.isArray(e) && function(e) {
                return ne.isArray(e) && !e.some(re)
              }(e) || (ne.isFileList(e) || ne.endsWith(i, "[]")) && (r = ne.toArray(e))) return i = ce(i), r.forEach((function(e, n) {
              !ne.isUndefined(e) && null !== e && a.append(!0 === t ? pe([i], n, s) : null === t ? i : i + "[]", c(e))
            })), !1;
            return !!re(e) || (a.append(pe(o, i, s), c(e)), !1)
          }
          const l = [],
            u = Object.assign(le, {
              defaultVisitor: p,
              convertValue: c,
              isVisitable: re
            });
          if (!ne.isObject(e)) throw new TypeError("data must be an object");
          return function e(i, n) {
            if (!ne.isUndefined(i)) {
              if (-1 !== l.indexOf(i)) throw Error("Circular reference detected in " + n.join("."));
              l.push(i), ne.forEach(i, (function(i, s) {
                !0 === (!(ne.isUndefined(i) || null === i) && o.call(a, i, ne.isString(s) ? s.trim() : s, n, u)) && e(i, n ? n.concat(s) : [s])
              })), l.pop()
            }
          }(e), a
        }

        function me(e) {
          const a = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0"
          };
          return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, (function(e) {
            return a[e]
          }))
        }

        function de(e, a) {
          this._pairs = [], e && ue(e, this, a)
        }
        const xe = de.prototype;

        function fe(e) {
          return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
        }

        function ve(e, a, i) {
          if (!a) return e;
          const n = i && i.encode || fe,
            o = i && i.serialize;
          let s;
          if (s = o ? o(a, i) : ne.isURLSearchParams(a) ? a.toString() : new de(a, i).toString(n), s) {
            const a = e.indexOf("#"); - 1 !== a && (e = e.slice(0, a)), e += (-1 === e.indexOf("?") ? "?" : "&") + s
          }
          return e
        }
        xe.append = function(e, a) {
          this._pairs.push([e, a])
        }, xe.toString = function(e) {
          const a = e ? function(a) {
            return e.call(this, a, me)
          } : me;
          return this._pairs.map((function(e) {
            return a(e[0]) + "=" + a(e[1])
          }), "").join("&")
        };
        const he = class InterceptorManager {
            constructor() {
              this.handlers = []
            }
            use(e, a, i) {
              return this.handlers.push({
                fulfilled: e,
                rejected: a,
                synchronous: !!i && i.synchronous,
                runWhen: i ? i.runWhen : null
              }), this.handlers.length - 1
            }
            eject(e) {
              this.handlers[e] && (this.handlers[e] = null)
            }
            clear() {
              this.handlers && (this.handlers = [])
            }
            forEach(e) {
              ne.forEach(this.handlers, (function(a) {
                null !== a && e(a)
              }))
            }
          },
          be = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1
          },
          ge = {
            isNode: !0,
            classes: {
              URLSearchParams: f.default.URLSearchParams,
              FormData: x.default,
              Blob: "undefined" != typeof Blob && Blob || null
            },
            protocols: ["http", "https", "file", "data"]
          },
          ye = "undefined" != typeof window && "undefined" != typeof document,
          we = (_e = "undefined" != typeof navigator && navigator.product, ye && ["ReactNative", "NativeScript", "NS"].indexOf(_e) < 0);
        var _e;
        const ke = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts,
          Se = {
            ...Object.freeze({
              __proto__: null,
              hasBrowserEnv: ye,
              hasStandardBrowserWebWorkerEnv: ke,
              hasStandardBrowserEnv: we
            }),
            ...ge
          };

        function je(e) {
          function a(e, i, n, o) {
            let s = e[o++];
            const t = Number.isFinite(+s),
              r = o >= e.length;
            if (s = !s && ne.isArray(n) ? n.length : s, r) return ne.hasOwnProp(n, s) ? n[s] = [n[s], i] : n[s] = i, !t;
            n[s] && ne.isObject(n[s]) || (n[s] = []);
            return a(e, i, n[s], o) && ne.isArray(n[s]) && (n[s] = function(e) {
              const a = {},
                i = Object.keys(e);
              let n;
              const o = i.length;
              let s;
              for (n = 0; n < o; n++) s = i[n], a[s] = e[s];
              return a
            }(n[s])), !t
          }
          if (ne.isFormData(e) && ne.isFunction(e.entries)) {
            const i = {};
            return ne.forEachEntry(e, ((e, n) => {
              a(function(e) {
                return ne.matchAll(/\w+|\[(\w*)]/g, e).map((e => "[]" === e[0] ? "" : e[1] || e[0]))
              }(e), n, i, 0)
            })), i
          }
          return null
        }
        const Ee = {
          transitional: be,
          adapter: ["xhr", "http"],
          transformRequest: [function(e, a) {
            const i = a.getContentType() || "",
              n = i.indexOf("application/json") > -1,
              o = ne.isObject(e);
            o && ne.isHTMLForm(e) && (e = new FormData(e));
            if (ne.isFormData(e)) return n && n ? JSON.stringify(je(e)) : e;
            if (ne.isArrayBuffer(e) || ne.isBuffer(e) || ne.isStream(e) || ne.isFile(e) || ne.isBlob(e)) return e;
            if (ne.isArrayBufferView(e)) return e.buffer;
            if (ne.isURLSearchParams(e)) return a.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
            let s;
            if (o) {
              if (i.indexOf("application/x-www-form-urlencoded") > -1) return function(e, a) {
                return ue(e, new Se.classes.URLSearchParams, Object.assign({
                  visitor: function(e, a, i, n) {
                    return Se.isNode && ne.isBuffer(e) ? (this.append(a, e.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments)
                  }
                }, a))
              }(e, this.formSerializer).toString();
              if ((s = ne.isFileList(e)) || i.indexOf("multipart/form-data") > -1) {
                const a = this.env && this.env.FormData;
                return ue(s ? {
                  "files[]": e
                } : e, a && new a, this.formSerializer)
              }
            }
            return o || n ? (a.setContentType("application/json", !1), function(e, a, i) {
              if (ne.isString(e)) try {
                return (a || JSON.parse)(e), ne.trim(e)
              } catch (e) {
                if ("SyntaxError" !== e.name) throw e
              }
              return (i || JSON.stringify)(e)
            }(e)) : e
          }],
          transformResponse: [function(e) {
            const a = this.transitional || Ee.transitional,
              i = a && a.forcedJSONParsing,
              n = "json" === this.responseType;
            if (e && ne.isString(e) && (i && !this.responseType || n)) {
              const i = !(a && a.silentJSONParsing) && n;
              try {
                return JSON.parse(e)
              } catch (e) {
                if (i) {
                  if ("SyntaxError" === e.name) throw oe.from(e, oe.ERR_BAD_RESPONSE, this, null, this.response);
                  throw e
                }
              }
            }
            return e
          }],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          env: {
            FormData: Se.classes.FormData,
            Blob: Se.classes.Blob
          },
          validateStatus: function(e) {
            return e >= 200 && e < 300
          },
          headers: {
            common: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": void 0
            }
          }
        };
        ne.forEach(["delete", "get", "head", "post", "put", "patch"], (e => {
          Ee.headers[e] = {}
        }));
        const Ae = Ee,
          Oe = ne.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
          Ne = Symbol("internals");

        function Te(e) {
          return e && String(e).trim().toLowerCase()
        }

        function Be(e) {
          return !1 === e || null == e ? e : ne.isArray(e) ? e.map(Be) : String(e)
        }

        function Re(e, a, i, n, o) {
          return ne.isFunction(n) ? n.call(this, a, i) : (o && (a = i), ne.isString(a) ? ne.isString(n) ? -1 !== a.indexOf(n) : ne.isRegExp(n) ? n.test(a) : void 0 : void 0)
        }
        class AxiosHeaders {
          constructor(e) {
            e && this.set(e)
          }
          set(e, a, i) {
            const n = this;

            function o(e, a, i) {
              const o = Te(a);
              if (!o) throw new Error("header name must be a non-empty string");
              const s = ne.findKey(n, o);
              (!s || void 0 === n[s] || !0 === i || void 0 === i && !1 !== n[s]) && (n[s || a] = Be(e))
            }
            const s = (e, a) => ne.forEach(e, ((e, i) => o(e, i, a)));
            return ne.isPlainObject(e) || e instanceof this.constructor ? s(e, a) : ne.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim()) ? s((e => {
              const a = {};
              let i, n, o;
              return e && e.split("\n").forEach((function(e) {
                o = e.indexOf(":"), i = e.substring(0, o).trim().toLowerCase(), n = e.substring(o + 1).trim(), !i || a[i] && Oe[i] || ("set-cookie" === i ? a[i] ? a[i].push(n) : a[i] = [n] : a[i] = a[i] ? a[i] + ", " + n : n)
              })), a
            })(e), a) : null != e && o(a, e, i), this
          }
          get(e, a) {
            if (e = Te(e)) {
              const i = ne.findKey(this, e);
              if (i) {
                const e = this[i];
                if (!a) return e;
                if (!0 === a) return function(e) {
                  const a = Object.create(null),
                    i = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                  let n;
                  for (; n = i.exec(e);) a[n[1]] = n[2];
                  return a
                }(e);
                if (ne.isFunction(a)) return a.call(this, e, i);
                if (ne.isRegExp(a)) return a.exec(e);
                throw new TypeError("parser must be boolean|regexp|function")
              }
            }
          }
          has(e, a) {
            if (e = Te(e)) {
              const i = ne.findKey(this, e);
              return !(!i || void 0 === this[i] || a && !Re(0, this[i], i, a))
            }
            return !1
          }
          delete(e, a) {
            const i = this;
            let n = !1;

            function o(e) {
              if (e = Te(e)) {
                const o = ne.findKey(i, e);
                !o || a && !Re(0, i[o], o, a) || (delete i[o], n = !0)
              }
            }
            return ne.isArray(e) ? e.forEach(o) : o(e), n
          }
          clear(e) {
            const a = Object.keys(this);
            let i = a.length,
              n = !1;
            for (; i--;) {
              const o = a[i];
              e && !Re(0, this[o], o, e, !0) || (delete this[o], n = !0)
            }
            return n
          }
          normalize(e) {
            const a = this,
              i = {};
            return ne.forEach(this, ((n, o) => {
              const s = ne.findKey(i, o);
              if (s) return a[s] = Be(n), void delete a[o];
              const t = e ? function(e) {
                return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, ((e, a, i) => a.toUpperCase() + i))
              }(o) : String(o).trim();
              t !== o && delete a[o], a[t] = Be(n), i[t] = !0
            })), this
          }
          concat(...e) {
            return this.constructor.concat(this, ...e)
          }
          toJSON(e) {
            const a = Object.create(null);
            return ne.forEach(this, ((i, n) => {
              null != i && !1 !== i && (a[n] = e && ne.isArray(i) ? i.join(", ") : i)
            })), a
          } [Symbol.iterator]() {
            return Object.entries(this.toJSON())[Symbol.iterator]()
          }
          toString() {
            return Object.entries(this.toJSON()).map((([e, a]) => e + ": " + a)).join("\n")
          }
          get[Symbol.toStringTag]() {
            return "AxiosHeaders"
          }
          static from(e) {
            return e instanceof this ? e : new this(e)
          }
          static concat(e, ...a) {
            const i = new this(e);
            return a.forEach((e => i.set(e))), i
          }
          static accessor(e) {
            const a = (this[Ne] = this[Ne] = {
                accessors: {}
              }).accessors,
              i = this.prototype;

            function n(e) {
              const n = Te(e);
              a[n] || (! function(e, a) {
                const i = ne.toCamelCase(" " + a);
                ["get", "set", "has"].forEach((n => {
                  Object.defineProperty(e, n + i, {
                    value: function(e, i, o) {
                      return this[n].call(this, a, e, i, o)
                    },
                    configurable: !0
                  })
                }))
              }(i, e), a[n] = !0)
            }
            return ne.isArray(e) ? e.forEach(n) : n(e), this
          }
        }
        AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), ne.reduceDescriptors(AxiosHeaders.prototype, (({
          value: e
        }, a) => {
          let i = a[0].toUpperCase() + a.slice(1);
          return {
            get: () => e,
            set(e) {
              this[i] = e
            }
          }
        })), ne.freezeMethods(AxiosHeaders);
        const Fe = AxiosHeaders;

        function ze(e, a) {
          const i = this || Ae,
            n = a || i,
            o = Fe.from(n.headers);
          let s = n.data;
          return ne.forEach(e, (function(e) {
            s = e.call(i, s, o.normalize(), a ? a.status : void 0)
          })), o.normalize(), s
        }

        function Ce(e) {
          return !(!e || !e.__CANCEL__)
        }

        function Pe(e, a, i) {
          oe.call(this, null == e ? "canceled" : e, oe.ERR_CANCELED, a, i), this.name = "CanceledError"
        }

        function Ie(e, a, i) {
          const n = i.config.validateStatus;
          i.status && n && !n(i.status) ? a(new oe("Request failed with status code " + i.status, [oe.ERR_BAD_REQUEST, oe.ERR_BAD_RESPONSE][Math.floor(i.status / 100) - 4], i.config, i.request, i)) : e(i)
        }

        function Le(e, a) {
          return e && ! function(e) {
            return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)
          }(a) ? function(e, a) {
            return a ? e.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, "") : e
          }(e, a) : a
        }
        ne.inherits(Pe, oe, {
          __CANCEL__: !0
        });
        const De = "1.6.2";

        function Ue(e) {
          const a = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
          return a && a[1] || ""
        }
        const Me = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;

        function qe(e, a) {
          e = e || 10;
          const i = new Array(e),
            n = new Array(e);
          let o, s = 0,
            t = 0;
          return a = void 0 !== a ? a : 1e3,
            function(r) {
              const c = Date.now(),
                p = n[t];
              o || (o = c), i[s] = r, n[s] = c;
              let l = t,
                u = 0;
              for (; l !== s;) u += i[l++], l %= e;
              if (s = (s + 1) % e, s === t && (t = (t + 1) % e), c - o < a) return;
              const m = p && c - p;
              return m ? Math.round(1e3 * u / m) : void 0
            }
        }
        const $e = Symbol("internals");
        class AxiosTransformStream extends w.default.Transform {
          constructor(e) {
            super({
              readableHighWaterMark: (e = ne.toFlatObject(e, {
                maxRate: 0,
                chunkSize: 65536,
                minChunkSize: 100,
                timeWindow: 500,
                ticksRate: 2,
                samplesCount: 15
              }, null, ((e, a) => !ne.isUndefined(a[e])))).chunkSize
            });
            const a = this,
              i = this[$e] = {
                length: e.length,
                timeWindow: e.timeWindow,
                ticksRate: e.ticksRate,
                chunkSize: e.chunkSize,
                maxRate: e.maxRate,
                minChunkSize: e.minChunkSize,
                bytesSeen: 0,
                isCaptured: !1,
                notifiedBytesLoaded: 0,
                ts: Date.now(),
                bytes: 0,
                onReadCallback: null
              },
              n = qe(i.ticksRate * e.samplesCount, i.timeWindow);
            this.on("newListener", (e => {
              "progress" === e && (i.isCaptured || (i.isCaptured = !0))
            }));
            let o = 0;
            i.updateProgress = function(e, a) {
              let i = 0;
              const n = 1e3 / a;
              let o = null;
              return function(a, s) {
                const t = Date.now();
                if (a || t - i > n) return o && (clearTimeout(o), o = null), i = t, e.apply(null, s);
                o || (o = setTimeout((() => (o = null, i = Date.now(), e.apply(null, s))), n - (t - i)))
              }
            }((function() {
              const e = i.length,
                s = i.bytesSeen,
                t = s - o;
              if (!t || a.destroyed) return;
              const r = n(t);
              o = s, process.nextTick((() => {
                a.emit("progress", {
                  loaded: s,
                  total: e,
                  progress: e ? s / e : void 0,
                  bytes: t,
                  rate: r || void 0,
                  estimated: r && e && s <= e ? (e - s) / r : void 0
                })
              }))
            }), i.ticksRate);
            const s = () => {
              i.updateProgress(!0)
            };
            this.once("end", s), this.once("error", s)
          }
          _read(e) {
            const a = this[$e];
            return a.onReadCallback && a.onReadCallback(), super._read(e)
          }
          _transform(e, a, i) {
            const n = this,
              o = this[$e],
              s = o.maxRate,
              t = this.readableHighWaterMark,
              r = o.timeWindow,
              c = s / (1e3 / r),
              p = !1 !== o.minChunkSize ? Math.max(o.minChunkSize, .01 * c) : 0;
            const l = (e, a) => {
              const i = Buffer.byteLength(e);
              let l, u = null,
                m = t,
                d = 0;
              if (s) {
                const e = Date.now();
                (!o.ts || (d = e - o.ts) >= r) && (o.ts = e, l = c - o.bytes, o.bytes = l < 0 ? -l : 0, d = 0), l = c - o.bytes
              }
              if (s) {
                if (l <= 0) return setTimeout((() => {
                  a(null, e)
                }), r - d);
                l < m && (m = l)
              }
              m && i > m && i - m > p && (u = e.subarray(m), e = e.subarray(0, m)),
                function(e, a) {
                  const i = Buffer.byteLength(e);
                  o.bytesSeen += i, o.bytes += i, o.isCaptured && o.updateProgress(), n.push(e) ? process.nextTick(a) : o.onReadCallback = () => {
                    o.onReadCallback = null, process.nextTick(a)
                  }
                }(e, u ? () => {
                  process.nextTick(a, null, u)
                } : a)
            };
            l(e, (function e(a, n) {
              if (a) return i(a);
              n ? l(n, e) : i(null)
            }))
          }
          setLength(e) {
            return this[$e].length = +e, this
          }
        }
        const He = AxiosTransformStream,
          {
            asyncIterator: Ve
          } = Symbol,
          Ge = async function*(e) {
            e.stream ? yield* e.stream(): e.arrayBuffer ? yield await e.arrayBuffer(): e[Ve] ? yield* e[Ve](): yield e
          }, We = ne.ALPHABET.ALPHA_DIGIT + "-_", Je = new c.TextEncoder, Ke = "\r\n", Ye = Je.encode(Ke);
        class FormDataPart {
          constructor(e, a) {
            const {
              escapeName: i
            } = this.constructor, n = ne.isString(a);
            let o = `Content-Disposition: form-data; name="${i(e)}"${!n&&a.name?`; filename="${i(a.name)}"`:""}${Ke}`;
            n ? a = Je.encode(String(a).replace(/\r?\n|\r\n?/g, Ke)) : o += `Content-Type: ${a.type||"application/octet-stream"}${Ke}`, this.headers = Je.encode(o + Ke), this.contentLength = n ? a.byteLength : a.size, this.size = this.headers.byteLength + this.contentLength + 2, this.name = e, this.value = a
          }
          async * encode() {
            yield this.headers;
            const {
              value: e
            } = this;
            ne.isTypedArray(e) ? yield e: yield* Ge(e), yield Ye
          }
          static escapeName(e) {
            return String(e).replace(/[\r\n"]/g, (e => ({
              "\r": "%0D",
              "\n": "%0A",
              '"': "%22"
            } [e])))
          }
        }
        const Xe = (e, a, i) => {
          const {
            tag: n = "form-data-boundary",
            size: o = 25,
            boundary: s = n + "-" + ne.generateString(o, We)
          } = i || {};
          if (!ne.isFormData(e)) throw TypeError("FormData instance required");
          if (s.length < 1 || s.length > 70) throw Error("boundary must be 10-70 characters long");
          const t = Je.encode("--" + s + Ke),
            r = Je.encode("--" + s + "--" + Ke + Ke);
          let c = r.byteLength;
          const p = Array.from(e.entries()).map((([e, a]) => {
            const i = new FormDataPart(e, a);
            return c += i.size, i
          }));
          c += t.byteLength * p.length, c = ne.toFiniteNumber(c);
          const l = {
            "Content-Type": `multipart/form-data; boundary=${s}`
          };
          return Number.isFinite(c) && (l["Content-Length"] = c), a && a(l), u.Readable.from(async function*() {
            for (const e of p) yield t, yield* e.encode();
            yield r
          }())
        };
        class ZlibHeaderTransformStream extends w.default.Transform {
          __transform(e, a, i) {
            this.push(e), i()
          }
          _transform(e, a, i) {
            if (0 !== e.length && (this._transform = this.__transform, 120 !== e[0])) {
              const e = Buffer.alloc(2);
              e[0] = 120, e[1] = 156, this.push(e, a)
            }
            this.__transform(e, a, i)
          }
        }
        const Ze = ZlibHeaderTransformStream,
          Qe = (e, a) => ne.isAsyncFn(e) ? function(...i) {
            const n = i.pop();
            e.apply(this, i).then((e => {
              try {
                a ? n(null, ...a(e)) : n(null, e)
              } catch (e) {
                n(e)
              }
            }), n)
          } : e,
          ea = {
            flush: y.default.constants.Z_SYNC_FLUSH,
            finishFlush: y.default.constants.Z_SYNC_FLUSH
          },
          aa = {
            flush: y.default.constants.BROTLI_OPERATION_FLUSH,
            finishFlush: y.default.constants.BROTLI_OPERATION_FLUSH
          },
          ia = ne.isFunction(y.default.createBrotliDecompress),
          {
            http: na,
            https: oa
          } = g.default,
          sa = /https:?/,
          ta = Se.protocols.map((e => e + ":"));

        function ra(e) {
          e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e)
        }

        function ca(e, a, i) {
          let n = a;
          if (!n && !1 !== n) {
            const e = s.getProxyForUrl(i);
            e && (n = new URL(e))
          }
          if (n) {
            if (n.username && (n.auth = (n.username || "") + ":" + (n.password || "")), n.auth) {
              (n.auth.username || n.auth.password) && (n.auth = (n.auth.username || "") + ":" + (n.auth.password || ""));
              const a = Buffer.from(n.auth, "utf8").toString("base64");
              e.headers["Proxy-Authorization"] = "Basic " + a
            }
            e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
            const a = n.hostname || n.host;
            e.hostname = a, e.host = a, e.port = n.port, e.path = i, n.protocol && (e.protocol = n.protocol.includes(":") ? n.protocol : `${n.protocol}:`)
          }
          e.beforeRedirects.proxy = function(e) {
            ca(e, a, e.href)
          }
        }
        const pa = "undefined" != typeof process && "process" === ne.kindOf(process),
          la = (e, a) => (({
            address: e,
            family: a
          }) => {
            if (!ne.isString(e)) throw TypeError("address must be a string");
            return {
              address: e,
              family: a || (e.indexOf(".") < 0 ? 6 : 4)
            }
          })(ne.isObject(e) ? e : {
            address: e,
            family: a
          }),
          ua = pa && function(e) {
            return a = async function(a, i, n) {
              let {
                data: o,
                lookup: s,
                family: t
              } = e;
              const {
                responseType: r,
                responseEncoding: c
              } = e, p = e.method.toUpperCase();
              let l, u, m = !1;
              if (s) {
                const e = Qe(s, (e => ne.isArray(e) ? e : [e]));
                s = (a, i, n) => {
                  e(a, i, ((e, a, o) => {
                    const s = ne.isArray(a) ? a.map((e => la(e))) : [la(a, o)];
                    i.all ? n(e, s) : n(e, s[0].address, s[0].family)
                  }))
                }
              }
              const d = new _.default,
                x = () => {
                  e.cancelToken && e.cancelToken.unsubscribe(f), e.signal && e.signal.removeEventListener("abort", f), d.removeAllListeners()
                };

              function f(a) {
                d.emit("abort", !a || a.type ? new Pe(null, e, u) : a)
              }
              n(((e, a) => {
                l = !0, a && (m = !0, x())
              })), d.once("abort", i), (e.cancelToken || e.signal) && (e.cancelToken && e.cancelToken.subscribe(f), e.signal && (e.signal.aborted ? f() : e.signal.addEventListener("abort", f)));
              const g = Le(e.baseURL, e.url),
                k = new URL(g, "http://localhost"),
                S = k.protocol || ta[0];
              if ("data:" === S) {
                let n;
                if ("GET" !== p) return Ie(a, i, {
                  status: 405,
                  statusText: "method not allowed",
                  headers: {},
                  config: e
                });
                try {
                  n = function(e, a, i) {
                    const n = i && i.Blob || Se.classes.Blob,
                      o = Ue(e);
                    if (void 0 === a && n && (a = !0), "data" === o) {
                      e = o.length ? e.slice(o.length + 1) : e;
                      const i = Me.exec(e);
                      if (!i) throw new oe("Invalid URL", oe.ERR_INVALID_URL);
                      const s = i[1],
                        t = i[2],
                        r = i[3],
                        c = Buffer.from(decodeURIComponent(r), t ? "base64" : "utf8");
                      if (a) {
                        if (!n) throw new oe("Blob is not supported", oe.ERR_NOT_SUPPORT);
                        return new n([c], {
                          type: s
                        })
                      }
                      return c
                    }
                    throw new oe("Unsupported protocol " + o, oe.ERR_NOT_SUPPORT)
                  }(e.url, "blob" === r, {
                    Blob: e.env && e.env.Blob
                  })
                } catch (a) {
                  throw oe.from(a, oe.ERR_BAD_REQUEST, e)
                }
                return "text" === r ? (n = n.toString(c), c && "utf8" !== c || (n = ne.stripBOM(n))) : "stream" === r && (n = w.default.Readable.from(n)), Ie(a, i, {
                  data: n,
                  status: 200,
                  statusText: "OK",
                  headers: new Fe,
                  config: e
                })
              }
              if (-1 === ta.indexOf(S)) return i(new oe("Unsupported protocol " + S, oe.ERR_BAD_REQUEST, e));
              const j = Fe.from(e.headers).normalize();
              j.set("User-Agent", "axios/" + De, !1);
              const E = e.onDownloadProgress,
                A = e.onUploadProgress,
                O = e.maxRate;
              let N, T;
              if (ne.isSpecCompliantForm(o)) {
                const e = j.getContentType(/boundary=([-_\w\d]{10,70})/i);
                o = Xe(o, (e => {
                  j.set(e)
                }), {
                  tag: `axios-${De}-boundary`,
                  boundary: e && e[1] || void 0
                })
              } else if (ne.isFormData(o) && ne.isFunction(o.getHeaders)) {
                if (j.set(o.getHeaders()), !j.hasContentLength()) try {
                  const e = await b.default.promisify(o.getLength).call(o);
                  Number.isFinite(e) && e >= 0 && j.setContentLength(e)
                } catch (e) {}
              } else if (ne.isBlob(o)) o.size && j.setContentType(o.type || "application/octet-stream"), j.setContentLength(o.size || 0), o = w.default.Readable.from(Ge(o));
              else if (o && !ne.isStream(o)) {
                if (Buffer.isBuffer(o));
                else if (ne.isArrayBuffer(o)) o = Buffer.from(new Uint8Array(o));
                else {
                  if (!ne.isString(o)) return i(new oe("Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream", oe.ERR_BAD_REQUEST, e));
                  o = Buffer.from(o, "utf-8")
                }
                if (j.setContentLength(o.length, !1), e.maxBodyLength > -1 && o.length > e.maxBodyLength) return i(new oe("Request body larger than maxBodyLength limit", oe.ERR_BAD_REQUEST, e))
              }
              const B = ne.toFiniteNumber(j.getContentLength());
              let R, F;
              ne.isArray(O) ? (N = O[0], T = O[1]) : N = T = O, o && (A || N) && (ne.isStream(o) || (o = w.default.Readable.from(o, {
                objectMode: !1
              })), o = w.default.pipeline([o, new He({
                length: B,
                maxRate: ne.toFiniteNumber(N)
              })], ne.noop), A && o.on("progress", (e => {
                A(Object.assign(e, {
                  upload: !0
                }))
              }))), e.auth && (R = (e.auth.username || "") + ":" + (e.auth.password || "")), !R && k.username && (R = k.username + ":" + k.password), R && j.delete("authorization");
              try {
                F = ve(k.pathname + k.search, e.params, e.paramsSerializer).replace(/^\?/, "")
              } catch (a) {
                const n = new Error(a.message);
                return n.config = e, n.url = e.url, n.exists = !0, i(n)
              }
              j.set("Accept-Encoding", "gzip, compress, deflate" + (ia ? ", br" : ""), !1);
              const z = {
                path: F,
                method: p,
                headers: j.toJSON(),
                agents: {
                  http: e.httpAgent,
                  https: e.httpsAgent
                },
                auth: R,
                protocol: S,
                family: t,
                beforeRedirect: ra,
                beforeRedirects: {}
              };
              let C;
              !ne.isUndefined(s) && (z.lookup = s), e.socketPath ? z.socketPath = e.socketPath : (z.hostname = k.hostname, z.port = k.port, ca(z, e.proxy, S + "//" + k.hostname + (k.port ? ":" + k.port : "") + z.path));
              const P = sa.test(z.protocol);
              if (z.agent = P ? e.httpsAgent : e.httpAgent, e.transport ? C = e.transport : 0 === e.maxRedirects ? C = P ? h.default : v.default : (e.maxRedirects && (z.maxRedirects = e.maxRedirects), e.beforeRedirect && (z.beforeRedirects.config = e.beforeRedirect), C = P ? oa : na), e.maxBodyLength > -1 ? z.maxBodyLength = e.maxBodyLength : z.maxBodyLength = 1 / 0, e.insecureHTTPParser && (z.insecureHTTPParser = e.insecureHTTPParser), u = C.request(z, (function(n) {
                  if (u.destroyed) return;
                  const o = [n],
                    s = +n.headers["content-length"];
                  if (E) {
                    const e = new He({
                      length: ne.toFiniteNumber(s),
                      maxRate: ne.toFiniteNumber(T)
                    });
                    E && e.on("progress", (e => {
                      E(Object.assign(e, {
                        download: !0
                      }))
                    })), o.push(e)
                  }
                  let t = n;
                  const l = n.req || u;
                  if (!1 !== e.decompress && n.headers["content-encoding"]) switch ("HEAD" !== p && 204 !== n.statusCode || delete n.headers["content-encoding"], (n.headers["content-encoding"] || "").toLowerCase()) {
                    case "gzip":
                    case "x-gzip":
                    case "compress":
                    case "x-compress":
                      o.push(y.default.createUnzip(ea)), delete n.headers["content-encoding"];
                      break;
                    case "deflate":
                      o.push(new Ze), o.push(y.default.createUnzip(ea)), delete n.headers["content-encoding"];
                      break;
                    case "br":
                      ia && (o.push(y.default.createBrotliDecompress(aa)), delete n.headers["content-encoding"])
                  }
                  t = o.length > 1 ? w.default.pipeline(o, ne.noop) : o[0];
                  const f = w.default.finished(t, (() => {
                      f(), x()
                    })),
                    v = {
                      status: n.statusCode,
                      statusText: n.statusMessage,
                      headers: new Fe(n.headers),
                      config: e,
                      request: l
                    };
                  if ("stream" === r) v.data = t, Ie(a, i, v);
                  else {
                    const n = [];
                    let o = 0;
                    t.on("data", (function(a) {
                      n.push(a), o += a.length, e.maxContentLength > -1 && o > e.maxContentLength && (m = !0, t.destroy(), i(new oe("maxContentLength size of " + e.maxContentLength + " exceeded", oe.ERR_BAD_RESPONSE, e, l)))
                    })), t.on("aborted", (function() {
                      if (m) return;
                      const a = new oe("maxContentLength size of " + e.maxContentLength + " exceeded", oe.ERR_BAD_RESPONSE, e, l);
                      t.destroy(a), i(a)
                    })), t.on("error", (function(a) {
                      u.destroyed || i(oe.from(a, null, e, l))
                    })), t.on("end", (function() {
                      try {
                        let e = 1 === n.length ? n[0] : Buffer.concat(n);
                        "arraybuffer" !== r && (e = e.toString(c), c && "utf8" !== c || (e = ne.stripBOM(e))), v.data = e
                      } catch (a) {
                        return i(oe.from(a, null, e, v.request, v))
                      }
                      Ie(a, i, v)
                    }))
                  }
                  d.once("abort", (e => {
                    t.destroyed || (t.emit("error", e), t.destroy())
                  }))
                })), d.once("abort", (e => {
                  i(e), u.destroy(e)
                })), u.on("error", (function(a) {
                  i(oe.from(a, null, e, u))
                })), u.on("socket", (function(e) {
                  e.setKeepAlive(!0, 6e4)
                })), e.timeout) {
                const a = parseInt(e.timeout, 10);
                if (Number.isNaN(a)) return void i(new oe("error trying to parse `config.timeout` to int", oe.ERR_BAD_OPTION_VALUE, e, u));
                u.setTimeout(a, (function() {
                  if (l) return;
                  let a = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
                  const n = e.transitional || be;
                  e.timeoutErrorMessage && (a = e.timeoutErrorMessage), i(new oe(a, n.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED, e, u)), f()
                }))
              }
              if (ne.isStream(o)) {
                let a = !1,
                  i = !1;
                o.on("end", (() => {
                  a = !0
                })), o.once("error", (e => {
                  i = !0, u.destroy(e)
                })), o.on("close", (() => {
                  a || i || f(new Pe("Request stream has been aborted", e, u))
                })), o.pipe(u)
              } else u.end(o)
            }, new Promise(((e, i) => {
              let n, o;
              const s = (e, a) => {
                  o || (o = !0, n && n(e, a))
                },
                t = e => {
                  s(e, !0), i(e)
                };
              a((a => {
                s(a), e(a)
              }), t, (e => n = e)).catch(t)
            }));
            var a
          },
          ma = Se.hasStandardBrowserEnv ? {
            write(e, a, i, n, o, s) {
              const t = [e + "=" + encodeURIComponent(a)];
              ne.isNumber(i) && t.push("expires=" + new Date(i).toGMTString()), ne.isString(n) && t.push("path=" + n), ne.isString(o) && t.push("domain=" + o), !0 === s && t.push("secure"), document.cookie = t.join("; ")
            },
            read(e) {
              const a = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
              return a ? decodeURIComponent(a[3]) : null
            },
            remove(e) {
              this.write(e, "", Date.now() - 864e5)
            }
          } : {
            write() {},
            read: () => null,
            remove() {}
          },
          da = Se.hasStandardBrowserEnv ? function() {
            const e = /(msie|trident)/i.test(navigator.userAgent),
              a = document.createElement("a");
            let i;

            function n(i) {
              let n = i;
              return e && (a.setAttribute("href", n), n = a.href), a.setAttribute("href", n), {
                href: a.href,
                protocol: a.protocol ? a.protocol.replace(/:$/, "") : "",
                host: a.host,
                search: a.search ? a.search.replace(/^\?/, "") : "",
                hash: a.hash ? a.hash.replace(/^#/, "") : "",
                hostname: a.hostname,
                port: a.port,
                pathname: "/" === a.pathname.charAt(0) ? a.pathname : "/" + a.pathname
              }
            }
            return i = n(window.location.href),
              function(e) {
                const a = ne.isString(e) ? n(e) : e;
                return a.protocol === i.protocol && a.host === i.host
              }
          }() : function() {
            return !0
          };

        function xa(e, a) {
          let i = 0;
          const n = qe(50, 250);
          return o => {
            const s = o.loaded,
              t = o.lengthComputable ? o.total : void 0,
              r = s - i,
              c = n(r);
            i = s;
            const p = {
              loaded: s,
              total: t,
              progress: t ? s / t : void 0,
              bytes: r,
              rate: c || void 0,
              estimated: c && t && s <= t ? (t - s) / c : void 0,
              event: o
            };
            p[a ? "download" : "upload"] = !0, e(p)
          }
        }
        const fa = {
          http: ua,
          xhr: "undefined" != typeof XMLHttpRequest && function(e) {
            return new Promise((function(a, i) {
              let n = e.data;
              const o = Fe.from(e.headers).normalize();
              let s, t, {
                responseType: r,
                withXSRFToken: c
              } = e;

              function p() {
                e.cancelToken && e.cancelToken.unsubscribe(s), e.signal && e.signal.removeEventListener("abort", s)
              }
              if (ne.isFormData(n))
                if (Se.hasStandardBrowserEnv || Se.hasStandardBrowserWebWorkerEnv) o.setContentType(!1);
                else if (!1 !== (t = o.getContentType())) {
                const [e, ...a] = t ? t.split(";").map((e => e.trim())).filter(Boolean) : [];
                o.setContentType([e || "multipart/form-data", ...a].join("; "))
              }
              let l = new XMLHttpRequest;
              if (e.auth) {
                const a = e.auth.username || "",
                  i = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
                o.set("Authorization", "Basic " + btoa(a + ":" + i))
              }
              const u = Le(e.baseURL, e.url);

              function m() {
                if (!l) return;
                const n = Fe.from("getAllResponseHeaders" in l && l.getAllResponseHeaders());
                Ie((function(e) {
                  a(e), p()
                }), (function(e) {
                  i(e), p()
                }), {
                  data: r && "text" !== r && "json" !== r ? l.response : l.responseText,
                  status: l.status,
                  statusText: l.statusText,
                  headers: n,
                  config: e,
                  request: l
                }), l = null
              }
              if (l.open(e.method.toUpperCase(), ve(u, e.params, e.paramsSerializer), !0), l.timeout = e.timeout, "onloadend" in l ? l.onloadend = m : l.onreadystatechange = function() {
                  l && 4 === l.readyState && (0 !== l.status || l.responseURL && 0 === l.responseURL.indexOf("file:")) && setTimeout(m)
                }, l.onabort = function() {
                  l && (i(new oe("Request aborted", oe.ECONNABORTED, e, l)), l = null)
                }, l.onerror = function() {
                  i(new oe("Network Error", oe.ERR_NETWORK, e, l)), l = null
                }, l.ontimeout = function() {
                  let a = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
                  const n = e.transitional || be;
                  e.timeoutErrorMessage && (a = e.timeoutErrorMessage), i(new oe(a, n.clarifyTimeoutError ? oe.ETIMEDOUT : oe.ECONNABORTED, e, l)), l = null
                }, Se.hasStandardBrowserEnv && (c && ne.isFunction(c) && (c = c(e)), c || !1 !== c && da(u))) {
                const a = e.xsrfHeaderName && e.xsrfCookieName && ma.read(e.xsrfCookieName);
                a && o.set(e.xsrfHeaderName, a)
              }
              void 0 === n && o.setContentType(null), "setRequestHeader" in l && ne.forEach(o.toJSON(), (function(e, a) {
                l.setRequestHeader(a, e)
              })), ne.isUndefined(e.withCredentials) || (l.withCredentials = !!e.withCredentials), r && "json" !== r && (l.responseType = e.responseType), "function" == typeof e.onDownloadProgress && l.addEventListener("progress", xa(e.onDownloadProgress, !0)), "function" == typeof e.onUploadProgress && l.upload && l.upload.addEventListener("progress", xa(e.onUploadProgress)), (e.cancelToken || e.signal) && (s = a => {
                l && (i(!a || a.type ? new Pe(null, e, l) : a), l.abort(), l = null)
              }, e.cancelToken && e.cancelToken.subscribe(s), e.signal && (e.signal.aborted ? s() : e.signal.addEventListener("abort", s)));
              const d = Ue(u);
              d && -1 === Se.protocols.indexOf(d) ? i(new oe("Unsupported protocol " + d + ":", oe.ERR_BAD_REQUEST, e)) : l.send(n || null)
            }))
          }
        };
        ne.forEach(fa, ((e, a) => {
          if (e) {
            try {
              Object.defineProperty(e, "name", {
                value: a
              })
            } catch (e) {}
            Object.defineProperty(e, "adapterName", {
              value: a
            })
          }
        }));
        const va = e => `- ${e}`,
          ha = e => ne.isFunction(e) || null === e || !1 === e,
          ba = e => {
            e = ne.isArray(e) ? e : [e];
            const {
              length: a
            } = e;
            let i, n;
            const o = {};
            for (let s = 0; s < a; s++) {
              let a;
              if (i = e[s], n = i, !ha(i) && (n = fa[(a = String(i)).toLowerCase()], void 0 === n)) throw new oe(`Unknown adapter '${a}'`);
              if (n) break;
              o[a || "#" + s] = n
            }
            if (!n) {
              const e = Object.entries(o).map((([e, a]) => `adapter ${e} ` + (!1 === a ? "is not supported by the environment" : "is not available in the build")));
              throw new oe("There is no suitable adapter to dispatch the request " + (a ? e.length > 1 ? "since :\n" + e.map(va).join("\n") : " " + va(e[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT")
            }
            return n
          };

        function ga(e) {
          if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Pe(null, e)
        }

        function ya(e) {
          ga(e), e.headers = Fe.from(e.headers), e.data = ze.call(e, e.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1);
          return ba(e.adapter || Ae.adapter)(e).then((function(a) {
            return ga(e), a.data = ze.call(e, e.transformResponse, a), a.headers = Fe.from(a.headers), a
          }), (function(a) {
            return Ce(a) || (ga(e), a && a.response && (a.response.data = ze.call(e, e.transformResponse, a.response), a.response.headers = Fe.from(a.response.headers))), Promise.reject(a)
          }))
        }
        const wa = e => e instanceof Fe ? e.toJSON() : e;

        function _a(e, a) {
          a = a || {};
          const i = {};

          function n(e, a, i) {
            return ne.isPlainObject(e) && ne.isPlainObject(a) ? ne.merge.call({
              caseless: i
            }, e, a) : ne.isPlainObject(a) ? ne.merge({}, a) : ne.isArray(a) ? a.slice() : a
          }

          function o(e, a, i) {
            return ne.isUndefined(a) ? ne.isUndefined(e) ? void 0 : n(void 0, e, i) : n(e, a, i)
          }

          function s(e, a) {
            if (!ne.isUndefined(a)) return n(void 0, a)
          }

          function t(e, a) {
            return ne.isUndefined(a) ? ne.isUndefined(e) ? void 0 : n(void 0, e) : n(void 0, a)
          }

          function r(i, o, s) {
            return s in a ? n(i, o) : s in e ? n(void 0, i) : void 0
          }
          const c = {
            url: s,
            method: s,
            data: s,
            baseURL: t,
            transformRequest: t,
            transformResponse: t,
            paramsSerializer: t,
            timeout: t,
            timeoutMessage: t,
            withCredentials: t,
            withXSRFToken: t,
            adapter: t,
            responseType: t,
            xsrfCookieName: t,
            xsrfHeaderName: t,
            onUploadProgress: t,
            onDownloadProgress: t,
            decompress: t,
            maxContentLength: t,
            maxBodyLength: t,
            beforeRedirect: t,
            transport: t,
            httpAgent: t,
            httpsAgent: t,
            cancelToken: t,
            socketPath: t,
            responseEncoding: t,
            validateStatus: r,
            headers: (e, a) => o(wa(e), wa(a), !0)
          };
          return ne.forEach(Object.keys(Object.assign({}, e, a)), (function(n) {
            const s = c[n] || o,
              t = s(e[n], a[n], n);
            ne.isUndefined(t) && s !== r || (i[n] = t)
          })), i
        }
        const ka = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach(((e, a) => {
          ka[e] = function(i) {
            return typeof i === e || "a" + (a < 1 ? "n " : " ") + e
          }
        }));
        const Sa = {};
        ka.transitional = function(e, a, i) {
          function n(e, a) {
            return "[Axios v1.6.2] Transitional option '" + e + "'" + a + (i ? ". " + i : "")
          }
          return (i, o, s) => {
            if (!1 === e) throw new oe(n(o, " has been removed" + (a ? " in " + a : "")), oe.ERR_DEPRECATED);
            return a && !Sa[o] && (Sa[o] = !0, console.warn(n(o, " has been deprecated since v" + a + " and will be removed in the near future"))), !e || e(i, o, s)
          }
        };
        const ja = {
            assertOptions: function(e, a, i) {
              if ("object" != typeof e) throw new oe("options must be an object", oe.ERR_BAD_OPTION_VALUE);
              const n = Object.keys(e);
              let o = n.length;
              for (; o-- > 0;) {
                const s = n[o],
                  t = a[s];
                if (t) {
                  const a = e[s],
                    i = void 0 === a || t(a, s, e);
                  if (!0 !== i) throw new oe("option " + s + " must be " + i, oe.ERR_BAD_OPTION_VALUE)
                } else if (!0 !== i) throw new oe("Unknown option " + s, oe.ERR_BAD_OPTION)
              }
            },
            validators: ka
          },
          Ea = ja.validators;
        class Axios {
          constructor(e) {
            this.defaults = e, this.interceptors = {
              request: new he,
              response: new he
            }
          }
          request(e, a) {
            "string" == typeof e ? (a = a || {}).url = e : a = e || {}, a = _a(this.defaults, a);
            const {
              transitional: i,
              paramsSerializer: n,
              headers: o
            } = a;
            void 0 !== i && ja.assertOptions(i, {
              silentJSONParsing: Ea.transitional(Ea.boolean),
              forcedJSONParsing: Ea.transitional(Ea.boolean),
              clarifyTimeoutError: Ea.transitional(Ea.boolean)
            }, !1), null != n && (ne.isFunction(n) ? a.paramsSerializer = {
              serialize: n
            } : ja.assertOptions(n, {
              encode: Ea.function,
              serialize: Ea.function
            }, !0)), a.method = (a.method || this.defaults.method || "get").toLowerCase();
            let s = o && ne.merge(o.common, o[a.method]);
            o && ne.forEach(["delete", "get", "head", "post", "put", "patch", "common"], (e => {
              delete o[e]
            })), a.headers = Fe.concat(s, o);
            const t = [];
            let r = !0;
            this.interceptors.request.forEach((function(e) {
              "function" == typeof e.runWhen && !1 === e.runWhen(a) || (r = r && e.synchronous, t.unshift(e.fulfilled, e.rejected))
            }));
            const c = [];
            let p;
            this.interceptors.response.forEach((function(e) {
              c.push(e.fulfilled, e.rejected)
            }));
            let l, u = 0;
            if (!r) {
              const e = [ya.bind(this), void 0];
              for (e.unshift.apply(e, t), e.push.apply(e, c), l = e.length, p = Promise.resolve(a); u < l;) p = p.then(e[u++], e[u++]);
              return p
            }
            l = t.length;
            let m = a;
            for (u = 0; u < l;) {
              const e = t[u++],
                a = t[u++];
              try {
                m = e(m)
              } catch (e) {
                a.call(this, e);
                break
              }
            }
            try {
              p = ya.call(this, m)
            } catch (e) {
              return Promise.reject(e)
            }
            for (u = 0, l = c.length; u < l;) p = p.then(c[u++], c[u++]);
            return p
          }
          getUri(e) {
            return ve(Le((e = _a(this.defaults, e)).baseURL, e.url), e.params, e.paramsSerializer)
          }
        }
        ne.forEach(["delete", "get", "head", "options"], (function(e) {
          Axios.prototype[e] = function(a, i) {
            return this.request(_a(i || {}, {
              method: e,
              url: a,
              data: (i || {}).data
            }))
          }
        })), ne.forEach(["post", "put", "patch"], (function(e) {
          function a(a) {
            return function(i, n, o) {
              return this.request(_a(o || {}, {
                method: e,
                headers: a ? {
                  "Content-Type": "multipart/form-data"
                } : {},
                url: i,
                data: n
              }))
            }
          }
          Axios.prototype[e] = a(), Axios.prototype[e + "Form"] = a(!0)
        }));
        const Aa = Axios;
        class CancelToken {
          constructor(e) {
            if ("function" != typeof e) throw new TypeError("executor must be a function.");
            let a;
            this.promise = new Promise((function(e) {
              a = e
            }));
            const i = this;
            this.promise.then((e => {
              if (!i._listeners) return;
              let a = i._listeners.length;
              for (; a-- > 0;) i._listeners[a](e);
              i._listeners = null
            })), this.promise.then = e => {
              let a;
              const n = new Promise((e => {
                i.subscribe(e), a = e
              })).then(e);
              return n.cancel = function() {
                i.unsubscribe(a)
              }, n
            }, e((function(e, n, o) {
              i.reason || (i.reason = new Pe(e, n, o), a(i.reason))
            }))
          }
          throwIfRequested() {
            if (this.reason) throw this.reason
          }
          subscribe(e) {
            this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e]
          }
          unsubscribe(e) {
            if (!this._listeners) return;
            const a = this._listeners.indexOf(e); - 1 !== a && this._listeners.splice(a, 1)
          }
          static source() {
            let e;
            return {
              token: new CancelToken((function(a) {
                e = a
              })),
              cancel: e
            }
          }
        }
        const Oa = CancelToken;
        const Na = {
          Continue: 100,
          SwitchingProtocols: 101,
          Processing: 102,
          EarlyHints: 103,
          Ok: 200,
          Created: 201,
          Accepted: 202,
          NonAuthoritativeInformation: 203,
          NoContent: 204,
          ResetContent: 205,
          PartialContent: 206,
          MultiStatus: 207,
          AlreadyReported: 208,
          ImUsed: 226,
          MultipleChoices: 300,
          MovedPermanently: 301,
          Found: 302,
          SeeOther: 303,
          NotModified: 304,
          UseProxy: 305,
          Unused: 306,
          TemporaryRedirect: 307,
          PermanentRedirect: 308,
          BadRequest: 400,
          Unauthorized: 401,
          PaymentRequired: 402,
          Forbidden: 403,
          NotFound: 404,
          MethodNotAllowed: 405,
          NotAcceptable: 406,
          ProxyAuthenticationRequired: 407,
          RequestTimeout: 408,
          Conflict: 409,
          Gone: 410,
          LengthRequired: 411,
          PreconditionFailed: 412,
          PayloadTooLarge: 413,
          UriTooLong: 414,
          UnsupportedMediaType: 415,
          RangeNotSatisfiable: 416,
          ExpectationFailed: 417,
          ImATeapot: 418,
          MisdirectedRequest: 421,
          UnprocessableEntity: 422,
          Locked: 423,
          FailedDependency: 424,
          TooEarly: 425,
          UpgradeRequired: 426,
          PreconditionRequired: 428,
          TooManyRequests: 429,
          RequestHeaderFieldsTooLarge: 431,
          UnavailableForLegalReasons: 451,
          InternalServerError: 500,
          NotImplemented: 501,
          BadGateway: 502,
          ServiceUnavailable: 503,
          GatewayTimeout: 504,
          HttpVersionNotSupported: 505,
          VariantAlsoNegotiates: 506,
          InsufficientStorage: 507,
          LoopDetected: 508,
          NotExtended: 510,
          NetworkAuthenticationRequired: 511
        };
        Object.entries(Na).forEach((([e, a]) => {
          Na[a] = e
        }));
        const Ta = Na;
        const Ba = function e(a) {
          const i = new Aa(a),
            n = k(Aa.prototype.request, i);
          return ne.extend(n, Aa.prototype, i, {
            allOwnKeys: !0
          }), ne.extend(n, i, null, {
            allOwnKeys: !0
          }), n.create = function(i) {
            return e(_a(a, i))
          }, n
        }(Ae);
        Ba.Axios = Aa, Ba.CanceledError = Pe, Ba.CancelToken = Oa, Ba.isCancel = Ce, Ba.VERSION = De, Ba.toFormData = ue, Ba.AxiosError = oe, Ba.Cancel = Ba.CanceledError, Ba.all = function(e) {
          return Promise.all(e)
        }, Ba.spread = function(e) {
          return function(a) {
            return e.apply(null, a)
          }
        }, Ba.isAxiosError = function(e) {
          return ne.isObject(e) && !0 === e.isAxiosError
        }, Ba.mergeConfig = _a, Ba.AxiosHeaders = Fe, Ba.formToJSON = e => je(ne.isHTMLForm(e) ? new FormData(e) : e), Ba.getAdapter = ba, Ba.HttpStatusCode = Ta, Ba.default = Ba, e.exports = Ba
      },
      3765: e => {
        "use strict";
        e.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}')
      },
      8860: e => {
        "use strict";
        e.exports = JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}')
      }
    },
    __webpack_module_cache__ = {};

  function __webpack_require__(e) {
    var a = __webpack_module_cache__[e];
    if (void 0 !== a) return a.exports;
    var i = __webpack_module_cache__[e] = {
      exports: {}
    };
    return __webpack_modules__[e].call(i.exports, i, i.exports, __webpack_require__), i.exports
  }
  var __webpack_exports__ = {};
  (() => {
    const e = __webpack_require__(7147),
      a = __webpack_require__(1017);
    var i = __webpack_require__(2081);
    const n = __webpack_require__(878),
      o = __webpack_require__(9315),
      s = __webpack_require__(6096),
      t = __webpack_require__(6737);
    try {
      n.Fetch.setAxios(__webpack_require__(3306))
    } catch (e) {}
    const r = process.cwd();
    let {
      config: c,
      aipPath: p = "",
      buildPath: l = "",
      buildFile: u = "",
      advinstPath: m = "",
      cwdPath: d = "",
      APPDIRFilenames: x = []
    } = {}, {
      mainAssembly: f,
      buildVersion: v = ""
    } = {};
    console.log(`startAt:${n.Time.nowFormatVN()}:${a.basename(__filename)}:\r\n${JSON.stringify({WEBPACK_BUILD_VERSION:"1.23.1226.0933",__dirname,__filename,cwd:r},null,2)}`), (async () => {
      try {
        await (async () => {
          try {
            let i = __filename;
            for (;;) {
              i = a.dirname(i);
              let n = a.join(i, ".advbuilds");
              if (e.existsSync(n)) {
                d = i;
                let o = a.join(n, "setup.aip");
                e.existsSync(o) && (p = o);
                let s = a.join(n, "setup.aip.json");
                e.existsSync(s) && (c = JSON.parse(e.readFileSync(s, {
                  encoding: "utf8"
                })))
              }
              let o = a.join(i, ".advinst", "bin", "x86", "advinst.exe");
              if (e.existsSync(o) && (m = o), "" !== m && "" !== p && void 0 !== c) break;
              if (i === a.parse(__filename).root) break
            }
            const o = n.Time.nowFormatVNBy("yyyyMMdd-HHmm");
            l = a.join(a.dirname(p), o), u = a.join(l, "commandLineFile.txt"), e.mkdirSync(l, {
              recursive: !0
            }), x = await s.rfs.getAllFiles(d, {
              arrIgnoreStartwithNames: ["."]
            })
          } catch (e) {
            console.error(`error:initializeBuild:${e.message}`), console.error(`${JSON.stringify(e.message)}`)
          } finally {
            console.log(`initializeBuild:::\r\n${JSON.stringify({config:c,aipPath:p,buildPath:l,buildFile:u,advinstPath:m,cwdPath:d},null,2)}`)
          }
        })(), await (async () => {
          try {
            let e = a.join(d, c.MainExe);
            f = await o.getAssemblyFile(e), v = n.Object.GetValueByPathForceString(f, "AssemblyVersion"), n.Type.IsStringNotEmptyIsFalse(v) && (v = n.Object.GetValueByPathForceString(f, "FileVersion"))
          } catch (e) {
            console.error(`error:initializeAssembly:${e.message}`), console.error(`${JSON.stringify(e)}`)
          } finally {
            console.log(`initializeAssembly:::\r\n${JSON.stringify({buildVersion:v,mainAssembly:f,config:c},null,2)}`)
          }
        })(), await (async () => {
          try {
            const i = (a = "") => e.appendFileSync(u, `${a}\n`, {
              encoding: "utf8"
            });
            i(";aic"), i(`SetVersion ${v}`), i(`SetProperty ExecuteVersion="${v}"`);
            const {
              ProductDetail: n,
              OutputPackageName: o,
              Deploy_Libraries: s,
              AdvancedInstallerShortcut: r,
              IconInControlPanel: p
            } = c;
            Object.keys(n).forEach((e => {
              i(`SetProperty ${e}="${n[e]}"`)
            })), i(`SetOutputLocation -buildname DefaultBuild -path ${l}`), x.forEach((e => {
              let n = "APPDIR";
              a.dirname(e).toLowerCase() !== d && (n = a.join("APPDIR", a.dirname(a.relative(d, e)))), i(`AddFile ${n} "${e}" -overwrite always`)
            })), i("Save"), i("Rebuild"), t.Bot863.ologs.githubActions.sendDocument({
              path_file: u
            })
          } catch (e) {
            console.error(`error:create_advCommandLineFile:${e.message}`), console.error(`${JSON.stringify(e.message)}`)
          } finally {
            console.log(`create_advCommandLineFile:::\r\n${JSON.stringify({buildFile:u},null,2)}`)
          }
        })(), await (async () => {
          let n = [];
          try {
            const o = a.join(l, a.basename(p).replace(".aip", ".clone.aip"));
            e.copyFileSync(p, o), n = ["/execute", o, u], i.execFileSync(m, n), e.readdirSync(l, {
              recursive: !0
            }).forEach((e => {
              console.log(e)
            }))
          } catch (e) {
            console.error(`error:run_executeBuild:${e.message}`), console.error(`${JSON.stringify(e.message)}`)
          } finally {
            console.log(`run_executeBuild:::\r\n${JSON.stringify({aipPath:p,advinstPath:m,args:n},null,2)}`)
          }
        })()
      } catch (e) {}
    })()
  })()
})();
 /*!  [adv.js]; ===WEBPACK BUILD: --buildversion=1.23.1226.0933===  */