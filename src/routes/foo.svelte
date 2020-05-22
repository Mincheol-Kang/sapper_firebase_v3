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

  function changeNumber(number_name, is_count_up) {
    switch (number_name) {
      case 'a':
        is_count_up ? number_a ++ : (number_a > min_a && number_a --);
        break;
      case 'b':
        is_count_up ? number_b ++ : (number_b > min_b && number_b --);
        break;
      case 'c':        
        is_count_up ? number_c ++ : (number_c > min_c && number_c --);
        break;
        
      default:
        break;
    }
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

  let triples_count = '';
  let pythagoras_triples = '';
  let imin_a = min_a;
  $: xmin_a = imin_a + 1;
  $: max_a = imin_a + 10;
  function getPythagorasTriples() {
	  let a, b, c, count=0;
	  pythagoras_triples = '';
      for (a = imin_a; a <= max_a; a++) {
        b = a + 1;
        c = b + 1;
        while(1) {
          while(c*c - b*b < a*a)
            c++;
          if(c*c - b*b === a*a) {
            count ++;
            // pythagoras_triples += `[${count}] (${a}, ${b}, ${c})\n`;
            pythagoras_triples+= `(${a}, ${b}, ${c}) `;
          } else if(c-b === 1) { /* cc-bb > aa && c-b == 1 */
            break;
          }
          b++;
        }
      }
      triples_count = `====== 총 ${count}개 ======`;
  }
</script>

<style>
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
  textarea {
	  width: 100%;
	  height: 300px;
      font-size: 15px;
  }
  #app {
	  margin-top: 20px;
  }
  #min_a, #max_a {
    font-size: 15px;
    text-align: left;
    width: 50px;
  }
  #min_a {
    text-align: right;
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
        <button on:click={() => changeNumber('a',false)}>-</button>
        𝒂
        <button on:click={() => changeNumber('a',true)}>+</button>
      </th>
      <th>
        <button on:click={() => changeNumber('b',false)}>-</button>
        𝒃
        <button on:click={() => changeNumber('b',true)}>+</button>
      </th>
      <th>
        <button on:click={() => changeNumber('c',false)}>-</button>
        𝒄
        <button on:click={() => changeNumber('c',true)}>+</button>
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
  <div id="app">
    <input id="min_a" type="number" min={min_a} bind:value={imin_a} on:keypress={getPythagorasTriples} />
    ≤ 𝒂 ≤ 
    <input id="max_a" type="number" min={xmin_a} bind:value={max_a} on:keypress={getPythagorasTriples} />
    <button on:click={getPythagorasTriples}
    >피타고라스 공식 만족하는 수 조합 구하기</button> {triples_count}
    <div>
      <textarea>{pythagoras_triples}</textarea>
    </div>
  </div>
</div>
