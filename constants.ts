
import { Game, Category } from './types';

export const CATEGORIES: Category[] = [
  'All', 'Action', 'Puzzle', 'Racing', 'Strategy', 'Sports', 'Adventure', 'Apps'
];

const SNOW_RIDER_HTML = `<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/TemplateData/style.css">
</head>
<body style="margin:0; overflow:hidden; background: #000;">
<script src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/TemplateData/UnityProgress.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/Build/UnityLoader.js"></script>
<script>
	var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/Vrkids2009/snowrider3d@6b7c2b9167b592528b221428414e63f06c4640b9/Build/SnowRider3D-gd-1.json", {onProgress: UnityProgress,Module:{onRuntimeInitialized: function() {UnityProgress(gameInstance, "complete")}}}); 
</script>
<div class="webgl-content" style="width: 100vw; height: 100vh;">
	<div id="gameContainer" style="width: 100%; height: 100%; margin: auto"></div>
</div>
</body>
</html>`;

const POLY_TRACK_HTML = `<!DOCTYPE html>
<html lang="en-us">
<head>
	<base href="https://cdn.jsdelivr.net/gh/genizy/polytrack@main/">
	<script>
		window.jkdfgnjkndfg = document.querySelector('base').href;
		fetch("simulation_worker.bundle.js").then(res => res.text()).then(text => {
			const blob = new Blob([text.replaceAll("replacethisplease", window.jkdfgnjkndfg)], { type: 'application/javascript' });
			window.simulationworker = URL.createObjectURL(blob);
		});
		const ogworker = window.Worker;
		window.Worker = function (scripturl, options) {
			if (typeof scripturl === 'string' && scripturl.toLowerCase() === "simulation_worker.bundle.js") {
				scripturl = window.simulationworker;
			}
			return new ogworker(scripturl, options);
		};
		window.Worker.prototype = ogworker.prototype;

		const ogfetch = window.fetch;
		window.fetch = async function (input, init) {
			if (typeof input === "string") {
				input = input.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
			} else if (input instanceof Request) {
				const newUrl = input.url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
				input = new Request(newUrl, input);
			}
			return ogfetch(input, init);
		};

		const ogxml = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function (method, url, ...rest) {
			if (typeof url === "string") {
				url = url.replace("vps.kodub.com:43273", "vpskodub.tmena1565.workers.dev");
			}
			return ogxml.call(this, method, url, ...rest);
		};
	</script>
	<style>body { margin: 0; overflow: hidden; background: #000; } canvas { width: 100%; height: 100%; }</style>
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
	<canvas id="screen"></canvas>
	<div id="ui"></div>
	<div id="transition-layer"></div>
	<script type="module" src="main.bundle.js" defer></script>
</body>
</html>`;

const SLOPE_HTML = `<!DOCTYPE html>
<html lang="en-us">
  <head>
    <base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/slope%203/">
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Slope 3</title>
    <style>
        html, body { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; background-color: #000; }
        .webgl-content { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
        #gameContainer { width: 100%; height: 100%; }
    </style>
    <script>
      window.fileMergerConfig = { files: [{ name: 'Slope3.data.unityweb', parts: 2 }], basePath: '', debug: false };
    </script>
    <script src="UnityLoader.js"></script>
    <script>
    (function() {
      'use strict';
      const config = Object.assign({files: [], basePath: '', debug: true}, window.fileMergerConfig || {});
      window.mergedFiles = window.mergedFiles || {};
      const mergeStatus = {};
      
      async function mergeSplitFiles(filePath, partsCount) {
          const parts = [];
          for (let i = 1; i <= partsCount; i++) parts.push(\`\${filePath}.part\${i}\`);
          const responses = await Promise.all(parts.map(p => fetch(p)));
          const buffers = await Promise.all(responses.map(r => r.arrayBuffer()));
          const totalLen = buffers.reduce((acc, b) => acc + b.byteLength, 0);
          const merged = new Uint8Array(totalLen);
          let offset = 0;
          for (const b of buffers) { merged.set(new Uint8Array(b), offset); offset += b.byteLength; }
          return merged.buffer;
      }

      function getMerged(name) {
        for (const [k, v] of Object.entries(window.mergedFiles)) { if (k.includes(name)) return v; }
        return null;
      }

      if (!window.originalFetch) window.originalFetch = window.fetch;
      window.fetch = function(url, ...args) {
        const name = url.toString().split('?')[0].split('/').pop();
        const b = getMerged(name);
        if (b) {
            const type = name.endsWith('.wasm') ? 'application/wasm' : 'application/octet-stream';
            return Promise.resolve(new Response(b, {status: 200, headers: {'Content-Type': type}}));
        }
        return window.originalFetch.call(this, url, ...args);
      }

      config.files.forEach(f => {
           const path = config.basePath + f.name;
           mergeSplitFiles(path, f.parts).then(b => { window.mergedFiles[f.name] = b; });
      });
    })();
    
    var gameInstance = UnityLoader.instantiate("gameContainer", "build.json");
    </script>
  </head>
<body><div class="webgl-content"><div id="gameContainer"></div></div></body>
</html>`;

const FIFA_HTML = `<!DOCTYPE html>
  <head> 
    <script>
      window.gameconfig = {
        name: "FIFA 10",
        url: "https://cdn.jsdelivr.net/gh/bubbls/ugss@8be6bff43ec227a82b1f0231b044d378efc4fb7e/FIFA%2010%20(Europe)%20(En%2CFr%2CDe%2CEs%2CIt)/FIFA%2010%20(Europe)%20(En%2CFr%2CDe%2CEs%2CIt).nds",
        core: "nds",
        min: 1,
        max: 2,
      };
    </script>
    <script>
      function mergeFiles(fileParts, cb) {
        return new Promise((resolve, reject) => {
          let buffers = [];
          function fetchPart(index) {
            if (index >= fileParts.length) {
              resolve(URL.createObjectURL(new Blob(buffers)));
              return;
            }
            fetch(fileParts[index]).then(r => r.arrayBuffer()).then(d => { buffers.push(d); fetchPart(index + 1); });
            cb(index);
          }
          fetchPart(0);
        });
      }
      function getParts(file, start, end) {
        let parts = [];
        for (let i = start; i <= end; i++) {
          parts.push(file + ".part" + String(i).padStart((end+"").length, '0'));
        }
        return parts;
      }
    </script>
    <style>body { margin: 0; background: #121212; color: white; font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; } #game { width: 100%; height: 100%; }</style>
  </head>
  <body>
    <div id="game"></div>
    <script>
      var parts = getParts(window.gameconfig.url, window.gameconfig.min, window.gameconfig.max);
      Promise.all([mergeFiles(parts, () => {})]).then(([gameUrl]) => {
          EJS_player = "#game";
          EJS_core = window.gameconfig.core;
          EJS_gameName = window.gameconfig.name;
          EJS_color = "#0064ff";
          EJS_startOnLoaded = true;
          EJS_pathtodata = "https://cdn.jsdelivr.net/gh/genizy/emu@master/";
          EJS_gameUrl = gameUrl;
          var script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/gh/genizy/emu@master/loader.js";
          document.body.appendChild(script);
      });
    </script>
  </body>
</html>`;

const BTD6_HTML = `<!DOCTYPE html>
<html>
<head>
  <base href="https://cdn.jsdelivr.net/gh/genizy/google-class@latest/btd6/">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bloons TD6</title>
  <style>body { background: #000; margin: 0; overflow: hidden; } #app { width: 100vw; height: 100vh; }</style>
</head>
<body>
  <div id="app"></div>
  <script src="script.js"></script>
  <script>
    const appElement = document.getElementById('app');
    const scaffolding = new Scaffolding.Scaffolding();
    scaffolding.width = 480;
    scaffolding.height = 360;
    scaffolding.resizeMode = "preserve-ratio";
    scaffolding.setup();
    scaffolding.appendTo(appElement);
    const vm = scaffolding.vm;
    window.Scratch = { vm, renderer: vm.renderer, audioEngine: vm.runtime.audioEngine, bitmapAdapter: vm.runtime.v2BitmapAdapter, videoProvider: vm.runtime.ioDevices.video.provider };
    scaffolding.setUsername("player" + Math.floor(Math.random() * 1000));
    scaffolding.setAccentColor("#ff4c4c");
    vm.setTurboMode(false);
    vm.setFramerate(30);
    const getProjectData = () => new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => resolve(xhr.response);
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', "assets/project.json");
        xhr.send();
    });
    getProjectData().then(data => { scaffolding.loadProject(data); scaffolding.start(); });
  </script>
</body>
</html>`;

const BURRITO_BISON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>html, body { margin: 0; padding: 0; background: black; overflow: hidden; width: 100%; height: 100%; } #flash-container { width: 100%; height: 100%; }</style>
  <script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@0.2.0-nightly.2025.10.2/ruffle.min.js"></script>
</head>
<body>
  <div id="flash-container"></div>
  <script>
    const ruffle = window.RufflePlayer?.newest();
    const player = ruffle.createPlayer();
    const container = document.getElementById("flash-container");
    player.style.width = "100%";
    player.style.height = "100%";
    container.appendChild(player);
    player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@3226fffeff224431331345e43c546bace1a5a936/Burrito_Bison.swf");
  </script>
</body>
</html>`;

const FIREBOY_WATERGIRL_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>Fireboy & Watergirl 3</title></head>
<body style="margin: 0px; overflow: hidden; background: #000;">
<script src="https://cdn.jsdelivr.net/gh/Edward358-AI/HTML5-games@3c35856e44aea5d93ebe781cb1af84570dd8512c/html5/fireboy-and-watergirl-3/play/bower_components/requirejs/require.js"></script>
<div id="root" style="width:100%;height:100%"></div>
<script>
 var s = document.createElement('script');
 s.src = 'https://cdn.jsdelivr.net/gh/Edward358-AI/HTML5-games@3c35856e44aea5d93ebe781cb1af84570dd8512c/html5/fireboy-and-watergirl-3/play/version.js';
 s.onload = function() { require(["https://cdn.jsdelivr.net/gh/bobydob/godotpack@eee6707129e6b8de0315fa9a296cec67aa16f6d8/side/faw3/faw3.min.js?v=" + version]); };
 document.body.appendChild(s);
</script>
</body>
</html>`;

const FREE_RIDER_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style>body,html{margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#000}iframe{width:100%;height:100%;border:none}</style></head><body><iframe src="https://www.freeriderhd.com/embed" allow="autoplay; fullscreen"></iframe></body></html>`;

const FOOTBALL_LEGENDS_HTML = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/app.css" /></head>
<body style="margin:0;overflow:hidden;background:#000">
<div id="content"></div>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/nape.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/minjquery.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/easel.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/bluebird.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/phaserminn.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/cache.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/superstor.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/bones.js"></script>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@a2b6edec2d1a8ec5a8d0d415432ee894209473cf/legends.js"></script>
</body></html>`;

const BASKET_RANDOM_HTML = `<!DOCTYPE html><html><head><meta charset="UTF-8"><link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/style.css"></head><body style="margin:0;overflow:hidden;background:#000;"><script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/box2d.js"></script><script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@1520d90d7b2994737acd8f7a633d018f63c22ca7/main.js" type="module"></script></body></html>`;

const GRANNY_2_HTML = `<!DOCTYPE html><html lang="en-us"><head><meta charset="utf-8"/><style>body{margin:0;background:#000;overflow:hidden}#unity-canvas{width:100%;height:100%}</style></head><body><canvas id="unity-canvas"></canvas><script>var buildUrl="https://cdn.jsdelivr.net/gh/m-e-64-cls/5@main/Build",loaderUrl=buildUrl+"/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js";var script=document.createElement("script");script.src=loaderUrl;script.onload=()=>{createUnityInstance(document.querySelector("#unity-canvas"),{dataUrl:buildUrl+"/aa32f1e0d2d5eeacc71b89b496157322.data_part0.data",frameworkUrl:buildUrl+"/e42b2d09d8d232ecce16310ff4617586.framework.js",codeUrl:buildUrl+"/52fc98ffa6c0df3da7ee8ac3194aa7f0.wasm_part0.wasm",companyName:"Awesome",productName:"Granny VS Grandpa",productVersion:"0.1"})};document.body.appendChild(script);</script></body></html>`;

const GEOMETRY_DASH_LITE_HTML = `<!DOCTYPE html><html lang="en-US"><head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@main/gdlite/"><link rel="stylesheet" href="themes/geometrydashlite.io/rs/css/home.css?v=1"><style>body{margin:0;overflow:hidden;background:#000}canvas{width:100vw;height:100vh;display:block}</style></head><body><div id="gameContainer"></div><script src="Build/UnityLoader.js"></script><script>var gameInstance=UnityLoader.instantiate("gameContainer","Build/GeometryDashLite.json");</script></body></html>`;

const ONE_V_ONE_LOL_HTML = `<!DOCTYPE html>
<html lang="en-us">
<head>
  <meta charset="utf-8">
  <title>1v1.LOL</title>
  <style>body { margin: 0; padding: 0; overflow: hidden; background-color: #000; height: 100vh; } #gameContainer { width: 100%; height: 100%; }</style>
  <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/UnityProgress.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.js"></script>
</head>
<body>
  <div id="gameContainer"></div>
  <script>
    var gameInstance = UnityLoader.instantiate("gameContainer", "https://cdn.jsdelivr.net/gh/n-101-1/1@main/2.7.json", {onProgress: UnityProgress});
  </script>
</body>
</html>`;

const NINETY_NINE_BALLS_HTML = `<!DOCTYPE html>
<html>
<body style="margin:0;overflow:hidden;background:#000;">
<canvas id="canvas" width="552" height="931" style="width:100%;height:100%;"></canvas>
<script src="https://cdn.jsdelivr.net/gh/bubbls/ruffle@8ba7f083496ec787377881857d02bb2012cd7ffa/99balls.js"></script>
</body>
</html>`;

const BASEBALL_BROS_HTML = `<!DOCTYPE html>
<html lang="en">
<head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@ae6706e5224c55594c491edfc7f5ad541e2ea02b/baseball%20bros/"><script src="./BaseballBros.js"></script><style>body{margin:0;background:#000;overflow:hidden;height:100vh}#openfl-content{width:100%;height:100%}</style></head>
<body><div id="openfl-content"></div><script>lime.embed("BaseballBros", "openfl-content", 0, 0, {parameters: {}});</script></body>
</html>`;

const GUN_MAYHEM_2_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Gun Mayhem 2</title>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: black;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    #flash-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: black;
    }

    ruffle-player {
      width: 100%;
      height: 100%;
      background: black;
      display: block;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/@ruffle-rs/ruffle@0.2.0-nightly.2025.10.2/ruffle.min.js"></script>
</head>
<body>
  <div id="flash-container"></div>

  <script>
    const container = document.getElementById("flash-container");

    function resizeGame() {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const aspectRatio = 4 / 3;

      let width = Math.floor(windowWidth);
      let height = Math.floor(windowWidth / aspectRatio);

      if (height > windowHeight) {
        height = Math.floor(windowHeight);
        width = Math.floor(height * aspectRatio);
      }

      container.style.width = \`\${width}px\`;
      container.style.height = \`\${height}px\`;
    }

    window.addEventListener("resize", resizeGame);
    window.addEventListener("DOMContentLoaded", () => {
      resizeGame();

      const ruffle = window.RufflePlayer?.newest() || window.RufflePlayer?.createPlayer();
      if (ruffle && container) {
        const player = ruffle.createPlayer();
        player.style.width = "100%";
        player.style.height = "100%";
        player.style.background = "black";
        container.appendChild(player);
        player.load("https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@4f33d4929927fdec42e3f5f079657bd0ee3edbed/gun-mayhem-2-more-ma-13824.swf");
      } else {
        container.textContent = "Ruffle failed to load."; 
      }
    });
  </script>
</body>
</html>`;

const MADALIN_CARS_HTML = `<!DOCTYPE html>
<html lang="en-us"><head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@79091a3feb921044b3597bd32cea7357b43e2d9c/madalincarmulti/"><link rel="stylesheet" href="TemplateData/style.css"></head>
<body style="margin:0;overflow:hidden"><div id="unity-container" style="width:100%;height:100%"><canvas id="unity-canvas" style="width:100%;height:100%"></canvas></div>
<script>
  var buildUrl="Build";var loaderUrl=buildUrl+"/304bc71d77b7acd6469bb5cc0730073b.js";var config={dataUrl:buildUrl+"/97a54d9b4b7525d0f2328e0cbb512980.data",frameworkUrl:buildUrl+"/4e20d7eb8e868230cafe4baff2e177d4.js",codeUrl:buildUrl+"/03cde5b9e5b1a5b23fbab20d045d4958.wasm",streamingAssetsUrl:"StreamingAssets",companyName:"Madalin Games",productName:"Madalin Cars Multiplayer",productVersion:"2.0.0"};
  var script=document.createElement("script");script.src=loaderUrl;script.onload=()=>{createUnityInstance(document.querySelector("#unity-canvas"),config)};document.body.appendChild(script);
</script></body></html>`;

const TRUCK_SIMULATOR_HTML = `<!DOCTYPE html>
<html lang="en-us"><head><base href="https://cdn.jsdelivr.net/gh/bubbls/UGS-Assets@79091a3feb921044b3597bd32cea7357b43e2d9c/indian-truck-simulator-3d-gh-pages/"><script src="Build/UnityLoader.js"></script></head>
<body style="margin:0;overflow:hidden;width:100%;height:100%"><div id="gameContainer" style="width:100%;height:100%"></div>
<script>
fetch("Build/indian_truck_gd_2_0_1.json").then(r=>r.json()).then(c=>{c.dataUrl="Build/indian_truck_gd_2_0_1.data.unityweb";c.wasmCodeUrl="Build/indian_truck_gd_2_0_1.wasm.code.unityweb";c.wasmFrameworkUrl="Build/indian_truck_gd_2_0_1.wasm.framework.unityweb";
UnityLoader.instantiate("gameContainer", URL.createObjectURL(new Blob([JSON.stringify(c)],{type:"application/json"})));});
</script></body></html>`;

export const GAMES: Game[] = [
  {
    id: 'sf-alpha-3',
    title: 'Street Fighter Alpha 3',
    category: 'Action',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/00/Street_Fighter_Alpha_3_cover.jpg',
    rating: 4.9,
    plays: '12M',
    description: 'The classic arcade fighter. Select your hero and battle for supremacy in this legendary 2D fighting game.',
    isHot: true,
    romUrl: "https://cdn.jsdelivr.net/gh/bubbls/UGS-file-encryption@a3b0ea52357b0aa94b7acf145c52494035722022/Street%20Fighter%20Alpha%203%20(USA).zip"
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    category: 'Action',
    image: 'https://play-lh.googleusercontent.com/-dE43lR8FvG_c8k8_s_z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z8z',
    rating: 4.8,
    plays: '25M',
    description: 'A competitive online third-person shooter where you build your way around the map tactically.',
    isHot: true,
    customHtml: ONE_V_ONE_LOL_HTML
  },
  {
    id: 'madalin-cars',
    title: 'Madalin Cars Multiplayer',
    category: 'Racing',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/6b6e6566666666666666666666666666.jpg',
    rating: 4.7,
    plays: '15M',
    description: 'Drive supercars in a massive open world. Perform stunts, drift, and race with friends online.',
    customHtml: MADALIN_CARS_HTML
  },
  {
    id: 'pokemon-emerald',
    title: 'Pokémon Emerald',
    category: 'Adventure',
    image: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Pokemon_Emerald_box.jpg',
    rating: 4.8,
    plays: '8.5M',
    description: 'Explore the Hoenn region, catch wild Pokémon, and become the Champion in this beloved GBA classic.',
    isHot: true,
    romUrl: "https://cdn.jsdelivr.net/gh/a456pur/seraph@81f551ca0aa8e3d6018d32d8ac5904ac9bc78f76/games/pokemonemerald/pokemonemerald.gba"
  },
  {
    id: 'baseball-bros',
    title: 'Baseball Bros',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/755e4b7879e943265267793540204754.png',
    rating: 4.5,
    plays: '4M',
    description: 'Hit home runs and strike out opponents in this fun and fast-paced arcade baseball game.',
    customHtml: BASEBALL_BROS_HTML
  },
  {
    id: 'gun-mayhem-2',
    title: 'Gun Mayhem 2',
    category: 'Action',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/e6629910d52062569505505050505050.png',
    rating: 4.6,
    plays: '9M',
    description: 'More mayhem, more guns! Knock your opponents off the map in this chaotic platform shooter.',
    customHtml: GUN_MAYHEM_2_HTML
  },
  {
    id: '99-balls',
    title: '99 Balls',
    category: 'Puzzle',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/903e830026e95267597560565f6e98c7.png',
    rating: 4.4,
    plays: '3.5M',
    description: 'A satisfying arcade game where you shoot balls to break numbered bricks before they reach the bottom.',
    customHtml: NINETY_NINE_BALLS_HTML
  },
  {
    id: 'truck-sim',
    title: 'Indian Truck Simulator 3D',
    category: 'Racing',
    image: 'https://img.gamemonetize.com/img/8075306950296bf5e22709205562776c/512x384.jpg',
    rating: 4.3,
    plays: '2M',
    description: 'Drive heavy cargo trucks through challenging indian terrain and deliver goods on time.',
    customHtml: TRUCK_SIMULATOR_HTML
  },
  {
    id: 'football-legends',
    title: 'Football Legends',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/94bd254c46f131a47346747df32a843e.png',
    rating: 4.7,
    plays: '8M',
    description: 'Play solo or with a friend in this fun arcade soccer game featuring famous football legends.',
    customHtml: FOOTBALL_LEGENDS_HTML
  },
  {
    id: 'snow-rider-3d',
    title: 'Snow Rider 3D',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/5e7323868673a55476a6d6540c499708.png',
    rating: 4.7,
    plays: '5M',
    description: 'Experience the thrill of riding a sleigh down a snowy mountain. Avoid obstacles and collect gifts!',
    isNew: true,
    customHtml: SNOW_RIDER_HTML
  },
  {
    id: 'poly-track',
    title: 'PolyTrack',
    category: 'Racing',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/8a0112d5b62b761a2933d142079412a8.png',
    rating: 4.6,
    plays: '4.2M',
    description: 'A fast-paced low-poly racing game with a track editor. Race against time and master the curves.',
    customHtml: POLY_TRACK_HTML
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: 'https://play-lh.googleusercontent.com/uJ055-6xM4zWb60gC5qNnJ-d9vWqN1I_4d2g_b_m_1-f_0_7_c_3_v_0',
    rating: 4.8,
    plays: '15M',
    description: 'Control a ball rolling down a steep slope. Avoid obstacles and keep your momentum in this endless 3D runner.',
    customHtml: SLOPE_HTML
  },
  {
    id: 'fifa-10',
    title: 'FIFA 10',
    category: 'Sports',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b3/FIFA_10_Cover.jpg',
    rating: 4.5,
    plays: '2M',
    description: 'Play the classic FIFA 10 (Nintendo DS version) directly in your browser. Build your dream team and compete.',
    customHtml: FIFA_HTML
  },
  {
    id: 'btd6',
    title: 'Bloons TD 6',
    category: 'Strategy',
    image: 'https://upload.wikimedia.org/wikipedia/en/6/66/Bloons_TD_6_cover.jpg',
    rating: 4.9,
    plays: '10M',
    description: 'Craft your perfect defense from a combination of awesome Monkey Towers, upgrades, Heroes, and activated abilities.',
    isHot: true,
    customHtml: BTD6_HTML
  },
  {
    id: 'burrito-bison',
    title: 'Burrito Bison',
    category: 'Action',
    image: 'https://upload.wikimedia.org/wikipedia/en/b/b2/Burrito_Bison_Launcha_Libre_cover.jpg',
    rating: 4.7,
    plays: '6M',
    description: 'Launch Burrito Bison as far as you can and smash gummy bears to gain speed!',
    customHtml: BURRITO_BISON_HTML
  },
  {
    id: 'fireboy-watergirl-3',
    title: 'Fireboy & Watergirl 3',
    category: 'Puzzle',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/93/Fireboy_and_Watergirl_3_Ice_Temple_cover.jpg',
    rating: 4.8,
    plays: '18M',
    description: 'Control Fireboy and Watergirl simultaneously to solve puzzles and overcome obstacles in the Ice Temple.',
    customHtml: FIREBOY_WATERGIRL_HTML
  },
  {
    id: 'free-rider',
    title: 'Free Rider',
    category: 'Racing',
    image: 'https://play-lh.googleusercontent.com/zV_d9q_m_1-f_0_7_c_3_v_0',
    rating: 4.6,
    plays: '9M',
    description: 'Ride your bike on user-created tracks in this classic physics-based racing game.',
    customHtml: FREE_RIDER_HTML
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: 'https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/5d9d7967-336c-48c9-8d8a-6415f9b457e9.png',
    rating: 4.6,
    plays: '3M',
    description: 'Score baskets in this funny physics-based basketball game. Play solo or with a friend!',
    customHtml: BASKET_RANDOM_HTML
  },
  {
    id: 'granny-2',
    title: 'Granny VS Grandpa',
    category: 'Action',
    image: 'https://play-lh.googleusercontent.com/M6q0rN2K7j0_x_0_7_c_3_v_0',
    rating: 4.5,
    plays: '1M',
    description: 'Survive the horror in this multiplayer version of Granny. Escape the house or hunt down survivors.',
    isNew: true,
    customHtml: GRANNY_2_HTML
  },
  {
    id: 'geometry-dash-lite',
    title: 'Geometry Dash Lite',
    category: 'Action',
    image: 'https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.png',
    rating: 4.8,
    plays: '20M',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!',
    customHtml: GEOMETRY_DASH_LITE_HTML
  },
  {
    id: 'geforce-now',
    title: 'Nvidia GeForce Now',
    category: 'Apps',
    image: 'https://play-lh.googleusercontent.com/AgjV-7hiXgImtX-5S0WfE8tO9KjDjpw9_V5W5W5W5W5W5W5W5W5W5W5W5W5W5W5W5',
    rating: 4.9,
    plays: '100M',
    description: 'Play PC games on any device with the power of the cloud. (Note: May require login)',
    url: 'https://play.geforcenow.com'
  },
  {
    id: 'discord',
    title: 'Discord',
    category: 'Apps',
    image: 'https://assets-global.website-files.com/6257adef93867e56f84d3092/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
    rating: 4.8,
    plays: '500M',
    description: 'Chat, hang out, and stay close with your friends and communities.',
    url: 'https://discord.com/app'
  },
  {
    id: 'spotify',
    title: 'Spotify',
    category: 'Apps',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png',
    rating: 4.9,
    plays: '1B',
    description: 'Web player for Spotify. Listen to your favorite music and podcasts.',
    url: 'https://open.spotify.com'
  },
  {
    id: 'duckduckgo',
    title: 'DuckDuckGo',
    category: 'Apps',
    image: 'https://upload.wikimedia.org/wikipedia/en/9/90/The_DuckDuckGo_Duck.png',
    rating: 4.7,
    plays: '50M',
    description: 'Browse the web privately. Search without being tracked.',
    url: 'https://duckduckgo.com'
  }
];