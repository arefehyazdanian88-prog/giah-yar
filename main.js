/* =========================================
   فایل اصلی جاوااسکریپت سایت گیاه‌یار
   وظیفه: کنترل منوی موبایل و انیمیشن‌ها
   ========================================= */


/* بخش اول: پیدا کردن دکمه منو و خود منو */

// دکمه باز و بسته کردن منوی موبایل
const menuToggle = document.getElementById("menuToggle");

// قسمت منوهای سایت
const mainNav = document.getElementById("mainNav");


/* بخش دوم: باز و بسته کردن منوی موبایل */

// بررسی می‌کنیم که دکمه و منو در صفحه وجود داشته باشند
if (menuToggle && mainNav) {

    // وقتی کاربر روی دکمه منو کلیک می‌کند
    menuToggle.addEventListener("click", function () {

        // کلاس open را اضافه یا حذف می‌کنیم
        const isOpen = mainNav.classList.toggle("open");

        // وضعیت منو را برای دسترس‌پذیری تنظیم می‌کنیم
        menuToggle.setAttribute("aria-expanded", String(isOpen));

        // متن کمکی دکمه را تغییر می‌دهیم
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "بستن منو" : "باز کردن منو"
        );
    });

    // وقتی روی یکی از لینک‌های منو کلیک شد
    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            // منو بسته می‌شود
            mainNav.classList.remove("open");

            // وضعیت دکمه به حالت بسته برمی‌گردد
            menuToggle.setAttribute("aria-expanded", "false");

            // متن کمکی دکمه تنظیم می‌شود
            menuToggle.setAttribute("aria-label", "باز کردن منو");
        });
    });
}


/* بخش سوم: پیدا کردن بخش‌های دارای انیمیشن */

// تمام عناصری که کلاس reveal دارند پیدا می‌شوند
const revealElements = document.querySelectorAll(".reveal");


/* بخش چهارم: نمایش نرم عناصر هنگام اسکرول */

// بررسی می‌کنیم مرورگر از IntersectionObserver پشتیبانی می‌کند یا نه
if ("IntersectionObserver" in window) {

    // ساخت ناظر برای بررسی ورود عناصر به صفحه
    const observer = new IntersectionObserver(
        function (entries, observer) {

            // بررسی هر عنصر
            entries.forEach(function (entry) {

                // اگر عنصر وارد محدوده قابل مشاهده شد
                if (entry.isIntersecting) {

                    // کلاس show را اضافه می‌کنیم تا انیمیشن اجرا شود
                    entry.target.classList.add("show");

                    // دیگر لازم نیست همین عنصر را بررسی کنیم
                    observer.unobserve(entry.target);
                }
            });

        },
        {
            // وقتی حدود ۱۲ درصد عنصر دیده شد، انیمیشن شروع می‌شود
            threshold: 0.12
        }
    );

    // همه عناصر را به ناظر معرفی می‌کنیم
    revealElements.forEach(function (element) {
        observer.observe(element);
    });

} else {

    // اگر مرورگر این قابلیت را نداشت، عناصر را نمایش می‌دهیم
    revealElements.forEach(function (element) {
        element.classList.add("show");
    });
}
/* =========================================
   بخش پنجم: همراه هوشمند گیاه‌یار
   ========================================= */

// باز کردن پنجره چت
function openPlantAssistant() {
    const chat = document.getElementById("plantChat");
    const input = document.getElementById("plantChatInput");

    if (chat) {
        chat.classList.add("open");

        if (input) {
            input.focus();
        }
    }
}

// بستن پنجره چت
function closePlantAssistant() {
    const chat = document.getElementById("plantChat");

    if (chat) {
        chat.classList.remove("open");
    }
}

// ارسال سؤال‌های آماده
function askPlantQuestion(question) {
    const input = document.getElementById("plantChatInput");

    if (input) {
        input.value = question;
        sendPlantMessage(question);
    }
}

// نمایش پیام و پاسخ همراه هوشمند
function sendPlantMessage(message) {
    const messages = document.getElementById("chatMessages");

    if (!messages) return;

    // نمایش پیام کاربر
    const userMessage = document.createElement("div");
    userMessage.className = "user-message";
    userMessage.textContent = message;
    messages.appendChild(userMessage);

    // آماده‌سازی پاسخ
    const answer = document.createElement("div");
    answer.className = "bot-message";

    const text = message.toLowerCase();

    if (text.includes("زرد")) {
        answer.textContent =
            "زرد شدن برگ ممکن است به آبیاری زیاد یا کم، نور نامناسب یا مشکلات خاک مربوط باشد. 🌿 خاک گیاه را بررسی کن. اسم گیاهت چیست؟";

    } else if (
        text.includes("نگهداری") ||
        text.includes("آپارتمانی")
    ) {
        answer.textContent =
            "برای نگهداری بهتر گیاه، نور مناسب، آبیاری متعادل و گلدان دارای سوراخ زهکشی مهم هستند. 🪴 اسم گیاهت را بگو تا دقیق‌تر راهنمایی‌ات کنم.";

    } else if (
        text.includes("پژمرده") ||
        text.includes("پژمردگی")
    ) {
        answer.textContent =
            "پژمردگی می‌تواند به کم‌آبی، آبیاری زیاد یا گرما مربوط باشد. 🌱 قبل از آبیاری، رطوبت خاک را بررسی کن.";

    } else if (
        text.includes("آبیاری") ||
        text.includes("آب بدم")
    ) {
        answer.textContent =
            "مقدار و زمان آبیاری به نوع گیاه، نور و رطوبت خاک بستگی دارد. 🌿 اسم گیاهت چیست؟";

    } else if (
        text.includes("قارچ") ||
        text.includes("بیماری") ||
        text.includes("لکه")
    ) {
        answer.textContent =
            "برای بررسی مشکل، اسم گیاه و شکل لکه‌ها را توضیح بده. اگر می‌توانی، عکس برگ را هم بررسی کن؛ فقط از روی این توضیح کوتاه نمی‌توان بیماری را قطعی تشخیص داد. 🍃";

    } else {
        answer.textContent =
            "سؤال خوبی پرسیدی! 🌿 فعلاً پاسخ‌های من آزمایشی و بر اساس چند کلمه کلیدی هستند و هنوز به هوش مصنوعی واقعی متصل نشده‌ام. اسم گیاه و مشکلش را بنویس تا بهتر راهنمایی‌ات کنم.";
    }

   const typing = document.createElement("div");
typing.className = "bot-message typing";
typing.textContent = "در حال نوشتن…";
messages.appendChild(typing);
messages.scrollTop = messages.scrollHeight;

setTimeout(function () {
    typing.remove();
    messages.appendChild(answer);
    messages.scrollTop = messages.scrollHeight;
}, 700);

    const input = document.getElementById("plantChatInput");

    if (input) {
        input.value = "";
    }
}

// اتصال فرم ارسال پیام
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("plantChatForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const input = document.getElementById("plantChatInput");

            if (!input) return;

            const message = input.value.trim();

            if (message) {
                sendPlantMessage(message);
            }
        });
    }
});
// نور روی کارت‌ها با حرکت ماوس
document.querySelectorAll(".feature-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - r.left) + "px");
        card.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
});

// بستن چت با Esc
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePlantAssistant();
});
/* ===== منوی کشویی امکانات گیاه‌یار ===== */

document.addEventListener("click", function (event) {
  const button = event.target.closest("#featuresButton");
  const dropdown = document.getElementById("featuresDropdown");

  if (!dropdown) return;

  if (button) {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = dropdown.classList.toggle("active");
    button.setAttribute("aria-expanded", String(isOpen));
    return;
  }

  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove("active");

    const featuresButton =
      document.getElementById("featuresButton");

    if (featuresButton) {
      featuresButton.setAttribute("aria-expanded", "false");
    }
  }
});

/* ===== نمایش نام صفحه فعلی در هدر ===== */

function updateCurrentSection() {
    const currentSection = document.getElementById("currentSection");
    if (!currentSection) return;

    const pageNames = {
        "symptoms.html": "کارآگاه بیماری",
        "environment.html": "محیط مناسب رشد",
        "history.html": "داستان رشد گیاه",
        "care.html": "مراقبت در زمان مناسب",
        "map.html": "نقشه سلامت گیاهان"
    };

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .split("?")[0]
        .toLowerCase();

    currentSection.textContent = pageNames[currentPage] || "امکانات";
}

/* اجرا پس از آماده شدن صفحه */
document.addEventListener("DOMContentLoaded", updateCurrentSection);

/* تشخیص اضافه شدن هدر به صفحه */
const headerObserver = new MutationObserver(function () {
    if (document.getElementById("currentSection")) {
        updateCurrentSection();
        headerObserver.disconnect();
    }
});

headerObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
});

/* تلاش اولیه */
updateCurrentSection();