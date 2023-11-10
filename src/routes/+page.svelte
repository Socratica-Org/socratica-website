<script lang="ts">
	import doodle1 from '$lib/images/socratica-doodle.png';
	import doodle2 from '$lib/images/socratica-doodle-alt.png';
	import people from '$lib/images/socratica-people.png';
	import UsersThree from '$lib/images/UsersThree.png';
	import MapTrifold from '$lib/images/MapTrifold.png';
	import Eye from '$lib/images/Eye.png';
	import ArrowDownRight from '$lib/images/ArrowDownRight.png';
	import Spiral from '$lib/images/Spiral.png';
	import BackgroundLines from '$lib/images/BackgroundLines.png';
	import BackgroundLines2 from '$lib/images/BackgroundLines2.png';
	import RedCircle from '$lib/images/red-circle.png';
	import GreenCircle from '$lib/images/green-circle.png';
	import YellowCircle from '$lib/images/yellow-circle.png';
	import Alien from '$lib/images/Alien.png'
	import WhoCanCome from '$lib/images/WhoCanCome.png';
	import HandWaving from '$lib/images/HandWaving.png'
	import Scroll from '$lib/images/Scroll.png';
	import JoinUs from '$lib/images/JoinUs.png';
	import Smiley from '$lib/images/Smiley.png';
	import Polaroid from '$lib/images/Polaroid.png';

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
			<a href="/" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[105px]">
				<img src={UsersThree} alt="Users" class="w-6 h-6" />
				<span>ABOUT</span>
			</a>
			<a href="/map" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[85px]">
				<img src={MapTrifold} alt="Map" class="w-6 h-6" />
				<span>MAP</span>
			</a>
			<a href="/" class="bg-primary py-2 px-2.5 rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2">
				<img src={Eye} alt="Eye" class="w-6 h-6" />
				<span>GET INVOLVED</span>
			</a>
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
	<div class="-mt-32">
		<img src={people} alt="People at Socratica" class="w-full h-auto" />
	</div>
</section>

<section>
	<div class="bg-primary bg-cover bg-center bg-no-repeat" style="background-image: url({BackgroundLines})">
		<div class="flex justify-center items-center pt-40 pb-10">
			<span class="px-6 py-3 rounded-full border-2 text-sm font-mono inline-block p-2" style="border-color: #C6482C; color: #C6482C">
				<img src={HandWaving} alt="Hand waving" class="w-6 h-6 inline-block" />
				WHAT WE ARE
			</span>
		</div>
		<div class="flex flex-col justify-center items-center text-4xl font-tiempos-headline pt-8" style="font-weight: 300;">
			<div class="flex items-center">
			  <img src={RedCircle} alt="red circle" class="w-12 h-12 mr-4">
			  <div class="inline-block pb-2">A open <span class="border-dashed border-b-2" style="border-color: #CDC19F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #CDC19F, #CDC19F 5px, transparent 5px, transparent 10px) 1/1 0 round"> celebration <span class="italic">of</span> makers</span>, artists,</div>
			</div>
			<div class="flex items-center">
			  <div class="inline-block pb-1"> <span class="font-glyphworld">e</span>ngineers, <span class="font-glyphworld">d</span>esigners, writers, <span class="font-glyphworld">p</span>oets,</div>
			  <img src={GreenCircle} alt="green circle" class="w-12 h-12 ml-4">
			</div>
			<div class="flex items-center">
			  <div class="inline-block">and <span class="italic relative text-stone bottom-0 left-0 border-b-4" style="border-color: #CDC19F">everything</span></div>
			  <img src={YellowCircle} alt="yellow circle" class="w-12 h-12 mr-4 ml-4">
			  <div class="inline-block text-4xl font-tiempos-headline">
				<span style="background: linear-gradient(to right, #899248, #000000); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"><span class="italic">in</span>-between</span>
			  </div>	  
			</div>
		</div>
		<div class="flex items-center justify-center font-Graphik text-zinc-800 pt-8 pb-40" >
			<div class="text-center">
			  <div>Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to</div>
			  <div class="mx-auto"><span class="italic">make</span> stuff, and 
				<a href="https://lu.ma/socratica" target="_blank" class="bottom-0 left-0 border-b-2 leading-13" style="border-color: #706F6B; color: #706F6B">
					you're invited
			 	</a>
			  .</div>
			</div>
		</div>
	</div>  
  </section>

  <section>
	<div class="bg-primary pt-40">
		<div class="pl-44"> 
			<span class="px-6 py-3 rounded-full border-2 text-sm font-mono inline-block p-2" style="border-color: #854F6F; color: #854F6F">
				<img src={Alien} alt="Alien" class="w-6 h-6 inline-block" />
			  WHO CAN COME
			</span>
		</div>
		
		<div class="pt-6 pl-44"> 
			<div class="text-4xl font-tiempos-headline">Whether you're just starting out or far along, 
				<br/>this is a place for <i>you</i>
			</div> 
			<div class="font-Graphik pt-6">
				We know it can be intimidating to start
				<br/>(we've been there).
			</div>
		</div>
		<img src={WhoCanCome} alt="Who Can Come" class="-mt-80">
	</div>
  </section>

  <section class="bg-primary">
    <div class="flex pt-40 pb-40">
        <div class="pl-40 flex flex-col justify-start">
			<img src={JoinUs} alt="JoinUs" style="width: 792px; height: 476px;">
        </div>
        <div class="flex-grow pl-20">
			<div class="pl-4 pt-12">
				<span class="px-6 py-3 border-2 rounded-full text-sm font-mono inline-block p-2" style="border-color: #758F2A; color: #758F2A;">
					<img src={Scroll} alt="Scroll" class="w-6 h-6 inline-block" />
					HOW IT WORKS
				</span>
			</div>
            <div class="p-5 pr-40 text-zinc-800">
                <div class="text-4xl font-tiempos-headline pt-12" style="font-weight: 300;"> 
                    Introductions 👋,
                    <br/>two 50-min work blocks 🖋️️💻🎨,
                    <br/>ending with casual open <span class="italic">demos</span> 🤝
                    <br/><span class="italic " style="color: #CFCCC4"> + snacks along the way.</span>
                </div>
                <div class="pt-5 text-zinc-800 font-inter">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to make stuff, and you're invited</div>
            </div>
        </div>
    </div>
	<img src={Polaroid} alt="Polaroid" class="mx-auto" style="width: 1200px; height: 1000;">
</section>

<section>
	<div class="flex bg-primary pb-40 pl-20 bg-cover bg-center bg-no-repeat" style="background-image: url({BackgroundLines2})">
        <div class="flex-grow pl-20">
            <div class="pl-4 pt-14">
                <span class="px-6 py-3 border-2 rounded-full text-sm font-mono inline-block p-2" style="border-color: #2C64B7; color: #2C64B7;">
                    <img src={Smiley} alt="Smiley" class="w-6 h-6 inline-block mr-2" />
                    WHY WE DO WHAT WE DO
                </span>
            </div>
            <div class="p-5 pr-40">
                <div class="text-4xl text-zinc-800 font-light font-tiempos-headline pt-4 " style="font-weight: 300;"> 
                    We like helping good people do great things.
                    <div>Got an extra minute? <span class=" border-b-2" style="border-color: #706F6B; color: #706F6B;"> We have more to say</span></div>
                </div>
            </div>
        </div>
    </div>
</section>



<!-- <div class="w-[1131.80px]"><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to </span>
	<div><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">
	make <span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]"> stuff, and </span><span style="text-stone-500 text-[32px] font-normal font-['Graphik'] underline leading-[44.80px]">you’re invited</span><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">. </span></div> -->