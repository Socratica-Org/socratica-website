<script>
  import House from "$lib/images/House.png";
  import GreenGuy from "$lib/images/GreenGuy.png";
  import OrangeGuy from "$lib/images/OrangeGuy.png";
  import YellowGuy from "$lib/images/YellowGuy.png";
  import BlueGuy from "$lib/images/BlueGuy.png";
  import PurpleGuy from "$lib/images/PurpleGuy.png";
  import PinkGuy from "$lib/images/PinkGuy.png";
  import BeigeGuy from "$lib/images/BeigeGuy.png";
  import Navbar from "$lib/components/navbar.svelte";
</script>

<div class="flex flex-col h-screen justify-center bg-primary">
  <div
    class="absolute top-5 left-7 sm:left-10 w-10 h-10 bg-black rounded-full"
  />
  <Navbar />

  <div class="absolute top-5 left-1/2 transform -translate-x-1/2">
    <a href="/">
      <h1 class="text-2xl font-tiempos-headline">Socratica</h1>
    </a>
  </div>

  <div class="flex flex-col items-center absolute w-full" style="top: 40%;">
    <h2
      class="text-[23px] mt-5 sm:text-4xl md:text-5xl font-tiempos-headline z-10"
    >
      Stiiiiill building this. (maybe)
    </h2>
    <p class="text-md md:text-xl font-tiempos-headline mt-4 md:mt-8">
      The page you’re looking for doesn’t exist.
    </p>
    <a
      href="/"
      class="text-xs md:text-base bg-[#2A2928] mt-12 md:mt-16 py-4 px-8 rounded-full border border-cool-grey hover:bg-[#706F6B] font-mono inline-flex items-center space-x-2 min-w-[150px] text-white transition-colors duration-500 ease-in-out"
      style="font-family: 'SF Mono', monospace;"
    >
      <img src={House} alt="Home" class="w-4 h-4 md:w-6 md:h-6" />
      <span>BACK TO HOME</span>
    </a>
  </div>

  <img
    src={GreenGuy}
    alt="Green Character"
    class="absolute top-[5%] right-[50%] transform scale-[0.27] md:top-[5%] lg:left-[15%] md:transform-scale-[0.6]"
  />
  <img
    src={OrangeGuy}
    alt="Orange Character"
    class="absolute top-[5%] left-[10%] transform scale-[0.4] md:top-[5%] lg:left-[43%] md:transform-scale-[0.6]"
  />
  <img
    src={YellowGuy}
    alt="Yellow Character"
    class="absolute top-[16%] left-[60%] transform scale-[0.4] md:top-[14%] lg:left-[66%] md:transform-scale-50"
  />

  <img
    src={BlueGuy}
    alt="Blue Character"
    class="absolute top-[47%] right-[63%] transform scale-[0.4] md:top-[45%] md:left-[15%] md:transform-scale-50"
  />
  <img
    src={PurpleGuy}
    alt="Purple Character"
    class="absolute top-[60%] right-[40%] transform scale-[0.27] md:top-[52%] md:left-[23%] md:transform-scale-55"
  />
  <img
    src={PinkGuy}
    alt="Pink Character"
    class="absolute top-[65%] left-[30%] transform scale-[0.4] md:top-[61%] md:left-[54%] md:transform-scale-55"
  />
  <img
    src={BeigeGuy}
    alt="Beige Character"
    class="absolute top-[40.5%] left-[52%] transform scale-[0.27] md:top-[41.5%] md:left-[67.5%] md:transform-scale-55"
  />
</div>
