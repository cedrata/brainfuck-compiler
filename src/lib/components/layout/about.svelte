<script>
	import { assets } from '$app/paths';
	const bc = assets + '/images/business-card.jpg';
</script>

<div class="hero min-h-screen bg-base-200" id="about">
	<div class="hero-content w-screen flex-col lg:flex-row">
		<img alt="business1" src={bc} class="max-w-sm rounded-lg shadow-2xl lg:scale-100 scale-75" />
		<div>
			<h1 class="text-5xl font-bold">Box Office News!</h1>
			<p class="py-3">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<!-- <button class="btn btn-primary">Get Started</button> -->
		</div>
	</div>
</div>
<div class="hero min-h-screen bg-base-200">
	<div class="hero-content w-screen flex-col lg:flex-row lg:hidden">
		<img alt="business2" src={bc} class="max-w-sm rounded-lg shadow-2xl scale-75" />
		<div>
			<h1 class="text-5xl font-bold">Box Office News!</h1>
			<p class="py-3">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
	</div>
	<div class="hero-content w-screen flex-col lg:flex-row max-lg:hidden">
		<div>
			<h1 class="text-5xl font-bold">Box Office News!</h1>
			<p class="py-3">
				Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
				quasi. In deleniti eaque aut repudiandae et a id nisi.
			</p>
			<button class="btn btn-primary">Get Started</button>
		</div>
		<img alt="business2" src={bc} class="max-w-sm rounded-lg shadow-2xl scale-100" />
	</div>
</div>
