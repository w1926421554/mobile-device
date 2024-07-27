// class UserModelProducer {
//   constructor() {
//     if (window.wbskModelAPISingleton) {
//       return window.wbskModelAPISingleton;
//     }
//     window.wbskModelAPISingleton = this;
//     (this.key = "wurflBurgaKey"), (this.ObserverLite = new ObserverLite());
//     this.userModel = false;
//     this.init();
//   }

//   subscribe(callback) {
//     return this.ObserverLite.subscribe(callback);
//   }

//   next(data) {
//     this.ObserverLite.next(data);
//   }

//   isMobileDevice() {
//     const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//     const isMobile = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
//     const hasTouchScreen = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
//     return isMobile || hasTouchScreen;
//   }

//   getWurflLocal() {
//     let data = localStorage.getItem(this.key);
//     try {
//       data = JSON.parse(data);
//       return data;
//     } catch (err) {
//       return false;
//     }
//   }

//   init() {
//     if (!this.isMobileDevice()) {
//       this.update(false);
//       return;
//     }

//     let wurfl = this.getWurflLocal();
//     if (wurfl?.device_name) {
//       this.update(this.parseWurfl(wurfl.device_name));
//       return;
//     }

//     const script = document.createElement("script");
//     script.type = "text/javascript";
//     script.src = "//wjs.wurflcloud.com/wurfl.js?time_limit=1000";
//     script.crossOrigin = "anonymous";
//     document.head.appendChild(script);

//     document.addEventListener("WurflJSDetectionComplete", () => {
//       localStorage.setItem(this.key, JSON.stringify(window.WURFL));
//       wurfl = window.WURFL;
//       this.update(this.parseWurfl(wurfl.device_name));
//     });
//   }

//   update(model) {
//     this.userModel = model || this.userModel;
//     this.next(this);
//   }

//   parseWurfl(device_name) {
//     const models = window.wbskGlobal.phoneCaseModelTypes;
//     let model = models.filter((item) => item.wurfl_name.indexOf(device_name) >= 0);
//     model = model.length ? model[0].title : false;
//     return model;
//   }
// }


// class ObserverLite {
//   constructor(e) {
//     if (((e = e || {}), (this.id = Math.floor(999999999999 * Math.random())), (this.settings = e), e.key)) {
//       if (
//         ((window.GlobalObersverLiteInstances = window.GlobalObersverLiteInstances || {}),
//         window.GlobalObersverLiteInstances[e.key])
//       )
//         return window.GlobalObersverLiteInstances[e.key];
//       window.GlobalObersverLiteInstances[e.key] = this;
//     }
//   }
//   once() {
//     return new Promise((e, t) => {
//       this.onceDone && e(this.onceDone);
//       const s = this.subscribe((t) => {
//         (t = t || !0), (this.onceDone = t), e(t), this.unsubscribe(s);
//       });
//     });
//   }
//   setOnce(e) {
//     (e = e || !0), (this.onceDone = e);
//   }
//   next(...e) {
//     this.onceDone || this.setOnce(...e),
//       this.subject &&
//         this.subject.length &&
//         this.subject.forEach(({ callback: t }) => {
//           t(...e);
//         });
//   }
//   subscribe(e) {
//     return (
//       (this.subject = this.subject || []),
//       (e = {
//         callback: e,
//         id: Math.floor(1e14 + 9e14 * Math.random()),
//       }),
//       this.subject.push(e),
//       e
//     );
//   }
//   unsubscribe(e) {
//     this.subject = this.subject.filter(({ id: t }) => t !== e.id);
//   }
//   unsubscribeAll(e) {
//     this.subject?.forEach((e) => this.unsubscribe(e)), e && (this.onceDone = !1);
//   }
// }

// let a  = new UserModelProducer()
// console.log('a', a)
//  a.ObserverLite.once().then(b=>{
//      console.log('b', b)
//      console.log('b', b.userModel)
//      alert(b.userModel)
//  })


