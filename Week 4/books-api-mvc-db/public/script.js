async function fetchBooks() {
    const response = await fetch("/books"); // Replace with your API endpoint
    const data = await response.json();
  
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


const submitButton = document.getElementById("submit-button-get");
const inputBox = document.getElementById("input-id-box");
const bookList = document.getElementById("book-list");
const navbar = document.querySelector(".navbar");
const options = navbar.querySelectorAll("#option");

submitButton.addEventListener("click", async () => {
    event.preventDefault();
    let input = inputBox.value;
    
    bookList.innerHTML = "";
    
    if (input === ""){
        await fetchBooks();
    } else { 
        input = Number(input); 
        await fetchIndivBook(input);
    }
})

options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((opt) => opt.classList.remove("active")); // Remove active class from all options
      this.classList.add("active"); // Add active class to the clicked option
    });
  });