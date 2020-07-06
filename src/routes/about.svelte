<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<div class="form-area">
    <form on:submit|preventDefault={showNumber_a}>
        <input type="number" min={min_a} max={max_a} bind:value={number_a} on:change={showNumber_a} />
		{showFingersWithNumber(number_a)}
		x
        <input type="number" min={min_a} max={max_a} bind:value={number_b} />
		{showFingersWithNumber(number_b)}
        <br><button>{page_title}</button>
    </form>
</div>
<div class="fingers-area">
	{#each Array(number_b) as _, i}
		<div class='how-many'>{i+1}</div>
		<div class='div-card'>
			<span>
				{finger_num_a}
			</span>
		</div>
	{/each}
</div>
<div class="cube-area">
	<div class="selected-cubes">
		{cube_td}
	</div>
	<table id="cube-table">
		<thead>
			<th> </th>
		{#each Array(number_a) as _, x}
			<th class="cube-number">{x+1}</th>
		{/each}
		</thead>
		<tbody>
		{#each Array(number_b) as _, y}
		<tr>
			<td class="cube-number row-number">{y+1}</td>
			{#each Array(number_a) as _, x}
			<td on:mouseover={tdMouseOver} id="cube-{y}-{x}">◼︎</td>
			{/each}
		</tr>
		{/each}
		</tbody>
	</table>
</div>

<script>
import { onMount } from 'svelte'

const page_title = '곱셈을 이미지로 표시하기'
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
const max_a = 99
let number_a = min_a
let number_b = min_a
let finger_num_a = ''
let num_cubes = ''
let cube_td = ''

const showNumber_a = () => {
	finger_num_a = showFingersWithNumber(number_a)
}

const showFingersWithNumber = (target_number = min_a) => {
	const number_ten = 10
	let finger_number = ''
	if(target_number > number_ten) {
		const ten_times = target_number / number_ten
		const other_digits = target_number % number_ten

		for(let i = 1; i <= ten_times; i++)
			finger_number += fingers[number_ten]

		finger_number += fingers[other_digits]
	} else {
		finger_number = fingers[target_number]
	}
	return finger_number
}
let cube_table, cube_rows
onMount(() => {
	cube_table = document.getElementById('cube-table')
	cube_rows = cube_table.getElementsByTagName('tr')
})
function tdMouseOver(event) {
	const cube_id = event.target.id.split('-')
	const cube_row = Number(cube_id[1])
	const cube_cell = Number(cube_id[2])
	let currnet_row_cells

	cube_td = `${cube_row+1} x ${cube_cell+1} = ${(cube_row+1) * (cube_cell+1)}`

	for(let y = 0; y < cube_rows.length; y++) {
		currnet_row_cells = cube_rows[y].getElementsByTagName('td')
		for(let x = 0; x < currnet_row_cells.length; x++) {
			currnet_row_cells[x].style.color = ''
		}
	}

	for(let y = 0; y < cube_row+1; y++) {
		currnet_row_cells = cube_rows[y].getElementsByTagName('td')
		for(let x = 1; x < cube_cell+2; x++) {
			currnet_row_cells[x].style.color = 'orange'
		}
	}
}
</script>

<style>
.fingers-area {
	font-size: 4.1em;
	line-height: 1.1em;
}
.how-many {
	float: left;
	font-size: 14px;
	color: gray;
	width: 50px;
}
.cube-area {
	position: fixed;
	top: 1rem;
	right: 1rem;
	font-size: 25px;
	line-height: 0.9em;
}
.cube-number {
	font-size: 10px;
}
.row-number{
	text-align: right;
}
.selected-cubes {
	text-align: center;
}
span {
	text-align: center;
}
input {
	font-size: 2em;
	width: 60px;
}
button {
	font-size: 1.8em;
}
</style>
