// بارگذاری هدر و فوتر مشترک در همه صفحه‌ها
(async function () {
    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');

    async function load(slot, file) {
        if (!slot) return;
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(res.status);
            slot.innerHTML = await res.text();
        } catch (err) {
            console.error('خطا در بارگذاری ' + file + ' (با Live Server باز کن، نه مستقیم از فایل):', err);
        }
    }

    await Promise.all([
        load(headerSlot, 'header.html'),
        load(footerSlot, 'footer.html')
    ]);

    // لینک فعال: لینکی که فایلش با صفحه فعلی یکی است
    const current = location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('#mainNav .nav-link').forEach(function (link) {
        const href = link.getAttribute('href');
        if (!href) return;                       // دکمه «امکانات» href ندارد
        if (href.split('#')[0] === current) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // منوی کشویی «امکانات»
    // دکمه را با کلاس پیدا می‌کنیم (به id وابسته نیست)
    const dropdown = document.getElementById('featuresDropdown') || document.querySelector('.nav-dropdown');
    const dropBtn = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;
    const currentSection = document.getElementById('currentSection');

    function setDropdown(isOpen) {
        // هر دو کلاس: هم CSS قدیمی (.active) و هم CSS جدید (.open) کار کند
        dropdown.classList.toggle('open', isOpen);
        dropdown.classList.toggle('active', isOpen);
        dropBtn.setAttribute('aria-expanded', String(isOpen));
    }

    if (dropdown && dropBtn) {
        // اگر صفحه فعلی داخل منوی کشویی است، نامش روی دکمه بیاید
        dropdown.querySelectorAll('.dropdown-item').forEach(function (item) {
            if (item.getAttribute('href').split('#')[0] === current) {
                item.classList.add('active');
                dropBtn.classList.add('active');
                if (currentSection) currentSection.textContent = item.textContent.trim();
            }
        });

        dropBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            setDropdown(!dropdown.classList.contains('open'));
        });

        // کلیک بیرون از منو یا Escape: بسته شود
        document.addEventListener('click', function (e) {
            if (!dropdown.contains(e.target)) setDropdown(false);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') setDropdown(false);
        });
    }

    // منوی موبایل
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            const open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'بستن منو' : 'باز کردن منو');
        });
    }
})();