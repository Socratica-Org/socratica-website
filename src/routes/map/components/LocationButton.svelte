<script lang="ts">
    import MapPinLine from '$lib/images/MapPinLine.png';

    export let location: string;
</script>

<button class="bg-black py-2 px-4 rounded-full border-2 text-white text-xs md:text-sm font-mono">
    <img src={MapPinLine} alt="Location" class="w-3 h-3 md:w-6 md:h-6 inline-block" />
    {location}
</button>