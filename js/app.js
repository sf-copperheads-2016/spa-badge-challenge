// bind body tag
var contentArea = document.getElementById("content");

// bind template scripts
var studentsIndexTemplate = document.getElementById("students-index-template").innerHTML,
    studentsShowTemplate = document.getElementById("students-show-template").innerHTML;

// compile template
var compiledStudentsIndex = Handlebars.compile(studentsIndexTemplate),
    compiledStudentsShow = Handlebars.compile(studentsShowTemplate);

// set copperheads object for index page and copperhead for show page
var copperheads,
    copperhead;

// student name links on index page
var indexLinkListener = function() {
    _$(".student-link").on("click", function(e) {
        e.preventDefault();
        getShowPage("get", "http://localhost:3000/students/" + this.id);
    });
}

// "add badge" form on show page
var addBadgeListener = function() {
    _$("#add-badge-form").on("submit", function(e) {
        e.preventDefault();

        var studentID = this[0].getAttribute("value"),
            content = this[1].value;

        var data = {
                student_id: studentID,
                name: content
            }

        postNewBadge("post", "http://localhost:3000/badges", data);
    });
}

// vote button on show page
var voteButtonListener = function() {
    _$(".up").on("click", function(e) {
        e.preventDefault();

        var badgeID = this.getAttribute("name"),
            studentID = copperhead.student.id,
            upOrDown = this.getAttribute("class"),
            value = upOrDown == "up" ? 1 : -1;

        var data = {
                id: badgeID,
                value: value
            }

        updateBadge("put", "http://localhost:3000/badges/" + badgeID, data);
    });
    _$(".down").on("click", function(e) {
        e.preventDefault();

        var badgeID = this.getAttribute("name"),
            studentID = copperhead.student.id,
            upOrDown = this.getAttribute("class"),
            value = upOrDown == "up" ? 1 : -1;

        var data = {
                id: badgeID,
                value: value
            }

        updateBadge("put", "http://localhost:3000/badges/" + badgeID, data);
    });
}

// hit index route and render index page
var getIndexPage = _$().request("get", "http://localhost:3000/students")
    .then(
        function(data) {
            // bind copperheads to server data
            copperheads = JSON.parse(data);
        },
        function(err) {
            console.log("couldn't load index");
        })
    .then(
        function() {
            // render image page template
            contentArea.innerHTML = compiledStudentsIndex(copperheads);

            // bind student name links from index to show page action
            indexLinkListener();
        })

// hit show route and render show page
var getShowPage = function(type, url) {
    _$().request(type, url)
    .then(
        function(data) {
            // bind copperhead to specific student data from server
            copperhead = JSON.parse(data);
        },
        function(err) {
            console.log("couldn't load show page");
        })
    .then(
        function() {
            // render show page template
            contentArea.innerHTML = compiledStudentsShow(copperhead);

            // bind new badge form submit to send post request
            addBadgeListener();

            // bind vote buttons to badge vote-incrementing action
            voteButtonListener();
        })
}

var postNewBadge = function(type, url, data) {
    _$().request(type, url, data)
    .then(
        function() {
            var studentID = copperhead.student.id;
                contentArea.innerHTML = "";
                getShowPage("get", "http://localhost:3000/students/" + studentID);
        },
        function() {
            console.log("couldn't create new badge")
        });
}

var updateBadge = function(type, url, data) {
    _$().request(type, url, data)
    .then(
        function() {
            console.log("success")
            var studentID = copperhead.student.id;
                contentArea.innerHTML = "";
                getShowPage("get", "http://localhost:3000/students/" + studentID);
        },
        function() {
            console.log("failure")
            console.log("couldn't record vote")
        });
}
