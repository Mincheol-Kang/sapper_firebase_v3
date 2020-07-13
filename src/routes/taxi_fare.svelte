<script>
import TaxiFareTable from './taxi_fare_table.svelte'

const page_title = '서울택시비 계산기'

let est_mileage = 0
let est_drive_time = 0

let taxis = [
    {
        id: 'mid_size',
        name: '중형택시',
        fare: '',
        basic_mileage: 2,
        basic_fare: 3800,
        fare_unit: 100,
        mileage_unit: 132,
        drive_time_unit: 31,
        midnight_extra: 0.2,
        outside_extra: 0.2
    },
    {
        id: 'full_size',
        name: '대형승용 및 모범택시',
        fare: '',
        basic_mileage: 3,
        basic_fare: 6500,
        fare_unit: 200,
        mileage_unit: 151,
        drive_time_unit: 36,
        midnight_extra: 0,
        outside_extra: 0
    },
    {
        id: 'kakao_black',
        name: '카카오 블랙',
        fare: '',
        basic_mileage: 0,
        basic_fare: 6000,
        fare_unit: 100,
        mileage_unit: 71.4,
        drive_time_unit: 15,
        midnight_extra: 0,
        outside_extra: 0
    },
    {
        id: 'uber_black',
        name: '우버 블랙',
        fare: '',
        basic_mileage: 0,
        basic_fare: 8000,
        fare_unit: 100,
        mileage_unit: 71.4,
        drive_time_unit: 15,
        midnight_extra: 0,
        outside_extra: 0
    },
    {
        id: 'limo_black',
        name: '리모 블랙',
        fare: '',
        basic_mileage: 0,
        basic_fare: 8000,
        fare_unit: 100,
        mileage_unit: 71.4,
        drive_time_unit: 15,
        midnight_extra: 0,
        outside_extra: 0
    },
    {
        id: 'tada_premium',
        name: '타다 프리미엄',
        fare: '',
        basic_mileage: 2,
        basic_fare: 5000,
        fare_unit: 122,
        mileage_unit: 100,
        drive_time_unit: 30,
        midnight_extra: 0,
        outside_extra: 0
    },
    {
        id: 'dolbom',
        name: '돌봄택시 (법인조합)',
        fare: '',
        basic_mileage: 3,
        basic_fare: 6500,
        fare_unit: 200,
        mileage_unit: 151,
        drive_time_unit: 36,
        midnight_extra: 0,
        outside_extra: 0
    },
    {
        id: 'kakao_venti',
        name: '카카오 벤티',
        fare: '',
        basic_mileage: 2,
        basic_fare: 4000,
        fare_unit: 100,
        mileage_unit: 131,
        drive_time_unit: 40,
        midnight_extra: 0,
        outside_extra: 0
    },
]

function getFareString(fare_number) {
    return fare_number.toLocaleString() + '원'
}

$: {
    let this_taxt_fare = 0
    for(let i = 0; i < taxis.length; i++) {
        this_taxt_fare = taxis[i].basic_fare + (est_mileage * taxis[i].fare_unit)
        taxis[i].fare = getFareString(this_taxt_fare)
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
            <input type="number" bind:value={est_mileage} />
            <label>km</label>
        </div>
        <div>
            <label>예상 이동 시간</label>
            <input type="number" bind:value={est_drive_time} />
            <label>분</label>
        </div>
	</div>
	<div>
        <TaxiFareTable taxis={taxis} />
	</div>
</div>

<style>
input{
    font-size: 1.5em;
    width: 60px;
}
</style>
