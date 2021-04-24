$(function () {
    // ===禁止页面拖拽 开始===
    document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, {
        passive: false
    });
    // ===禁止页面拖拽 结束===

    // ===swiper 开始===
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        roundLengths: true,
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        autoHeight: true,
    });
    // ===swiper 结束===

    // ===loading倒计时 开始===
    // bgm 开始
    var bgm = document.querySelector(".bgm audio");
    bgm.play();
    var bgm_flag = true;
    $(".bgm").click(function () {
        if (bgm_flag) {
            bgm_flag = false;
            $(".bgm img").prop("src", "img/music_2.png");
            bgm.pause();
        } else {
            bgm_flag = true;
            $(".bgm img").prop("src", "img/music_1.png");
            bgm.play();
        }
    })
    // bgm 结束

    var time = 3;
    var timer = setInterval(() => {
        time--;
        if (time == 0) {
            clearInterval(timer);
            $(".loading-box").fadeOut();
            $(".the-index").fadeIn();
            $(".the-index").css("opacity", 1);
            $(".home .next-topic").css({
                animation: "nextTopic 1.5s linear forwards",
            })
            $(".bgm").fadeIn();
        }
    }, 1000)
    // ===loading倒计时 结束===

    // ===题目对错显示/隐藏 开始===
    $(".wrong,.right").hide();
    $(".right-mask").hide();//答案弹窗
    $(".the-box").hide();//答案弹窗

    // 答案弹窗关闭
    $(".right-mask .close").click(function () {
        $(".right-mask").fadeOut();
        $(".the-box").fadeOut();
    })

    // 第五题的点击播放/暂停
    var flag = true;
    var play_audio = document.querySelector('.the-index .five .play audio');
    $(".the-index .five .play").click(function () {
        if (flag) {
            flag = false;
            $(this).find("img").prop("src", "img/tit5_btn1.gif");
            play_audio.play();
        } else {
            flag = true;
            $(this).find("img").prop("src", "img/tit5_btn2.png");
            play_audio.pause();
        }
    })

    var topic = document.querySelectorAll(".topic");//所有题目的大盒子
    var mask_box = document.querySelector('.right-mask');//正确答案弹出层的大盒子
    var right_mask = mask_box.querySelectorAll(".the-box");//所有正确答案的弹出层
    var change_pic = document.querySelectorAll(".topic .change-pic");//所有正确答案的动画图

    $(change_pic).hide();//隐藏所有正确答案的动画图
    $(".five-change").hide();//第五题的动画图隐藏

    // 记录分数
    var score = 0;

    var passed = true;//提交判断
    var num = 0;
    var voice_yes = document.querySelector(".voice-yes");//对的声音
    var voice_no = document.querySelector(".voice-no");//错的声音
    topic.forEach((val, index) => {
        val.querySelectorAll("li").forEach((val2) => {
            $(val2).click(function () {
                num++;
                if (num == topic.length) {
                    passed = false;
                }
                if (this.children[1].classList == "right") {
                    $(this).find(".right").show().parent().addClass("shake");//对的图标显示

                    voice_yes.play();//对的声音

                    $(mask_box).fadeIn();//弹窗大盒子显示

                    $(right_mask[index]).fadeIn();//对应弹窗显示

                    $(this).css("pointerEvents", "none").siblings().css("pointer-events", "none").find(".wrong").parent().css({
                        filter: "grayscale(100%)",
                        pointerEvents: "none"
                    })//禁止再次选择

                    $(change_pic[index]).show();//正确图片改变后的动图
                    if (index == 4) {
                        $(".five-change").show();
                    }

                    // 最后分享页的背景图
                    score++;
                    if (score >= 2 && score <= 3) {
                        $(".share-pic .poster-bg").prop("src", "img/mb2.png");
                    } else if (score >= 4 && score <= 5) {
                        $(".share-pic .poster-bg").prop("src", "img/mb3.png");
                    } else if (score >= 6 && score <= 7) {
                        $(".share-pic .poster-bg").prop("src", "img/mb4.png");
                    } else if (score >= 8 && score <= 9) {
                        $(".share-pic .poster-bg").prop("src", "img/mb5.png");
                    }
                } else {
                    $(this).find(".wrong").show().parent().addClass("shake");//错的图标显示

                    voice_no.play();//错的声音

                    $(mask_box).fadeIn();//弹窗大盒子显示

                    $(right_mask[index]).fadeIn();//对应弹窗显示

                    $(topic[index]).find(".wrong").parent().css({
                        filter: "grayscale(100%)",
                        pointerEvents: "none"
                    })//禁止再次选择
                    $(topic[index]).find(".right").parent().css({
                        pointerEvents: "none"
                    })//禁止再次选择

                    $(topic[index]).find(".right").show();//对的图标显示

                    $(change_pic[index]).show();//正确图片改变后的动图
                }
            })
        })
    })

    var jroll = new JRoll("#wrapper")
    // 提交按钮
    $(".the-btn").click(function () {
        if (passed) {
            $(".topic-warning").fadeIn();
            let timer = setTimeout(() => {
                $(".topic-warning").fadeOut();
                clearTimeout(timer);
            }, 1300)

            // var theArr = [];
            // for (let i = 0; i < topic.length; i++) {
            //     theArr.push(topic[i]);
            //     for (let j = 0; j < theArr.length; j++) {
            //         jroll.scrollToElement(theArr[j], 300, false);
            //         return false;
            //     }
            // }
        } else {
            passed = true;
            $(".the-index").hide();
            $(".choose-style").fadeIn();
            $(".bgm").hide();
            bgm.pause();
        }
    })

    // ===题目对错显示/隐藏 结束===

    // ===选择主播风格 开始===
    var chooseLis = document.querySelectorAll(".choose-style li");//不同人物
    chooseLis.forEach((val) => {
        $(val).click(function () {
            $(".share-pic .poster .anchor").prop("src", $(val).find(".human").prop("src"));
            $(".choose-style .uname-box").fadeIn();
        })
    })

    // 点击出现的输入名称的弹窗
    $(".choose-style .turn-back").click(function () {
        $(".uname-box").fadeOut();
    })
    $(".uname-box .confirm").click(function () {
        $(".share-pic .the-name").text($(".uname-box .uinput").val());
        if ($(".uname-box .uinput").val() == '') {
            $(".uname-box .warning").fadeIn();
            let timer = setTimeout(() => {
                $(".uname-box .warning").fadeOut();
                clearTimeout(timer);
            }, 1300)
        } else if ($(".uname-box .uinput").val().length > 6) {
            $(".uname-box .warning").text("长度超过了").fadeIn();
            let timer = setTimeout(() => {
                $(".uname-box .warning").fadeOut();
                clearTimeout(timer);
            }, 1300)
        } else {
            $(".choose-style").fadeOut(1500);
            let timer = setTimeout(() => {
                $(".share-pic").fadeIn();
                clearTimeout(timer);
            }, 1300);
            $(".uname-box").hide();
        }
    })
    // ===选择主播风格 结束===

    // ===选择的人物分享图 开始===
    // 重新选人/再测一次
    $(".share-pic .afresh-choose").click(function () {
        $(".share-pic").hide();
        $(".choose-style").fadeIn();
    })
    $(".share-pic .test-again").click(function () {
        location.href = "../index.html";
    })

    // 分享弹窗
    $(".download").click(function () {
        $(".share-icon").fadeIn();
    })
    $(".share-icon").click(function () {
        $(".share-icon").fadeOut();
    })
    // ===选择的人物分享图 结束===
})
