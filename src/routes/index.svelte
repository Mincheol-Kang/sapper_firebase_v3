<style>
	h1, figure {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<h1>{title}</h1>

<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>수학을 재밌게 가지고 놀아보자규!</figcaption>
</figure>

<script>
const title = '수학 놀이터'
</script>