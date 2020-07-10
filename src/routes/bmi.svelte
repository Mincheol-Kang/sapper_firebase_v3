<script>
const page_title = 'BMI 구하기'
let bmi_height = 160
let bmi_weight = 55
let bim_pointer = '0%'
let evalWeight = ''
let avlVal = 0
let bmiVal = 0

$: {
    const bmiHeight = bmi_height;
    const bmiWeight = bmi_weight;
    bmiVal = 0;

    if (bmiHeight && bmiWeight) {
        const bmi_h = bmiHeight / 100
        const Square = bmi_h * bmi_h
        const bmi_num = bmiWeight / Square
        const strBmi = Math.round(bmi_num * 100) / 100
        bmiVal = strBmi;
        const manavl = Square * 21;
        avlVal = Math.round(manavl);
    }

    let deco1left = '0%'
    evalWeight = "";
    const bmi = bmiVal;
    if (bmi < 20) {
        deco1left = (bmi / 20) * 0.25;
        evalWeight = '저체중';
    } else if (bmi >= 20 && bmi < 24) {
        deco1left = 0.25 + ((bmi - 20) / (24 - 20)) * 0.25;
        evalWeight = '정상';
    } else if (bmi >= 24 && bmi < 30) {
        deco1left = 0.5 + ((bmi - 24) / (30 - 24)) * 0.25;
        evalWeight = '과체중';
    } else { // 30 이상 100 이하
        deco1left = 0.75 + ((bmi - 30) / (100 - 30)) * 0.25;
        evalWeight = '비만';
    }
    deco1left = deco1left * 100 + '%';
    bim_pointer = deco1left;
}
</script>

<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<div id="container">
    <div id="body_content" class="body_content">
        <div class="clearfix tac">
            <form id="bmiForm" name="bmiForm" action="" method="get" class="form-inline">
                <div class="form-group col-xs-2 fsXXL">
                    키:
                    <input type="number"
                        name="bmiHeight" id="bmiHeight"
                        bind:value="{bmi_height}">cm,&nbsp;&nbsp;
                    체중:
                    <input type="number"
                        name="bmiWeight" id="bmiWeight"
                        bind:value="{bmi_weight}">Kg
                </div>
            </form>
            <p class="fsXXL">신체질량지수(BMI)는
                <b class="em1" id="bmiVal">{bmiVal}</b>로 <b class="em4" id="evalWeight">{evalWeight}</b>입니다.<br>
                키 {bmi_height}cm의 평균체중은 <b class="em4" id="avlVal">{avlVal}</b>Kg입니다.</p>

            <!-- chart1bmi1 -->
            <div class="chart1bmi1">
                <strong class="blind">BMI Chart</strong>
                <div class="sb1">
                    <b class="blind">BMI</b>
                    <span class="bmi1value blind" id="chart_bmiVal"></span> <!-- ★(개발Hint!) 값이 바뀔 때 makeFun(); 재실행 필요하다! -->
                    <i class="deco1 init" style="left: {bim_pointer};" >
                        <!-- ▼ --></i>
                </div>
                <div class="area">
                    <b class="blind">구간</b>
                    <span class="a1 m1">저체중 <span class="blind">(0 이상 20 미만)</span></span>
                    <span class="a1 m2">정상 <span class="blind">(20 이상 24 미만)</span></span>
                    <span class="a1 m3">과체중 <span class="blind">(24 이상 30 미만)</span></span>
                    <span class="a1 m4">비만 <span class="blind">(30 이상 100 이하)</span></span>
                </div>
                <div class="graduated">
                    <b class="blind">눈금</b>
                    <span class="a1 m1">0</span>
                    <span class="a1 m2">20</span>
                    <span class="a1 m3">24</span>
                    <span class="a1 m4">30 이상</span>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
#body_content {
    clear: both;
    position: relative;
    padding: 0 0 1.666em 0;
    min-height: 50px;
    overflow: hidden;
}
input {
    width: 70px; 
    height: 30px; 
    text-align: end;
    font-size: 0.9em;
}
.clearfix {
    min-height: 0;
}
.tac {
    text-align: center !important;
}
.form-group {
    display: block;
    margin-bottom: 1em;
}
.fsXXL {
    font-size: 1.714em !important;
}
.em1 {
    color: #e00;
}
.em4 {
    color: #080;
}
.chart1bmi1 {
    position: relative;
    margin: 1em 0 0;
    padding: 0 0 2em;
}
.blind {
    position: absolute !important;
    left: -9999px;
    width: 1px;
    height: 1px;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
}
.chart1bmi1 .deco1 {
    float: left;
    position: absolute;
    top: -9px;
    width: 0;
    height: 0;
    margin: 0 -12px;
    border: 12px solid transparent;
    border-top-color: #000;
    overflow: hidden;
    text-indent: 100%;
    transition: .4s ease-out;
}
.chart1bmi1 .area {
    overflow: hidden;
}
.chart1bmi1 .area>.a1.m1 {
    background: #09f url(/b.ffffff.opacity.20.pattern1.png);
}
.chart1bmi1 .area>.a1 {
    float: left;
    width: 25%;
    color: #fff;
}
.chart1bmi1 .area>.a1.m2 {
    background: #0a0 url(/b.ffffff.opacity.20.pattern2.png);
}
.chart1bmi1 .area>.a1 {
    float: left;
    width: 25%;
    color: #fff;
}
.chart1bmi1 .area>.a1.m3 {
    background: #b80 url(/b.ffffff.opacity.20.pattern3.png);
}
.chart1bmi1 .area>.a1 {
    float: left;
    width: 25%;
    color: #fff;
}
.chart1bmi1 .area>.a1.m4 {
    background: #f55 url(/b.ffffff.opacity.20.pattern4.png);
}
.chart1bmi1 .area>.a1 {
    float: left;
    width: 25%;
    color: #fff;
}
.chart1bmi1 .graduated>.a1 {
    position: absolute;
    float: left;
}
.chart1bmi1 .graduated>.a1.m1 {
    left: 0;
}
.chart1bmi1 .graduated>.a1.m2 {
    left: 25%;
}
.chart1bmi1 .graduated>.a1.m3 {
    left: 50%;
}
.chart1bmi1 .graduated>.a1.m4 {
    left: 75%;
}

</style>
