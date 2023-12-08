<script lang="ts">
    import MapPinLine from '$lib/images/MapPinLine.png';

    export let location: string;
</script>

<button class="bg-black py-2 px-4 rounded-full border border-cool-grey text-white text-sm font-mono hover:grey transition-colors duration-500 ease-in-out">
    <img src={MapPinLine} alt="Location" class="w-3 h-3 md:w-6 md:h-6 inline-block" />
    {location}
</button>