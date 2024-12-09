--- 
toc: false
layout: post
title: Grader Project
description: Grade popcorn hacks, generate hacks, or ask questions here
courses: { csa: {week: 7}}
categories: [Collaboration]
type: ccc
---

{% include nav/home.html %}

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAGAI Login/Signup</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        .container {
            display: flex;
            justify-content: space-around;
            padding-top: 50px;
        }
        h1 {
            margin-top: 30px;
            font-size: 36px;
        }
        h2 {
            font-size: 16px;
        }
        .nav-buttons {
            margin-top: 20px;
        }
        .nav-buttons button {
            background-color: black;
            color: white;
            border: 1px solid white;
            padding: 10px 20px;
            margin: 0 10px;
            cursor: pointer;
            font-size: 16px;
        }
        .login-signup {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin-top: 50px;
        }
        .form-box {
            text-align: left;
            padding: 20px;
            border: 1px solid white;
            width: 250px;
        }
        .form-box label {
            display: block;
            margin-bottom: 8px;
        }
        .form-box input {
            width: 100%;
            padding: 8px;
            margin-bottom: 15px;
            border: 1px solid white;
            background-color: black;
            color: white;
        }
        .form-box button {
            background-color: white;
            color: black;
            padding: 10px;
            width: 100%;
            cursor: pointer;
            border: none;
        }
        .form-box button:hover {
            background-color: gray;
        }
    </style>
</head>

<body>
    <h1>SAGAI</h1>
    <h2>Super Advanced Grader Artificial Intelligence</h2>
    <div class="nav-buttons">
        <a href="{{site.baseurl}}/collaboration/2024/10/21/Grader_Grader.html"><button>Grader</button></a>
        <a href="{{site.baseurl}}/collaboration/2024/10/21/Grader_Generator.html"><button>Generator</button></a>
        <a href="{{site.baseurl}}/collaboration/2024/10/21/Grader_QNA.html"><button>QNA</button></a>
        <a href="{{site.baseurl}}/collaboration/2024/10/21/Grader_Assignment.html"><button>Assignments</button></a>
    </div>
    <div class="login-signup">
        <!-- Login Form -->
        <div class="form-box">
            <h3>Login:</h3>
            <label for="login-email">Email:</label>
            <input type="text" id="login-email" placeholder="Email">
            <label for="login-password">Password:</label>
            <input type="password" id="login-password" placeholder="Password">
            <button id="login-button">Login</button>
        </div>
        <!-- Signup Form -->
        <div class="form-box">
            <h3>Sign up:</h3>
            <label for="signup-name">Name:</label>
            <input type="text" id="signup-name" placeholder="Name">
            <label for="signup-username">Username:</label>
            <input type="text" id="signup-username" placeholder="Username">
            <label for="signup-password">Password:</label>
            <input type="password" id="signup-password" placeholder="Password">
            <button>Sign up</button>
        </div>
    </div>
        <script>
        document.getElementById("login-button").addEventListener("click", async () => {
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const response = await fetch("http://localhost:8764/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                // Redirect to the assignment page
                window.location.href = "{{site.baseurl}}/collaboration/2024/10/21/Grader_Assignment.html";
            } else {
                // Handle errors (e.g., show an alert)
                const errorMessage = await response.text();
                alert(errorMessage);
            }
        });
    </script>
</body>
