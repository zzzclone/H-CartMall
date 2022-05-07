function animate(elem, options, callback) {
    if (elem == null) {
        return;
    }
    let timer = null;
    let attribute = options.attribute;
    let startValue = parseFloat(window.getComputedStyle(elem)[attribute]);
    let endValue = parseFloat(options.value);
    let unit = options.value.substr(endValue.toString().length);
    if (!options.fluency) {
        options.fluency = 5;
    }
    if (startValue == endValue) {
        if (callback != undefined) {
            callback.call();
        }
        return;
    }

    function createTime() {
        return +new Date();
    }
    let startTime = createTime();

    function logic() {
        let remaining = Math.max(0, startTime + options.duration - createTime());
        let percent = 1 - remaining / options.duration;
        let nowValue = (endValue - startValue) * percent + startValue;
        if (nowValue === 0) {
            elem.style[attribute] = nowValue;
        } else {
            elem.style[attribute] = nowValue + unit;
        }
        if (percent === 1) {
            clearInterval(timer);
            if (callback != undefined) {
                callback.call();
            }
            return;
        }
    }
    timer = setInterval(logic, options.fluency);
}
let slideshow = {
    autoSlide: true,
    animating: false,
    defaultWidth: 750,
    width: 750,
    unit: "px",
    ulSelector: ".hot ul",
    slideBoxSelector: ".slide-box",
    intervals: [],
    next() {
        if (slideshow.animating) return;
        slideshow.animating = true;
        let ul = document.querySelector(slideshow.ulSelector);
        animate(
            ul, {
                attribute: "left",
                value: -slideshow.width + slideshow.unit,
                duration: 1500,
            },
            function() {
                ul.appendChild(ul.children[0]);
                ul.style.left = 0;
                slideshow.animating = false;
            }
        );
    },
    prevEvent: function() {
        let prevButton = document.getElementsByClassName("prev")[0];
        prevButton.onclick = function() {
            if (slideshow.animating) return;
            slideshow.animating = true;
            let ul = document.querySelector(slideshow.ulSelector);
            ul.style.left = -slideshow.width + slideshow.unit;
            ul.insertBefore(ul.children[ul.children.length - 1], ul.children[0]);
            animate(
                ul, { attribute: "left", value: "0" + slideshow.unit, duration: 1500 },
                function() {
                    slideshow.animating = false;
                }
            );
        };
    },
    nextEvent: function() {
        let nextButton = document.getElementsByClassName("next")[0];
        nextButton.onclick = function() {
            slideshow.next();
        };
    },
    init: function() {
        function run() {
            slideshow.autoSlide = true;
            slideshow.animating = false;
            slideshow.intervals = [];
            let ul = document.querySelector(slideshow.ulSelector);
            if (ul == undefined) {
                return;
            }
            let liArr = ul.getElementsByTagName("li");
            if (liArr.length <= 1) return;
            let autoSlideInterval = setInterval(function() {
                if (!slideshow.autoSlide) return;
                slideshow.next();
            }, 8000);
            slideshow.intervals.push(autoSlideInterval);
            let slideBox = document.querySelector(slideshow.slideBoxSelector);
            slideBox.onmouseover = function() {
                slideshow.autoSlide = false;
            };
            slideBox.onmouseout = function() {
                slideshow.autoSlide = true;
            };
            slideshow.prevEvent();
            slideshow.nextEvent();
        }
        run();
    },
    destroy: function() {
        for (let i = 0; i < slideshow.intervals.length; i++) {
            window.clearInterval(slideshow.intervals[i]);
        }
    },
};
export { slideshow };