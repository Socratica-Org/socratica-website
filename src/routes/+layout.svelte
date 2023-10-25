<script>
  import Header from './Header.svelte';
  import './styles.css';
  import "../app.css";

  let email = '';
  let emailValidationMessage = ''; // Feedback message

  function isValidEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
  }

  function handleOnSubmit(event) {
      event.preventDefault(); // prevent the form from submitting
      if (isValidEmail(email)) {
          console.log("Valid Email:", email);
          emailValidationMessage = ''; // Clear any previous error messages
      } else {
          console.log("Invalid Email:", email);
          emailValidationMessage = 'Please enter a valid email.';
      }
  }
</script>





<div class="app">

	<main>
		<slot />
	</main>

	<!--FOOTER START-->
	<footer class="bg-[#2A29F0] h-[876px] w-full"  data-sveltekit-preload-data="hover">

		<div class="w-full grid grid-cols-4 gap-4">

			<div class="px-16 pt-16">
				<h3 class="text-[#FBF8EF] font-semibold text-lg -tracking-[0.48px] leading-[20px] pb-6">FRIENDS OF SOCRATICA</h3>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Toronto, ON ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">London, ON ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Vancouver, BC ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Montreal, QC ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Ottawa, ON ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Kingston, ON ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Seattle, WA ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">Berkeley, CA ⇗</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="https://www.instagram.com/socratica.info/" target="_blank">New York, NY ⇗</a></p>
			</div>
	
	
			<div class="px-16 pt-16">
				<h3 class="text-[#FBF8EF] font-semibold text-lg  -tracking-[0.48px] leading-[20px] pb-6">MORE LINKS</h3>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="/">Back to Top</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="/">About</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="/">Map</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="/">Get Involved</a></p>
				<p class="text-[#FBF8EF] font-normal text-base -tracking-[0.48px] leading-[29px]"><a  href="/">Easter Egg</a></p>
			</div>
	
	
			<div class="px-16 pt-16 col-span-2">
				<h3 class="text-[#FBF8EF] font-semibold text-lg  -tracking-[0.48px] leading-[20px] pb-6">NEWSLETTER</h3>
				<!--newsletter form-->
				<div class="w-4/5  bg-[#2A2928] py-[10px] px-[18px] rounded-full flex max-w-[600px]">
					<input bind:value={email} placeholder="email@gmail.com" class="text-[#FBF8EF] text-lg bg-[#2A2928] font-normal flex-grow  w-full outline-none pl-3 rounded-full "/>
					<button type="submit" on:click={handleOnSubmit} class="ml-auto py-[10px] px-[40px] bg-[#FBF8EF] rounded-[100px] text-lg font-500 text-black font-normal">
						Submit
					</button>
				</div>
        {#if emailValidationMessage}
            <p class="text-red-500 mt-2">{emailValidationMessage}</p>
        {/if}
				<!--svg sponsor logos-->
				<img src="/sponser_logos.svg" alt="Sponsor Logos" class="h-48 w-48">
			</div>
		</div>
		<!--svg huge socratica logo with drawings-->
		<img src="/socratica_logo_footer.svg" alt="Sponsor Logos" class="px-5 pt-20">

	</footer>
	<!--FOOTER END-->
</div>








<style>
	.app {
		min-height: 100vh;
	}

	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */


	/* footer {
		background: 
			linear-gradient(to bottom, #f0f0f0, #8a8a8a), 
			url('/noise.svg'); 
		background-repeat: no-repeat, repeat; 
		background-size: cover, auto; 
		background-position: center center, 0 0;
	} */



	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
