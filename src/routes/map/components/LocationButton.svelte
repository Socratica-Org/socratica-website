<script lang="ts">
    import MapPinLine from '$lib/images/MapPinLine.svg';

    export let location: string;
</script>

<button class="bg-black py-2 px-4 rounded-full text-white text-xs md:text-sm font-mono border-2 border-black flex items-center justify-center">
    <img src={MapPinLine} alt="Location" class="w-4 h-4 md:w-6 md:h-6 mr-2" />
    {location}
</button>
