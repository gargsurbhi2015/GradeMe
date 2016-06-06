<!DOCTYPE html>

<?php
ob_start();
session_start("helo");
if (!isset($_COOKIE['firstName'])){
	header('location: index.php#login');
}
?>


<html>
<head>
    <meta name="viewport" content="initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta charset="utf-8">
    <title>Grade Calculator</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
          integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css"/>
    <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap.css" rel='stylesheet' type='text/css'/>


    <script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="http://code.jquery.com/color/jquery.color-git.js"></script>
    <script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
    <script src="js/app.js"></script>
    <script type="text/javascript" src="cordova.js"></script>
    <script>
        $(document).on("pagecreate", function (e) {
            $(document).on("swipeleft swiperight", function (e) {
                // We check if there is no open panel on the page because otherwise
                // a swipe to close the left panel would also open the right panel (and v.v.).
                // We do this by checking the data that the framework stores on the page element (panel: open).
                if ($.mobile.activePage.jqmData("panel") !== "open") {
                    if (e.type === "swipeleft") {
                        $(".rights").panel("open");
                    } else if (e.type === "swiperight") {
                        $(".lefts").panel("open");
                    }
                }
            });
        });
    </script>
</head>


<body>
<div>

    <!-- main page -->
    <div data-role="page" id="main-page" data-url="main-page">
        <div data-role="header">
            <!-- <h2>Student Information</h2> -->
            <a href="#left-panel-main" data-icon="bullets" data-iconpos="notext" data-shadow="false"
               data-iconshadow="false" class="ui-btn ui-corner-all ui-icon-bars ui-btn-icon-notext"></a>
        </div><!-- /header -->

        <div data-role="content" id="stuinfo">
            <div class="container">
                <div class="row">
                    <div>
                        <h2>
                            <center>Student Profile</center>
                        </h2>
                        <br>
                        <table style="width:100%;">
                            <tr>
                                <td rowspan="6"><img src="<?php echo $_COOKIE['imageURL']?>" alt="User Profile Picture" width="150px"
                                                     height="150px"></td>
                                <td><b>First Name</b></td>
                                <td><?php echo $_COOKIE['firstName']?></td>
                            </tr>
                            <tr>
                                <td><b>Last Name</b></td>
                                <td><?php echo $_COOKIE['lastName']; ?></td>
                            </tr>
                            <tr>
                                <td><b>Student Id</b></td>
                                <td><?php echo $_COOKIE['student_id']; ?></td>
                            </tr>
                            <tr>
                                <td><b>Major</b></td>
                                <td>Software Engineering</td>
                            </tr>
                            <tr>
                                <td><b>Role</b></td>
                                <td><?php echo $_COOKIE['programmer']; ?></td>
                            </tr>
                            <tr>
                                <td><b>University</b></td>
                                <td><?php echo $_COOKIE['university']; ?></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div><!-- /content -->
        <div id="placeholder">
        </div>
        <!-- /panel under main -->
        <div data-role="panel" id="left-panel-main" class="lefts" style="background-color:#fed136;">
            <h2>GoMobile</h2><br>
            <ul data-role="listview">
                <li><a href="#main-page" data-rel="close" data-role="button" data-mini="ture" data-inline="true"
                       data-icon="user" data-iconpos="right" data-transition="slidedown">Profile</a></li>
                <li><a href="#grade-page" data-role="button" data-mini="true" data-inline="true" data-icon="gear"
                       data-iconpos="right" data-transition="slidedown">Calculate Grades</a></li>
                <li><a href="http://openloop.com/education/classes/sjsu_engr/engr_mobile_dev/spring2015/"
                       data-role="button" data-rel="dialog" data-mini="true" data-inline="true" data-icon="action"
                       data-iconpos="right">Greensheet</a></li>
                <li><a href="http://gargsurbhi.com/prof.html" data-role="button" data-mini="true" data-inline="true" data-icon="search"
                       data-iconpos="right" data-transition="slidedown">Know your Professor</a></li>
                <li><a href="#" onclick="window.location='logout.php'" data-role="button" data-rel="dialog" data-mini="true"
                       data-inline="true" data-icon="action" data-iconpos="right">Logout</a></li>
                <li><a href="#" data-rel="close" data-role="button" data-mini="false" data-inline="false"
                       data-icon="carat-l" data-iconpos="right">Close</a></li>
            </ul>
        </div><!-- /panel -->
    </div>

    <!-- student page -->
    <div data-role="page" id="prof-page" data-url="grade-page">
        <div data-role="header">
            <h1>Calculate Your Grades</h1>
            <a href="#left-panel-compute" class="ui-btn-left" data-role="button" data-icon="bullets"
               data-iconpos="notext">Home</a>
            <a href="#settingsPage" id='settingsButton' class="ui-btn-right" data-role="button" data-mini="true"
               data-icon="gear">Settings</a>
        </div><!-- /header -->
        <div data-role="content" id="grade-compute">
            <form>
                <div data-role="fieldcontain">
                    <h2>Input Points</h2>
                    <ul data-role="listview" name="input" data-inset="true" class="input">
                        <li>
                            <img src="img/Assignments.gif">
                            <h2>Homework</h2>
                            <input type="number" name="homeworkpoints" id="points1" data-clear-btn="true" maxlength="3"
                                   value="" placeholder="Enter homework points here"
                                   max="localStorage.getItem('MaxHomeworkMarks');">
                        </li>
                        <li>
                            <img src="img/lab.gif">
                            <h2>Lab</h2>
                            <input type="number" name="labpoints" id="points2" data-clear-btn="true" maxlength="3"
                                   value="" placeholder="Enter lab points here">
                        </li>
                        <li>
                            <img src="img/project.png">
                            <h2>Project</h2>
                            <input type="number" name="projectpoints" id="points3" data-clear-btn="true" maxlength="3"
                                   value="" placeholder="Enter project points here">
                        </li>
                        <li>
                            <img src="img/present.jpg">
                            <h2>Presentation</h2>
                            <input type="number" name="presentationpoints" id="points4" data-clear-btn="true"
                                   maxlength="3" value="" placeholder="Enter presentation points here">
                        </li>
                        <li>
                            <img src="img/midterm.png">
                            <h2>Midterm</h2>
                            <input type="number" name="midtermpoints" id="points5" data-clear-btn="true" maxlength="3"
                                   value="" placeholder="Enter midterm points here">
                        </li>
                        <li>
                            <img src="img/fin.gif">
                            <h2>Final</h2>
                            <input type="number" name="finalpoints" id="points6" data-clear-btn="true" maxlength="3"
                                   value="" placeholder="Enter final points here">
                        </li>
                    </ul>
                </div>
                <p style="text-align: center;">
                    <a href="#" id="computeGrade" data-role="button" data-icon="check">Compute Grade</a>
                </p>
                <p class="final grade">
                    <label>Final Grade</label>
                    <span id="finalgrade">TBD</span>
                </p>
            </form>
        </div><!-- /content -->

        <!-- /panel under compute grade -->
        <div data-role="panel" id="left-panel-compute" class="lefts" style="background-color:#fed136;">
            <h2>GoMobile</h2><br>
            <ul data-role="listview">
                <!-- <li data-role="list-divider">Menu</li> -->
                <li><a href="#main-page" data-rel="close" data-role="button" data-mini="ture" data-inline="true"
                       data-icon="user" data-iconpos="right" data-transition="slidedown">Profile</a></li>
                <li><a href="#grade-page" data-role="button" data-mini="true" data-inline="true" data-icon="gear"
                       data-iconpos="right" data-transition="slidedown">Calculate Grades</a></li>
                <li><a href="http://openloop.com/education/classes/sjsu_engr/engr_mobile_dev/spring2015/"
                       data-role="button" data-rel="dialog" data-mini="true" data-inline="true" data-icon="action"
                       data-iconpos="right">Greensheet</a></li>
                <li><a href="http://gargsurbhi.com/prof.html" data-role="button" data-mini="true" data-inline="true" data-icon="search"
                       data-iconpos="right" data-transition="slidedown">Know your Professor</a></li>
                <li><a href="#" onclick="window.location='logout.php'" data-role="button" data-mini="true" data-inline="true" data-icon="power"
                       data-iconpos="right" data-transition="slidedown">Logout</a></li>
                <li><a href="#" data-rel="close" data-role="button" data-mini="false" data-inline="false"
                       data-icon="carat-l" data-iconpos="right">Close</a></li>
            </ul>
        </div><!-- /panel -->
    </div>

    <!-- settings page -->
    <div data-role="page" class="" id="settingsPage" data-add-back-btn="true">
        <div data-role="header" class="">
            <a href="#" id='cancelSettings' class="ui-btn ui-icon-delete ui-btn-icon-left" data-rel="back">Cancel</a>
            <h1>Grade - Settings</h1>
        </div>
        <div data-role="content">
            <form>
                <ul data-role="listview" name="max" data-inset="true" class="max">
                    <li>
                        <label>Max points for Homework:</label><input type="number" name="homeworkMaxPoints"
                                                                      id="MaxPoints1" value="500"
                                                                      placeholder="Enter the maximum Homework points.">
                        <label for="sliderHw">Hw %</label>
                        <input type="range" name="sliderHw" id="sliderHw" value="10" min="0" max="100"
                               data-highlight="true" data-popup-enabled="true"/>
                    </li>

                    <li>
                        <label>Max points for Lab:</label><input type="number" name="labMaxPoints" id="MaxPoints2"
                                                                 value="500"
                                                                 placeholder="Enter the maximum Lab points.">
                        <label for="sliderLab">Lab %</label>
                        <input type="range" name="sliderLab" id="sliderLab" value="40" min="0" max="100"
                               data-highlight="true" data-popup-enabled="true"/>
                    </li>
                    <li>
                        <label>Max points for Project:</label><input type="number" name="projectMaxPoints"
                                                                     id="MaxPoints3" value="200"
                                                                     placeholder="Enter the maximum Project points.">
                        <label for="sliderProj">Prj %</label>
                        <input type="range" name="sliderProj" id="sliderProj" value="20" min="0" max="100"
                               data-highlight="true" data-popup-enabled="true"/>
                    </li>
                    <li>
                        <label>Max points for Presentation:</label><input type="number" name="presentationMaxPoints"
                                                                          id="MaxPoints4" value="100"
                                                                          placeholder="Enter the maximum Presentation points.">
                        <label for="sliderPresen">Presentation %</label>
                        <input type="range" name="sliderPresen" id="sliderPresen" value="10" min="0" max="100"
                               data-highlight="true" data-popup-enabled="true"/>
                    </li>
                    <li>
                        <label>Max points for Midterm:</label><input type="number" name="midtermMaxPoints"
                                                                     id="MaxPoints5" value="100"
                                                                     placeholder="Enter the maximum Midterm points.">
                        <label for="sliderMidTerm">Midterm %</label>
                        <input type="range" name="sliderMidTerm" id="sliderMidTerm" value="10" min="0" max="100"
                               data-highlight="true" data-popup-enabled="true"/>
                    </li>
                    <li>
                        <label>Max points for Final:</label><input type="number" name="finalMaxPoints" id="MaxPoints6"
                                                                   value="100"
                                                                   placeholder="Enter the maximum Final points.">
                        <label for="sliderFinals">Final %</label>
                        <input type="range" name="sliderFinals" id="sliderFinals" value="10" min="0" max="100"
                               data-highlight="true" data-popup-enabled="true"/>
                    </li>
                </ul>

                <p style="text-align: center;">
                    <a id='saveSettings' data-role="button" data-inline="true" data-icon="check" data-transition="flip"
                       data-rel="popup">Save</a>
                </p>
                <div data-role="popup" id="popupBasic" class="ui-content">
                    <p>The sum of all the Slider Values should be 100%.Please set them again.
                    <p>
                </div>
                <div data-role="popup" id="popupMarks" class="ui-content">
                    <p>Please enter all the Max Marks for items on the page.
                    <p>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>