let count = random(0, 100);
let Wrap = document.querySelector(".RedWrap");

//三個紅包
let TreePage = document.querySelector('.envelopes');

let LiImg = document.querySelectorAll(".envelopes > ul > li > .env_img");
let Img = document.querySelectorAll(".envelopes > ul > li > .env_img > img");
let btn = document.querySelectorAll(".envelopes >ul >li >button");
let nowSec = document.querySelector('.countDown');

//抽完獎紅包
let OnePage = document.querySelector('.envelopes_Open');
let PageTop = document.querySelector('.envelopes_Open > .envelopes_OpenTop');
let PageCon = document.querySelector('.envelopes_Open > .envelopes_contant');



Img.forEach(function (Imgs, index) {
  Imgs.addEventListener("click", function (e) {
    if (LiImg[index].getElementsByTagName('span').length !== 0) return;
    nowSec.style.opacity = 0;

    giveAll(count, index);

    redEnvelopes();

  });
})


btn.forEach(function (btns, index) {
  btns.addEventListener("click", function (e) {
    if (LiImg[index].getElementsByTagName('span').length !== 0) return;
    nowSec.style.opacity = 0;

    giveAll(count, index);

    redEnvelopes();

  });
});

//給值
function giveAll(num, index) {
  for (let i = 0; i < LiImg.length; i++) {
    // 點擊後，改變動畫
    addAnimate();

    //固定值 ，判斷其中一張animationend，從外面把點到索引值及金額傳入進去，並先顯示該索引金額
    Img[i].addEventListener('animationend', function () {
      if (index === undefined) return;
      LiImg[index].appendChild(total(num));

      //如果標籤內沒有span，新增一筆並用亂數給予
      if (LiImg[i].getElementsByTagName('span').length === 0) {
        LiImg[i].appendChild(total(random(4, 20) * 5))
        // console.log('第一個:',random(4, 20)*5 , '第二個 :' , random(4, 20)*5 , '第三個 :',random(4, 20)*5)
      }

    })
  }
}

// 選擇後紅包動畫
function addAnimate() {
  LiImg.forEach(function (LiImgs) {
    LiImgs.classList.add('clearImgAnimate')
  })
}

// 給值
function total(num) {
  let span = document.createElement("span");
  let spanText = document.createTextNode(num + '元');
  span.appendChild(spanText);
  return span;
}

// 亂數
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 倒數計時，自動選擇
function startTimeout(num) {
  let sec = 6; // 調整秒數
  function timeout() {
    // 如果已選擇就跳出計時
    for (let i = 0; i < LiImg.length; i++) {
      if (LiImg[i].getElementsByTagName('span').length !== 0) {
        return;
      }
    }

    // 如果沒選擇就繼續計時
    if (sec !== 0) {
      sec--;
      nowSec.innerHTML = "倒數 " + sec + " 秒後，自動選擇";
      setTimeout(timeout, 1000)
    } else {
      nowSec.style.opacity = 0;
      addAnimate();
      //指定其中一張照片結束動畫時，並給予固定數值，此為自動選額
      Img[0].addEventListener('animationend', function () {
        //隨機挑選照片，並與固定數字
        LiImg[random(0, 2)].appendChild(total(num));
      })

      //沒有數值的span標籤，給予亂數
      Img.forEach(function (Imgs, index) {
        Imgs.addEventListener('animationend', function () {
          if (LiImg[index].getElementsByTagName('span').length === 0) {
            LiImg[index].appendChild(total(random(4, 20) * 5))
            // console.log('第一個:',random(4, 20)*5 , '第二個 :' , random(4, 20)*5 , '第三個 :',random(4, 20)*5)
          }
        })
      })
      redEnvelopes();
    }
  }
  timeout();
}

startTimeout(count);

//數字跳動
function TextRand(total) {
  let PageTotal = document.querySelector('.envelopes_contant > .envelopes_contant_dollar');
  let i = 0;
  function num() {
    if (i < total) {
      i++;
      setTimeout(num, (1 / total) * 1000);
      PageTotal.innerHTML = i + "元";
    }
  }
  num()
}

//結束紅包內容動畫
function redEnvelopes() {
  //動畫連結
  setTimeout(function () {
    TreePage.style.opacity = 0;
    TreePage.addEventListener('transitionend', function () {
      TreePage.style.display = 'none';
      OnePage.style.display = 'block';
      OnePage.style.opacity = 1;
      PageTop.classList.add('elp_OpenTop')
    })

    PageTop.addEventListener('animationend', function () {
      PageCon.classList.add('elp_contant1')
    })

    PageCon.addEventListener('animationend', function () {
      PageCon.classList.remove('elp_contant1');
      PageCon.classList.add('elp_contant2');
    })


    setTimeout(function () {
      TextRand(count)
    }, 2500)

  }, 2500
  )
}

//關閉
function close() {
  var Cancel01 = document.querySelectorAll(".envelopes_contant_link > a")[1];
  Cancel01.addEventListener("click", function () {
    Wrap.style.display = "none";
  });
}
close()
//重整
function reStart() {
  var Warp = document.querySelector(".Warp");
  var btn = document.querySelectorAll('.btn > a');
  btn[0].addEventListener('click', function () {
    window.location.reload();
  })
}
reStart();
