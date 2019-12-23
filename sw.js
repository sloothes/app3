//	app3/sw.js

	self.version = 1;
	var debugMode = true;

	var libraries = [

		"/js/Objectid.js",
		"/js/rawdeflate.js",
		"/js/rawinflate.js",
		"/js/jquery.min.js",
		"/js/zangodb.min.js",
		"/js/signals.min.js",
		"/js/validator.min.js",
		"/js/bootstrap.min.js",

		"/three/three.js",
		"/three/Animation.js",
		"/three/AnimationHandler.js",
		"/three/KeyFrameAnimation.js",
		"/three/EditorControls.js", 
		"/three/TransformControls.js", 
		"/three/SubdivisionModifier.js",
		"/three/UVsDebug.js",
		"/three/shader.js",
		"/three/system.min.js",

		"/js/MW.js",
		"/js/MWtps.js",
		"/js/VirtualInput.js",

	];

	self.addEventListener( "install", async function () {

		var cache = await caches.open( "libraries" );

		libraries.forEach( function ( script ) {

			cache.add( script ).catch( function () {

				console.error( '[SW] Cound\'t cache:', script );

			});

		});

	});

	self.addEventListener( "fetch", async function ( event ) {

		const request = event.request;
		event.respondWith( cacheFirst( request ) );

	});

	async function cacheFirst( request ) {

		const cachedResponse = await caches.match( request );

		if ( cachedResponse === undefined ) {

			console.error( '[SW] Not cached:', request.url );
			return fetch( request );

		}

		return cachedResponse;

	}
