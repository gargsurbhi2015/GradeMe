function getAllCourses() {
	var request = $.ajax({
		url : BASE_URL + 'get_course.php',
		type : 'get'
	});
	
	$.blockUI({ message: 'Loading..' });
	request.done(function(response, textStatus, jqXHR) {
		setCourses(response);
		$.unblockUI();
		getCourses().forEach(
				function(course) {
					var option = $("<option />").val(course.CourseName).text(
							course.CourseName).attr("id", course.ID).attr(
							"class", "select_course_item");
					$("#select_course").append(option);
				});
	});
}

$(document).on("slidestop", ".a_min", function(event, ui) {
	$('.b_max').val(this.value - 1);
	$('.b_max').slider('refresh');
});

$(document).on("slidestop", ".b_min", function(event, ui) {
	$('.c_max').val(this.value - 1);
	$('.c_max').slider('refresh');
});

$(document).on("slidestop", ".c_min", function(event, ui) {
	$('.d_max').val(this.value - 1);
	$('.d_max').slider('refresh');
});

$(document).on("slidestop", ".d_min", function(event, ui) {
	$('.f_max').val(this.value - 1);
	$('.f_max').slider('refresh');
});

/**
 * To hold selected course
 */
$(document).on(
		'change',
		'#select_course',
		function() {
			var id = $(this).children(":selected").attr("id");
			var courseId = $(this).children(":selected").attr("value");

			var courseDescriptionURL = "http://jaypan.net/" + courseId
					+ "/index.html";
			var html = '<h2 style="color:black">Course Description</h2>' + '<object data="'
					+ courseDescriptionURL
					+ '" width="100%" height="100%" style="overflow:auto;"/>';
			$("#course_description_page").html(html);
			$("#course_description_page").show();
			setCourseId(id);

			var request = $.ajax({
				url : BASE_URL + 'get_students_by_course.php?courseId='
						+ getCourseId(),
				type : 'get'
			});
			request.done(function(response, textStatus, jqXHR) {
				setStudentsByCourse(response);
			});
		});

/**
 * Displays student list by selected course
 */
function getAllStudentsByCourseId() {
	if (getCourseId() != undefined) {

		$("#enter_grades_page").hide();

		$("#student_list_page").show();
		var table = $("#student_list_table");

		// Remove previously created table rows
		var trLength = $("#student_list_table tbody tr").length
		for (var j = 1; j < trLength; j++) {
			$("#student_entry_row").remove();
		}

		var i = 1;
		getStudentsByCourse().forEach(
				function(student) {
					var row;
					if (i == 1) {
						row = $("#student_entry_row");
					} else {
						row = $("#student_entry_row").clone().appendTo(table);
					}
					row.find('#student_name').text(
							student.FirstName + " " + student.LastName);
					row.find('.edit_grades_button').attr('id', student.ID);
					i++;
				});
	} else {
		showAlert(SELECT_COURSE_MSG);
		$("#home").click();
	}
}

function loadViewGradesPage() {
	if (getCourseId() != undefined) {

		$("#view_grades_page").hide();

		$("#view_student_list_page").show();
		var table = $("#view_grades_student_list_table");

		// Remove previously created table rows
		var trLength = $("#view_grades_student_list_table tbody tr").length
		for (var j = 1; j < trLength; j++) {
			$("#view_grades_student_entry_row").remove();
		}

		var i = 1;
		getStudentsByCourse().forEach(
				function(student) {
					var row;
					if (i == 1) {
						row = $("#view_grades_student_entry_row");
					} else {
						row = $("#view_grades_student_entry_row").clone().appendTo(table);
					}
					row.find('#view_grades_student_name').text(
							student.FirstName + " " + student.LastName);
					row.find('.view_grades_button').attr('id', student.ID);
					i++;
				});
	} else {
		showAlert(SELECT_COURSE_MSG);
		$("#home").click();
	}
}

$(document).on('click', '#cancel_grades_button', function(e) {
	e.preventDefault();
	$("#enter_grades_page").hide();
});

$(document).on('click', '.edit_grades_button', function(e) {
	e.preventDefault();
	$("#home_page").hide();
	// $("#student_list_page").hide();

	// Hold student id
	setStudentId(parseInt(this.id));
	viewGrades(true);
});

$(document).on('click', '.view_grades_button', function(e) {
	e.preventDefault();
	$("#home_page").hide();
	
	// Hold student id
	setStudentId(parseInt(this.id));
	viewGrades(false);
});

function viewGrades(isEnterGrades) {
	var student;

	var studentsList = getStudentsByCourse();
	// var courseId = getCourseId();

	if (getCourseId() != undefined) {
		var studentId = getStudentId();

		if (studentId) {
			for (var i = 0; i < studentsList.length; i++) {
				if (studentId === studentsList[i].ID) {
					student = studentsList[i];
					break;
				}
			}
		} else {
			student = studentsList[0];
		}

		var div = $("#enter_grades_page");
		if (isEnterGrades) {
			div = $("#enter_grades_page");
			$("#enter_lab_grades").val(student.Labs);
			$("#enter_homework_grades").val(student.Homework);
			$("#enter_midterm_grades").val(student.Midterm);
			$("#enter_final_exam_grades").val(student.Final);
			$("#enter_project_grades").val(student.Project);
			//$("#enter_extra_credit").val(student.Presentation);
		} else {
			div = $("#view_grades_page");
			$("#lab_grades").text(student.Labs);
			$("#student_grade").text(student.Grade);
			$("#homework_grades").text(student.Homework);
			$("#midterm_grades").text(student.Midterm);
			$("#final_exam_grades").text(student.Final);
			$("#project_grades").text(student.Project);
			//$("#extra_credits").text(student.Presentation);
			var total = student.Labs + student.Homework + student.Midterm
					+ student.Final;
			$("#total_grades").text(total);
		}
		div.find("#student_name").text(
				student.FirstName + " " + student.LastName);
		div.find("#student_id").text(student.ID);
		div.show();
	} else {
		showAlert(SELECT_COURSE_MSG);
		$("#home").click();
	}

}

$(document).on('click', '#submit_grades_button', function(e) {
	e.preventDefault();

	var request = $.ajax({
		url : BASE_URL + 'get_course.php?courseId=' + getCourseId(),
		type : 'get'
	});

	request.done(function(response, textStatus, jqXHR) {
		var maxHomework = response.MHomework;
		var maxLabs = response.MLabs;
		var maxProject = response.MProject;
		var maxPresentation = response.Presentation;
		var maxMidterm = response.MMidterm;
		var maxFinal = response.MFinal;

		var homeWork = $("#enter_homework_grades").val();
		var lab = $("#enter_lab_grades").val();
		var midTerm = $("#enter_midterm_grades").val();
		var finalExam = $("#enter_final_exam_grades").val();
		var project = $("#enter_project_grades").val();
		var extraCredit = $("#enter_extra_credit").val();

		if (validateNumber(homeWork, maxHomework, 'Homework')
				&& validateNumber(lab, maxHomework, 'Lab')
				&& validateNumber(midTerm, maxHomework, 'Mid Term')
				&& validateNumber(finalExam, maxHomework, 'Final Exam')
				&& validateNumber(project, maxHomework, 'Project')) {

			var data = {
				CourseId : getCourseId(),
				StudentId : getStudentId(),
				Homework : homeWork,
				Labs : lab,
				Project : project,
				Midterm : midTerm,
				Final : finalExam
			};
			// showAlert(JSON.stringify(data));
			var request = $.ajax({
				url : BASE_URL + 'compute_and_save_grade.php',
				type : 'post',
				data : JSON.stringify(data)
			});
			request.done(function(response, textStatus, xhr) {
				if (xhr.status == 200) {
					var request = $.ajax({
						url : BASE_URL + 'get_students_by_course.php?courseId=' + getCourseId(),
						type : 'get'
					});
					request.done(function(response, textStatus, jqXHR) {
						setStudentsByCourse(response);
					});
					
					showAlert('Grades submitted successfully');
				}
			});

		}

	});

});

function validateNumber(number, maxValue, type) {
	var n = parseInt(number);
	if (isNaN(n)) {
		showAlert("Please enter numeric value for " + type);
		return false;
	} else if (n < 0) {
		showAlert(type + " must be positive value");
		return false;
	} else if (n > parseInt(maxValue)) {
		showAlert(type + " grades must be less than " + maxValue);
		return false;
	}
	return true;
}

function getGradeSetttings() {
	
	if (getCourseId() != undefined) {
		var request = $.ajax({
			url : BASE_URL + 'get_course.php?courseId=' + getCourseId(),
			type : 'get'
		});
	
		request.done(function(response, textStatus, jqXHR) {
			if (jqXHR.status == 200) {
				var maxHomework = response.MHomework;
				var maxLabs = response.MLabs;
				var maxProject = response.MProject;
				var maxMidterm = response.MMidterm;
				var maxFinal = response.MFinal;
				var pHomework = response.PHomework;
				var pLabs = response.PLabs;
				var pMidterm = response.PMidterm;
				var pFinal = response.PFinal;
				var pProject = response.PProject;
				$("#homework_grades_slider").val(pHomework);
				$("#lab_grades_slider").val(pLabs);
				$("#project_grade_slider").val(pProject);
				$("#midterm_grade_slider").val(pMidterm);
				$("#final_exam_grade_slider").val(pFinal);
				$("#max_homwork").val(maxHomework);
				$("#max_lab").val(maxLabs);
				$("#max_midterm").val(maxMidterm);
				$("#max_project").val(maxProject);
				$("#max_final").val(maxFinal);
				$("#grade_setting_page").show();
			}
	
		});
	} else {
		showAlert(SELECT_COURSE_MSG);
		$("#home").click();
	}

}

$(document).on('click', '#submit_section_weightages', function(e) {
	e.preventDefault();
	
	var pHomeWork = $("#homework_grades_slider").val();
	var pLab = $("#lab_grades_slider").val();
	var pProject = $("#project_grade_slider").val();
	var pMidterm = $("#midterm_grade_slider").val();
	var pFinal = $("#final_exam_grade_slider").val();
	var mHomeWork = $("#max_homwork").val();
	var mLab = $("#max_lab").val();
	var mMidterm = $("#max_midterm").val();
	var mProject = $("#max_project").val();
	var mFinal = $("#max_final").val();
	var totalP = parseInt(pHomeWork) + parseInt(pLab)
			+ parseInt(pProject) + parseInt(pMidterm)
			+ parseInt(pFinal);
	if (totalP > 100 || totalP < 100) {
		showAlert("All the weightages should sum upto a total of 100. Please adjust your configurations.");
		return;
	}

	var data = {
		courseId : getCourseId(),
		PHomework : pHomeWork,
		PLabs : pLab,
		PProject : pProject,
		PMidterm : pMidterm,
		PFinal : pFinal
	};

	var dataForMax = {
		courseId : getCourseId(),
		MHomework : mHomeWork,
		MLabs : mLab,
		MProject : mProject,
		MMidterm : mMidterm,
		MFinal : mFinal
	};
	var request = $.ajax({
		url : BASE_URL + 'save_percentage_setting.php',
		type : 'post',
		data : JSON.stringify(data)
	});
	request
			.done(function(response, textStatus, jqXHR) {
				if (jqXHR.status == 200) {
					showAlert("Your configurations have been saved successfully.")
				}

			});

	var requestForMax = $.ajax({
		url : BASE_URL + 'save_marks_setting.php',
		type : 'post',
		data : JSON.stringify(dataForMax)
	});

	requestForMax.done(function(response, textStatus, jqXHR) {
		if (jqXHR.status == 200) {

		}
	});

});

$(document).on('click', '#grade_range_submit', function(e) {
	e.preventDefault();
	var aMin = $(".a_min").val();
	var aMax = $(".a_max").val();
	var bMin = $(".b_min").val();
	var bMax = $(".b_max").val();
	var cMin = $(".c_min").val();
	var cMax = $(".c_max").val();
	var dMin = $(".d_min").val();
	var dMax = $(".d_max").val();
	var fMin = $(".f_min").val();
	var fMax = $(".f_max").val();

	var data = {
		courseId : getCourseId(),
		ARangeStart : aMin,
		ARangeEnd : aMax,
		BRangeStart : bMin,
		BRangeEnd : bMax,
		CRangeStart :cMin,
		CRangeEnd :cMax,
		DRangeStart :dMin,
		DRangeEnd : dMax,
		FRangeStart : fMin,
		FRangeEnd : fMax
	};
	
	var requestForMax = $.ajax({
		url : BASE_URL + 'save_grade_setting.php',
		type : 'post',
		data : JSON.stringify(data)
	});

	requestForMax.done(function(response, textStatus, jqXHR) {
		if (jqXHR.status == 200) {
				showAlert("You have successfully configured the grade ranges.")
		}
	});
});

function getGradeRangeSettings()
{
	if (getCourseId() != undefined) {
		var request = $.ajax({
			url : BASE_URL + 'get_course.php?courseId=' + getCourseId(),
			type : 'get'
		});
	
		request.done(function(response, textStatus, jqXHR) {
			if (jqXHR.status == 200) {
				var aMin = response.ARangeStart;
				var aMax = response.ARangeEnd;
				var bMin = response.BRangeStart;
				var bMax = response.BRangeEnd;
				var cMin = response.CRangeStart;
				var cMax = response.CRangeEnd;
				var dMin = response.DRangeStart;
				var dMax = response.DRangeEnd;
				var fMin = response.FRangeStart;
				var fMax = response.FRangeEnd;
				$(".a_min").val(aMin);
				$(".a_max").val(aMax);
				$(".b_min").val(bMin);
				$(".b_max").val(bMax);
				$(".c_min").val(cMin);
				$(".c_max").val(cMax);
				$(".d_min").val(dMin);
				$(".d_max").val(dMax);
				$(".f_min").val(fMin);
				$(".f_max").val(fMax);
				$('.a_min').slider('refresh');
				$('.a_max').slider('refresh');
				$('.b_min').slider('refresh');
				$('.b_max').slider('refresh');
				$('.c_min').slider('refresh');
				$('.c_max').slider('refresh');
				$('.d_min').slider('refresh');
				$('.d_max').slider('refresh');
				$('.f_min').slider('refresh');
				$('.f_max').slider('refresh');			
				$("#grade_range_page").show();
			}
	
		});
	} else {
		showAlert(SELECT_COURSE_MSG);
		$("#home").click();
	}

}

function showAlert(msg) {
	navigator.notification.alert(msg);
}