function getRenderer(n, t) {
  function u() {
    function s(n) {
      for (var h = 50, f = 50, a = 2, e = [], o = [], c = [], i = [], u, s, l, v, y, r = 0; r <= h; ++r) {
        var p = (r * Math.PI) / h,
          w = Math.sin(p),
          nt = Math.cos(p);
        for (u = 0; u <= f; ++u) {
          var b = (u * 2 * Math.PI) / f,
            tt = Math.sin(b),
            it = Math.cos(b),
            k = it * w,
            d = nt,
            g = tt * w,
            rt = 1 - u / f,
            ut = 1 - r / h;
          e.push(a * k);
          e.push(a * d);
          e.push(a * g);
          o.push(k);
          o.push(d);
          o.push(g);
          c.push(rt);
          c.push(ut);
        }
      }
      for (r = 0; r < h; ++r)
        for (u = 0; u < f; ++u)
          (s = r * (f + 1) + u),
            (l = s + f + 1),
            i.push(s),
            i.push(l),
            i.push(s + 1),
            i.push(l),
            i.push(l + 1),
            i.push(s + 1);
      e = new Float32Array(e);
      o = new Float32Array(o);
      c = new Float32Array(c);
      i = new Uint16Array(i);
      var ft = n.createBuffer(),
        et = n.createBuffer(),
        ot = n.createBuffer();
      return (
        n.bindBuffer(n.ARRAY_BUFFER, ft),
        n.bufferData(n.ARRAY_BUFFER, e, n.STATIC_DRAW),
        (v = n.getAttribLocation(t, "c")),
        n.vertexAttribPointer(v, 3, n.FLOAT, !1, 0, 0),
        n.enableVertexAttribArray(v),
        n.bindBuffer(n.ARRAY_BUFFER, et),
        n.bufferData(n.ARRAY_BUFFER, o, n.STATIC_DRAW),
        (y = n.getAttribLocation(t, "d")),
        n.vertexAttribPointer(y, 3, n.FLOAT, !1, 0, 0),
        n.enableVertexAttribArray(y),
        n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, ot),
        n.bufferData(n.ELEMENT_ARRAY_BUFFER, i, n.STATIC_DRAW),
        i.length
      );
    }
    function h() {
      var u, f, y, a, h, v, p, w, b, k, d;
      if ((n = l()))
        return (
          (u = n.createShader(n.VERTEX_SHADER)),
          n.shaderSource(u, e),
          n.compileShader(u),
          (f = n.createShader(n.FRAGMENT_SHADER)),
          n.shaderSource(f, o),
          n.compileShader(f),
          (t = n.createProgram()),
          n.attachShader(t, u),
          n.attachShader(t, f),
          n.linkProgram(t),
          n.detachShader(t, u),
          n.detachShader(t, f),
          n.deleteShader(u),
          n.deleteShader(f),
          n.useProgram(t),
          (y = s(n)),
          n.clearColor(0, 0, 0, 1),
          n.enable(n.DEPTH_TEST),
          (a = r.create()),
          r.perspective(a, Math.PI / 6, 1, 0.1, 100),
          (h = r.create()),
          r.lookAt(h, [0, 0, 10], [0, 0, 0], [0, 1, 0]),
          (v = r.create()),
          r.multiply(v, a, h),
          (p = n.getUniformLocation(t, "h")),
          n.uniformMatrix4fv(p, !1, h),
          (w = n.getUniformLocation(t, "i")),
          n.uniformMatrix4fv(w, !1, v),
          (b = n.getUniformLocation(t, "e")),
          n.uniform4fv(b, [10, 10, 10, 1]),
          (k = n.getUniformLocation(t, "f")),
          n.uniform3fv(k, [0.9, 0.5, 0.3]),
          (d = n.getUniformLocation(t, "g")),
          n.uniform3fv(d, [1, 1, 1]),
          n.clear(n.COLOR_BUFFER_BIT | n.DEPTH_BUFFER_BIT),
          n.drawElements(n.TRIANGLES, y, n.UNSIGNED_SHORT, 0),
          c(),
          i.toDataURL()
        );
    }
    function c() {
      n.useProgram(null);
      t && n.deleteProgram(t);
    }
    function l() {
      i.width = 67;
      i.height = 67;
      var n = i.getContext("webgl") || i.getContext("experimental-webgl");
      return n && (n.viewport(0, 0, 67, 67), n.clearColor(0, 0, 0, 1), n.clear(n.COLOR_BUFFER_BIT)), n;
    }
    var n,
      t,
      i,
      e =
        "attribute vec3 c,d; uniform vec4 e; uniform vec3 f,g;uniform mat4 h,i;varying vec3 j;void main(){vec3 a=normalize(d);vec4 b=h*vec4(c,1.);vec3 k=normalize(vec3(e-b));j=g*f*max(dot(k,a),0.),gl_Position=i*vec4(c,1.);}",
      o = "#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec3 j;void main(){gl_FragColor = vec4(j, 1.0);}",
      r = {
        create: function () {
          for (var t = new Array(16), n = 0; n < 16; n++) t[n] = n % 5 == 0 ? 1 : 0;
          return t;
        },
        perspective: function (n, t, i, r, u) {
          var e = 1 / Math.tan(t / 2),
            f;
          return (
            (n[0] = e / i),
            (n[1] = 0),
            (n[2] = 0),
            (n[3] = 0),
            (n[4] = 0),
            (n[5] = e),
            (n[6] = 0),
            (n[7] = 0),
            (n[8] = 0),
            (n[9] = 0),
            (n[11] = -1),
            (n[12] = 0),
            (n[13] = 0),
            (n[15] = 0),
            u != null && u !== Infinity
              ? ((f = 1 / (r - u)), (n[10] = (u + r) * f), (n[14] = 2 * u * r * f))
              : ((n[10] = -1), (n[14] = -2 * r)),
            n
          );
        },
        lookAt: function (n, t, i, u) {
          var h,
            c,
            l,
            a,
            v,
            y,
            e,
            o,
            s,
            f,
            p = t[0],
            w = t[1],
            b = t[2],
            k = u[0],
            d = u[1],
            g = u[2],
            nt = i[0],
            tt = i[1],
            it = i[2];
          return Math.abs(p - nt) < 1e-6 && Math.abs(w - tt) < 1e-6 && Math.abs(b - it) < 1e-6
            ? r.identity(n)
            : ((e = p - nt),
              (o = w - tt),
              (s = b - it),
              (f = 1 / Math.hypot(e, o, s)),
              (e *= f),
              (o *= f),
              (s *= f),
              (h = d * s - g * o),
              (c = g * e - k * s),
              (l = k * o - d * e),
              (f = Math.hypot(h, c, l)),
              f ? ((f = 1 / f), (h *= f), (c *= f), (l *= f)) : ((h = 0), (c = 0), (l = 0)),
              (a = o * l - s * c),
              (v = s * h - e * l),
              (y = e * c - o * h),
              (f = Math.hypot(a, v, y)),
              f ? ((f = 1 / f), (a *= f), (v *= f), (y *= f)) : ((a = 0), (v = 0), (y = 0)),
              (n[0] = h),
              (n[1] = a),
              (n[2] = e),
              (n[3] = 0),
              (n[4] = c),
              (n[5] = v),
              (n[6] = o),
              (n[7] = 0),
              (n[8] = l),
              (n[9] = y),
              (n[10] = s),
              (n[11] = 0),
              (n[12] = -(h * p + c * w + l * b)),
              (n[13] = -(a * p + v * w + y * b)),
              (n[14] = -(e * p + o * w + s * b)),
              (n[15] = 1),
              n);
        },
        multiply: function (n, t, i) {
          var o = t[0],
            s = t[1],
            h = t[2],
            c = t[3],
            l = t[4],
            a = t[5],
            v = t[6],
            y = t[7],
            p = t[8],
            w = t[9],
            b = t[10],
            k = t[11],
            d = t[12],
            g = t[13],
            nt = t[14],
            tt = t[15],
            r = i[0],
            u = i[1],
            f = i[2],
            e = i[3];
          return (
            (n[0] = r * o + u * l + f * p + e * d),
            (n[1] = r * s + u * a + f * w + e * g),
            (n[2] = r * h + u * v + f * b + e * nt),
            (n[3] = r * c + u * y + f * k + e * tt),
            (r = i[4]),
            (u = i[5]),
            (f = i[6]),
            (e = i[7]),
            (n[4] = r * o + u * l + f * p + e * d),
            (n[5] = r * s + u * a + f * w + e * g),
            (n[6] = r * h + u * v + f * b + e * nt),
            (n[7] = r * c + u * y + f * k + e * tt),
            (r = i[8]),
            (u = i[9]),
            (f = i[10]),
            (e = i[11]),
            (n[8] = r * o + u * l + f * p + e * d),
            (n[9] = r * s + u * a + f * w + e * g),
            (n[10] = r * h + u * v + f * b + e * nt),
            (n[11] = r * c + u * y + f * k + e * tt),
            (r = i[12]),
            (u = i[13]),
            (f = i[14]),
            (e = i[15]),
            (n[12] = r * o + u * l + f * p + e * d),
            (n[13] = r * s + u * a + f * w + e * g),
            (n[14] = r * h + u * v + f * b + e * nt),
            (n[15] = r * c + u * y + f * k + e * tt),
            n
          );
        },
        identity: function (n) {
          return (
            (n[0] = 1),
            (n[1] = 0),
            (n[2] = 0),
            (n[3] = 0),
            (n[4] = 0),
            (n[5] = 1),
            (n[6] = 0),
            (n[7] = 0),
            (n[8] = 0),
            (n[9] = 0),
            (n[10] = 1),
            (n[11] = 0),
            (n[12] = 0),
            (n[13] = 0),
            (n[14] = 0),
            (n[15] = 1),
            n
          );
        },
      },
      f = 0,
      u;
    return (i = document.createElement("canvas")), i != null && ((u = h()), u && (f = v(u))), f;
  }
  function a() {
    function i() {
      this.samples = [];
      this.active = 0;
    }
    function r(t) {
      t.terminate();
      n(t.state);
    }
    function u(t) {
      clearTimeout(t.currentTarget.timeout);
      var i = t.currentTarget.state;
      t.currentTarget.terminate();
      i.samples = i.samples.concat(t.data);
      n(i);
    }
    function n(n) {
      n.active--;
      n.active === 0 && ((e = n.samples), n.resolve(e));
    }
    function f(n, t, f) {
      var o = [],
        h = new i(),
        s,
        e;
      h.resolve = n;
      h.reject = t;
      try {
        for (e = 0; e < 2; e++)
          (s = new Worker(f)),
            (s.state = h),
            (s.onmessage = u),
            (s.onerror = function (n) {
              t(n);
            }),
            o.push(s);
        for (e = 0; e < o.length; e++) h.active++, o[e].postMessage(80), (o[e].timeout = setTimeout(r, 4e3, o[e]));
      } catch (c) {
        t(new Error(c));
      }
    }
    function o(n, t, i) {
      fetch(i, { mode: "same-origin" })
        .then(function (i) {
          if (i.ok) f(n, t, i.url);
          else {
            var r = new Error("Url could not be reached");
            r.response = i;
            t(r);
          }
        })
        .catch(function (n) {
          t(n);
        });
    }
    return new Promise(function (n, i) {
      e != null
        ? n(e)
        : setTimeout(function () {
            o(n, i, t);
          }, 1e3);
    });
  }
  function f(t) {
    return a()
      .then(function (n) {
        var i = 0,
          r;
        n.length > 0 &&
          ((r = n.reduce(function (n, t) {
            return t + n;
          })),
          (i = r / n.length));
        c(t, i, 0);
      })
      .catch(function () {
        n(t.x);
      });
  }
  function o(t) {
    return a()
      .then(function (n) {
        var i = 0,
          r,
          u;
        n.length > 0 &&
          ((r = n.reduce(function (n, t) {
            return t + n;
          })),
          (u = n.length > 0 ? r / n.length : 0),
          (i =
            n.reduce(function (n, t) {
              return n + Math.pow(t - u, 2);
            }, 0) /
            (n.length - 1)));
        c(t, i, 0);
      })
      .catch(function () {
        n(t.x);
      });
  }
  function v(n) {
    for (var t = 2166136261, i = 0; i < n.length; ++i)
      (t ^= n.charCodeAt(i)), (t += (t << 1) + (t << 4) + (t << 7) + (t << 8) + (t << 24));
    return t >>> 0;
  }
  function i() {
    function r(n) {
      n.width = 67;
      n.height = 67;
      var t = n.getContext("2d", { alpha: !0 });
      if (t != null)
        return (
          (t.imageSmoothingQuality = "low"),
          (t.imageSmoothingEnabled = !0),
          (t.globalCompositeOperation = "source-over"),
          (t.globalAlpha = 1),
          (t.miterLimit = Infinity),
          (t.filter = "none"),
          (t.lineCap = "butt"),
          (t.lineDashOffset = 0),
          (t.lineJoin = "miter"),
          (t.font = "10pt Arial"),
          (t.lineWidth = 2),
          t.setLineDash !== undefined && t.setLineDash([10, 20]),
          (t.shadowColor = "black"),
          (t.shadowOffsetX = -3),
          (t.shadowOffsetY = -5),
          t.translate(n.width / 2, n.height / 2),
          t.rotate(0.8901179),
          (t.fillStyle = "green"),
          (t.textAlign = "center"),
          (t.textBaseline = "middle"),
          t.fillText("*51Degrees*", 0, 0),
          t.beginPath(),
          (t.shadowColor = "yellow"),
          (t.shadowBlur = 1),
          (t.shadowOffsetX = 1),
          (t.shadowOffsetY = 1),
          (t.strokeStyle = "red"),
          (t.fillStyle = "rgba(0, 0, 255, 0.6)"),
          t.ellipse === undefined
            ? t.arc(0, 0, 25, 0, 2 * Math.PI)
            : t.ellipse(0, 0, 25, 15, Math.PI / 4, 0, 2 * Math.PI),
          t.fill(),
          t.stroke(),
          n.toDataURL()
        );
    }
    var t = 0,
      i = document.createElement("canvas"),
      n;
    return i != null && ((n = r(i)), n && (t = v(n))), t;
  }
  function h() {
    return window.screen.height * window.devicePixelRatio;
  }
  function y(n) {
    return window.matchMedia(n).matches;
  }
  function p(n, t) {
    for (var i = 0; i < t.length; i++) if (y("(" + n + ": " + t[i] + ")")) return t[i];
    return "n/a";
  }
  function r() {
    return p("color-gamut", ["p3", "srgb"]);
  }
  function w() {
    var n = /iPhone|iPad|Macintosh/.exec(navigator.userAgent);
    return n && n.length > 0 ? n[0] : "";
  }
  function c(t, i, r) {
    for (var u, o, f, e = 0; e < t.n.length; e++)
      if (((u = l[t.n[e]]), u.r)) {
        for (o = 0; o < u.r.length; o++)
          if (((f = u.r[o]), (f.a === null || i >= f.a) && (f.b === null || i <= f.b))) {
            s(u, 0);
            return;
          }
      } else if (u.v && u.v.indexOf(i) != -1) {
        s(u, 0);
        return;
      }
    t.n.length > 0 &&
      r < 10 &&
      setTimeout(function () {
        s(t, r + 1);
      }, 10);
    n(t.x);
  }
  function s(t, i) {
    if (t.m) {
      var r = t.m(t);
      r || r === "" ? r.then || c(t, r, i) : t.x && n(t.x);
    } else n(t.x);
  }
  var l = [
      {
        x: "Unknown",
        m: function (n) {
          return w(n);
        },
        n: [2, 1, 3],
      },
      {
        x: "Apple A7 GPU|Apple A8 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A12 GPU|Apple A13 GPU",
        m: function (n) {
          return h(n);
        },
        n: [9, 10, 11, 5, 6, 7, 8, 4],
        v: ["iPhone"],
      },
      {
        x: "Apple A7 GPU|Apple A8 GPU|Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A12X GPU|Apple A10 GPU|Apple A12 GPU|Apple A8X GPU",
        m: function (n) {
          return h(n);
        },
        n: [16, 15, 14, 13, 12],
        v: ["iPad"],
      },
      {
        x: "Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A12X GPU|Apple A12 GPU|Apple A8 GPU|Apple A8X GPU|Apple A13 GPU",
        m: function (n) {
          return h(n);
        },
        n: [16, 15, 14, 9, 10, 11, 13, 18, 21, 19, 20, 8, 17],
        v: ["Macintosh"],
      },
      {
        x: "Apple A7 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU|Apple A8 GPU",
        m: function (n) {
          return r(n);
        },
        n: [23, 22],
        v: [1136],
      },
      {
        x: "Apple A8 GPU|Apple A10 GPU|Apple A11 GPU|Apple A9 GPU",
        m: function (n) {
          return r(n);
        },
        n: [24, 23],
        v: [2001],
      },
      {
        x: "Apple A8 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return r(n);
        },
        n: [25, 26],
        v: [2208],
      },
      {
        x: "Apple A8 GPU|Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return r(n);
        },
        n: [27, 28],
        v: [1334],
      },
      {
        x: "Apple A11 GPU|Apple A12 GPU|Apple A13 GPU",
        m: function (n) {
          return u(n);
        },
        n: [30, 31, 29],
        v: [2436],
      },
      {
        x: "Apple A12 GPU|Apple A13 GPU",
        m: function (n) {
          return u(n);
        },
        n: [31, 29],
        v: [2688],
      },
      {
        x: "Apple A12 GPU|Apple A13 GPU",
        m: function (n) {
          return u(n);
        },
        n: [31, 29],
        v: [1624],
      },
      {
        x: "Apple A12 GPU|Apple A13 GPU",
        m: function (n) {
          return u(n);
        },
        n: [31, 29],
        v: [1792],
      },
      {
        x: "Apple A7 GPU|Apple A8 GPU|Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A12X GPU|Apple A10 GPU|Apple A12 GPU|Apple A8X GPU",
        m: function (n) {
          return r(n);
        },
        n: [33, 32],
        v: [2048],
      },
      {
        x: "Apple A9X GPU|Apple A10X GPU|Apple A12X GPU",
        m: function (n) {
          return r(n);
        },
        n: [34, 35],
        v: [2732],
      },
      {
        x: "Apple A10X GPU|Apple A12 GPU",
        m: function (n) {
          return i(n);
        },
        n: [37, 36],
        v: [2224],
      },
      { x: "Apple A12X GPU", v: [2388] },
      { x: "Apple A10 GPU", v: [2160] },
      {
        x: "Apple A9X GPU|Apple A10X GPU|Apple A9 GPU|Apple A12X GPU|Apple A10 GPU|Apple A12 GPU|Apple A8 GPU|Apple A8X GPU",
        m: function (n) {
          return r(n);
        },
        n: [33, 38],
        v: [2048],
      },
      {
        x: "Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return r(n);
        },
        n: [39, 26],
        v: [2208],
      },
      {
        x: "Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return r(n);
        },
        n: [39, 28],
        v: [1334],
      },
      {
        x: "Apple A9 GPU|Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return r(n);
        },
        n: [39, 23],
        v: [1136],
      },
      {
        x: "Apple A10 GPU|Apple A11 GPU|Apple A9 GPU",
        m: function (n) {
          return r(n);
        },
        n: [39, 23],
        v: [2001],
      },
      {
        x: "Apple A7 GPU|Apple A9 GPU|Apple A8 GPU",
        m: function (n) {
          return i(n);
        },
        n: [40, 42, 41],
        v: ["srgb"],
      },
      {
        x: "Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return i(n);
        },
        n: [43, 44],
        v: ["p3"],
      },
      {
        x: "Apple A8 GPU|Apple A9 GPU",
        m: function (n) {
          return i(n);
        },
        n: [45, 46],
        v: ["srgb"],
      },
      {
        x: "Apple A8 GPU|Apple A9 GPU",
        m: function (n) {
          return i(n);
        },
        n: [47, 41],
        v: ["srgb"],
      },
      {
        x: "Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return i(n);
        },
        n: [43, 48],
        v: ["p3"],
      },
      {
        x: "Apple A8 GPU|Apple A9 GPU",
        m: function (n) {
          return i(n);
        },
        n: [49, 41],
        v: ["srgb"],
      },
      {
        x: "Apple A10 GPU|Apple A11 GPU",
        m: function (n) {
          return i(n);
        },
        n: [50, 51],
        v: ["p3"],
      },
      { x: "Apple A12 GPU", v: [4085158452] },
      { x: "Apple A11 GPU", v: [1220644697] },
      { x: "Apple A13 GPU", v: [4193218782] },
      {
        x: "Apple A7 GPU|Apple A8 GPU|Apple A9X GPU|Apple A9 GPU|Apple A10 GPU|Apple A8X GPU",
        m: function (n) {
          return i(n);
        },
        n: [55, 52, 56, 57, 58, 53, 54, 40],
        v: ["srgb"],
      },
      {
        x: "Apple A10X GPU|Apple A9X GPU|Apple A12X GPU|Apple A12 GPU",
        m: function (n) {
          return i(n);
        },
        n: [61, 59, 60],
        v: ["p3"],
      },
      { x: "Apple A9X GPU", v: ["srgb"] },
      {
        x: "Apple A10X GPU|Apple A12X GPU",
        m: function (n) {
          return i(n);
        },
        n: [36, 62],
        v: ["p3"],
      },
      { x: "Apple A10X GPU", v: [2114570256, 3129316290] },
      { x: "Apple A12 GPU", v: [1349146759, 2917249763] },
      {
        x: "Apple A9X GPU|Apple A9 GPU|Apple A10 GPU|Apple A8 GPU|Apple A8X GPU",
        m: function (n) {
          return i(n);
        },
        n: [55, 65, 63, 64, 53, 54],
        v: ["srgb"],
      },
      { x: "Apple A9 GPU", v: ["srgb"] },
      { x: "Apple A7 GPU", v: [857422828, 1915583345] },
      { x: "Apple A9 GPU", v: [46663968, 2114570256, 3129316290] },
      { x: "Apple A8 GPU", v: [839732043, 3816812018, 4125234388] },
      { x: "Apple A10 GPU", v: [2114570256, 3129316290] },
      { x: "Apple A11 GPU", v: [1349146759, 2917249763] },
      { x: "Apple A8 GPU", v: [1411440593, 1924197914, 4125234388] },
      { x: "Apple A9 GPU", v: [2114570256, 3129316290] },
      {
        x: "Apple A8 GPU",
        v: [1411440593, 1913250432, 3074367344, 4125234388],
      },
      { x: "Apple A11 GPU", v: [2917249763, 3237505312] },
      { x: "Apple A8 GPU", v: [3128296539, 3816812018, 4125234388] },
      { x: "Apple A10 GPU", v: [46663968, 2114570256, 3129316290] },
      { x: "Apple A11 GPU", v: [1349146759, 2917249763, 3237505312] },
      { x: "Apple A8 GPU", v: [2656686317, 3710391565] },
      {
        x: "Apple A9X GPU|Apple A9 GPU|Apple A10 GPU",
        m: function (n) {
          return f(n);
        },
        n: [68, 69, 66, 67],
        v: [3129316290],
      },
      {
        x: "Apple A9 GPU|Apple A9X GPU|Apple A10 GPU",
        m: function (n) {
          return f(n);
        },
        n: [72, 70, 73, 71],
        v: [2114570256],
      },
      { x: "Apple A10 GPU", v: [46663968] },
      {
        x: "Apple A8 GPU|Apple A8X GPU",
        m: function (n) {
          return f(n);
        },
        n: [75, 74],
        v: [4125234388],
      },
      {
        x: "Apple A8 GPU|Apple A8X GPU",
        m: function (n) {
          return u(n);
        },
        n: [76, 77],
        v: [4005673483],
      },
      {
        x: "Apple A8 GPU|Apple A8X GPU",
        v: [1350183384, 1361285941, 3816812018],
      },
      {
        x: "Apple A10X GPU|Apple A9X GPU",
        m: function (n) {
          return f(n);
        },
        n: [78, 79],
        v: [3129316290],
      },
      {
        x: "Apple A9X GPU|Apple A10X GPU",
        m: function (n) {
          return f(n);
        },
        n: [80, 81],
        v: [2114570256],
      },
      { x: "Apple A12X GPU|Apple A12 GPU", v: [1349146759, 2917249763] },
      { x: "Apple A12X GPU", v: [1349146759, 2917249763] },
      {
        x: "Apple A8 GPU|Apple A8X GPU",
        m: function (n) {
          return o(n);
        },
        n: [82, 83],
        v: [4005673483],
      },
      { x: "Apple A8 GPU|Apple A8X GPU", v: [1361285941] },
      { x: "Apple A8X GPU", v: [1350183384, 3816812018, 4125234388] },
      { x: "Apple A10 GPU", r: [{ a: 13.66, b: 16.36 }] },
      {
        x: "Apple A9 GPU|Apple A9X GPU",
        m: function (n) {
          return o(n);
        },
        n: [84],
        r: [{ a: 19.06, b: 21.29 }],
      },
      { x: "Apple A9 GPU", r: [{ a: 22.45, b: 25.26 }] },
      { x: "Apple A9 GPU", r: [{ a: 21.59, b: 22.44 }] },
      { x: "Apple A10 GPU", r: [{ a: 13.78, b: 16.67 }] },
      { x: "Apple A9X GPU|Apple A10 GPU", r: [{ a: 16.68, b: 18.55 }] },
      { x: "Apple A9 GPU", r: [{ a: 21.35, b: 34.09 }] },
      {
        x: "Apple A9 GPU|Apple A9X GPU",
        m: function (n) {
          return o(n);
        },
        n: [85],
        r: [{ a: 19.54, b: 21.34 }],
      },
      {
        x: "Apple A8 GPU|Apple A8X GPU",
        m: function (n) {
          return o(n);
        },
        n: [86, 87],
        r: [{ a: 27.91, b: 30.91 }],
      },
      { x: "Apple A8 GPU", r: [{ a: 30.92, b: 31.88 }] },
      { x: "Apple A8X GPU", v: [1783160115] },
      { x: "Apple A8 GPU", v: [3928382683] },
      { x: "Apple A10X GPU", r: [{ a: 14.49, b: 15.29 }] },
      { x: "Apple A9X GPU", r: [{ a: 16.34, b: 387.31 }] },
      { x: "Apple A10X GPU", r: [{ a: 13.91, b: 15.11 }] },
      { x: "Apple A9X GPU", r: [{ a: 16.64, b: 36.84 }] },
      { x: "Apple A8X GPU", r: [{ a: 0.37, b: 1.99 }] },
      { x: "Apple A8 GPU", r: [{ a: 37.57, b: 10072.46 }] },
      { x: "Apple A9X GPU|Apple A9 GPU", r: [{ a: 0.26, b: 115.16 }] },
      { x: "Apple A9X GPU|Apple A9 GPU", r: [{ a: 0.79, b: 331.46 }] },
      { x: "Apple A8X GPU", r: [{ a: 0.26, b: 5.67 }] },
      { x: "Apple A8 GPU", r: [{ a: 6.13, b: 177.99 }] },
    ],
    e = null;
  s(l[0], 0);
}
// ("use strict");
function getIphoneModel() {
  var devices = {
    "Apple A7 GPU": {
      1136: ["iPhone 5", "iPhone 5s"],
      2048: ["iPad Air", "iPad Mini 2", "iPad Mini 3"],
    },

    "Apple A8 GPU": {
      1334: ["iPhone 6"],
      2208: ["iPhone 6 Plus"],
      2048: ["iPad Air 2", "iPad Mini 4"],
    },

    "Apple A9 GPU": {
      1136: ["iPhone SE"],
      1334: ["iPhone 6s"],
      2208: ["iPhone 6s Plus"],
    },

    "Apple A10 GPU": {
      1334: ["iPhone 7"],
      2208: ["iPhone 7 Plus"],
    },

    "Apple A11 GPU": {
      1334: ["iPhone 8"],
      2208: ["iPhone 8 Plus"],
      2436: ["iPhone X"],
    },

    "Apple A12 GPU": {
      2436: ["iPhone XS"],
      2688: ["iPhone XS MAX"],
      1792: ["iphone XR"],
    },

    "Apple A13 GPU": {
      2436: ["iPhone 11Pro"],
      2688: ["iPhone 11Pro MAX"],
      1792: ["iphone 11"],
    },
  };

  function getScreenWidth() {
    createEl(`window.screen.width:${window.screen.width}`);
    createEl(`window.screen.height:${window.screen.height}`);
    createEl(`window.devicePixelRatio:${window.devicePixelRatio}`);
    return Math.max(window.screen.width, window.screen.height) * (window.devicePixelRatio || 1);
  }
  getScreenWidth()

  function getGlRenderer() {
    var GPU;
    getRenderer(function (value) {
      if (value == "Unknown") {
        var canvas = document.createElement("canvas");
        if (canvas != null) {
          var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
          if (context) {
            var info = context.getExtension("WEBGL_debug_renderer_info");
            createEl(`WEBGL_debug_renderer_info:${info}`);
            if (info) {
              value = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
              createEl(`UNMASKED_RENDERER_WEBGL:${value}`);
            }
          }
        }
      }
      GPU = value;
    });
    return GPU;
  }
  getGlRenderer()
  function getModels() {
    var models,
      device = devices[getGlRenderer()];
    if (device == undefined) {
      models = ["iPhone"];
    } else {
      models = device[getScreenWidth()];
      if (models == undefined) {
        models = ["iPhone"];
      }
    }
    return models;
  }
  return getModels()[0];
}
createEl(`navigator.userAgent:${navigator.userAgent}`);

export default getIphoneModel;
function createEl(params) {
  const el = document.createElement("div");
  el.innerText = params;
  document.querySelector("body").appendChild(el);
}
