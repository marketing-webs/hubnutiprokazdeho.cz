jQuery(document).ready(function ($) {
  /* ******* USEFULL FUNCTIONS ******** */
  function nt_format_price(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function nt_get_current_url(include_parameters) {
    if (include_parameters === true) {
      return window.location.href;
    } else {
      return location.protocol + "//" + location.host + location.pathname;
    }
  }

  jQuery.fn.equalHeightsPerRow = function (itemsPerRow) {
    var list_items = jQuery(this).length,
      selector = this.selector;
    jQuery(this).each(function () {
      var index = jQuery(this).index(selector),
        maxHeight = 0;
      if (
        (index + 1) % itemsPerRow === 0 ||
        (list_items === index + 1 && index % itemsPerRow !== 0)
      ) {
        var jQuerythis = jQuery(
          selector +
            ":lt(" +
            (index + 1) +
            ")" +
            (index - itemsPerRow > 0
              ? ":gt(" + (index - itemsPerRow) + ")"
              : "")
        );
        jQuerythis.each(function () {
          var height = jQuery(this).outerHeight();

          if (height > maxHeight) {
            maxHeight = height;
          }
        });
        jQuerythis.css("height", maxHeight);
      }
    });
  };

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function is_url(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return pattern.test(str);
  }

  function viewport() {
    var e = window,
      a = "inner";
    if (!("innerWidth" in window)) {
      a = "client";
      e = document.documentElement || document.body;
    }
    return { width: e[a + "Width"], height: e[a + "Height"] };
  }

  /* ******* NEW LINKS WINDOW ******** */
  // $("a[href^=http]").each(function () {
  //     if (this.href.indexOf(location.hostname) == -1 && this.href.indexOf("store.domain.com") == -1 && this.href.indexOf("other.domain.rule") == -1) {
  //         $(this).attr({
  //             target: "_blank",
  //             title: "Opens in a new window"
  //         });
  //     }
  // });

  /* **************** NOTIFICATION ****************** */
  if ($(".notification").length) {
    setTimeout(function () {
      if ($("body").find(".notification").hasClass("active") === true) {
        $(".notification").removeClass("active");
        window.history.replaceState(null, null, window.location.pathname);
      }
    }, 2500);
  }

  /* ******* Adaptive menu items ******** */
  $(window).on("scroll load", function () {
    // figure_out_active_menu_item();
  });

  function figure_out_active_menu_item() {
    // check each menu item
    $(".menu ul>li>a").each(function () {
      // store link object
      var link = $(this);
      var hrefLink = $(this).attr("href");

      // is not a link, probably is just ID
      if (is_url(hrefLink) === false) {
        // so we have ID! let's extract exact ID
        var sectionId = hrefLink.replace("#", "");

        if (sectionId !== "") {
          // is element present on the page?
          if ($("body").find("#" + sectionId).length) {
            // get few variables needed for calculation
            var sectionFromTop = $("body")
              .find("#" + sectionId)
              .offset().top;
            var sectionHeight = $("body")
              .find("#" + sectionId)
              .outerHeight();

            var screenDim = viewport();
            var scrollTop = $(window).scrollTop();
            var middleScreen = scrollTop + screenDim.height / 2;

            // is the section in the middle of the screen?
            if (
              sectionFromTop < middleScreen &&
              sectionFromTop + sectionHeight > middleScreen
            ) {
              // add active class to the original link
              $(link).addClass("active");
            } else {
              // if not, remove the class
              $(link).removeClass("active");
            }
          }
        }
      }
    });
  }

  /* ******* RESPONSIVE IFRAME ******** */
  function adjust_iframes() {
    $("body")
      .find("iframe")
      .each(function () {
        var ifWidth = $(this).attr("width");
        var ifHeight = $(this).attr("height");
        var ratio = ifHeight / ifWidth;
        var realWidth = $(this).width();
        var realHeight = realWidth * ratio;
        $(this).css("height", realHeight);
      });
  }

  $(window).on("load resize", function () {
    adjust_iframes();
  });

  /* **************** STICKY NAV ****************** */
  var oldPos = 0;
  var newPos = $(document).scrollTop();
  $(window).on("scroll", function () {
    newPos = $(document).scrollTop();

    if (newPos >= 600) {
      if (newPos > oldPos) {
        // we are going down
        $("header .sticky").removeClass("active");
      } else {
        // going up
        $("header .sticky").addClass("active");
      }
    } else {
      // less than 600, always show
      $("header .sticky").addClass("active");
    }

    oldPos = newPos;
  });

  /* ***************** NICE RADIO ***************** */
  $("body").on("click", ".radio-wrapper", function (e) {
    e.stopPropagation();
    e.preventDefault();
    if ($(this).hasClass("active") === false) {
      // get name of the input
      var inputName = $(this).find("input").attr("name");

      // find all inputs with the same name and remove active
      $("body")
        .find("input[name=" + inputName + "]")
        .each(function () {
          $(this).prop("checked", false);
          $(this).closest(".radio-wrapper").removeClass("active");
        });

      // check this one
      $(this).find("input[type=radio]").prop("checked", true);

      // add active class
      $(this).addClass("active");

      if ($(this).hasClass("parent-error")) {
        // remove from all inputs error
        $("body")
          .find("input[name=" + inputName + "]")
          .each(function () {
            $(this).removeClass("parent-error");
          });
      }
    }
  });

  /* ***************** NICE CHECKBOX ***************** */
  $("body").on("click", ".checkbox-wrapper", function (e) {
    e.stopPropagation();
    e.preventDefault();

    // remove error class
    if ($(this).hasClass("error")) {
      $(this).removeClass("error");
    }

    if ($(this).hasClass("active") === false) {
      // check this one
      $(this).find("input[type=checkbox]").prop("checked", true);

      // add active class
      $(this).addClass("active");
    } else {
      // check this one
      $(this).find("input[type=checkbox]").prop("checked", false);

      // add active class
      $(this).removeClass("active");
    }
  });

  /* ***************** FORM VALIDATOR ***************** */
  $(window).on("load", function () {
    $("form").find("input[type=submit]").attr("disabled", false);
    $("form").find("button").attr("disabled", false);
  });

  $("body").on("submit", "form:not(.shipping-payment)", function (e) {
    console.log("asd");
    if ($(this).hasClass("js-validate")) {
      var confirm_text = $(this).data("confirm-text");
      if (confirm_text === undefined) {
        confirm_text = "Really submit the form?";
      }
      return confirm(confirm_text);
    }

    var preventSubmit = 0;
    var form = $(this);
    var scrollTo = false;

    // required input
    $(form)
      .find("input.req, textarea.req")
      .each(function () {
        if ($(this).val() === "" && $(this).is(":visible")) {
          $(this).addClass("error");
          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmit = 1;
        }
      });

    // require checkbox
    $(form)
      .find("input[type=checkbox].req")
      .each(function () {
        if (
          $(this).is(":checked") === false &&
          $(this).parent().is(":visible")
        ) {
          $(this).parent().addClass("error");
          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmit = 1;
        }
      });

    // require radio
    $(form)
      .find("input[type=radio].req")
      .each(function () {
        var radioName = $(this).attr("name");
        var radioIsChecked = 0;
        $(form)
          .find("input[name=" + radioName + "]")
          .each(function () {
            if ($(this).is(":checked") === true) {
              radioIsChecked = 1;
            }
          });

        if (radioIsChecked === 0) {
          $(this).parent().addClass("parent-error");
          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmit = 1;
        }
      });

    // require file
    $(form)
      .find("input[type=file].req")
      .each(function () {
        var value = $(this).val();
        if (value === "") {
          if ($(this).hasClass("inputfile")) {
            $(this).parent().find("label").addClass("error");
          } else {
            $(this).addClass("error");
          }

          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmit = 1;
        }
      });

    // require select
    $(form)
      .find("select.req")
      .each(function () {
        var selectedValue = $(this).find("option:selected").val();
        if (
          (selectedValue === undefined || selectedValue === "") &&
          $(this).parent().find(".select2").is(":visible") === true
        ) {
          $(this).parent().find(".select2").addClass("error");
          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmit = 1;
        }
      });

    if ($(this).find("input[name=shipping]").length) {
      if ($(this).find("input[name=shipping]:checked").val() === "zasilkovna") {
        var shippingBranch = $(this).find("input[name=shipping_branch]").val();
        if (shippingBranch === "") {
          $(this).find(".select-branch ").addClass("required-error");
          preventSubmit = 1;
        }
      }
    }

    // prevent submit
    if (preventSubmit === 1) {
      e.preventDefault();

      if ($(this).find(".error-message").length) {
        $(this).find(".error-message").slideDown();
      }

      $("html, body").animate(
        {
          scrollTop: $(scrollTo).offset().top - 100,
        },
        500
      );
    } else {
      // $(this).find('input[type=submit]').attr('disabled', true);
      // $(this).find('button').attr('disabled', true);

      if ($(this).find(".preloader").length) {
        $(this).find(".preloader").show();
      }

      setTimeout(function () {
        // $(this).find('input[type=submit]').attr('disabled', false);
        // $(this).find('button').attr('disabled', false);
      }, 1000);
    }
  });

  $("body").on("submit", "form.shipping-payment.order", function (e) {
    var preventSubmit = 0;
    var preventSubmitCheckbox = 0;
    var form = $(this);
    var scrollTo = false;

    // required input
    $(form)
      .find("input.req, textarea.req")
      .each(function () {
        if ($(this).val() === "" && $(this).is(":visible")) {
          $(this).addClass("error");
          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmit = 1;
        }
      });

    // require checkbox
    $(form)
      .find("input[type=checkbox].req")
      .each(function () {
        if (
          $(this).is(":checked") === false &&
          $(this).parent().is(":visible")
        ) {
          $(this).parent().addClass("error");
          if (scrollTo === false) {
            scrollTo = $(this);
          }
          preventSubmitCheckbox = 1;
        }
      });

    if ($(this).find("input[name=shipping]").length) {
      if ($(this).find("input[name=shipping]:checked").val() === "zasilkovna") {
        var shippingBranch = $(this).find("input[name=shipping_branch]").val();
        if (shippingBranch === "") {
          $(this).find(".select-branch ").addClass("required-error");
          preventSubmit = 1;
        }
      }
    }

    // prevent submit
    if (preventSubmit === 1 || preventSubmitCheckbox === 1) {
      e.preventDefault();

      if (
        preventSubmit === 1 &&
        $(this).find(".error-message.confirm-fields").length
      ) {
        $(this).find(".error-message.confirm-fields").slideDown();
      } else {
        $(this).find(".error-message.confirm-fields").slideUp();
      }

      if (
        preventSubmitCheckbox === 1 &&
        $(this).find(".error-message.confirm-op").length
      ) {
        $(this).find(".error-message.confirm-op").slideDown();
      } else {
        $(this).find(".error-message.confirm-op").slideUp();
      }

      $("html, body").animate(
        {
          scrollTop: $(scrollTo).offset().top - 100,
        },
        500
      );
    } else {
      if ($(this).find(".preloader").length) {
        $(this).find(".preloader").show();
      }
    }
  });

  $("body").on("keyup", "input.error, textarea.error", function () {
    $(this).removeClass("error");
  });

  $("body").on("change", "input.inputfile", function () {
    $(this).parent().find("label").removeClass("error");
  });

  $("select.select2").on("change", function () {
    $(this).closest("div").find(".select2.error").removeClass("error");
  });

  /* ***************** SUBSCRIBE NEWSLETTER ***************** */
  $("body").on("submit", "form.newsletter-signup", function (e) {
    var email = $(this).find("input[name=email]").val();

    if (email.indexOf("@") != -1) {
      $.ajax({
        url: ajaxurl,
        type: "POST",
        data: {
          action: "subscribe_newsletter",
          email: email,
        },
        data: $(this).serialize(),
        beforeSend: function () {},
        success: function (data) {
          console.log(data);
          $("form.newsletter-signup").slideUp();
          $(".newsletter-success").slideDown();
        },
        error: function () {},
      });
    }
  });

  /* ******* MOBILE NAV ******** */
  function open_mobile_nav() {
    var burger = $(".mobile-menu-switcher");
    var menu = $("header .menu");

    /* make awesome animation */
    $(burger).addClass("active");
    setTimeout(function () {
      $(burger).addClass("open");
    }, 500);

    /* open menu */

    setTimeout(function () {
      $(menu).addClass("mobile-open");
    }, 500);
  }

  function close_mobile_nav() {
    var burger = $(".mobile-menu-switcher");
    var menu = $("header .menu");

    /* close animation */
    $(burger).removeClass("open");
    setTimeout(function () {
      $(burger).removeClass("active");
    }, 500);

    /* close menu */
    $(menu).removeClass("mobile-open");
  }

  $(".mobile-menu-switcher").on("click", function () {
    if ($(this).hasClass("active") === false) {
      open_mobile_nav();
    } else {
      close_mobile_nav();
    }
  });

  $("body").on("click", "header .menu.mobile-open ul li a", function () {
    close_mobile_nav();
  });

  /* ******* EQUAL ******** */

  function align_equal() {
    var screenDim = viewport();

    if (screenDim.width > 1105) {
      // 2
      $(".equal-height-2").css("height", "auto");
      $(".equal-height-2").equalHeightsPerRow(2);

      // 3
      $(".equal-height-3").css("height", "auto");
      $(".equal-height-3").equalHeightsPerRow(3);

      // 4
      $(".equal-height-4").css("height", "auto");
      $(".equal-height-4").equalHeightsPerRow(4);

      // 5
      $(".equal-height-5").css("height", "auto");
      $(".equal-height-5").equalHeightsPerRow(5);

      // large
      $(".xxx").css("height", "auto");
      $(".xxx").equalHeightsPerRow(4);
    } else if (screenDim.width > 768 && screenDim.width <= 1024) {
      // 2
      $(".equal-height-2").css("height", "auto");
      $(".equal-height-2").equalHeightsPerRow(2);

      // 3
      $(".equal-height-3").css("height", "auto");
      $(".equal-height-3").equalHeightsPerRow(3);

      // 4
      $(".equal-height-4").css("height", "auto");
      $(".equal-height-4").equalHeightsPerRow(2);

      // 5
      $(".equal-height-5").css("height", "auto");
      $(".equal-height-5").equalHeightsPerRow(5);

      // medium
      $(".xxx").css("height", "auto");
      $(".xxx").equalHeightsPerRow(4);
    } else if (screenDim.width > 500 && screenDim.width <= 768) {
      // 2
      $(".equal-height-2").css("height", "auto");
      $(".equal-height-2").equalHeightsPerRow(2);

      // 3
      $(".equal-height-3").css("height", "auto");
      $(".equal-height-3").equalHeightsPerRow(3);

      // 4
      $(".equal-height-4").css("height", "auto");
      $(".equal-height-4").equalHeightsPerRow(2);

      // 5
      $(".equal-height-5").css("height", "auto");

      // medium
      $(".xxx").css("height", "auto");
      $(".xxx").equalHeightsPerRow(4);
    } else {
      // 2
      $(".equal-height-2").css("height", "auto");

      // 3
      $(".equal-height-3").css("height", "auto");

      // 4
      $(".equal-height-4").css("height", "auto");

      // 5
      $(".equal-height-5").css("height", "auto");

      // small
      $(".xxx").css("height", "auto");
    }
  }

  $(window).on("load resize", function () {
    align_equal();
  });

  /* ******* ANCHORS ******** */
  $("body").on("click", "a[href*=\\#]", function (e) {
    var target = this.hash;
    var href = $(this).attr("href");

    if (target !== "" && href.indexOf("respond") === -1) {
      var $target = $(target);
      var targetname = target.slice(1, target.length);

      if (document.getElementById(targetname) != null) {
        e.preventDefault();
      }

      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $target.offset().top, //for offset must: <div style="padding-top: 70px; margin-top: -70px;" id="myID"></div>
          },
          900,
          "swing",
          function () {
            window.location.hash = target;
          }
        );
    }
  });

  /* ******* Select2 ******** */
  function nt_init_select2() {
    if ($(".select2").length) {
      $(".select2").each(function () {
        var placeholder = $(this).data("placeholder");
        var search = $(this).data("search");
        var searchValue = -1;

        var allowClear = $(this).data("allow-clear");
        var allowMultiple = $(this).data("multiple");
        var allowClearValue = false;
        var multipleValue = false;

        if (typeof search !== "undefined") {
          searchValue = 0;
        }

        if (typeof allowClear !== "undefined") {
          allowClearValue = true;
        }

        if (typeof allowMultiple !== "undefined") {
          multipleValue = true;
        }

        $(this).select2({
          multiple: multipleValue,
          placeholder: placeholder,
          allowClear: allowClearValue,
          minimumResultsForSearch: searchValue,
        });
      });
    }
  }

  nt_init_select2();

  /* **************** TEST SLIDER ****************** */
  if ($(".testimonial-slider").length) {
    $(".testimonial-slider").bxSlider({
      pager: false,
      prevText: '<i class="fal fa-angle-left"></i>',
      nextText: '<i class="fal fa-angle-right"></i>',
      mode: "fade",
      auto: true,
      pause: 8000,
      infiniteLoop: false,
      hideControlOnEnd: true,
    });
  }

  /* **************** GALLERY ****************** */
  function get_slide_properties(element) {
    var screenDim = viewport();
    var elementWidth = $(element).outerWidth();
    // xs
    var slideNumber = 2;
    var slideWidth = elementWidth / 2;

    if (screenDim.width > 1290) {
      // md
      slideNumber = 3;
      slideWidth = elementWidth / 4;
    } else if (screenDim.width < 1289 && screenDim.width > 768) {
      // lg
      slideNumber = 3;
      slideWidth = elementWidth / 3;
    }

    return { slideNumber: slideNumber, slideWidth: slideWidth };
  }

  if ($(".fullwidth-gallery").length) {
    var element = $("ul.car-gallery.slider").outerWidth();
    var slideProperties = get_slide_properties(element);

    var bxSlider = $(".fullwidth-gallery").bxSlider({
      slideWidth: slideProperties.slideWidth,
      minSlides: slideProperties.slideNumber,
      maxSlides: slideProperties.slideNumber,
      pager: false,
      prevText: '<i class="fal fa-angle-left"></i>',
      nextText: '<i class="fal fa-angle-right"></i>',
      slideMargin: 0,
      infiniteLoop: false,
      hideControlOnEnd: true,
    });

    $(window).on("resize", function () {
      var element = $("ul.car-gallery.slider").outerWidth();
      var slideProperties = get_slide_properties(element);

      bxSlider.reloadSlider({
        slideWidth: slideProperties.slideWidth,
        minSlides: slideProperties.slideNumber,
        maxSlides: slideProperties.slideNumber,
        pager: false,
        prevText: "&#xf104;",
        nextText: "&#xf105;",
        slideMargin: 0,
        infiniteLoop: false,
        hideControlOnEnd: true,
      });
    });
  }

  /* ***************** DATE PICKER ***************** */
  $(".datepicker").datepicker();
  $.datepicker.regional["cs"] = {
    closeText: "Zavřít",
    prevText: "&#x3c;Dříve",
    nextText: "Později&#x3e;",
    currentText: "Nyní",
    monthNames: [
      "leden",
      "únor",
      "březen",
      "duben",
      "květen",
      "červen",
      "červenec",
      "srpen",
      "září",
      "říjen",
      "listopad",
      "prosinec",
    ],
    monthNamesShort: [
      "led",
      "úno",
      "bře",
      "dub",
      "kvě",
      "čer",
      "čvc",
      "srp",
      "zář",
      "říj",
      "lis",
      "pro",
    ],
    dayNames: [
      "neděle",
      "pondělí",
      "úterý",
      "středa",
      "čtvrtek",
      "pátek",
      "sobota",
    ],
    dayNamesShort: ["ne", "po", "út", "st", "čt", "pá", "so"],
    dayNamesMin: ["ne", "po", "út", "st", "čt", "pá", "so"],
    weekHeader: "Týd",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
  };
  $.datepicker.setDefaults($.datepicker.regional["cs"]);

  /* **************** Delete file ****************** */
  $(".file-box .remove").on("click touchend", function (e) {
    e.preventDefault();
    var fileWrapper = $(this).closest(".file-box");

    var fid = $(fileWrapper).data("fid");
    var pid = $(fileWrapper).data("pid");

    $.ajax({
      url: ajaxurl,
      type: "POST",
      data: {
        action: "delete_file",
        fid: fid,
        pid: pid,
      },
      beforeSend: function () {},
      success: function (data) {
        console.log(data);
        if (data.success === false) {
          $(".notification")
            .removeClass("success")
            .addClass("error")
            .html(
              '<div class="icon"><i class="fas fa-times"></i></div> ' +
                data.data.message
            )
            .addClass("visible");
          setTimeout(function () {
            $(".notification").removeClass("visible");
          }, 3000);
        } else {
          // all good
          $(".notification")
            .removeClass("error")
            .addClass("success")
            .html(
              '<div class="icon"><i class="fas fa-check"></i></div> ' +
                data.data.message
            )
            .addClass("visible");
          setTimeout(function () {
            $(".notification").removeClass("visible");
          }, 3000);

          // hide image
          $(fileWrapper).fadeOut();
          setTimeout(function () {
            $(fileWrapper).remove();
          }, 500);
        }
      },
      error: function (e, b) {
        $(".notification")
          .removeClass("success")
          .addClass("error")
          .html(e + b)
          .addClass("visible");
        setTimeout(function () {
          $(".notification").removeClass("visible");
        }, 3000);
      },
    });
  });

  /* ******* TABS ******** */
  $(".faq-box.has-hidden-answer").on(
    "click",
    ".hidden-answer-trigger, .answer-visible,.question",
    function () {
      var faqBox = $(this).closest(".faq-box");

      if ($(faqBox).hasClass("active") === false) {
        $(faqBox).addClass("active");
        $(faqBox).find(".answer-hidden").slideDown();
      } else {
        $(faqBox).removeClass("active");
        $(faqBox).find(".answer-hidden").slideUp();
      }
    }
  );

  /*AGREE CORRECTION*/
  $(".agree-tos-text span").on("click", function () {
    $(this).closest(".agree-tos").find("input").attr("checked", true);
  });

  function strstr(haystack, needle, bool) {
    var pos = 0;

    haystack += "";
    pos = haystack.indexOf(needle);
    if (pos == -1) {
      return false;
    } else {
      if (bool) {
        return haystack.substr(0, pos);
      } else {
        return haystack.slice(pos);
      }
    }
  }

  var homeUrl = decodeURIComponent(readCookie("nt_home_url"));
  if (
    typeof homeUrl !== "undefined" &&
    homeUrl !== null &&
    homeUrl !== "null"
  ) {
    $("a.logo").attr("href", homeUrl);

    $("a").each(function () {
      var url = $(this).attr("href");

      var hasHomeHash = strstr(url, "https://ostefit.cz/#");
      if (hasHomeHash !== false) {
        url = url.replace("https://ostefit.cz/#", homeUrl + "#");
        $(this).attr("href", url);
      }

      var hasHomeHash2 = strstr(url, "https://ostefit.cz#");
      if (hasHomeHash2 !== false) {
        url = url.replace("https://ostefit.cz#", homeUrl + "#");
        $(this).attr("href", url);
      }
    });
  }

  /* ***************** STICKY SIDEBAR ***************** */
  if ($("aside .cta-widget").length) {
    var sidebarCTAWidget = $("aside .cta-widget");
    var screenDim = viewport();
    if (screenDim.width > 1105) {
      var widgetWidth = $(sidebarCTAWidget).outerWidth();
      var widgetHeight = $(sidebarCTAWidget).outerHeight();
      var widgetFromTop = $(sidebarCTAWidget).offset().top;
      var contentHeight = $(sidebarCTAWidget).closest(".row").outerHeight();

      $(sidebarCTAWidget).css("width", widgetWidth);

      $(window).on("scroll", function () {
        if ($(document).scrollTop() >= widgetFromTop) {
          $(sidebarCTAWidget).addClass("fixed");
        } else {
          $(sidebarCTAWidget).removeClass("fixed");
        }

        if (
          $(document).scrollTop() >
          contentHeight + widgetFromTop - widgetHeight
        ) {
          $(sidebarCTAWidget).addClass("bottom");
        } else {
          $(sidebarCTAWidget).removeClass("bottom");
        }
      });
    }
  }

  /* ***************** REVIEWS ***************** */
  $(".trigger-all-reviews").on("click", function (e) {
    e.preventDefault();

    $(this).parent().slideUp();
    $(".show-reviews").slideDown();
  });

  var timer = $(".timer");
  if ($(timer).length) {
    var date = $(".timer").data("time");
    console.log(date);
    new Countdown({
      selector: ".timer",
      dateEnd: new Date(date),
      msgPattern: "Akce končí za {minutes} min {seconds} s",
      msgAfter: "Akce skončila.",
    });
  }
});
