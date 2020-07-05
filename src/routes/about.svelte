<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<div id="form-area">
    <form on:submit|preventDefault={showFingersWithNumber}>
        <input type="number" min={min_a} bind:value={number_a} on:change={showFingersWithNumber} /> x
        <input type="number" min={min_a} bind:value={number_b} />
        <button>{page_title}</button>
    </form>
</div>
<div class="fingers-area">
	{#each Array(number_b) as _, i}
		<div class='div-card'>{@html finger_num_a}</div>
	{/each}
</div>

<script>
const page_title = '숫자를 이미지로 표시하기'
const fingers = {
	0: '',
	1: '☝🏻',
	2: '✌🏻',
	3: '👌🏻',
	4: '✊🏻',
	5: '🖐',
	6: '🖐☝🏻',
	7: '🖐✌🏻',
	8: '🖐👌🏻',
	9: '🖐✊🏻',
	10: '🔟'
}
const min_a = 1
let number_a = min_a
let number_b = min_a
let finger_num_a = ''

const showFingersWithNumber = () => {
	const number_ten = 10
	finger_num_a = '<span>'
	if(number_a > number_ten) {
		const ten_times = number_a / number_ten
		const other_digits = number_a % number_ten
		console.log(`ten_times: ${ten_times}`)
		console.log(`other_digits: ${other_digits}`)

		for(let i = 1; i <= ten_times; i++)
			finger_num_a += fingers[number_ten] + '<br>'

		finger_num_a += fingers[other_digits]
	} else {
		finger_num_a = fingers[number_a]
	}
	finger_num_a += '</span>'
}

</script>

<style>
.fingers-area {
	font-size: 4.5em;
	line-height: 1.1em;
}
.div-card {
	float: left;
	margin-left: 10px;
}
span {
	text-align: center;
}
input {
	font-size: 2em;
	width: 60px;
}
button {
	font-size: 2em;
}
</style>
