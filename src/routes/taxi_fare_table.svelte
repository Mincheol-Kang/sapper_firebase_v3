<script>
export let taxis
</script>

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
                <td class="tg-mwxe">{@html taxi.fare}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
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
