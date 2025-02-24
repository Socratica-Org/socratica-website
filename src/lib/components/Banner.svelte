<script>
  const BANNER_URL = "http://symposium.socratica.info/?utm_source=website";
</script>

<div class="w-full bg-[#2A2928] text-[#FBF8EF] text-center py-3.5 font-['Tiempos_Text'] flex items-center justify-center">
  <a 
    href={BANNER_URL} 
    target="_blank" 
    rel="noopener noreferrer" 
    class="text-[#FBF8EF] no-underline text-sm md:text-lg leading-relaxed hover:opacity-90 transition-opacity duration-200 flex flex-col md:flex-row items-center justify-center px-4 md:px-0"
  >
    <div class="flex items-center">
      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:w-[14px] md:h-[14px] inline-block mx-2">
        <circle cx="10" cy="10" r="10" fill="#899248"/>
      </svg>
      <span class="font-[300]">by the way... you're invited to our symposium!</span>
    </div>
   
    <span class="text-[#CDC19F] font-[500] mt-1 md:mt-0 md:ml-2 inline-flex items-center">
      rsvp here
      <span class="ml-1 inline-block transition-transform duration-200 ease-in-out group-hover:translate-x-1">→</span>
    </span>
  </a>
</div>
