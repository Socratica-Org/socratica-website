<script lang="ts">
	import doodle1 from '$lib/images/socratica-doodle.png';
	import doodle2 from '$lib/images/socratica-doodle-alt.png';
	import people from '$lib/images/socratica-people.png';
	import sessionPano from '$lib/images/session-pano.png';
	import UsersThree from '$lib/images/UsersThree.png';
	import MapTrifold from '$lib/images/MapTrifold.png';
	import Eye from '$lib/images/Eye.png';
	import ArrowDownRight from '$lib/images/ArrowDownRight.png';
	import Spiral from '$lib/images/Spiral.png';

	const doodles = [
    {
        src: doodle1,
        title: '"Little Guys", by Aileen Luo'
    },
    {
        src: doodle2,
        title: '"Project Block", by Someone'
    },
	];

	let randomIndex = Math.floor(Math.random() * doodles.length);
	let currentDoodle = doodles[randomIndex];

	function switchDoodle() {
		randomIndex = (randomIndex + 1) % doodles.length;
		currentDoodle = doodles[randomIndex];
	}

</script>

<svelte:head>
	<title>Socratica</title>
	<meta name="description" content="We host weekly co-working sessions so that you can work on your passion projects with likeminded people." />
</svelte:head>


<section>
	<div class="flex flex-col h-screen justify-center bg-primary">
		<div class="absolute top-5 left-10 w-10 h-10 bg-black rounded-full" />
		<div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
			<button class="bg-white py-2 px-2.5 rounded-full border border-gray-300 hover:bg-gray-400 font-mono inline-flex items-center space-x-2 w-[105px]">
				<img src={UsersThree} alt="Users" class="w-6 h-6" />
				<span>ABOUT</span>
			</button>
			<button class="bg-white py-2 px-2.5 rounded-full border border-gray-300 hover:bg-gray-400 font-mono inline-flex items-center space-x-2 w-[85px]">
				<img src={MapTrifold} alt="Map" class="w-6 h-6" />
				<span>MAP</span>
			</button>
			<button class="bg-white py-2 px-2.5 rounded-full border border-gray-300 hover:bg-gray-400 font-mono inline-flex items-center space-x-2">
				<img src={Eye} alt="Eye" class="w-6 h-6" />
				<span>GET INVOLVED</span>
			</button>
		</div>
		
		
		<div class="absolute top-5 left-1/2 transform -translate-x-1/2">
			<h1 class="text-2xl font-tiempos-headline">Socratica</h1>
		</div>
		
		
		<div class="container mx-auto max-w-screen-xl px-8">

			<div class="flex flex-col items-center mb-8 relative h-[250px]">
				<button on:click={switchDoodle} class="absolute inset-0 opacity-0 cursor-pointer"></button>
				<img id="socraticaLogo" src={currentDoodle.src} alt="Socratica Logo" class="h-full w-auto"/>
			</div>
			
			
			<div class="flex space-x-4 mt-8">
				<div class="w-1/2">
					<p class="text-3xl font-tiempos-headline text-[#41403F]">
						We host weekly <span class="border-dashed border-b-2" style="border-color: #41403F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #41403F, #41403F 5px, transparent 5px, transparent 10px) 1/1 0 round">co-working sessions</span>
						so that you can work on your <span class="italic">passion projects</span> with likeminded people.
					</p>
					<div class="mt-4">
						<button class="bg-black px-6 py-3 rounded-full border border-gray-300 text-sm text-white font-mono hover:bg-gray-400">
							<img src={ArrowDownRight} alt="Arrow Down Right" class="w-6 h-6 inline-block" />
							ATTEND A SESSION
						</button>
						<button class="bg-white px-6 py-3 rounded-full text-sm font-mono border border-gray-300 hover:bg-gray-400">
							<img src={Spiral} alt="Spiral" class="w-6 h-6 inline-block" />
							DIVE DEEPER
						</button>
					</div>
				</div>
				
			
				<div class="flex-1 flex flex-col items-end justify-end">
					<p class="font-mono text-sm text-[#706F6B]">CURRENT ART</p>
					<p class="font-graphik">{currentDoodle.title}</p>
				</div>
				
			</div>
		</div>
	</div>
	<div class="-mt-40">
		<img src={people} alt="People at Socratica" class="w-full h-auto" />
	</div>
</section>

<section class="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
  <div class="text-left absolute top-[15%] mx-36">
	  <button class="bg-white px-6 py-3 rounded-full mb-6 text-sm uppercase font-mono border border-gray-300 hover:bg-gray-400">
		<img src={Spiral} alt="Spiral" class="w-6 h-6 inline-block" />
		who can come
	</button>
    <h1 class="text-4xl font-bold mb-4">Whether you're just starting out or far along, this is a place for <i>you</i>.</h1>
    <p class="text-lg text-gray-700">We know it can be intimidating to start</p>
	  <p class="text-lg text-gray-700 mb-8">(we've been there).</p>
  </div>
  <img src={sessionPano} alt="Your Description" class="absolute bottom-0 h-1/2 w-full object-cover">
</section>

