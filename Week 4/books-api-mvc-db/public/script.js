document.addEventListener("DOMContentLoaded", function() {
   
    async function fetchBooks() {
        const response = await fetch("/books"); // Replace with your API endpoint
        const data = await response.json();
        console.log(data);
      
        const bookList = document.getElementById("book-list");
      
        data.forEach((book) => {
          const bookItem = document.createElement("div");
          bookItem.classList.add("book"); // Add a CSS class for styling
      
          // Create elements for title, author, etc. and populate with book data
          const titleElement = document.createElement("h2");
          titleElement.textContent = book.title;
      
          const authorElement = document.createElement("p");
          authorElement.textContent = `By: ${book.author}`;
    
          const bookID = document.createElement("p");
          bookID.textContent = book.id;
      
          // ... add more elements for other book data (optional)
      
          bookItem.appendChild(titleElement);
          bookItem.appendChild(authorElement);
          bookItem.appendChild(bookID);
          // ... append other elements
      
          bookList.appendChild(bookItem);
        });
    }
    async function fetchIndivBook(input) {
        const response = await fetch(`/books/${input}`); // Replace with your API endpoint
        const data = await response.json();
      
        const bookList = document.getElementById("book-list");
        
        const bookItem = document.createElement("div");
        bookItem.classList.add("book"); // Add a CSS class for styling
    
        // Create elements for title, author, etc. and populate with book data
        const titleElement = document.createElement("h2");
        titleElement.textContent = data.title;
    
        const authorElement = document.createElement("p");
        authorElement.textContent = `By: ${data.author}`;
    
        const bookID = document.createElement("p");
        bookID.textContent = data.id;
    
        // ... add more elements for other book data (optional)
    
        bookItem.appendChild(titleElement);
        bookItem.appendChild(authorElement);
        bookItem.appendChild(bookID);
        // ... append other elements
    
        bookList.appendChild(bookItem);
    
    };
    async function updateIndivBook(bookID, bookTitle, bookAuthor){
      const data = {};

      // Only include properties if they have values
      if (bookAuthor) data.author = bookAuthor;
      if (bookTitle) data.title = bookTitle;
    
      try {
        const response = await fetch(`/books/${bookID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to update book: ${response.statusText}`);
        }
    
        console.log("Book updated successfully!");
    
        // Optional: Handle successful update (e.g., clear form, update UI)
      } catch (error) {
        console.error("Error updating book:", error);
        // Handle errors appropriately (e.g., display error message to user)
      }
    }
    async function uploadIndivBook(bookAuthor, bookTitle){
      try {
        const response = await fetch("/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indicate JSON data in request body
          },
          body: JSON.stringify({ // Convert data to JSON string for the request body
            title: bookTitle,
            author: bookAuthor,
          }),
        }); 
        if (!response.ok) {
          throw new Error(`Failed to create book: ${response.statusText}`);
        }
    
        console.log("Book created successfully!");
    
        // Optional: Handle successful creation (e.g., clear form, update UI)
      } catch (error) {
        console.error("Error creating book:", error);
        // Handle errors appropriately (e.g., display error message to user)
      }
    }
    async function deleteIndivBook(input){
      try {
          const response = await fetch(`/books/${input}`, {
            method: "DELETE",
          });
      
          if (!response.ok) {
            throw new Error(`Failed to delete book: ${response.statusText}`);
          }
          const bookList = document.getElementById("book-list");
          const boilerPlate = document.createElement("div");
          boilerPlate.textContent = `Book has been deleted successfully!`;

          bookList.appendChild(boilerPlate);
          console.log("Book deleted successfully!");
      
          // Optional: Update UI or perform other actions after successful deletion
        } catch (error) {
          console.error("Error deleting book:", error);
          const bookList = document.getElementById("book-list");
          const boilerPlate = document.createElement("div");
          boilerPlate.textContent = "Failed to delete :(";
          bookList.appendChild(boilerPlate);
          // Handle errors appropriately, e.g., display an error message to the user
      }
    }


    const allSubmitButtons = document.querySelectorAll(".submit-button");
    const updateInputs = document.querySelectorAll(".update-input");
    const uploadInputs = document.querySelectorAll(".upload-input");
    const inputBox = document.getElementById("input-id-box");
    const deleteInput = document.querySelector(".delete-input");
    const bookList = document.getElementById("book-list");
    const options = document.querySelectorAll("div.option");
    const sections = document.querySelectorAll("section.hide");

    //Function checks which button is clicked and performs as accordingly
    allSubmitButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            event.preventDefault();
            console.log(`${button.id} has been clicked!`)

            bookList.innerHTML = "";

            //get-submit-button is clicked
            if (button.id.includes("get")){
                let input = inputBox.value;

                if (input === ""){
                    await fetchBooks();
                } else { 
                    input = Number(input); 
                    await fetchIndivBook(input);
                }
            }
            //update-submit-button is clicked
            else if (button.id.includes("update")){
              let [bookID, bookTitle, bookAuthor] = updateInputs;
              bookID = bookID.value;
              bookTitle = bookTitle.value;
              bookAuthor = bookAuthor.value;
              await updateIndivBook(bookID, bookTitle, bookAuthor);
            }
            //upload-submit-button is clicked
            else if (button.id.includes("upload")){
              let [bookAuthor, bookTitle] = uploadInputs; // Destructuring assignment
              bookAuthor = bookAuthor.value;
              bookTitle = bookTitle.value;
              await uploadIndivBook(bookAuthor, bookTitle);
            }
            //delete-submit-button is clicked
            else {
                let input = deleteInput.value;
                console.log(input);
                try {
                    input = Number(input);
                    console.log(input);
                    if (input === ""){
                        alert("Please enter an integer");
                    }
                    else { 
                        await deleteIndivBook(input);
                    }
                }
                catch (err){
                    console.log("Error sending request", err);
                }
            }
        })
    })
    
    //Display respective sections
    options.forEach((option) => {
        option.addEventListener("click", () => {
            options.forEach((opt) => opt.classList.remove("active")); 
            option.classList.add("active");            

            sections.forEach((section) => section.classList.remove("show"));

            const clickedOptionId = `${option.id.split("-")[0]}-section`;
            const targetSection = document.getElementById(clickedOptionId); 

            targetSection.classList.add("show");
        });
    });
  });
