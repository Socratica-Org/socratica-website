<script lang="ts">
    import LocationButton from './components/LocationButton.svelte';
    import DateButton from './components/DateButton.svelte';
    import Globe from '$lib/images/Globe.svg';
    import InstagramLogo from '$lib/images/InstagramLogo.svg';
    import TwitterLogo from '$lib/images/TwitterLogo.svg';
    import YoutubeLogo from '$lib/images/YoutubeLogo.svg';

    export let id: string;
    export let name: string;
    export let date: string;
    export let location: string;
    export let lumaLink: string;
</script>
  
<div id={id} class="hidden p-4 md:p-8 flex flex-col items-center justify-center" style="border: 1px solid gray;">
    <div class="w-full text-left mt-2 md:mt-4">
        <h1 class="text-3xl md:text-5xl text-black font-normal font-tiempos-headline">{name}</h1>
        <div class="flex flex-wrap items-center gap-2 -ml-1 mt-2 mb-2">
            <LocationButton location={location} />
            <DateButton date={date} />
        </div>
        <div class="flex items-center gap-2 mb-2">
            <a href="https://www.socratica.info/" target="_blank" class="icon-container" style="border-color: #000000;">
                <img src={Globe} alt="Website" class="icon" />
            </a>
            <a href="https://www.instagram.com/socratica.info" target="_blank" class="icon-container" style="border-color: #854F6F;">
                <img src={InstagramLogo} alt="Instagram" class="icon" />
            </a>
            <a href="https://twitter.com/socraticainfo" target="_blank" class="icon-container" style="border-color: #649AEA;">
                <img src={TwitterLogo} alt="Twitter" class="icon" />
            </a>
            <a href="https://www.youtube.com/@socraticainfo" target="_blank" class="icon-container" style="border-color: #C6482C;">
                <img src={YoutubeLogo} alt="Youtube" class="icon" />
            </a>
        </div>
    </div>

    <iframe
        title={name}
        src={lumaLink}
        class="w-full md:w-400"
        height="450"
        frameborder="0"
        style="border: 1.5px solid #EBE4D0; border-radius: 8px; margin: 0 auto; margin-bottom: 20px;"
        aria-hidden="false"
    ></iframe>
</div>

<style>
    /* Responsive styling for smaller devices */
    @media (max-width: 768px) {
        .icon-container {
            width: 30px; /* Smaller size on mobile */
            height: 30px; /* Smaller size on mobile */
        }
        .icon {
            width: 60%; /* Larger relative size within the smaller button on mobile */
        }
    }

    /* Existing styles for larger screens */
    .icon-container {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        padding: 5px;
        border: 2px solid;
        border-radius: 9999px;
        overflow: hidden;
    }
    .icon {
        display: block;
        width: 80%;
        height: auto;
    }
</style>
