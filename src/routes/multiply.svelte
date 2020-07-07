<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<h1>{page_title}</h1>

<div class="form-area">
    <form>
        <input type="number" name="number_a" min={min_a} max={max_a} bind:value={number_a} on:change={showNumber_a} />
		{getFingersWithNumber(number_a).join('')}
		x
        <input type="number" name="number_b" min={min_b} max={max_a} bind:value={number_b} />
		{getFingersWithNumber(number_b).join('')}
        <button>새로 시작하기</button>
    </form>
</div>
<div class="fingers-area">
	{#each Array(number_b) as _, i}
		<div class='how-many'>{i+1}</div>
		<div class='div-card'>
		{#each fingers_num_a as finger,x}
			<span id="finger-{i}-{x}"
				class="finger-dom"
				draggable="true"
				ondragover="return false"
				on:dragstart={handleDragStart}
				on:drop={handleDragDrop}
				bind:this={fingers_dom[i][x]}
			>{finger}</span>
		{/each}
		</div>
	{/each}
</div>
<div class="cube-area">
	<div class="selected-cubes">
		{cube_td}
	</div>
	<table id="cube-table" bind:this={cube_table}>
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
import { stores } from '@sapper/app'

const { page } = stores()
const page_title = '곱셈을 이미지로 표시하기'
const fingers = {
	0: '',
	1: '☝🏻',
	2: '✌🏻',
	3: '👌🏻',
	4: '✊🏻',
	5: '🖐',
	10: '🔟'
}
const max_a = 99
let min_a = 1
let min_b = 1
let number_a = $page.query.number_a
let number_b = $page.query.number_b
let fingers_num_a = []
let cube_td = '1 x 1 = 1'
let fingers_dom = new Array(100)
let cube_table

for(let i = 0; i < fingers_dom.length; i ++) {
	fingers_dom[i] = new Array(20)
}

const showNumber_a = () => {
	fingers_num_a = getFingersWithNumber(number_a)
}

const getFingersWithNumber = (target_number = min_a) => {
	const number_ten = 10
	let finger_number = []
	if(target_number > number_ten) {
		const ten_times = target_number / number_ten
		const other_digits = target_number % number_ten

		for(let i = 1; i <= ten_times; i++)
			finger_number.push(fingers[number_ten])

		if(other_digits > 5) {
			finger_number.push(fingers[5])
			finger_number.push(fingers[other_digits - 5])
		} else {
			finger_number.push(fingers[other_digits])
		}
	} else {
		if(target_number > 5) {
			finger_number.push(fingers[5])
			finger_number.push(fingers[target_number - 5])
		} else {
			finger_number.push(fingers[target_number])
		}
	}
	return finger_number
}
function tdMouseOver(event) {
	const cube_rows = cube_table.getElementsByTagName('tr')
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
function getKeyByValue(object, value) {
	const key = Object.keys(object).find(key => object[key] === value);
	return Number(key)
}
function handleDragStart(e) {
	e.dataTransfer.dropEffect = "copy"
	e.dataTransfer.setData("text", e.target.getAttribute('id'))
}
function handleDragDrop(e) {
	const source_span_id = e.dataTransfer.getData("text")
	const source_span_id_array = source_span_id.split('-')
	const i = Number(source_span_id_array[1])
	const x = Number(source_span_id_array[2])
	const source_span_dom = fingers_dom[i][x]
	const source_finger = source_span_dom.textContent.trim()
	const target_finger = e.target.textContent.trim()
	const source_number = getKeyByValue(fingers,source_finger)
	const target_number = getKeyByValue(fingers,target_finger)
	const target_id_array = e.target.id.split('-')
	const ti = Number(target_id_array[1])
	const sum_number = source_number + target_number
	const sum_fingers = getFingersWithNumber(sum_number)
	const source_parent_node = source_span_dom.parentNode
	const target_parent_node = e.target.parentNode
	const source_pp_node = source_parent_node.parentNode

	e.dataTransfer.clearData()
	if(source_span_id === e.target.id)
		return

	min_a = number_a
	min_b = number_b

	if(source_finger === fingers[5] && source_finger === target_finger) {
		source_parent_node.removeChild(source_span_dom)
		e.target.textContent = fingers[10]
	} else if(source_number < 5 && target_number < 5) {
		if(sum_number < 6) {
			source_parent_node.removeChild(source_span_dom)
			e.target.textContent = fingers[sum_number]
		} else {
			e.target.textContent = sum_fingers[1]
			source_span_dom.textContent = sum_fingers[0]
			target_parent_node.insertBefore(source_span_dom, e.target)
		}
	} else {
		target_parent_node.insertBefore(source_span_dom, e.target)
	}
	if(source_parent_node.textContent.length < 2) {
		source_pp_node.removeChild(source_parent_node.previousSibling.previousSibling)
		source_pp_node.removeChild(source_parent_node.previousSibling)
		source_pp_node.removeChild(source_parent_node)
	}
}
showNumber_a()
</script>

<style>
.fingers-area {
	font-size: 4.1em;
	line-height: 1.1em;
}
.finger-dom {
	cursor: move;
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
	text-align: right;
}
td {
	cursor: pointer;
}
input {
	font-size: 2em;
	width: 60px;
}
button {
	font-size: 1em;
}
</style>
