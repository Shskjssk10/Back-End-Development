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
async function fecthIndivBook(input) {
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


const submitButton = document.getElementById("submit-button");
const inputBox = document.getElementById("input-id-box");
const bookList = document.getElementById("book-list");

submitButton.addEventListener("click", async () => {
    let input = inputBox.value;
    
    bookList.innerHTML = "";
    
    if (input === ""){
        await fetchBooks();
    } else { 
        input = Number(input); 
        await fecthIndivBook(input);
    }
})