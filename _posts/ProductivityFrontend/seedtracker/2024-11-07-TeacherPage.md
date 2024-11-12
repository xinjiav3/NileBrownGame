---
toc: false
layout: post
title: Seed Tracker Teacher
type: ccc
permalink: /project/mort-translator/teacher-tracker
---


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teacher Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }
        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        .button {
            padding: 5px 10px;
            margin: 2px;
            color: white;
            background-color: #6a5acd;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .button.accept {
            background-color: #4CAF50;
        }
        .button.deny {
            background-color: #f44336;
        }
        .seed-change {
            display: inline-block;
            margin: 5px;
            padding: 5px 10px;
            color: white;
            background-color: #6a5acd;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            document.querySelectorAll('.seed-change').forEach(function(button) {
                button.addEventListener('click', function() {
                    var row = this.closest('tr');
                    var currentSeedCell = row.querySelector('td:nth-child(2)');
                    var currentSeed = parseFloat(currentSeedCell.innerText);

                    if (this.innerText === "+") {
                        currentSeed += 0.05;
                    } else {
                        currentSeed -= 0.05;
                    }

                    currentSeedCell.innerText = currentSeed.toFixed(2);
                });
            });

            document.querySelectorAll('.comment-form').forEach(function(form) {
                form.addEventListener('submit', function(event) {
                    event.preventDefault();
                    var row = this.closest('tr');
                    var commentBox = row.querySelector('.comment-box');
                    var commentInput = row.querySelector('.comment-input');
                    var commentText = commentInput.value;
                    commentBox.innerText = commentText;
                    commentInput.value = '';  // Clear the comment box
                });
            });

            document.querySelectorAll('.reset-button').forEach(function(button) {
                button.addEventListener('click', function() {
                    var row = this.closest('tr');
                    var commentInput = row.querySelector('.comment-input');
                    commentInput.value = '';
                    var commentBox = row.querySelector('.comment-box');
                    commentBox.innerText = '';
                });
            });
        });
    </script>
</head>
<body>
    <h2>Teacher Page</h2>

    <table>
        <tr>
            <th>Username</th>
            <th>Current Seed</th>
            <th>Pending Seed Requests</th>
            <th>Seed Change</th>
            <th>Comments</th>
        </tr>
        <tr>
            <td>user1</td>
            <td>0.70</td>
            <td>
                +0.03 <a href="#review-link">review link</a><br>
                <button class="button accept">Accept</button>
                <button class="button deny">Deny</button>
            </td>
            <td>
                <div class="seed-change">+</div>
                <div class="seed-change">-</div>
            </td>
            <td>
                <form class="comment-form">
                    <input type="text" class="comment-input" placeholder="Type your comment here">
                    <button type="submit" class="button">Submit</button>
                    <button type="button" class="button reset-button">Reset</button>
                </form>
                <div class="comment-box"></div>
            </td>
        </tr>
        <tr>
            <td>user2</td>
            <td>0.50</td>
            <td>none</td>
            <td>
                <div class="seed-change">+</div>
                <div class="seed-change">-</div>
            </td>
            <td>
                <form class="comment-form">
                    <input type="text" class="comment-input" placeholder="Type your comment here">
                    <button type="submit" class="button">Submit</button>
                    <button type="button" class="button reset-button">Reset</button>
                </form>
                <div class="comment-box"></div>
            </td>
        </tr>
    </table>
</body>
