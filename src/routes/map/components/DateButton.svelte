<script lang="ts">
    import CircleWavyCheck from '$lib/images/CircleWavyCheck.svg';

    export let date: string;
</script>

<button class="bg-white py-2 px-4 rounded-full text-xs md:text-sm text-soft-grey font-mono border-2 border-soft-grey flex items-center justify-center">
    <img src={CircleWavyCheck} alt="Date" class="w-4 h-4 md:w-6 md:h-6 mr-2" />
    {date}
</button>
