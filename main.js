function toggleDarkMode() {
	$(".app-container").toggleClass("dark");

	if ($(".app-container").hasClass("dark")) {
		$("#darkMode").html("check_box");
		$("#darkMode")
			.parent()
			.addClass("active");
	} else {
		$("#darkMode").html("check_box_outline_blank");
		$("#darkMode")
			.parent()
			.removeClass("active");
	}
}