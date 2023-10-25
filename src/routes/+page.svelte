<script lang="ts">
	import logo from '$lib/images/socratica-logo.png';
	import altLogo from '$lib/images/socratica-logo-alt.png';
	import people from '$lib/images/socratica-people.png';
	import UsersThree from '$lib/images/UsersThree.png';
	import MapTrifold from '$lib/images/MapTrifold.png';
	import Eye from '$lib/images/Eye.png';
	import ArrowDownRight from '$lib/images/ArrowDownRight.png';
	import Spiral from '$lib/images/Spiral.png';

	let logoSrc = logo;
	let artworkTitle = '"Little Guys", by Aileen Luo';

    function switchLogo() {
        logoSrc = (logoSrc === logo) ? altLogo : logo;
		artworkTitle = (logoSrc === altLogo) ? '"Project Block", by Someone' : '"Little Guys", by Aileen Luo';
    }

</script>

<svelte:head>
	<title>Socratica</title>
	<meta name="description" content="We host weekly co-working sessions so that you can work on your passion projects with likeminded people." />
</svelte:head>


<section>
	<div class="flex flex-col h-screen justify-center bg-primary">
		<div class="absolute top-5 left-10 w-10 h-10 bg-black rounded-full"></div>

		<div class="absolute top-5 right-5 flex flex-col space-y-2">
			<button class="bg-white py-2 px-2.5 rounded-full border border-gray-300 hover:bg-gray-400 font-mono inline-flex items-center space-x-2">
				<img src={UsersThree} alt="Users" class="w-6 h-6" />
				<span>ABOUT</span>
			</button>
			<button class="bg-white py-2 px-2.5 rounded-full border border-gray-300 hover:bg-gray-400 font-mono inline-flex items-center space-x-2">
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
			<div class="flex flex-col items-center mb-8">
				<button on:click={switchLogo} style="position: absolute; width: 100%; height: 100%; opacity: 0; cursor: pointer;"></button>
				<img id="socraticaLogo" src={logoSrc} alt="Socratica Logo" />
			</div>
			
			<div class="flex space-x-4 mt-8">
				<div class="w-1/2">
					<p class="text-3xl font-tiempos-headline">We host weekly co-working sessions so that you can work on your passion projects with likeminded people.</p>
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
			
				<!-- Text aligned to the right -->
				<div class="flex-1 flex flex-col items-end justify-end">
					<p class="font-mono text-sm text-[#706F6B]">CURRENT ART</p>
					<p class="font-graphik">{artworkTitle}</p>
				</div>
				
			</div>
		</div>
	</div>
	<div class="-mt-40">
		<img src={people} alt="People at Socratica" class="w-full h-auto" />
	</div>

</section>

