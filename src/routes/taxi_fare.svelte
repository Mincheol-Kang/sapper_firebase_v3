<script>
const page_title = '택시요금 계산기'

let estimated_mileage = 0
let estimated_drive_time = 0

const taxis = [
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

$: {

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
            <input type="number" bind:value={estimated_mileage} />
            <label>km</label>
        </div>
        <div>
            <label>예상 이동 시간</label>
            <input type="number" bind:value={estimated_drive_time} />
            <label>분</label>
        </div>
	</div>
	<div>
        <table class="tg">
            <thead>
                <tr>
                    <th class="tg-apfx">택시 유형</th>
                    <th class="tg-apfx">택시 요금</th>
                </tr>
            </thead>
            <tbody>
                {#each taxis as taxi}
                <tr>
                    <td class="tg-nrix">{taxi.name}</td>
                    <td class="tg-mwxe">{taxi.fare}</td>
                </tr>
                {/each}
            </tbody>
        </table>
	</div>
</div>

<style>
input{
    font-size: 1.5em;
    width: 60px;
}
table {
    margin-top: 20px;
}
.tg {
  border-collapse: collapse;
  border-spacing: 0;
}

.tg td {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}

.tg th {
  border-color: black;
  border-style: solid;
  border-width: 1px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: normal;
  overflow: hidden;
  padding: 10px 5px;
  word-break: normal;
}

.tg .tg-mwxe {
  text-align: right;
  vertical-align: middle
}

.tg .tg-apfx {
  background-color: #dfdddd;
  font-weight: bold;
  text-align: center;
  vertical-align: middle
}

.tg .tg-nrix {
  text-align: center;
  vertical-align: middle
}
</style>
