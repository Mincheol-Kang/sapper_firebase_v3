<script>
  const title = "Pythagoras Triples";
  const min_a = 1;
  let number_a = 1;
  let compare_sign = "";
  let message = "";
  let abc_color = "";

  $: number_b = number_a + 1;
  $: number_c = number_b + 1;
  $: number_aa = number_a * number_a;
  $: number_bb = number_b * number_b;
  $: number_cc = number_c * number_c;
  $: min_b = number_a + 1;
  $: min_c = number_b + 1;
  $: c_minus_b = number_c - number_b;
  $: cc_minus_bb = number_cc - number_bb;
  $: compareNumbers(cc_minus_bb - number_aa);

  function down_a() {
    if (number_a > min_a) number_a--;
  }
  function up_a() {
    number_a++;
  }
  function down_b() {
    if (number_b > min_b) number_b--;
  }
  function up_b() {
    number_b++;
  }
  function down_c() {
    if (number_c > min_c) number_c--;
  }
  function up_c() {
    number_c++;
  }

  function compareNumbers(compare_aabbcc) {
    message = "";
    if (compare_aabbcc === 0) {
      compare_sign = "=";
      abc_color = "blue";
      message = "피타고라스 공식을 만족하는 수 조합입니다!";
    } else if (compare_aabbcc > 0) {
      compare_sign = ">";
      abc_color = "orange";
      if (c_minus_b === 1) {
        abc_color = "red";
        message = "𝒂값을 올려야 합니다!";
      } else {
        message = "𝒃값을 올려야 합니다!";
      }
    } else {
      compare_sign = "<";
      abc_color = "gray";
    }
  }
</script>

<style scoped>
  .content {
    text-align: center;
  }
  table {
    margin-left: auto;
    margin-right: auto;
  }
  thead th,
  .abc td {
    padding-right: 20px;
    font-weight: 20px;
  }
  th,
  td,
  input {
    font-size: 25px;
    text-align: right;
  }
  input {
    width: 170px;
  }
  .blue {
    color: blue;
  }
  .red {
    color: red;
  }
  .orange {
    color: orange;
  }
  .gray {
    color: rgb(151, 150, 150);
  }
</style>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="content">
  <h1>{title}</h1>
  <table>
    <thead>
      <th>
        <button on:click={down_a}>-</button>
        𝒂
        <button on:click={up_a}>+</button>
      </th>
      <th>
        <button on:click={down_b}>-</button>
        𝒃
        <button on:click={up_b}>+</button>
      </th>
      <th>
        <button on:click={down_c}>-</button>
        𝒄
        <button on:click={up_c}>+</button>
      </th>
    </thead>
    <tbody>
      <tr>
        <td>
          <input type="number" min={min_a} bind:value={number_a} />
        </td>
        <td>
          <input type="number" min={min_b} bind:value={number_b} />
        </td>
        <td>
          <input type="number" min={min_c} bind:value={number_c} />
        </td>
      </tr>
      <tr class="abc">
        <td>
          {number_aa}
          <br />
          𝒂²
        </td>
        <td>
          {number_bb}
          <br />
          𝒃²
        </td>
        <td>
          {number_cc}
          <br />
          𝒄²
        </td>
      </tr>
      <tr class="abc">
        <td class={abc_color} colspan="3">
          𝒄 - 𝒃 = {c_minus_b}, &nbsp; 𝒄² - 𝒃² = {cc_minus_bb} {compare_sign}
          (𝒂²={number_aa})
          <br />
          {message}
        </td>
      </tr>
    </tbody>
  </table>
</div>
