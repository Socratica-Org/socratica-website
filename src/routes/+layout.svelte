<script lang="ts">
	import './styles.css';
	import "../app.css";
	import ArrowDownRight from '$lib/images/ArrowDownRight.png';
	
	import { onMount } from 'svelte';
	let currentPath = '';
	onMount(() => {
		currentPath = window.location.pathname;
	});
  
	let email = '';
	let emailValidationMessage = ''; // Feedback message
  
	/**
     * @param {string} email
     */
	function isValidEmail(email: string) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
  
	/**
     * @param {{ preventDefault: () => void; }} event
     */
	function handleOnSubmit(event: any) {
		event.preventDefault(); // prevent the form from submitting
		if (isValidEmail(email)) {
			console.log("Valid Email:", email);
			emailValidationMessage = ''; // Clear any previous error messages
		} else {
			console.log("Invalid Email:", email);
			emailValidationMessage = 'Please enter a valid email';
		}
	}
  </script>
  
  
  
  
  
<div class="app">
  
	<main>
		<slot />
	</main>
  
	{#if currentPath !== '/map'}
		<footer class="bg-[#4A4948] min-h-fit w-full bg-[url('/noise.png')]"  data-sveltekit-preload-data="hover">		  
			<div class="w-full grid xs:grid-cols-3 md:grid-cols-4">
				
				<div class="px-14 pt-16">
					<h3 class="text-[#FBF8EF] font-base text-sm -tracking-[0.48px] leading-[20px] pb-4 font-mono">FRIENDS OF SOCRATICA</h3>
					<div class="text-[#FBF8EF] opacity-80 font-light -tracking-[0.48px] text-xs sm:text-xs md:text-xs lg:text-sm font-graphik">
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Toronto, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">London, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Vancouver, BC <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Montreal, QC <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Ottawa, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Kingston, ON <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Seattle, WA <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Berkeley, CA <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
						<p class="leading-[26px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">New York, NY <img src={ArrowDownRight} alt="Arrow Down Right" class="w-3 h-3 inline-block opacity-80"/></a></p>
					</div>
				</div>

				<div class="px-14 pt-16">
					<h3 class="text-[#FBF8EF] font-base text-sm  -tracking-[0.48px] leading-[20px] pb-4 font-mono">MORE LINKS</h3>
					<div class="text-[#FBF8EF] opacity-80 font-light -tracking-[0.48px] leading-[33px] text-xs sm:text-xs md:text-xs lg:text-sm font-graphik">
						<p class="leading-[26px]"><a  href="/">Back to Top</a></p>
						<p class="leading-[26px]"><a  href="/">About</a></p>
						<p class="leading-[26px]"><a  href="/">Map</a></p>
						<p class="leading-[26px]"><a  href="/">Get Involved</a></p>
						<p class="leading-[26px]"><a  href="/">Easter Egg</a></p>
					</div>
				</div>

				<div class="px-14 pt-16 col-span-2">
					<h3 class="text-[#FBF8EF] font-base text-sm  -tracking-[0.48px] leading-[20px] pb-4 font-mono">NEWSLETTER</h3>
					<div class=" min-w-4/5 max-w-[400px] bg-[#2A2928] py-[8px] px-[10px] rounded-full flex justify-between">
						<input bind:value={email} placeholder="email@gmail.com" class="bg-[#2A2928] -tracking-[0.48px] w-full outline-none pl-4 rounded-full text-[#FFFFFF] font-graphik"/>
						<button type="submit" on:click={handleOnSubmit} class=" text-black py-[7px] px-[20px] bg-[#FBF8EF] rounded-[100px] text-base font-semibold font-normal hover:opacity-95">
							Submit
						</button>
					</div>
					{#if emailValidationMessage}
						<p class="text-red-500 mt-2 ">{emailValidationMessage}</p>
					{/if}
					<a href="https://www.instagram.com/uwstartups/" target="_blank" >
						<img src="/sponser_logos.svg" alt="Sponsor Logos" class="h-32 w-32 -mt-[18px]">
					</a>

				</div>

			</div>
			<img src="/socratica_logo_footer.svg" alt="Sponsor Logos" class="px-8 pt-[23px] pb-5">

		</footer>
	{/if}
</div>
  
  
  
  
  
  
  
  
  <style>
	  .app {
		  min-height: 100vh;
	  }  


	  footer {
		background-image: url('/noise.png'), linear-gradient(to top, #2A2928, #2a2928 50%,  #2a2928);
		background-size: cover, cover;  /* Apply cover for both gradient and image */
		background-repeat: no-repeat; 
	  }
  </style>
  
  