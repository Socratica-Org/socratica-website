<script>
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { quintInOut } from "svelte/easing";
  import SocraticaWhite from "$lib/images/SocraticaWhite.svg";
  import House from "$lib/images/house.svg";
  import DarkHouse from "$lib/images/dark-house.svg";
  import UsersThree from "$lib/images/users-three.svg";
  import DarkUsersThree from "$lib/images/dark-users-three.svg";
  import MapTrifold from "$lib/images/map-trifold.svg";
  import DarkMapTrifold from "$lib/images/dark-map-trifold.svg";
  import Eye from "$lib/images/eye.svg";
  import DarkEye from "$lib/images/dark-eye.svg";
  import Heart from "$lib/images/heart-straight.svg";
  import DarkHeart from "$lib/images/dark-heart-straight.svg";
  import Toolbox from "$lib/images/toolbox.svg";
  import DarkToolbox from "$lib/images/dark-toolbox.svg";

  let currentPath = "";
  let showOverlay = false;
  let hoverState = {
    home: false,
    about: false,
    map: false,
    toolbox: false,
    getInvolved: false,
    donate: false,
  };

  onMount(() => {
    currentPath = window.location.pathname;
  });

  function toggleOverlay() {
    showOverlay = !showOverlay;
  }
</script>

<div class="absolute top-24 md:top-20 right-3 z-30">
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
        class:bg-primary={currentPath === "/"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-primary hover:text-black font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
        on:mouseenter={() => (hoverState.home = true)}
        on:mouseleave={() => (hoverState.home = false)}
      >
        <img
          src={currentPath === "/"
            ? DarkHouse
            : hoverState.home
            ? DarkHouse
            : House}
          alt="Home"
          class="svg-icon w-4 h-4 md:w-6 md:h-6"
        />
        <span class:text-black={currentPath === "/"}>HOME</span>
      </a>
      <a
        href="/about"
        class:opacity-50={currentPath === "/about"}
        class:cursor-not-allowed={currentPath === "/about"}
        class:bg-primary={currentPath === "/about"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-primary hover:text-black font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
        on:mouseenter={() => (hoverState.about = true)}
        on:mouseleave={() => (hoverState.about = false)}
      >
        <img
          src={currentPath === "/about"
            ? DarkUsersThree
            : hoverState.about
            ? DarkUsersThree
            : UsersThree}
          alt="About"
          class="w-4 h-4 md:w-6 md:h-6"
        />
        <span class:text-black={currentPath === "/about"}>ABOUT</span>
      </a>
      <a
        href="/map"
        class:opacity-50={currentPath === "/map"}
        class:cursor-not-allowed={currentPath === "/map"}
        class:bg-primary={currentPath === "/map"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-primary hover:text-black font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
        on:mouseenter={() => (hoverState.map = true)}
        on:mouseleave={() => (hoverState.map = false)}
      >
        <img
          src={currentPath === "/map"
            ? DarkMapTrifold
            : hoverState.map
            ? DarkMapTrifold
            : MapTrifold}
          alt="Map"
          class="w-4 h-4 md:w-6 md:h-6"
        />
        <span class:text-black={currentPath === "/map"}>MAP</span>
      </a>
      <a
        href="https://toolbox.socratica.info/"
        target="_blank"
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-primary hover:text-black font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
        on:mouseenter={() => (hoverState.toolbox = true)}
        on:mouseleave={() => (hoverState.toolbox = false)}
      >
        <img
          src={hoverState.toolbox ? DarkToolbox : Toolbox}
          alt="Toolbox"
          class="w-4 h-4 md:w-6 md:h-6"
        />
        <span>TOOLBOX</span>
      </a>
      <a
        href="/get-involved"
        class:opacity-50={currentPath === "/get-involved"}
        class:cursor-not-allowed={currentPath === "/get-involved"}
        class:bg-primary={currentPath === "/get-involved"}
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-primary hover:text-black font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
        on:mouseenter={() => (hoverState.getInvolved = true)}
        on:mouseleave={() => (hoverState.getInvolved = false)}
      >
        <img
          src={currentPath === "/get-involved"
            ? DarkEye
            : hoverState.getInvolved
            ? DarkEye
            : Eye}
          alt="Get Involved"
          class="w-4 h-4 md:w-6 md:h-6"
        />
        <span class:text-black={currentPath === "/get-involved"}
          >GET INVOLVED</span
        >
      </a>

      <a
        href="https://donate.stripe.com/5kA6qZcondXE8Te008"
        target="_blank"
        class="z-40 bg-black text-primary py-2 px-2.5 text-xs md:text-sm rounded-full border border-primary hover:bg-primary hover:text-black font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out"
        on:mouseenter={() => (hoverState.donate = true)}
        on:mouseleave={() => (hoverState.donate = false)}
      >
        <img
          src={hoverState.donate ? DarkHeart : Heart}
          alt="Donate"
          class="w-4 h-4 md:w-6 md:h-6"
        />
        <span>DONATE</span>
      </a>
    </div>
  </div>
{/if}
