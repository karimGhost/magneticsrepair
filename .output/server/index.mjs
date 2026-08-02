globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"e64-R6MpNgJYHEkiH0h24A9dFn3aaeY\"",
		"mtime": "2026-08-01T21:17:03.735Z",
		"size": 3684,
		"path": "../public/favicon.png"
	},
	"/icon-192.png": {
		"type": "image/png",
		"etag": "\"5f50-XTNzEBSCrkmIlPCn2Vf8BY38k5U\"",
		"mtime": "2026-08-01T21:17:03.735Z",
		"size": 24400,
		"path": "../public/icon-192.png"
	},
	"/manifest.webmanifest": {
		"type": "application/manifest+json",
		"etag": "\"24a-JL7VB3j5j553ESMT1D6IsDXajO0\"",
		"mtime": "2026-08-01T21:17:03.735Z",
		"size": 586,
		"path": "../public/manifest.webmanifest"
	},
	"/icon-512.png": {
		"type": "image/png",
		"etag": "\"34f25-2YD2Lhs30iQiWbezUSUbKXvTI9k\"",
		"mtime": "2026-08-01T21:17:03.735Z",
		"size": 216869,
		"path": "../public/icon-512.png"
	},
	"/assets/WhatsAppButton-DPHIvGyw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b57-+XeSgWfXEduEE4+PGaTX5vfHaVs\"",
		"mtime": "2026-08-01T21:17:00.444Z",
		"size": 6999,
		"path": "../public/assets/WhatsAppButton-DPHIvGyw.js"
	},
	"/assets/assistant.functions-D0dU6kPX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1355-/FPrFidSoQfAakAJ6wMBuukrVC0\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 4949,
		"path": "../public/assets/assistant.functions-D0dU6kPX.js"
	},
	"/assets/auth-ClpqQHOE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4601-GrI6POZ7tTE56aTJf7ob/AyOlvk\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 17921,
		"path": "../public/assets/auth-ClpqQHOE.js"
	},
	"/assets/admin-CPpowybC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ddaa-FsToafQteFJQGZpliWt+QljzHnk\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 384426,
		"path": "../public/assets/admin-CPpowybC.js"
	},
	"/assets/badge-BvG3ujbi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"337-lxjKOsAyNbGwSKQEYW4UL5rnEcA\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 823,
		"path": "../public/assets/badge-BvG3ujbi.js"
	},
	"/assets/book-Cfi0oHJ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12c6-SQxpvZQpXt4z7ENBESQ+3nt9F/E\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 4806,
		"path": "../public/assets/book-Cfi0oHJ8.js"
	},
	"/assets/auth-context-DqREKUeE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"361f6-DS5qlR7rvLggp8hCMfPZMA0+IAg\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 221686,
		"path": "../public/assets/auth-context-DqREKUeE.js"
	},
	"/assets/card-UV0lplDU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"446-Bl7445JSosmIf97ZdGUHgYbkX14\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 1094,
		"path": "../public/assets/card-UV0lplDU.js"
	},
	"/assets/chevron-down-CTDsKhmk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-4uWYzEBt76DC+UQmoxo4RgcVteo\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 128,
		"path": "../public/assets/chevron-down-CTDsKhmk.js"
	},
	"/assets/circle-check-9OJd_0pb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-hxhYwDfEX1VQ0RGkDJUYoRg+OHA\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 178,
		"path": "../public/assets/circle-check-9OJd_0pb.js"
	},
	"/assets/clock-CQivgIZ6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-cna5aqfh9tPVQx9WrZ/+yvB/e3E\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 169,
		"path": "../public/assets/clock-CQivgIZ6.js"
	},
	"/assets/createClientRpc-DR5r79zb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8387-sgw+LwiCG5BVa6jQ5rAEMCwhiGg\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 33671,
		"path": "../public/assets/createClientRpc-DR5r79zb.js"
	},
	"/assets/createLucideIcon-BEo2XPo2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8199-YEkbF8Tx1DSTn/ZSUfD/mC9pndY\"",
		"mtime": "2026-08-01T21:17:00.445Z",
		"size": 33177,
		"path": "../public/assets/createLucideIcon-BEo2XPo2.js"
	},
	"/assets/credit-card-BRymTIV3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cf-l4j+lGCHZx6l6Pm6P1C8ZoZVgQ4\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 207,
		"path": "../public/assets/credit-card-BRymTIV3.js"
	},
	"/assets/dashboard-C9w7wpzJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1085-2FHgBcX6xwQ5VtLbDLisExs8Wc8\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 4229,
		"path": "../public/assets/dashboard-C9w7wpzJ.js"
	},
	"/assets/dialog-B4dQo5DB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a8d-bafSv5KEwZDptjKK1t/pY5UAZKE\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 6797,
		"path": "../public/assets/dialog-B4dQo5DB.js"
	},
	"/assets/dist--rFiol6J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d2-npV64QKeqpIZMQzerPnJ3RqMgr4\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 722,
		"path": "../public/assets/dist--rFiol6J.js"
	},
	"/assets/dist-B3_X6O0T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cd1-hFWiVzvoy7aih1xJiJzcHO46hYI\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 7377,
		"path": "../public/assets/dist-B3_X6O0T.js"
	},
	"/assets/dist-Bddg6yQ4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15b7-wLtWjfLdn1azai54k2X+4dGXrxQ\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 5559,
		"path": "../public/assets/dist-Bddg6yQ4.js"
	},
	"/assets/dist-CO1fnNSZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70e-9bCXz+9B8wb0MYUOrg12SMTKdMU\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 1806,
		"path": "../public/assets/dist-CO1fnNSZ.js"
	},
	"/assets/dist-CrFT_M-y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"151-b73+9OGF3Uck5T4vlUkdvsxpvwM\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 337,
		"path": "../public/assets/dist-CrFT_M-y.js"
	},
	"/assets/dist-I2d3LvlT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6654-IOecfFhhrkS7KH6KGMKR3iWjeRU\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 26196,
		"path": "../public/assets/dist-I2d3LvlT.js"
	},
	"/assets/es2015-Bt_z4ngn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5586-w/AsiZhiDHwczA6R8G2HXau3/l8\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 21894,
		"path": "../public/assets/es2015-Bt_z4ngn.js"
	},
	"/assets/index-BC0IeUkd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b9be-dDAHX+V3tKTk24372sgAUwBkqmU\"",
		"mtime": "2026-08-01T21:17:00.443Z",
		"size": 375230,
		"path": "../public/assets/index-BC0IeUkd.js"
	},
	"/assets/html2canvas-CA7kyov8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b46-1bD3NUT0o78L/KUDivNJ6s7fDy4\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 199494,
		"path": "../public/assets/html2canvas-CA7kyov8.js"
	},
	"/assets/index.es-BTW3GE_i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f10-1pK5AxIBN8KZ26GtLCocRHVlmKY\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 151312,
		"path": "../public/assets/index.es-BTW3GE_i.js"
	},
	"/assets/input-4KMMUct2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a5-1LUY+vXmkIdAQvK4pmQ3/8ARI4A\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 677,
		"path": "../public/assets/input-4KMMUct2.js"
	},
	"/assets/inventory-CdmzW7JY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2218-8MFUzGIxDrMVt22nIaCEq+QIp98\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 8728,
		"path": "../public/assets/inventory-CdmzW7JY.js"
	},
	"/assets/label-BWqMKj8e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e5-tucIRvcEv0noy5BizupXZS9EekA\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 741,
		"path": "../public/assets/label-BWqMKj8e.js"
	},
	"/assets/link-rFJ4hb8u.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5af9-FKYLp1vNcAj2QOTMgA0IqxyZCks\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 23289,
		"path": "../public/assets/link-rFJ4hb8u.js"
	},
	"/assets/loader-circle-CuQy7yFb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-KrQ95mnCCEBbapxvofBqBvFU57I\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 144,
		"path": "../public/assets/loader-circle-CuQy7yFb.js"
	},
	"/assets/message-square-DbARTNjk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-ynao+MI+s4k9sf76YAACNzadubU\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 233,
		"path": "../public/assets/message-square-DbARTNjk.js"
	},
	"/assets/package-BvBPcCTT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-qJJO9zs3/NhLVhW71CJUL+cjtEU\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 372,
		"path": "../public/assets/package-BvBPcCTT.js"
	},
	"/assets/payments-CwZxxPDW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a87-74/afGglMTuc06TDIY6IBSOP7DY\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 6791,
		"path": "../public/assets/payments-CwZxxPDW.js"
	},
	"/assets/plus-BQYYsZ4l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-I39W+hBzKm7lSaCJLlbS/JcrNfY\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 153,
		"path": "../public/assets/plus-BQYYsZ4l.js"
	},
	"/assets/progress-Bxck1IN9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"928-vvAbpjbi2k3hZbD2YvNjjA4nSC0\"",
		"mtime": "2026-08-01T21:17:00.446Z",
		"size": 2344,
		"path": "../public/assets/progress-Bxck1IN9.js"
	},
	"/assets/purify.es-DYqNnIWS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68f5-Vzo6UbzBey4umdbL/FhD62Ab6JQ\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 26869,
		"path": "../public/assets/purify.es-DYqNnIWS.js"
	},
	"/assets/receipt-BU9zkLRZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6881d-wGfn7TYQho4h60pSeT6FmnIkWtM\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 428061,
		"path": "../public/assets/receipt-BU9zkLRZ.js"
	},
	"/assets/reviews-DeKUVh4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1595-Iado0E+HCuOZWsMa4YvRJTNMJAQ\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 5525,
		"path": "../public/assets/reviews-DeKUVh4j.js"
	},
	"/assets/rolldown-runtime-hePW80VL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cc-fA8td6k29UVF6JoPfhOPkceTK1M\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 716,
		"path": "../public/assets/rolldown-runtime-hePW80VL.js"
	},
	"/assets/route-C13uEWyb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c39-MmzES2i6jmMzIZv0KDqwqVR2+Sw\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 15417,
		"path": "../public/assets/route-C13uEWyb.js"
	},
	"/assets/routes-PoJgYNYF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c85-yZGYbua2CaUwYMe7BTDTGfJUYH8\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 23685,
		"path": "../public/assets/routes-PoJgYNYF.js"
	},
	"/assets/select-CrjJPpSS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5857-M5VvMK8Bi9sLd1JbpfppukT0pdo\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 22615,
		"path": "../public/assets/select-CrjJPpSS.js"
	},
	"/assets/send-DPp3Gvpv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-O3GBB/d1hKSx+dG1qdXlMrkC2no\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 290,
		"path": "../public/assets/send-DPp3Gvpv.js"
	},
	"/assets/shield-alert-CM5_Y03x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-F3ME+7iqpwVgigzP6MFbbxTJUK8\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 353,
		"path": "../public/assets/shield-alert-CM5_Y03x.js"
	},
	"/assets/shield-check-CBeeuswn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-I4VZCcITCCrCrl2MKE9bMaozY6U\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 320,
		"path": "../public/assets/shield-check-CBeeuswn.js"
	},
	"/assets/smartphone-CzQR-udN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c5-HlZRO7dBD/P+Pl3DFPQe+igmme4\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 197,
		"path": "../public/assets/smartphone-CzQR-udN.js"
	},
	"/assets/sparkles-IVZdbDeN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-xqZq/T9rnh644feH0IqqxcP/eHw\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 494,
		"path": "../public/assets/sparkles-IVZdbDeN.js"
	},
	"/assets/star-DBsspp0Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d8-DzDblf2ebRtivtaqO1D2KuBBrkc\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 472,
		"path": "../public/assets/star-DBsspp0Z.js"
	},
	"/assets/styles-Chb6k4cs.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13fb3-BBmh+yghZc/Pj0ovjRm7OHeYWTY\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 81843,
		"path": "../public/assets/styles-Chb6k4cs.css"
	},
	"/assets/sun-D_vEPWKj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2eb-pLSEUFVxhO2JC3yCBuG4YXhhYdk\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 747,
		"path": "../public/assets/sun-D_vEPWKj.js"
	},
	"/assets/technician-DyQUAeiS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3655-1a8K8uqz+BtAURzilURJr1K+9Qc\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 13909,
		"path": "../public/assets/technician-DyQUAeiS.js"
	},
	"/assets/textarea-CuhphlWL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23f-kOGiyHtj3cmNZ6JVdaqAikinyw4\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 575,
		"path": "../public/assets/textarea-CuhphlWL.js"
	},
	"/assets/track-ChfSUKzW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147f-1wUpvrSfnfdQtjtL5z/I3v7P7ss\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 5247,
		"path": "../public/assets/track-ChfSUKzW.js"
	},
	"/assets/trending-up-BIgJE-3E.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"af-LcIyRnJVzVGcZ1Ku3EbwX7kk6tM\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 175,
		"path": "../public/assets/trending-up-BIgJE-3E.js"
	},
	"/assets/useMatch-BABcQUvy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d4-SM1BctEP3JO/GKJCbEoemJARouE\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 724,
		"path": "../public/assets/useMatch-BABcQUvy.js"
	},
	"/assets/useNavigate-BwjrOrZG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"307-7X/V9O65IC5nOyFKRAD1rtrwZcY\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 775,
		"path": "../public/assets/useNavigate-BwjrOrZG.js"
	},
	"/assets/useRouter-Bmz5fojE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-uf/dx5EO7CsmAsdH4d8YWINfjxM\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 248,
		"path": "../public/assets/useRouter-Bmz5fojE.js"
	},
	"/assets/wrench-B535QRlp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f-xi3fezlxnoc9Z05g6Y7jWIsss4U\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 303,
		"path": "../public/assets/wrench-B535QRlp.js"
	},
	"/assets/x-CdH5D9bc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-qtL7DX0vrnR8gyWPk9kQO3yLJaY\"",
		"mtime": "2026-08-01T21:17:00.447Z",
		"size": 154,
		"path": "../public/assets/x-CdH5D9bc.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_z1hgXO = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_z1hgXO
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
