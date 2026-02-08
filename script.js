const params = new URLSearchParams(window.location.search);
const name = params.get("name") || "Gościu";

document.getElementById("welcome").innerText = "Cześć " + name + "! 🎉";
document.getElementById("hiddenName").value = name;

const form = document.getElementById("inviteForm");
const attendanceInput = document.getElementById("attendanceInput");

form.addEventListener("click", async (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const attendance = e.target.dataset.value;
    attendanceInput.value = attendance;

    const formData = new FormData(form);

    await fetch("https://formspree.io/f/xjgevoza", {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    });

    window.location.href =
        `masz-przyjsc.html?name=${encodeURIComponent(name)}&presence=${encodeURIComponent(attendance)}`;
});


// WYSTRZAŁ KONFETTI 🎉
window.onload = () => {
    for (let i = 0; i < 80; i++) {
        const c = document.createElement("div");
        c.style.position = "fixed";
        c.style.width = "6px";
        c.style.height = "6px";
        c.style.background = ["#fff","#ffd700","#ff69b4"][Math.floor(Math.random()*3)];
        c.style.left = "50%";
        c.style.top = "50%";
        c.style.borderRadius = "50%";
        c.style.pointerEvents = "none";
        c.style.opacity = "1";

        document.body.appendChild(c);

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 8 + 4;

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;

        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        const anim = setInterval(() => {
            x += dx;
            y += dy;
            c.style.left = x + "px";
            c.style.top = y + "px";
            c.style.opacity -= 0.03;

            if (c.style.opacity <= 0) {
                c.remove();
                clearInterval(anim);
            }
        }, 16);
    }
};
