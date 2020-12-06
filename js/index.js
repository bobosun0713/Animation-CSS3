function ShowRedPage() {
  //開啟紅包
  var Warp = document.querySelector(".Warp");
  Warp.style.display = "block";

  //紅包變數
  var page = document.querySelector(".RedPage");
  var pageTop = document.querySelector(".PageTop");
  var BackAnimate = document.querySelector(".BackAnimate");
  var pageContant = document.querySelector(".PageContant");
  var PageCon_Space = document.querySelector(".PageContant__space");

  // 音效
  var mp3 = document.querySelector('.mp3');

  //關閉變數
  var Cancel01 = document.querySelectorAll(".PageContant__space_link > a")[1];

  // 觸發震動
  page.addEventListener("click", function () {
    if (page.className.indexOf('Animation') !== -1) return;
    page.classList.add("PageAnimation");

    // 打開信封袋
    setTimeout(function () {
      pageTop.classList.add("rotate");
      page.classList.add("PageAnimation");
    }, 500);

    // 信封取出
    setTimeout(function () {
      PageCon_Space.classList.add("PageCon_SpaceAnimation");
      pageContant.classList.add("PageContantAnimation");
      TextRand(90)

      mp3.volume = 0.1;
      mp3.play();
    }, 800);

    // 錢幣背景動畫
    setTimeout(function () {
      BackAnimate.classList.add("BackAnimate--active");
    }, 1000);
  });


  Cancel01.addEventListener("click", function () {
    Warp.style.display = "none";
  });


}

function TextRand(total) {
  var dollor = document.querySelector(".PageContant__space_dollar");
  let i = 0;
  function num() {
    if (i < total) {
      i++;
      setTimeout(num, (1 / total) * 1000);
      dollor.innerHTML = i + "元";
    }
  }
  num()
}

function reStart() {
  var Warp = document.querySelector(".Warp");
  var btn = document.querySelectorAll('.btn > a');
  btn[0].addEventListener('click', function () {
    window.location.reload();
  })
}
reStart();
ShowRedPage();