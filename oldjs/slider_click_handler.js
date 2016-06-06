var bodyLoading;
function onLoad() {
	getAllCourses();
}

function logout() {
	navigator.notification.confirm("Do you want to log out?",
			function (buttonIndex) {
				if(buttonIndex === 1) {
					if (navigator.app) {
				        navigator.app.exitApp();
				    }
				    else if (navigator.device) {
				        navigator.device.exitApp();
				    }
				}
			},
			"Message",
			["Yes", "No"]);
	
}


$(document).on('click', '#slider_list li', function(e) {
	e.preventDefault();

	var menu_page_mapping = [];
	if(this.id === "logout") {
		logout();
	} else {
		$("#student_list_page").hide();
		$("#view_student_list_page").hide();
		(this.id === "home") ? $("#home_page").show() : $("#home_page").hide();
		(this.id === "enter_grades") ? getAllStudentsByCourseId() : $("#enter_grades_page").hide();
		(this.id === "view_grades") ? loadViewGradesPage() : $("#view_grades_page").hide();
		(this.id === "grade_setting") ? getGradeSetttings(): $("#grade_setting_page").hide();
		(this.id === "grade_range") ? getGradeRangeSettings() : $("#grade_range_page").hide();
	}
	 $("a.showMenu").click();
});

