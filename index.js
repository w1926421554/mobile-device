class UserModelProducer {
  constructor() {
    if (window.wbskModelAPISingleton) {
      return window.wbskModelAPISingleton;
    }
    window.wbskModelAPISingleton = this;
    (this.key = "wurflBurgaKey"), (this.ObserverLite = new ObserverLite());
    this.userModel = false;
    this.init();
  }

  subscribe(callback) {
    return this.ObserverLite.subscribe(callback);
  }

  next(data) {
    this.ObserverLite.next(data);
  }

  isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return isMobile || hasTouchScreen;
  }

  getWurflLocal() {
    let data = localStorage.getItem(this.key);
    try {
      data = JSON.parse(data);
      return data;
    } catch (err) {
      return false;
    }
  }

  init() {
    if (!this.isMobileDevice()) {
      this.update(false);
      return;
    }

    let wurfl = this.getWurflLocal();
    if (wurfl?.device_name) {
      this.update(this.parseWurfl(wurfl.device_name));
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//wjs.wurflcloud.com/wurfl.js?time_limit=1000";
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    document.addEventListener("WurflJSDetectionComplete", () => {
      localStorage.setItem(this.key, JSON.stringify(window.WURFL));
      wurfl = window.WURFL;
      this.update(this.parseWurfl(wurfl.device_name));
    });
  }

  update(model) {
    this.userModel = model || this.userModel;
    this.next(this);
  }

  parseWurfl(device_name) {
    const models = window.wbskGlobal.phoneCaseModelTypes;
    let model = models.filter((item) => item.wurfl_name.indexOf(device_name) >= 0);
    model = model.length ? model[0].title : false;
    return model;
  }
}


class ObserverLite {
  constructor(e) {
    if (((e = e || {}), (this.id = Math.floor(999999999999 * Math.random())), (this.settings = e), e.key)) {
      if (
        ((window.GlobalObersverLiteInstances = window.GlobalObersverLiteInstances || {}),
        window.GlobalObersverLiteInstances[e.key])
      )
        return window.GlobalObersverLiteInstances[e.key];
      window.GlobalObersverLiteInstances[e.key] = this;
    }
  }
  once() {
    return new Promise((e, t) => {
      this.onceDone && e(this.onceDone);
      const s = this.subscribe((t) => {
        (t = t || !0), (this.onceDone = t), e(t), this.unsubscribe(s);
      });
    });
  }
  setOnce(e) {
    (e = e || !0), (this.onceDone = e);
  }
  next(...e) {
    this.onceDone || this.setOnce(...e),
      this.subject &&
        this.subject.length &&
        this.subject.forEach(({ callback: t }) => {
          t(...e);
        });
  }
  subscribe(e) {
    return (
      (this.subject = this.subject || []),
      (e = {
        callback: e,
        id: Math.floor(1e14 + 9e14 * Math.random()),
      }),
      this.subject.push(e),
      e
    );
  }
  unsubscribe(e) {
    this.subject = this.subject.filter(({ id: t }) => t !== e.id);
  }
  unsubscribeAll(e) {
    this.subject?.forEach((e) => this.unsubscribe(e)), e && (this.onceDone = !1);
  }
}







var WURFL = {
    advertised_browser: "Chrome Mobile on iOS",
    advertised_browser_version: "126.0.6478.153",
    advertised_device_os: "iOS",
    advertised_device_os_version: "17.2",
    brand_name: "Apple",
    complete_device_name: "Apple iPhone",
    form_factor: "Smartphone",
    is_app_webview: !1,
    is_full_desktop: !1,
    is_mobile: !0,
    is_robot: !1,
    is_smartphone: !0,
    is_smarttv: !1,
    is_tablet: !1,
    manufacturer_name: "",
    marketing_name: "",
    max_image_height: 568,
    max_image_width: 320,
    model_name: "iPhone",
    physical_screen_height: 89,
    physical_screen_width: 50,
    pointing_method: "touchscreen",
    resolution_height: 1136,
    resolution_width: 640,
  },
  WurflJSNavigatorUAData,
  wurfl_candidates,
  wurfl_debug,
  wurfl_async,
  wurfljs_host,
  wurfljs_cache_ttl,
  wurfl_time_limit,
  WurflJsResolver;
typeof window == "object" &&
  "navigator" in window &&
  !("userAgentData" in window.navigator) &&
  ((WurflJSNavigatorUAData = (function () {
    var e = function (e, t) {
      (this.brands = []), (this.mobile = !1), (this.platform = "");
      var n,
        i,
        r,
        c,
        l,
        p,
        s = "",
        o = "",
        g = [],
        d = "",
        f = "",
        m = "",
        h = e,
        a = e.navigator,
        u = t;
      (this.toJSON = function () {
        return JSON.stringify({ brands: this.brands, mobile: this.mobile, platform: this.platform });
      }),
        (n = this),
        (this.getHighEntropyValues = function (e) {
          var n,
            t = new Promise(function (t) {
              h.WURFLPromises.complete.then(function (n) {
                c(n.WURFL), t(l(e));
              });
            });
          return u === -1
            ? t
            : ((n = new Promise(function (t) {
                setTimeout(function () {
                  t(l(e));
                }, u);
              })),
              Promise.race([t, n]).then(function (e) {
                return e;
              }));
        }),
        (l = function (e) {
          var t,
            r,
            i = { architecture: s, bitness: o, fullVersionList: g, model: d, platformVersion: f, uaFullVersion: m },
            a = { brands: n.brands, mobile: n.mobile, platform: n.platform };
          for (r in e) (t = e[r]), t in i && (a[t] = i[t]);
          return a;
        }),
        (r = function (e, t) {
          var n = "",
            s = "";
          switch (e) {
            case "Google Chrome":
              (n = "Chromium"), (s = t);
              break;
            case "Apple Safari":
              (n = "WebKit"), (s = t);
              break;
            default:
              (n = "Not A; Equivalence Class"), (s = "67");
              break;
          }
          return [
            { brand: "Not A; Brand", version: "24" },
            { brand: e, version: t },
            { brand: n, version: s },
          ];
        }),
        (i = function (e, t) {
          return e.indexOf(t) !== -1;
        }),
        (p = function (e, t) {
          for (var n in t) if (i(e, t[n])) return !0;
          return !1;
        }),
        (c = function (e) {
          if (n.platform === "" && "platform" in a)
            switch (a.platform) {
              case "Linux armv8l":
              case "Linux armv81":
              case "Linux aarch64":
                (n.platform = "Linux"), (s = "ARM"), (o = "64");
                break;
              case "Linux x86_64":
                (n.platform = "Linux"), (s = "x86"), (o = "64");
                break;
              case "Linux armv7l":
                (n.platform = "Linux"), (s = "ARM"), (o = "32");
                break;
              case "Linux i686":
                (n.platform = "Linux"), (s = "x86"), (o = "32");
                break;
              case "Android":
                (n.platform = "Android"), (s = "ARM"), (o = "64");
                break;
              case "iPhone":
              case "iPod":
              case "iPod touch":
                (n.platform = "iOS"), (s = "ARM"), (o = "64");
                break;
              case "iPad":
                (n.platform = "iPadOS"), (s = "ARM"), (o = "64");
                break;
              case "MacIntel":
                (n.platform = "macOS"), (s = "x86"), (o = "64");
                break;
            }
          if (n.brands.length === 0 && "vendor" in a) {
            var t,
              c,
              l,
              u = a.vendor;
            i(u, "Google")
              ? (n.brands = r("Google Chrome", "0.0"))
              : i(u, "Apple") && (n.brands = r("Apple Safari", "0.0"));
          }
          if (
            ("oscpu" in a &&
              (o === "" || s === "") &&
              ((c = a.oscpu),
              p(c, ["x86_64", "x64", "WOW64", "aarch64", "amd64"])
                ? (o === "" && (o = "64"), s === "" && (i(c, "aarch64") ? (s = "ARM") : (s = "x86")))
                : i(c, "i686") && ((s = "x86"), (o = "32"))),
            (l = e.complete_device_name.match(/(iP(?:hone|od|ad))/)),
            l &&
              ((n.brands = r("Apple Safari", "0.0")),
              (n.platform = l[1] === "iPad" ? "iPadOS" : "iOS"),
              (s = "ARM"),
              (o = "64")),
            (n.mobile = e.form_factor in ["Smartphone", "Feature Phone", "Other Mobile"]),
            "brand_name" in e)
          ) {
            switch (((t = e.advertised_browser), t)) {
              case "Chrome Mobile":
                t = "Google Chrome";
                break;
              case "Mobile Safari":
                t = "Apple Safari";
                break;
            }
            (n.mobile = e.is_mobile),
              (n.brands = r(t, e.advertised_browser_version)),
              e.is_full_desktop || (d = e.model_name),
              (f = e.advertised_device_os_version),
              (m = e.advertised_browser_version);
          }
          g = n.brands;
        }),
        c(h.WURFL);
    };
    return e;
  })()),
  (window.navigator.userAgentData = new WurflJSNavigatorUAData(window, -1))),
  (wurfl_candidates = [
    {
      webgl: "a12 gpu",
      chashes: [
        { comment: "12.x", chash: -1555617484, ops_range: [] },
        { comment: "13.x", chash: -131154645, ops_range: [[1.9, 2.4]] },
        {
          comment: "14.x 1",
          chash: -2095308119,
          ops_range: [
            [2.1, 2.57],
            [3.2, 3.5],
          ],
        },
        {
          comment: "14.x 2",
          chash: -1821413258,
          ops_range: [
            [2.11, 2.57],
            [3.2, 3.5],
          ],
        },
        { comment: "15.x", chash: 1132276657, ops_range: [] },
        { comment: "16.1", chash: 110320030, ops_range: [] },
        { comment: "16.1", chash: -1461588693, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 812;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone XS",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone XS",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1125,
        resolution_height: 2436,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 62,
        physical_screen_height: 134,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "a12 gpu",
      chashes: [
        { comment: "12.x", chash: -1555617484, ops_range: [] },
        { comment: "13.x", chash: -131154645, ops_range: [[1.9, 3]] },
        { comment: "14.x 1", chash: -2095308119, ops_range: [[2.2, 3]] },
        { comment: "14.x 2", chash: -1821413258, ops_range: [[2.2, 3]] },
        { comment: "15.x", chash: 1132276657, ops_range: [] },
        { comment: "16.1", chash: 110320030, ops_range: [] },
        { comment: "16.1", chash: -1461588693, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 896;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone XS Max",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone XS Max",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1242,
        resolution_height: 2688,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 70,
        physical_screen_height: 150,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "a12 gpu",
      chashes: [
        { comment: "12.x", chash: -1555617484, ops_range: [] },
        { comment: "13.x", chash: -131154645, ops_range: [[1.9, 3]] },
        {
          comment: "14.x 1",
          chash: -2095308119,
          ops_range: [
            [2.15, 2.5],
            [3.2, 3.5],
          ],
        },
        {
          comment: "14.x 2",
          chash: -1821413258,
          ops_range: [
            [2.15, 2.5],
            [3.2, 3.5],
          ],
        },
        { comment: "15.x", chash: 1132276657, ops_range: [] },
        { comment: "16.1", chash: 110320030, ops_range: [] },
        { comment: "16.1", chash: -1461588693, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 896;
        },
        function (e) {
          return e.devicePixelRatio == 2;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone XR",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone XR",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 828,
        resolution_height: 1792,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 65,
        physical_screen_height: 141,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "13.x", chash: -131154645, ops_range: [[1.4, 1.8]] },
        {
          comment: "14.x 1",
          chash: -2095308119,
          ops_range: [
            [1.6, 2],
            [2.6, 3],
          ],
        },
        {
          comment: "14.x 2",
          chash: -1821413258,
          ops_range: [
            [1.6, 2],
            [2.6, 3],
          ],
        },
        { comment: "15.x", chash: -481715509, ops_range: [] },
        { comment: "16.1", chash: 1260438364, ops_range: [] },
        { comment: "16.1", chash: -2030047434, ops_range: [] },
        { comment: "16.1", chash: 2070949243, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 896;
        },
        function (e) {
          return e.devicePixelRatio == 2;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 11",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 11",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 828,
        resolution_height: 1792,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 65,
        physical_screen_height: 141,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "13.x", chash: -131154645, ops_range: [[1.5, 1.7]] },
        {
          comment: "14.x 1",
          chash: -2095308119,
          ops_range: [
            [1.6, 2],
            [2.6, 3.1],
          ],
        },
        {
          comment: "14.x 2",
          chash: -1821413258,
          ops_range: [
            [1.6, 2],
            [2.6, 3.1],
          ],
        },
        { comment: "15.x", chash: -481715509, ops_range: [] },
        { comment: "16.1", chash: 1260438364, ops_range: [] },
        { comment: "16.1", chash: -2030047434, ops_range: [] },
        { comment: "16.1", chash: 2070949243, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 812;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 11 Pro",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 11 Pro",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1125,
        resolution_height: 2436,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 62,
        physical_screen_height: 134,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "13.x", chash: -131154645, ops_range: [[1.5, 1.7]] },
        { comment: "14.x 1", chash: -2095308119, ops_range: [[1.5, 2]] },
        { comment: "14.x 2", chash: -1821413258, ops_range: [[1.5, 2]] },
        { comment: "15.x", chash: -481715509, ops_range: [] },
        { comment: "16.1", chash: 1260438364, ops_range: [] },
        { comment: "16.1", chash: -2030047434, ops_range: [] },
        { comment: "16.1", chash: 2070949243, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 896;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 11 Pro Max",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 11 Pro Max",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1242,
        resolution_height: 2688,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 70,
        physical_screen_height: 150,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "13.X", chash: -131154645, ops_range: [] },
        { comment: "14.x", chash: -2095308119, ops_range: [] },
        { comment: "15.x", chash: -481715509, ops_range: [] },
        { comment: "16.1", chash: 1260438364, ops_range: [] },
        { comment: "16.1", chash: -2030047434, ops_range: [] },
        { comment: "16.1", chash: 2070949243, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 568 || e.screen.height == 667;
        },
        function (e) {
          return e.devicePixelRatio == 2;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone SE (2020)",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone SE (2020)",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 750,
        resolution_height: 1334,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 59,
        physical_screen_height: 105,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "14.x", chash: -118752313, ops_range: [] },
        { comment: "15.x", chash: 814470808, ops_range: [] },
        {
          comment: "16.1",
          chash: -1399378298,
          ops_range: [
            [3.15, 3.6],
            [7.1, 7.8],
          ],
        },
        {
          comment: "16.1",
          chash: 340290092,
          ops_range: [
            [3.15, 3.6],
            [7.1, 8.1],
          ],
        },
        {
          comment: "16.1",
          chash: 1764581104,
          ops_range: [
            [3.15, 3.6],
            [7.1, 8.1],
          ],
        },
        { comment: "17.X", chash: -1399378298, ops_range: [[1.28, 1.41]] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 844 || e.screen.height == 693;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 12",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 12",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1170,
        resolution_height: 2532,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 65,
        physical_screen_height: 141,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "14,x", chash: -118752313, ops_range: [] },
        { comment: "15.x", chash: 814470808, ops_range: [] },
        { comment: "16.1", chash: -1399378298, ops_range: [[3.16, 3.6]] },
        { comment: "16.1", chash: 340290092, ops_range: [[3.16, 3.7]] },
        { comment: "16.1", chash: 1764581104, ops_range: [[3.16, 3.9]] },
        { comment: "17.X", chash: -1399378298, os_major_version: 17, ops_range: [[1.28, 1.41]] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 812;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 12 mini",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 12 mini",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1080,
        resolution_height: 2340,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 58,
        physical_screen_height: 125,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "14.x", chash: -118752313, ops_range: [] },
        { comment: "15.x", chash: 814470808, ops_range: [] },
        {
          comment: "16.1",
          chash: 340290092,
          ops_range: [
            [3.1, 3.5],
            [7, 7.1],
          ],
        },
        {
          comment: "16.1",
          chash: 1764581104,
          ops_range: [
            [3.1, 3.5],
            [7.1, 8],
          ],
        },
        {
          comment: "17.x",
          chash: -1399378298,
          os_major_version: 17,
          ops_range: [
            [1.26, 2.06],
            [2.97, 3.25],
          ],
        },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 896 || e.screen.height == 926;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 12 Pro Max",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 12 Pro Max",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1284,
        resolution_height: 2778,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 72,
        physical_screen_height: 155,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "15.x", chash: 1230045186, ops_range: [] },
        {
          comment: "16.1",
          chash: -1399378298,
          ops_range: [
            [2.8, 3.1],
            [6.6, 7.01],
          ],
        },
        {
          comment: "16.1",
          chash: 340290092,
          ops_range: [
            [2.8, 3.1],
            [6.6, 7.01],
          ],
        },
        {
          comment: "16.1",
          chash: 1764581104,
          ops_range: [
            [2.8, 3.14],
            [6.6, 7.09],
          ],
        },
        { comment: "17.X", chash: -1399378298, ops_range: [[1.09, 1.27]] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 844;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 13",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 13",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1170,
        resolution_height: 2532,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 65,
        physical_screen_height: 141,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "15.x", chash: 1230045186, ops_range: [] },
        { comment: "16.1", chash: -1399378298, ops_range: [[2.8, 3.15]] },
        { comment: "16.1", chash: 340290092, ops_range: [[2.8, 3.15]] },
        { comment: "16.1", chash: 1764581104, ops_range: [[2.8, 3.15]] },
        { comment: "17.X", chash: -1399378298, os_major_version: 17, ops_range: [[1.1, 1.27]] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 812;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 13 mini",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 13 mini",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1080,
        resolution_height: 2340,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 58,
        physical_screen_height: 125,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "15.x", chash: 1230045186, ops_range: [] },
        {
          comment: "16.1",
          chash: -1399378298,
          ops_range: [
            [2.79, 3.09],
            [6.5, 7],
          ],
        },
        {
          comment: "16.1",
          chash: 340290092,
          ops_range: [
            [2.79, 3.09],
            [7.1, 8],
          ],
        },
        {
          comment: "16.1",
          chash: 1764581104,
          ops_range: [
            [2.79, 3.09],
            [6.5, 7],
          ],
        },
        {
          comment: "17.X",
          chash: -1399378298,
          ops_range: [
            [1.09, 1.25],
            [2.07, 2.96],
          ],
        },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 896 || e.screen.height == 926;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 13 Pro Max",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 13 Pro Max",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1284,
        resolution_height: 2778,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 72,
        physical_screen_height: 155,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "15.x", chash: 1230045186, ops_range: [] },
        { comment: "16.1", chash: -1399378298, ops_range: [] },
        { comment: "16.1", chash: 340290092, ops_range: [] },
        { comment: "16.1", chash: 1764581104, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 568 || e.screen.height == 667;
        },
        function (e) {
          return e.devicePixelRatio == 2;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone SE (2022)",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone SE (2022)",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 750,
        resolution_height: 1334,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 59,
        physical_screen_height: 105,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "16.x", chash: 1230045186, ops_range: [] },
        { comment: "16.1", chash: -1399378298, ops_range: [] },
        { comment: "16.1", chash: 340290092, ops_range: [] },
        { comment: "16.1", chash: 1764581103, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 852;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 14 Pro",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 14 Pro",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1179,
        resolution_height: 2556,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 65,
        physical_screen_height: 141,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [
        { comment: "16.x", chash: 1230045186, ops_range: [] },
        { comment: "16.1", chash: -1399378298, ops_range: [] },
        { comment: "16.1", chash: 340290091, ops_range: [] },
        { comment: "16.1", chash: 1764581104, ops_range: [] },
      ],
      js_check_functs: [
        function (e) {
          return e.screen.height == 932;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 14 Pro Max",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 14 Pro Max",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1290,
        resolution_height: 2796,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 72,
        physical_screen_height: 155,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [{ comment: "17.X", chash: 340290092, os_major_version: 17, ops_range: [[0.9, 0.99]] }],
      js_check_functs: [
        function (e) {
          return e.devicePixelRatio == 3;
        },
        function (e) {
          return e.screen.height == 852;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 15 Pro",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 15 Pro",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1179,
        resolution_height: 2556,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 65,
        physical_screen_height: 141,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
    {
      webgl: "",
      chashes: [{ comment: "17.X", chash: 340290092, os_major_version: 17, ops_range: [] }],
      js_check_functs: [
        function (e) {
          return e.screen.height == 932;
        },
        function (e) {
          return e.devicePixelRatio == 3;
        },
      ],
      capabilities: {
        is_mobile: !0,
        complete_device_name: "Apple iPhone 15 Pro Max",
        form_factor: "Smartphone",
        brand_name: "Apple",
        model_name: "iPhone 15 Pro Max",
        marketing_name: "",
        manufacturer_name: "",
        resolution_width: 1290,
        resolution_height: 2796,
        max_image_width: 320,
        max_image_height: 568,
        pointing_method: "touchscreen",
        physical_screen_width: 72,
        physical_screen_height: 155,
        is_full_desktop: !1,
        is_robot: !1,
        is_tablet: !1,
        is_smartphone: !0,
        is_smarttv: !1,
        advertised_browser: "Chrome Mobile on iOS",
        advertised_browser_version: "126.0.6478.153",
        advertised_device_os: "iOS",
        advertised_device_os_version: "17.2",
        is_app_webview: !1,
      },
    },
  ]),
  (wurfl_debug = !1),
  (wurfl_async = !1),
  (wurfljs_host = "https://wjs.wurflcloud.com"),
  (wurfljs_cache_ttl = 6048e5),
  (wurfl_time_limit = 1e3);
/*! WURFL.js-BE 2024-07-24  [859ec1c] */ (WurflJsResolver = function (e, t, n, s, o, i, a) {
  function x(e, t) {
    var n;
    "CustomEvent" in r
      ? m.dispatchEvent(new r.CustomEvent(e, { bubbles: !0, detail: t }))
      : ((n = m.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, t), m.dispatchEvent(n));
  }
  function C() {
    return M ? { WURFL: r.WURFL, wurfl_pbjs: M } : { WURFL: r.WURFL };
  }
  function w() {
    x("WurflJSDetectionComplete", C());
  }
  function b() {
    return "performance" in r ? r.performance.now() : new Date().getTime();
  }
  function f() {
    var t = l("C=4<4;q4C04A2"),
      e = m[t](L + "vas");
    return (
      (e.divideMatrixSafe = function (e, t, n) {
        if (0.001 < e) throw "Field transform error";
        for (var o, i, r, c = t.length, d = t[0].length, l = n[0].length, a = new Array(c), s = 0; s < c; ++s) {
          a[s] = new Array(l);
          for (o = 0; o < l; ++o)
            for (i = a[s][o] = 0; i < d; ++i) (r = n[i][o]), 0 === r && (r = e), (a[s][o] += t[s][i] / r);
        }
        return a;
      }),
      (e.getEpsilon = function () {
        return "EPSILON" in Number ? Number.EPSILON : 1e-12 * Math.PI;
      }),
      (e.computeHash = function (t) {
        if (((n = e[l("x!$0C0p>C")]()), (h = 0) == n.length)) throw "Empty data";
        for (var n, o, i = l("Cm43>oA072"), s = 0; s < n.length; s++) (o = n[i](s)), (h = (h << 5) - h + o), (h &= h);
        if (((t = Math.round((Math.abs(h) * t) / 1024)), 255 < Math.abs(h) || !1 & t))
          throw "Hash consistency check failed";
        return t;
      }),
      e
    );
  }
  function S(e) {
    return e[l("CG4C=>oC46")](l(";614F"));
  }
  function l(e) {
    for (var t, s = [], n = e.length; 0 < n; n--) (t = e.charCodeAt(n - 1) + 49), 125 <= t && (t -= 93), s.push(t);
    return s
      .map(function (e) {
        return R(e);
      })
      .join("");
  }
  function T(e, t, n) {
    for (
      var s,
        c,
        l = 0,
        i = Math.ceil(1e3 * e),
        d = (16384 < i && ((i = 16384), (e = 16.384)), new Uint32Array(i)),
        a = 0,
        o = 0;
      o < n;
      o++
    ) {
      for (s = b(), c = 0; c < 1e3; c++) r.crypto.getRandomValues(d);
      if (((l += s = b() - s), (0 === o || s < a) && (a = s), 3 <= o && t < l)) break;
    }
    return parseFloat((a / e).toFixed(3));
  }
  function O() {
    if ("WURFLjsIsRunning" in r && !0 === r.WURFLjsIsRunning)
      throw (w(), "Error: WURFL.js cannot be run more than once in parallel");
    r.WURFLjsIsRunning = !0;
    var e,
      t,
      n,
      o,
      s = r;
    for (n in c) (t = "__wurfljs_MOCK_" + n.toUpperCase()), t in s && void 0 !== s[t] && (c[n] = s[t]);
    return (
      (e = (function () {
        var t,
          e = H();
        if (1 === e.length) return e[0];
        if (1 < e.length) for (t in e) (t = e[t]), d[u(t)].push("fail[ambiguous]");
        return null;
      })()),
      e && (r.WURFL = e.capabilities),
      A &&
        ((e = r.WURFL), r.localStorage) &&
        (g("wjs-version", F),
        g("wjs-ua", r.navigator.userAgent),
        g("wjs-data", JSON.stringify(e)),
        null === r.localStorage.getItem("wjs-expires")) &&
        ((e = new Date()),
        (o = 6048e5),
        r.wurfljs_cache_ttl && (o = r.wurfljs_cache_ttl),
        e.setTime(e.getTime() + o),
        g("wjs-expires", e.getTime())),
      P &&
        (function () {
          var e,
            t = { ml: j, unml: y, ops: k, chash: E };
          for (e in c) e in t && (null === c[e] || void 0 === c[e]) && (c[e] = t[e].call(this));
        })(),
      (c.candidate_stats = d),
      (r.__wurfljs_props = c),
      delete r.WURFLjsIsRunning,
      w(),
      r.WURFL
    );
  }
  var F = s + "/859ec1c",
    r = e,
    m = r.document,
    c = { ml: null, unml: null, ops: null, chash: null },
    M = a,
    A = !o,
    L = "can",
    P = o,
    z = i,
    v = t,
    R = String.fromCharCode,
    d = {},
    _ = [],
    D = n,
    h = 255,
    g = function (e, t) {
      try {
        return r.localStorage.setItem(e, t), !0;
      } catch (e) {
        return !1;
      }
    },
    p =
      ((this.clearCache = function () {
        try {
          r.localStorage.removeItem("wjs-version"),
            r.localStorage.removeItem("wjs-expires"),
            r.localStorage.removeItem("wjs-ua"),
            r.localStorage.removeItem("wjs-data");
        } catch (e) {}
      }),
      this.clearCache),
    j = function () {
      if (null === c.ml)
        try {
          var e = S(f());
          c.ml = e[l("A4C4<0A0|C46")](e[l("=>8BA4E").toUpperCase()]).toLowerCase();
        } catch (e) {
          _.push("getMl(): " + e), (c.ml = null);
        }
      return c.ml;
    },
    y = function () {
      if (null === c.unml)
        try {
          var e = S(f()),
            t = e[l("=>8B=4CGqC46")](l(">5=8.A4A43=4A.6D143.xsnq&"));
          c.unml = e[l("A4C4<0A0|C46")](t[l('xsnq&.!q!qpzq!.pqw"myz$')]).toLowerCase();
        } catch (e) {
          _.push("getUnml(): " + e), (c.unml = null);
        }
      return c.unml;
    },
    N = function (e) {
      var t = y() || j();
      return "string" == typeof t && -1 < t.indexOf(e);
    },
    k = function () {
      if (null === c.ops) {
        if (!(l(">C?HA2") in r)) return -1;
        var t = D,
          n = b(),
          e = T(0.5, t, 9);
        (t -= b() - n), e < 20 && (e = T(20 / e, t, 30)), (c.ops = e);
      }
      return c.ops;
    },
    E = function () {
      if (null !== c.chash) return c.chash;
      (t = f()), (n = t[l("CG4C=>oC46")]((45).toString(16))), (n.divideMatrixSafe = t.divideMatrixSafe);
      for (
        var e,
          t,
          n,
          o = "i9asdm..$#po((^@KbXrww!~cz",
          i = [
            ["4=8;4B0nCG4C", "?>C"],
            ["C=>5", "S;08AmSLG?b]"],
            ["4=8;4B0nCG4C", "28C4107?;0"],
            ["4C0C>A", [0.05]],
            ['4;HC";;85', "\\b5O"],
            ["C24!;;85", [125, 1, 62, 20]],
            ['4;HC";;85', "eb\\O"],
            ["CG4#;;85", [o, 2, 15]],
            [
              '450"G8AC0y438E83',
              [
                t.getEpsilon(),
                [
                  [2, 3],
                  [188, 17],
                ],
                [
                  [166, 178],
                  [255, 255],
                ],
              ],
            ],
            ['4;HC";;85', "UcZ\\LX\\LX\\\\^LX^\\]T016A"],
            ["CG4#;;85", [o, 4, 17]],
            ["AD;nF>307B", "\\]"],
            ["A>;>oF>307B", "4D;1"],
            ["C24!;;85", [-20, 10, 234, 5]],
          ],
          s = 0;
        s < i.length;
        s++
      )
        (e = i[s]), "string" == typeof e[1] ? (n[l(e[0])] = l(e[1])) : n[l(e[0])].apply(n, e[1]);
      h = -1;
      try {
        return t.computeHash();
      } catch (e) {
        return h;
      }
    },
    u = function (e) {
      return e.capabilities.complete_device_name.replace(".", "_");
    },
    H = function () {
      (t = 0), (e = {});
      for (d = {}, t = 0; t < v.length; t++) (e = v[t]), (d[u(e)] = []);
      for (o = [], t = 0; t < v.length; t++)
        (function (e) {
          for (var n, s = e.js_check_functs, o = { compareOSVersion: I }, t = 0; t < s.length; t++)
            if (((n = s[t]), typeof n == "function")) {
              if (!n(r, o)) return !1;
            } else _.push("Non-executable jsfunc test");
          return !0;
        })((e = v[t]))
          ? (o.push(e), d[u(e)].push("jsfunc[pass]"))
          : d[u(e)].push("jsfunc[fail]");
      if (0 === o.length) return [];
      i = [];
      for (t = 0; t < o.length; t++)
        (a = (e = o[t])[l(";614F")]),
          null === a || "" == a
            ? d[u(e)].push("ml[no_ref]")
            : ((a = e),
              null !== (y() || j()) && N(a.webgl) ? (i.push(e), d[u(e)].push("ml[pass]")) : d[u(e)].push("ml[fail]"));
      if (1 === i.length) return i;
      var e,
        t,
        n,
        s,
        o,
        i,
        a,
        g = [],
        g = 0 < i.length ? i : o,
        h = [],
        w = [];
      for (t = 0; t < g.length; t++)
        "chashes" in (e = g[t]) && 0 < e.chashes.length ? h.push(e) : (w.push(e), d[u(e)].push("chash[no_ref]"));
      if (0 === h.length) return w;
      var m = [],
        b = [],
        p = E();
      for (c.chash = p, t = 0; t < h.length; t++) {
        e = h[t];
        for (n = 0; n < e.chashes.length; n++)
          (s = e.chashes[n]),
            "chash" in s && s.chash == p
              ? "ops_range" in s && null !== s.ops_range && 0 < s.ops_range.length
                ? (d[u(e)].push("chash_" + n + "[pass]"),
                  (function (e) {
                    for (var o, i, n = k(), s = f().getEpsilon(), t = 0; t < e.length; t++)
                      if (((o = e[t][0] - s), (i = e[t][1] + s), o <= n && n <= i)) return !0;
                    return !1;
                  })(s.ops_range)
                    ? (m.push(e), d[u(e)].push("chash_" + n + "_ops[pass]"))
                    : d[u(e)].push("chash_" + n + "_ops[fail]"))
                : (b.push(e), d[u(e)].push("chash_" + n + "[pass_no_ops]"))
              : d[u(e)].push("chash_" + n + "[fail:ex:" + s.chash + "!=ac:" + p + "]");
      }
      return 0 === m.length ? b : m;
    },
    I = function (e, t) {
      if (e[0] > t[0]) return 1;
      if (e[0] < t[0]) return -1;
      for (var n = 0; n < 3; n++) if (e[n] != t[n]) return e[n] > t[n] ? 1 : -1;
      return 0;
    };
  this.main = function () {
    if (
      ("Promise" in r &&
        (r.WURFLPromises = {
          init: new Promise(function (e) {
            m.addEventListener(
              "WurflJSInitComplete",
              function (t) {
                e(t.detail);
              },
              { passive: !0, once: !0 }
            );
          }),
          complete: new Promise(function (e) {
            m.addEventListener(
              "WurflJSDetectionComplete",
              function (t) {
                e(t.detail);
              },
              { passive: !0, once: !0 }
            );
          }),
        }),
      x("WurflJSInitComplete", C()),
      A)
    ) {
      var e = (function () {
        if (!r.localStorage) return null;
        var t = r.localStorage.getItem("wjs-version"),
          n = r.localStorage.getItem("wjs-expires"),
          s = r.localStorage.getItem("wjs-ua"),
          e = r.localStorage.getItem("wjs-data");
        if (null === t || null === n || null === e) return null;
        if (t !== F || s !== r.navigator.userAgent) return p(), null;
        if (r.WURFL && !e.wurfl_id != !r.WURFL.wurfl_id) return p(), null;
        if (parseInt(n, 10) < new Date().getTime()) return p(), null;
        try {
          return JSON.parse(e);
        } catch (e) {
          return p(), null;
        }
      })();
      if (
        null !== e &&
        "complete_device_name" in e &&
        !e.complete_device_name.match(/^Apple (iPhone|iPad|iPod|Safari)$/)
      )
        return (r.WURFL = e), w(), r.WURFL;
    }
    return "Promise" in r && z
      ? new Promise(function (e, t) {
          try {
            e({ WURFL: O() });
          } catch (e) {
            t(e);
          }
        })
      : O();
  };
}),
  !(function () {
    if (!("object" != typeof window || "__wurfljs_NORUN" in window)) {
      var e = window,
        t = ("wurfl_debug" in window && window.wurfl_debug) || ("__wurfljs_DEBUG" in window && window.__wurfljs_DEBUG),
        n = "wurfl_async" in window && window.wurfl_async,
        s = "wurfl_pbjs" in window ? window.wurfl_pbjs : void 0,
        e =
          ("__wurfljs_MOCK" in window && (e = window.__wurfljs_MOCK),
          new WurflJsResolver(e, wurfl_candidates, wurfl_time_limit, wurfljs_host, t, n, s));
      try {
        e.main();
      } catch (e) {
        console.error(e);
      }
    }
  })();



console.log('WURFL', WURFL)




let a  = new UserModelProducer()
console.log('a', a)
 a.ObserverLite.once().then(b=>{
     console.log('b', b)
     console.log('b', b.userModel)
     alert(b.userModel)
 })
