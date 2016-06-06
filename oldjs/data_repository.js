var ERROR_ID = -99;
var selectedCourseId = undefined;
var studentsByCourse = undefined;
var studentId = undefined;
var courses = undefined;

function setCourseId(courseId) {
	selectedCourseId = courseId;
}

function getCourseId() {
	return selectedCourseId;
}

function setStudentsByCourse(students) {
	studentsByCourse = students;
}

function getStudentsByCourse() {
	return studentsByCourse;
}

function setStudentId(studId) {
	studentId = studId;
}

function getStudentId() {
	return studentId;
}

function setCourses(coursesList) {
	courses = coursesList;
}

function getCourses() {
	return courses;
}

/*function getCourseById(id) {
	if(courses) {
		for(var i = 0; i < courses.length; i++) {
			if(course)
		}
	}
}*/