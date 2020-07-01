function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function addQuestion() {
    let container = document.createElement("div");
    let ques = document.createElement("div");
    let colors = ["skyblue", "DarkSeaGreen", "LightBlue", "LightGreen", "LightPink", "MediumAquaMarine", "MediumTurquoise", "Plum"];
    let len = colors.length - 1;
    ques.innerHTML = '<textarea name="question[]" placeholder="write question"></textarea><br>\
    <input type="checkbox" style="margin-left:2%;" name="checkbox[]" value="A"> <textarea name="option[]" placeholder="write options"></textarea>\
    <input type="checkbox" name="checkbox[]" value="B"> <textarea name="option[]" placeholder="write options"></textarea><br>\
    <input type="checkbox" style="margin-left:2%;" name="checkbox[]" value="C"> <textarea name="option[]" placeholder="write options"></textarea>\
    <input type="checkbox" name="checkbox[]" value="D"> <textarea name="option[]" placeholder="write options"></textarea>';
    container.style.background = colors[Math.floor(Math.random() * len)];
    container.style.width = "100%";
    container.style.border = "2px solid black";
    container.style.marginBottom = "10px";
    container.style.paddingBottom = "5px";
    container.appendChild(ques);
    document.getElementById("content").appendChild(container);
};
function removeQuestion() {
    let select = document.getElementById('content');
    select.removeChild(select.lastChild);
};
let addbtn = document.getElementById("add");
let rmbtn = document.getElementById("rmvButton");
addbtn.addEventListener("click", function () {
    let content = document.getElementById("content").children.length;
    let rmbtn = document.getElementById("rmvButton");
    if (content <= 0) {
        rmbtn.style.display = "none";
    } else {
        rmbtn.style.display = "block";
    }
});
rmbtn.addEventListener("click", function () {
    let content = document.getElementById("content").children.length;
    let rmbtn = document.getElementById("rmvButton");
    if (content <= 0) {
        rmbtn.style.display = "none";
    } else {
        rmbtn.style.display = "block";
    }
});

function print() {
    let con = document.getElementById("content").innerHTML;
    let fileName = document.getElementById("sub").value;
    let style = '<style>textarea[name="question[]"]{margin-bottom:10px;}@media only screen and (max-width:667px){textarea[name="option[]"]{display:block!important;white-space:nowrap;margin-left:0!important}input[type=checkbox]{margin-left:0!important}}</style>';
    let div = "<div id='res'><center><h1>" + fileName + "</h1></center>" + con + "</div>";
    let scrpt = '<script>\
let options_value = document.querySelectorAll(\'textarea[name = "option[]"]\');\
    for (let i = 0; i < options_value.length; i++) {\
    options_value[i].setAttribute("readonly", true);\
}\
let question_title = document.querySelectorAll(\'textarea[name = "question[]"]\');\
for (let i = 0; i < question_title.length; i++) {\
question_title[i].setAttribute("readonly", true);\
}\
function marks() {\
let chkbox = document.querySelectorAll(\'input[name="checkbox[]"]\');\
let inpt = document.querySelectorAll(\'textarea[name="option[]"]\');\
let question_title = document.querySelectorAll(\'textarea[name = "question[]"]\');\
for (let i = 0; i < chkbox.length; i++) {\
    if (chkbox[i].checked) {\
        chkbox[i].setAttribute("checked",true);\
    }\
}\
let chkboxch = document.querySelectorAll(\'input[name="checkbox[]"]:checked\');\
if(chkboxch.length!==question_title.length){\
    return alert("Please Fill All Question");\
    }\
let con=document.getElementById("res").innerHTML;\
let style=\'<style>textarea[name="question[]"]{margin-bottom:10px;}@media only screen and (max-width:667px){textarea[name="option[]"]{display:block!important;white-space:nowrap;margin-left:0!important}input[type=checkbox]{margin-left:0!important}}</style>\';\
let text=style+con;\
let file_name = document.getElementById("name").value; \
if(!file_name){\
    return alert("Please Fill Name Area");\
}\
download(file_name+".html",text);\
};\
function download(filename, text) {\
var element = document.createElement("a");\
element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));\
element.setAttribute("download", filename);\
element.style.display = "none";\
document.body.appendChild(element);\
element.click();\
document.body.removeChild(element);\
    }\
let name=document.createElement("div");\
    name.innerHTML="Enter Name: <input type=\'text\' id=\'name\'>";\
    document.body.appendChild(name);\
let btn = document.createElement("button");\
    btn.innerHTML = "Submit"; \
    btn.onclick = function () { marks() };\
    document.body.appendChild(btn);\
    </script > ';
    let text = style + div + scrpt;
    download(fileName + ".html", text);

}
function save() {
    let question_title = document.querySelectorAll('textarea[name="question[]"]');
    let options_value = document.querySelectorAll('textarea[name="option[]"]');
    let chkbox_ans = document.querySelectorAll('input[name="checkbox[]"]:checked');
    let chkbox_all = document.querySelectorAll('input[name="checkbox[]"]');
    let sub = document.getElementById("sub").value;
    if (chkbox_ans.length !== question_title.length) {
        alert("Please Select All Correct Answer");
    }
    if (chkbox_ans.length > question_title.length) {
        alert("Please Do Not Select Multiple Answer");
    }
    if (!sub) {
        alert("Please Fill Subject And Exam Name");
    }
    for (let i = 0; i < question_title.length; i++) {
        question_title[i].innerHTML = question_title[i].value;
    }
    for (let i = 0; i < options_value.length; i++) {
        options_value[i].innerHTML = options_value[i].value;
    }
    for (let i = 0, j = 0; i < chkbox_all.length; i++) {
        if (i % 4 === 0 && i !== 0) {
            j++;
        }
        chkbox_all[i].setAttribute("ans", chkbox_ans[j].value);
    }

};

let file = document.querySelectorAll("input[type=file]")[0];
file.addEventListener("change", function (event) {
    let iframe = document.getElementById("secDoc");
    let filename = `answersheet/${this.files.item(0).name}`;
    iframe.setAttribute("src", filename);

});

function ifm() {
    let c = 0;
    let iframe = document.getElementById('secDoc');
    let innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    let question_title = innerDoc.querySelectorAll('textarea[name="question[]"]');
    let chkbox = innerDoc.querySelectorAll('input[name="checkbox[]"]');
    let inpt = innerDoc.querySelectorAll('textarea[name="option[]"]');
    for (let i = 0; i < chkbox.length; i++) {
        if (chkbox[i].checked) {
            if (chkbox[i].value === chkbox[i].getAttribute("ans")) {
                inpt[i].style.background = "green";
            } else {
                inpt[i].style.background = "red";
                c++;
            }
        }
        if (!chkbox[i].checked) {
            if (chkbox[i].value === chkbox[i].getAttribute("ans")) {
                inpt[i].style.background = "green";
            }
        }
    }
    let mark = question_title.length - c;
    let h1 = document.createElement("h1");
    h1.innerHTML = 'Obtained Marks: <font style= "color:red;">' + mark + '</font>';
    document.body.appendChild(h1);
};


