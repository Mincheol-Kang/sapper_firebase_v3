<script>
import Bmi from './bmi.svelte'
const page_title = '예정일로 임신주수 구하기'
let due_date = ''
let preg_week = ''
let show_bmi = false
let formatted_date = ''

function getPregWd(dueday_str, baseday_str="0") {
    if (dueday_str.length < 1)
        return "";
    
    const dueDate = new Date(dueday_str + " 00:00:00");
    const baseDate = baseday_str.length > 1 ? new Date(baseday_str + " 09:00:00") : new Date();
    const diffTime = Math.abs(baseDate - dueDate);
    const isBeforeDuedate = dueDate > baseDate;
    const _diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffDays = isBeforeDuedate ? _diffDays : 1 - _diffDays;
    const diffWeeks = Math.ceil(diffDays / 7);
    const remDays = diffDays % 7;
    const _tailDays = isBeforeDuedate ? 7 - Math.ceil(remDays) : Math.ceil(remDays);
    const tailDays = remDays == 0 ? 0 : _tailDays;
    const pregWeeks = 40 - diffWeeks;
    const preg_wd = `${pregWeeks}주+${Math.abs(tailDays)}일차`;
    const D_day = (isBeforeDuedate ? "-" : "+") + Math.abs(diffDays);

    return `(${preg_wd}, D${D_day}일)`;
} // ~ 예정일로 임신주차 & D-day 계산하기

$: {
    if(due_date.length > 0) {
        const date_items = due_date.split('-')
        formatted_date = `${date_items[0]}/${date_items[1]}/${date_items[2]}`
        preg_week = getPregWd(formatted_date)
    }
}

const changeCheckbox = () => {
	show_bmi = !show_bmi
}
</script>

<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<div class="container">
	<h1>{page_title}</h1>

	<div class="form-area">
		<input type="date" bind:value={due_date} />
		<div class="preg-week">{preg_week}</div>
		
		<input class="check-box" type="checkbox" bind:checked={show_bmi} />
		<span class="check-text noselect" on:click={changeCheckbox}>BMI 구하기</span>
	</div>
	<div class="bmi-area {show_bmi ? '' : 'hidden'}">
		<Bmi/>
	</div>
</div>

<style>
.container {
	text-align: center;
}
input, .preg-week {
	font-size: 1.5em;
}
.preg-week {
	color: #080;
	font-weight: bold;
}
.check-box {
	margin-top: 1em;
}
.check-text {
	cursor: pointer;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.bmi-area {
	margin-top: 3em;
}
.hidden {
	display: none;
}
</style>
