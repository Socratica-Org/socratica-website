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
			<a href="/" class="bg-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[105px]">
				<img src={UsersThree} alt="Users" class="w-4 h-4 md:w-6 md:h-6" />
				<span>ABOUT</span>
			</a>
			<a href="/map" class="bg-primary py-2 px-2.5  text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 w-[85px]">
				<img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
				<span>MAP</span>
			</a>
			<a href="/" class="bg-primary py-2 px-2.5  text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2">
				<img src={Eye} alt="Eye" class="w-4 h-4 md:w-6 md:h-6" />
				<span>GET INVOLVED</span>
			</a>
		</div>
		
		
		<div class="absolute top-5 left-1/2 transform -translate-x-1/2">
			<h1 class="text-2xl font-tiempos-headline">Socratica</h1>
		</div>
		
		
		<div class="container mx-auto max-w-screen-xl px-6 md:px-8">

			<div class="flex flex-col items-center mb-8 relative lg:h-[250px] h-250 mt-0 md:mt-16">
				<button on:click={switchDoodle} class="absolute inset-0 opacity-0 cursor-pointer"></button>
				<img id="socraticaLogo" src={currentDoodle.src} alt="Socratica Logo" class="h-full w-auto"/>
			</div>
			
			
			<div class="flex space-x-4 mt-8">
				<div class="w-4/6 md:w-1/2">
					<p class="text-lg sm:text-xl lg:text-3xl font-tiempos-headline text-[#41403F]">
						We host weekly <span class="border-dashed border-b-2" style="border-color: #41403F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #41403F, #41403F 5px, transparent 5px, transparent 10px) 1/1 0 round">co-working sessions</span>
						so that you can work on your <span class="italic">passion projects</span> with likeminded people.
					</p>
					<div class="mt-4">
						<button class="bg-black px-4 py-2 md:px-6 md:py-3 mb-1 rounded-full border border-gray-300 text-xs lg:text-sm text-white font-mono hover:bg-gray-400">
							<img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 md:w-6 md:h-6 inline-block" />
							ATTEND A SESSION
						</button>
						<button class="bg-white px-4 py-2 md:px-6 md:py-3 rounded-full text-xs lg:text-sm font-mono border border-gray-300 hover:bg-gray-400">
							<img src={Spiral} alt="Spiral" class="w-3 h-3 md:w-6 md:h-6  inline-block" />
							DIVE DEEPER
						</button>
					</div>
				</div>
				
			
				<div class="flex-1 flex flex-col items-end justify-end">
					<p class="font-mono text-xs md:text-sm text-[#706F6B]">CURRENT ART</p>
					<p class="font-graphik text-right ">{currentDoodle.title}</p>
				</div>
				
			</div>
		</div>
	</div>
	<div class="-mt-32">
		<img src={people} alt="People at Socratica" class="w-full  min-h-40" />
	</div>
</section>

<section>
	<div class="bg-primary bg-cover bg-center bg-no-repeat px-2" style="background-image: url({BackgroundLines})">
		<div class="flex justify-center items-center pt-40 pb-10">
			<span class="px-4 py-2 md:px-6 md:py-3 rounded-full border-2 text-xs md:text-sm font-mono inline-block p-2" style="border-color: #C6482C; color: #C6482C">
				<img src={HandWaving} alt="Hand waving" class="w-4 h-4 md:w-6 md:h-6 inline-block" />
				WHAT WE ARE
			</span>
		</div>
		<div class="flex flex-col justify-center items-center text-2xl md:text-4xl font-tiempos-headline pt-8" style="font-weight: 300;">
			<div class="flex items-center">
			  <img src={RedCircle} alt="red circle" class="w-12 h-8 md:w-14 md:h-10 pr-4">
			  <div class="inline-block pb-2">A open <span class="border-dashed border-b-2" style="border-color: #CDC19F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #CDC19F, #CDC19F 5px, transparent 5px, transparent 10px) 1/1 0 round"> celebration <span class="italic">of</span> makers</span>, artists,</div>
			</div>
			<div class="flex items-center">
			  <div class="inline-block pb-1"> <span class="font-glyphworld">e</span>ngineers, <span class="font-glyphworld">d</span>esigners, writers, <span class="font-glyphworld">p</span>oets,</div>
			  <img src={GreenCircle} alt="green circle" class="w-12 h-8 md:w-14 md:h-10 pl-4">
			</div>
			<div class="flex items-center">
			  <div class="inline-block">and <span class="italic relative text-stone bottom-0 left-0 border-b-4" style="border-color: #CDC19F">everything</span></div>
			  <img src={YellowCircle} alt="yellow circle" class="w-18 h-8 md:w-18 md:h-10 pr-4 pl-4">
			  <div class="inline-block  font-tiempos-headline">
				<span style="background: linear-gradient(to right, #899248, #000000); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"><span class="italic">in</span>-between</span>
			  </div>	  
			</div>
		</div>
		<div class="flex items-center justify-center font-Graphik text-zinc-800 pt-8 pb-40 px-12" >
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
	<div class="bg-primary pt-24 md:pt-40">
		<div class=" md:pl-20 lg:pl-40 pl-14"> 
			<span class="px-4 py-2 md:px-6 md:py-3 rounded-full border-2 text-xs md:text-sm font-mono inline-block p-2" style="border-color: #854F6F; color: #854F6F">
				<img src={Alien} alt="Alien" class="w-4 h-4 md:w-6 md:h-6 inline-block" />
			  WHO CAN COME
			</span>
		</div>
		
		<div class="pt-6 md:pl-20 lg:pl-44 pl-14 w-5/6 md:w-full"> 
			<div class="text-3xl xs:text-3xl sm:text-3xl md:text-4xl  font-tiempos-headline">Whether you're just starting out or far along, 
				<br class="hidden md:block"/>this is a place for <i>you</i>
			</div> 
			<div class="font-Graphik pt-6">
				We know it can be intimidating to start
				<br/>(we've been there).
			</div>
		</div>
		<img src={WhoCanCome} alt="Who Can Come" class="-mt-24 sm:-mt-32 md:-mt-36 lg:-mt-80">
	</div>
  </section>





  <section>
    <div class="flex bg-primary pt-12 md:pt-40 md:pb-40">
        <div class="md:pl-16 lg:pl-20 flex flex-col justify-start">
            <!-- This image will be hidden on small (mobile) and medium screens -->
			<img src={JoinUs} alt="JoinUs" class="w-200 h-400 md:w-[792px] md:h-[476px] hidden md:inline-block">
        </div>
        <div class="flex-grow pl-10 md:pl-20">
			<div class="pl-4 pt-12">
				<span class="px-4 py-2 md:px-6 md:py-3 border-2 rounded-full text-xs md:text-sm font-mono inline-block p-2" style="border-color: #758F2A; color: #758F2A;">
					<img src={Scroll} alt="Scroll" class="w-4 h-4 md:w-6 md:h-6 inline-block" />
					HOW IT WORKS
				</span>
			</div>
            <div class="p-5 pr-40 text-zinc-800">
                <div class="text-3xl xs:text-3xl sm:text-3xl md:text-4xl font-tiempos-headline pt-9" style="font-weight: 300;"> 
                    Introductions 👋,
                    <br/>two 50-min work blocks 🖋️️💻🎨,
                    <br/>ending with casual open <span class="italic">demos</span> 🤝
                    <br/><span class="italic " style="color: #CFCCC4"> + snacks along the way.</span>
                </div>
                <div class="pt-5 text-zinc-800 font-inter">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to make stuff, and you're invited</div>
            </div>
        </div>
		<!-- This image will be visible only on small screens and hidden on medium and larger screens -->
    </div>
	<img src={JoinUs} alt="JoinUs" class="w-200 h-400 md:hidden sm:inline-block p-10 bg-primary">
</section>


<section>
	<div class="flex bg-primary pb-40 md:pl-16 lg:pl-20 pl-8 bg-cover bg-center bg-no-repeat" style="background-image: url({BackgroundLines2})">
        <div class="flex-grow md:pl-16 lg:pl-20">
            <div class="pl-4 pt-14">
                <span class="px-6 py-3 border-2 rounded-full text-xs md:text-sm font-mono inline-block p-2" style="border-color: #2C64B7; color: #2C64B7;">
                    <img src={Smiley} alt="Smiley" class="w-4 h-4 md:w-6 md:h-6 inline-block" />
                    WHY WE DO WHAT WE DO
                </span>
            </div>
            <div class="p-5 pr-24 md:pr-40">
                <div class="text-3xl xs:text-3xl sm:text-3xl md:text-4xl text-zinc-800 font-light font-tiempos-headline pt-4 " style="font-weight: 300;"> 
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