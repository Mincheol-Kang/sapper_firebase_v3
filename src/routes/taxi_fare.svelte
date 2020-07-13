<script>
import TaxiFareTable from './taxi_fare_table.svelte'

const page_title = '서울택시비 계산기'

let est_mileage_km = 0
let est_drivetime_min = 0

let taxis = [
    {
        name: '중형택시 (주간)',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 3800,
        fare_per: 100,
        mileage_unit_meter: 132,
        drive_time_unit_sec: 31,
    },
    {
        name: '중형택시 (심야)',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 4600,
        fare_per: 120,
        mileage_unit_meter: 132,
        drive_time_unit_sec: 31,
    },
    {
        name: '카카오 벤티',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 4000,
        fare_per: 100,
        mileage_unit_meter: 131,
        drive_time_unit_sec: 40,
    },
    {
        name: '타다 프리미엄',
        fare: '',
        basic_mileage_km: 2,
        basic_fare: 5000,
        fare_per: 122,
        mileage_unit_meter: 100,
        drive_time_unit_sec: 30,
    },
    {
        name: '대형승용 및 모범택시',
        fare: '',
        basic_mileage_km: 3,
        basic_fare: 6500,
        fare_per: 200,
        mileage_unit_meter: 151,
        drive_time_unit_sec: 36,
    },
    {
        name: '돌봄택시 (법인조합)',
        fare: '',
        basic_mileage_km: 3,
        basic_fare: 6500,
        fare_per: 200,
        mileage_unit_meter: 151,
        drive_time_unit_sec: 36,
    },
    {
        name: '카카오 블랙',
        fare: '',
        basic_mileage_km: 0,
        basic_fare: 6000,
        fare_per: 100,
        mileage_unit_meter: 71.4,
        drive_time_unit_sec: 15,
    },
    {
        name: '우버 블랙',
        fare: '',
        basic_mileage_km: 0,
        basic_fare: 8000,
        fare_per: 100,
        mileage_unit_meter: 71.4,
        drive_time_unit_sec: 15,
    },
    {
        name: '리모 블랙',
        fare: '',
        basic_mileage_km: 0,
        basic_fare: 8000,
        fare_per: 100,
        mileage_unit_meter: 71.4,
        drive_time_unit_sec: 15,
    },
]

function getFareString(fare_number) {
    const ceiled_fare = Math.ceil(fare_number)
    return '<b>' + ceiled_fare.toLocaleString() + '</b>원'
}

$: {
    let this_taxt_fare_per_km = 0
    let this_taxt_fare_per_min = 0
    let this_basic_mileage_km = 0
    let est_mileage_meter = 0
    let est_drivetime_sec = est_drivetime_min * 60
    for(let i = 0; i < taxis.length; i++) {
        this_taxt_fare_per_km = this_taxt_fare_per_min = taxis[i].basic_fare
        this_basic_mileage_km = taxis[i].basic_mileage_km

        if(est_mileage_km > this_basic_mileage_km) {
            // 예상이동거리(km)에서 기본거리를 뺀 후 미터로 환산
            est_mileage_meter = (est_mileage_km - this_basic_mileage_km) * 1000
            // 예상이동거리(meter)를 거리요금의 단위거리로 나눈 것에 단가를 곱함
            this_taxt_fare_per_km += (est_mileage_meter / taxis[i].mileage_unit_meter) * taxis[i].fare_per
        }

        if(est_drivetime_sec > 0) {
            this_taxt_fare_per_min += (est_drivetime_sec / taxis[i].drive_time_unit_sec) * taxis[i].fare_per
        }

        taxis[i].fare =
              '거리요금: ' + getFareString(this_taxt_fare_per_km) + '<br>'
            + '시간요금: ' + getFareString(this_taxt_fare_per_min)
    }
}

</script>

<svelte:head>
	<title>{page_title}</title>
</svelte:head>

<div>
	<h1>{page_title}</h1>

	<div>
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
input{
    font-size: 1em;
    width: 60px;
}
</style>
