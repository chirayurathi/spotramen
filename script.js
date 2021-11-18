$("a[href^='#']").click(function (e) {
  e.preventDefault();
  $("body, html").animate(
    {
      scrollTop: $($(this).attr("href")).offset().top - 50,
    },
    750
  );
});

const flipClick = (e) => {
  let FlipCard = $(".flip-card");
  if ($(e).hasClass("flip-active")) {
    $(e).removeClass("flip-active");
  } else {
    FlipCard.removeClass("flip-active");
    $(e).addClass("flip-active");
  }
};

const navspy = () => {
  var navs = $("nav ul li a");
  var sec = $(".sec");
  var navh = $("nav").height();
  var docel = $(document);
  docel.on("scroll", function () {
    var scrollpos = docel.scrollTop();
    sec.each(function () {
      var self = $(this);
      if (
        self.offset().top < scrollpos + navh &&
        scrollpos + navh < self.offset().top + self.outerHeight()
      ) {
        var currClass = "." + self.attr("id") + "-mark";
        navs.removeClass("active");
        $(currClass).addClass("active");
      }
    });
  });
};

const carousel = () => {
  var carSlide = $(".carousel-slide");
  var carImg = $(".carousel-slide img");
  var next = $("#next");
  var prev = $("#prev");
  let count = 1;
  var size = carImg.width();
  carSlide.css("transform", "translateX(" + -size * count + "px)");
  next.click(() => {
    if (count >= carImg.length - 1) return;
    console.log("next");
    carSlide.css("transition", "transform 0.4s ease-in-out");
    count++;
    carSlide.css("transform", "translateX(" + -size * count + "px)");
  });
  prev.click(() => {
    if (count <= 0) return;
    console.log("prev");
    carSlide.css("transition", "transform 0.4s ease-in-out");
    count--;
    carSlide.css("transform", "translateX(" + -size * count + "px)");
  });
  carSlide.on("transitionend", () => {
    if (carImg[count].id == "lastc") {
      carSlide.css("transition", "none");
      count = carImg.length - 2;
      carSlide.css("transform", "translateX(" + -size * count + "px)");
    } else if (carImg[count].id == "firstc") {
      carSlide.css("transition", "none");
      count = carImg.length - count;
      carSlide.css("transform", "translateX(" + -size * count + "px)");
    }
  });
  var dropbool = false;
  setInterval(() => {
    if (dropbool == false) {
      $(".scrollD").css("transition", "transform 0.8s ease-in-out");
      $(".scrollD").css("transform", "translateY(10px)");
    } else {
      $(".scrollD").css("transition", "transform 0.8s ease-in-out");
      $(".scrollD").css("transform", "translateY(-10px)");
    }
    dropbool = !dropbool;
  }, 1000);
};

const navSlide = () => {
  const burger = $(".burger");
  const nav = $("nav ul");
  const navLink = document.querySelectorAll("nav ul li");
  burger.click(() => {
    nav.toggleClass("nav-active");
    navLink.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navFade 0.5s ease forwards ${index / 7 + 0.5}s`;
      }
    });
  });

  for (var i = 0; i < navLink.length; i++) {
    navLink[i].addEventListener("click", function () {
      nav.toggleClass("nav-active");
      navLink.forEach((link) => {
        link.style.animation = "";
      });
    });
  }
};

navspy();
carousel();
navSlide();


var countryContent = $(".country-content");
var acc = document.getElementsByClassName("country-headder");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      this.children[1].style.transform = "rotate(0deg)";
    } else {
      for (var j = 0; j < acc.length; j++) {
        if (i != j) {
          acc[j].nextElementSibling.style.maxHeight = null;
          acc[j].children[1].style.transform = "rotate(0deg)";
        }
        panel.style.maxHeight = panel.scrollHeight + "px";
        this.children[1].style.transform = "rotate(90deg)";
      }
    }
  });
}

httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "https://chirayurathi.github.io/spotramenJson/db.json");
var jsonData = [];
var hotContainer = document.querySelector(".hotspots-container");
httpRequest.onload = () => {
  jsonData = JSON.parse(httpRequest.responseText);
  loadCards("Brand");
  countryMaker();
  yearsFunction();
};
httpRequest.send();

const loadCards = (para) => {
  jsonData = JSON.parse(httpRequest.responseText);
  sortAlg(jsonData, 0, jsonData.length - 1, para);
  hotContainer.innerHTML = "";
  for (var i = 0; i < jsonData.length; i++) makeCard(jsonData[i]);
};

const makeCard = (jsonEle) => {
  htmlString =
    "<div class='flip-container'><div class='flip-card' onclick='flipClick(this)'><div class='flip-front'><p>" +
    jsonEle["Brand"] +
    "</p></div><div class='flip-back'><div class='star'><a>" +
    jsonEle["Stars"] +
    "</a><i class='fas fa-star'></i></div><p class='sub-head'>variety</p><p class='variety'>" +
    jsonEle["Variety"] +
    "</p><p class='sub-head'>style</p><p>" +
    jsonEle["Style"] +
    "</p><p class='sub-head'>location</p><p>" +
    jsonEle["Country"] +
    "</p><p class='rank'>Ranked " +
    jsonEle["TopTen"] +
    "</p></div></div></div>";
  hotContainer.insertAdjacentHTML("beforeend", htmlString);
};

const sortAlg = (data, low, high, parameter) => {
  // ISSUE#1  
  // implement quicksort to sort the restaurants accoring to the parameter selected by the user (ex: brand, country, stars)
  // quick sort reference - https://www.geeksforgeeks.org/quick-sort/
  // data contains the JSON data which has to be sorted. (structure of the data can be viewed at https://github.com/chirayurathi/spotramenJson/blob/master/db.json)
};

var dropbtnbool = false;
$(".drop button").click(() => {
  if (dropbtnbool === false) $(".drop ul").attr("id", "drop-active");
  else $(".drop ul").attr("id", "");
  dropbtnbool = !dropbtnbool;
});

var droplist = document.querySelectorAll(".drop ul li");
droplist[0].addEventListener("click", () => {
  loadCards("Brand");
});

droplist[1].addEventListener("click", () => {
  loadCards("Country");
});

droplist[2].addEventListener("click", () => {
  loadCards("Stars");
});
var inputVal = $('input[type="text"]');

const searchlist = function () {
  for (var i = 0; i < jsonData.length; i++) {
    if (
      jsonData[i]["Brand"].toLowerCase().indexOf(inputVal.val().toLowerCase()) >
      -1
    ) {
      $(".hotspots-container > .flip-container")
        .eq(i)
        .css("display", "inline-block");
    } else {
      $(".hotspots-container > .flip-container").eq(i).css("display", "none");
    }
  }
};

const countryMaker = function () {
    var countryHeadder = $(".country-headder");
    countryHeadder.each(function () {
        countryFilter($(this).text(), countryHeadder.index(this));
    });
};

const countryFilter = (countryName, index) => {
  // ISSUE#2 
  // complete this function to filter the restaurants of the country countryName
  // countrylist is stored in variable -> jsonData ( checkout the data structure at https://github.com/chirayurathi/spotramenJson/blob/master/db.json).
  // use the appendCountryCard() function to append the filtered countries.  
};

const appendCountryCard = (data,index)=>{
    htmlString =
    "<div class='flip-container'><div class='flip-card' onclick='flipClick(this)'><div class='flip-front'><p>" +
    data["Brand"] +
    "</p></div><div class='flip-back'><div class='star'><a>" +
    data["Stars"] +
    "</a><i class='fas fa-star'></i></div><p class='sub-head'>variety</p><p class='variety'>" +
    data["Variety"] +
    "</p><p class='sub-head'>style</p><p>" +
    data["Style"] +
    "</p><p class='sub-head'>location</p><p>" +
    data["Country"] +
    "</p><p class='rank'>Ranked " +
    data["TopTen"] +
    "</p></div></div></div>";
  countryContent.eq(index).append(htmlString);
}

var years = $(".yeartag");

var yearsSubList = [Array(10), Array(10), Array(10), Array(10), Array(10)];
const yearsFunction = function () {
  years.each(function () {
    console.log(jsonData.length);
    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i]["TopTen"].indexOf("2012") > -1)
        yearsSubList[0][Number(jsonData[i]["TopTen"].slice(6))] = jsonData[i];
      else if (jsonData[i]["TopTen"].indexOf("2013") > -1)
        yearsSubList[1][Number(jsonData[i]["TopTen"].slice(6))] = jsonData[i];
      else if (jsonData[i]["TopTen"].indexOf("2014") > -1)
        yearsSubList[2][Number(jsonData[i]["TopTen"].slice(6))] = jsonData[i];
      else if (jsonData[i]["TopTen"].indexOf("2015") > -1)
        yearsSubList[3][Number(jsonData[i]["TopTen"].slice(6))] = jsonData[i];
      else if (jsonData[i]["TopTen"].indexOf("2016") > -1)
        yearsSubList[4][Number(jsonData[i]["TopTen"].slice(6))] = jsonData[i];
    }
  });

  var yearActList = yearsSubList[0];
  for (var i = 0; i < 10; i++) {
    if (yearActList[i]) {
      console.log("check");
      htmlString =
        "<div class='flip-container'><div class='flip-card' onclick='flipClick(this)'><div class='flip-front'><p>" +
        yearActList[i]["Brand"] +
        "</p></div><div class='flip-back'><div class='star'><a>" +
        yearActList[i]["Stars"] +
        "</a><i class='fas fa-star'></i></div><p class='sub-head'>variety</p><p class='variety'>" +
        yearActList[i]["Variety"] +
        "</p><p class='sub-head'>style</p><p>" +
        yearActList[i]["Style"] +
        "</p><p class='sub-head'>location</p><p>" +
        yearActList[i]["Country"] +
        "</p><p class='rank'>Ranked " +
        yearActList[i]["TopTen"] +
        "</p></div></div></div>";
      $(".tencontainer").append(htmlString);
    }
  }
};

years.click(function () {
  years.removeClass("yeartag-active");
  $(this).addClass("yeartag-active");
  var yearActList = yearsSubList[Number($(this).text()) % 2012];
  $(".tencontainer").empty();
  for (var i = 0; i < 10; i++) {
    if (!(yearActList[i] === undefined)) {
      console.log("check");
      htmlString =
        "<div class='flip-container'><div class='flip-card' onclick='flipClick(this)'><div class='flip-front'><p>" +
        yearActList[i]["Brand"] +
        "</p></div><div class='flip-back'><div class='star'><a>" +
        yearActList[i]["Stars"] +
        "</a><i class='fas fa-star'></i></div><p class='sub-head'>variety</p><p class='variety'>" +
        yearActList[i]["Variety"] +
        "</p><p class='sub-head'>style</p><p>" +
        yearActList[i]["Style"] +
        "</p><p class='sub-head'>location</p><p>" +
        yearActList[i]["Country"] +
        "</p><p class='rank'>Ranked " +
        yearActList[i]["TopTen"] +
        "</p></div></div></div>";
      $(".tencontainer").append(htmlString);
    }
  }
});
