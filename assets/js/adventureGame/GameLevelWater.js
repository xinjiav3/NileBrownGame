import GameEnv from './GameEnv.js';
import Background from './Background.js';

class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_water = path + "/images/gamify/deepseadungeon.jpeg";
    const image_data_water = {
        id: 'Water',
        src: image_src_water,
        pixels: {height: 597, width: 340}
    };

    // NPC Data for Byte Nomad (Smaller Version)
    const sprite_src_javanomad = path + "/images/gamify/wizard.png"; // Ensure correct path to the image
    const sprite_data_javanomad = {
        id: 'Java Nomad',
        greeting: "Ah, traveler! The digital sands shift like the wind, and only those who understand Java can truly master the art of programming. Are you ready to test your Java knowledge?",
        src: sprite_src_javanomad,
        SCALE_FACTOR: 4, // Reduced scale factor for a smaller NPC
        pixels: { height: 163, width: 185 },
        INIT_POSITION: { x: (width / 2), y: (height / 2.5) }, // Adjusted for better placement
        hitbox: { widthPercentage: 0.07, heightPercentage: 0.07 }, // Reduced hitbox to match new size

        // Java Knowledge Quiz
        quiz: { 
          title: "Java Nomad's Code Wisdom",
          questions: [
              "Which keyword is used to define a class in Java?\n1. define\n2. class\n3. Class\n4. struct",
              "Which data type is used to store a single character in Java?\n1. String\n2. char\n3. Character\n4. ch",
              "What is the default value of an int variable in Java?\n1. 0\n2. null\n3. undefined\n4. -1",
              "Which of these is NOT a Java access modifier?\n1. public\n2. private\n3. protected\n4. external",
              "What is the purpose of the 'final' keyword in Java?\n1. It defines a constant variable\n2. It prevents method overriding\n3. It prevents class inheritance\n4. All of the above",
              "Which Java loop is guaranteed to execute at least once?\n1. for loop\n2. while loop\n3. do-while loop\n4. foreach loop",
              "What is the parent class of all Java classes?\n1. Object\n2. BaseClass\n3. Root\n4. Core",
              "How do you correctly create a new object in Java?\n1. Object obj = Object();\n2. Object obj = new Object();\n3. Object obj = new();\n4. new Object obj;",
              "Which Java keyword is used to handle exceptions?\n1. throw\n2. try\n3. error\n4. exception",
              "Which Java collection allows key-value pairs?\n1. ArrayList\n2. HashMap\n3. HashSet\n4. LinkedList"
            ]
          }
      };

    // List of objects definitions for this level
    this.objects = [
      { class: Background, data: image_data_water },
      { class: Background, data: sprite_data_javanomad },
    ];
  }
}

export default GameLevelWater;