<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<h1>{page_title}</h1>

<div>
    <form>
        <input type="number" name="num_a"
			min={min_a} max={max_a}
			bind:value={number_a} />
		{getFingersWithNumber(number_a).join('')}
		x
        <input type="number" name="num_b"
			min={min_b} max={max_b}
			bind:value={number_b} />
		{getFingersWithNumber(number_b).join('')}
        <button>새로 시작하기</button>
		<span class="cursor-pointer"
			on:click={togglePageUsage}>💬</span>
    </form>
	<div class="page-usage" style="display: {show_page_usage ? '' : 'none'};">
		<p>곱셈 놀이터 소개</p>
		<p>
		이곳은 곱셈을 매우 직관적으로 이해하기 위해 마련된 공간입니다.
		10 이상의 수는 "2, 5, 10"으로 구성될 수 있는데요.
		다섯 손가락으로 된 두 손을 가지고 수를 세는 
		지극히 인간적인 방식이 바로 십진수임을 이해하고,
		곱셈은 본질적으로 면적을 나타낸다는 사실을 아는 것이 아주 중요합니다.</p>
		<p>
		그래서 이러한 개념들을 직관적으로 알려주기 위해 만들어진 곳이 곱셈 놀이터입니다.
		아이들에게 무작정 구구단을 외우게 하는 대신,
		구구단의 곱셈이 왜 그런 값을 내는지 제대로 이해하게 해주시기 바랍니다. 감사합니다.</p>
	</div>
	<div class="hand-usage blue-12">
		{#if number_a > 2 || number_b > 2}
		손모양 중 👌🏽=3, ✊🏽=4 입니다. ^^;;<br>
		{/if}
		{#if number_b > 1}
		아래 손가락 이미지를 끌어다 서로 합치면, 더해진 값으로 손 모양이 변신합니다! (단, PC에서만 됩니다;;)
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
	<div style="display: {show_cube_table ? '' : 'none'};">
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
	<div class="selected-cubes" style="display: {show_cube_table ? '' : 'none'};">
		{cube_td}
	</div>
	<div class="cube-bottom">
		<div class="selected-cubes" style="display: {show_cube_table ? '' : 'none'};">
			<div class="tooltip cursor-pointer cube-usage blue-12">
				큐브 테이블 사용법 보기
				<span class="tooltiptext-cube">
					<p>PC에선 마우스 커서를 아래 큐브들 중 하나 위에 올려보고, 
					스마트폰에선 그냥 손가락으로 큐브들 중 하나를 터치해보세요.
					곱셈이 면적으로 나타나는 걸 확인할 수 있습니다.</p>
					<p>큐브 테이블을 가려놓으려면 오른쪽 [-]를 클릭하고,
					다시 큐브 테이블을 보이게 하려면 [◼︎]를 클릭하면 됩니다.</p>
				</span>
			</div>
		</div>
		<div class="close-button cursor-pointer" on:click={toggleCubeTable}>
			<div class="tooltip cursor-pointer">
			{#if show_cube_table}
				[-]
			{:else}
				[◼︎]
			{/if}
				<span class="tooltiptext-{show_cube_table ? 'close' : 'open'}">
				{#if show_cube_table}
					큐브 테이블을 가려놓습니다.
				{:else}
					큐브 테이블을 다시 엽니다.
				{/if}
				</span>
			</div>
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
let show_page_usage = false
let show_cube_table = true

$: {
	number_a = number_a > max_a ? max_a : number_a
	number_b = number_b > max_b ? max_b : number_b
	number_a = number_a < min_a ? min_a : number_a
	number_b = number_b < min_b ? min_b : number_b
	fingers_num_a = getFingersWithNumber(number_a)
	cube_td = `${number_a} x ${number_b} = ${number_a * number_b}`
}
const togglePageUsage = () => {
	show_page_usage = !show_page_usage
}

const toggleCubeTable = () => {
	show_cube_table = !show_cube_table
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

	cube_td = `${cube_cell+1} x ${cube_row+1} = ${(cube_row+1) * (cube_cell+1)}`

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
</script>

<style>
.page-usage,
.tooltip .tooltiptext-cube {
  background-color: #404040;
  color: #fff;
  text-align: justify;
  border-radius: 6px;
}

.tooltip .tooltiptext-close,
.tooltip .tooltiptext-cube {
  -webkit-box-shadow: 0 0 11px 5px #fff;
  -moz-box-shadow: 0 0 11px 5px #fff;
}

.close-button,
.selected-cubes,
.tooltip {
  display: inline-block;
}

.page-usage {
  font-size: 13px;
  padding: 0 15px;
  border-width: 2px;
  border-style: solid;
  border-color: transparent transparent #404040;
  width: 250px;
}

.tooltip .tooltiptext-close::after,
.tooltip .tooltiptext-cube::after,
.tooltip .tooltiptext-open::after {
  content: " ";
  top: 100%;
  border-width: 5px;
  border-style: solid;
  border-color: #404040 transparent transparent;
}

.tooltip {
  position: relative;
  font-size: 13px;
}

.tooltip .tooltiptext-cube {
  visibility: hidden;
  padding: 0 13px;
  position: absolute;
  z-index: 1;
  bottom: 140%; /* 툴팁 박스 상하 배치: 수가 작으면 아래쪽, 크면 위쪽 */
  margin-left: -132px; /* 툴팁 박스 좌우 배치: 수가 작으면 왼쪽, 크면 오른쪽 */
  left: 50%;
  width: 180px;
  box-shadow: 0 0 11px 5px #fff;
}

.tooltip .tooltiptext-cube::after {
  position: absolute;
  left: 65%; /* 툴팁 화살표 위치: 수가 작으면 왼쪽, 크면 오른쪽 */
  margin-left: -5px;
}

.tooltip:hover .tooltiptext-cube {
  visibility: visible;
}

.tooltip .tooltiptext-close,
.tooltip .tooltiptext-open {
  visibility: hidden;
  background-color: #404040;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  z-index: 1;
  bottom: 100%; /* 툴팁 박스 상하 배치: 수가 작으면 아래쪽, 크면 위쪽 */
  width: 150px;
  position: absolute;
}

.tooltip .tooltiptext-close {
  left: 50%;
  margin-left: -153px; /* 툴팁 박스 좌우 배치: 수가 작으면 왼쪽, 크면 오른쪽 */
  box-shadow: 0 0 11px 5px #fff;
}

.tooltip .tooltiptext-close::after {
  position: absolute;
  left: 90%; /* 툴팁 화살표 위치: 수가 작으면 왼쪽, 크면 오른쪽 */
  margin-left: -5px;
}

.tooltip:hover .tooltiptext-close {
  visibility: visible;
}

.tooltip .tooltiptext-open {
  left: 50%;
  margin-left: -153px; /* 툴팁 박스 좌우 배치: 수가 작으면 왼쪽, 크면 오른쪽 */
  -webkit-box-shadow: 0 0 11px 5px #fff;
  -moz-box-shadow: 0 0 11px 5px #fff;
  box-shadow: 0 0 11px 5px #fff;
}

.tooltip .tooltiptext-open::after {
  position: absolute;
  left: 90%; /* 툴팁 화살표 위치: 수가 작으면 왼쪽, 크면 오른쪽 */
  margin-left: -5px;
}

.tooltip:hover .tooltiptext-open {
  visibility: visible;
}

.fingers-area {
  font-size: 4.1em;
  line-height: 1.1em;
}

.finger-dom {
  cursor: move;
}

.cursor-pointer,
td {
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
  bottom: 1rem;
  right: 1rem;
  font-size: 25px;
  background-color: #fff;
  text-align: right;
  border: 1px solid #404040;
  padding: 0 5px;
  -webkit-box-shadow: -5px -4px 5px -1px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -5px -4px 5px -1px rgba(0, 0, 0, 0.51);
  box-shadow: -5px -4px 5px -1px rgba(0, 0, 0, 0.51);
}

.cube-cell,
.cube-row {
  padding: 0;
  margin: 0;
}

.cube-bottom {
  border: 0 solid #404040;
  min-width: 0.8em;
  min-height: 1.2em;
}

.close-button {
  position: absolute;
  bottom: 6px;
  right: 5px;
  text-align: right;
  font-size: 15px;
}

.selected-cubes {
  min-width: 6em;
  text-align: right;
}

.cube-cell {
  border: 1px solid #fff;
  width: 20px;
  height: 20px;
  background-color: #404040;
}

.cube-number {
  font-size: 10px;
}

.row-number {
  text-align: right;
  padding-right: 5px;
}

.blue-12 {
  color: #00f;
  font-size: 12px;
}

.hand-usage {
  margin-top: 0.5em;
  margin-bottom: 1em;
}

.cube-usage {
  position: absolute;
  bottom: 8px;
  right: 35px;
  border-bottom: 1px dotted #404040;
}

table {
  border-spacing: 0;
  margin-top: 8px;
  width: auto;
  float: right;
}

th {
  text-align: center;
}

input {
  font-size: 2em;
  width: 60px;
}

button {
  font-size: 1em;
}
</style>
