<script>
import TaxiFareTable from './taxi_fare_table.svelte'

const page_title = '서울 택시비 계산기'

let est_mileage_km = 0
let est_drivetime_min = 0
let show_page_usage = false

const togglePageUsage = () => {
	show_page_usage = !show_page_usage
}

let taxis = [
    {
        name: '중형택시 (주간)',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 3800,
        fare_per: 100,
        mileage_unit_meter: 132,
        drive_time_unit_sec: 31,
        revise_time_fare: 0.45,
    },
    {
        name: '중형택시 (심야)',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 4600,
        fare_per: 120,
        mileage_unit_meter: 132,
        drive_time_unit_sec: 31,
        revise_time_fare: 0.45,
    },
    {
        name: '카카오 벤티',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 4000,
        fare_per: 100,
        mileage_unit_meter: 131,
        drive_time_unit_sec: 40,
        revise_time_fare: 0.8,
    },
    {
        name: '타다 프리미엄',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 5000,
        fare_per: 122,
        mileage_unit_meter: 100,
        drive_time_unit_sec: 30,
        revise_time_fare: 0.8,
    },
    {
        name: '대형승용 및 모범택시',
        fare: '',
        basic_mileage_km: 3,
        basic_fare: 6500,
        fare_per: 200,
        mileage_unit_meter: 151,
        drive_time_unit_sec: 36,
        revise_time_fare: 0.1,
    },
    {
        name: '돌봄택시 (법인조합)',
        fare: '',
        basic_mileage_km: 3,
        basic_fare: 6500,
        fare_per: 200,
        mileage_unit_meter: 151,
        drive_time_unit_sec: 36,
        revise_time_fare: 0.1,
    },
    {
        name: '리모 블랙',
        fare: '',
        basic_mileage_km: 0,
        basic_fare: 8000,
        fare_per: 100,
        mileage_unit_meter: 71.4,
        drive_time_unit_sec: 15,
        revise_time_fare: 0.1,
    },
    {
        name: '카카오 블랙',
        fare: '',
        basic_mileage_km: 0,
        basic_fare: 6000,
        fare_per: 100,
        mileage_unit_meter: 71.4,
        drive_time_unit_sec: 15,
        revise_time_fare: 1,
    },
    {
        name: '우버 블랙',
        fare: '',
        basic_mileage_km: 0,
        basic_fare: 8000,
        fare_per: 100,
        mileage_unit_meter: 71.4,
        drive_time_unit_sec: 15,
        revise_time_fare: 1,
    },
]

function getFareString(fare_number) {
    const rounded_fare = Math.round(fare_number)
    return '<b>' + rounded_fare.toLocaleString() + '</b>원'
}

$: {
    let this_taxi_fare = 0
    let this_taxi_fare_per_km = 0
    let this_taxi_fare_per_min = 0
    let this_basic_mileage_km = 0
    let est_mileage_meter = 0
    let est_drivetime_sec = est_drivetime_min * 60
    for(let i = 0; i < taxis.length; i++) {
        this_taxi_fare_per_km = taxis[i].basic_fare
        this_basic_mileage_km = taxis[i].basic_mileage_km

        if(est_mileage_km > this_basic_mileage_km) {
            // 예상이동거리(km)에서 기본거리를 뺀 후 미터로 환산
            est_mileage_meter = (est_mileage_km - this_basic_mileage_km) * 1000
            // 예상이동거리(meter)를 거리요금의 단위거리로 나눈 것에 단가를 곱함
            this_taxi_fare_per_km
                += Math.round(est_mileage_meter / taxis[i].mileage_unit_meter) * taxis[i].fare_per
        }
        if(est_drivetime_sec > 0) {
            this_taxi_fare_per_min
                = Math.round(est_drivetime_sec / taxis[i].drive_time_unit_sec) * taxis[i].fare_per
                * taxis[i].revise_time_fare
        }
        this_taxi_fare = this_taxi_fare_per_km + this_taxi_fare_per_min
        taxis[i].fare = `예상요금: ${getFareString(this_taxi_fare)}`
    }
}

</script>

<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<div>
	<h1>{page_title}</h1>
    <span class="cursor-pointer"
        on:click={togglePageUsage}>💬</span>
	<div class="page-usage" style="display: {show_page_usage ? '' : 'none'};">
		<p>{page_title} 소개</p>
		<p>
		이곳은 서울에 있는 9가지 택시 요금을
        추산 및 비교해보기 위해 마련된 공간입니다.</p>
		<p>
		서울 택시 요금 체계는 2020년 6월 기준으로 하고 있으며,
        비교적 단순한 로직으로 계산되고 있어서 오차가 클 수 있습니다.</p>
		<p>
        실제 택시미터기에선 주행속도에 따라서도 과금이 되지만,
        여기서는 주행속도 항목이 빠져서 실제요금보다 적게 나올 수 있습니다.</p>
        <p>
        예상 이동 거리와 시간은 네이버나 카카오 지도 서비스를 이용하여
        목적지까지 걸리는 시간과 소요 거리를 가지고 여기 계산기에 넣어보시면 됩니다.</p>
        <p>
        기존 지도 서비스에선 중형택시 주간요금만 나오는 반면,
        이곳에선 모범택시(점보택시)나 카카오 블랙, 돌봄택시 등
        다양한 유형의 택시 요금까지 산정해볼 수 있습니다.</p>
        <p>
        그래서 예상 이동 거리와 시간을 가지고 택시 유형별로
        요금이 어느 정도 나올지 대충이나마 비교해볼 수 있다는 점이 
        이곳의 특장점이라 할 수 있겠습니다.</p>
	</div>
    <div class="map-access">
        목적지까지 걸리는 예상 이동 시간과 소요 거리 구하기:
        <a href="https://map.kakao.com/" target="_blank">카카오 지도</a> or 
        <a href="https://map.naver.com/" target="_blank">네이버 지도</a>
    </div>

	<div>
        <div class="input-notice">
            거리와 시간을 모두 입력해주세요!
        </div>
        <div>
            <label>예상 이동 거리</label>
            <input type="number" min="0" bind:value={est_mileage_km} />
            <label>km</label>
        </div>
        <div>
            <label>예상 이동 시간</label>
            <input type="number" min="0" bind:value={est_drivetime_min} />
            <label>분</label>
        </div>
	</div>
	<div>
        <TaxiFareTable taxis={taxis} />
	</div>
</div>

<style>
h1 {
    display: inline-block;
}
.page-usage {
	background-color: #404040;
	color: #fff;
	font-size: 13px;
	text-align: justify;
	border-radius: 6px;
	padding: 0px 15px;
    margin-bottom: 1em;
	border-width: 2px;
	border-style: solid;
	border-color: transparent transparent #404040 transparent;
	width: 250px;
}
.cursor-pointer {
	cursor: pointer;
}
.map-access {
    font-size: 13px;
    color: #696868;
    margin-bottom: 0.7em;
}
.input-notice {
    font-size: 13px;
    color: blue;
}
input{
    font-size: 1em;
    width: 60px;
}
</style>
