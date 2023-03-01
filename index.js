const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
const toggleText = document.querySelector(".toggle-text");
const modeIcon = document.getElementById("mode-icon");

const menuIcon = document.getElementById("mobile-menu-icon");
const menuPage = document.querySelector(".mobile-menu");
const menuItemEls = document.querySelectorAll(".mobile-menu__item");

let isMenuPageOn = false;

// EventListener
toggleSwitch.addEventListener("change", switchTheme);

menuIcon.addEventListener("click", () => {
	pageToggleHandler();
});

menuItemEls.forEach((el) => {
	el.addEventListener("click", () => {
		pageToggleHandler();
		// let id = el.innerHTML.toLowerCase();
		// window.open(`/works/light-dark-mode#${id}`, "_self");
	});
});

// Dark-light mode setting change
function toggleDarkLightMode(mode) {
	let isDark = 0;
	isDark = mode == "dark" ? true : false;

	nav.style.backgroundColor = isDark
		? "rgb(0 0 0 /50%)"
		: "rgb(255 255 255 /50%)";
	textBox.style.backgroundColor = isDark
		? "rgb(255 255 255/ 60%)"
		: "rgb(0 0 0 /50%)";
	toggleText.textContent = isDark ? "Dark Mode" : "Light Mode";

	isDark
		? modeIcon.classList.replace("fa-sun", "fa-moon")
		: modeIcon.classList.replace("fa-moon", "fa-sun");
	isDark ? imageMode("dark") : imageMode("light");
}

// Dark or Light Images
function imageMode(mode) {
	image1.src = `./images/undraw_detailed_examination_${mode}.svg`;
	image2.src = `./images/undraw_website_setup_${mode}.svg`;
	image3.src = `./images/undraw_sharing_knowledge_${mode}.svg`;
}

// Switch Theme
function switchTheme(event) {
	if (event.target.checked) {
		document.documentElement.setAttribute("data-theme", "dark");
		localStorage.setItem("theme", "dark");
		toggleDarkLightMode("dark");
	} else {
		document.documentElement.setAttribute("data-theme", "light");
		localStorage.setItem("theme", "light");
		toggleDarkLightMode("light");
	}
}

// Check local storage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
	document.documentElement.setAttribute("data-theme", currentTheme);
	if (currentTheme === "dark") {
		toggleSwitch.checked = true;
		toggleDarkLightMode("dark");
	}
}

function pageToggleHandler() {
	if (isMenuPageOn) {
		// close the page
		menuItemEls.forEach((item) => {
			item.style.transform = "translateX(-100vw)";
		});
		setTimeout(() => (menuPage.style.left = "-100%"), 1000);

		menuIcon.children[0].classList.remove("fa-xmark");
		menuIcon.children[0].classList.add("fa-bars");
	} else {
		// open the page
		menuPage.style.left = "0";
		menuItemEls.forEach((item) => {
			item.style.transform = "translateX(0)";
		});
		menuIcon.children[0].classList.add("fa-xmark");
		menuIcon.children[0].classList.remove("fa-bars");
	}
	isMenuPageOn = !isMenuPageOn;
}
