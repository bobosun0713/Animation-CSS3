function ShowRedPage() {
  //開啟紅包
  const Warp = document.querySelector(".Warp");
  Warp.style.display = "block";

  //紅包變數
  const page = document.querySelector(".RedPage");
  const pageTop = document.querySelector(".PageTop");
  const BackAnimate = document.querySelector(".BackAnimate");
  const pageContant = document.querySelector(".PageContant");
  const PageCon_Space = document.querySelector(".PageContant__space");

  // 音效
  const mp3 = document.querySelector('.mp3');

  //關閉變數
  const Cancel01 = document.querySelectorAll(".PageContant__space_link > a")[1];

  // 觸發震動
  page.addEventListener("click", () => {
    if (page.className.indexOf('Animation') !== -1) return;
    page.classList.add("PageAnimation");

    // 打開信封袋
    setTimeout(() => {
      pageTop.classList.add("rotate");
      page.classList.add("PageAnimation");
    }, 500);

    // 信封取出
    setTimeout(() => {
      PageCon_Space.classList.add("PageCon_SpaceAnimation");
      pageContant.classList.add("PageContantAnimation");
      TextRand(90)

      // mp3.volume = 0.1;
      // mp3.play();
    }, 800);

    // 錢幣背景動畫
    setTimeout(() => {
      BackAnimate.classList.add("BackAnimate--active");
    }, 1000);
  });

  Cancel01.addEventListener("click", () => Warp.style.display = "none");


}

function TextRand(total) {
  const dollor = document.querySelector(".PageContant__space_dollar");
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
  const Warp = document.querySelector(".Warp");
  const btn = document.querySelectorAll('.btn > a');
  btn[0].addEventListener('click', () => window.location.reload())
}
reStart();
ShowRedPage();