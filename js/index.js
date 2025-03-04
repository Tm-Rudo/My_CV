document.addEventListener("mousemove", function (e) {
  const spotlight = document.querySelector(".spotlight");

  // Định vị vị trí hiệu ứng theo vị trí con trỏ chuột
  spotlight.style.left = e.pageX + "px";
  spotlight.style.top = e.pageY + "px";
});

// chữ đổi
document.addEventListener("DOMContentLoaded", function () {
  const textElement = document.getElementById("dynamic-content");
  const cursorElements = document.querySelectorAll(".cursor");
  const subTextElement = document.getElementById("sub-text");
  const subContentElement = document.getElementById("sub-content");
  const texts = ["Hi", "I'm Ngọc"];
  const subText = "I'm Front End Developer";
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;

  function type() {
    const currentText = texts[currentTextIndex];
    if (isDeleting) {
      currentCharIndex--;
    } else {
      currentCharIndex++;
    }

    textElement.textContent = currentText.substring(0, currentCharIndex);

    if (!isDeleting && currentCharIndex === currentText.length) {
      if (currentTextIndex === texts.length - 1) {
        cursorElements.forEach((cursor) => (cursor.style.display = "none"));
        subTextElement.style.display = "block"; // Hiển thị phần tử <h3>
        setTimeout(typeSubText, 1000); // Bắt đầu hiệu ứng cho <h3> sau 1 giây
        return; // Dừng hàm type khi đạt đến phần tử cuối cùng
      }
      setTimeout(() => (isDeleting = true), 1000);
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex++;
      if (currentTextIndex >= texts.length) {
        return; // Dừng hàm type khi hết chữ trong mảng
      }
    }

    setTimeout(type, isDeleting ? 100 : 200);
  }

  function typeSubText() {
    let subCharIndex = 0;
    function typeSub() {
      subContentElement.textContent = subText.substring(0, subCharIndex);
      subCharIndex++;
      if (subCharIndex <= subText.length) {
        setTimeout(typeSub, 200);
      } else {
        cursorElements.forEach((cursor) => (cursor.style.display = "none")); // Ẩn con trỏ nhấp nháy sau khi hoàn thành
      }
    }
    typeSub();
  }

  type();
});
