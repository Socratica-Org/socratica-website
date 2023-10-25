<script lang="ts">
	import logo from '$lib/images/socratica-logo.png';
	import altLogo from '$lib/images/socratica-logo-alt.png';
	import people from '$lib/images/socratica-people.png';
	import UsersThree from '$lib/images/UsersThree.png';
	import MapTrifold from '$lib/images/MapTrifold.png';
	import Eye from '$lib/images/Eye.png';
	import ArrowDownRight from '$lib/images/ArrowDownRight.png';
	import Spiral from '$lib/images/Spiral.png';
	import RedCircle from '$lib/images/red-circle.png';
	import GreenCircle from '$lib/images/green-circle.png';
	import YellowCircle from '$lib/images/yellow-circle.png';
	import HandWaving from '$lib/images/HandWaving.png'
	import Scroll from '$lib/images/Scroll.png';
	import JoinUs from '$lib/images/JoinUs.png';

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


<section>
	<div class="bg-primary">
		<div class="flex justify-center items-center pt-40 pb-10">
			<button class="px-6 py-3 rounded-full text-sm font-mono border-2 border-orange-700 hover:bg-gray-400 text-orange-700">
				<img src={HandWaving} alt="Hand waving" class="w-6 h-6 inline-block" />
				WHAT WE ARE
			</button>
		</div>
		<div class="flex flex-col justify-center items-center pt-10">
			<div class="text-3xl font-tiempos-headline flex items-center">
			  <img src={RedCircle} alt="red circle" class="w-6 h-6 mr-4">
			  <div class="inline-block">A open celebration of makers, artists,</div>
			</div>
			<div class="text-3xl font-tiempos-headline flex items-center">
			  <div class="inline-block">engineers, designers, writers, poets,</div>
			  <img src={GreenCircle} alt="green circle" class="w-6 h-6 ml-4">
			</div>
			<div class="text-3xl font-tiempos-headline flex items-center">
			  <div class="inline-block">and everything</div>
			  <img src={YellowCircle} alt="yellow circle" class="w-6 h-6 mr-4 ml-4">
			  <div class="inline-block">in-between.</div>
			</div>
		</div>
		<div class="flex items-center justify-center pt-10 pb-40">
			<div class="text-center">
			  <div>Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to</div>
			  <div class="mx-auto">make stuff, and you're invited</div>
			</div>
		</div>
	</div>  
  </section>
  
  <section>
    <div class="flex bg-primary pb-40">
        <div class="pl-40 flex flex-col justify-start">
            <img src={JoinUs} alt="JoinUs">
        </div>
        <div class="flex-grow">
			<div class="pl-4 pt-14">
				<button class="px-6 py-3 rounded-full text-sm font-mono border-2 border-lime-700 hover:bg-gray-400 text-lime-700">
					<img src={Scroll} alt="Scroll" class="w-6 h-6 inline-block" />
					HOW IT WORKS
				</button>
			</div>
            <div class="p-5 pr-40">
                <div class="text-3xl font-tiempos-headline pt-2"> 
                    Introductions 👋,
                    <div>two 50-min work blocks 🖋️️💻🎨,</div>
                    <div>ending with casual open demos 🤝</div>
                    <div>+ snacks along the way.</div>
                </div>
                <div class="pt-5">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to</div>
                <div>make stuff, and you're invited</div>
            </div>
        </div>
    </div>
</section>




<!-- <div class="w-[1131.80px]"><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to </span>
	<div><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">
	make <span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]"> stuff, and </span><span style="text-stone-500 text-[32px] font-normal font-['Graphik'] underline leading-[44.80px]">you’re invited</span><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">. </span></div> -->