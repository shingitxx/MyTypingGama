"use strict";
{
  const words = ["div", "container", "id", "button"];
  let word;
  //wordsの中身をランダムで変更する
  let loc;
  //定数宣言 インデックスの0に当たる
  let score;
  let miss;
  const timeLimit = 3 * 1000;
  //タイム時間
  let startTime;
  //ゲーム開始時刻の保持
  let isPlaying = false;
  //ゲームが始まっているかの確認

  const target = document.getElementById("target");
  // 定数宣言 Id指定target
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const timerLabel = document.getElementById("timer");

  // target.textContent = word;
  // //targetを指定してそこを変更

  function updateTarget() {
    //updateTargetの宣言
    let placeholder = "";
    //_を格納する変数を定義して空の文字列を指定する
    for (let i = 0; i < loc; i++) {
      //文字と同じ数の_をplaceholderに連結させる
      placeholder += "_";
    }
    target.textContent = placeholder + word.substring(loc);
    //targetにplaceholderをセット
    //wordがロケーション番号以降の文字を表示したいので部分文字列を取得するためのsubstringを使う
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    //ゲーム開始時刻 制限時間をたす 現在時刻を引く そして算出
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    //timerLabelにセット小数点を表示toFixed
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
    //10m秒事にupdateTimerを呼ぶ
    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = "0.00";
      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = "click to replay";
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : (score / (score + miss)) * 100;
    alert(`${score} 正解, ${miss} ミス, ${accuracy.toFixed(2)}% accuracy!`);
  }

  window.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;

    startTime = Date.now();
    //現在時刻をスタート時刻に代入
    updateTimer();
    //updateTimerの実行
  });

  window.addEventListener("keydown", (e) => {
    //画面上で入力したらconsoleに表示できるようになる
    if (isPlaying !== true) {
      return;
    }
    if (e.key === word[loc]) {
      //wordのロケーション番目の文字がタイプされたe.keyと同じかどうかをここで判定する
      loc++;
      //あっていた場合次に進む
      if (loc === word.length) {
        //次の文字にいく
        //word(文字)が更新するタイミングでlocも同じ動作をする
        word = words[Math.floor(Math.random() * words.length)];
        //新しい文字を上記でランダムに生成する
        loc = 0;
        //新しい文字が出てきた時入力を0に戻す
      }
      updateTarget();
      //_に変える関数
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}
