<script lang="ts">
    import CircleWavyCheck from '$lib/images/CircleWavyCheck.png';

    export let date: string;
</script>

<button class="bg-white py-2 px-4 rounded-full text-xs md:text-sm text-soft-grey font-mono border-2 border-soft-grey">
    <img src={CircleWavyCheck} alt="Date" class="w-3 h-3 md:w-6 md:h-6 inline-block" />
    {date}
</button>