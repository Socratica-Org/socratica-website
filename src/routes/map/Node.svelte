<script lang="ts">
    import LocationButton from './components/LocationButton.svelte';
    import DateButton from './components/DateButton.svelte';
    import Globe from '$lib/images/Globe.png';
    import InstagramLogo from '$lib/images/InstagramLogo.png';
    import TwitterLogo from '$lib/images/TwitterLogo.png';
    import YoutubeLogo from '$lib/images/YoutubeLogo.png';

    export let id: string;
    export let name: string;
    export let date: string;
    export let location: string;
    export let lumaLink: string;
</script>
  
<div id={id} class="hidden p-8 flex flex-col items-center justify-center" style="border: 1px solid gray;">
    <div class="w-full text-left mt-4">
        <h1 class="text-5xl text-black text-bold font-tiempos-headline">{name}</h1>
        <div class="flex items-center gap-2 -ml-1 mt-2 mb-1">
            <LocationButton location={location} />
            <DateButton date={date} />
        </div>
        <div class="flex items-center gap-2 mb-8">
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
        width="400"
        height="450"
        frameborder="0"
        style="background-color: #212325; border: 1.5px solid #EBE4D0; border-radius: 8px; margin: 0 auto; margin-bottom: 20px;"
        aria-hidden="false"
    ></iframe>
</div>

<style>
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