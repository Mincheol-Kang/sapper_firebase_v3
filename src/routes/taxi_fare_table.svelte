<script>
export let taxis
</script>

<div class="fare-area">
    {#each taxis as taxi}
    <div class="card-div cursor-pointer"
        data-tooltip-text="거리요금: {taxi.fare_per}원/{taxi.mileage_unit_meter}m, 시간요금: {taxi.fare_per}원/{taxi.drive_time_unit_sec}초"
    >
        <label>{taxi.name}</label>
        <p>{@html taxi.fare}</p> 
    </div>
    {/each}
</div>

<style>
.fare-area {
    margin-top: 1em;
}
p {
    padding: 0 10px;
}
.card-div {
    display: inline-block;
    min-width: 160px;
    background: rgba(255,255,255,0.5);
    overflow: hidden;
    padding: 0;
    margin: 0.1em 0.2em;
    border: 1px solid #bdbdbd;
    border-radius: 5px;
}
.card-div label {
    display: block;
    background: #1c6ea43d;
    font-weight: bold;
    padding: 5px 10px;
    font-size: 15px;
	cursor: pointer;
}

[data-tooltip-text]:hover {
  position: relative;
}

[data-tooltip-text]:hover:after {
  background-color: #000000;
  background-color: rgba(0, 0, 0, 0.8);

  -webkit-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
  -moz-box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);
  box-shadow: 0px 0px 3px 1px rgba(50, 50, 50, 0.4);

  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;

  color: #FFFFFF;
  font-size: 12px;
  content: attr(data-tooltip-text);

  margin-bottom: 0px;
  bottom: 15%;
  left: 0.8em;
  padding: 7px 5px;
  position: absolute;
  width: auto;
  min-width: 50px;
  max-width: 120px;
  word-wrap: break-word;
}

.cursor-pointer {
	cursor: pointer;
}
</style>
