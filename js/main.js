// on ready
document.addEventListener("DOMContentLoaded", function () {
	// add event listeners to the buttons

	// edit mode buttons
	document.getElementById("reset").addEventListener("click", function () {
		localStorage.removeItem("content");
		localStorage.removeItem("title");
		location.reload();
	});

	document.getElementById("create-link").addEventListener("click", function () {
		let title = document.getElementById("title").value;
		let content = document.getElementById("content").value;
		// encode the content and title into base64
		let encodedTitle = btoa(title);
		let encodedContent = btoa(content);
		// create the link using the current url and the encoded content and title
		let link = window.location.href + "?title=" + encodedTitle + "&content=" + encodedContent;
		// copy the link to the clipboard and show a message on the button, and remove it after 2 seconds
		navigator.clipboard.writeText(link).then(function () {
			document.getElementById("create-link").innerHTML = "Link Copied!";
			setTimeout(function () {
				document.getElementById("create-link").innerHTML = "Create Link";
			}, 2000);
		});
	});

	// view mode buttons
	// copy button - save the content to local storage and reload the page with no url parameters
	document.getElementById("copy").addEventListener("click", function () {
		localStorage.setItem("content", document.getElementById("content").value);
		localStorage.setItem("title", document.getElementById("title").value);

		window.location = window.location.href.split("?")[0];
	});

    // exit button - reload the page with no url parameters
    document.getElementById("exit").addEventListener("click", function () {
        window.location = window.location.href.split("?")[0];
    });

	// load the content from the local storage, if it exists OR from the url, if it exists
	if (window.location.href.includes("?title=") && window.location.href.includes("&content=")) {
		// view only mode
		let encodedTitle = window.location.href.split("?title=")[1].split("&content=")[0];
		let encodedContent = window.location.href.split("&content=")[1];
		let title = atob(encodedTitle);
		let titleElement = document.getElementById("title");
		let content = atob(encodedContent);
		let contentElement = document.getElementById("content");
		contentElement.value = content;
		titleElement.value = title;

		contentElement.style.height = "auto";
		contentElement.style.height = contentElement.scrollHeight + "px";
		titleElement.style.height = "auto";
		titleElement.style.height = titleElement.scrollHeight + "px";

		// remove hidden class from all the elements with the class "view-mode-only"
		let viewModeOnly = document.getElementsByClassName("view-mode-only");
		for (let i = 0; i < viewModeOnly.length; i++) {
			viewModeOnly[i].classList.remove("hidden");
		}

		// disable the content and title elements
		contentElement.disabled = true;
		titleElement.disabled = true;
	} else {
		// edit mode
		// saving system
		document.getElementById("content").addEventListener("input", function () {
			this.style.height = "auto";
			this.style.height = this.scrollHeight + "px";
			localStorage.setItem("content", this.value);
		});

		document.getElementById("title").addEventListener("input", function () {
			this.style.height = "auto";
			this.style.height = this.scrollHeight + "px";
			localStorage.setItem("title", this.value);
		});

		if (localStorage.getItem("content") !== null) {
			document.getElementById("content").value = localStorage.getItem("content");

			let content = document.getElementById("content");
			content.style.height = "auto";
			content.style.height = content.scrollHeight + "px";
		}

		// loading system
		if (localStorage.getItem("title") !== null) {
			document.getElementById("title").value = localStorage.getItem("title");

			let title = document.getElementById("title");
			title.style.height = "auto";
			title.style.height = title.scrollHeight + "px";
		}

		// remove hidden class from all the elements with the class "edit-mode-only"
		let editModeOnly = document.getElementsByClassName("edit-mode-only");
		for (let i = 0; i < editModeOnly.length; i++) {
			editModeOnly[i].classList.remove("hidden");
		}
	}
});
