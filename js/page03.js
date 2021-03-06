let arr = [
  {
    id: "1",
    price: 200,
    deg: 0,
  },
  {
    id: "2",
    price: 250,
    deg: 0,
  },
  {
    id: "3",
    price: 300,
    deg: 0,
  },
  {
    id: "4",
    price: 350,
    deg: 0,
  },
  {
    id: "5",
    price: 400,
    deg: 0,
  },
  {
    id: "6",
    price: 450,
    deg: 0,
  },
  {
    id: "7",
    price: 500,
    deg: 0,
  },
  {
    id: "8",
    price: 550,
    deg: 0,
  },
  {
    id: "9",
    price: 600,
    deg: 0,
  },
];

// 輪盤外層
const roulette_C = document.querySelector(".roulette_circle");
for (let i = 0; i < arr.length; i++) {
  // 外層 DIV
  let divOut = document.createElement("div");
  divOut.setAttribute("class", "roulette_circle_item");

  //設變數，計算扇形角度 - 計算資料裡面有幾筆資料除以長度，就能計算轉角度的值，再加 90 / (all.length/2)是補齊指針與轉盤置中的角度。再把角度放進去。
  let divOut_rotate =
    (360 / arr.length) * i + 90 / (arr.length / 2).toFixed(2);
  divOut.style.transform = `rotate(${divOut_rotate}deg)`;

  // 內層 DIV
  let divIn = document.createElement("div");
  divIn.setAttribute("class", "roulette_circle_item_cir");
  //設變數，動態計算獎品有幾個，自動分配內原角度，再把角度放進去。
  let divIn_rotate = (180 - 360 / arr.length).toFixed(2);
  divIn.style.transform = `rotate(${divIn_rotate}deg)`;

  // 內層獎品 - 金額
  let coIn = document.createElement("span");
  coIn.innerText = `${arr[i].price}$`;

  // 內層獎品角度 - 判斷物品有幾個，自動計算角度四捨五入。
  arr[i].deg += (360 / arr.length) * (arr.length - i);
  // console.log(arr[i]);

  // 塞入內層 DIV。
  divIn.appendChild(coIn);

  // 內層塞入外層DIV裡 , 組合起來。
  divOut.appendChild(divIn);

  // 組合好後塞入最外層DIV。
  roulette_C.appendChild(divOut);
}

// 初始圈數
let nowDeg = 2880;
// 計算好的角度
let dbDeg = 0;
// 獲取得到金額
let Msg = "";

// 輪盤指針按鈕
const pointer = document.querySelector(".roulette_pointer");
// 輪盤指針文子
const pointerTxt = document.querySelector(".roulette_pointer > span");
// 輪盤
const rouletteWrap = document.querySelector(".rouletteWrap");
const rouletteBG = document.querySelector(".rouletteBG");

pointer.addEventListener("click", function (e) {
  if (roulette_C.style.transition.indexOf("all") === 0) {
    // console.log("阻擋");
    return;
  }

  // 點擊抽獎時改變文字
  pointerTxt.classList.add("txt");
  pointerTxt.innerText = "抽獎中";

  //轉動動畫
  rouletteBG.style.display = "block";

  // 點擊時增加動畫屬性，當轉完時會消除，此時再點會沒有動畫效果。
  // 當點擊時增加動畫屬性，結束時消除動畫屬性，以此類推。
  roulette_C.style.transition = "all 10s cubic-bezier(0.25 , 0 , 0 , 1)";

  //從資料當中獲取所要轉的角度。
  nowDeg += arr[rand(0, 8)].deg;
  roulette_C.style.transform = `rotate(${nowDeg}deg)`;

  // 把值紀錄下來，並停在該角度上。
  dbDeg = nowDeg - 2880;
  // console.log(dbDeg);

  //獲取到的金額
  // arr.forEach(function (val) {
  //   // console.log(val.deg)
  //   if (val.deg === dbDeg) {
  //     Msg = val.price;
  //     // console.log('金額',Msg)
  //   }
  // });
  Msg = roulettePrice(dbDeg);

  // 圈數轉完時，把預設轉圈數再設回預設，不然預設值會越加來越大。
  nowDeg = 2880;
});

// 當動畫結束時
roulette_C.addEventListener("transitionend", function () {
  // 抽獎動畫結束改變
  pointerTxt.classList.remove("txt");
  pointerTxt.innerText = "點我抽獎";

  //轉動動畫
  rouletteBG.style.display = "none";

  // 動畫結束時，消除動畫效果，避免反轉的動畫，模擬圈數累計。
  roulette_C.style.transition = "unset";
  //紀錄最後一個角度並固定住，接下去後面的轉盤。
  roulette_C.style.transform = `rotate(${dbDeg}deg)`;

  setTimeout(function () {
    rouletteMsg(Msg);
  }, 500);
});

//指定獎品
function rd(price) {
  let total = arr.filter((item) => item.price === price);
  return total[0].id;
}

//獲取金額
function roulettePrice(Deg) {
  let num = arr.filter(function (val) {
    return val.deg === Deg;
  });
  return num[0].price;
}

//跳窗訊息(中獎金額)
function rouletteMsg(num) {
  //訊息父子層
  const msgWrap = document.querySelector(".rouletteMsgWrap");
  msgWrap.style.display = "flex";

  //中獎金額文字
  const price = document.querySelector(".rouleMsg_span");
  price.innerHTML = "恭喜獲得" + num + "元";

  //整個父子層
  const wrap = document.querySelector(".Rwrap");

  //關閉按鈕
  const cancle = document.querySelector(".rouleMsg_cancel");
  cancle.addEventListener("click", () => {
    // wrap.style.display = "none";
    msgWrap.style.display = "none";
  });
}


//測試用亂數，模擬使用者抽獎
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//重整
function reStart() {
  var Warp = document.querySelector(".Warp");
  var btn = document.querySelectorAll('.btn > a');
  btn[0].addEventListener('click', function () {
    window.location.reload();
  })
}
reStart();
