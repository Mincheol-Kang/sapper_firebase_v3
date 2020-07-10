<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<h1>{page_title}</h1>

<div>
    <form>
        <input type="number" name="num_a" min={min_a} max={max_a} bind:value={number_a} on:change={showNumber_a} />
		{getFingersWithNumber(number_a).join('')}
		x
        <input type="number" name="num_b" min={min_b} max={max_b} bind:value={number_b} />
		{getFingersWithNumber(number_b).join('')}
        <button>새로 시작하기</button>
    </form>
	<div class="hand-usage">
		{#if number_a > 2 || number_b > 2}
		손모양 중 👌🏽=3, ✊🏽=4 입니다. ^^;;<br>
		{/if}
		{#if number_b > 1}
		아래 손가락 이미지를 끌어다 서로 합치면, 더해진 값으로 손 모양이 변신합니다!
		{:else}
		두번째 숫자를 올려보세요! 곱셈 수식이 아래에 손모양으로 표시됩니다.
		{/if}
	</div>
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
			>{finger}</span>
		{/each}
		</div>
	{/each}
</div>
<div class="cube-area">
	<div class="selected-cubes">
		{cube_td}
	</div>
	<div>
		<table bind:this={cube_table}>
			<thead>
				<th></th>
			{#each Array(number_a) as _, x}
				<th class="cube-number">{x+1}</th>
			{/each}
			</thead>
			<tbody>
			{#each Array(number_b) as _, y}
			<tr class="cube-row">
				<td class="cube-number row-number">{y+1}</td>
				{#each Array(number_a) as _, x}
				<td class="cube-cell" on:mouseover={cubeMouseOver} id="cube-{y}-{x}"></td>
				{/each}
			</tr>
			{/each}
			</tbody>
		</table>
	</div>
	<div class="selected-cubes">
		<div class="tooltip hand-usage cursor-pointer">
			큐브 테이블 사용법 보기
			<span class="tooltiptext cube-usage">
				PC에선 마우스 커서를 아래 큐브들 중 하나 위에 올려보고, 
				스마트폰에선 그냥 손가락으로 큐브들 중 하나를 터치해보세요.
				곱셈이 면적으로 나타나는 걸 확인할 수 있습니다.
			</span>
		</div>
	</div>
</div>

<script>
import { stores } from '@sapper/app'

const { page } = stores()
let num_a = 1
let num_b = 1
if($page.query.num_a !== undefined) {
	num_a = Number($page.query.num_a)
	num_b = Number($page.query.num_b)
}

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
let max_a = 99
let max_b = max_a
let min_a = 1
let min_b = min_a
let number_a = num_a
let number_b = num_b
let fingers_num_a = []
let cube_td = '1 x 1 = 1'
let cube_table
let source_span_dom

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
function cubeMouseOver(event) {
	const cube_rows = cube_table.getElementsByTagName('tr')
	const cube_id = event.target.id.split('-')
	const cube_row = Number(cube_id[1])
	const cube_cell = Number(cube_id[2])
	let currnet_row_cells

	cube_td = `${cube_row+1} x ${cube_cell+1} = ${(cube_row+1) * (cube_cell+1)}`

	for(let y = 0; y < cube_rows.length; y++) {
		currnet_row_cells = cube_rows[y].getElementsByTagName('td')
		for(let x = 1; x < currnet_row_cells.length; x++) {
			currnet_row_cells[x].style.backgroundColor = ''
		}
	}

	for(let y = 0; y < cube_row+1; y++) {
		currnet_row_cells = cube_rows[y].getElementsByTagName('td')
		for(let x = 1; x < cube_cell+2; x++) {
			currnet_row_cells[x].style.backgroundColor = 'orange'
		}
	}
}
function getKeyByValue(object, value) {
	const key = Object.keys(object).find(key => object[key] === value);
	return Number(key)
}
function handleDragStart(e) {
	e.dataTransfer.dropEffect = "copy"
	source_span_dom = e.target
}
function handleDragDrop(e) {
	const source_finger = source_span_dom.textContent.trim()
	const target_finger = e.target.textContent.trim()
	const source_number = getKeyByValue(fingers,source_finger)
	const target_number = getKeyByValue(fingers,target_finger)
	const sum_number = source_number + target_number
	const sum_fingers = getFingersWithNumber(sum_number)
	const source_parent_node = source_span_dom.parentNode
	const target_parent_node = e.target.parentNode
	const source_pp_node = source_parent_node.parentNode

	if(source_span_dom.id === e.target.id)
		return

	min_a = max_a = number_a
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
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted #404040;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 180px;
  background-color: #404040;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -125px;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 75%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #404040 transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
.fingers-area {
	font-size: 4.1em;
	line-height: 1.1em;
}
.finger-dom {
	cursor: move;
}
.cursor-pointer {
	cursor: pointer;
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
	background-color: white;
	text-align: right;
}
.selected-cubes {
	min-width: 5em;
	text-align: right;
}
.cube-row {
	padding: 0px;
	margin: 0px;
}
.cube-cell {
	border: 1px solid white;
	width: 20px;
	height: 20px;
	padding: 0px;
	margin: 0px;
	background-color: #404040;
}
.cube-number {
	font-size: 10px;
}
.row-number{
	text-align: right;
	padding-right: 5px;
}
.hand-usage {
	color: blue;
	font-size: 12px;
	margin-top: 0.5em;
	margin-bottom: 1em;
}
table {
	border-spacing: 0px;
	width: auto;
    float: right;
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
