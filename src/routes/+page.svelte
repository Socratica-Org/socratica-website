<script lang="ts">
  import doodle1 from "$lib/images/socratica-doodle.png";
  import doodle2 from "$lib/images/socratica-doodle-alt.png";
  import doodle3 from "$lib/images/socratica-doodle-3.png";
  import doodle4 from "$lib/images/socratica-doodle-4.png";
  import doodle5 from "$lib/images/socratica-doodle-5.png";
  import doodle6 from "$lib/images/socratica-doodle-6.png";
  import people from "$lib/images/socratica-people.png";
  import ArrowDownRight from "$lib/images/ArrowDownRight.png";
  import Spiral from "$lib/images/Spiral.png";
  import BackgroundLines from "$lib/images/BackgroundLines.png";
  import BackgroundLines2 from "$lib/images/BackgroundLines2.png";
  import RedCircle from "$lib/images/red-circle.png";
  import GreenCircle from "$lib/images/green-circle.png";
  import YellowCircle from "$lib/images/yellow-circle.png";
  import Alien from "$lib/images/Alien.png";
  import WhoCanCome from "$lib/images/WhoCanCome.png";
  import HandWaving from "$lib/images/HandWaving.png";
  import Scroll from "$lib/images/Scroll.png";
  import JoinUs from "$lib/images/JoinUs.png";
  import Smiley from "$lib/images/Smiley.png";
  import Polaroid from "$lib/images/Polaroid.png";
  import Navbar from "$lib/components/navbar.svelte";

  const doodles = [
    {
      src: doodle1,
      title: '"Little Guys", by Aileen Luo',
    },
    {
      src: doodle2,
      title: '"Project Block", by Someone',
    },
    {
      src: doodle4,
      title: '"Socratica", by Someone',
    },
    {
      src: doodle5,
      title: '"MS Paint", by HudZah',
    },
    {
      src: doodle6,
      title: `"Aileen's Worst Nightmare", by Jake Rudolph`,
    },
  ];

  let randomIndex = Math.floor(Math.random() * doodles.length);
  let currentDoodle = doodles[randomIndex];

  function switchDoodle() {
    randomIndex = (randomIndex + 1) % doodles.length;
    currentDoodle = doodles[randomIndex];
  }

  const socraticaURL = "https://lu.ma/socratica";

  function scrollToSection() {
    const section = document.getElementById("what-we-are");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<svelte:head>
  <title>Socratica</title>
  <meta
    name="description"
    content="We host weekly co-working sessions for you to work on your passion projects with likeminded people."
  />
</svelte:head>

<section class="block">
  <div class="flex flex-col h-[670px] sm:h-[800px] justify-center bg-primary">
    <!-- <div
      class="absolute top-5 left-3 sm:left-10 w-10 h-10 bg-black rounded-full"
    /> -->
    <Navbar />

    <div class="absolute top-24 md:top-20 left-10 transform">
      <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </div>

    <div class="container mx-auto max-w-screen-xl px-6 md:px-8">
      <div
        class="flex flex-col items-center relative lg:h-[250px] mt-16 -mb-8 md:mb-0"
      >
        <button
          on:click={switchDoodle}
          class="absolute inset-0 opacity-0 cursor-pointer"
        />
        <img
          id="socraticaLogo"
          src={currentDoodle.src}
          alt="Socratica Logo"
          class="h-[200px] w-auto object-contain
					{currentDoodle.title == `"Aileen's Worst Nightmare", by Jake Rudolph`
            ? 'md:h-[450px] md:-mt-14'
            : ''}"
        />
      </div>

      <div class="flex space-x-4 mb-8 md:mb-12">
        <div class="w-4/6 md:w-1/2">
          <p
            class="text-md sm:text-xl lg:text-3xl font-tiempos-headline text-[#41403F]"
          >
            We host weekly <span
              class="border-dashed border-b-2"
              style="border-color: #41403F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #41403F, #41403F 5px, transparent 5px, transparent 10px) 1/1 0 round"
              >co-working sessions</span
            >
            for you to work on your <span class="italic">passion projects</span> with likeminded people.
          </p>
          <div class="mt-4">
            <a href="/map" target="_blank" rel="noopener noreferrer">
              <button
                class="bg-black px-4 py-2 md:px-6 md:py-3 mb-1 rounded-full border border-gray-300 text-[10px] text-xs lg:text-sm text-white font-mono hover:bg-[#706F6B] transition-colors duration-500 ease-in-out"
              >
                <img
                  src={ArrowDownRight}
                  alt="Arrow Down Right"
                  class="w-3 h-3 md:w-6 md:h-6 inline-block"
                />
                ATTEND A SESSION
              </button>
            </a>
            <button
              class="bg-primary px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] text-xs lg:text-sm font-mono border border-gray-300 hover:bg-cool-grey transition-colors duration-500 ease-in-out"
              on:click={scrollToSection}
            >
              <img
                src={Spiral}
                alt="Spiral"
                class="w-3 h-3 md:w-6 md:h-6 inline-block"
              />
              DIVE DEEPER
            </button>
          </div>
        </div>

        <div class="flex-1 flex flex-col items-end justify-end">
          <p class="font-mono text-[8px] md:text-sm text-[#706F6B]">
            CURRENT ART
          </p>
          <p class="font-graphik text-right text-[10px] md:text-sm">
            {currentDoodle.title}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="-mt-28">
    <img src={people} alt="People at Socratica" class="w-full min-h-40" />
  </div>
</section>

<section id="what-we-are">
  <div
    class="bg-primary bg-cover bg-center bg-no-repeat px-2"
    style="background-image: url({BackgroundLines})"
  >
    <div class="flex justify-center items-center pt-40 pb-10">
      <span
        class="px-4 py-2 md:px-6 md:py-3 rounded-full border-2 text-[10px] text-xs md:text-sm font-mono inline-block p-2"
        style="border-color: #C6482C; color: #C6482C"
      >
        <img
          src={HandWaving}
          alt="Hand waving"
          class="w-4 h-4 md:w-6 md:h-6 inline-block"
        />
        WHAT WE ARE
      </span>
    </div>
    <!-- <div class="flex flex-col justify-center items-center text-[18.5px] text-xl md:text-4xl font-tiempos-headline md:pt-8" style="font-weight: 300;">
			<div class="flex items-center">
			  <img src={RedCircle} alt="red circle" class="w-10 md:w-16 pr-2 pl-2 md:pr-4 md:pl-4">
			  <div class="inline-block pb-2">A open <span class="border-dashed border-b-2" style="border-color: #CDC19F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #CDC19F, #CDC19F 5px, transparent 5px, transparent 10px) 1/1 0 round"> celebration <span class="italic">of</span> makers</span>, artists,</div>
			</div>
			<div class="flex items-center">
			  <div class="inline-block pb-1"> <span class="font-glyphworld">e</span>ngineers, <span class="font-glyphworld">d</span>esigners, writers, <span class="font-glyphworld">p</span>oets,</div>
			  <img src={GreenCircle} alt="green circle" class="w-10 md:w-16 pr-2 pl-2 md:pr-4 md:pl-4">
			</div>
			<div class="flex items-center">
			  <div class="inline-block">and <span class="italic relative text-stone bottom-0 left-0 border-b-4" style="border-color: #CDC19F">everything</span></div>
			  <img src={YellowCircle} alt="yellow circle" class="w-10 md:w-16 pr-2 pl-2 md:pr-4 md:pl-4">
			  <div class="inline-block  font-tiempos-headline">
				<span style="background: linear-gradient(to right, #899248, #000000); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"><span class="italic">in</span>-between</span>
			  </div>	  
			</div>
		</div> -->
    
    <div
      class="flex flex-col justify-center items-center text-[16px] sm:text-[20px] md:text-4xl font-tiempos-headline md:pt-8"
      style="font-weight: 300;"
    >
      <!-- Use whitespace-nowrap for very small screens and allow wrapping for larger screens -->
      <div class="flex items-center whitespace-nowrap sm:whitespace-normal">
        <img
          src={RedCircle}
          alt="red circle"
          class="w-10 md:w-16 pr-2 pl-2 md:pr-4 md:pl-4"
        />
        <div class="inline-block pb-2">
          An open collective <span class="italic">of</span> makers, artists,
        </div>
      </div>
      <div class="flex items-center whitespace-nowrap sm:whitespace-normal">
        <div class="inline-block pb-1">
          engineers, designers, writers, poets,
        </div>
        <img
          src={GreenCircle}
          alt="green circle"
          class="w-10 md:w-16 pr-2 pl-2 md:pr-4 md:pl-4"
        />
      </div>
      <div class="flex items-center whitespace-nowrap sm:whitespace-normal">
        <div class="inline-block">
          and <span
            class="border-dashed border-b-2"
            style="border-color: #CDC19F; border-width: 0 0 2px; border-image: repeating-linear-gradient(to right, #CDC19F, #CDC19F 5px, transparent 5px, transparent 10px) 1/1 0 round"
          >everything</span
          >
        </div>
        <img
          src={YellowCircle}
          alt="yellow circle"
          class="w-10 md:w-16 pr-2 pl-2 md:pr-4 md:pl-4"
        />
        <div class="inline-block font-tiempos-headline">
          <span
            style="background: linear-gradient(to right, #899248, #000000); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"
            ><span class="italic">in</span>-between.</span
          >
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-center font-Graphik text-zinc-800 pt-5 md:pt-8 pb-40 px-12"
    >
      <div class="text-center text-[12px] md:text-sm">
        <span class="block md:hidden"
          >Socratica is a live, IRL co-working session hosted every Sunday in Waterloo
          bringing together people who want to <span class="italic">make</span>
          stuff, and
          <a
            href="https://lu.ma/socratica"
            target="_blank"
            class="border-b-2"
            style="border-color: #706F6B; color: #706F6B;">you're invited</a
          >.</span
        >
        <div class="hidden md:block">
          Socratica is a live, IRL co-working session hosted every Sunday in Waterloo
          bringing together people who want to 
        </div>
        <div class="hidden md:block mx-auto">
          <span class="italic">make</span> stuff, and
          <a
            href="/map"
            class="border-b-2"
            style="border-color: #706F6B; color: #706F6B;">you're invited</a
          >.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="block">
  <div class="bg-primary pt-24 md:pt-40">
    <div class=" pl-8 md:pl-20 lg:pl-44">
      <span
        class="px-4 py-2 md:px-6 md:py-3 rounded-full border-2 text-[10px] text-xs md:text-sm font-mono inline-block p-2"
        style="border-color: #854F6F; color: #854F6F"
      >
        <img
          src={Alien}
          alt="Alien"
          class="w-4 h-4 md:w-6 md:h-6 inline-block"
        />
        WHO CAN COME
      </span>
    </div>

    <div class="pt-6 pl-8 md:pl-20 lg:pl-44 w-11/12 md:w-full">
      <div
        class="text-[20px] text-xl xs:text-3xl sm:text-3xl md:text-4xl font-tiempos-headline"
      >
        Whether you're just starting out or far along,
        <br class="hidden md:block" />this is a place for <i>you</i> to make things.
      </div>
      <div
        class="font-Graphik pt-2 md:pt-6 text-[11px] sm:text-[14px] sm:text-md"
      >
        We know it can be intimidating to start (we've been there),
        <br> but you'll be surrounded by others doing the same.
      </div>
    </div>
    <img
      src={WhoCanCome}
      alt="Who Can Come"
      class="-mt-18 sm:-mt-32 md:-mt-36 lg:-mt-80"
    />
  </div>
</section>

<section class="bg-primary">
  <div class="flex bg-primary pt-12 md:pt-40 md:pb-40">
    <div class="md:pl-16 lg:pl-20 flex flex-col justify-start">
      <!-- This image will be hidden on small (mobile) and medium screens -->
      <img
        src={JoinUs}
        alt="JoinUs"
        class="w-200 h-400 md:w-[792px] md:h-[476px] hidden md:inline-block"
      />
    </div>
    <div class="flex-grow pl-6 sm:pl-10 md:pl-20">
      <div class="pl-4 pt-12">
        <span
          class="px-4 py-2 md:px-6 md:py-3 border-2 rounded-full text-[10px] text-xs md:text-sm font-mono inline-block p-2"
          style="border-color: #758F2A; color: #758F2A;"
        >
          <img
            src={Scroll}
            alt="Scroll"
            class="w-4 h-4 md:w-6 md:h-6 inline-block"
          />
          HOW IT WORKS
        </span>
      </div>
      <!-- <div class="p-5 pr-6 md:pr-10 md:pr-40 text-zinc-800">
                <div class="text-xl xs:text-3xl sm:text-3xl md:text-4xl font-tiempos-headline md:pt-9" style="font-weight: 300;"> 
                    Introductions 👋,
                    <br/>two 50-min work blocks 🖋️️💻🎨,
                    <br/>ending with casual open <span class="italic">demos</span> 🤝
                    <br/><span class="italic " style="color: #CFCCC4"> + snacks along the way.</span>
                </div>
                <div class="pt-5 text-[11px] sm:text-[14px] text-zinc-800 font-inter">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to make stuff, and you're invited</div>
            </div> -->

      <div class="p-5 pr-6 md:pr-10 lg:pr-40 text-zinc-800">
        <div
          class="text-xl sm:text-3xl lg:text-4xl font-tiempos-headline lg:pt-9"
          style="font-weight: 300;"
        >
          Introductions,
          <br />
          <span class="md:hidden"
            >two 50-min work blocks, ending with casual open <span
              class="italic">demos</span
            ></span
          >
          <span class="hidden md:inline">two 50-min work blocks,</span>
          <span class="hidden md:inline"
            >ending with casual open <span class="italic">demos</span></span
          >
          <br class="" />
          <span class="italic" style="color: #CFCCC4"
            >+ snacks along the way.</span
          >
        </div>
        <div class="pt-5 text-[11px] md:text-[14px] text-zinc-800 font-inter">
          The real magic is in the demos - whether you've got 3 bullet points on a Google Docs or a full-blown prototype, we want to see it.
          It's a chance to share your work, get feedback, and celebrate your progress. And of course, make new friends.
        </div>
      </div>
    </div>
  </div>
  <!-- <img src={JoinUs} alt="JoinUs" class="w-200 h-400 md:hidden sm:inline-block p-10 bg-primary"> -->
  <img
    src={Polaroid}
    alt="Polaroid"
    class="mx-auto"
    style="width: 1200px; height: 1000;"
  />
</section>

<section>
  <div
    class="flex bg-primary pb-40 pl-8 md:pl-16 lg:pl-20 bg-cover bg-center bg-no-repeat"
    style="background-image: url({BackgroundLines2})"
  >
    <div class="flex-grow md:pl-16 lg:pl-20">
      <div class="pt-14">
        <span
          class="px-6 py-3 border-2 rounded-full text-[10.5px] text-xs md:text-sm font-mono inline-block p-2"
          style="border-color: #2C64B7; color: #2C64B7;"
        >
          <img
            src={Smiley}
            alt="Smiley"
            class="w-4 h-4 md:w-6 md:h-6 inline-block"
          />
          WHY WE DO WHAT WE DO
        </span>
      </div>
      <div class="py-5 md:pr-24 md:pr-40">
        <div
          class="text-xl xs:text-3xl sm:text-3xl md:text-4xl text-zinc-800 font-light font-tiempos-headline pt-4"
          style="font-weight: 300;"
        >
          We like helping great people <br class="sm:hidden" /> do great things.
          <div>
            Got an extra minute?
            <br class="sm:hidden md:hidden" />
            <a
              href="/about"
              class="border-b-2"
              style="border-color: #706F6B; color: #706F6B; text-decoration: none;"
            >
              We have more to say.
            </a>
          </div>
        </div>
          <div
          class="font-Graphik pt-2 md:pt-6 text-[11px] sm:text-[14px] sm:text-md"
          >
          We're united by the love of making things, and we want to help you make your thing.
          <br> Not in Waterloo? There's a good chance
            <a
              href="/map"
              class="border-b-2"
              style="border-color: #706F6B; color: #706F6B; text-decoration: none;"
              >
              a node exists near you.
            </a> If not, <a
              href="/get-involved"
              class="border-b-2"
              style="border-color: #706F6B; color: #706F6B; text-decoration: none;"
              >
              you can start a new one.
            </a>
      </div>
    </div>
  </div>
</section>

<!-- <div class="w-[1131.80px]"><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">Socratica is a live IRL co-working session hosted every Sunday bringing together people who want to </span>
	<div><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">
	make <span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]"> stuff, and </span><span style="text-stone-500 text-[32px] font-normal font-['Graphik'] underline leading-[44.80px]">you’re invited</span><span style="text-zinc-800 text-[32px] font-normal font-['Graphik'] leading-[44.80px]">. </span></div> -->
