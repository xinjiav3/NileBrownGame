const Prompt = {
    isOpen: false,
    dim: false,

    backgroundDim: {
        create () {
            this.dim = true // sets the dim to be true when the prompt is opened
            console.log("CREATE DIM")
            const dimDiv = document.createElement("div");
            dimDiv.id = "dim";
            dimDiv.style.backgroundColor = "black";
            dimDiv.style.width = "100%";
            dimDiv.style.height = "100%";
            dimDiv.style.position = "absolute";
            dimDiv.style.opacity = "0.8";
            document.body.append(dimDiv);
            dimDiv.style.zIndex = "9998"
            dimDiv.addEventListener("click", Prompt.backgroundDim.remove)
        },
        remove () {
            this.dim = false
            console.log("REMOVE DIM");
            const dimDiv = document.getElementById("dim");
            dimDiv.remove();
            Prompt.isOpen = false
            promptDropDown.style.width = this.isOpen?"70%":"0px";
            promptDropDown.style.top = this.isOpen?"15%":"0px";
            promptDropDown.style.left = this.isOpen?"15%":"0px";
        },
    },

    createPromptDisplayTable() {
        const table = document.createElement("table");
        table.className = "table prompt"; // You might want to add some styles to this table
    
        const header = document.createElement("tr");
    
        // Create a cell with the question prompt
        const th = document.createElement("th");
        th.colSpan = 2; // Allow the header to span across both question and input cells
        th.innerText = "Please answer the following questions:";
        header.append(th);
    
        table.append(header);
    
        return table;
    },
    
    

    toggleDetails() {
        Prompt.detailed = !Prompt.detailed

        Prompt.updatePromptDisplay()
    },

    updatePromptTable() {
        const table = this.createPromptDisplayTable();
    
        // Check if we have a current NPC
        if (this.currentNpc && this.currentNpc.questions) {
            this.currentNpc.questions.forEach((questionData, index) => {
                // Create a row for each question
                const row = document.createElement("tr");
    
                // Question text
                const questionCell = document.createElement("td");
                questionCell.innerText = `${index + 1}. ${questionData.question}`; // Display question with a number
    
                // Input cell
                const inputCell = document.createElement("td");
                const questionInput = document.createElement("input");
                questionInput.type = "text";
                questionInput.placeholder = "Type your answer here";
    
                // Append question and input to their respective cells
                inputCell.append(questionInput);
    
                row.append(questionCell);
                row.append(inputCell);
    
                table.append(row);
            });
        } else {
            // If no questions are available, you can show a default message
            const row = document.createElement("tr");
            const td = document.createElement("td");
            td.colSpan = 2; // Span across both columns
            td.innerText = "No questions available.";
            row.append(td);
            table.append(row);
        }
    
        return table;
    },
    
    

    updatePromptDisplay () {
        const table = document.getElementsByClassName("table scores")[0]
        const detailToggleSection = document.getElementById("detail-toggle-section")
        const clearButtonRow = document.getElementById("clear-button-row")
        const pagingButtonsRow = document.getElementById("paging-buttons-row")

        if (detailToggleSection) {
            detailToggleSection.remove()
        }

        if (table) {
            table.remove() //remove old table if it is there
        }

        if (pagingButtonsRow) {
            pagingButtonsRow.remove()
        }

        if (clearButtonRow) {
            clearButtonRow.remove()
        }

        
        document.getElementById("promptDropDown").append(Prompt.updatePromptTable()) //update new Prompt
        
        
    },

    backPage () {
        const table = document.getElementsByClassName("table scores")[0]

        if (Prompt.currentPage - 1 == 0) {
            return;
        }
    

        Prompt.currentPage -= 1

        Prompt.updatePromptDisplay()
    },
    
    frontPage () {
        Prompt.currentPage += 1
        Prompt.updatePromptDisplay()
        
    },

    openPromptPanel () {
        const promptDropDown = document.querySelector('.promptDropDown');
        const promptTitle = document.getElementById("promptTitle");
        
        promptTitle.innerHTML = "Local Prompt";
    
        // toggle isOpen
        this.isOpen = true;
        
        // Handle the prompt drop-down visibility
        if (this.isOpen) {
            Prompt.backgroundDim.create();
            
            // Remove old table if it exists
            const table = document.getElementsByClassName("table scores")[0];
            if (table) {
                table.remove(); 
            }
    
            // Update the prompt display
            Prompt.updatePromptDisplay();
            
            // Update styling for prompt dropdown
            promptDropDown.style.position = "fixed"; // Ensure it stays in place on the screen
            promptDropDown.style.zIndex = "9999"; // Ensure it's on top of other elements
            promptDropDown.style.width = "70%"; // Make prompt wide enough
            promptDropDown.style.top = "15%"; // Position the prompt down a bit from the top
            promptDropDown.style.left = "15%"; // Center the prompt horizontally
    
            promptDropDown.style.transition = "all 0.3s ease-in-out"; // Optional: smooth transition for opening
        }
    },
    

    initializePrompt () {
        const promptTitle = document.createElement("div");
        promptTitle.id = "promptTitle";
        document.getElementById("promptDropDown").appendChild(promptTitle);
        document.getElementById("promptDropDown").append(this.updatePromptTable())

       // document.getElementById("prompt-button").addEventListener("click",Prompt.openPromptPanel)
    },

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

export default Prompt;
