<script>
    import { onMount } from 'svelte';
    import DarkHouse from '$lib/images/DarkHouse.png';
    import UsersThree from '$lib/images/UsersThree.png';
    import MapTrifold from '$lib/images/MapTrifold.png';
    import Eye from '$lib/images/Eye.png';

    let currentPath = '';

    onMount(() => {
        currentPath = window.location.pathname;
    });
</script>

<div class="absolute top-5 right-5 flex flex-col space-y-2 items-end">
    <a href="/" 
       class:opacity-50={currentPath === '/'} 
       class:cursor-not-allowed={currentPath === '/'} 
       class:bg-cool-grey={currentPath === '/'} 
       class="z-50 bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={DarkHouse} alt="home" class="w-4 h-4 md:w-6 md:h-6" />
        <span>HOME</span>
    </a>
    <a href="/about" 
       class:opacity-50={currentPath === '/about'} 
       class:cursor-not-allowed={currentPath === '/about'} 
       class:bg-cool-grey={currentPath === '/about'} 
       class="z-50 bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={UsersThree} alt="Users" class="w-4 h-4 md:w-6 md:h-6" />
        <span>ABOUT</span>
    </a>
    <a href="/map" 
       class:opacity-50={currentPath === '/map'} 
       class:cursor-not-allowed={currentPath === '/map'} 
       class:bg-cool-grey={currentPath === '/map'} 
       class="z-50 bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={MapTrifold} alt="Map" class="w-4 h-4 md:w-6 md:h-6" />
        <span>MAP</span>
    </a>
    <a href="/get-involved" 
       class:opacity-50={currentPath === '/get-involved'} 
       class:cursor-not-allowed={currentPath === '/get-involved'} 
       class:bg-cool-grey={currentPath === '/get-involved'} 
       class="z-50 bg-primary py-2 px-2.5 text-[10px] text-xs md:text-sm rounded-full border border-cool-grey hover:bg-cool-grey font-mono inline-flex items-center space-x-2 transition-colors duration-500 ease-in-out">
        <img src={Eye} alt="Eye" class="w-4 h-4 md:w-6 md:h-6" />
        <span>GET INVOLVED</span>
    </a>
</div>
