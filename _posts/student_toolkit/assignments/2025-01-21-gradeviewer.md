---
layout: base
title: Viewing Grades
permalink: /student/view-grades
comments: false
---

<button id="gradegetter">Get Grades</button>

<script type="module">
    import { javaURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    document.getElementById("gradegetter").addEventListener("click", getGrades);
    let userId=-1;
    let grades=[];
    async function getUserId(){
        const url_persons = `${javaURI}/api/person/get`;
        await fetch(url_persons, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Spring server response: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                userId=data.id;


            })
            .catch(error => {
                console.error("Java Database Error:", error);
            });
    }

    
    
    function getGrades() {
        console.log("here");
        const urlGrade = javaURI + '/api/synergy/grades';  // Declare and initialize urlGrade at the start

        fetch(urlGrade, {
            method: 'GET',  // Using GET to fetch data
            credentials: 'include',  // Send cookies if needed
        })
        .then(response => {
            if (response.ok) {
                console.log("works");
                return response.json();
            } else {
                throw new Error('Failed to get data: ' + response.statusText);
            }
        })
        .then(data => {
            console.log("here");
            getUserId();
            console.log(data);
            data.forEach(grade => {
                console.log(`Grade for studentId ${grade.studentId}: ${grade.grade}`);
                console.log(grade.studentId+" "+userId);
                if(grade.studentId==userId){
                    grades.push(grade.grade);
                }
            });
            console.log(grades);
        })
        .catch(error => {
            console.error('Error fetching grades:', error);
        });
    }
    getUserId();
    
</script>
