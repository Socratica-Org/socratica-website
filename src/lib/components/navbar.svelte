<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import SocraticaWhite from "$lib/images/SocraticaWhite.svg";
  import House from "$lib/images/house.svg";
  import UsersThree from "$lib/images/users-three.svg";
  import MapTrifold from "$lib/images/map-trifold.svg";
  import Eye from "$lib/images/eye.svg";
  import Heart from "$lib/images/heart-straight.svg";
  import Toolbox from "$lib/images/toolbox.svg";

  let currentPath = "";
  let showOverlay = false;

  onMount(() => {
    currentPath = window.location.pathname;
  });

  function toggleOverlay() {
    showOverlay = !showOverlay;
  }
</script>

<div class="absolute top-4 md:top-5 right-3 z-30">
  <button
    class="w-10 h-10 bg-black rounded-full flex flex-col justify-center items-center"
    on:click={toggleOverlay}
  >
    <div class="w-3 h-0.5 bg-white mb-1" />
    <div class="w-3 h-0.5 bg-white" />
  </button>
</div>

{#if showOverlay}
  <div
    class="fixed inset-0 bg-black z-40"
    transition:fly={{
      delay: 50,
      duration: 500,
      x: window.innerWidth * 0.93,
      y: -window.innerHeight * 0.89,
      opacity: 0,
      easing: quintInOut,
    }}
  >
    <button
      class="absolute top-3 right-3 md:top-6 md:right-6 text-white text-2xl leading-none"
      on:click={toggleOverlay}
    >
      &times;
    </button>
    <div
      class="absolute z-50 top-10 left-3 md:left-10"
      transition:fly={{
        delay: 0,
        duration: 1500,
        x: window.innerWidth / 3,
        y: window.innerHeight / 3,
        opacity: 0,
        easing: quintInOut,
      }}
    >
      <img src={SocraticaWhite} alt="Socratica" />
    </div>
    <div
      class="absolute top-40 left-5 md:left-10 flex flex-col space-y-4 items-start z-40"
      transition:fade={{ delay: 0, duration: 1000 }}
    >
      <a
        href="/"
        class:opacity-50={currentPath === "/"}
        class:cursor-not-allowed={currentPath === "/"}
        class:bg-dark-grey={currentPath === "/"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-dark-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
      >
        <img src={House} alt="Home" class="svg-icon w-4 h-4 md:w-6 md:h-6"/>
        <span>HOME</span>
      </a>
      <a
        href="/about"
        class:opacity-50={currentPath === "/about"}
        class:cursor-not-allowed={currentPath === "/about"}
        class:bg-dark-grey={currentPath === "/about"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-dark-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
      >
        <img src={UsersThree} alt="About" class="w-4 h-4 md:w-6 md:h-6" />
        <span>ABOUT</span>
      </a>
      <a
        href="/map"
        class:opacity-50={currentPath === "/map"}
        class:cursor-not-allowed={currentPath === "/map"}
        class:bg-dark-grey={currentPath === "/map"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-dark-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
      >
        <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
        <span>MAP</span>
      </a>
      <a
        href="https://toolbox.socratica.info/"
        target="_blank"
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-dark-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
      >
        <img src={Toolbox} alt="Toolbox" class="w-4 h-4 md:w-6 md:h-6" />
        <span>TOOLBOX</span>
      </a>
      <a
        href="/get-involved"
        class:opacity-50={currentPath === "/get-involved"}
        class:cursor-not-allowed={currentPath === "/get-involved"}
        class:bg-dark-grey={currentPath === "/get-involved"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-dark-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
      >
        <img src={Eye} alt="Get Involved" class="w-4 h-4 md:w-6 md:h-6" />
        <span>GET INVOLVED</span>
      </a>

      <a
        href="https://donate.stripe.com/5kA6qZcondXE8Te008"
        target="_blank"
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-dark-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
      >
        <img src={Heart} alt="Donate" class="w-4 h-4 md:w-6 md:h-6" />
        <span>DONATE</span>
      </a>
    </div>
  </div>
{/if}
