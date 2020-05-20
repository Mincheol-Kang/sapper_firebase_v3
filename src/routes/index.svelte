<style>
	h1, figure, p {
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

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>Sapper 프로젝트 템플릿</title>
</svelte:head>

<h1>짱 잘했또!</h1>

<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>Sapper와 함께 즐겨보자규!</figcaption>
</figure>

<p><strong> {my_message} </strong></p>

<script>
const my_message = '이 문장은 svelte의 const 변수에 저장한 문자열입니다.'
</script>