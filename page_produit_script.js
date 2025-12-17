(function () {
  function $(sel) {
    return document.querySelector(sel);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var badge = $("#cart-badge");
    var addBtn = $("#add-to-cart");

    function getCount() {
      return parseInt(localStorage.getItem("cartCount"), 10) || 0;
    }
    function setCount(n) {
      localStorage.setItem("cartCount", n);
    }

    function ariaText(count) {
      if (count <= 0) return "Panier vide";
      return (
        count +
        (count === 1
          ? " article dans le panier, cliquer pour retirer"
          : " articles dans le panier, cliquer pour retirer")
      );
    }

    function updateBadge() {
      var count = getCount();
      if (!badge) return;
      if (count > 0) {
        badge.classList.remove("visually-hidden");
        badge.textContent = count;
        badge.setAttribute("aria-label", ariaText(count));
      } else {
        badge.classList.add("visually-hidden");
        badge.textContent = "";
        badge.setAttribute("aria-label", "Panier vide");
      }
    }

    function decrement() {
      var count = getCount() - 1;
      if (count < 0) count = 0;
      setCount(count);
      updateBadge();
      if (badge) {
        badge.classList.add("pop");
        window.setTimeout(function () {
          badge.classList.remove("pop");
        }, 300);
      }
    }

    if (addBtn) {
      addBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var count = getCount() + 1;
        setCount(count);
        if (badge) {
          badge.classList.remove("visually-hidden");
          badge.textContent = count;
          badge.setAttribute("aria-label", ariaText(count));
          // small pop animation
          badge.classList.add("pop");
          window.setTimeout(function () {
            badge.classList.remove("pop");
          }, 300);
        }
      });
    }

    if (badge) {
      badge.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        decrement();
      });

      badge.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          e.preventDefault();
          decrement();
        }
      });
    }

    updateBadge();
  });
})();
